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
  // The widget starts on the featured track; play() can swap in others.
  const [current, setCurrent] = useState(track)
  const {
    iframeRef,
    embedSrc,
    ready,
    playing,
    started,
    position,
    duration,
    toggle,
    load,
    pause,
    seek,
  } = useSoundCloud(track.url, current.volume ?? 100)
  const [closed, setClosed] = useState(false)

  // Pressing play again after closing brings the bar back.
  const togglePlayback = useCallback(() => {
    setClosed(false)
    toggle()
  }, [toggle])

  const play = useCallback(
    (next: FeaturedTrack) => {
      setClosed(false)
      if (next.url === current.url) {
        toggle()
      } else {
        setCurrent(next)
        load(next.url)
      }
    },
    [current.url, toggle, load],
  )

  const close = useCallback(() => {
    pause()
    setClosed(true)
  }, [pause])

  const player = useMemo<Player>(
    () => ({
      track: current,
      ready,
      playing,
      position,
      duration,
      barVisible: started && !closed,
      toggle: togglePlayback,
      play,
      seek,
      close,
    }),
    [
      current,
      ready,
      playing,
      position,
      duration,
      started,
      closed,
      togglePlayback,
      play,
      seek,
      close,
    ],
  )

  return (
    <PlayerContext.Provider value={player}>
      {children}
      {/* SoundCloud's widget does the actual playing but stays out of sight. */}
      <iframe
        ref={iframeRef}
        className="player-embed"
        src={embedSrc}
        title={`SoundCloud player for ${current.title} by ${current.artist}`}
        allow="autoplay; encrypted-media"
        tabIndex={-1}
        aria-hidden="true"
      />
    </PlayerContext.Provider>
  )
}
