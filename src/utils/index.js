const formatDigits = digit => (digit < 10 ? `0${digit}` : digit)

export const formatDate = (date = Date.now()) => {
  const d = new Date(date)
  const hour = formatDigits(d.getHours())
  const min = formatDigits(d.getMinutes())
  return `${hour}:${min}`
}
