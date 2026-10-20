import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Lightbox, MediaFigure, type LightboxImage } from '../components/ProjectMedia'
import { findProject, projects, type Media } from '../content/projects'
import NotFound from './NotFound'
import './pages.css'
import './project.css'

// One case study: /portfolio/<slug>. The left and right arrow keys move to the
// previous and next project, like the links at the bottom.
export default function ProjectPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const index = findProject(slug)
  const project = projects[index]
  const previous = index > 0 ? projects[index - 1] : undefined
  const next = index >= 0 ? projects[index + 1] : undefined
  // Which image the full-size viewer is showing, if any.
  const [viewing, setViewing] = useState<number | null>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (viewing !== null || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey)
        return
      if (
        (event.target as HTMLElement).closest('input, textarea, select, video, [contenteditable]')
      )
        return
      const target =
        event.key === 'ArrowRight' ? next : event.key === 'ArrowLeft' ? previous : undefined
      if (target) navigate(`/portfolio/${target.slug}`)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [viewing, previous, next, navigate])

  if (!project) return <NotFound />

  const cover: Media = { kind: 'image', ...project.cover }
  // Every image on the page that has a file, in order, for the full-size viewer.
  const allMedia = [cover, ...project.sections.flatMap((section) => section.media ?? [])]
  const images = allMedia.filter(
    (media): media is Extract<Media, { kind: 'image' }> => media.kind === 'image' && !!media.src,
  )
  const lightboxImages: LightboxImage[] = images.map(({ src, alt, caption }) => ({
    src,
    alt,
    caption,
  }))
  const openViewer = (media: Media) => () =>
    setViewing(images.indexOf(media as (typeof images)[number]))

  const { glance } = project

  return (
    <article className="page container project">
      <Link to="/portfolio" className="project-back">
        ← All projects
      </Link>

      <header className="page-header project-header">
        <div className="eyebrow">
          {project.role} · {project.year}
        </div>
        <h1>{project.title}</h1>
        <p className="muted">{project.oneLiner}</p>
      </header>

      <div className="project-cover">
        <MediaFigure media={cover} onOpen={openViewer(cover)} />
      </div>

      <div className="project-body">
        <aside className="project-glance" aria-label="At a glance">
          <h2>At a glance</h2>
          <dl>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            {glance.team && (
              <div>
                <dt>Team</dt>
                <dd>{glance.team}</dd>
              </div>
            )}
            {glance.timeline && (
              <div>
                <dt>Timeline</dt>
                <dd>{glance.timeline}</dd>
              </div>
            )}
            {glance.tools && glance.tools.length > 0 && (
              <div>
                <dt>Tools</dt>
                <dd>
                  <ul className="project-tags">
                    {glance.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
          {project.links && project.links.length > 0 && (
            <div className="project-glance-links">
              {project.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </aside>

        <div className="project-story">
          {project.impact && project.impact.length > 0 && (
            <ul className="project-impact" aria-label="Impact">
              {project.impact.map((stat) => (
                <li key={stat.label}>
                  <span className="project-impact-value">{stat.value}</span>
                  <span className="project-impact-label">{stat.label}</span>
                </li>
              ))}
            </ul>
          )}

          {project.sections.map((section) => (
            <section key={section.heading} className="project-section">
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.media?.map((media, mediaIndex) => (
                <MediaFigure key={mediaIndex} media={media} onOpen={openViewer(media)} />
              ))}
            </section>
          ))}

          {project.learned && (
            <section className="project-section">
              <h2>What I learned</h2>
              <p>{project.learned}</p>
            </section>
          )}
        </div>
      </div>

      <nav className="project-pager" aria-label="More projects">
        {previous ? (
          <Link to={`/portfolio/${previous.slug}`} className="project-pager-link" rel="prev">
            <span className="project-pager-label">← Previous</span>
            <span className="project-pager-title">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        <Link to="/portfolio" className="project-pager-all">
          All projects
        </Link>
        {next ? (
          <Link to={`/portfolio/${next.slug}`} className="project-pager-link is-next" rel="next">
            <span className="project-pager-label">Next →</span>
            <span className="project-pager-title">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <Lightbox
        images={lightboxImages}
        index={viewing}
        onChange={setViewing}
        onClose={() => setViewing(null)}
      />
    </article>
  )
}
