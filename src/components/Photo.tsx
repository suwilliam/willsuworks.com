import './Photo.css'

type PhotoProps = {
  src: string
  alt: string
  position?: string
  zoom?: number
}

// Ripple border: concentric rings around the photo that drift from a circle
// near the photo into a looser, lopsided shape at the outside, like op-art
// or tree rings. Shown when a theme sets --photo-rings: block.
// RING_BAND must match the theme's --photo-frame-padding (11% = 0.11): it is
// the share of the frame's width on each side that the rings fill.
const RING_BAND = 0.11
const RING_COUNT = 4
// How much the ring spacing varies around the photo (0 = perfect circles).
const RING_STRETCH = 0.35

function ringPath() {
  const inner = 0.5 - RING_BAND
  // Each ring is a stripe and a gap of equal width, so 2 edges per ring.
  // Edge 0 sits exactly on the photo's circle, so the first stripe hugs it.
  const edges = RING_COUNT * 2
  const step = RING_BAND / ((edges - 1) * (1 + RING_STRETCH))
  const steps = 240
  // A few slow waves of different sizes make the spacing wider on some sides,
  // so the rings start almost round and grow lopsided toward the outside.
  const stretch = (angle: number) =>
    (0.57 * Math.sin(2 * angle + 0.6) + 0.34 * Math.sin(3 * angle + 2.1) + 0.09 * Math.sin(5 * angle + 0.3)) *
    RING_STRETCH

  // Edges 0–1, 2–3, … bound the stripes; the even-odd fill rule fills
  // between each pair and leaves the gaps empty.
  return Array.from({ length: edges }, (_, edge) => {
    const points = Array.from({ length: steps }, (_, j) => {
      const angle = (j / steps) * Math.PI * 2
      const r = (inner + edge * step * (1 + stretch(angle))) * 100
      return `${(50 + r * Math.cos(angle)).toFixed(2)} ${(50 + r * Math.sin(angle)).toFixed(2)}`
    })
    return `M${points.join('L')}Z`
  }).join('')
}

const ringsPath = ringPath()

export default function Photo({ src, alt, position = '50% 50%', zoom = 1 }: PhotoProps) {
  return (
    <figure className="photo-frame">
      <svg className="photo-rings" viewBox="0 0 100 100" aria-hidden="true">
        <path d={ringsPath} fillRule="evenodd" />
      </svg>

      {src ? (
        <div className="photo">
          <img
            src={src}
            alt={alt}
            style={{ objectPosition: position, transformOrigin: position, scale: String(zoom) }}
          />
        </div>
      ) : (
        <div className="photo photo-placeholder">[your photo]</div>
      )}
    </figure>
  )
}
