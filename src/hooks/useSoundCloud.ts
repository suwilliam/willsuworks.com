import { useCallback, useEffect, useRef, useState } from 'react'

// Controls a SoundCloud track through SoundCloud's Widget API
// (https://developers.soundcloud.com/docs/api/html5-widget). The widget is an
// iframe the caller renders with embedSrc and iframeRef; this hook loads the
// API script once and reports playback state, position and duration.

type ProgressData = { currentPosition: number }

type Widget = {
  toggle(): void
  play(): void
  pause(): void
  load(url: string, options: Record<string, unknown> & { callback?: () => void }): void
  seekTo(milliseconds: number): void
  getDuration(callback: (milliseconds: number) => void): void
  bind(event: string, listener: (data?: ProgressData) => void): void
  unbind(event: string): void
}

type SoundCloudApi = {
  Widget: ((iframe: HTMLIFrameElement) => Widget) & {
    Events: { READY: string; PLAY: string; PAUSE: string; FINISH: string; PLAY_PROGRESS: string }
  }
}

declare global {
  interface Window {
    SC?: SoundCloudApi
  }
}

const API_SRC = 'https://w.soundcloud.com/player/api.js'
let apiLoading: Promise<SoundCloudApi> | null = null

function loadApi(): Promise<SoundCloudApi> {
  if (window.SC) return Promise.resolve(window.SC)
  apiLoading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = API_SRC
    script.async = true
    script.onload = () =>
      window.SC ? resolve(window.SC) : reject(new Error('SoundCloud API missing'))
    script.onerror = () => {
      apiLoading = null
      reject(new Error('SoundCloud API failed to load'))
    }
    document.head.appendChild(script)
  })
  return apiLoading
}

export function useSoundCloud(trackUrl: string) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<Widget | null>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  /** True once the track has played at least once. */
  const [started, setStarted] = useState(false)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    let cancelled = false
    let events: string[] = []

    loadApi()
      .then((SC) => {
        if (cancelled || !iframeRef.current) return
        const widget = SC.Widget(iframeRef.current)
        const { READY, PLAY, PAUSE, FINISH, PLAY_PROGRESS } = SC.Widget.Events
        const readDuration = () => widget.getDuration((ms) => ms > 0 && setDuration(ms))

        events = [READY, PLAY, PAUSE, FINISH, PLAY_PROGRESS]
        widget.bind(READY, readDuration)
        widget.bind(PLAY, () => {
          setPlaying(true)
          setStarted(true)
          readDuration()
        })
        widget.bind(PAUSE, () => setPlaying(false))
        widget.bind(FINISH, () => setPlaying(false))
        widget.bind(PLAY_PROGRESS, (data) => data && setPosition(data.currentPosition))
        widgetRef.current = widget
        setReady(true)
      })
      .catch(() => setReady(false))

    return () => {
      cancelled = true
      const widget = widgetRef.current
      if (widget) {
        widget.pause()
        events.forEach((event) => widget.unbind(event))
      }
      widgetRef.current = null
    }
  }, [trackUrl])

  const toggle = useCallback(() => widgetRef.current?.toggle(), [])
  // Swaps in another track and starts it. SoundCloud keeps the event
  // listeners bound above, so state keeps updating for the new track.
  const load = useCallback((url: string) => {
    const widget = widgetRef.current
    if (!widget) return
    setPosition(0)
    setDuration(0)
    widget.load(url, {
      auto_play: true,
      visual: false,
      show_artwork: false,
      // Some browsers ignore auto_play after a swap, so ask once it's loaded.
      callback: () => widget.play(),
    })
  }, [])
  const pause = useCallback(() => widgetRef.current?.pause(), [])
  const seek = useCallback((milliseconds: number) => {
    widgetRef.current?.seekTo(milliseconds)
    setPosition(milliseconds)
  }, [])

  const embedSrc =
    'https://w.soundcloud.com/player/?' +
    new URLSearchParams({
      url: trackUrl,
      auto_play: 'false',
      visual: 'false',
      show_artwork: 'false',
    }).toString()

  return {
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
  }
}
