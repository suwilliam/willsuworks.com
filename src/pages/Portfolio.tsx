import PageHeader from '../components/PageHeader'
import { site } from '../content/site'
import './pages.css'

export default function Portfolio() {
  const { intro, projects } = site.portfolio

  return (
    <div className="page container">
      <PageHeader eyebrow="Portfolio" title="Things I've built" intro={intro} />

      <ul className="cards projects">
        {projects.map((project, index) => (
          <li key={`${project.title}-${index}`} className="card">
            {project.detail && <span className="project-detail">{project.detail}</span>}
            <h2 className="card-title">{project.title}</h2>
            <p className="muted">{project.summary}</p>
            {project.stack && project.stack.length > 0 && (
              <ul className="project-stack" aria-label="Built with">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            )}
            {project.links && project.links.length > 0 && (
              <div className="project-links">
                {project.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
