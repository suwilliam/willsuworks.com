import PageHeader from '../components/PageHeader'
import { site } from '../content/site'
import './pages.css'

export default function Music() {
  const { intro, tracks } = site.music

  return (
    <div className="page container">
      <PageHeader eyebrow="Music" title="Things I've recorded" intro={intro} />

      <ul className="tracklist">
        {tracks.map((track, index) => (
          <li key={`${track.title}-${index}`}>
            <a className="track" href={track.href} target="_blank" rel="noreferrer">
              <span className="track-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="track-main">
                <span className="track-title">{track.title}</span>
                <span className="track-detail">{track.detail}</span>
              </span>
              {track.length && <span className="track-length">{track.length}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
