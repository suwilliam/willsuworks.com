import type { CSSProperties, ReactNode } from 'react'
import BeachWaves from './BeachWaves'

type PageHeaderProps = {
  eyebrow: string
  /** Big page heading. Leave it out and the eyebrow label becomes the page's heading. */
  title?: string
  intro: string
  /** Anything to show right under the intro, like a button. */
  children?: ReactNode
  /**
   * Where this page's ripple sits and how big it is, as CSS lengths. Keep
   * edges at 0 or more so the whole ripple stays on the page, and cap size to
   * the space beside the content, e.g. min(300px, calc(100% - 840px)) next to
   * a 760px-wide list, so it never sits behind text or lines (it shrinks, then
   * hides, on narrower screens). Defaults to the top-right corner.
   */
  ripple?: RipplePlacement | RipplePlacement[]
}

type RipplePlacement = {
  top?: string
  right?: string
  left?: string
  size?: string
  /** Sit in the left margin, just clear of the content, peeking in from the screen edge. */
  edge?: 'left'
}

// Turns a page's label into a stable angle, so each page's ripple has its own shape.
const phaseFor = (label: string) =>
  ([...label].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 628) / 100

export default function PageHeader({ eyebrow, title, intro, children, ripple }: PageHeaderProps) {
  const placements = Array.isArray(ripple) ? ripple : [ripple ?? {}]
  return (
    <>
      {/* The waves beside the page's content, pinned in place as the page
          scrolls: a page-sized layer holds a sticky band just under the
          header, and each wave drawing sits in that band at its own spot. */}
      <div className="page-ripples-layer" aria-hidden="true">
        <div className="page-ripples-sticky">
          {placements.map((place, index) => (
            <div
              key={index}
              className={`page-ripples${place.edge === 'left' ? ' is-left-edge' : ''}`}
              style={
                {
                  top: place.top ?? '0px',
                  right: place.left || place.edge ? 'auto' : (place.right ?? 'var(--gutter)'),
                  // Left edge: the ripple's right side ends just before the content starts.
                  left:
                    place.edge === 'left'
                      ? 'calc(var(--gutter) - var(--ripple-size) - 24px)'
                      : (place.left ?? 'auto'),
                  '--ripple-size': place.size ?? 'clamp(170px, 26vw, 320px)',
                } as CSSProperties
              }
            >
              <BeachWaves phase={phaseFor(eyebrow) + index * 2.3} />
            </div>
          ))}
        </div>
      </div>
      <header className="page-header">
        {title ? (
          <>
            <div className="eyebrow">{eyebrow}</div>
            <h1>{title}</h1>
          </>
        ) : (
          <h1 className="eyebrow">{eyebrow}</h1>
        )}
        <p className="muted">{intro}</p>
        {children}
      </header>
    </>
  )
}
