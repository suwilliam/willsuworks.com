import PageHeader from '../components/PageHeader'
import ProjectDesk from '../components/ProjectDesk'
import { deskBackgrounds, portfolioIntro, projects } from '../content/projects'
import './pages.css'
import './project.css'

// The projects as icons on a desk: drag them around, click one to open a
// window about it, and from there its full case study.
export default function Portfolio() {
  return (
    <div className="page container portfolio-page">
      <PageHeader
        eyebrow="Portfolio"
        title="Things I've built [WIP]"
        intro={portfolioIntro}
        ripple={[
          { top: '0px', right: '0px', size: 'min(170px, calc(100% - 676px))' },
          { top: '320px', edge: 'left', size: '240px' },
        ]}
      />

      <ProjectDesk projects={projects} backgrounds={deskBackgrounds} />
    </div>
  )
}
