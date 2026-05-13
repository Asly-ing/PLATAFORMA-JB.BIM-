import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, CheckCircle, BookOpen, Edit, Video } from 'lucide-react';

export function AdminCoursePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/admin/courses/preview/${id}`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
          setCourse(data.course);
        } else {
          alert('No se pudo cargar la vista previa');
          navigate('/admin/courses');
        }
      } catch (err) {
        console.error('Error:', err);
        navigate('/admin/courses');
      } finally {
        setLoading(false);
      }
    };
    fetchPreview();
  }, [id, navigate]);

  if (loading) return <div className="p-8 text-center">Cargando vista previa...</div>;
  if (!course) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Banner de Admin */}
      <div className="bg-primary text-primary-foreground py-3 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/courses')} className="hover:bg-primary-foreground/10 p-2 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="font-semibold">Modo Vista Previa (Administrador)</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate(`/admin/courses/edit/${course.id}`)} className="flex items-center gap-2 bg-primary-foreground text-primary px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-white transition-colors">
            <Edit className="h-4 w-4" />
            Editar Curso
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header del Curso */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <span>{course.category}</span>
              <span>•</span>
              <span>{course.level === 'beginner' ? 'Principiante' : course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {course.title}
            </h1>

            <p className="text-xl text-muted-foreground">
              {course.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-muted-foreground">({course.students} estudiantes)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-5 w-5" />
                <span>{course.lessons} lecciones</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>Creado por <span className="font-medium text-foreground">{course.instructor}</span></span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Precio (Floating Sidebar) */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-6 shadow-xl sticky top-24">
              <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-muted">
                {course.image ? (
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Sin imagen (Cloudinary)
                  </div>
                )}
              </div>

              <div className="mb-6">
                {course.discountPrice > 0 ? (
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold">$\{course.discountPrice.toLocaleString()} COP</span>
                    <span className="text-lg text-muted-foreground line-through">$\{course.price.toLocaleString()}</span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold">
                    {course.price > 0 ? `$${course.price.toLocaleString()} COP` : 'Gratis'}
                  </span>
                )}
              </div>

              <button className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg mb-4 hover:bg-primary/90 transition-all opacity-80 cursor-not-allowed">
                Inscribirse ahora (Vista Previa)
              </button>

              <div className="text-sm text-center text-muted-foreground">
                Garantía de devolución de 30 días
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Detallado */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">

            {/* Descripción */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Acerca de este curso</h2>
              <div className="prose max-w-none text-muted-foreground whitespace-pre-wrap">
                {course.description || 'Sin descripción detallada.'}
              </div>
            </section>

            {/* Objetivos */}
            {course.objectives && course.objectives.length > 0 && course.objectives[0] !== '' && (
              <section className="bg-muted/30 p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold mb-6">Lo que aprenderás</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.objectives.map((obj: string, i: number) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{obj}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Requisitos */}
            {course.requirements && course.requirements.length > 0 && course.requirements[0] !== '' && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Requisitos</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {course.requirements.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Módulos */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Contenido del curso</h2>
              <div className="space-y-4">
                {course.modules && course.modules.map((mod: any, index: number) => (
                  <div key={mod.id} className="border border-border rounded-xl overflow-hidden bg-card">
                    <div className="p-4 bg-muted/30 flex justify-between items-center">
                      <h3 className="font-bold">Módulo {index + 1}: {mod.title}</h3>
                      <span className="text-sm text-muted-foreground">{mod.lessons?.length || 0} lecciones</span>
                    </div>
                    {mod.lessons && mod.lessons.length > 0 && (
                      <div className="divide-y divide-border">
                        {mod.lessons.map((lesson: any) => (
                          <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                            <div className="flex items-center gap-3">
                              <Video className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">{lesson.title}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCoursePreview;
