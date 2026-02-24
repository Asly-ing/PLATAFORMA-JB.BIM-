import { useParams, Link } from 'react-router-dom';
import { Play, Clock, Users, Award, CheckCircle2, BookOpen, Star, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { PaymentModal } from '@/app/components/PaymentModal';

export function CourseDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Mock data - in real app, fetch based on id
  const course = {
    id: parseInt(id || '1'),
    title: 'Fundamentos de BIM',
    subtitle: 'Aprende los conceptos básicos de Building Information Modeling',
    instructor: 'Juan Pérez',
    instructorBio: 'Arquitecto con 15 años de experiencia en proyectos BIM',
    level: 'Principiante',
    duration: '8 horas',
    rating: 4.8,
    reviewsCount: 245,
    students: 2400,
    lessons: 24,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop',
    price: 49.99,
    description: 'Este curso te introducirá al fascinante mundo del BIM. Aprenderás los conceptos fundamentales, metodologías de trabajo y las principales herramientas utilizadas en la industria de la construcción.',
    whatYouWillLearn: [
      'Conceptos fundamentales de BIM',
      'Diferencias entre CAD y BIM',
      'Metodologías de trabajo colaborativo',
      'Niveles de desarrollo (LOD)',
      'Casos de uso prácticos',
      'Normativas y estándares BIM'
    ],
    curriculum: [
      {
        title: 'Introducción al BIM',
        lessons: [
          { title: '¿Qué es BIM?', duration: '15 min', completed: false },
          { title: 'Historia y evolución', duration: '20 min', completed: false },
          { title: 'Beneficios del BIM', duration: '18 min', completed: false }
        ]
      },
      {
        title: 'Metodologías BIM',
        lessons: [
          { title: 'Procesos colaborativos', duration: '25 min', completed: false },
          { title: 'Roles en un proyecto BIM', duration: '22 min', completed: false },
          { title: 'Plan de ejecución BIM', duration: '30 min', completed: false }
        ]
      },
      {
        title: 'Niveles de desarrollo',
        lessons: [
          { title: 'LOD 100-200', duration: '20 min', completed: false },
          { title: 'LOD 300-400', duration: '20 min', completed: false },
          { title: 'LOD 500', duration: '15 min', completed: false }
        ]
      }
    ],
    requirements: [
      'Conocimientos básicos de arquitectura o ingeniería',
      'Computadora con al menos 8GB de RAM',
      'Ganas de aprender'
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/courses"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Cursos
          </Link>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
                {course.level}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {course.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{course.instructor}</p>
                    <p className="text-muted-foreground text-xs">Instructor</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">({course.reviewsCount} reseñas)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()} estudiantes</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="rounded-xl border border-border overflow-hidden bg-card sticky top-20">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-3xl font-bold text-primary mb-4">
                    ${course.price}
                  </div>
                  <button className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors mb-3" onClick={() => setIsPaymentModalOpen(true)}>
                    Inscribirse Ahora
                  </button>
                  <p className="text-xs text-center text-muted-foreground mb-4">
                    Garantía de devolución de 30 días
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{course.duration} de contenido</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <span>{course.lessons} lecciones</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <span>Certificado de finalización</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Play className="h-5 w-5 text-muted-foreground" />
                      <span>Acceso de por vida</span>
                    </div>
                    <div className="flex items-center gap-3 text-primary">
                      <span>Recuerda que tambien tenemos planes accesibles para tu pan de estudio preferido</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Tabs */}
            <div className="border-b border-border mb-8">
              <div className="flex gap-6">
                {['overview', 'curriculum', 'instructor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 font-medium transition-colors relative ${
                      activeTab === tab
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab === 'overview' && 'Descripción'}
                    {tab === 'curriculum' && 'Contenido'}
                    {tab === 'instructor' && 'Instructor'}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Sobre este curso</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Lo que aprenderás</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Requisitos</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {course.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-4">
                {course.curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4">
                      <h3 className="font-semibold">{section.title}</h3>
                    </div>
                    <div className="divide-y divide-border">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Play className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'instructor' && (
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-semibold">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{course.instructor}</h3>
                    <p className="text-muted-foreground">{course.instructorBio}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-6 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">4.8</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">12K</div>
                    <div className="text-xs text-muted-foreground">Estudiantes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">8</div>
                    <div className="text-xs text-muted-foreground">Cursos</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        courseTitle={course.title}
        coursePrice={course.price}
        onPaymentSuccess={() => {
          // Redirect to classroom after successful payment
          window.location.href = `/classroom/${course.id}/lesson/1`;
        }}
      />
    </div>
  );
}