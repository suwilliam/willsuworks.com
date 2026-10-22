import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Project } from '../content/projects'
import RichText from './RichText'
import SunsetCloud, { cloudCentre } from './SunsetCloud'
import './ProjectDesk.css'

// The Portfolio "desk": each project is an icon you can drag around. Clicking
// an icon opens a small window about the project, which can be dragged by its
// title bar; several can be open at once. Red closes a window (so does
// Escape), green opens the full case study.

type Point = { x: number; y: number }
type OpenWindow = { slug: string } & Point

// Where icons start when a project doesn't say, in percent of the desk.
const FALLBACK_SPOTS: Point[] = [
  { x: 22, y: 28 },
  { x: 60, y: 22 },
  { x: 36, y: 66 },
  { x: 76, y: 60 },
  { x: 14, y: 72 },
  { x: 86, y: 30 },
]

// Each cloud gets its own outline and size, cycling through these.
// Different cloud outlines for variety, all the same size so the desk looks even.
const CLOUDS = [
  { shape: 'puffy', scale: 1.15 },
  { shape: 'long', scale: 1.15 },
  { shape: 'tall', scale: 1.15 },
  { shape: 'double', scale: 1.15 },
]

const WINDOW_WIDTH = 380
// How far the pointer must move before a press counts as a drag, not a click.
const DRAG_THRESHOLD = 4

// Follows the pointer from a press until release, reporting how far it moved.
// Returns nothing for a plain click (onDrag never called).
function trackPointer(
  event: ReactPointerEvent<HTMLElement>,
  onDrag: (dx: number, dy: number) => void,
  onEnd?: (dragged: boolean) => void,
) {
  if (event.button !== 0) return
  const target = event.currentTarget
  const startX = event.clientX
  const startY = event.clientY
  let dragged = false
  target.setPointerCapture(event.pointerId)

  const move = (e: PointerEvent) => {
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    if (!dragged && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
    dragged = true
    onDrag(dx, dy)
  }
  const end = () => {
    target.removeEventListener('pointermove', move)
    target.removeEventListener('pointerup', end)
    target.removeEventListener('pointercancel', end)
    onEnd?.(dragged)
  }
  target.addEventListener('pointermove', move)
  target.addEventListener('pointerup', end)
  target.addEventListener('pointercancel', end)
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max))

export default function ProjectDesk({
  projects,
  backgrounds,
}: {
  projects: Project[]
  /** Photos for the desk; one is picked at random each time the page opens. */
  backgrounds: { src: string; position: string; video?: string; caption?: string }[]
}) {
  // Starts on a random background; the corner button steps through the rest.
  const [backgroundIndex, setBackgroundIndex] = useState(() =>
    Math.floor(Math.random() * backgrounds.length),
  )
  const background = backgrounds[backgroundIndex]
  const deskRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  // Icon positions, in percent of the desk so they hold up as it resizes.
  const [spots, setSpots] = useState<Record<string, Point>>(() =>
    Object.fromEntries(
      projects.map((project, index) => [
        project.slug,
        project.desk ?? FALLBACK_SPOTS[index % FALLBACK_SPOTS.length],
      ]),
    ),
  )
  // Open windows, in stacking order: the last one is on top.
  const [windows, setWindows] = useState<OpenWindow[]>([])
  // Set when a press turned into a drag, so the click that follows is ignored.
  const suppressClick = useRef(false)
  // Until someone drags a cloud, a small hint says they can, and the first
  // cloud gives a little nudge sideways once.
  const [hasDragged, setHasDragged] = useState(false)

  const deskSize = () => {
    const rect = deskRef.current?.getBoundingClientRect()
    return { width: rect?.width ?? 1, height: rect?.height ?? 1 }
  }

  const bringToFront = (slug: string) =>
    setWindows((open) => {
      const target = open.find((w) => w.slug === slug)
      return target && open[open.length - 1] !== target
        ? [...open.filter((w) => w !== target), target]
        : open
    })

  const close = (slug: string) => setWindows((open) => open.filter((w) => w.slug !== slug))

  function openWindow(slug: string) {
    if (windows.some((w) => w.slug === slug)) {
      bringToFront(slug)
    } else {
      const { width, height } = deskSize()
      const spot = spots[slug]
      const windowWidth = Math.min(WINDOW_WIDTH, width - 16)
      // Beside the icon, kept inside the desk.
      const x = clamp((spot.x / 100) * width + 56, 8, width - windowWidth - 8)
      const y = clamp((spot.y / 100) * height - 80, 8, height - 260)
      setWindows((open) => [...open, { slug, x, y }])
    }
    // Move keyboard focus into the window once it's on screen. preventScroll
    // matters: otherwise the browser scrolls the desk itself to show the
    // window, sliding every cloud up out of view.
    requestAnimationFrame(() => {
      const element = document.getElementById(`desk-window-${slug}`)
      if (!element) return
      element.focus({ preventScroll: true })
      // Now that its real height is known, nudge it up if it would run past
      // the bottom of the desk.
      const maxY = Math.max(8, deskSize().height - element.offsetHeight - 8)
      setWindows((open) => open.map((w) => (w.slug === slug && w.y > maxY ? { ...w, y: maxY } : w)))
    })
  }

  // Escape closes the window on top.
  useEffect(() => {
    if (windows.length === 0) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setWindows((open) => open.slice(0, -1))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [windows.length])

  function dragIcon(event: ReactPointerEvent<HTMLButtonElement>, slug: string) {
    const start = spots[slug]
    const { width, height } = deskSize()
    trackPointer(
      event,
      (dx, dy) =>
        setSpots((all) => ({
          ...all,
          [slug]: {
            x: clamp(start.x + (dx / width) * 100, 4, 96),
            y: clamp(start.y + (dy / height) * 100, 6, 92),
          },
        })),
      (dragged) => {
        suppressClick.current = dragged
        if (dragged) setHasDragged(true)
      },
    )
  }

  function dragWindow(event: ReactPointerEvent<HTMLElement>, slug: string) {
    const start = windows.find((w) => w.slug === slug)
    if (!start) return
    const { width, height } = deskSize()
    trackPointer(event, (dx, dy) =>
      setWindows((open) =>
        open.map((w) =>
          w.slug === slug
            ? {
                ...w,
                x: clamp(start.x + dx, -WINDOW_WIDTH + 80, width - 80),
                y: clamp(start.y + dy, 0, height - 40),
              }
            : w,
        ),
      ),
    )
  }

  return (
    <div
      className="desk"
      ref={deskRef}
      style={
        background && {
          backgroundImage: `url(${background.src})`,
          backgroundPosition: background.position,
        }
      }
    >
      {background?.video && (
        // A silent clip that loops like a GIF, behind the icons.
        <video
          key={background.video}
          className="desk-video"
          src={background.video}
          poster={background.src}
          style={{ objectPosition: background.position }}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      <p className={`desk-hint${hasDragged ? ' is-hidden' : ''}`} aria-hidden={hasDragged}>
        {/* Four little arrows: "move". */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v18M3 12h18M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3" />
        </svg>
        Drag the clouds around
      </p>
      {background?.caption && <p className="desk-background-caption">{background.caption}</p>}
      {backgrounds.length > 1 && (
        <button
          type="button"
          className="desk-background-toggle"
          onClick={() => setBackgroundIndex((index) => (index + 1) % backgrounds.length)}
          aria-label="Show the next background photo"
        >
          {/* A small landscape photo with an arrow: "next picture". */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="15" height="12" x="2" y="6" rx="2" />
            <path d="m2 15 4-4 3 3 2-2 6 6" />
            <circle cx="12" cy="10" r="1" />
            <path d="M20 9l2 3-2 3" />
          </svg>
        </button>
      )}
      {projects.map((project, index) => {
        const spot = spots[project.slug]
        const image = project.desk?.icon || project.cover.src
        return (
          <button
            key={project.slug}
            type="button"
            className={`desk-icon${index === 0 && !hasDragged ? ' is-nudging' : ''}`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            onPointerDown={(event) => dragIcon(event, project.slug)}
            onClick={() => {
              if (suppressClick.current) {
                suppressClick.current = false
                return
              }
              openWindow(project.slug)
            }}
            aria-label={`Open ${project.title}`}
          >
            {/* A cloud: the outer span casts the shadow, the inner one is cut to the
                cloud's shape (a mask would clip a shadow on the same element). */}
            <span
              className={`desk-icon-image cloud-${CLOUDS[index % CLOUDS.length].shape}`}
              style={
                {
                  '--bob': `${index}`,
                  '--cloud-scale': CLOUDS[index % CLOUDS.length].scale,
                  '--logo-x': `${cloudCentre(index)[0]}%`,
                  '--logo-y': `${cloudCentre(index)[1]}%`,
                  '--logo-size': `${44 * (project.desk?.iconScale ?? 1)}%`,
                } as CSSProperties
              }
            >
              <span className="desk-icon-cloud">
                <SunsetCloud variant={index} seed={index * 7 + 3} />
                {image ? (
                  <img
                    className={project.desk?.iconIsLogo ? 'is-logo' : undefined}
                    src={image}
                    alt=""
                    draggable={false}
                  />
                ) : (
                  <span className="desk-icon-letter" aria-hidden="true">
                    {project.title.charAt(0)}
                  </span>
                )}
              </span>
            </span>
            <span className="desk-icon-label">{project.title}</span>
          </button>
        )
      })}

      {windows.map((open, index) => {
        const project = projects.find((p) => p.slug === open.slug)
        if (!project) return null
        const titleId = `desk-window-title-${project.slug}`
        return (
          <section
            key={project.slug}
            id={`desk-window-${project.slug}`}
            className="desk-window"
            role="dialog"
            aria-labelledby={titleId}
            tabIndex={-1}
            style={{ left: open.x, top: open.y, zIndex: 10 + index }}
            onPointerDown={() => bringToFront(project.slug)}
          >
            <header
              className="desk-window-bar"
              onPointerDown={(event) => dragWindow(event, project.slug)}
            >
              <h2 id={titleId}>{project.title}</h2>
              <div className="desk-window-controls">
                <button
                  type="button"
                  className="desk-window-open"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => navigate(`/portfolio/${project.slug}`)}
                  aria-label={`Open the ${project.title} case study`}
                  title="Open case study"
                />
                <button
                  type="button"
                  className="desk-window-close"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => close(project.slug)}
                  aria-label={`Close ${project.title}`}
                  title="Close"
                />
              </div>
            </header>

            <div className="desk-window-body">
              {project.cover.src && (
                <img
                  className="desk-window-cover"
                  src={project.cover.src}
                  alt={project.cover.alt}
                />
              )}
              <p className="desk-window-meta">
                {project.role} · {project.year}
              </p>
              <p>
                <RichText text={project.oneLiner} />
              </p>
              {project.impact && project.impact.length > 0 && (
                <ul className="desk-window-impact">
                  {project.impact.map((stat) => (
                    <li key={stat.label}>
                      <strong>{stat.value}</strong> {stat.label}
                    </li>
                  ))}
                </ul>
              )}
              <Link to={`/portfolio/${project.slug}`} className="desk-window-more">
                Read the case study →
              </Link>
            </div>
          </section>
        )
      })}
    </div>
  )
}
