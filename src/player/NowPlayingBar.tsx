import type { CSSProperties } from 'react'
import NavIcon from '../components/NavIcon'
import { usePlayer } from './context'
import PlayPauseIcon from './PlayPauseIcon'

function formatTime(milliseconds: number) {
  const total = Math.floor(milliseconds / 1000)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = String(total % 60).padStart(2, '0')
  return hours > 0 ? `${hours}:${String(minutes).padStart(2, '0')}:${seconds}` : `${minutes}:${seconds}`
}

// The bar along the bottom of every page once the track has been played,
// like SoundCloud's own player.
export default function NowPlayingBar() {
  const player = usePlayer()
  if (!player?.barVisible) return null

  const { track, playing, position, duration, toggle, seek, close } = player
  const progress = duration > 0 ? Math.min(100, (position / duration) * 100) : 0

  return (
    <>
      {/* Takes up the bar's height at the end of the page so it never covers the footer. */}
      <div className="now-playing-spacer" aria-hidden="true" />

      <section className="now-playing" aria-label="Now playing">
        <div className="now-playing-inner container">
          <button
            type="button"
            className="now-playing-toggle"
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            <PlayPauseIcon playing={playing} size={20} />
          </button>

          <div className={`now-playing-track${playing ? ' is-playing' : ''}`}>
            <span className="now-playing-record" aria-hidden="true">
              <NavIcon name="music" size={22} />
            </span>
            <span className="now-playing-text">
              <a href={track.url} target="_blank" rel="noreferrer" className="now-playing-title">
                {track.title}
              </a>
              <span className="now-playing-artist">{track.artist}</span>
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

          <button type="button" className="now-playing-close" onClick={close} aria-label="Close player">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </section>
    </>
  )
}
