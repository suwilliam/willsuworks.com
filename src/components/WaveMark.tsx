import { useId } from 'react'

// The site's logo and home button: a striped sun setting behind a curling
// wave that runs into the horizon. The sun uses the theme accent, the stripes
// and the gap around the wave use the page background, and the wave uses
// currentColor so it follows the link color. public/favicon.svg is the same
// drawing with fixed colors.
const WAVE = 'M3 27.5c4.5 0 6-7 11.5-7 3.6 0 5.6 2.6 4.8 4.8-.7 1.8-3.3 1.7-3.6 0'

export default function WaveMark({ size = 30 }: { size?: number }) {
  const clipId = useId()

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <clipPath id={clipId}>
        <rect width="32" height="23" />
      </clipPath>
      <circle cx="16" cy="22" r="12" fill="var(--color-accent)" clipPath={`url(#${clipId})`} />
      <rect x="3" y="14" width="26" height="1.8" fill="var(--color-bg)" />
      <rect x="3" y="18" width="26" height="2.2" fill="var(--color-bg)" />
      {/* A background-colored outline keeps the wave crisp where it crosses the sun. */}
      <path d={WAVE} stroke="var(--color-bg)" strokeWidth="5" strokeLinecap="round" />
      <path d={`${WAVE}M20.5 27.5H29`} stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  )
}
