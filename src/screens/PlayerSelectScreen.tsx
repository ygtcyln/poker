import { useState } from 'react'
import Header from '../components/Header'
import PlayerChip from '../components/PlayerChip'
import { PLAYERS } from '../data/players'
import type { PlayerId } from '../types'

interface PlayerSelectScreenProps {
  onBack: () => void
  onContinue: (playerIds: PlayerId[]) => void
}

export default function PlayerSelectScreen({ onBack, onContinue }: PlayerSelectScreenProps) {
  const [selected, setSelected] = useState<PlayerId[]>([])

  function toggle(id: PlayerId) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const canContinue = selected.length >= 2 && selected.length <= 6

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Oyuncuları Seç" onBack={onBack} />
      <div className="flex-1 overflow-y-auto p-4 pb-28">
        <p className="mb-4 text-sm text-white/50">2 ile 6 kişi arasında seçim yap.</p>
        <div className="grid grid-cols-2 gap-3">
          {PLAYERS.map((p) => (
            <PlayerChip
              key={p.id}
              player={p}
              selected={selected.includes(p.id)}
              onToggle={() => toggle(p.id)}
            />
          ))}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-[#0f1115]/95 p-4 backdrop-blur">
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => onContinue(selected)}
          className="min-h-14 w-full rounded-xl bg-emerald-500 text-base font-bold text-black disabled:opacity-30 active:scale-95"
        >
          Devam Et ({selected.length}/6 seçildi)
        </button>
      </div>
    </div>
  )
}
