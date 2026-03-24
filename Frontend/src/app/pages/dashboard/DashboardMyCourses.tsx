import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, Filter, Search } from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';

export function DashboardMyCourses() {
  const allCourses = [
    {
      id: 1,
      title: 'Revit Arquitectónico Avanzado',
      instructor: 'María García',
      progress: 65,
      status: 'in-progress',
      duration: '24h',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Coordinación BIM con Navisworks',
      instructor: 'Carlos Rodríguez',
      progress: 40,
      status: 'in-progress',
      duration: '18h',
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Dynamo para Revit',
      instructor: 'Patricia Sánchez',
      progress: 20,
      status: 'in-progress',
      duration: '16h',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Fundamentos de BIM',
      instructor: 'Juan Pérez',
      progress: 100,
      status: 'completed',
      duration: '12h',
      completedDate: '15 Ene 2026',
      certificate: true,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'Revit MEP: Instalaciones',
      instructor: 'Luis Fernández',
      progress: 100,
      status: 'completed',
      duration: '20h',
      completedDate: '10 Ene 2026',
      certificate: true,
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Revit Structure: Estructuras',
      instructor: 'Ana Martínez',
      progress: 100,
      status: 'completed',
      duration: '22h',
      completedDate: '5 Ene 2026',
      certificate: true,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop'
    },
  ];

  const inProgressCourses = allCourses.filter(c => c.status === 'in-progress');
  const completedCourses = allCourses.filter(c => c.status === 'completed');

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Mis Cursos</h1>
        <p className="text-muted-foreground">
          Gestiona y accede a todos tus cursos
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors">
          <Filter className="h-5 w-5" />
          Filtrar
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="text-2xl font-bold mb-1">{allCourses.length}</div>
          <div className="text-sm text-muted-foreground">Total de Cursos</div>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="text-2xl font-bold mb-1 text-primary">{inProgressCourses.length}</div>
          <div className="text-sm text-muted-foreground">En Progreso</div>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="text-2xl font-bold mb-1 text-secondary">{completedCourses.length}</div>
          <div className="text-sm text-muted-foreground">Completados</div>
        </div>
      </div>

      {/* Courses in Progress */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">En Progreso</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgressCourses.map((course) => (
            <div key={course.id} className="rounded-xl border border-border overflow-hidden bg-card hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold">
                  En curso
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {course.instructor}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="block text-center py-2 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Continuar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Courses */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Completados</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedCourses.map((course) => (
            <div key={course.id} className="rounded-xl border border-border overflow-hidden bg-card hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-secondary/90 text-white text-xs font-semibold">
                  Completado
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {course.instructor}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Completado el {course.completedDate}
                </p>
                {course.certificate && (
                  <button className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium">
                    <Award className="h-4 w-4" />
                    Ver Certificado
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}