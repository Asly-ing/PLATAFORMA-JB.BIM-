import { Link } from 'react-router-dom';
import { Play, Clock, TrendingUp, BookOpen, CheckCircle2, Video } from 'lucide-react';

export function MyClasses() {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Fundamentos de BIM',
      instructor: 'Juan Pérez',
      progress: 45,
      totalLessons: 24,
      completedLessons: 11,
      lastWatched: 'Beneficios del BIM en proyectos',
      duration: '8 horas',
      thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop',
      nextLesson: {
        id: 3,
        title: 'Beneficios del BIM en proyectos',
        duration: '18:45'
      }
    },
    {
      id: 2,
      title: 'Revit Arquitectónico Avanzado',
      instructor: 'María García',
      progress: 20,
      totalLessons: 32,
      completedLessons: 6,
      lastWatched: 'Modelado de muros cortina',
      duration: '12 horas',
      thumbnail: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop',
      nextLesson: {
        id: 7,
        title: 'Familias paramétricas básicas',
        duration: '25:30'
      }
    },
    {
      id: 3,
      title: 'Coordinación BIM con Navisworks',
      instructor: 'Carlos Rodríguez',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      lastWatched: 'Clash detection avanzado',
      duration: '10 horas',
      thumbnail: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=250&fit=crop',
      nextLesson: {
        id: 16,
        title: 'Simulación 4D de construcción',
        duration: '30:00'
      }
    }
  ];

  const recentActivity = [
    { 
      course: 'Fundamentos de BIM', 
      lesson: 'Historia y evolución del BIM',
      date: 'Hace 2 horas',
      completed: true 
    },
    { 
      course: 'Coordinación BIM con Navisworks', 
      lesson: 'Clash detection avanzado',
      date: 'Ayer',
      completed: true 
    },
    { 
      course: 'Revit Arquitectónico Avanzado', 
      lesson: 'Modelado de muros cortina',
      date: 'Hace 3 días',
      completed: false 
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Mis Clases</h1>
              <p className="text-muted-foreground mt-1">Continúa tu aprendizaje donde lo dejaste</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 text-primary mb-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-2xl font-bold">{enrolledCourses.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Cursos activos</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 text-secondary mb-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-2xl font-bold">32</span>
              </div>
              <p className="text-sm text-muted-foreground">Lecciones completadas</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 text-accent mb-2">
                <Clock className="h-5 w-5" />
                <span className="text-2xl font-bold">18h</span>
              </div>
              <p className="text-sm text-muted-foreground">Horas de aprendizaje</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 text-primary mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-2xl font-bold">87%</span>
              </div>
              <p className="text-sm text-muted-foreground">Promedio de avance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Enrolled Courses */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Cursos en progreso</h2>
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="grid md:grid-cols-[240px_1fr] gap-6">
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Link
                          to={`/classroom/${course.id}/lesson/${course.nextLesson.id}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                          <Play className="h-5 w-5" />
                          Continuar
                        </Link>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <Link 
                          to={`/courses/${course.id}`}
                          className="text-xl font-semibold mb-2 hover:text-primary transition-colors inline-block"
                        >
                          {course.title}
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="font-medium">Progreso del curso</span>
                            <span className="text-primary font-semibold">{course.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {course.completedLessons} de {course.totalLessons} lecciones completadas
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p className="text-muted-foreground mb-1">Siguiente lección:</p>
                          <p className="font-medium">{course.nextLesson.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {course.nextLesson.duration}
                          </p>
                        </div>
                        <Link
                          to={`/classroom/${course.id}/lesson/${course.nextLesson.id}`}
                          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                          <Play className="h-4 w-4" />
                          Continuar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Explore More */}
            <div className="mt-8 p-6 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 text-center">
              <h3 className="text-xl font-semibold mb-2">¿Buscas más cursos?</h3>
              <p className="text-muted-foreground mb-4">
                Explora nuestra biblioteca completa de cursos BIM
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Explorar Cursos
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Recent Activity */}
            <div className="bg-card rounded-xl border border-border p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Actividad Reciente
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${
                      activity.completed ? 'bg-secondary/10' : 'bg-primary/10'
                    }`}>
                      {activity.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                      ) : (
                        <Play className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.lesson}</p>
                      <p className="text-xs text-muted-foreground">{activity.course}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Streak */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">🔥 Racha de Aprendizaje</h3>
              <p className="text-4xl font-bold mb-2">7 días</p>
              <p className="text-sm opacity-90 mb-4">
                ¡Excelente! Has estudiado 7 días seguidos
              </p>
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-2 rounded-full bg-white/30"
                  >
                    <div className="h-full bg-white rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
