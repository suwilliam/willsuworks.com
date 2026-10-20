import { useState, type AnimationEvent, type CSSProperties } from 'react'
import ArtistLink from '../components/ArtistLink'
import NavIcon from '../components/NavIcon'
import SocialIcon from '../components/SocialIcon'
import { site } from '../content/site'
import { usePlayer } from './context'
import PlayPauseIcon from './PlayPauseIcon'

function formatTime(milliseconds: number) {
  const total = Math.floor(milliseconds / 1000)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = String(total % 60).padStart(2, '0')
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${seconds}`
    : `${minutes}:${seconds}`
}

// The bar along the bottom of every page once the track has been played,
// like SoundCloud's own player.
export default function NowPlayingBar() {
  const player = usePlayer()
  // While true, the bar plays its slide-out animation; it really closes when that ends.
  const [closing, setClosing] = useState(false)
  if (!player?.barVisible) return null

  const { track, playing, position, duration, toggle, seek, close } = player

  function startClose() {
    // Without motion there is no animation to wait for, so close right away.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) close()
    else setClosing(true)
  }

  function handleAnimationEnd(event: AnimationEvent<HTMLElement>) {
    if (event.target !== event.currentTarget || event.animationName !== 'now-playing-out') return
    setClosing(false)
    close()
  }

  const progress = duration > 0 ? Math.min(100, (position / duration) * 100) : 0

  return (
    <section
      className={`now-playing${closing ? ' is-closing' : ''}`}
      aria-label="Now playing"
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="now-playing-inner container">
        <button
          type="button"
          className="now-playing-toggle"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          <PlayPauseIcon playing={playing} size={14} />
        </button>

        <div className={`now-playing-track${playing ? ' is-playing' : ''}`}>
          <span className="now-playing-record" aria-hidden="true">
            <NavIcon name="music" size={18} />
          </span>
          <span className="now-playing-text">
            <a href={track.url} target="_blank" rel="noreferrer" className="now-playing-title">
              {track.title}
            </a>
            <ArtistLink name={track.artist} className="now-playing-artist" />
          </span>
        </div>

        <div className="now-playing-progress">
          <span className="now-playing-time">{formatTime(position)}</span>
          <input
            id="now-playing-seek"
            type="range"
            min={0}
            max={duration || 1}
            step={1000}
            value={Math.min(position, duration || 1)}
            onChange={(event) => seek(Number(event.target.value))}
            disabled={!duration}
            aria-label="Seek"
            aria-valuetext={`${formatTime(position)} of ${formatTime(duration)}`}
            style={{ '--progress': `${progress}%` } as CSSProperties}
          />
          <span className="now-playing-time">{duration ? formatTime(duration) : '–:––'}</span>
        </div>

        {/* The footer's links move here while the bar is open (see Layout.css). */}
        <div className="now-playing-socials">
          {site.socials.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              title={link.label}
            >
              <SocialIcon label={link.label} size={18} />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="now-playing-close"
          onClick={startClose}
          aria-label="Close player"
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </section>
  )
}
