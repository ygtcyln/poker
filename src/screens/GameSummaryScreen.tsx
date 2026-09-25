import { LuTrophy } from 'react-icons/lu'
import { getPlayer } from '../data/players'
import { useGame } from '../context/GameContext'
import { colorOf } from '../lib/colorClasses'
import { formatSignedTL, formatTL } from '../lib/format'

interface GameSummaryScreenProps {
  onHome: () => void
  onDashboard: () => void
}

export default function GameSummaryScreen({ onHome, onDashboard }: GameSummaryScreenProps) {
  const { lastCompletedGame, clearSummary } = useGame()

  if (!lastCompletedGame) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-white/60">Gösterilecek oyun sonucu yok.</p>
        <button
          type="button"
          onClick={() => {
            clearSummary()
            onHome()
          }}
          className="min-h-12 rounded-xl bg-emerald-500 px-6 font-bold text-black"
        >
          Ana Sayfa
        </button>
      </div>
    )
  }

  const winner = getPlayer(lastCompletedGame.winnerId)
  const winnerColor = colorOf(winner.color)
  const sortedPlayerIds = [...lastCompletedGame.playerIds].sort(
    (a, b) => (lastCompletedGame.results[b]?.net ?? 0) - (lastCompletedGame.results[a]?.net ?? 0),
  )

  function goHome() {
    clearSummary()
    onHome()
  }

  function goDashboard() {
    clearSummary()
    onDashboard()
  }

  return (
    <div className="flex flex-1 flex-col p-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
        <LuTrophy className="h-16 w-16 text-amber-400" />
        <p className="text-sm text-white/50">Oyunun Kazananı</p>
        <p className={`flex items-center gap-2 text-3xl font-extrabold ${winnerColor.text}`}>
          <winner.icon className="h-8 w-8" /> {winner.name}
        </p>
        <p className="text-white/50">{winner.nickname}</p>
        {lastCompletedGame.endReason === 'manual' && (
          <p className="mt-1 text-xs text-white/30">Oyun manuel olarak bitirildi</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {sortedPlayerIds.map((id) => {
          const p = getPlayer(id)
          const result = lastCompletedGame.results[id]
          const net = result?.net ?? 0
          return (
            <div
              key={id}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              <p.icon className="h-7 w-7 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="truncate text-xs text-white/50">
                  {p.nickname} · Final: {formatTL(result?.finalBalance ?? 0)}
                </div>
              </div>
              <div
                className={`text-lg font-bold tabular-nums ${
                  net > 0 ? 'text-emerald-400' : net < 0 ? 'text-red-400' : 'text-white/50'
                }`}
              >
                {formatSignedTL(net)}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={goHome}
          className="min-h-14 rounded-2xl bg-emerald-500 text-base font-bold text-black active:scale-95"
        >
          Ana Sayfa
        </button>
        <button
          type="button"
          onClick={goDashboard}
          className="min-h-14 rounded-2xl border border-white/15 bg-white/5 text-base font-bold text-white active:scale-95"
        >
          Skor Tablosu
        </button>
      </div>
    </div>
  )
}
