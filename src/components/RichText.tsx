import { Link } from 'react-router-dom'

// Text from site content with [words](/page) turned into links: site pages
// open in place, websites in a new tab. With plain, the words show without
// the link, for text that sits inside another link (like a card).
export default function RichText({ text, plain = false }: { text: string; plain?: boolean }) {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/)
  return parts.map((part, index) => {
    if (index % 3 !== 1) return index % 3 === 0 ? part : null
    if (plain) return part
    const href = parts[index + 1]
    return href.startsWith('/') ? (
      <Link key={index} to={href}>
        {part}
      </Link>
    ) : (
      <a key={index} href={href} target="_blank" rel="noreferrer">
        {part}
      </a>
    )
  })
}
