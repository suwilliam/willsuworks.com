import { artistProfileUrl, isArtistName } from '../content/artist'

// Shows an artist name; when it's yours, it's in italics and links to your
// SoundCloud profile.
export default function ArtistLink({ name, className }: { name: string; className?: string }) {
  if (!isArtistName(name)) return <span className={className}>{name}</span>
  if (!artistProfileUrl) return <em className={className}>{name}</em>
  return (
    <a className={className} href={artistProfileUrl} target="_blank" rel="noreferrer">
      <em>{name}</em>
    </a>
  )
}
