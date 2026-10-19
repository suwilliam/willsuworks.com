import './themes/cream-rug.css'
import './themes/walnut.css'

// Every theme is a CSS file in ./themes that sets the same variables under
// [data-theme="<name>"]. To try a different design, change activeTheme.
// To make a new one, copy cream-rug.css, rename it, import it above and
// add its name to this list.
export const themes = ['cream-rug', 'walnut'] as const

export type ThemeName = (typeof themes)[number]

export const activeTheme: ThemeName = 'cream-rug'
