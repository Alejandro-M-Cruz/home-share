function textToFloat(text: string): number | undefined {
  const float = parseFloat(text)
  return isNaN(float) ? undefined : float
}

function textToInt(text: string): number | undefined {
  const int = parseInt(text)
  return isNaN(int) ? undefined : int
}

export { textToFloat, textToInt }
