import React from 'react'
import StudyNotes from './StudyNotes'
import DocumentArea from './DocumentArea'
import AIDocumentManager from './AIDocumentManager'
import MeetingNotes from './MeetingNotes'
import Support from './Support'
import Projects from './Projects'
import Roadmap from './Roadmap'

interface WorkspaceProps {
  activePage: string
}

const Workspace: React.FC<WorkspaceProps> = ({ activePage }) => {
  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-4">{activePage}</h1>
      {activePage === 'Home' && <StudyNotes />}
      {activePage === 'Meeting Notes' && <MeetingNotes />}
      {activePage === 'Docs' && <DocumentArea />}
      {activePage === 'Support' && <Support />}
      {activePage === 'Projects' && <Projects />}
      {activePage === 'Roadmap' && <Roadmap />}
      {activePage === 'AI Document Manager' && <AIDocumentManager />}
    </main>
  )
}

export default Workspace