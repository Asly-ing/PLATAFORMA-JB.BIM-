import { useState } from 'react';
import { Search, Filter, Edit, Trash2, Eye, MoreVertical, UserPlus, Mail } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  enrolled: number;
  joined: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const users: User[] = [
    {
      id: '1',
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@email.com',
      role: 'student',
      enrolled: 3,
      joined: '15 Ene 2026',
      status: 'active',
      lastActive: 'Hace 2 horas',
    },
    {
      id: '2',
      name: 'María García',
      email: 'maria.garcia@email.com',
      role: 'instructor',
      enrolled: 0,
      joined: '20 Nov 2025',
      status: 'active',
      lastActive: 'Hace 1 día',
    },
    {
      id: '3',
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      role: 'student',
      enrolled: 5,
      joined: '10 Ene 2026',
      status: 'active',
      lastActive: 'Hace 3 horas',
    },
    {
      id: '4',
      name: 'Ana Torres',
      email: 'ana.torres@email.com',
      role: 'student',
      enrolled: 2,
      joined: '22 Ene 2026',
      status: 'active',
      lastActive: 'Hace 5 horas',
    },
    {
      id: '5',
      name: 'Luis Ramírez',
      email: 'luis.ramirez@email.com',
      role: 'instructor',
      enrolled: 0,
      joined: '5 Dic 2025',
      status: 'active',
      lastActive: 'Hace 2 días',
    },
    {
      id: '6',
      name: 'Patricia Sánchez',
      email: 'patricia.sanchez@email.com',
      role: 'instructor',
      enrolled: 0,
      joined: '8 Dic 2025',
      status: 'active',
      lastActive: 'Hace 6 horas',
    },
    {
      id: '7',
      name: 'Roberto Díaz',
      email: 'roberto.diaz@email.com',
      role: 'student',
      enrolled: 4,
      joined: '3 Ene 2026',
      status: 'inactive',
      lastActive: 'Hace 2 semanas',
    },
    {
      id: '8',
      name: 'Sofia Martínez',
      email: 'sofia.martinez@email.com',
      role: 'admin',
      enrolled: 0,
      joined: '1 Nov 2025',
      status: 'active',
      lastActive: 'Hace 30 min',
    },
  ];

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
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            Estudiante
          </span>
        );
      default:
        return null;
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
    const matchesFilter = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra todos los usuarios de la plataforma
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          <UserPlus className="h-5 w-5" />
          Nuevo Usuario
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1">{users.length}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-2xl font-bold mb-1 text-accent">
            {users.filter(u => u.role === 'student').length}
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
                      {user.role === 'student' ? `${user.enrolled} cursos` : '-'}
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
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
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
    </div>
  );
}
