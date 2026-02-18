import { Link } from 'react-router-dom';
import {Phone, Mail, Youtube, Facebook, Instagram, Music2, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <img
                src="/logo.png"
                alt="JP.BIM Logo"
                className="h-10 w-10 object-contain"
              />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                JP.BIM
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Plataforma dedicada a ofrecer servicios especializados y cursos en BIM, arquitectura, ingeniería y construcción, orientada a la formación y desarrollo profesional en el sector.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61557482336303" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>

              <a href="https://www.instagram.com/jpbimcolombia/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>

              <a href="https://www.tiktok.com/@jpbim_revit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Music2 className="h-5 w-5" />
              </a>

              <a href="https://www.youtube.com/@jpbimRevit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/573219642017?text=Hola,%20vi%20tu%20plataforma%20JP.BIM%20y%20me%20gustaría%20saber%20más%20sobre%20sus%20servicios%20y%20cursos%20😊."
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
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
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">Comunidad</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Proyectos</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
                {/* Email */}
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a
                    href="mailto:cursos@jpbim.com.co"
                    className="hover:text-primary transition-colors"
                  >
                    cursos@jpbim.com.co
                  </a>
                </li>

                {/* WhatsApp */}
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <a
                    href="https://wa.me/573219642017?text=Hola,%20vi%20tu%20plataforma%20JP.BIM%20y%20me%20gustaría%20saber%20más%20sobre%20sus%20servicios%20y%20cursos%20😊."
                    target="_blank"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>

                {/* Instagram */}
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Instagram className="h-4 w-4" />
                  <a
                    href="https://instagram.com/jpbimcolombia"
                    target="_blank"
                    className="hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                </li>

                {/* Facebook */}
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Facebook className="h-4 w-4" />
                  <a
                    href="https://facebook.com/profile.php?id=61557482336303"
                    target="_blank"
                    className="hover:text-primary transition-colors"
                  >
                    Facebook
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
