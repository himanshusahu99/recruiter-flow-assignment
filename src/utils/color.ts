export function hexToRgb(hex: string) {
  const hexWithoutHash = hex.replace('#', '')
  const bigint = parseInt(hexWithoutHash, 16)
  const red = (bigint >> 16) & 255
  const green = (bigint >> 8) & 255
  const blue = bigint & 255
  return `(${red}, ${green}, ${blue})`
}
