import './Photo.css'
import { ripplePath } from './ripplePath'

type PhotoProps = {
  src: string
  alt: string
  position?: string
  zoom?: number
}

// Ripple border around the photo (the site's ripple motif, see ripplePath.ts).
// Shown when a theme sets --photo-rings: block.
// RING_BAND must match the theme's --photo-frame-padding (14% = 0.14): it is
// the share of the frame's width on each side that the rings fill.
const RING_BAND = 0.14
const RING_COUNT = 4
// How much the ring spacing varies around the photo (0 = perfect circles).
const RING_STRETCH = 0.35
// Each ring's thickness as a share of the distance from one ring to the next
// (0.5 = stripe and gap the same width; smaller = thinner rings).
const RING_THICKNESS = 0.27

const ringsPath = ripplePath({
  inner: 0.5 - RING_BAND,
  band: RING_BAND,
  count: RING_COUNT,
  thickness: RING_THICKNESS,
  stretch: RING_STRETCH,
})

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
