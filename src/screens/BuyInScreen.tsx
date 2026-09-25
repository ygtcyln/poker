import { useState } from 'react'
import Header from '../components/Header'
import PresetAmountButtons from '../components/PresetAmountButtons'
import { getPlayer } from '../data/players'
import { formatTL } from '../lib/format'
import type { PlayerId } from '../types'

const PRESETS = [5000, 10000, 20000, 25000, 50000]

interface BuyInScreenProps {
  playerIds: PlayerId[]
  onBack: () => void
  onStart: (buyIn: number) => void
}

export default function BuyInScreen({ playerIds, onBack, onStart }: BuyInScreenProps) {
  const [buyIn, setBuyIn] = useState(10000)
  const [customMode, setCustomMode] = useState(false)
  const [customValue, setCustomValue] = useState('')

  function applyCustom(raw: string) {
    const cleaned = raw.replace(/[^0-9]/g, '')
    setCustomValue(cleaned)
    const n = Number(cleaned)
    if (n > 0) setBuyIn(n)
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Kişi Başı Miktar" onBack={onBack} />
      <div className="flex-1 overflow-y-auto p-4 pb-28">
        <div className="mb-5 flex flex-wrap gap-2">
          {playerIds.map((id) => {
            const p = getPlayer(id)
            return (
              <span
                key={id}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm"
              >
                <p.icon className="h-4 w-4" /> {p.nickname}
              </span>
            )
          })}
        </div>

        <p className="mb-2 text-sm text-white/50">Herkese verilecek başlangıç bakiyesi</p>
        <PresetAmountButtons
          presets={PRESETS}
          value={customMode ? -1 : buyIn}
          onSelect={(v) => {
            setCustomMode(false)
            setBuyIn(v)
          }}
        />

        <button
          type="button"
          onClick={() => setCustomMode(true)}
          className={`mt-2 min-h-14 w-full rounded-xl border-2 text-sm font-bold transition active:scale-95 ${
            customMode ? 'border-emerald-400 bg-emerald-500/10' : 'border-white/15 bg-white/5 text-white/80'
          }`}
        >
          Özel Miktar
        </button>

        {customMode && (
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            autoFocus
            placeholder="Örn. 15000"
            value={customValue}
            onChange={(e) => applyCustom(e.target.value)}
            className="mt-3 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-right text-xl font-bold tabular-nums text-white focus:border-emerald-400 focus:outline-none"
          />
        )}

        <div className="mt-6 rounded-2xl bg-white/5 p-4 text-center">
          <p className="text-xs text-white/50">Kişi başı</p>
          <p className="text-2xl font-extrabold text-emerald-400">{formatTL(buyIn)}</p>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-[#0f1115]/95 p-4 backdrop-blur">
        <button
          type="button"
          disabled={buyIn <= 0}
          onClick={() => onStart(buyIn)}
          className="min-h-14 w-full rounded-xl bg-emerald-500 text-base font-bold text-black disabled:opacity-30 active:scale-95"
        >
          Oyunu Başlat
        </button>
      </div>
    </div>
  )
}
