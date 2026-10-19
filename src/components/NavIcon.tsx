import type { ReactNode } from 'react'

// Outline icons adapted from Lucide (lucide.dev, ISC license), drawn in
// currentColor so they follow the active theme. music is a vinyl record
// drawn in the same outline style.
const icons = {
  work: (
    <>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  // A framed picture hanging on a wire: frame, inner mat, and a little
  // landscape with a sun.
  portfolio: (
    <>
      <path d="M8.5 6 12 2.5 15.5 6" />
      <rect width="18" height="15" x="3" y="6" rx="1.5" />
      <rect width="12" height="9" x="6" y="9" rx="0.5" />
      <path d="m6 16.5 3.5-3.5 3 3 1.5-1.5 4 4" />
      <circle cx="14.5" cy="11.5" r="1" />
    </>
  ),
  music: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5" />
      <path d="M12 18.5A6.5 6.5 0 0 1 5.5 12" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  contact: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type NavIconName = keyof typeof icons

export default function NavIcon({ name, size = 20 }: { name: NavIconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}
