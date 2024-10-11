import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface LoginProps {
  onLogin: (token: string) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('token', data.token) // Store the token
        onLogin(data.token)
        navigate('/')
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  // Rest of the component remains the same...

   return (
  <div>
    {/* Your JSX content goes here */}
  </div>
)
}

export default Login