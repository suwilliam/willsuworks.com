// The site's ripple motif: concentric rings that start almost round and grow
// lopsided toward the outside, like ripples in water or tree rings. Used
// around the homepage photo and, smaller and fainter, on the other pages.

export type RippleOptions = {
  /** Radius where the first ring starts, as a share of the drawing's width (0–0.5). */
  inner: number
  /** How far out the rings reach beyond inner, as a share of the width. */
  band: number
  /** How many rings. */
  count: number
  /** Each ring's thickness as a share of the distance to the next ring. */
  thickness: number
  /** How lopsided the rings get toward the outside (0 = perfect circles). */
  stretch?: number
  /** Turns the lopsided shape, in radians, so repeated ripples don't all match. */
  phase?: number
}

/**
 * The rings as one SVG path for a 0–100 viewBox. Fill it with the even-odd
 * rule: each pair of edges bounds a ring and the gaps stay empty.
 */
export function ripplePath({
  inner,
  band,
  count,
  thickness,
  stretch = 0.35,
  phase = 0,
}: RippleOptions) {
  const pitch = band / ((count - 1 + thickness) * (1 + stretch))
  const edges = Array.from({ length: count }, (_, ring) => [
    ring * pitch,
    (ring + thickness) * pitch,
  ]).flat()
  const steps = 240
  // A few slow waves of different sizes make the spacing wider on some sides.
  const wobble = (angle: number) =>
    (0.57 * Math.sin(2 * angle + 0.6 + phase) +
      0.34 * Math.sin(3 * angle + 2.1 + phase) +
      0.09 * Math.sin(5 * angle + 0.3 + phase)) *
    stretch

  return edges
    .map((offset) => {
      const points = Array.from({ length: steps }, (_, j) => {
        const angle = (j / steps) * Math.PI * 2
        const r = (inner + offset * (1 + wobble(angle))) * 100
        return `${(50 + r * Math.cos(angle)).toFixed(2)} ${(50 + r * Math.sin(angle)).toFixed(2)}`
      })
      return `M${points.join('L')}Z`
    })
    .join('')
}
