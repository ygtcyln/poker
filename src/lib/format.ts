const tlFormatter = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 })

export function formatTL(amount: number): string {
  return `${tlFormatter.format(Math.round(amount))} TL`
}

export function formatSignedTL(amount: number): string {
  const rounded = Math.round(amount)
  const sign = rounded > 0 ? '+' : ''
  return `${sign}${tlFormatter.format(rounded)} TL`
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
