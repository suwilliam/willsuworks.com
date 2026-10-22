import { useEffect, useRef, useState, type CSSProperties } from 'react'
import './Photo.css'

type PhotoProps = {
  src: string
  alt: string
  position?: string
  zoom?: number
}

// Hand-drawn wave rings around the photo, shown when a theme sets
// --photo-rings: block. They sit in the frame's padding (the theme's
// --photo-frame-padding, 14%), between the photo's edge and the frame's.
//
// They look a little like sound waves: tight waves that come in loud bursts
// with quiet stretches between, like an audio waveform. The rings don't spin.
// Their waves travel along them, the bursts drift slowly around, and every few
// seconds a swell ripples outward through the rings one after another. Each
// ring is a little different, like it was drawn by hand: its own loudest wave
// size and count (amplitude, waves), line weight (width), a lopsided bulge
// (wobble), and a few breaks in the line (gaps: where each starts and how long
// it is, as shares of the way around). seconds is how long a crest takes to
// travel all the way around. Each ring has three bursts, and burstPhase
// staggers them so a burst on one ring always faces a quiet stretch on the
// next, which keeps neighbouring rings from touching.
const RINGS = [
  {
    radius: 38.4,
    amplitude: 0.8,
    waves: 46,
    seconds: 40,
    width: 2.8,
    wobble: 0.12,
    burstPhase: 0.3,
    phase: 0.4,
    gaps: [[0.55, 0.03]],
  },
  {
    radius: 41.6,
    amplitude: 0.95,
    waves: 40,
    seconds: 50,
    width: 2.2,
    wobble: 0.2,
    burstPhase: 2.4,
    phase: 2.1,
    gaps: [
      [0.3, 0.03],
      [0.78, 0.22],
    ],
  },
  {
    radius: 44.8,
    amplitude: 1.1,
    waves: 34,
    seconds: 62,
    width: 2.6,
    wobble: 0.28,
    burstPhase: 4.5,
    phase: 4.0,
    gaps: [[0.1, 0.03]],
  },
]

// Each page load, every ring picks its own wave size and speed within these
// ranges (as multiples of the values above), so the rings look a little
// different every visit. Both are kept gentle: waves at most 0.75× their
// base size, and crests taking several seconds to pass any one point.
const AMPLITUDE_RANGE = [0.4, 0.75]
const SPEED_RANGE = [0.12, 0.3]

const between = ([min, max]: number[]) => min + Math.random() * (max - min)

function randomizeRings() {
  return RINGS.map((ring) => ({
    ...ring,
    amplitude: ring.amplitude * between(AMPLITUDE_RANGE),
    // seconds is time for a crest to go all the way round, so faster = fewer seconds.
    seconds: ring.seconds / between(SPEED_RANGE),
  }))
}

// The outward swell: one every PULSE_EVERY seconds, reaching each ring
// PULSE_STEP seconds after the one inside it. It pushes a ring out by up to
// PULSE_PUSH (drawing units) and makes its waves up to 40% taller.

// BURSTS loud stretches per ring, each taking BURST_SECONDS to drift all the
// way around. Between them the waves drop to QUIET of their loudest size.
const BURSTS = 3
const BURST_SECONDS = 150
const QUIET = 0.18
const PULSE_EVERY = 7
const PULSE_STEP = 0.45
const PULSE_WIDTH = 0.4
const PULSE_PUSH = 0.3

// A slow, uneven bulge around the ring (a mix of a few long waves), between -1 and 1.
const bulge = (angle: number, phase: number) =>
  0.57 * Math.sin(2 * angle + phase) +
  0.34 * Math.sin(3 * angle + 2.1 + phase) +
  0.09 * Math.sin(5 * angle + 0.3 + phase)

// How strongly the swell is passing through ring `index` at time t (0 to 1).
function pulseAt(t: number, index: number) {
  const since = (t % PULSE_EVERY) - 1 - index * PULSE_STEP
  return Math.exp(-(since * since) / (2 * PULSE_WIDTH * PULSE_WIDTH))
}

// One wavy ring on a 0–100 drawing at time t (seconds), centred in the middle.
function ringPath(ring: (typeof RINGS)[number], index: number, t: number) {
  const { radius, amplitude, waves, seconds, wobble, burstPhase, phase, gaps } = ring
  const steps = 720
  const travel = (2 * Math.PI * t) / seconds
  const pulse = pulseAt(t, index)
  let d = ''
  let penDown = false
  for (let i = 0; i <= steps; i++) {
    const at = i / steps
    if (gaps.some(([start, length]) => at > start && at < start + length)) {
      penDown = false
      continue
    }
    const angle = (i / steps) * Math.PI * 2 + phase
    // Loud bursts and quiet stretches, like a waveform.
    const burst =
      Math.max(0, Math.sin(BURSTS * (angle - (2 * Math.PI * t) / BURST_SECONDS) + burstPhase)) ** 2
    const size = amplitude * (QUIET + (1 - QUIET) * burst) * (1 + 0.4 * pulse)
    const r =
      radius +
      PULSE_PUSH * pulse +
      wobble * bulge(angle, phase) +
      size * Math.sin(waves * (angle - travel))
    d += `${penDown ? 'L' : 'M'}${(50 + r * Math.cos(angle)).toFixed(2)} ${(50 + r * Math.sin(angle)).toFixed(2)}`
    penDown = true
  }
  return d
}

export default function Photo({ src, alt, position = '50% 50%', zoom = 1 }: PhotoProps) {
  const ringRefs = useRef<(SVGPathElement | null)[]>([])
  // Picked once per page load.
  const [rings] = useState(randomizeRings)

  // Redraw the rings about 30 times a second so their waves move. Still
  // (drawn once) for people who prefer reduced motion.
  useEffect(() => {
    const draw = (t: number) =>
      rings.forEach((ring, i) => ringRefs.current[i]?.setAttribute('d', ringPath(ring, i, t)))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(0)
      return
    }

    let frame = 0
    let last = 0
    const start = performance.now()
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (now - last < 33) return
      last = now
      draw((now - start) / 1000)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [rings])

  return (
    <figure className="photo-frame">
      <svg className="photo-rings" viewBox="0 0 100 100" aria-hidden="true">
        {rings.map((ring, i) => (
          <path
            key={ring.radius}
            ref={(el) => {
              ringRefs.current[i] = el
            }}
            className="photo-ring"
            d={ringPath(ring, i, 0)}
            vectorEffect="non-scaling-stroke"
            style={{ '--ring-width': `${ring.width}px` } as CSSProperties}
          />
        ))}
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
