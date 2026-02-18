import { Link } from 'react-router-dom';
import { Play, Users, Award, TrendingUp, BookOpen, Clock, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

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

  const stats = [
    { value: '10,000+', label: 'Estudiantes' },
    { value: '150+', label: 'Cursos' },
    { value: '95%', label: 'Satisfacción' },
    { value: '24/7', label: 'Acceso' }
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
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Domina el{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  BIM
                </span>{' '}
                y transforma tu carrera
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Aprende de expertos en arquitectura, ingeniería y construcción. 
                Accede a cursos especializados y únete a la revolución digital del sector.
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
                  Ver Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                alt="BIM Learning"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué elegir JP.BIM?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de aprendizaje en tecnologías BIM
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="p-6">
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-accent p-12 md:p-16 text-center text-white">
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
