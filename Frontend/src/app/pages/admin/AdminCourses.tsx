import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, Eye, ChevronDown, Filter } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  students: number;
  status: 'published' | 'draft' | 'archived';
  revenue: number;
  rating: number;
  category: string;
}

export function AdminCourses() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Certificación Profesional BIM Completa',
      instructor: 'María García',
      students: 2543,
      status: 'published',
      revenue: 45678,
      rating: 4.8,
      category: 'BIM Management',
    },
    {
      id: '2',
      title: 'Revit Arquitectónico Avanzado',
      instructor: 'Carlos Rodríguez',
      students: 1876,
      status: 'published',
      revenue: 32450,
      rating: 4.9,
      category: 'Revit',
    },
    {
      id: '3',
      title: 'Coordinación BIM con Navisworks',
      instructor: 'Juan Pérez',
      students: 1234,
      status: 'published',
      revenue: 18900,
      rating: 4.7,
      category: 'BIM Coordination',
    },
    {
      id: '4',
      title: 'BIM Estructural con Revit',
      instructor: 'Ana Torres',
      students: 845,
      status: 'draft',
      revenue: 0,
      rating: 0,
      category: 'Revit',
    },
    {
      id: '5',
      title: 'Sistemas MEP en BIM',
      instructor: 'Luis Fernández',
      students: 654,
      status: 'published',
      revenue: 12340,
      rating: 4.6,
      category: 'MEP',
    },
    {
      id: '6',
      title: 'Dynamo para Revit',
      instructor: 'Patricia Sánchez',
      students: 432,
      status: 'published',
      revenue: 8900,
      rating: 4.5,
      category: 'Automatización',
    },
    {
      id: '7',
      title: 'Gestión de Proyectos BIM',
      instructor: 'Roberto Díaz',
      students: 234,
      status: 'draft',
      revenue: 0,
      rating: 0,
      category: 'BIM Management',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
            Publicado
          </span>
        );
      case 'draft':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500">
            Borrador
          </span>
        );
      case 'archived':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            Archivado
          </span>
        );
      default:
        return null;
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Gestión de Cursos</h1>
          <p className="text-muted-foreground">
            Administra todos los cursos de la plataforma
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/courses/create')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nuevo Curso
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1">{courses.length}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1 text-secondary">
            {courses.filter(c => c.status === 'published').length}
          </div>
          <div className="text-sm text-muted-foreground">Publicados</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1 text-amber-500">
            {courses.filter(c => c.status === 'draft').length}
          </div>
          <div className="text-sm text-muted-foreground">Borradores</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1">
            {courses.reduce((acc, c) => acc + c.students, 0).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Estudiantes</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar cursos por título o instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Todos los estados</option>
            <option value="published">Publicados</option>
            <option value="draft">Borradores</option>
            <option value="archived">Archivados</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Curso</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Instructor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Categoría</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Estudiantes</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Ingresos</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium max-w-xs truncate">{course.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs bg-muted">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{course.students.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(course.status)}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium">
                      ${course.revenue.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      <span className="text-sm">
                        {course.rating > 0 ? course.rating.toFixed(1) : '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCourses.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No se encontraron cursos</p>
          </div>
        )}
      </div>
    </div>
  );
}
