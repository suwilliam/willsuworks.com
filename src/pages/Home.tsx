import type { ReactNode } from 'react'
import Photo from '../components/Photo'
import { site } from '../content/site'
import { usePlayer, type Player } from '../player/context'
import PlayPauseIcon from '../player/PlayPauseIcon'
import './Home.css'

export default function Home() {
  const { greeting, intro, photo } = site.home
  const player = usePlayer()

  const photoElement = (
    <Photo src={photo.src} alt={photo.alt} position={photo.position} zoom={photo.zoom} />
  )

  return (
    <section className="hero container">
      <div className="hero-text">
        {greeting && <div className="eyebrow">{greeting}</div>}
        <h1>I'm {site.name}.</h1>
        {intro.map((paragraph) => (
          <p key={paragraph} className="muted">
            {paragraph}
          </p>
        ))}
      </div>
      {player ? (
        <PlayablePhoto player={player}>{photoElement}</PlayablePhoto>
      ) : (
        <div className="hero-photo">{photoElement}</div>
      )}
    </section>
  )
}

// The profile photo doubles as a record: hover (or tap) to reveal a play
// button, and the ripple rings turn while the track plays. Playback runs in
// the site-wide player, so it carries on in the bottom bar on other pages.
function PlayablePhoto({ player, children }: { player: Player; children: ReactNode }) {
  const { track, ready, playing, toggle } = player
  const name = `${track.title} by ${track.artist}`

  return (
    <div className={`hero-photo${playing ? ' is-playing' : ''}`}>
      <div className="photo-stage">
        {children}
        <button
          type="button"
          className="track-toggle"
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? `Pause ${name}` : `Play ${name}`}
          title={playing ? 'Pause' : `Play ${track.title}`}
        >
          <span className="track-toggle-disc" aria-hidden="true">
            <PlayPauseIcon playing={playing} size={26} />
          </span>
        </button>
      </div>

      <p className="track-caption">
        <span className="track-caption-label">{playing ? 'Now playing' : 'Press play'}</span>{' '}
        <a href={track.url} target="_blank" rel="noreferrer">
          {track.title}
        </a>{' '}
        by {track.artist}
      </p>
    </div>
  )
}
