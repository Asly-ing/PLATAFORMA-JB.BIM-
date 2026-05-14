import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { courseService, Course } from '../../services/courseService';

export function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedCourses, fetchedCategories] = await Promise.all([
          courseService.getAllCourses(),
          courseService.getCategories()
        ]);
        setCourses(fetchedCourses);
        setCategories(fetchedCategories);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los cursos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const getLevelName = (level: string) => {
    const names: Record<string, string> = {
      'beginner': 'Principiante',
      'intermediate': 'Intermedio',
      'advanced': 'Avanzado',
      'all': 'Todos los niveles'
    };
    return names[level] || level;
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return '0 h';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return `${hours} horas`;
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (course.instructor_name && course.instructor_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || course.category_id?.toString() === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-xl text-muted-foreground animate-pulse">Cargando cursos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-xl text-destructive">{error}</div>
      </div>
    );
  }

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
                    {getLevelName(level)}
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
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
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
                  src={course.image_url || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop'}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                  {getLevelName(course.level)}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs text-primary mb-2 font-medium">
                  {course.category_name || 'Sin Categoría'}
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {course.instructor_name || 'Instructor'}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {/* Mocking lessons count since backend list doesn't provide it */}
                    <span>{course.sections?.reduce((acc, section) => acc + (section.lessons?.length || 0), 0) || 0} lecciones</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(course.duration_minutes)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>4.8</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {/* Mocking students count */}
                    <span>1,200</span>
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
