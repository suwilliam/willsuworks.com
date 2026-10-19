export default function PlayPauseIcon({ playing, size = 24 }: { playing: boolean; size?: number }) {
  return playing ? (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      {/* Shifted right a touch so the triangle looks centred in a circle. */}
      <path d="M9 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L10.5 4.64A1 1 0 0 0 9 5.5Z" />
    </svg>
  )
}
