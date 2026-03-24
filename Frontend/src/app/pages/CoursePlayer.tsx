import { useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { 
  ChevronDown, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Lock,
  FileText,
  Download,
  Menu,
  X,
  Clock,
  BookOpen
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  expanded: boolean;
}

export default function CoursePlayer() {
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLesson, setCurrentLesson] = useState('1-1');
  const [activeTab, setActiveTab] = useState('overview');
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Introduction to BIM',
      expanded: true,
      lessons: [
        { id: '1-1', title: 'What is BIM?', duration: '12:45', completed: true, locked: false },
        { id: '1-2', title: 'BIM Standards and Protocols', duration: '18:30', completed: true, locked: false },
        { id: '1-3', title: 'Industry Applications', duration: '15:20', completed: false, locked: false },
        { id: '1-4', title: 'Software Overview', duration: '22:10', completed: false, locked: false },
      ],
    },
    {
      id: '2',
      title: 'Getting Started with Revit',
      expanded: false,
      lessons: [
        { id: '2-1', title: 'Interface Navigation', duration: '16:40', completed: false, locked: false },
        { id: '2-2', title: 'Basic Drawing Tools', duration: '25:15', completed: false, locked: false },
        { id: '2-3', title: 'Project Setup', duration: '19:30', completed: false, locked: false },
        { id: '2-4', title: 'Working with Views', duration: '21:45', completed: false, locked: false },
      ],
    },
    {
      id: '3',
      title: 'Advanced Modeling Techniques',
      expanded: false,
      lessons: [
        { id: '3-1', title: 'Complex Geometries', duration: '28:20', completed: false, locked: true },
        { id: '3-2', title: 'Family Creation', duration: '32:10', completed: false, locked: true },
        { id: '3-3', title: 'Parametric Design', duration: '26:50', completed: false, locked: true },
      ],
    },
  ]);

  const toggleModule = (moduleId: string) => {
    setModules(modules.map(m => 
      m.id === moduleId ? { ...m, expanded: !m.expanded } : m
    ));
  };

  const currentLessonData = modules
    .flatMap(m => m.lessons)
    .find(l => l.id === currentLesson);

  const courseProgress = Math.round(
    (modules.flatMap(m => m.lessons).filter(l => l.completed).length /
      modules.flatMap(m => m.lessons).length) *
      100
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Course Navigation */}
        <aside
          className={`${
            sidebarOpen ? 'w-80' : 'w-0'
          } transition-all duration-300 overflow-hidden ${
            isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
          } border-r flex-shrink-0`}
        >
          <div className="h-full flex flex-col">
            {/* Course Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Complete BIM Professional Certification
              </h2>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${courseProgress}%` }}
                  />
                </div>
                <span className={`text-sm font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {courseProgress}%
                </span>
              </div>
              <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                2 of 11 lessons completed
              </p>
            </div>

            {/* Module List */}
            <div className="flex-1 overflow-y-auto">
              {modules.map((module) => (
                <div key={module.id} className="border-b border-neutral-200 dark:border-neutral-700">
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className={`w-full p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {module.expanded ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                      <span className="font-medium text-left">{module.title}</span>
                    </div>
                    <span className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {module.lessons.filter(l => l.completed).length}/{module.lessons.length}
                    </span>
                  </button>

                  {/* Lessons */}
                  {module.expanded && (
                    <div className={isDark ? 'bg-neutral-750' : 'bg-neutral-50'}>
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => !lesson.locked && setCurrentLesson(lesson.id)}
                          disabled={lesson.locked}
                          className={`w-full p-4 pl-12 flex items-center gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors ${
                            currentLesson === lesson.id
                              ? 'bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500'
                              : ''
                          } ${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : lesson.locked ? (
                            <Lock className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                          ) : (
                            <Play className={`w-5 h-5 flex-shrink-0 ${
                              currentLesson === lesson.id ? 'text-orange-500' : 'text-neutral-400'
                            }`} />
                          )}
                          <div className="flex-1 text-left">
                            <p className={`text-sm font-medium ${
                              currentLesson === lesson.id
                                ? 'text-orange-500'
                                : isDark
                                ? 'text-neutral-300'
                                : 'text-neutral-700'
                            }`}>
                              {lesson.title}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                              {lesson.duration}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Video Player */}
          <div className={isDark ? 'bg-black' : 'bg-neutral-900'}>
            {/* Toggle Sidebar Button */}
            <div className="absolute top-4 left-4 z-10">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Video Player Area */}
            <div className="relative aspect-video w-full flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200"
                alt="Video"
                className="w-full h-full object-cover"
              />
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="bg-orange-500 hover:bg-orange-600 rounded-full p-6 transition-all group-hover:scale-110">
                  <Play className="w-12 h-12 text-white fill-current" />
                </div>
              </button>
            </div>

            {/* Video Controls (simplified) */}
            <div className="px-6 py-3 flex items-center gap-4 bg-neutral-900">
              <button className="text-white hover:text-orange-500 transition-colors">
                <Play className="w-5 h-5" />
              </button>
              <div className="flex-1 bg-neutral-700 h-1 rounded-full">
                <div className="bg-orange-500 h-1 rounded-full" style={{ width: '30%' }} />
              </div>
              <span className="text-white text-sm">03:45 / 12:45</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-6">
              {/* Lesson Title */}
              <div className="mb-6">
                <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {currentLessonData?.title}
                </h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className={`flex items-center gap-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <Clock className="w-4 h-4" />
                    <span>{currentLessonData?.duration}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <BookOpen className="w-4 h-4" />
                    <span>Module 1</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-neutral-200 dark:border-neutral-700 mb-6">
                <div className="flex gap-6">
                  {['overview', 'resources', 'notes'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 border-b-2 transition-colors capitalize ${
                        activeTab === tab
                          ? 'border-orange-500 text-orange-500'
                          : isDark
                          ? 'border-transparent text-neutral-400 hover:text-neutral-300'
                          : 'border-transparent text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      About This Lesson
                    </h3>
                    <p className={`leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      In this lesson, you'll learn the fundamental concepts of Building Information Modeling (BIM) 
                      and understand why it has become the industry standard for modern construction projects. 
                      We'll explore the evolution from traditional CAD systems to intelligent 3D modeling, 
                      and discuss how BIM facilitates better collaboration among project stakeholders.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      What You'll Learn
                    </h3>
                    <ul className={`space-y-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>The definition and core principles of BIM methodology</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Key differences between BIM and traditional CAD approaches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Benefits of implementing BIM in construction projects</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Real-world applications across different project phases</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className={`w-8 h-8 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                        <div>
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                            Lesson Slides
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            PDF • 2.4 MB
                          </p>
                        </div>
                      </div>
                      <button className="text-orange-500 hover:text-orange-600 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className={`w-8 h-8 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                        <div>
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                            BIM Standards Guide
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            PDF • 1.8 MB
                          </p>
                        </div>
                      </div>
                      <button className="text-orange-500 hover:text-orange-600 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className={`w-8 h-8 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                        <div>
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                            Exercise Files
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            ZIP • 15.2 MB
                          </p>
                        </div>
                      </div>
                      <button className="text-orange-500 hover:text-orange-600 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div>
                  <div className={`p-6 rounded-lg border ${
                    isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
                  }`}>
                    <textarea
                      placeholder="Take notes about this lesson..."
                      rows={10}
                      className={`w-full px-4 py-3 rounded-lg border resize-none ${
                        isDark
                          ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-500'
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                    <div className="mt-4 flex justify-end">
                      <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                        Save Notes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <button className={`px-6 py-2 rounded-lg border ${
                  isDark
                    ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800'
                    : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                } transition-colors`}>
                  ← Previous Lesson
                </button>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  Next Lesson →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
