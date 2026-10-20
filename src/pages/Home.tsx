import type { CSSProperties, ReactNode } from 'react'
import ArtistLink from '../components/ArtistLink'
import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import { site, type FeaturedTrack } from '../content/site'
import { usePlayer, type Player } from '../player/context'
import PlayPauseIcon from '../player/PlayPauseIcon'
import './Home.css'

export default function Home() {
  const { greeting, based, intro, photo } = site.home
  const player = usePlayer()

  const photoElement = (
    <Photo src={photo.src} alt={photo.alt} position={photo.position} zoom={photo.zoom} />
  )

  return (
    <section className="hero container">
      <div className="hero-text">
        {greeting && <div className="eyebrow">{greeting}</div>}
        <FilmTitle text={site.name} />
        {based && (
          <p className="hero-based">
            {/* A tiny map marker: a cognac dot with a faint ring. */}
            <svg className="hero-based-dot" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <circle cx="12" cy="12" r="8" fill="none" strokeWidth="1.5" opacity="0.45" />
            </svg>
            {/* Continues the name's wave, so the swell rolls on into this line. */}
            {withIcon(based, (text) => (
              <span className="wave-gentle" aria-label={text}>
                <WaveLetters text={text} startIndex={site.name.replace(/\s/g, '').length} />
              </span>
            ))}
          </p>
        )}
        {intro.map((paragraph) => (
          <p key={paragraph} className="muted">
            {withLinks(paragraph)}
          </p>
        ))}
      </div>
      {player ? (
        <PlayablePhoto player={player} track={site.home.track ?? player.track}>
          {photoElement}
        </PlayablePhoto>
      ) : (
        <div className="hero-photo">{photoElement}</div>
      )}
    </section>
  )
}

// The profile photo doubles as a record: hover (or tap) to reveal a play
// button. While the track plays, vinyl grooves close in around the photo,
// which spins as the record's label, and the ripple rings turn; on pause it
// goes back to a plain photo. Playback runs in the
// site-wide player, so it carries on in the bottom bar on other pages.
function PlayablePhoto({
  player,
  track,
  children,
}: {
  player: Player
  track: FeaturedTrack
  children: ReactNode
}) {
  const { ready } = player
  // Only "playing" while this track is the one playing, not another from the Music page.
  const playing = player.playing && player.track.url === track.url
  const toggle = () => player.play(track)
  const name = `${track.title} by ${track.artist}`

  return (
    <div className={`hero-photo${playing ? ' is-playing' : ''}`}>
      <div className="photo-stage">
        {children}
        <span className="record-vinyl" aria-hidden="true" />
        <span className="record-spindle" aria-hidden="true" />
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
        <span className="track-caption-label">{playing ? 'Now playing' : 'Press me to play'}</span>{' '}
        <a href={track.url} target="_blank" rel="noreferrer">
          {track.title}
        </a>{' '}
        by <ArtistLink name={track.artist} />
      </p>
    </div>
  )
}

// Turns [words](/page) into links: site pages open in place, websites in a new tab.
function withLinks(text: string) {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/)
  return parts.map((part, index) => {
    if (index % 3 !== 1) return index % 3 === 0 ? part : null
    const href = parts[index + 1]
    return href.startsWith('/') ? (
      <Link key={index} to={href}>
        {part}
      </Link>
    ) : (
      <a key={index} href={href} target="_blank" rel="noreferrer">
        {part}
      </a>
    )
  })
}

// The name rides an ocean swell: the letters rise and fall in a wave that
// rolls across from left to right. Screen readers get the plain name.
function FilmTitle({ text }: { text: string }) {
  return (
    <h1 className="film-title" aria-label={text}>
      <WaveLetters text={text} />
    </h1>
  )
}

// The text split into letters for the wave animation. startIndex offsets the
// timing, so a second line can pick the wave up where another left off.
function WaveLetters({ text, startIndex = 0 }: { text: string; startIndex?: number }) {
  let index = startIndex
  return text.split(' ').map((word, w) => (
    <span key={w} aria-hidden="true">
      {w > 0 && ' '}
      <span className="film-title-word">
        {[...word].map((letter) => (
          <span key={index} className="film-title-letter" style={{ '--i': index++ } as CSSProperties}>
            {letter}
          </span>
        ))}
      </span>
    </span>
  ))
}

// Splits a leading emoji off the text, so CSS can space it from the words.
// renderText draws the words (as plain text if not given).
function withIcon(text: string, renderText: (words: string) => ReactNode = (words) => words) {
  const match = text.match(/^(\p{Extended_Pictographic}\S*)\s+(.*)$/u)
  if (!match) return renderText(text)
  return (
    <>
      <span aria-hidden="true">{match[1]}</span>
      <span>{renderText(match[2])}</span>
    </>
  )
}
