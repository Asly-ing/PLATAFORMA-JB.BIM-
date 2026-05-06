import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Upload, X, Video, FileText, GripVertical } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration: string;
  videoUrl?: string;
  content?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export function AdminCreateCourse() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    instructor: '',
    category: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    description: '',
    price: '',
    thumbnail: '',
    duration: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
  });

  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: '',
      description: '',
      lessons: [],
    },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    'BIM Management',
    'Revit',
    'BIM Coordination',
    'MEP',
    'Automatización',
    'Estructural',
    'Arquitectura',
    'Construcción',
  ];

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: '',
      description: '',
      lessons: [],
    };
    setModules([...modules, newModule]);
  };

  const removeModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const updateModule = (moduleId: string, field: string, value: string) => {
    setModules(modules.map(m =>
      m.id === moduleId ? { ...m, [field]: value } : m
    ));
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: '',
      type: 'video',
      duration: '',
    };
    setModules(modules.map(m =>
      m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m
    ));
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) }
        : m
    ));
  };

  const updateLesson = (moduleId: string, lessonId: string, field: string, value: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? {
            ...m,
            lessons: m.lessons.map(l =>
              l.id === lessonId ? { ...l, [field]: value } : l
            ),
          }
        : m
    ));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Curso creado:', { courseData, modules, selectedCategories });
    navigate('/admin/courses');
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalVideos = modules.reduce(
    (acc, m) => acc + m.lessons.filter(l => l.type === 'video').length,
    0
  );

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/courses')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Crear Nuevo Curso</h1>
          <p className="text-muted-foreground">
            Complete la información del curso y su contenido
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información General */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-2xl font-bold mb-6">Información General</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Título del Curso *
              </label>
              <input
                type="text"
                required
                value={courseData.title}
                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                placeholder="Ej: Certificación Profesional BIM Completa"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Instructor *</label>
              <input
                type="text"
                required
                value={courseData.instructor}
                onChange={(e) => setCourseData({ ...courseData, instructor: e.target.value })}
                placeholder="Nombre del instructor"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Categoría Principal *</label>
              <select
                required
                value={courseData.category}
                onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estado del Curso *</label>
              <select
                value={courseData.status}
                onChange={(e) => setCourseData({ ...courseData, status: e.target.value as any })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="archived">Archivado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nivel</label>
              <select
                value={courseData.level}
                onChange={(e) => setCourseData({ ...courseData, level: e.target.value as any })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Precio (COP)</label>
              <input
                type="number"
                value={courseData.price}
                onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duración Total</label>
              <input
                type="text"
                value={courseData.duration}
                onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                placeholder="Ej: 24 horas"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Imagen de Portada (URL)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={courseData.thumbnail}
                  onChange={(e) => setCourseData({ ...courseData, thumbnail: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  className="px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <Upload className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <textarea
                value={courseData.description}
                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                rows={4}
                placeholder="Descripción detallada del curso..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>
        </div>

        {/* Categorías Adicionales */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-2xl font-bold mb-4">Categorías Adicionales</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Selecciona todas las categorías que apliquen a este curso
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedCategories.includes(category)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Módulos y Lecciones */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Módulos y Contenido</h2>
              <p className="text-sm text-muted-foreground">
                {modules.length} módulos · {totalLessons} lecciones · {totalVideos} videos
              </p>
            </div>
            <button
              type="button"
              onClick={addModule}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Agregar Módulo
            </button>
          </div>

          <div className="space-y-6">
            {modules.map((module, moduleIndex) => (
              <div key={module.id} className="rounded-lg border border-border bg-background p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="mt-3 cursor-move">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Módulo {moduleIndex + 1}
                      </span>
                      {modules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeModule(module.id)}
                          className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                      placeholder="Título del módulo"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    <textarea
                      value={module.description}
                      onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                      rows={2}
                      placeholder="Descripción del módulo"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />

                    {/* Lecciones del Módulo */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Lecciones ({module.lessons.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => addLesson(module.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-muted transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                          Agregar Lección
                        </button>
                      </div>

                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card/50"
                        >
                          <div className="mt-2">
                            {lesson.type === 'video' ? (
                              <Video className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground">
                                Lección {lessonIndex + 1}
                              </span>
                              <select
                                value={lesson.type}
                                onChange={(e) =>
                                  updateLesson(module.id, lesson.id, 'type', e.target.value)
                                }
                                className="text-xs px-2 py-1 rounded border border-border bg-background"
                              >
                                <option value="video">Video</option>
                                <option value="text">Texto</option>
                                <option value="quiz">Quiz</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => removeLesson(module.id, lesson.id)}
                                className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) =>
                                  updateLesson(module.id, lesson.id, 'title', e.target.value)
                                }
                                placeholder="Título de la lección"
                                className="col-span-2 px-3 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                              />

                              {lesson.type === 'video' && (
                                <input
                                  type="text"
                                  value={lesson.videoUrl || ''}
                                  onChange={(e) =>
                                    updateLesson(module.id, lesson.id, 'videoUrl', e.target.value)
                                  }
                                  placeholder="URL del video"
                                  className="px-3 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              )}

                              <input
                                type="text"
                                value={lesson.duration}
                                onChange={(e) =>
                                  updateLesson(module.id, lesson.id, 'duration', e.target.value)
                                }
                                placeholder="Duración (ej: 15:30)"
                                className="px-3 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {module.lessons.length === 0 && (
                        <div className="p-4 text-center text-sm text-muted-foreground border border-dashed border-border rounded-lg">
                          No hay lecciones. Haz clic en "Agregar Lección" para comenzar.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-end gap-4 pb-8">
          <button
            type="button"
            onClick={() => navigate('/admin/courses')}
            className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Crear Curso
          </button>
        </div>
      </form>
    </div>
  );
}