import type { ComponentType, SVGProps } from 'react'

export type PlayerId = 'yigit' | 'sami' | 'merdo' | 'ibo' | 'ugur' | 'cagri'

export interface PlayerProfile {
  id: PlayerId
  name: string
  nickname: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  color: string
}

export interface HandRecord {
  id: string
  timestamp: number
  winnerId: PlayerId
  /** Gerçekleşen (clamp sonrası) kayıplar, kaybeden başına */
  losses: Partial<Record<PlayerId, number>>
  /** Bu elden sonraki tam bakiye anlık görüntüsü (geri al için) */
  balancesAfter: Partial<Record<PlayerId, number>>
}

export type GameStatus = 'in_progress' | 'completed'
export type EndReason = 'auto' | 'manual'

export interface GameState {
  id: string
  startedAt: number
  status: GameStatus
  playerIds: PlayerId[]
  buyIn: number
  balances: Partial<Record<PlayerId, number>>
  hands: HandRecord[]
  endedAt?: number
  winnerId?: PlayerId
  endReason?: EndReason
}

export interface CompletedGame {
  id: string
  startedAt: number
  endedAt: number
  playerIds: PlayerId[]
  buyIn: number
  winnerId: PlayerId
  endReason: EndReason
  results: Partial<Record<PlayerId, { finalBalance: number; net: number }>>
}
