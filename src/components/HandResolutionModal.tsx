import { useState } from 'react'
import { IconArrowLeft } from './icons'
import { colorOf } from '../lib/colorClasses'
import { formatTL } from '../lib/format'
import type { PlayerId, PlayerProfile } from '../types'

interface HandResolutionModalProps {
  activePlayers: PlayerProfile[]
  onConfirm: (winnerId: PlayerId, losses: Partial<Record<PlayerId, number>>) => void
  onCancel: () => void
}

export default function HandResolutionModal({
  activePlayers,
  onConfirm,
  onCancel,
}: HandResolutionModalProps) {
  const [winnerId, setWinnerId] = useState<PlayerId | null>(null)
  const [losses, setLosses] = useState<Partial<Record<PlayerId, string>>>({})

  const losers = activePlayers.filter((p) => p.id !== winnerId)
  const totalPot = losers.reduce((sum, p) => sum + (Number(losses[p.id]) || 0), 0)

  function setLoss(id: PlayerId, raw: string) {
    const cleaned = raw.replace(/[^0-9]/g, '')
    setLosses((prev) => ({ ...prev, [id]: cleaned }))
  }

  function handleConfirm() {
    if (!winnerId) return
    const parsed: Partial<Record<PlayerId, number>> = {}
    for (const p of losers) parsed[p.id] = Number(losses[p.id]) || 0
    onConfirm(winnerId, parsed)
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col bg-[#0f1115]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <button
          type="button"
          onClick={winnerId ? () => setWinnerId(null) : onCancel}
          aria-label="Geri"
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-white/10"
        >
          <IconArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="flex-1 text-center text-lg font-bold">
          {winnerId ? 'Kayıpları Gir' : 'Eli Kim Kazandı?'}
        </h2>
        <span className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-28">
        {!winnerId ? (
          <div className="grid grid-cols-2 gap-3">
            {activePlayers.map((p) => {
              const c = colorOf(p.color)
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setWinnerId(p.id)}
                  className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 bg-white/5 px-3 py-4 text-center active:scale-95 ${c.outline}`}
                >
                  <p.icon className="h-8 w-8" />
                  <span className="text-sm font-bold">{p.nickname}</span>
                  <span className="text-xs opacity-60">{p.name}</span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {(() => {
              const winner = activePlayers.find((p) => p.id === winnerId)
              if (!winner) return null
              return (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                  <span>Kazanan:</span>
                  <winner.icon className="h-5 w-5" />
                  <span className="font-bold">{winner.nickname}</span>
                </div>
              )
            })()}
            {losers.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <p.icon className="h-6 w-6 shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{p.nickname}</div>
                  <div className="text-xs text-white/50">{p.name} kaç kaybetti?</div>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  value={losses[p.id] ?? ''}
                  onChange={(e) => setLoss(p.id, e.target.value)}
                  className="w-28 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-right text-lg font-bold tabular-nums text-white focus:border-emerald-400 focus:outline-none"
                />
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm">
              <span className="text-white/60">Kazanana eklenecek toplam</span>
              <span className="font-bold text-emerald-400">{formatTL(totalPot)}</span>
            </div>
          </div>
        )}
      </div>

      {winnerId && (
        <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-[#0f1115]/95 p-4 backdrop-blur">
          <button
            type="button"
            onClick={handleConfirm}
            className="min-h-14 w-full rounded-xl bg-emerald-500 text-base font-bold text-black active:scale-95"
          >
            Eli Onayla
          </button>
        </div>
      )}
    </div>
  )
}
