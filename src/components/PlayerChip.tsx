import { colorOf } from '../lib/colorClasses'
import type { PlayerProfile } from '../types'

interface PlayerChipProps {
  player: PlayerProfile
  selected: boolean
  onToggle: () => void
  disabled?: boolean
}

export default function PlayerChip({ player, selected, onToggle, disabled }: PlayerChipProps) {
  const c = colorOf(player.color)
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={[
        'flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 px-3 py-4 text-center transition active:scale-95',
        selected ? c.solid : `bg-white/5 ${c.outline}`,
        disabled && !selected ? 'opacity-40' : '',
      ].join(' ')}
    >
      <player.icon className="h-8 w-8" />
      <span className="text-sm font-bold leading-tight">{player.nickname}</span>
      <span className={selected ? 'text-xs opacity-80' : 'text-xs opacity-60'}>{player.name}</span>
    </button>
  )
}
