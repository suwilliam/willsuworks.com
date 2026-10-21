import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import ArtistLink from '../components/ArtistLink'
import Photo from '../components/Photo'
import { Link } from 'react-router-dom'
import { site, type FeaturedTrack } from '../content/site'
import { usePlayer, type Player } from '../player/context'
import PlayPauseIcon from '../player/PlayPauseIcon'
import './Home.css'

export default function Home() {
  const { greeting, based, intro, photo } = site.home
  const player = usePlayer()
  const waveRef = useSharedWave()

  const photoElement = (
    <Photo src={photo.src} alt={photo.alt} position={photo.position} zoom={photo.zoom} />
  )

  return (
    <section className="hero container">
      <div className="hero-text" ref={waveRef}>
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
          <p key={paragraph} className="muted wave-gentle">
            {/* Rides the same wave, picking up after the name and the location line. */}
            <WavyRichText
              text={paragraph}
              startIndex={(site.name + (based ?? '')).replace(/\s/g, '').length}
            />
          </p>
        ))}
        {player && <TrackCaption player={player} track={site.home.track ?? player.track} />}
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
    </div>
  )
}

// The line about the photo's track, in the text column beside it. The arrow
// points at the photo (down on phones, where the photo sits below).
function TrackCaption({ player, track }: { player: Player; track: FeaturedTrack }) {
  const playing = player.playing && player.track.url === track.url
  return (
    <p className="track-caption">
      <span className="track-caption-label">
        {playing ? 'Now playing' : 'Press me to play'}
        <span className="track-caption-arrow" aria-hidden="true">
          →
        </span>
      </span>
      <span className="track-caption-title">
        <a href={track.url} target="_blank" rel="noreferrer">
          {track.title}
        </a>{' '}
        by <ArtistLink name={track.artist} />
      </span>
    </p>
  )
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
          <span
            key={index}
            className="film-title-letter"
            style={{ '--i': index++ } as CSSProperties}
          >
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

// Text with [words](/page) links, every letter riding the wave. Screen
// readers get the plain words (the moving letters are hidden from them), and
// each link keeps its name, so it can still be found and opened.
function WavyRichText({ text, startIndex = 0 }: { text: string; startIndex?: number }) {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/)
  let index = startIndex
  const wave = (segment: string) => {
    const letters = <WaveLetters text={segment} startIndex={index} />
    index += segment.replace(/\s/g, '').length
    return letters
  }
  return parts.map((part, i) => {
    if (i % 3 === 2 || part === '') return null
    if (i % 3 === 0) {
      return (
        <span key={i}>
          <span className="sr-only">{part}</span>
          {wave(part)}
        </span>
      )
    }
    const href = parts[i + 1]
    return href.startsWith('/') ? (
      <Link key={i} to={href} aria-label={part}>
        {wave(part)}
      </Link>
    ) : (
      <a key={i} href={href} target="_blank" rel="noreferrer" aria-label={part}>
        {wave(part)}
      </a>
    )
  })
}

// One wave for every wavy line: each letter's timing comes from how far it
// sits from the left of the text column (as --x, in px), so the swell sweeps
// across the whole block and letters stacked above each other move together.
// Re-measured when the column resizes and once the fonts have loaded.
function useSharedWave() {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const column = ref.current
    if (!column) return
    const place = () => {
      const left = column.getBoundingClientRect().left
      column.querySelectorAll<HTMLElement>('.film-title-letter').forEach((letter) => {
        const box = letter.getBoundingClientRect()
        letter.style.setProperty('--x', String(Math.round(box.left + box.width / 2 - left)))
      })
    }
    place()
    document.fonts?.ready.then(place)
    const observer = new ResizeObserver(place)
    observer.observe(column)
    return () => observer.disconnect()
  }, [])
  return ref
}
