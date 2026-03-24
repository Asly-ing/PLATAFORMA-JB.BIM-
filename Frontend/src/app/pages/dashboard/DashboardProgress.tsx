import { TrendingUp, Award, Target, Calendar, BarChart3 } from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';

export function DashboardProgress() {
  const learningStats = [
    { label: 'Días de racha', value: '30', icon: Calendar, color: 'primary' },
    { label: 'Horas totales', value: '42', icon: TrendingUp, color: 'secondary' },
    { label: 'Lecciones completadas', value: '85', icon: Target, color: 'accent' },
    { label: 'Logros desbloqueados', value: '12', icon: Award, color: 'amber-500' },
  ];

  const progressByCategory = [
    { name: 'Revit Arquitectura', progress: 75, hours: 18 },
    { name: 'BIM Management', progress: 60, hours: 12 },
    { name: 'Navisworks', progress: 40, hours: 8 },
    { name: 'Dynamo', progress: 25, hours: 4 },
  ];

  const weeklyActivity = [
    { day: 'Lun', hours: 2 },
    { day: 'Mar', hours: 3 },
    { day: 'Mié', hours: 1.5 },
    { day: 'Jue', hours: 2.5 },
    { day: 'Vie', hours: 3 },
    { day: 'Sáb', hours: 1 },
    { day: 'Dom', hours: 0.5 },
  ];

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Mi Progreso</h1>
        <p className="text-muted-foreground">
          Visualiza tu evolución y estadísticas de aprendizaje
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {learningStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-6 rounded-xl border border-border bg-card">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${stat.color}/10 mb-3`}>
                <Icon className={`h-5 w-5 text-${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Progress by Category */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Progreso por Categoría</h2>
          </div>
          <div className="space-y-6">
            {progressByCategory.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{category.hours}h</span>
                    <span className="font-medium">{category.progress}%</span>
                  </div>
                </div>
                <Progress value={category.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Actividad Semanal</h2>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-full">
                  <div
                    className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                    style={{ height: `${(day.hours / maxHours) * 100}%`, minHeight: day.hours > 0 ? '8px' : '0' }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">{day.day}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Total: {weeklyActivity.reduce((acc, d) => acc + d.hours, 0)}h esta semana
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 mb-6">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Objetivos del Mes</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span>Completar 3 cursos</span>
                <span className="font-medium">2/3</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span>20 horas de estudio</span>
                <span className="font-medium">15/20</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span>Mantener racha de 30 días</span>
                <span className="font-medium">30/30 ✓</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}