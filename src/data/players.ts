import {
  IconClover,
  IconJesterHat,
  IconMerdoPhoto,
  IconNinja,
  IconPhone,
  IconYinYang,
} from '../components/icons'
import type { PlayerId, PlayerProfile } from '../types'

export const PLAYERS: PlayerProfile[] = [
  { id: 'yigit', name: 'Yiğit', nickname: 'Nerdesin Pango', icon: IconYinYang, color: 'amber' },
  { id: 'sami', name: 'Sami', nickname: 'Sessiz Suikastçı', icon: IconNinja, color: 'slate' },
  { id: 'merdo', name: 'Merdo', nickname: 'Patron', icon: IconMerdoPhoto, color: 'violet' },
  { id: 'ibo', name: 'İbo', nickname: 'Joker', icon: IconJesterHat, color: 'rose' },
  { id: 'ugur', name: 'Uğur', nickname: 'Şanslı Uğur', icon: IconClover, color: 'emerald' },
  { id: 'cagri', name: 'Çağrı', nickname: 'Santral', icon: IconPhone, color: 'sky' },
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
