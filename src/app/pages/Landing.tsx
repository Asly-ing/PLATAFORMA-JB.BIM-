import { Link } from 'react-router-dom';
import { 
  Play, 
  Users, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Star, 
  ArrowRight, 
  CheckCircle2,
  X,
  Zap,
  Video,
  Download,
  FolderOpen,
  Route,
  FileCheck,
  CreditCard,
  UsersRound
} from 'lucide-react';

export function Landing() {
  const features = [
    {
      icon: BookOpen,
      title: 'Contenido Especializado',
      description: 'Cursos diseñados por expertos en BIM y construcción'
    },
    {
      icon: Users,
      title: 'Comunidad Activa',
      description: 'Conecta con profesionales y estudiantes del sector'
    },
    {
      icon: Award,
      title: 'Certificaciones',
      description: 'Obtén certificados reconocidos en la industria'
    },
    {
      icon: TrendingUp,
      title: 'Progreso Medible',
      description: 'Seguimiento detallado de tu aprendizaje'
    }
  ];

  const popularCourses = [
    {
      id: 1,
      title: 'Fundamentos de BIM',
      instructor: 'Juan Pérez',
      level: 'Principiante',
      duration: '8 horas',
      rating: 4.8,
      students: 2400,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Revit Arquitectónico Avanzado',
      instructor: 'María García',
      level: 'Avanzado',
      duration: '12 horas',
      rating: 4.9,
      students: 1800,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Coordinación BIM con Navisworks',
      instructor: 'Carlos Rodríguez',
      level: 'Intermedio',
      duration: '10 horas',
      rating: 4.7,
      students: 1500,
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=250&fit=crop'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-16 sm:py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Domina el{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  BIM
                </span>{' '}
                Lidera proyectos. Transforma tu carrera
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Aplicar la metodología BIM en proyectos reales de arquitectura, estructuras y MEP.
                Con el uso de estándares y buenas prácticas BIM
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Explorar Cursos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Intro
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                alt="BIM Learning"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto md:max-w-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
<section className="py-12 bg-muted/30">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg text-center"
          >
            {/* Número grande */}
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {feature.stat}
            </div>

            {/* Label pequeño */}
            <div className="text-sm text-muted-foreground mb-4">
              {feature.statLabel}
            </div>

            {/* Icono */}
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-lg bg-primary/10 mb-4">
              <Icon className="h-6 w-6 text-primary" />
            </div>

            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* Popular Courses */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Cursos Populares
              </h2>
              <p className="text-lg text-muted-foreground">
                Los más elegidos por nuestra comunidad
              </p>
            </div>
            <Link
              to="/courses"
              className="hidden md:inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Ver todos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {popularCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all bg-card"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                    {course.level}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.instructor}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-muted-foreground">({course.students})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className=" bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Elige el plan que mejor se adapte a tus objetivos profesionales
              </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto items-stretch">
            {/* Plan 1 - Monthly Access */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl transition-all">
              <div className="p-6 pb-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold">ACCESO MENSUAL</h3>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground line-through">$750,000.00 COP</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-secondary">$295,000</span>
                  <span className="text-muted-foreground">COP/mes</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  (~$74 USD)
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Acceso a todos los cursos por 1 mes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Máximo 3 certificaciones por mes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Soporte en foros</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Actualizaciones de cursos incluidas</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Sesión grupal en vivo semanal</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Licencias de software</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Grupo privado exclusivo</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Bibliotecas BIM</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Proyectos descargables</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Ruta de aprendizaje recomendada</span>
                  </li>
                </ul>

                <Link
                  to="/payment/monthly"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-secondary text-secondary font-medium hover:bg-secondary hover:text-white transition-colors"
                >
                  Elegir Acceso Mensual
                </Link>
              </div>
            </div>

            {/* Plan 2 - Professional BIM Program (Most Popular) */}
            <div className="rounded-2xl border-2 border-primary bg-card overflow-hidden hover:shadow-xl transition-all relative">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                MÁS POPULAR
              </div>
              
              <div className="p-6 pb-4 border-b border-border bg-primary/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">PROGRAMA PROFESIONAL BIM</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">6 meses de acceso</p>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground line-through">$1,770,000.00 COP</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">$997,000</span>
                  <span className="text-muted-foreground">COP/6 meses</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  (~$249 USD)
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Acceso a todos los cursos por 6 meses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Certificación incluida para todos los cursos aprobados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Soporte en foros</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Actualizaciones de cursos incluidas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Video className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">1 sesión grupal en vivo semanal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Licencias de software Autodesk durante suscripción</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <UsersRound className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Acceso a grupo privado exclusivo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FolderOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Acceso a bibliotecas BIM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Download className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Acceso a proyectos descargables</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Route className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Ruta de aprendizaje recomendada incluida</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Opción de pago en 2 cuotas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Incluye descuento grupal</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Revisión personal de proyectos</span>
                  </li>
                </ul>

                <Link
                  to="/payment/professional"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                >
                  Elegir Plan Profesional
                </Link>
              </div>
            </div>

            {/* Plan 3 - Specialist BIM Program */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl transition-all">
              <div className="p-6 pb-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Star className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold">PROGRAMA ESPECIALISTA BIM</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">12 meses de acceso</p>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground line-through">$2,490,000.00 COP</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-accent">$1,697,000 </span>
                  <span className="text-muted-foreground">COP/año</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  (~$424 USD)
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Acceso a todos los cursos por 1 año</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Certificación incluida para todos los cursos aprobados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Soporte en foros</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Actualizaciones de cursos incluidas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Video className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">1 sesión grupal en vivo semanal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Licencias de software Autodesk durante suscripción</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <UsersRound className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Acceso a grupo privado exclusivo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FolderOpen className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Acceso a bibliotecas BIM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Download className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Acceso a proyectos descargables</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Route className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Ruta de aprendizaje recomendada incluida</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Incluye revisión personal de proyectos en vivo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Opción de pago en 3 cuotas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Incluye descuento grupal</span>
                  </li>
                </ul>

                <Link
                  to="/payment/specialist"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-accent text-accent font-medium hover:bg-accent hover:text-white transition-colors"
                >
                  Elegir Plan Especialista
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              ¿Necesitas un plan personalizado para tu empresa? 
              <Link to="/contact" className="text-primary hover:text-primary/80 ml-1 font-medium">
                Contáctanos
              </Link>
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span>Garantía de devolución 30 días</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span>Certificados reconocidos internacionalmente</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span>Contenido actualizado constantemente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-accent p-8 sm:p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Únete a miles de profesionales que están transformando su carrera con JP.BIM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary font-medium hover:bg-white/90 transition-colors"
              >
                Comenzar Ahora
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}