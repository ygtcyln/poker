import { FaPhone } from 'react-icons/fa6'
import { GiFullMotorcycleHelmet, GiJesterHat, GiNinjaHead, GiYinYang } from 'react-icons/gi'
import { IconMerdoPhoto } from '../components/icons'
import type { PlayerId, PlayerProfile } from '../types'

export const PLAYERS: PlayerProfile[] = [
  { id: 'yigit', name: 'Yiğit', nickname: 'Nerdesin Pango', icon: GiYinYang, color: 'amber' },
  { id: 'sami', name: 'Sami', nickname: 'Orkun Kökçüüü', icon: GiNinjaHead, color: 'slate' },
  { id: 'merdo', name: 'Merdo', nickname: 'Nigga', icon: IconMerdoPhoto, color: 'violet' },
  { id: 'ibo', name: 'İbo', nickname: 'Filozof', icon: GiJesterHat, color: 'rose' },
  { id: 'ugur', name: 'Uğur', nickname: 'Moto Kurye', icon: GiFullMotorcycleHelmet, color: 'emerald' },
  { id: 'cagri', name: 'Çağrı', nickname: 'Santral', icon: FaPhone, color: 'sky' },
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
