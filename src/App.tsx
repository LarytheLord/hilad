import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Workspace from './components/Workspace'
import Login from './components/Login'
import Register from './components/Register'
import { Teamspace } from './types'

const initialTeamspaces: Teamspace[] = [
  {
    name: 'General',
    pages: [
      { name: 'Home', icon: '🏠' },
      { name: 'Meeting Notes', icon: '📝' },
      { name: 'Docs', icon: '📄' },
      { name: 'Support', icon: '🛟' },
      { name: 'Projects', icon: '🚀' },
      { name: 'Roadmap', icon: '🗺️' },
    ],
  },
]

function App() {
  const [teamspaces, setTeamspaces] = useState<Teamspace[]>(initialTeamspaces)
  const [activePage, setActivePage] = useState('Home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" /> : <Register />
          } />
          <Route path="/" element={
            isAuthenticated ? (
              <>
                <Sidebar teamspaces={teamspaces} setActivePage={setActivePage} activePage={activePage} onLogout={handleLogout} />
                <Workspace activePage={activePage} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App