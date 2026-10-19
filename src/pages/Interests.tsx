import PageHeader from '../components/PageHeader'
import { site } from '../content/site'
import './pages.css'

export default function Interests() {
  const { intro, items } = site.interests

  return (
    <div className="page container">
      <PageHeader eyebrow="Interests" title="Other things I love" intro={intro} />

      <ul className="cards">
        {items.map((item, index) => (
          <li key={`${item.title}-${index}`} className="card">
            <h2 className="card-title">{item.title}</h2>
            {item.text && <p className="muted">{item.text}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
