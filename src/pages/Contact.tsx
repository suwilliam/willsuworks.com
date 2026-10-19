import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import SocialIcon from '../components/SocialIcon'
import { site } from '../content/site'
import './pages.css'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked; the address is still selectable on the page.
    }
  }

  return (
    <div className="page container">
      <PageHeader eyebrow="Contact" title="Say hello" intro={site.contact.intro} />

      <div className="contact-email">
        <a href={`mailto:${site.email}`} className="contact-email-address">
          {site.email}
        </a>
        <button type="button" className="button" onClick={copyEmail}>
          {copied ? 'Copied' : 'Copy email'}
        </button>
      </div>

      <ul className="contact-links">
        {site.socials.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noreferrer">
              <SocialIcon label={link.label} />
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="muted">Based in {site.location}.</p>
    </div>
  )
}
