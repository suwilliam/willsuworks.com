import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow: string
  /** Big page heading. Leave it out and the eyebrow label becomes the page's heading. */
  title?: string
  intro: string
  /** Anything to show right under the intro, like a button. */
  children?: ReactNode
}

export default function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      {title ? (
        <>
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
        </>
      ) : (
        <h1 className="eyebrow">{eyebrow}</h1>
      )}
      <p className="muted">{intro}</p>
      {children}
    </header>
  )
}
