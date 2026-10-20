import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import SocialIcon from '../components/SocialIcon'
import { site } from '../content/site'
import './pages.css'

// Links listed on this page; the rest (like GitHub and SoundCloud) only
// appear in the footer.
const CONTACT_LINKS = ['LinkedIn']

export default function Contact() {
  // The address most recently copied, so only its button says "Copied".
  const [copied, setCopied] = useState<string | null>(null)

  async function copyEmail(address: string) {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(address)
      setTimeout(() => setCopied((current) => (current === address ? null : current)), 2000)
    } catch {
      // Clipboard can be blocked; the address is still selectable on the page.
    }
  }

  return (
    <div className="page container">
      <PageHeader eyebrow="Contact" intro={site.contact.intro} />

      <ul className="contact-emails">
        {site.contact.emails.map(({ label, address }) => (
          <li key={address} className="contact-email-row">
            <span className="contact-email-label">{label}</span>
            <div className="contact-email">
              <a href={`mailto:${address}`} className="contact-email-address">
                {address}
              </a>
              <button
                type="button"
                className="button contact-copy"
                onClick={() => copyEmail(address)}
                aria-label={`Copy ${label.toLowerCase()} email`}
              >
                {copied === address ? 'Copied' : 'Copy email'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ul className="contact-links">
        {site.socials
          .filter((link) => CONTACT_LINKS.includes(link.label))
          .map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                <SocialIcon label={link.label} />
                <span>{link.label}</span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}
