import React from 'react'
import { ChevronDown, Plus, FileText, Bot } from 'lucide-react'
import { Teamspace } from '../types'

interface SidebarProps {
  teamspaces: Teamspace[]
  setActivePage: (page: string) => void
  activePage: string
}

const Sidebar: React.FC<SidebarProps> = ({ teamspaces, setActivePage, activePage }) => {
  return (
    <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Hilander Docs.</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <ChevronDown size={20} />
        </button>
      </div>
      <div className="mb-4">
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center">
          <Plus size={16} className="mr-2" />
          New page
        </button>
      </div>
      <nav>
        {teamspaces.map((teamspace) => (
          <div key={teamspace.name} className="mb-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
              <span>{teamspace.name}</span>
              <ChevronDown size={16} className="ml-1" />
            </h3>
            <ul className="space-y-1">
              {teamspace.pages.map((page) => (
                <li key={page.name}>
                  <button
                    onClick={() => setActivePage(page.name)}
                    className={`w-full text-left py-1 px-2 rounded hover:bg-gray-200 flex items-center ${
                      activePage === page.name ? 'bg-gray-200' : ''
                    }`}
                  >
                    <span className="mr-2">{page.icon}</span>
                    <span>{page.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-4">
        <button
          onClick={() => setActivePage('AI Document Manager')}
          className={`w-full text-left py-1 px-2 rounded hover:bg-gray-200 flex items-center ${
            activePage === 'AI Document Manager' ? 'bg-gray-200' : ''
          }`}
        >
          <Bot size={16} className="mr-2" />
          <span>AI Document Manager</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar