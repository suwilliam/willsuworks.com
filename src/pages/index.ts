import type { ComponentType } from 'react'
import type { NavIconName } from '../components/NavIcon'
import Home from './Home'
import Work from './Work'
import Portfolio from './Portfolio'
import Music from './Music'
import Interests from './Interests'
import Contact from './Contact'

export type Page = {
  path: string
  /** Label shown in the menu. Pages without one stay out of the menu. */
  navLabel?: string
  /** Icon shown in the menu instead of the label. The label becomes its tooltip. */
  navIcon?: NavIconName
  Component: ComponentType
}

// One entry per page. Add, remove or reorder pages here and the
// router and menu both follow.
export const pages: Page[] = [
  { path: '/', Component: Home },
  { path: '/tech', navLabel: 'Tech', navIcon: 'work', Component: Work },
  { path: '/portfolio', navLabel: 'Portfolio', navIcon: 'portfolio', Component: Portfolio },
  { path: '/music', navLabel: 'Music', navIcon: 'music', Component: Music },
  { path: '/interests', navLabel: 'Interests', navIcon: 'interests', Component: Interests },
  { path: '/contact', navLabel: 'Contact', navIcon: 'contact', Component: Contact },
]
