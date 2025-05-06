export function timeSince(timestamp: Date | number | string): string {
  const now = new Date()
  const then = new Date(timestamp)
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (seconds < 5) return 'just now'

  const units: [number, string][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.34524, 'week'],
    [12, 'month'],
    [Infinity, 'year'],
  ]

  let unitIndex = 0
  let count = seconds

  for (; unitIndex < units.length - 1; unitIndex++) {
    const [divisor, _] = units[unitIndex]
    if (count < divisor) break
    count /= divisor
  }

  const rounded = Math.floor(count)
  const unit = units[unitIndex][1]
  return `${rounded} ${unit}${rounded !== 1 ? 's' : ''} ago`
}
