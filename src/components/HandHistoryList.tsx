import { getPlayer } from '../data/players'
import { formatTL } from '../lib/format'
import type { HandRecord } from '../types'

interface HandHistoryListProps {
  hands: HandRecord[]
}

export default function HandHistoryList({ hands }: HandHistoryListProps) {
  if (hands.length === 0) {
    return <p className="px-1 text-sm text-white/40">Henüz el oynanmadı.</p>
  }

  const reversed = [...hands].reverse()

  return (
    <ul className="flex flex-col gap-2">
      {reversed.map((hand, idx) => {
        const winner = getPlayer(hand.winnerId)
        const loserEntries = Object.entries(hand.losses) as [string, number][]
        return (
          <li key={hand.id} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-semibold">
                {winner.emoji} {winner.nickname} kazandı
              </span>
              <span className="text-xs text-white/40">El {hands.length - idx}</span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/60">
              {loserEntries.map(([id, amount]) => {
                const p = getPlayer(id as HandRecord['winnerId'])
                return (
                  <span key={id}>
                    {p.nickname}: -{formatTL(amount)}
                  </span>
                )
              })}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
