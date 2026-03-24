import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext'; // 👈 ajusta si la ruta difiere
import { 
  Home, 
  TrendingUp, 
  BookOpen, 
  Crown, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DashboardSidebar({ isOpen, setIsOpen }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); // 👈 ajusta el nombre si en tu contexto se llama distinto
  const [loggingOut, setLoggingOut] = useState(false);

  const menuItems = [
    { path: '/dashboard',              label: 'Inicio',          icon: Home      },
    { path: '/dashboard/progress',     label: 'Progreso',        icon: TrendingUp },
    { path: '/dashboard/my-courses',   label: 'Mis Cursos',      icon: BookOpen  },
    { path: '/dashboard/subscription', label: 'Mi Suscripción',  icon: Crown     },
    { path: '/dashboard/settings',     label: 'Ajustes',         icon: Settings  },
  ];

  const handleLogout = async () => {
  if (loggingOut) return
  setLoggingOut(true)
  try {
    await logout()   // el contexto ya hace fetch + setUser(null) + navigate('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  } finally {
    setLoggingOut(false)
  }
}

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center h-10 w-10 rounded-lg bg-card border border-border shadow-lg hover:bg-muted transition-colors"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-card border-r border-border transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-0 lg:w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            {isOpen && (
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">JP</span>
                </div>
                <span className="font-bold text-xl">JP.BIM</span>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:flex items-center justify-center h-8 w-8 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronLeft className={`h-5 w-5 transition-transform ${!isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      } ${!isOpen ? 'justify-center' : ''}`}
                      title={!isOpen ? item.label : ''}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && <span className="font-medium">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer - Logout */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                !isOpen ? 'justify-center' : ''
              }`}
              title={!isOpen ? 'Cerrar Sesión' : ''}
            >
              <LogOut className={`h-5 w-5 flex-shrink-0 ${loggingOut ? 'animate-spin' : ''}`} />
              {isOpen && (
                <span className="font-medium">
                  {loggingOut ? 'Cerrando...' : 'Cerrar Sesión'}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}