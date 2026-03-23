import { Target, Compass, CheckCircle, MapPin, Building2, Trophy } from 'lucide-react';

export function About() {
  const objectives = [
    'Capacitar profesionales competentes en la aplicación de la metodología BIM.',
    'Aplicar la metodología BIM en proyectos reales de arquitectura, estructuras y MEP.',
    'Elevar el nivel técnico y profesional de estudiantes y empresas del sector AEC.',
    'Promover el uso de estándares y buenas prácticas BIM.',
    'Consolidar a JPBIM como referente en educación BIM certificada.',
  ];

  const achievements = [
    'Desarrollado y gestionado múltiples modelos BIM completos.',
    'Impartido cursos especializados en diferentes softwares y metodologías del sector AEC.',
    'Acompañado procesos de adopción BIM en proyectos y empresas.',
    'Formado profesionales que hoy aplican BIM en el ámbito laboral y académico.',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Foto JP.BIM
            </h1>
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-6">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-6">¿Quiénes Somos?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                JPBIM es una empresa colombiana especializada en metodología BIM, enfocada en la formación profesional, 
                la modelación de proyectos y la consultoría técnica para los sectores de arquitectura, ingeniería y construcción (AEC).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Trabajamos bajo estándares BIM aplicados a proyectos reales. Nuestro enfoque combina teoría clara, práctica intensiva 
                y aplicación profesional, garantizando resultados medibles para estudiantes y empresas.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos <span className="font-semibold text-foreground">Autodesk Training Center</span> y ofrecemos procesos de formación 
                orientados a la mejora de la productividad, la calidad del modelado y la correcta gestión de la información en proyectos constructivos.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                    FOTO JP.BIM
                  </div>
                  <p className="text-xl font-semibold text-foreground">Autodesk Training Center</p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                      <div className="text-3xl font-bold text-primary">100+</div>
                      <div className="text-sm text-muted-foreground">Estudiantes</div>
                    </div>
                    <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                      <div className="text-3xl font-bold text-accent">50+</div>
                      <div className="text-sm text-muted-foreground">Proyectos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-background rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Visión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ser una empresa líder en formación y consultoría BIM en Colombia y Latinoamérica, reconocida por la calidad técnica 
                de sus cursos, el impacto profesional de sus egresados y su compromiso con la innovación y la transformación digital 
                del sector de la construcción.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-background rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-lg mb-6">
                <Compass className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Misión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Brindar formación, consultoría y servicios BIM de alta calidad, capacitando a estudiantes y profesionales para que 
                dominen herramientas digitales como Revit y apliquen la metodología BIM de forma eficiente, práctica y alineada con 
                las necesidades reales del sector AEC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Nuestros Objetivos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprometidos con la excelencia en la formación BIM
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 border border-border hover:border-primary transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <CheckCircle className="h-5 w-5 text-primary group-hover:text-white" />
                  </div>
                  <p className="text-foreground leading-relaxed">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trayectoria */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-lg mb-6">
              <Trophy className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Nuestra Trayectoria</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              JP.BIM cuenta con varios años de experiencia en la implementación de BIM, el desarrollo de modelos profesionales 
              y la formación de cientos de estudiantes y profesionales en diferentes niveles.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <p className="text-foreground leading-relaxed pt-1">{achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-6">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Dónde Encontrarnos</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-background rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold mb-4">Nuestra Ubicación</h3>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Manzana 12 casa 4, Portal de Betania</span>
                </p>
                <p className="pl-7">Los Patios, Norte de Santander</p>
                <p className="pl-7">Colombia, C.P. 541010</p>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <a
                  href="https://maps.app.goo.gl/jXiUTNs357NhJ27E7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <MapPin className="h-5 w-5" />
                  Ver en Google Maps
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d988.2226340448243!2d-72.52093207155602!3d7.801412328204156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwNDgnMDUuMSJOIDcywrAzMScxMy4wIlc!5e0!3m2!1ses!2sco!4v1771277891675!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación JP.BIM"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tu carrera profesional?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Únete a JP.BIM y domina la metodología BIM con los mejores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="inline-flex items-center justify-center rounded-lg bg-white text-primary px-8 py-3 font-semibold hover:bg-white/90 transition-colors"
            >
              Ver Cursos
            </a>
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 text-white border-2 border-white px-8 py-3 font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Comenzar Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}