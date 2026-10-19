import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './theme/tokens.css'
import './styles/global.css'
import { activeTheme } from './theme/config'
import App from './App'

document.documentElement.dataset.theme = activeTheme

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
