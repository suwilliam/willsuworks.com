import PageHeader from '../components/PageHeader'
import Ripples from '../components/Ripples'
import RichText from '../components/RichText'
import SocialIcon from '../components/SocialIcon'
import { site, type Org } from '../content/site'
import './pages.css'

// Social links shown beside the resume button; the rest (like SoundCloud)
// only appear in the footer.
const TECH_LINKS = ['GitHub', 'LinkedIn']

export default function Work() {
  const { intro, resumeUrl, roles } = site.work

  return (
    <div className="page container">
      <PageHeader
        eyebrow="Tech Experience"
        intro={intro}
        ripple={[
          { top: '0px', right: '0px', size: 'min(340px, calc(100% - 840px))' },
          { top: '520px', edge: 'left', size: '260px' },
        ]}
      >
        <div className="page-header-actions">
          <a className="button" href={resumeUrl} target="_blank" rel="noreferrer">
            Download resume
          </a>
          {site.socials
            .filter((link) => TECH_LINKS.includes(link.label))
            .map((link) => (
              <a
                key={link.label}
                className="button nav-icon-button"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                title={link.label}
              >
                <SocialIcon label={link.label} size={18} />
              </a>
            ))}
        </div>
      </PageHeader>

      <ol className="timeline">
        {roles.map((role, index) => (
          <li key={`${role.years}-${role.orgs[0]?.name}`} className="timeline-item">
            <span className="timeline-years">
              <Ripples
                className="timeline-ripple"
                inner={0.08}
                band={0.4}
                count={2}
                thickness={0.52}
                stretch={0.25}
                phase={index * 1.7}
              />
              {role.years}
            </span>
            <div>
              <h2 className="timeline-title">{role.title}</h2>
              <p className="timeline-org">
                {role.orgs.map((org, index) => (
                  <span key={org.name} className="timeline-org-item">
                    {index > 0 && (
                      <span className="timeline-org-separator" aria-hidden="true">
                        ·
                      </span>
                    )}
                    {org.url ? (
                      <a
                        className="timeline-org-link"
                        href={org.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <OrgName org={org} />
                      </a>
                    ) : (
                      <OrgName org={org} />
                    )}
                  </span>
                ))}
              </p>
              {role.summary && (
                <p className="muted">
                  <RichText text={role.summary} />
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function OrgName({ org }: { org: Org }) {
  return (
    <>
      {org.logo && (
        // The logo file is used as a mask, so it takes the text color.
        // The invisible image inside gives the logo its natural width.
        <span
          className="timeline-logo"
          aria-hidden="true"
          style={{ maskImage: `url(${org.logo})`, WebkitMaskImage: `url(${org.logo})` }}
        >
          <img src={org.logo} alt="" />
        </span>
      )}
      {org.name}
    </>
  )
}
