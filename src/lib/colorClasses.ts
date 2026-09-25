// Tailwind class isimleri burada TAM string olarak yazılmalı; dinamik
// string birleştirme (örn. `bg-${color}-500`) Tailwind'in içerik
// tarayıcısı tarafından yakalanamaz ve build'de class kaybolur.

export interface ColorClassSet {
  /** Seçili/dolu chip ve butonlar */
  solid: string
  /** Seçili değilken kenarlık + metin rengi */
  outline: string
  /** Kart üstü ince vurgu şeridi */
  ring: string
  /** Büyük bakiye / vurgulu metin rengi */
  text: string
  /** Kart arkaplanı (koyu temada soft ton) */
  soft: string
}

export const COLOR_CLASSES: Record<string, ColorClassSet> = {
  amber: {
    solid: 'bg-amber-500 text-black border-amber-400',
    outline: 'border-amber-500/60 text-amber-300',
    ring: 'ring-amber-400',
    text: 'text-amber-400',
    soft: 'bg-amber-500/10',
  },
  slate: {
    solid: 'bg-slate-400 text-black border-slate-300',
    outline: 'border-slate-400/60 text-slate-300',
    ring: 'ring-slate-300',
    text: 'text-slate-300',
    soft: 'bg-slate-400/10',
  },
  violet: {
    solid: 'bg-violet-500 text-white border-violet-400',
    outline: 'border-violet-500/60 text-violet-300',
    ring: 'ring-violet-400',
    text: 'text-violet-400',
    soft: 'bg-violet-500/10',
  },
  rose: {
    solid: 'bg-rose-500 text-white border-rose-400',
    outline: 'border-rose-500/60 text-rose-300',
    ring: 'ring-rose-400',
    text: 'text-rose-400',
    soft: 'bg-rose-500/10',
  },
  emerald: {
    solid: 'bg-emerald-500 text-black border-emerald-400',
    outline: 'border-emerald-500/60 text-emerald-300',
    ring: 'ring-emerald-400',
    text: 'text-emerald-400',
    soft: 'bg-emerald-500/10',
  },
  sky: {
    solid: 'bg-sky-500 text-black border-sky-400',
    outline: 'border-sky-500/60 text-sky-300',
    ring: 'ring-sky-400',
    text: 'text-sky-400',
    soft: 'bg-sky-500/10',
  },
}

export function colorOf(color: string): ColorClassSet {
  return COLOR_CLASSES[color] ?? COLOR_CLASSES.slate
}
