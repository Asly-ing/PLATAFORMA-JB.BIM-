import { Link } from 'react-router-dom';
import { BookOpen, Mail, Linkedin, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                JP.BIM
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Plataforma educativa especializada en BIM, arquitectura, ingeniería y construcción.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Cursos */}
          <div>
            <h4 className="font-semibold mb-4">Cursos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">BIM Básico</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">BIM Avanzado</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Revit</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Navisworks</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">Comunidad</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Carreras</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@jpbim.com" className="hover:text-primary transition-colors">
                  info@jpbim.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} JP.BIM. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
