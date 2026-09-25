import { LuArrowLeft } from 'react-icons/lu'
import { colorOf } from '../lib/colorClasses'
import type { PlayerId, PlayerProfile } from '../types'

interface EndGameModalProps {
  activePlayers: PlayerProfile[]
  onConfirm: (winnerId: PlayerId) => void
  onCancel: () => void
}

export default function EndGameModal({ activePlayers, onConfirm, onCancel }: EndGameModalProps) {
  return (
    <div className="fixed inset-0 z-30 flex flex-col bg-[#0f1115]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Geri"
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-white/10"
        >
          <LuArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="flex-1 text-center text-lg font-bold">Oyunu Kim Kazandı?</h2>
        <span className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-4 text-sm text-white/60">
          Oyunu şimdi bitirmek üzeresin. Tek bir kazanan seç, oyun anında sona erecek.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {activePlayers.map((p) => {
            const c = colorOf(p.color)
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onConfirm(p.id)}
                className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 bg-white/5 px-3 py-4 text-center active:scale-95 ${c.outline}`}
              >
                <p.icon className="h-8 w-8" />
                <span className="text-sm font-bold">{p.name}</span>
                <span className="text-xs opacity-60">{p.nickname}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
