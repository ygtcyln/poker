import { colorOf } from '../lib/colorClasses'
import { formatSignedTL } from '../lib/format'
import type { LeaderboardRow } from '../lib/gameLogic'

interface LeaderboardTableProps {
  rows: LeaderboardRow[]
}

const MEDALS = ['🥇', '🥈', '🥉']

export default function LeaderboardTable({ rows }: LeaderboardTableProps) {
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((row, idx) => {
        const c = colorOf(row.color)
        const medal = row.wins > 0 ? MEDALS[idx] : undefined
        return (
          <li
            key={row.id}
            className={`flex items-center gap-3 rounded-2xl border border-white/10 p-3 ${c.soft}`}
          >
            <span className="w-6 text-center text-sm font-bold text-white/40">{idx + 1}</span>
            <span className="text-2xl">{row.emoji}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 truncate text-sm font-semibold">
                {row.nickname} {medal}
              </div>
              <div className="truncate text-xs text-white/50">
                {row.name} · {row.gamesPlayed} oyun
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
