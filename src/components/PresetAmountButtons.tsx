import { formatTL } from '../lib/format'

interface PresetAmountButtonsProps {
  presets: number[]
  value: number
  onSelect: (value: number) => void
}

export default function PresetAmountButtons({ presets, value, onSelect }: PresetAmountButtonsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {presets.map((amount) => {
        const selected = amount === value
        return (
          <button
            key={amount}
            type="button"
            onClick={() => onSelect(amount)}
            className={[
              'min-h-14 rounded-xl border-2 text-sm font-bold transition active:scale-95',
              selected
                ? 'border-emerald-400 bg-emerald-500 text-black'
                : 'border-white/15 bg-white/5 text-white/80',
            ].join(' ')}
          >
            {formatTL(amount)}
          </button>
        )
      })}
    </div>
  )
}
