import type { PlayerId, PlayerProfile } from '../types'

export const PLAYERS: PlayerProfile[] = [
  { id: 'yigit', name: 'Yiğit', nickname: 'Aslan Yürek', emoji: '🦁', color: 'amber' },
  { id: 'sami', name: 'Sami', nickname: 'Sessiz Suikastçı', emoji: '🥷', color: 'slate' },
  { id: 'merdo', name: 'Merdo', nickname: 'Patron', emoji: '🧑🏿‍💼', color: 'violet' },
  { id: 'ibo', name: 'İbo', nickname: 'Joker', emoji: '🃏', color: 'rose' },
  { id: 'ugur', name: 'Uğur', nickname: 'Şanslı Uğur', emoji: '🍀', color: 'emerald' },
  { id: 'cagri', name: 'Çağrı', nickname: 'Santral', emoji: '📞', color: 'sky' },
]

export const PLAYERS_BY_ID: Record<PlayerId, PlayerProfile> = PLAYERS.reduce(
  (acc, p) => {
    acc[p.id] = p
    return acc
  },
  {} as Record<PlayerId, PlayerProfile>,
)

export function getPlayer(id: PlayerId): PlayerProfile {
  return PLAYERS_BY_ID[id]
}
