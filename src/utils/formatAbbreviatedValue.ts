export function formatAbbreviatedValue(value: number) {
  const suffixes = ['', 'K', 'M', 'B', 'T']
  let suffixIndex = 0

  while (value >= 1000 && suffixIndex < suffixes.length - 1) {
    suffixIndex++
    value /= 1000
  }

  return `${Number(value.toFixed(1))}${suffixes[suffixIndex]}`
}
