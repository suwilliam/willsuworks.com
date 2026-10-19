import PageHeader from '../components/PageHeader'
import { site } from '../content/site'
import './pages.css'

export default function Work() {
  const { intro, resumeUrl, roles } = site.work

  return (
    <div className="page container">
      <PageHeader eyebrow="Tech Experience" intro={intro} />

      <ol className="timeline">
        {roles.map((role) => (
          <li key={`${role.years}-${role.org}`} className="timeline-item">
            <span className="timeline-years">{role.years}</span>
            <div>
              <h2 className="timeline-title">{role.title}</h2>
              <p className="timeline-org">{role.org}</p>
              {role.summary && <p className="muted">{role.summary}</p>}
            </div>
          </li>
        ))}
      </ol>

      <a className="button" href={resumeUrl} target="_blank" rel="noreferrer">
        Download resume
      </a>
    </div>
  )
}
