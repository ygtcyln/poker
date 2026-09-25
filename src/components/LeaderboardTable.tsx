import { LuMedal, LuTrophy } from 'react-icons/lu'
import { colorOf } from '../lib/colorClasses'
import { formatSignedTL } from '../lib/format'
import type { LeaderboardRow } from '../lib/gameLogic'

interface LeaderboardTableProps {
  rows: LeaderboardRow[]
}

const RANK_STYLES = [
  { Icon: LuTrophy, className: 'h-4 w-4 text-amber-400' },
  { Icon: LuMedal, className: 'h-4 w-4 text-slate-300' },
  { Icon: LuMedal, className: 'h-4 w-4 text-orange-400' },
]

export default function LeaderboardTable({ rows }: LeaderboardTableProps) {
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((row, idx) => {
        const c = colorOf(row.color)
        const rank = row.wins > 0 ? RANK_STYLES[idx] : undefined
        return (
          <li
            key={row.id}
            className={`flex items-center gap-3 rounded-2xl border border-white/10 p-3 ${c.soft}`}
          >
            <span className="w-6 text-center text-sm font-bold text-white/40">{idx + 1}</span>
            <row.icon className={`h-7 w-7 shrink-0 ${c.text}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 truncate text-sm font-semibold">
                {row.name} {rank && <rank.Icon className={rank.className} />}
              </div>
              <div className="truncate text-xs text-white/50">
                {row.nickname} · {row.gamesPlayed} oyun
              </div>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${c.text}`}>{row.wins} galibiyet</div>
              <div
                className={`text-xs font-semibold tabular-nums ${
                  row.totalNet > 0 ? 'text-emerald-400' : row.totalNet < 0 ? 'text-red-400' : 'text-white/40'
                }`}
              >
                {formatSignedTL(row.totalNet)}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
