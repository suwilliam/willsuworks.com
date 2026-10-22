import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import './BeachWaves.css'

// Rows of waves rolling sideways, in the site's ripple colour. No sun here:
// the logo already has one. The rows in front are bigger and slower, the ones
// toward the horizon smaller and quicker, so it reads with some depth. Now
// and then a visitor turns up at random: a rubber duck, a message in a
// bottle, a leaping fish, a seagull or a little sailboat. Everything stays
// still, with no visitors, for people who turn off motion.

// Each row of waves: height on the drawing (0–100), wave height, wave length
// and how long it takes to roll one wave length.
const ROWS = [
  { y: 30, amplitude: 0.9, length: 12, seconds: 7 },
  { y: 42, amplitude: 1.3, length: 15, seconds: 8.5 },
  { y: 55, amplitude: 1.8, length: 19, seconds: 10 },
  { y: 70, amplitude: 2.4, length: 24, seconds: 12 },
  { y: 87, amplitude: 3, length: 30, seconds: 14 },
]

// A sine wave across the drawing plus one extra wave length, so sliding it
// left by exactly one wave length loops without a seam.
function wavePath(y: number, amplitude: number, length: number) {
  const points: string[] = []
  for (let x = -length; x <= 100 + length; x += 1) {
    const dy = amplitude * Math.sin((2 * Math.PI * x) / length)
    points.push(`${x.toFixed(1)} ${(y + dy).toFixed(2)}`)
  }
  return `M${points.join('L')}`
}

// ---- Visitors ----------------------------------------------------------
// Each is drawn around 0,0 in the waves' coordinates (the drawing is 100 wide).

type VisitorKind =
  'duck' | 'bottle' | 'fish' | 'gull' | 'boat' | 'surfer' | 'fisher' | 'paddler' | 'snorkeler'

type Visitor = {
  id: number
  kind: VisitorKind
  /** Height it sits at (a wave row, or the sky for the gull). */
  y: number
  /** Where a fish jumps (other visitors travel across). */
  x: number
  /** Bigger in front, smaller toward the horizon. */
  scale: number
  /** Travels right to left instead of left to right. */
  reverse: boolean
  /** How long it's on screen, in ms. */
  duration: number
}

const random = (min: number, max: number) => min + Math.random() * (max - min)
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]

// Rough odds of each visitor showing up.
const KINDS: VisitorKind[] = [
  'duck',
  'duck',
  'bottle',
  'bottle',
  'fish',
  'fish',
  'fish',
  'gull',
  'boat',
  'surfer',
  'surfer',
  'fisher',
  'paddler',
  'snorkeler',
]

let nextId = 0

function randomVisitor(): Visitor {
  const kind = pick(KINDS)
  // A middle or front row; not the bottom one, which fades out at the edge.
  const front = pick([2, 3])
  const base = { id: nextId++, kind, x: random(28, 72), reverse: false }
  switch (kind) {
    case 'duck':
      return { ...base, y: ROWS[front].y - 1.6, scale: 1.3 + front * 0.15, duration: 16000 }
    case 'bottle':
      return {
        ...base,
        y: ROWS[front].y - 0.8,
        scale: 1.35 + front * 0.15,
        reverse: true,
        duration: 19000,
      }
    case 'fish':
      return { ...base, y: ROWS[front].y, scale: 1.3 + front * 0.12, duration: 1900 }
    case 'gull':
      return {
        ...base,
        y: random(8, 18),
        scale: random(2, 2.5),
        reverse: Math.random() < 0.5,
        duration: 9000,
      }
    case 'boat':
      return { ...base, y: ROWS[1].y - 1, scale: 1.1, reverse: true, duration: 24000 }
    case 'surfer':
      return { ...base, y: ROWS[front].y - 1, scale: 1.25 + front * 0.12, duration: 11000 }
    case 'fisher':
      return { ...base, y: ROWS[pick([1, 2])].y - 1.2, scale: 1.45, reverse: true, duration: 28000 }
    case 'paddler':
      return {
        ...base,
        y: ROWS[front].y - 0.8,
        scale: 1.2 + front * 0.12,
        reverse: Math.random() < 0.5,
        duration: 20000,
      }
    case 'snorkeler':
      return {
        ...base,
        y: ROWS[front].y,
        scale: 1.9 + front * 0.15,
        reverse: Math.random() < 0.5,
        duration: 22000,
      }
  }
}

const DRAWINGS: Record<VisitorKind, ReactNode> = {
  // A rubber duck facing right, sitting on the water.
  duck: (
    <>
      <path d="M-3.6 -0.8 L-5.2 -2.8 L-2.4 -1.6Z" />
      <ellipse cx="0" cy="0" rx="4" ry="2.3" />
      <circle cx="2.9" cy="-2.6" r="1.75" />
      <path d="M4.4 -2.95 L6.3 -2.45 L4.4 -1.95Z" />
      <circle cx="3.35" cy="-3" r="0.36" className="beach-visitor-cut" />
      <path d="M-1.8 -0.5q1.7 1.3 3.4 0" className="beach-visitor-line" />
    </>
  ),
  // A corked bottle lying on its side, with a rolled-up note inside.
  bottle: (
    <>
      <rect x="-4" y="-1.3" width="6.4" height="2.6" rx="1.1" />
      <rect x="2.1" y="-0.7" width="2.1" height="1.4" rx="0.3" />
      <rect x="4.1" y="-0.78" width="1" height="1.56" rx="0.35" opacity="0.6" />
      <rect x="-3.1" y="-0.48" width="4.2" height="0.96" rx="0.48" className="beach-visitor-cut" />
    </>
  ),
  // A fish facing right (it leaps in an arc).
  fish: (
    <>
      <ellipse cx="0" cy="0" rx="3.2" ry="1.35" />
      <path d="M-2.7 0 L-4.9 -1.6 L-4.9 1.6Z" />
      <circle cx="1.9" cy="-0.3" r="0.32" className="beach-visitor-cut" />
    </>
  ),
  // A seagull, two curved wings.
  gull: (
    <path
      d="M-3.2 0Q-1.6 -1.8 0 0Q1.6 -1.8 3.2 0"
      className="beach-visitor-line beach-visitor-wings"
    />
  ),
  // A surfer on a board, knees bent, arms out for balance.
  surfer: (
    <>
      <path d="M-5.4 0.5Q0 1.6 5.8 0.1Q0.2 -0.5 -5.4 0.5Z" />
      <circle cx="0.7" cy="-6.6" r="0.95" />
      <path
        d="M0.5 -5.6L0 -2.9M0 -2.9L-1.5 0.1M0 -2.9L1.7 0.1M-2.6 -4.5L0.3 -4.9L3 -5.7"
        className="beach-visitor-limb"
      />
    </>
  ),
  // Someone fishing from a little rowboat: hat on, rod out, line in the water.
  fisher: (
    <>
      <path d="M-5 0H5L3.6 2.1H-3.6Z" />
      <circle cx="-1" cy="-3.5" r="0.9" />
      <path d="M-2.1 -4.3H0.1L-0.3 -4.9H-1.7Z" />
      <path d="M-1 -2.6V-0.1M-1 -1.9L0.4 -2.3" className="beach-visitor-limb" />
      <path d="M0.2 -2.4L6.2 -7" className="beach-visitor-line" />
      <path d="M6.2 -7Q6.9 -2 6.6 2.4" className="beach-visitor-line beach-visitor-thin" />
    </>
  ),
  // A paddleboarder standing tall, mid-stroke.
  paddler: (
    <>
      <path d="M-5.8 0.3Q0 1.2 5.8 0.3Q0 -0.3 -5.8 0.3Z" />
      <circle cx="0" cy="-7.3" r="0.9" />
      <path
        d="M0 -6.4V-3M0 -3L-0.9 0M0 -3L0.9 0M0 -5.5L1.3 -5.9M0 -4.5L0.9 -3.8"
        className="beach-visitor-limb"
      />
      <g className="beach-visitor-paddle">
        <path d="M1.8 -6.6L-1.2 1.4" className="beach-visitor-line" />
        <ellipse cx="-1.35" cy="1.6" rx="0.45" ry="1" transform="rotate(20 -1.35 1.6)" />
      </g>
    </>
  ),
  // A snorkeler: head, mask and snorkel above the water, fins kicking behind.
  snorkeler: (
    <>
      <g className="beach-visitor-fins">
        <path d="M-4.2 0.2L-6.4 -0.9L-6 0.9Z" />
        <path d="M-3.4 0.6L-5.4 1.6L-4.6 0.1Z" opacity="0.7" />
      </g>
      <path d="M-2.6 0.4Q-1 -0.4 0 0.2" className="beach-visitor-limb" />
      <circle cx="0.6" cy="-0.5" r="1.25" />
      <rect x="0.9" y="-1.1" width="1.4" height="0.9" rx="0.35" className="beach-visitor-cut" />
      <path d="M0.2 -1.5V-3.9Q0.2 -4.4 0.8 -4.4" className="beach-visitor-limb" />
    </>
  ),
  // A little sailboat.
  boat: (
    <>
      <path d="M-3.6 0H3.6L2.5 1.5H-2.5Z" />
      <path d="M0.2 -0.4V-6L3.2 -0.6Z" />
      <path d="M-0.3 -0.6V-4.6L-2.7 -0.6Z" opacity="0.7" />
    </>
  ),
}

function VisitorDrawing({ visitor }: { visitor: Visitor }) {
  const { kind, x, y, scale, reverse, duration } = visitor
  return (
    <g
      className={`beach-visitor beach-visitor-${kind}${reverse ? ' is-reverse' : ''}`}
      style={
        {
          '--visit-x': x,
          '--visit-y': y,
          '--visit-ms': `${duration}ms`,
        } as CSSProperties
      }
    >
      <g className="beach-visitor-motion">
        {/* Facing the way it travels. */}
        <g transform={`scale(${reverse ? -scale : scale} ${scale})`}>{DRAWINGS[kind]}</g>
      </g>
      {kind === 'fish' && (
        <g className="beach-visitor-splash">
          <path d="M-1.6 0q0.8 -1.4 1.6 0M0.4 0q0.8 -1.4 1.6 0" className="beach-visitor-line" />
        </g>
      )}
    </g>
  )
}

// Sends one visitor at a time, at random moments.
function useVisitors() {
  const [visitor, setVisitor] = useState<Visitor | null>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer = 0
    const schedule = (delay: number) => {
      timer = window.setTimeout(() => {
        const next = randomVisitor()
        setVisitor(next)
        timer = window.setTimeout(() => {
          setVisitor(null)
          schedule(random(5000, 16000))
        }, next.duration)
      }, delay)
    }
    schedule(random(1500, 6000))
    return () => window.clearTimeout(timer)
  }, [])
  return visitor
}

export default function BeachWaves({
  className,
  phase = 0,
}: {
  className?: string
  /** Offsets where each row starts, so each page's waves differ a little. */
  phase?: number
}) {
  const visitor = useVisitors()
  const rows = useMemo(
    () => ROWS.map((row) => ({ ...row, d: wavePath(row.y, row.amplitude, row.length) })),
    [],
  )

  return (
    <svg
      className={`beach-waves${className ? ` ${className}` : ''}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      {rows.map((row, i) => (
        <path
          key={row.y}
          className="beach-waves-row"
          d={row.d}
          vectorEffect="non-scaling-stroke"
          style={
            {
              '--wave-length': row.length,
              '--wave-seconds': `${row.seconds}s`,
              animationDelay: `${-((phase * (i + 1) * 1.7) % row.seconds)}s`,
            } as CSSProperties
          }
        />
      ))}
      {visitor && <VisitorDrawing key={visitor.id} visitor={visitor} />}
    </svg>
  )
}
