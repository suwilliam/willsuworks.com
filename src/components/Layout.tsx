import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigationType } from 'react-router-dom'
import { site } from '../content/site'
import NowPlayingBar from '../player/NowPlayingBar'
import { usePlayer } from '../player/context'
import PlayPauseIcon from '../player/PlayPauseIcon'
import PlayerProvider from '../player/PlayerProvider'
import { pages } from '../pages'
import NavIcon from './NavIcon'
import SocialIcon from './SocialIcon'
import WaveMark from './WaveMark'
import './Layout.css'

export default function Layout() {
  const scrolled = useScrolled()
  usePageChange()
  const { pathname } = useLocation()
  const direction = useSlideDirection(pathname)

  return (
    <PlayerProvider track={site.home.track}>
      <div className="site">
        <div className="site-top" data-scrolled={scrolled || undefined}>
          <div className="decor-strip" aria-hidden="true" />

          <header className="site-header container">
            <Link to="/" className="brand" aria-label={`${site.name}, home`} data-tooltip="Home">
              <WaveMark size={38} />
            </Link>
            <nav className="site-nav" aria-label="Main">
              {pages
                .filter((page) => page.navLabel)
                .map((page) =>
                  page.navIcon ? (
                    <NavLink
                      key={page.path}
                      to={page.path}
                      className="button nav-icon-button"
                      aria-label={page.navLabel}
                      data-tooltip={page.navLabel}
                    >
                      <NavIcon name={page.navIcon} />
                      {/* Shown under the icon on phones, where there's no hover tooltip. */}
                      <span className="nav-label" aria-hidden="true">
                        {page.navLabel}
                      </span>
                    </NavLink>
                  ) : (
                    <NavLink key={page.path} to={page.path} className="button">
                      {page.navLabel}
                    </NavLink>
                  ),
                )}
            </nav>
          </header>
        </div>

        <main className="site-main">
          {/* Keyed by page, so each new page remounts and plays its slide-in. */}
          <div key={pathname} className="page-transition" data-direction={direction}>
            <Outlet />
          </div>
        </main>

        {/* Holds the dock's place at the end of the page; the dock itself is fixed. */}
        <div className="site-dock-spacer" aria-hidden="true" />

        {/* The footer and the now-playing bar share one fixed dock, so they always
            move as one piece and nothing can show between them. */}
        <div className="site-dock">
          <footer className="site-footer">
            <div className="site-footer-links container">
              <FooterPlayButton />
              <div className="site-footer-socials">
                {site.socials.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    title={link.label}
                  >
                    <SocialIcon label={link.label} />
                  </a>
                ))}
              </div>
            </div>
          </footer>

          <NowPlayingBar />
        </div>
      </div>
    </PlayerProvider>
  )
}

// Starts the featured track from the footer, which brings up the now-playing bar.
// Hidden on the home page, where the profile photo is the play button.
function FooterPlayButton() {
  const player = usePlayer()
  const { pathname } = useLocation()
  if (!player || pathname === '/') return null

  return (
    <button
      type="button"
      className="site-footer-play"
      onClick={player.toggle}
      aria-label={`Play ${player.track.title}`}
    >
      <span className="site-footer-play-icon">
        <PlayPauseIcon playing={false} size={16} />
      </span>
      <span className="site-footer-play-title">{player.track.title}</span>
    </button>
  )
}

// On every page change: start the new page at the top (Back and Forward keep
// the browser's own behavior) and name the browser tab after the page.
function usePageChange() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType !== 'POP') window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, navigationType])

  useEffect(() => {
    const page = pages.find((p) => p.path === pathname)
    const label = page ? page.navLabel : 'Not found'
    document.title = label ? `${label} · William Su` : 'William Su'
  }, [pathname])
}

// Which side the new page's content slides in from: the right when moving
// further along the menu (Home first), the left when moving back. Nothing on
// the first load. Uses React's "adjust state while rendering" pattern, so the
// direction is ready on the same render as the new page.
function useSlideDirection(pathname: string) {
  const [state, setState] = useState<{ path: string; direction?: 'left' | 'right' }>({
    path: pathname,
  })

  if (state.path !== pathname) {
    const order = (path: string) => {
      const index = pages.findIndex((p) => p.path === path)
      return index === -1 ? pages.length : index
    }
    setState({ path: pathname, direction: order(pathname) > order(state.path) ? 'right' : 'left' })
  }

  return state.direction
}

// True once the page has scrolled past the top, so the sticky header can show its divider.
function useScrolled() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return scrolled
}
