import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/app/contexts/ThemeContext'
import { AuthProvider, useAuth } from '@/app/contexts/AuthContext'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { Landing } from '@/app/pages/Landing'
import { Courses } from '@/app/pages/Courses'
import { CourseDetails } from '@/app/pages/CourseDetails'
import { Dashboard } from '@/app/pages/Dashboard'
import { Login } from '@/app/auth/Login'
import { Register } from '@/app/auth/Register'
import { VerifyEmail } from '@/app/auth/VerifyEmail'
import { Community } from '@/app/pages/Community'
import { MyClasses } from '@/app/pages/MyClasses'
import { ClassRoom } from '@/app/pages/ClassRoom'
import { About } from '@/app/pages/About'
import { Libraries } from '@/app/pages/Libraries'

// Ruta protegida - solo usuarios logueados
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Ruta solo para admin
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}

// Ruta para invitados - si ya estás logueado te redirige
function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* ===== RUTAS PÚBLICAS ===== */}
      <Route path="/" element={<Landing />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/community" element={<Community />} />
      <Route path="/libraries" element={<Libraries />} />

      {/* ===== RUTAS DE AUTENTICACIÓN (solo invitados) ===== */}
      <Route path="/login" element={
        <GuestRoute>
          <Login />
        </GuestRoute>
      } />
      <Route path="/register" element={
        <GuestRoute>
          <Register />
        </GuestRoute>
      } />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* ===== RUTAS PROTEGIDAS (solo logueados) ===== */}
      <Route path="/home" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/my-classes" element={
        <ProtectedRoute>
          <MyClasses />
        </ProtectedRoute>
      } />
      <Route path="/classroom/:courseId/lesson/:lessonId" element={
        <ProtectedRoute>
          <ClassRoom />
        </ProtectedRoute>
      } />

      {/* ===== RUTAS DE ADMIN ===== */}
      <Route path="/dashboard" element={
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}