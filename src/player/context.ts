import { createContext, useContext } from 'react'
import type { FeaturedTrack } from '../content/site'

export type Player = {
  /** The track loaded in the player: the featured one until another is played. */
  track: FeaturedTrack
  ready: boolean
  playing: boolean
  /** Position and duration in milliseconds. */
  position: number
  duration: number
  /** True while the now-playing bar should be on screen. */
  barVisible: boolean
  /** Plays or pauses the current track. */
  toggle(): void
  /** Plays this track: switches to it, or plays/pauses it if it's already loaded. */
  play(track: FeaturedTrack): void
  seek(milliseconds: number): void
  /** Stops playback and hides the now-playing bar. */
  close(): void
}

export const PlayerContext = createContext<Player | null>(null)

/** The site-wide player, or null when no track is set up. */
export function usePlayer() {
  return useContext(PlayerContext)
}
