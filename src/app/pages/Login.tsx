import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/register logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              JP.BIM
            </span>
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            Transforma tu carrera con BIM
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Únete a miles de profesionales que están avanzando en sus carreras con nuestros cursos especializados.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 flex-shrink-0">
                <BookOpen className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">150+ Cursos Especializados</h3>
                <p className="text-sm text-muted-foreground">
                  Contenido actualizado por expertos en la industria
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 flex-shrink-0">
                <BookOpen className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Certificados Reconocidos</h3>
                <p className="text-sm text-muted-foreground">
                  Valida tus conocimientos con certificaciones oficiales
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 flex-shrink-0">
                <BookOpen className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Aprende a tu ritmo</h3>
                <p className="text-sm text-muted-foreground">
                  Acceso ilimitado desde cualquier dispositivo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </h2>
              <p className="text-muted-foreground">
                {isLogin
                  ? 'Ingresa tus credenciales para continuar'
                  : 'Completa el formulario para comenzar'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nombre Completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Juan Pérez"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted-foreground">Recordarme</span>
                  </label>
                  <button type="button" className="text-sm text-primary hover:text-primary/80">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground"
              >
                {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                <span className="text-primary hover:text-primary/80 font-medium">
                  {isLogin ? 'Regístrate' : 'Inicia Sesión'}
                </span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Al continuar, aceptas nuestros{' '}
                <a href="#" className="text-primary hover:text-primary/80">
                  Términos de Servicio
                </a>{' '}
                y{' '}
                <a href="#" className="text-primary hover:text-primary/80">
                  Política de Privacidad
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
