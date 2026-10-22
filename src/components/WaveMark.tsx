import { useId } from 'react'

// The site's logo and home button: a sun setting behind a curling wave that
// runs into the horizon, with one ring around the sun (broken by a small gap)
// so it also reads a little like a record button. The sun and ring use the
// theme accent, the gap around the wave uses the page background, and the wave
// uses currentColor so it follows the link color. public/favicon.svg is the
// same drawing with fixed colors.
const WAVE = 'M3 27.5c4.5 0 6-7 11.5-7 3.6 0 5.6 2.6 4.8 4.8-.7 1.8-3.3 1.7-3.6 0'
const RING = 'M4.8 21.5A11.2 11.2 0 0 1 21.6 11.8M23.49 13.18A11.2 11.2 0 0 1 27.2 21.5'

export default function WaveMark({ size = 30 }: { size?: number }) {
  const clipId = useId()

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <clipPath id={clipId}>
        <rect width="32" height="21.5" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <circle cx="16" cy="21.5" r="7.6" fill="var(--color-accent)" />
        <path d={RING} stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      {/* A background-colored outline keeps the wave crisp where it crosses the sun. */}
      <path d={WAVE} stroke="var(--color-bg)" strokeWidth="5" strokeLinecap="round" />
      <path
        d={`${WAVE}M20.5 27.5H29`}
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  )
}
