import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export function AdminOverview() {
  const stats = [
    {
      label: 'Total Estudiantes',
      value: '12,543',
      change: '+12.5%',
      changeType: 'increase',
      icon: Users,
      color: 'primary',
    },
    {
      label: 'Cursos Activos',
      value: '48',
      change: '+3',
      changeType: 'increase',
      icon: BookOpen,
      color: 'secondary',
    },
    {
      label: 'Ingresos del Mes',
      value: '$94,328',
      change: '+18.2%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'accent',
    },
    {
      label: 'Tasa de Crecimiento',
      value: '23.8%',
      change: '+2.4%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'primary',
    },
  ];

  const recentEnrollments = [
    { name: 'Carlos Mendoza', course: 'BIM Professional', time: 'Hace 2 horas', avatar: 'CM' },
    { name: 'María García', course: 'Revit Arquitectura', time: 'Hace 5 horas', avatar: 'MG' },
    { name: 'Juan Pérez', course: 'Detección de Conflictos', time: 'Hace 8 horas', avatar: 'JP' },
    { name: 'Ana Torres', course: 'BIM Estructural', time: 'Hace 1 día', avatar: 'AT' },
    { name: 'Luis Ramírez', course: 'Coordinación BIM', time: 'Hace 1 día', avatar: 'LR' },
  ];

  const systemStatus = [
    { name: 'Streaming de Video', status: 'operational', label: 'Operacional' },
    { name: 'Pasarela de Pagos', status: 'operational', label: 'Operacional' },
    { name: 'Servicio de Email', status: 'degraded', label: 'Degradado' },
    { name: 'Base de Datos', status: 'operational', label: 'Operacional' },
  ];

  const topCourses = [
    { title: 'BIM Professional Certification', students: 2543, revenue: 45678 },
    { title: 'Revit Arquitectónico Avanzado', students: 1876, revenue: 32450 },
    { title: 'Coordinación BIM con Navisworks', students: 1234, revenue: 18900 },
    { title: 'BIM Estructural con Revit', students: 845, revenue: 15230 },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Panel de Administración</h1>
        <p className="text-muted-foreground">
          Gestiona tu plataforma, cursos y usuarios
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${stat.color}/10`}>
                  <Icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-secondary' : 'text-destructive'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Enrollments */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-xl font-bold mb-6">Inscripciones Recientes</h3>
          <div className="space-y-4">
            {recentEnrollments.map((enrollment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-semibold text-primary">
                      {enrollment.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{enrollment.name}</p>
                    <p className="text-xs text-muted-foreground">{enrollment.course}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{enrollment.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-xl font-bold mb-6">Estado del Sistema</h3>
          <div className="space-y-4">
            {systemStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.status === 'operational' ? (
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500" />
                  )}
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className={`text-sm font-medium ${
                  item.status === 'operational' ? 'text-secondary' : 'text-amber-500'
                }`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Courses */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-xl font-bold mb-6">Cursos Más Populares</h3>
        <div className="space-y-4">
          {topCourses.map((course, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                  #{index + 1}
                </div>
                <div>
                  <p className="font-medium">{course.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {course.students.toLocaleString()} estudiantes
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">${course.revenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Ingresos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
