export const roundToNearestLegalValue = (value, step = 1) => {
  const remainder = value % step
  if (remainder >= step / 2) {
    return Math.ceil(value / step) * step
  } else {
    return Math.floor(value / step) * step
  }
}
