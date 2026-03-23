import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  emailVerified: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = 'http://localhost:3000/api'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar sesión al cargar
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include'
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Error al iniciar sesión')
    }

    const data = await res.json()
    setUser(data.user)
    
    // Redirigir según rol
    if (data.user.role === 'admin') {
      navigate('/admin/dashboard')
    } else {
      navigate('/dashboard')
    }
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Error al registrar')
    }

    // Mostrar mensaje de verificación de email
    navigate('/verify-email-sent')
  }

  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      credentials: 'include'
    })
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}