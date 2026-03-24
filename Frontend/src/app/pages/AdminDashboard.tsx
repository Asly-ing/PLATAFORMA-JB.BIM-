import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  MoreVertical,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  CheckCircle2,
  Clock,
  LogOut,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  students: number;
  status: 'published' | 'draft' | 'archived';
  revenue: number;
  rating: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  enrolled: number;
  joined: string;
}

export default function AdminDashboard() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'users'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

 const handleLogout = async () => {
  if (loggingOut) return
  setLoggingOut(true)
  try {
    await logout()   // el contexto ya hace fetch + setUser(null) + navigate('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  } finally {
    setLoggingOut(false)
  }
}

  const stats = [
    { label: 'Total Students', value: '12,543', change: '+12.5%', icon: Users,      color: 'orange' },
    { label: 'Active Courses', value: '48',     change: '+3',     icon: BookOpen,   color: 'green'  },
    { label: 'Revenue',        value: '$94,328', change: '+18.2%', icon: DollarSign, color: 'orange' },
    { label: 'Growth Rate',    value: '23.8%',  change: '+2.4%',  icon: TrendingUp, color: 'green'  },
  ];

  const courses: Course[] = [
    { id: '1', title: 'Complete BIM Professional Certification', students: 2543, status: 'published', revenue: 45678, rating: 4.8 },
    { id: '2', title: 'Advanced Revit Architecture',             students: 1876, status: 'published', revenue: 32450, rating: 4.9 },
    { id: '3', title: 'BIM Coordination & Clash Detection',      students: 1234, status: 'published', revenue: 18900, rating: 4.7 },
    { id: '4', title: 'Structural BIM with Revit',               students: 845,  status: 'draft',     revenue: 0,     rating: 0   },
    { id: '5', title: 'MEP Systems in BIM',                      students: 654,  status: 'published', revenue: 12340, rating: 4.6 },
  ];

  const users: User[] = [
    { id: '1', name: 'Carlos Mendoza', email: 'carlos.mendoza@email.com', role: 'student',    enrolled: 3, joined: '2025-01-15' },
    { id: '2', name: 'María García',   email: 'maria.garcia@email.com',   role: 'instructor', enrolled: 0, joined: '2024-11-20' },
    { id: '3', name: 'Juan Pérez',     email: 'juan.perez@email.com',     role: 'student',    enrolled: 5, joined: '2025-01-10' },
    { id: '4', name: 'Ana Torres',     email: 'ana.torres@email.com',     role: 'student',    enrolled: 2, joined: '2025-01-22' },
    { id: '5', name: 'Luis Ramírez',   email: 'luis.ramirez@email.com',   role: 'instructor', enrolled: 0, joined: '2024-12-05' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'draft':     return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'archived':  return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-400';
      default:          return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-400';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'instructor': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'student':    return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:           return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-400';
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-900' : 'bg-neutral-50'}`}>

      {/* ── Header ── */}
      <div className={`${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Admin Dashboard
              </h1>
              <p className={`mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Manage your platform, courses, and users
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Course
              </button>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark
                    ? 'border-neutral-600 text-neutral-300 hover:bg-red-900/20 hover:text-red-400 hover:border-red-800'
                    : 'border-neutral-300 text-neutral-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                }`}
              >
                <LogOut className={`w-4 h-4 ${loggingOut ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium">
                  {loggingOut ? 'Cerrando...' : 'Cerrar Sesión'}
                </span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'courses',  label: 'Courses'  },
              { id: 'users',    label: 'Users'    },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'courses' | 'users')}
                className={`pb-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-500'
                    : isDark
                    ? 'border-transparent text-neutral-400 hover:text-neutral-300'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-neutral-800' : 'bg-white'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color === 'orange' ? 'text-orange-500' : 'text-green-500'}`} />
                    </div>
                    <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className={`text-sm mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{stat.label}</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Enrollments */}
              <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-neutral-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Recent Enrollments
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Carlos M.', course: 'BIM Professional',  time: '2 hours ago' },
                    { name: 'María G.',  course: 'Revit Architecture', time: '5 hours ago' },
                    { name: 'Juan P.',   course: 'Clash Detection',    time: '8 hours ago' },
                    { name: 'Ana T.',    course: 'Structural BIM',     time: '1 day ago'   },
                  ].map((enrollment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <span className="text-orange-500 font-semibold">{enrollment.name[0]}</span>
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>{enrollment.name}</p>
                          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{enrollment.course}</p>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-500">{enrollment.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-neutral-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  System Status
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Video Streaming', status: 'Operational', ok: true  },
                    { label: 'Payment Gateway', status: 'Operational', ok: true  },
                    { label: 'Email Service',   status: 'Degraded',    ok: false },
                    { label: 'Database',        status: 'Operational', ok: true  },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.ok
                          ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                          : <Clock className="w-5 h-5 text-yellow-500" />
                        }
                        <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{item.label}</span>
                      </div>
                      <span className={`text-sm font-medium ${item.ok ? 'text-green-500' : 'text-yellow-500'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
                  }`}
                />
              </div>
              <button className={`px-4 py-3 rounded-lg border flex items-center gap-2 ${isDark ? 'bg-neutral-800 border-neutral-700 text-neutral-300' : 'bg-white border-neutral-300 text-neutral-700'}`}>
                Filter <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-neutral-800' : 'bg-white'}`}>
              <table className="w-full">
                <thead className={isDark ? 'bg-neutral-750' : 'bg-neutral-50'}>
                  <tr>
                    {['Course', 'Students', 'Status', 'Revenue', 'Rating', 'Actions'].map((h) => (
                      <th key={h} className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'} ${h === 'Actions' ? 'text-right' : ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {courses
                    .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((course) => (
                    <tr key={course.id} className={isDark ? 'hover:bg-neutral-700/50' : 'hover:bg-neutral-50'}>
                      <td className="px-6 py-4">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>{course.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{course.students.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>${course.revenue.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{course.rating > 0 ? course.rating : '-'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"><Eye className="w-4 h-4 text-neutral-600 dark:text-neutral-400" /></button>
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"><Edit className="w-4 h-4 text-neutral-600 dark:text-neutral-400" /></button>
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-red-500" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDark ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>

            <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-neutral-800' : 'bg-white'}`}>
              <table className="w-full">
                <thead className={isDark ? 'bg-neutral-750' : 'bg-neutral-50'}>
                  <tr>
                    {['User', 'Role', 'Enrolled Courses', 'Joined', 'Actions'].map((h) => (
                      <th key={h} className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'} ${h === 'Actions' ? 'text-right' : ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {users
                    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((user) => (
                    <tr key={user.id} className={isDark ? 'hover:bg-neutral-700/50' : 'hover:bg-neutral-50'}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <span className="text-orange-500 font-semibold">{user.name[0]}</span>
                          </div>
                          <div>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>{user.name}</p>
                            <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getRoleColor(user.role)}`}>{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{user.enrolled}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{user.joined}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"><Eye className="w-4 h-4 text-neutral-600 dark:text-neutral-400" /></button>
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"><Edit className="w-4 h-4 text-neutral-600 dark:text-neutral-400" /></button>
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"><MoreVertical className="w-4 h-4 text-neutral-600 dark:text-neutral-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}