import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  CheckCircle2, 
  Lock, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  Download,
  FileText,
  MessageSquare,
  ArrowLeft,
  Volume2,
  Settings,
  Maximize,
  SkipBack,
  SkipForward
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  videoUrl?: string;
}

interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
  isOpen: boolean;
}

export function ClassRoom() {
  const { courseId, lessonId } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'discussion'>('overview');
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      title: 'Introducción al BIM',
      isOpen: true,
      lessons: [
        { id: 1, title: '¿Qué es BIM?', duration: '15:30', completed: true, locked: false },
        { id: 2, title: 'Historia y evolución del BIM', duration: '20:15', completed: true, locked: false },
        { id: 3, title: 'Beneficios del BIM en proyectos', duration: '18:45', completed: false, locked: false },
        { id: 4, title: 'Casos de éxito', duration: '22:10', completed: false, locked: false },
      ]
    },
    {
      id: 2,
      title: 'Metodologías BIM',
      isOpen: true,
      lessons: [
        { id: 5, title: 'Procesos colaborativos', duration: '25:00', completed: false, locked: false },
        { id: 6, title: 'Roles en un proyecto BIM', duration: '22:30', completed: false, locked: false },
        { id: 7, title: 'Plan de ejecución BIM (BEP)', duration: '30:15', completed: false, locked: false },
        { id: 8, title: 'Common Data Environment (CDE)', duration: '28:40', completed: false, locked: false },
      ]
    },
    {
      id: 3,
      title: 'Niveles de desarrollo (LOD)',
      isOpen: false,
      lessons: [
        { id: 9, title: 'Introducción a LOD', duration: '18:20', completed: false, locked: false },
        { id: 10, title: 'LOD 100 - 200', duration: '20:45', completed: false, locked: false },
        { id: 11, title: 'LOD 300 - 400', duration: '22:15', completed: false, locked: false },
        { id: 12, title: 'LOD 500 y Gestión de Activos', duration: '25:30', completed: false, locked: false },
      ]
    },
    {
      id: 4,
      title: 'Herramientas BIM',
      isOpen: false,
      lessons: [
        { id: 13, title: 'Revit para Arquitectura', duration: '35:00', completed: false, locked: false },
        { id: 14, title: 'Navisworks para coordinación', duration: '30:20', completed: false, locked: false },
        { id: 15, title: 'BIM 360 para colaboración', duration: '28:15', completed: false, locked: false },
      ]
    }
  ]);

  const [currentLesson, setCurrentLesson] = useState<Lesson>(sections[0].lessons[2]);

  const courseData = {
    id: parseInt(courseId || '1'),
    title: 'Fundamentos de BIM',
    instructor: 'Juan Pérez',
    progress: 25
  };

  const toggleSection = (sectionId: number) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, isOpen: !section.isOpen }
        : section
    ));
  };

  const selectLesson = (lesson: Lesson) => {
    if (!lesson.locked) {
      setCurrentLesson(lesson);
    }
  };

  const markAsCompleted = () => {
    setSections(sections.map(section => ({
      ...section,
      lessons: section.lessons.map(lesson =>
        lesson.id === currentLesson.id
          ? { ...lesson, completed: true }
          : lesson
      )
    })));
  };

  const goToNextLesson = () => {
    const allLessons = sections.flatMap(s => s.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < allLessons.length - 1 && !allLessons[currentIndex + 1].locked) {
      setCurrentLesson(allLessons[currentIndex + 1]);
      markAsCompleted();
    }
  };

  const goToPreviousLesson = () => {
    const allLessons = sections.flatMap(s => s.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(allLessons[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-[1fr_380px] min-h-[calc(100vh-4rem)]">
        {/* Main Content Area */}
        <div className="flex flex-col">
          {/* Video Player */}
          <div className="bg-black relative aspect-video lg:aspect-auto lg:h-[calc(56.25vw*0.7)] max-h-[70vh]">
            {/* Video Placeholder - In real app, use video player like react-player */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="text-center">
                <Play className="h-20 w-20 text-white/80 mx-auto mb-4" />
                <p className="text-white/60 text-sm">Video: {currentLesson.title}</p>
                <p className="text-white/40 text-xs mt-2">{currentLesson.duration}</p>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4">
                <button className="text-white hover:text-primary transition-colors">
                  <SkipBack className="h-5 w-5" />
                </button>
                <button className="text-white hover:text-primary transition-colors">
                  <Play className="h-6 w-6" />
                </button>
                <button className="text-white hover:text-primary transition-colors">
                  <SkipForward className="h-5 w-5" />
                </button>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/3"></div>
                </div>
                <span className="text-white text-sm">5:20 / 15:30</span>
                <button className="text-white hover:text-primary transition-colors">
                  <Volume2 className="h-5 w-5" />
                </button>
                <button className="text-white hover:text-primary transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <button className="text-white hover:text-primary transition-colors">
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Course Info and Tabs */}
          <div className="flex-1 p-6">
            <Link
              to={`/courses/${courseId}`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al curso
            </Link>

            <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
            <p className="text-muted-foreground mb-4">{courseData.title} · {courseData.instructor}</p>

            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <div className="flex gap-6">
                {[
                  { key: 'overview', label: 'Descripción', icon: BookOpen },
                  { key: 'notes', label: 'Notas', icon: FileText },
                  { key: 'discussion', label: 'Preguntas', icon: MessageSquare }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`pb-4 px-2 font-medium transition-colors relative flex items-center gap-2 ${
                      activeTab === key
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                    {activeTab === key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="pb-6">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    En esta lección aprenderás sobre los beneficios fundamentales que ofrece la 
                    metodología BIM en los proyectos de construcción. Exploraremos casos reales 
                    de implementación exitosa y cómo el BIM puede mejorar la eficiencia, reducir 
                    costos y optimizar los tiempos de entrega.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Recursos descargables
                    </h3>
                    <div className="space-y-2">
                      <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <FileText className="h-4 w-4" />
                        Presentación de la clase (PDF)
                      </a>
                      <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <FileText className="h-4 w-4" />
                        Plantilla de casos de estudio
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <textarea
                    className="w-full h-40 p-4 rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Escribe tus notas sobre esta lección..."
                  />
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Guardar Notas
                  </button>
                </div>
              )}

              {activeTab === 'discussion' && (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      Sé el primero en hacer una pregunta sobre esta lección
                    </p>
                  </div>
                  <button className="w-full px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors">
                    Hacer una pregunta
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <button
                onClick={goToPreviousLesson}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors flex items-center gap-2"
                disabled={sections[0].lessons[0].id === currentLesson.id}
              >
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </button>
              
              <button
                onClick={goToNextLesson}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                {currentLesson.completed ? 'Siguiente lección' : 'Marcar como completada y continuar'}
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Course Content */}
        <div className="bg-muted/30 border-l border-border overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="p-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
            <h2 className="font-semibold mb-2">Contenido del Curso</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${courseData.progress}%` }}
                />
              </div>
              <span className="font-medium">{courseData.progress}%</span>
            </div>
          </div>

          <div className="p-4">
            {sections.map((section) => (
              <div key={section.id} className="mb-2">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-sm">{section.title}</span>
                  {section.isOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {section.isOpen && (
                  <div className="mt-1 space-y-1">
                    {section.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => selectLesson(lesson)}
                        disabled={lesson.locked}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          currentLesson.id === lesson.id
                            ? 'bg-primary/10 border border-primary'
                            : 'hover:bg-muted'
                        } ${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className={`flex-shrink-0 ${
                          lesson.completed 
                            ? 'text-secondary' 
                            : lesson.locked 
                            ? 'text-muted-foreground'
                            : 'text-muted-foreground'
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : lesson.locked ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className={`text-sm ${
                            currentLesson.id === lesson.id ? 'font-medium' : ''
                          }`}>
                            {lesson.title}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {lesson.duration}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
