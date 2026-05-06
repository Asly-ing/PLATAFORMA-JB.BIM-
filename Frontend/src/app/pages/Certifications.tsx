import { useState } from 'react';
import { Search, Award, Download, Share2, Calendar, User, BookOpen, CheckCircle } from 'lucide-react';

interface Certification {
  id: string;
  studentName: string;
  studentId: string;
  courseName: string;
  issueDate: string;
  certificateNumber: string;
  instructorName: string;
  duration: string;
  grade: string;
  status: 'active' | 'expired';
}

export function Certifications() {
  const [searchId, setSearchId] = useState('');
  const [searchResults, setSearchResults] = useState<Certification[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock data - En producción, esto vendría de la API
  const mockCertifications: Certification[] = [
    {
      id: '1',
      studentName: 'Juan Carlos Pérez',
      studentId: '1234567890',
      courseName: 'Certificación Profesional BIM Completa',
      issueDate: '2026-03-15',
      certificateNumber: 'JPBIM-2026-001234',
      instructorName: 'María García',
      duration: '120 horas',
      grade: '95%',
      status: 'active',
    },
    {
      id: '2',
      studentName: 'Juan Carlos Pérez',
      studentId: '1234567890',
      courseName: 'Revit Arquitectónico Avanzado',
      issueDate: '2025-11-20',
      certificateNumber: 'JPBIM-2025-009876',
      instructorName: 'Carlos Rodríguez',
      duration: '80 horas',
      grade: '92%',
      status: 'active',
    },
    {
      id: '3',
      studentName: 'María Fernanda López',
      studentId: '9876543210',
      courseName: 'BIM Estructural con Revit',
      issueDate: '2026-01-10',
      certificateNumber: 'JPBIM-2026-000567',
      instructorName: 'Ana Torres',
      duration: '60 horas',
      grade: '88%',
      status: 'active',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(true);

    // Simular búsqueda
    setTimeout(() => {
      const results = mockCertifications.filter(
        cert => cert.studentId === searchId
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-6">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Verificación de Certificaciones
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Busca y verifica certificaciones oficiales de JP.BIM usando el número de cédula del estudiante
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="rounded-2xl border border-border bg-card p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">
                  Número de Cédula o Identificación
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Ingresa el número de cédula"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ingresa el número de identificación sin puntos ni comas
                </p>
              </div>

              <button
                type="submit"
                disabled={isSearching || !searchId}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isSearching ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Buscar Certificaciones
                  </>
                )}
              </button>
            </form>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Verificación Oficial</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Certificados validados
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Download className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Descarga Digital</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF de alta calidad
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Compartir</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Publica tu logro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div className="max-w-4xl mx-auto">
            {searchResults.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Certificaciones Encontradas</h2>
                    <p className="text-muted-foreground mt-1">
                      {searchResults.length} certificación{searchResults.length !== 1 ? 'es' : ''} para{' '}
                      {searchResults[0].studentName}
                    </p>
                  </div>
                </div>

                {searchResults.map((cert) => (
                  <div
                    key={cert.id}
                    className="rounded-2xl border-2 border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
                  >
                    <div className="p-6 md:p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">{cert.courseName}</h3>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                                <CheckCircle className="h-3 w-3" />
                                Certificado Activo
                              </span>
                              <span className="text-sm text-muted-foreground">
                                #{cert.certificateNumber}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6 p-6 rounded-xl bg-muted/30">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Estudiante</p>
                            <p className="font-medium">{cert.studentName}</p>
                            <p className="text-sm text-muted-foreground">CC: {cert.studentId}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Instructor</p>
                            <p className="font-medium">{cert.instructorName}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Fecha de Emisión</p>
                            <p className="font-medium">{formatDate(cert.issueDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Duración y Calificación</p>
                            <p className="font-medium">
                              {cert.duration} · Nota: {cert.grade}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                          <Download className="h-4 w-4" />
                          Descargar Certificado
                        </button>
                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors">
                          <Share2 className="h-4 w-4" />
                          Compartir
                        </button>
                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No se encontraron certificaciones</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  No hay certificaciones asociadas al número de identificación{' '}
                  <span className="font-medium">{searchId}</span>
                </p>
                <button
                  onClick={() => {
                    setSearchId('');
                    setHasSearched(false);
                    setSearchResults([]);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Nueva Búsqueda
                </button>
              </div>
            )}
          </div>
        )}

        {/* Information Section */}
        {!hasSearched && (
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold mb-6">Información sobre Certificaciones</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Certificaciones Oficiales
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Todas nuestras certificaciones son oficiales y están registradas en nuestra base de datos.
                    Cada certificado incluye un número único de verificación.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    Validez Internacional
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Los certificados de JP.BIM son reconocidos internacionalmente y cumplen con los
                    estándares de la industria BIM y construcción.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-accent" />
                    Descarga Digital
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Los certificados están disponibles en formato PDF de alta calidad, listos para
                    imprimir o compartir en plataformas profesionales.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-primary" />
                    Comparte tu Logro
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Publica tus certificaciones en LinkedIn, tu CV o portfolio profesional para
                    destacar tus competencias en BIM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
