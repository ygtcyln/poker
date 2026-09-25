import { PLAYERS } from '../data/players'
import type { CompletedGame, GameState, HandRecord, PlayerId, PlayerProfile } from '../types'

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function createGame(playerIds: PlayerId[], buyIn: number): GameState {
  const balances: Partial<Record<PlayerId, number>> = {}
  for (const id of playerIds) balances[id] = buyIn
  return {
    id: randomId(),
    startedAt: Date.now(),
    status: 'in_progress',
    playerIds,
    buyIn,
    balances,
    hands: [],
  }
}

export function activePlayerIds(game: GameState): PlayerId[] {
  return game.playerIds.filter((id) => (game.balances[id] ?? 0) > 0)
}

/**
 * Bir eli çözer: kazanana, o eldeki tüm diğer aktif oyunculardan girilen
 * kayıp miktarını toplar. Bir oyuncu kendi bakiyesinden fazla kayıp giremez
 * (clamp edilir) — bu hem batmayı (bust) tetikler hem de toplam çipin
 * korunmasını sağlar: kazanan, girilen ham değerler değil, gerçekleşen
 * (clamp sonrası) kayıpların toplamını alır.
 */
export function resolveHand(
  game: GameState,
  winnerId: PlayerId,
  lossesInput: Partial<Record<PlayerId, number>>,
): GameState {
  const next = clone(game)
  const active = activePlayerIds(next)
  const losers = active.filter((id) => id !== winnerId)

  let totalWon = 0
  const recordedLosses: Partial<Record<PlayerId, number>> = {}

  for (const loserId of losers) {
    const currentBalance = next.balances[loserId] ?? 0
    const rawLoss = Math.max(0, lossesInput[loserId] ?? 0)
    const actualLoss = Math.min(rawLoss, currentBalance)
    next.balances[loserId] = currentBalance - actualLoss
    totalWon += actualLoss
    recordedLosses[loserId] = actualLoss
  }

  next.balances[winnerId] = (next.balances[winnerId] ?? 0) + totalWon

  const hand: HandRecord = {
    id: randomId(),
    timestamp: Date.now(),
    winnerId,
    losses: recordedLosses,
    balancesAfter: clone(next.balances),
  }
  next.hands = [...next.hands, hand]

  const remaining = activePlayerIds(next)
  if (remaining.length === 1) {
    next.status = 'completed'
    next.endReason = 'auto'
    next.winnerId = remaining[0]
    next.endedAt = Date.now()
  }

  return next
}

export function undoLastHand(game: GameState): GameState {
  if (game.hands.length === 0) return game
  const next = clone(game)
  const hands = next.hands.slice(0, -1)
  next.hands = hands

  if (hands.length === 0) {
    const balances: Partial<Record<PlayerId, number>> = {}
    for (const id of next.playerIds) balances[id] = next.buyIn
    next.balances = balances
  } else {
    next.balances = clone(hands[hands.length - 1].balancesAfter)
  }

  next.status = 'in_progress'
  next.endReason = undefined
  next.winnerId = undefined
  next.endedAt = undefined
  return next
}

export function endGameManual(game: GameState, chosenWinnerId: PlayerId): GameState {
  const next = clone(game)
  next.status = 'completed'
  next.endReason = 'manual'
  next.winnerId = chosenWinnerId
  next.endedAt = Date.now()
  return next
}

export function buildCompletedGame(game: GameState): CompletedGame {
  if (!game.winnerId || !game.endReason || !game.endedAt) {
    throw new Error('Oyun henüz tamamlanmadı')
  }
  const results: CompletedGame['results'] = {}
  for (const id of game.playerIds) {
    const finalBalance = game.balances[id] ?? 0
    results[id] = { finalBalance, net: finalBalance - game.buyIn }
  }
  return {
    id: game.id,
    startedAt: game.startedAt,
    endedAt: game.endedAt,
    playerIds: game.playerIds,
    buyIn: game.buyIn,
    winnerId: game.winnerId,
    endReason: game.endReason,
    results,
  }
}

export interface LeaderboardRow {
  id: PlayerId
  name: string
  nickname: string
  icon: PlayerProfile['icon']
  color: string
  gamesPlayed: number
  wins: number
  totalNet: number
  winRate: number
}

export function computeLeaderboard(history: CompletedGame[]): LeaderboardRow[] {
  const stats: Record<PlayerId, { gamesPlayed: number; wins: number; totalNet: number }> =
    {} as never

  for (const g of history) {
    for (const id of g.playerIds) {
      if (!stats[id]) stats[id] = { gamesPlayed: 0, wins: 0, totalNet: 0 }
      stats[id].gamesPlayed += 1
      stats[id].totalNet += g.results[id]?.net ?? 0
      if (g.winnerId === id) stats[id].wins += 1
    }
  }

  const rows: LeaderboardRow[] = PLAYERS.map((profile) => {
    const s = stats[profile.id] ?? { gamesPlayed: 0, wins: 0, totalNet: 0 }
    return {
      id: profile.id,
      name: profile.name,
      nickname: profile.nickname,
      icon: profile.icon,
      color: profile.color,
      gamesPlayed: s.gamesPlayed,
      wins: s.wins,
      totalNet: s.totalNet,
      winRate: s.gamesPlayed > 0 ? s.wins / s.gamesPlayed : 0,
    }
  })

  rows.sort((a, b) => b.wins - a.wins || b.totalNet - a.totalNet)
  return rows
}
