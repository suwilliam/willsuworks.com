import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { FeaturedTrack } from '../content/site'
import { useSoundCloud } from '../hooks/useSoundCloud'
import { PlayerContext, type Player } from './context'
import './player.css'

// Keeps one SoundCloud player alive for the whole site. It lives in the
// layout, so the music keeps going when visitors move between pages.
export default function PlayerProvider({
  track,
  children,
}: {
  track?: FeaturedTrack
  children: ReactNode
}) {
  if (!track) return children
  return <ActivePlayer track={track}>{children}</ActivePlayer>
}

function ActivePlayer({ track, children }: { track: FeaturedTrack; children: ReactNode }) {
  const { iframeRef, embedSrc, ready, playing, started, position, duration, toggle, pause, seek } =
    useSoundCloud(track.url)
  const [closed, setClosed] = useState(false)

  // Pressing play again after closing brings the bar back.
  const togglePlayback = useCallback(() => {
    setClosed(false)
    toggle()
  }, [toggle])

  const close = useCallback(() => {
    pause()
    setClosed(true)
  }, [pause])

  const player = useMemo<Player>(
    () => ({
      track,
      ready,
      playing,
      position,
      duration,
      barVisible: started && !closed,
      toggle: togglePlayback,
      seek,
      close,
    }),
    [track, ready, playing, position, duration, started, closed, togglePlayback, seek, close],
  )

  return (
    <PlayerContext.Provider value={player}>
      {children}
      {/* SoundCloud's widget does the actual playing but stays out of sight. */}
      <iframe
        ref={iframeRef}
        className="player-embed"
        src={embedSrc}
        title={`SoundCloud player for ${track.title} by ${track.artist}`}
        allow="autoplay; encrypted-media"
        tabIndex={-1}
        aria-hidden="true"
      />
    </PlayerContext.Provider>
  )
}
