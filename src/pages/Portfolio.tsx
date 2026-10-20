import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { portfolioIntro, projects } from '../content/projects'
import './pages.css'
import './project.css'

// The grid of projects. Each card opens that project's case study.
export default function Portfolio() {
  return (
    <div className="page container">
      <PageHeader eyebrow="Portfolio" title="Things I've built" intro={portfolioIntro} />

      <ul className="cards projects">
        {projects.map((project) => (
          <li key={project.slug} className="project-card">
            <Link to={`/portfolio/${project.slug}`} className="project-card-link">
              <div className="project-card-cover">
                {project.cover.src ? (
                  <img src={project.cover.src} alt="" loading="lazy" />
                ) : (
                  <span className="project-card-cover-empty">Cover image</span>
                )}
              </div>
              <div className="project-card-text">
                <span className="project-card-meta">
                  {project.role} · {project.year}
                </span>
                <h2 className="card-title">{project.title}</h2>
                <p className="muted">{project.oneLiner}</p>
                <ul className="project-tags" aria-label="Tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <span className="project-card-more">Read the case study →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
