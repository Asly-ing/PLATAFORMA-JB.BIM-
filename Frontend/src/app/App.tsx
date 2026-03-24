import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/app/contexts/ThemeContext'
import { AuthProvider, useAuth } from '@/app/contexts/AuthContext'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'

// Layouts
import { DashboardLayout } from '@/app/layouts/DashboardLayout'

// Pages - existen en tu proyecto
import { Landing } from '@/app/pages/Landing'
import { Courses } from '@/app/pages/Courses'
import { CourseDetails } from '@/app/pages/CourseDetails'
import { About } from '@/app/pages/About'
import { Community } from '@/app/pages/Community'
import { Libraries } from '@/app/pages/Libraries'
import { ClassRoom } from '@/app/pages/ClassRoom'
import AdminDashboard from '@/app/pages/AdminDashboard'
import AssignmentSubmission from '@/app/pages/AssignmentSubmission'
import CoursePlayer from '@/app/pages/CoursePlayer'

// Dashboard sub-pages
import { DashboardHome } from '@/app/pages/dashboard/DashboardHome'
import { DashboardProgress } from '@/app/pages/dashboard/DashboardProgress'
import { DashboardMyCourses } from '@/app/pages/dashboard/DashboardMyCourses'
import { DashboardSubscription } from '@/app/pages/dashboard/DashboardSubscription'
import { DashboardSettings } from '@/app/pages/dashboard/DashboardSettings'

// Auth
import { Login } from '@/app/auth/Login'
import { Register } from '@/app/auth/Register'
import { VerifyEmail } from '@/app/auth/VerifyEmail'

// ── Guards ──────────────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
    </div>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />
  return <>{children}</>
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  if (user) {
    // Si ya está logueado, manda al lugar correcto
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
  }
  return <>{children}</>
}

// ── Rutas ───────────────────────────────────────────────────────────────────

function AppRoutes() {
  return (
    <Routes>

      {/* ===== DASHBOARD usuarios normales — sin Header/Footer ===== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="progress" element={<DashboardProgress />} />
        <Route path="my-courses" element={<DashboardMyCourses />} />
        <Route path="subscription" element={<DashboardSubscription />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>

      {/* ===== ADMIN — sin Header/Footer ===== */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* ===== RUTAS CON Header/Footer ===== */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/community" element={<Community />} />
                <Route path="/libraries" element={<Libraries />} />

                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                <Route path="/classroom/:courseId/lesson/:lessonId" element={
                  <ProtectedRoute><ClassRoom /></ProtectedRoute>
                } />
                <Route path="/courses/:id/learn" element={
                  <ProtectedRoute><CoursePlayer /></ProtectedRoute>
                } />
                <Route path="/courses/:courseId/assignments/:assignmentId" element={
                  <ProtectedRoute><AssignmentSubmission /></ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        }
      />

    </Routes>
  )
}

// ── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}