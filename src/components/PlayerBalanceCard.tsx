import { colorOf } from '../lib/colorClasses'
import { formatTL } from '../lib/format'
import type { PlayerProfile } from '../types'

interface PlayerBalanceCardProps {
  player: PlayerProfile
  balance: number
  busted: boolean
}

export default function PlayerBalanceCard({ player, balance, busted }: PlayerBalanceCardProps) {
  const c = colorOf(player.color)
  return (
    <div
      className={[
        'relative flex items-center gap-3 rounded-2xl border border-white/10 p-4',
        busted ? 'opacity-50 grayscale' : c.soft,
      ].join(' ')}
    >
      <player.icon className={`h-8 w-8 shrink-0 ${busted ? '' : c.text}`} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{player.nickname}</div>
        <div className="truncate text-xs text-white/50">{player.name}</div>
      </div>
      <div className={`text-right text-2xl font-bold tabular-nums md:text-3xl ${busted ? '' : c.text}`}>
        {formatTL(balance)}
      </div>
      {busted && (
        <span className="absolute -top-2 right-3 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Elendi
        </span>
      )}
    </div>
  )
}
