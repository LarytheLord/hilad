import React, { useState } from 'react'
import { Plus, Edit2, Trash2, CheckSquare } from 'lucide-react'

interface Project {
  id: number
  name: string
  description: string
  status: 'In Progress' | 'Completed' | 'On Hold'
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: 'Website Redesign', description: 'Overhaul the company website', status: 'In Progress' },
    { id: 2, name: 'Mobile App Development', description: 'Create a new mobile app for customers', status: 'On Hold' },
  ])
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const addProject = () => {
    const newProject = { id: Date.now(), name: 'New Project', description: '', status: 'In Progress' as const }
    setProjects([...projects, newProject])
    setEditingProject(newProject)
  }

  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map(project => project.id === updatedProject.id ? updatedProject : project))
    setEditingProject(null)
  }

  const deleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id))
    if (editingProject?.id === id) setEditingProject(null)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button onClick={addProject} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Plus size={20} className="inline mr-2" />
          New Project
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Project List</h3>
          <ul className="space-y-2">
            {projects.map((project) => (
              <li key={project.id} className="bg-gray-100 p-2 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{project.name}</span>
                  <div>
                    <button onClick={() => setEditingProject(project)} className="text-blue-500 hover:text-blue-700 mr-2">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => deleteProject(project.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">{project.description}</p>
                <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
                  project.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                  project.status === 'Completed' ? 'bg-green-200 text-green-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {project.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {editingProject ? (
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-2">Edit Project</h3>
              <input
                type="text"
                value={editingProject.name}
                onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Project Name"
              />
              <textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full p-2 border rounded mb-2 h-20"
                placeholder="Project Description"
              />
              <select
                value={editingProject.status}
                onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as Project['status'] })}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
              <div className="flex justify-end">
                <button
                  onClick={() => updateProject(editingProject)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProject(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a project to edit or create a new one.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects