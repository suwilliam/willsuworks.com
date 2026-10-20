import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { pages } from './pages'
import NotFound from './pages/NotFound'
import ProjectPage from './pages/ProjectPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {pages.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="/portfolio/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
