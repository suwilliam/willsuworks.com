import { useMemo } from 'react'
import { ripplePath, type RippleOptions } from './ripplePath'

// The ripple motif as a decoration, drawn in the current text colour.
export default function Ripples({
  className,
  ...options
}: Partial<RippleOptions> & { className?: string }) {
  const { inner = 0.05, band = 0.38, count = 6, thickness = 0.27, stretch, phase } = options
  const d = useMemo(
    () => ripplePath({ inner, band, count, thickness, stretch, phase }),
    [inner, band, count, thickness, stretch, phase],
  )
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d={d} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}
