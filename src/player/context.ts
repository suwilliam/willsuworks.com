import { createContext, useContext } from 'react'
import type { FeaturedTrack } from '../content/site'

export type Player = {
  track: FeaturedTrack
  ready: boolean
  playing: boolean
  /** Position and duration in milliseconds. */
  position: number
  duration: number
  /** True while the now-playing bar should be on screen. */
  barVisible: boolean
  toggle(): void
  seek(milliseconds: number): void
  /** Stops playback and hides the now-playing bar. */
  close(): void
}

export const PlayerContext = createContext<Player | null>(null)

/** The site-wide player, or null when no track is set up. */
export function usePlayer() {
  return useContext(PlayerContext)
}
