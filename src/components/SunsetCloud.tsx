import { useId } from 'react'

// A soft, sunset-lit cloud for the Portfolio desk: lots of overlapping puffs
// with roughened, slightly blurred edges, cream on top warming to peach and
// rose underneath (as if the sunset behind it lights its belly), a brighter
// glow along the top and a little shade low down. Drawn on a 135 × 90 grid;
// every shape keeps the middle (where the logo sits) well inside the cloud.

type Puff = [cx: number, cy: number, r: number]

type Shape = {
  puffs: Puff[]
  base: [x: number, y: number, w: number, h: number]
  // The middle of the cloud's body, in percent of its width and height: where
  // a logo sits so it looks centred on this particular outline.
  centre: [x: number, y: number]
}

const SHAPES: Shape[] = [
  {
    // Rounded heap
    puffs: [
      [30, 62, 17],
      [50, 50, 21],
      [72, 40, 25],
      [96, 48, 21],
      [112, 62, 15],
      [44, 66, 16],
      [84, 66, 18],
      [64, 68, 18],
      [100, 68, 13],
    ],
    base: [18, 58, 100, 22],
    centre: [52.4, 60.6],
  },
  {
    // Long and low
    puffs: [
      [22, 64, 13],
      [40, 55, 17],
      [60, 47, 20],
      [82, 43, 22],
      [102, 51, 18],
      [118, 64, 12],
      [70, 66, 17],
      [50, 68, 15],
      [95, 68, 15],
    ],
    base: [12, 60, 112, 20],
    centre: [52.6, 63],
  },
  {
    // Tall towering top
    puffs: [
      [34, 60, 18],
      [56, 42, 24],
      [77, 31, 26],
      [98, 47, 20],
      [112, 62, 14],
      [60, 66, 18],
      [88, 66, 17],
      [44, 52, 14],
    ],
    base: [20, 58, 98, 22],
    centre: [53, 55.5],
  },
  {
    // Two humps
    puffs: [
      [30, 58, 18],
      [48, 43, 22],
      [69, 52, 18],
      [90, 39, 24],
      [108, 55, 17],
      [56, 68, 16],
      [86, 68, 17],
    ],
    base: [16, 60, 104, 20],
    centre: [51.8, 58.9],
  },
]

// Where a logo should sit on cloud `variant`, in percent.
export const cloudCentre = (variant: number) => SHAPES[variant % SHAPES.length].centre

export default function SunsetCloud({
  variant = 0,
  seed = 1,
}: {
  variant?: number
  seed?: number
}) {
  const id = useId().replace(/:/g, '')
  const shape = SHAPES[variant % SHAPES.length]
  const [bx, by, bw, bh] = shape.base

  // The cloud's silhouette, reused as the fill and as the mask for its lighting.
  const silhouette = (fill: string) => (
    <g fill={fill} filter={`url(#${id}-fluff)`}>
      {shape.puffs.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
      <rect x={bx} y={by} width={bw} height={bh} rx={bh / 2} />
    </g>
  )

  return (
    <svg className="sunset-cloud" viewBox="0 0 135 90" aria-hidden="true" focusable="false">
      <defs>
        {/* Wispy edges: nudge the outline with soft noise, then blur a touch. */}
        <filter id={`${id}-fluff`} x="-15%" y="-25%" width="130%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed={seed} />
          <feDisplacementMap
            in="SourceGraphic"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        {/* Lit from the sunset: cream on top, peach and rose underneath. */}
        <linearGradient id={`${id}-lit`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.2" stopColor="#fffdf8" />
          <stop offset="0.5" stopColor="#fff2e3" />
          <stop offset="0.78" stopColor="#f8d4bd" />
          <stop offset="1" stopColor="#eaa89c" />
        </linearGradient>
        <mask id={`${id}-shape`}>{silhouette('#fff')}</mask>
      </defs>

      {silhouette(`url(#${id}-lit)`)}

      <g mask={`url(#${id}-shape)`}>
        {/* Bright glow on the upper puffs, where the light catches. */}
        <ellipse
          cx="66"
          cy="34"
          rx="34"
          ry="14"
          fill="#ffffff"
          opacity="0.75"
          filter={`url(#${id}-soft)`}
        />
        {/* Warm shade along the belly. */}
        <ellipse
          cx="68"
          cy="80"
          rx="52"
          ry="9"
          fill="#d98a7f"
          opacity="0.35"
          filter={`url(#${id}-soft)`}
        />
      </g>
    </svg>
  )
}
