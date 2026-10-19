import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { site } from '../content/site'
import NowPlayingBar from '../player/NowPlayingBar'
import PlayerProvider from '../player/PlayerProvider'
import { pages } from '../pages'
import NavIcon from './NavIcon'
import SocialIcon from './SocialIcon'
import WaveMark from './WaveMark'
import './Layout.css'

export default function Layout() {
  const scrolled = useScrolled()

  return (
    <PlayerProvider track={site.home.track}>
      <div className="site">
        <div className="site-top" data-scrolled={scrolled || undefined}>
          <div className="decor-strip" aria-hidden="true" />

          <header className="site-header container">
            <Link to="/" className="brand" aria-label={`${site.name}, home`} title="Home">
              <WaveMark />
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
                      title={page.navLabel}
                    >
                      <NavIcon name={page.navIcon} />
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
          <Outlet />
        </main>

        <footer className="site-footer container">
          <div className="site-footer-links">
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
        </footer>

        <NowPlayingBar />
      </div>
    </PlayerProvider>
  )
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
