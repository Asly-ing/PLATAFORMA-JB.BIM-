import { useState } from 'react';
import { User, Mail, Lock, Bell, Globe, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

export function DashboardSettings() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    newContent: true,
    achievements: true,
    newsletter: false,
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Ajustes</h1>
        <p className="text-muted-foreground">
          Personaliza tu experiencia en JP.BIM
        </p>
      </div>

      {/* Profile Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Perfil</h2>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-6 mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
              JD
            </div>
            <div>
              <h3 className="text-xl font-bold">Juan Díaz</h3>
              <p className="text-sm text-muted-foreground">juan.diaz@example.com</p>
              <button className="mt-2 text-sm text-primary hover:text-primary/80">
                Cambiar foto de perfil
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre completo</label>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background">
                <User className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  defaultValue="Juan Díaz"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Correo electrónico</label>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  defaultValue="juan.diaz@example.com"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Profesión</label>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background">
                <User className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  defaultValue="Arquitecto BIM"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Ej: Ingeniero Civil, Arquitecto..."
                />
              </div>
            </div>

            <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Seguridad</h2>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña actual</label>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nueva contraseña</label>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirmar contraseña</label>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            <button className="w-full px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors font-medium">
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Apariencia</h2>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="h-5 w-5 text-muted-foreground" />
            <label className="block text-sm font-medium">Tema</label>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
              }`}
            >
              <Sun className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Claro</div>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
              }`}
            >
              <Moon className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Oscuro</div>
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
              }`}
            >
              <Monitor className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Sistema</div>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Notificaciones</h2>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Actualizaciones de cursos</div>
                  <div className="text-sm text-muted-foreground">
                    Recibe notificaciones cuando se actualice un curso
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.courseUpdates}
                  onChange={(e) =>
                    setNotifications({ ...notifications, courseUpdates: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Nuevo contenido</div>
                  <div className="text-sm text-muted-foreground">
                    Notificaciones de nuevos cursos y lecciones
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.newContent}
                  onChange={(e) =>
                    setNotifications({ ...notifications, newContent: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Logros y certificados</div>
                  <div className="text-sm text-muted-foreground">
                    Notificaciones cuando obtengas logros
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.achievements}
                  onChange={(e) =>
                    setNotifications({ ...notifications, achievements: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Newsletter</div>
                  <div className="text-sm text-muted-foreground">
                    Recibe noticias y promociones por correo
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.newsletter}
                  onChange={(e) =>
                    setNotifications({ ...notifications, newsletter: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Idioma y Región</h2>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Idioma</label>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <select className="flex-1 bg-transparent outline-none">
                  <option>Español</option>
                  <option>English</option>
                  <option>Português</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Zona horaria</label>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <select className="flex-1 bg-transparent outline-none">
                  <option>GMT-5 (Bogotá, Colombia)</option>
                  <option>GMT-6 (Ciudad de México)</option>
                  <option>GMT-3 (Buenos Aires)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
