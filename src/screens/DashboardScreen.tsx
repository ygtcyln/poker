import Header from '../components/Header'
import LeaderboardTable from '../components/LeaderboardTable'
import { getPlayer } from '../data/players'
import { useGame } from '../context/GameContext'
import { formatDate, formatTL } from '../lib/format'
import { computeLeaderboard } from '../lib/gameLogic'

interface DashboardScreenProps {
  onBack: () => void
}

export default function DashboardScreen({ onBack }: DashboardScreenProps) {
  const { history } = useGame()
  const leaderboard = computeLeaderboard(history)
  const recentGames = [...history].sort((a, b) => b.endedAt - a.endedAt).slice(0, 10)

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Skor Tablosu" onBack={onBack} />
      <div className="flex-1 overflow-y-auto p-4">
        <LeaderboardTable rows={leaderboard} />

        <div className="mt-8">
          <h2 className="mb-3 text-sm font-bold text-white/60">Son Oyunlar</h2>
          {recentGames.length === 0 ? (
            <p className="text-sm text-white/40">Henüz tamamlanmış oyun yok.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {recentGames.map((g) => {
                const winner = getPlayer(g.winnerId)
                return (
                  <li key={g.id} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <winner.icon className="h-4 w-4" /> {winner.name} kazandı
                      </span>
                      <span className="text-xs text-white/40">{formatDate(g.endedAt)}</span>
                    </div>
                    <div className="text-xs text-white/50">
                      {g.playerIds.map((id) => getPlayer(id).name).join(', ')} · Kişi başı{' '}
                      {formatTL(g.buyIn)}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
