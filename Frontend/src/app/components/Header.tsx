import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, BookOpen, Menu, X, Video,Phone, Mail, Facebook, ChevronDown } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useState } from 'react';


export function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/about', label: 'Nosotros' },
    { path: '/courses', label: 'Cursos',},
    { path: '/libraries', label: 'Bibliotecas' },
  
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            {/* Logo */}
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent overflow-hidden">
              <img
                src="/logo.png"
                alt="JP.BIM Logo"
                className="h-16 w-16 object-contain"
              />
            </div>
            <span className="text-3xl font-bold whitespace-nowrap text-primary">
              JP.BIM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 ">
            
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
                   <div className="relative hidden md:block group">

            {/*Contactenos */}
            <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <Phone className="h-5 w-5" />
              Contáctenos
              <ChevronDown className="h-4 w-4" />
            </button>

              {/* Submenu de contactenos */}
              <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-background shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                
                <a
                  href="https://wa.me/573219642017"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp
                </a>

                <a
                  href="mailto:cursos@jpbim.com.co"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61557482336303"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              </div>
            </div>
            <Link
              to="/login"
              className="hidden md:inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Iniciar Sesión
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path) ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Iniciar Sesión
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}