import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Fundamentos de BIM',
      category: 'BIM Básico',
      instructor: 'Juan Pérez',
      level: 'Principiante',
      duration: '8 horas',
      rating: 4.8,
      students: 2400,
      lessons: 24,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Revit Arquitectónico Avanzado',
      category: 'Revit',
      instructor: 'María García',
      level: 'Avanzado',
      duration: '12 horas',
      rating: 4.9,
      students: 1800,
      lessons: 36,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Coordinación BIM con Navisworks',
      category: 'Coordinación',
      instructor: 'Carlos Rodríguez',
      level: 'Intermedio',
      duration: '10 horas',
      rating: 4.7,
      students: 1500,
      lessons: 28,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'BIM Manager: Gestión de Proyectos',
      category: 'Gestión',
      instructor: 'Ana Martínez',
      level: 'Avanzado',
      duration: '15 horas',
      rating: 4.9,
      students: 1200,
      lessons: 42,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'Revit MEP: Instalaciones',
      category: 'Revit',
      instructor: 'Luis Fernández',
      level: 'Intermedio',
      duration: '10 horas',
      rating: 4.6,
      students: 980,
      lessons: 30,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Dynamo para Revit',
      category: 'Programación',
      instructor: 'Patricia Sánchez',
      level: 'Avanzado',
      duration: '14 horas',
      rating: 4.8,
      students: 850,
      lessons: 38,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop'
    }
  ];

  const categories = ['all', 'BIM Básico', 'Revit', 'Coordinación', 'Gestión', 'Programación'];
  const levels = ['all', 'Principiante', 'Intermedio', 'Avanzado'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Catálogo de Cursos</h1>
          <p className="text-lg text-muted-foreground">
            Explora nuestra colección completa de cursos especializados en BIM
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'Todos los niveles' : level}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredCourses.length} {filteredCourses.length === 1 ? 'curso' : 'cursos'}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="group rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all bg-card"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                  {course.level}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs text-primary mb-2 font-medium">
                  {course.category}
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {course.instructor}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons} lecciones</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron cursos con los filtros seleccionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
