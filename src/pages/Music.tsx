import ArtistLink from '../components/ArtistLink'
import { isArtistName } from '../content/artist'
import PageHeader from '../components/PageHeader'
import SocialIcon from '../components/SocialIcon'
import { site, type FeaturedTrack } from '../content/site'
import { usePlayer } from '../player/context'
import PlayPauseIcon from '../player/PlayPauseIcon'
import './pages.css'

// The tracklist. Each row plays its track in the site's player (the bar along
// the bottom), so the music keeps going while visitors look around. The small
// SoundCloud icon opens the track on SoundCloud instead.
export default function Music() {
  const { intro, outro, artist, profile, tracks } = site.music
  const player = usePlayer()

  return (
    <div className="page container">
      <PageHeader eyebrow="Music" title="Things I've produced" intro={intro} />

      <ul className="tracklist">
        {tracks.map((track, index) => {
          const song: FeaturedTrack = { title: track.title, artist, url: track.href }
          const current = player?.track.url === track.href
          const playing = current && !!player?.playing
          const content = (
            <>
              <span className="track-number">
                <span className="track-number-digits">{String(index + 1).padStart(2, '0')}</span>
                <span className="track-number-icon" aria-hidden="true">
                  <PlayPauseIcon playing={playing} size={18} />
                </span>
              </span>
              <span className="track-main">
                <span className="track-title">{track.title}</span>
                <span className="track-detail">{track.detail}</span>
              </span>
              {track.length && <span className="track-length">{track.length}</span>}
            </>
          )

          return (
            <li
              key={`${track.title}-${index}`}
              className={`track-row${current ? ' is-current' : ''}${playing ? ' is-playing' : ''}`}
            >
              {player ? (
                <button
                  type="button"
                  className="track"
                  onClick={() => player.play(song)}
                  disabled={!player.ready}
                  aria-label={`${playing ? 'Pause' : 'Play'} ${track.title}`}
                  aria-pressed={playing}
                >
                  {content}
                </button>
              ) : (
                <a className="track" href={track.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              )}
              <a
                className="track-external"
                href={track.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${track.title} on SoundCloud`}
                data-tooltip="SoundCloud"
              >
                <SocialIcon label="SoundCloud" size={20} />
              </a>
            </li>
          )
        })}
      </ul>

      {profile ? (
        <section className="artist-card" aria-label={artist}>
          <img className="artist-photo" src={profile.image} alt={`${artist} on SoundCloud`} />
          <div className="artist-text">
            <h2 className="artist-name">
              <ArtistLink name={artist} />
            </h2>
            {profile.tagline && <p className="artist-tagline">{profile.tagline}</p>}
            {outro && <p className="muted">{withItalics(outro)}</p>}
          </div>
        </section>
      ) : (
        outro && <p className="muted">{withItalics(outro)}</p>
      )}
    </div>
  )
}

// Turns *words* into italics (linking your artist name to SoundCloud);
// everything else stays plain text.
function withItalics(text: string) {
  return text
    .split(/\*([^*]+)\*/)
    .map((part, index) =>
      index % 2 === 1 ? (
        <em key={index}>{isArtistName(part) ? <ArtistLink name={part} /> : part}</em>
      ) : (
        part
      ),
    )
}
