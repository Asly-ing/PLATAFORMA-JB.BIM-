import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Award, Clock, Play, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';

export function Dashboard() {
  const userStats = {
    coursesInProgress: 3,
    coursesCompleted: 5,
    totalHours: 42,
    certificates: 5
  };

  const coursesInProgress = [
    {
      id: 1,
      title: 'Revit Arquitectónico Avanzado',
      instructor: 'María García',
      progress: 65,
      lastWatched: 'Lección 12: Modelado de fachadas',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Coordinación BIM con Navisworks',
      instructor: 'Carlos Rodríguez',
      progress: 40,
      lastWatched: 'Lección 8: Detección de interferencias',
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Dynamo para Revit',
      instructor: 'Patricia Sánchez',
      progress: 20,
      lastWatched: 'Lección 3: Nodos básicos',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop'
    }
  ];

  const completedCourses = [
    {
      id: 4,
      title: 'Fundamentos de BIM',
      instructor: 'Juan Pérez',
      completedDate: '15 Ene 2026',
      certificate: true,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'Revit MEP: Instalaciones',
      instructor: 'Luis Fernández',
      completedDate: '10 Ene 2026',
      certificate: true,
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop'
    }
  ];

  const achievements = [
    {
      title: 'Primera Lección',
      description: 'Completaste tu primera lección',
      date: '20 Dic 2025',
      icon: BookOpen
    },
    {
      title: 'Primer Curso',
      description: 'Completaste tu primer curso',
      date: '15 Ene 2026',
      icon: Award
    },
    {
      title: 'Estudiante Dedicado',
      description: '30 días de racha de estudio',
      date: '10 Ene 2026',
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Mi Aprendizaje</h1>
          <p className="text-lg text-muted-foreground">
            Continúa donde lo dejaste y sigue mejorando tus habilidades
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{userStats.coursesInProgress}</div>
                <div className="text-xs text-muted-foreground">En Progreso</div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{userStats.coursesCompleted}</div>
                <div className="text-xs text-muted-foreground">Completados</div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">{userStats.totalHours}h</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Award className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{userStats.certificates}</div>
                <div className="text-xs text-muted-foreground">Certificados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses in Progress */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Continuar Aprendiendo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesInProgress.map((course) => (
              <div key={course.id} className="rounded-xl border border-border overflow-hidden bg-card">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                      <Play className="h-6 w-6 text-primary" />
                    </div>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {course.instructor}
                  </p>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{course.lastWatched}</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="block text-center py-2 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors mt-3"
                  >
                    Continuar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Completed Courses */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Cursos Completados</h2>
            <div className="space-y-4">
              {completedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {course.instructor}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Completado el {course.completedDate}
                    </p>
                    {course.certificate && (
                      <button className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80">
                        <Award className="h-4 w-4" />
                        Ver Certificado
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Logros</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-3 p-4 rounded-xl border border-border bg-card"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{achievement.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
