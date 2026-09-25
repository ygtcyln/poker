import { IconJokerCard } from '../components/icons'
import { getPlayer } from '../data/players'
import { useGame } from '../context/GameContext'

interface HomeScreenProps {
  onNewGame: () => void
  onDashboard: () => void
  onResumeGame: () => void
}

export default function HomeScreen({ onNewGame, onDashboard, onResumeGame }: HomeScreenProps) {
  const { activeGame, abandonGame } = useGame()

  return (
    <div className="flex flex-1 flex-col justify-center gap-6 p-6">
      <div className="text-center">
        <IconJokerCard className="mx-auto mb-2 h-16 w-16 text-emerald-400" />
        <h1 className="text-3xl font-extrabold">Poker Kasa Takip</h1>
        <p className="mt-1 text-sm text-white/50">Arkadaş grubu poker gecesi hesap defteri</p>
      </div>

      {activeGame && activeGame.status === 'in_progress' && (
        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4">
          <p className="mb-3 text-sm font-semibold text-emerald-300">Devam eden bir oyun var</p>
          <p className="mb-3 text-xs text-white/60">
            {activeGame.playerIds.map((id) => getPlayer(id).name).join(', ')}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onResumeGame}
              className="min-h-12 flex-1 rounded-xl bg-emerald-500 text-sm font-bold text-black active:scale-95"
            >
              Devam Et
            </button>
            <button
              type="button"
              onClick={abandonGame}
              className="min-h-12 flex-1 rounded-xl border border-white/20 text-sm font-bold text-white/70 active:scale-95"
            >
              Vazgeç
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onNewGame}
          className="min-h-14 rounded-2xl bg-emerald-500 text-base font-bold text-black active:scale-95"
        >
          Yeni Oyun
        </button>
        <button
          type="button"
          onClick={onDashboard}
          className="min-h-14 rounded-2xl border border-white/15 bg-white/5 text-base font-bold text-white active:scale-95"
        >
          Skor Tablosu
        </button>
      </div>
    </div>
  )
}
