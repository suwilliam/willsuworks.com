import { site } from './site'

// Your SoundCloud profile: the Music page's artist profile, else the
// SoundCloud entry in socials.
export const artistProfileUrl =
  site.music.profile?.url ?? site.socials.find((link) => link.label === 'SoundCloud')?.href

/** True when this text is your artist name (e.g. "will in space"). */
export function isArtistName(text: string) {
  return text.trim().toLowerCase() === site.music.artist.trim().toLowerCase()
}
