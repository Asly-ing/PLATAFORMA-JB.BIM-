import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, Eye, Filter, Loader2, BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  students: number;
  status: 'published' | 'draft' | 'archived';
  revenue: number;
  rating: number;
  category: string;
  thumbnail?: string;
  level: string;
  price: number;
  createdAt: string;
}

export function AdminCourses() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar cursos desde el backend
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('http://localhost:3000/api/admin/courses', {
        credentials: 'include'
      });

      if (res.status === 401) {
        setError('No autorizado. Inicia sesión como administrador.');
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const data = await res.json();
      console.log('Cursos recibidos:', data);
      setCourses(data.courses || []);
    } catch (err: any) {
      console.error('Error cargando cursos:', err);
      setError('Error al cargar los cursos');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('¿Estás seguro de eliminar este curso?')) return;

    try {
      const res = await fetch(`http://localhost:3000/api/admin/courses/${courseId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (res.ok) {
        setCourses(courses.filter(c => c.id !== courseId));
        alert('Curso eliminado correctamente');
      } else {
        alert('Error al eliminar el curso');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    }
  };

  const handleStatusChange = async (courseId: string, newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/courses/${courseId}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setCourses(courses.map(c =>
          c.id === courseId ? { ...c, status: newStatus as Course['status'] } : c
        ));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Publicado
          </span>
        );
      case 'draft':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            Borrador
          </span>
        );
      case 'archived':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            Archivado
          </span>
        );
      default:
        return null;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <span className="text-xs text-blue-600">Principiante</span>;
      case 'intermediate':
        return <span className="text-xs text-amber-600">Intermedio</span>;
      case 'advanced':
        return <span className="text-xs text-red-600">Avanzado</span>;
      default:
        return null;
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // ==================== ESTADO: CARGANDO ====================
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando cursos...</p>
        </div>
      </div>
    );
  }

  // ==================== ESTADO: ERROR ====================
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchCourses}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // ==================== VISTA PRINCIPAL ====================
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nuevo Curso
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="text-3xl font-bold mb-1">{courses.length}</div>
          <div className="text-sm text-muted-foreground">Total de Cursos</div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="text-3xl font-bold mb-1 text-green-600">
            {courses.filter(c => c.status === 'published').length}
          </div>
          <div className="text-sm text-muted-foreground">Publicados</div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="text-3xl font-bold mb-1 text-amber-600">
            {courses.filter(c => c.status === 'draft').length}
          </div>
          <div className="text-sm text-muted-foreground">Borradores</div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="text-3xl font-bold mb-1">
            {courses.reduce((acc, c) => acc + (c.students || 0), 0).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Estudiantes</div>
        </div>
      </div>

      {/* Búsqueda y Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

      {/* Tabla de Cursos */}
      {filteredCourses.length > 0 ? (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Curso</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Instructor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nivel</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Estudiantes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Precio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                    {/* Título con thumbnail */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {course.thumbnail ? (
                          <img
                            src={`http://localhost:3000${course.thumbnail}`}
                            alt={course.title}
                            className="h-10 w-16 rounded object-cover"
                          />
                        ) : (
                          <div className="h-10 w-16 rounded bg-muted flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <p className="font-medium max-w-xs truncate">{course.title}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {course.instructor}
                    </td>

                    <td className="px-6 py-4">
                      {getLevelBadge(course.level)}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {(course.students || 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={course.status}
                        onChange={(e) => handleStatusChange(course.id, e.target.value)}
                        className="text-xs px-2 py-1 rounded border border-border bg-background cursor-pointer"
                      >
                        <option value="draft">Borrador</option>
                        <option value="published">Publicado</option>
                        <option value="archived">Archivado</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-sm font-medium">
                      ${(course.price || 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span className="text-sm">
                          {course.rating > 0 ? course.rating.toFixed(1) : '-'}
                        </span>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/courses/${course.id}`)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Ver curso"
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Estado vacío */
        <div className="rounded-xl border border-border bg-card p-16 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No hay cursos</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || filterStatus !== 'all'
              ? 'No se encontraron cursos con esos filtros'
              : 'Comienza creando tu primer curso'}
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button
              onClick={() => navigate('/admin/courses/create')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
            >
              <Plus className="h-5 w-5" />
              Crear Primer Curso
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminCourses;