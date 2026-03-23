import { useState } from 'react';
import { Search, MessageSquare, ThumbsUp, Tag, Send, TrendingUp, Clock, Users } from 'lucide-react';

export function Community() {
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tags = [
    { id: 'all', label: 'Todos', count: 248 },
    { id: 'bim', label: 'BIM', count: 85 },
    { id: 'revit', label: 'Revit', count: 67 },
    { id: 'navisworks', label: 'Navisworks', count: 34 },
    { id: 'coordinacion', label: 'Coordinación', count: 42 },
    { id: 'arquitectura', label: 'Arquitectura', count: 56 }
  ];

  const posts = [
    {
      id: 1,
      author: 'María González',
      authorInitials: 'MG',
      role: 'BIM Manager',
      timestamp: 'hace 2 horas',
      title: '¿Mejores prácticas para nombrar familias en Revit?',
      content: 'Estoy trabajando en un proyecto grande y necesito establecer un sistema de nomenclatura consistente para las familias. ¿Qué convenciones usan en sus proyectos?',
      tags: ['revit', 'arquitectura'],
      likes: 24,
      comments: 8,
      isLiked: false,
      replies: [
        {
          author: 'Carlos Pérez',
          authorInitials: 'CP',
          role: 'Arquitecto BIM',
          timestamp: 'hace 1 hora',
          content: 'Yo uso el formato: Categoría_Tipo_Material_Dimensiones. Por ejemplo: MUR_BLOCK_CONCRETO_200x400x600. Funciona muy bien para filtros.',
          likes: 12
        },
        {
          author: 'Ana Martínez',
          authorInitials: 'AM',
          role: 'Coordinadora BIM',
          timestamp: 'hace 45 min',
          content: 'Excelente pregunta. Nosotros seguimos la norma ISO 19650 para nomenclatura. Te recomiendo revisar ese estándar.',
          likes: 8
        }
      ]
    },
    {
      id: 2,
      author: 'Juan Rodríguez',
      authorInitials: 'JR',
      role: 'Ingeniero Civil',
      timestamp: 'hace 5 horas',
      title: 'Problemas con detección de interferencias en Navisworks',
      content: 'He estado detectando interferencias entre estructuras y MEP. ¿Alguien tiene tips para organizar mejor los resultados?',
      tags: ['navisworks', 'coordinacion'],
      likes: 18,
      comments: 5,
      isLiked: true,
      replies: [
        {
          author: 'Patricia Silva',
          authorInitials: 'PS',
          role: 'BIM Coordinator',
          timestamp: 'hace 3 horas',
          content: 'Usa los conjuntos de búsqueda para agrupar interferencias por disciplina. También puedes crear vistas guardadas para cada tipo de clash.',
          likes: 10
        }
      ]
    },
    {
      id: 3,
      author: 'Laura Fernández',
      authorInitials: 'LF',
      role: 'Arquitecta',
      timestamp: 'hace 1 día',
      title: 'Recursos para aprender Dynamo desde cero',
      content: '¿Qué recursos recomiendan para empezar con Dynamo? Tengo conocimientos básicos de programación.',
      tags: ['revit', 'bim'],
      likes: 32,
      comments: 12,
      isLiked: false,
      replies: [
        {
          author: 'Diego Torres',
          authorInitials: 'DT',
          role: 'Desarrollador BIM',
          timestamp: 'hace 18 horas',
          content: 'El curso de Dynamo en JP.BIM es excelente para principiantes. También recomiendo el Dynamo Primer (es gratis).',
          likes: 15
        },
        {
          author: 'Sofía Ramírez',
          authorInitials: 'SR',
          role: 'BIM Specialist',
          timestamp: 'hace 12 horas',
          content: 'Suma a eso: practica con scripts simples primero. Empieza automatizando tareas repetitivas de tu día a día.',
          likes: 9
        }
      ]
    }
  ];

  const trendingTopics = [
    { topic: 'Nuevas funcionalidades Revit 2025', posts: 45 },
    { topic: 'Implementación BIM en PyMEs', posts: 38 },
    { topic: 'LOD 500 vs As-Built', posts: 32 }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Comunidad JP.BIM</h1>
          <p className="text-lg text-muted-foreground">
            Conecta, aprende y comparte con profesionales de BIM
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar discusiones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedTag(tag.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTag === tag.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {tag.label} ({tag.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="rounded-xl border border-border bg-card p-6">
                  {/* Post Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-semibold flex-shrink-0">
                      {post.authorInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">{post.author}</span>
                        <span>•</span>
                        <span>{post.role}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-muted-foreground mb-4">{post.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 text-sm border-t border-border pt-4">
                    <button
                      className={`flex items-center gap-2 ${
                        post.isLiked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      } transition-colors`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments} respuestas</span>
                    </button>
                  </div>

                  {/* Replies */}
                  {post.replies && post.replies.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border space-y-4">
                      {post.replies.map((reply, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent text-white text-sm font-semibold flex-shrink-0">
                            {reply.authorInitials}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{reply.author}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{reply.role}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{reply.content}</p>
                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Reply Input */}
                      <div className="flex gap-3 pt-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted flex-shrink-0">
                          TU
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Escribe tu respuesta..."
                            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Create Post */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-4">Nueva Discusión</h3>
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Crear Publicación
                </button>
              </div>

              {/* Stats */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-4">Estadísticas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Miembros activos</span>
                    </div>
                    <span className="font-semibold">2,457</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>Discusiones</span>
                    </div>
                    <span className="font-semibold">248</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>Esta semana</span>
                    </div>
                    <span className="font-semibold text-secondary">+32</span>
                  </div>
                </div>
              </div>

              {/* Trending Topics */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-4">Temas Populares</h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary text-xs font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{topic.topic}</p>
                        <p className="text-xs text-muted-foreground">{topic.posts} publicaciones</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
