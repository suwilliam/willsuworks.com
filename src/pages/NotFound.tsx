import { Link } from 'react-router-dom'
import './pages.css'

export default function NotFound() {
  return (
    <div className="page container">
      <header className="page-header">
        <div className="eyebrow">Page not found</div>
        <h1>Nothing here.</h1>
        <p className="muted">
          That page doesn't exist. <Link to="/">Go back home</Link>.
        </p>
      </header>
    </div>
  )
}
