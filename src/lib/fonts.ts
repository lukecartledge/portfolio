// Poppins regular (400) is preloaded on every page. Pages that show the light or
// medium weight above the fold preload it too, so it never swaps in late.
export type PreloadWeight = 'light' | 'medium'

const FONT_FILES: Record<PreloadWeight, string> = {
  light: '/fonts/Poppins-Light-Latin.woff2',
  medium: '/fonts/Poppins-Medium-Latin.woff2',
}

export function preloadFontFiles(weights: readonly PreloadWeight[]): string[] {
  return [...new Set(weights)].map((weight) => FONT_FILES[weight])
}
