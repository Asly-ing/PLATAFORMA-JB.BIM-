import { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, Eye, MoreVertical, UserPlus, Mail, Download, X } from 'lucide-react';
import { adminUserService, User } from '../../../services/adminUserService';
import { courseService, Course } from '../../../services/courseService';

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Course Management Modal State
  const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userCourses, setUserCourses] = useState<{ id: number; title: string; enrolled_at: string }[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [selectedCourseIdToEnroll, setSelectedCourseIdToEnroll] = useState<string>('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await adminUserService.getAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // Pre-fetch courses for the modal
    courseService.getAllCourses().then(setAllCourses).catch(console.error);
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario? Esto eliminará también sus inscripciones y progreso.')) {
      try {
        await adminUserService.deleteUser(id);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert('Error al eliminar el usuario');
      }
    }
  };

  const handleDownloadExcel = async () => {
    try {
      await adminUserService.downloadUsersReport();
    } catch (err) {
      alert('Error descargando el reporte');
    }
  };

  const openCoursesModal = async (user: User) => {
    setSelectedUser(user);
    setIsCoursesModalOpen(true);
    try {
      const courses = await adminUserService.getUserCourses(user.id);
      setUserCourses(courses);
    } catch (err) {
      alert('Error cargando los cursos del usuario');
    }
  };

  const closeCoursesModal = () => {
    setIsCoursesModalOpen(false);
    setSelectedUser(null);
    setUserCourses([]);
    setSelectedCourseIdToEnroll('');
    fetchUsers(); // Refresh users list to update the enrolled count
  };

  const handleEnroll = async () => {
    if (!selectedUser || !selectedCourseIdToEnroll) return;
    try {
      await adminUserService.enrollUser(selectedUser.id, parseInt(selectedCourseIdToEnroll));
      const updatedCourses = await adminUserService.getUserCourses(selectedUser.id);
      setUserCourses(updatedCourses);
      setSelectedCourseIdToEnroll('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al inscribir usuario');
    }
  };

  const handleUnenroll = async (courseId: number) => {
    if (!selectedUser) return;
    if (window.confirm('¿Remover estudiante de este curso?')) {
      try {
        await adminUserService.unenrollUser(selectedUser.id, courseId);
        setUserCourses(userCourses.filter(c => c.id !== courseId));
      } catch (err) {
        alert('Error al remover usuario del curso');
      }
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Admin
          </span>
        );
      case 'instructor':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
            Instructor
          </span>
        );
      case 'student':
      case 'user':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            Estudiante
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            Estudiante
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
        Activo
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
        Inactivo
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || user.role === filterRole || (user.role === 'user' && filterRole === 'student');
    return matchesSearch && matchesFilter;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xl text-muted-foreground animate-pulse">Cargando usuarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xl text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra todos los usuarios de la plataforma
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadExcel}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-card-foreground font-medium hover:bg-muted transition-colors"
          >
            <Download className="h-5 w-5" />
            Reporte
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            <UserPlus className="h-5 w-5" />
            Nuevo Usuario
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1">{users.length}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1 text-accent">
            {users.filter(u => u.role === 'student' || u.role === 'user').length}
          </div>
          <div className="text-sm text-muted-foreground">Estudiantes</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1 text-secondary">
            {users.filter(u => u.role === 'instructor').length}
          </div>
          <div className="text-sm text-muted-foreground">Instructores</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1 text-primary">
            {users.filter(u => u.role === 'admin').length}
          </div>
          <div className="text-sm text-muted-foreground">Admins</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1 text-secondary">
            {users.filter(u => u.status === 'active').length}
          </div>
          <div className="text-sm text-muted-foreground">Activos</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar usuarios por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Todos los roles</option>
            <option value="student">Estudiantes</option>
            <option value="instructor">Instructores</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Usuario</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Rol</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Cursos</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Fecha de Registro</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Última Actividad</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-semibold text-primary">
                          {getInitials(user.name)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm">
                      {user.role === 'student' || user.role === 'user' ? `${user.enrolled} cursos` : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{user.joined}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openCoursesModal(user)}
                        title="Gestionar Cursos"
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Mail className="h-4 w-4 text-muted-foreground hover:text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-muted-foreground hover:text-primary" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        title="Eliminar Usuario"
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No se encontraron usuarios</p>
          </div>
        )}
      </div>

      {/* Courses Modal */}
      {isCoursesModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold">Cursos de {selectedUser.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              </div>
              <button 
                onClick={closeCoursesModal}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Enroll new course */}
              <div className="flex gap-4 mb-8">
                <select 
                  value={selectedCourseIdToEnroll}
                  onChange={(e) => setSelectedCourseIdToEnroll(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Seleccionar curso para inscribir...</option>
                  {allCourses
                    .filter(c => !userCourses.find(uc => uc.id === c.id))
                    .map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
                <button 
                  onClick={handleEnroll}
                  disabled={!selectedCourseIdToEnroll}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Inscribir
                </button>
              </div>

              {/* Enrolled courses list */}
              <h4 className="font-semibold mb-4">Cursos Actuales ({userCourses.length})</h4>
              {userCourses.length > 0 ? (
                <div className="space-y-3">
                  {userCourses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Inscrito el: {new Date(course.enrolled_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleUnenroll(course.id)}
                        className="p-2 hover:bg-background rounded-lg transition-colors text-destructive"
                        title="Remover del curso"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  El usuario no está inscrito en ningún curso.
                </p>
              )}
            </div>
            
            <div className="p-6 border-t border-border flex justify-end">
              <button 
                onClick={closeCoursesModal}
                className="px-4 py-2 rounded-lg border border-border bg-background font-medium hover:bg-muted"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
