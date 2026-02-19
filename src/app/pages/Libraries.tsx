import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Crown, 
  Lock, 
  CheckCircle2, 
  Download, 
  Layers, 
  Palette, 
  Box, 
  FolderOpen,
  Star,
  ArrowRight,
  Eye,
  Sparkles,
  X,
  ZoomIn
} from 'lucide-react';

export function Libraries() {
  const [selectedLibrary, setSelectedLibrary] = useState<number | null>(null);
  
  // Gallery images for each library
  const libraryGalleries: Record<number, Array<{ url: string; title: string; description: string }>> = {
    1: [ // Biblioteca de Materiales
      {
        url: 'https://images.unsplash.com/photo-1769888913286-b5cd5cbf8dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwdGV4dHVyZSUyMG1hdGVyaWFsfGVufDF8fHx8MTc3MTM4MjI4OHww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Maderas Naturales',
        description: 'Colección de texturas de madera con vetas naturales'
      },
      {
        url: 'https://images.unsplash.com/photo-1770208741295-f0d2145f1b03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMHRleHR1cmUlMjBzdXJmYWNlfGVufDF8fHx8MTc3MTQ2NjY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Concreto y Hormigón',
        description: 'Materiales estructurales con diferentes acabados'
      },
      {
        url: 'https://images.unsplash.com/photo-1658825959612-8f4bce484393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHN0ZWxlJTIwdGV4dHVyZXxlbnwxfHx8fDE3NzE0NjY2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Metales y Aceros',
        description: 'Superficies metálicas para estructuras industriales'
      },
      {
        url: 'https://images.unsplash.com/photo-1495578942200-c5f5d2137def?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmljayUyMHdhbGwlMjB0ZXh0dXJlfGVufDF8fHx8MTc3MTQ2NjY5MXww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Mampostería',
        description: 'Ladrillos y bloques de construcción'
      },
      {
        url: 'https://images.unsplash.com/photo-1668533677422-1e759410847f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBzdG9uZSUyMHRleHR1cmV8ZW58MXx8fHwxNzcxNDU2NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Piedras Naturales',
        description: 'Mármol, granito y piedras decorativas'
      },
      {
        url: 'https://images.unsplash.com/photo-1638940191758-3789c3bf6ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGZhY2FkZSUyMG1vZGVybnxlbnwxfHx8fDE3NzE0NjY2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Vidrios y Cristales',
        description: 'Materiales transparentes y translúcidos'
      }
    ],
    2: [ // Biblioteca de Apariencias
      {
        url: 'https://images.unsplash.com/photo-1761824197923-283b689fe7aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwbWF0ZXJpYWxzJTIwbGlicmFyeXxlbnwxfHx8fDE3NzE0NjYyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Acabados Arquitectónicos',
        description: 'Texturas fotorrealistas para renderizado'
      },
      {
        url: 'https://images.unsplash.com/photo-1666541908174-31270a26d8a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwdGV4dHVyZXMlMjBtYXRlcmlhbHN8ZW58MXx8fHwxNzcxNDY2MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Superficies Texturizadas',
        description: 'Variedad de acabados y patrones'
      },
      {
        url: 'https://images.unsplash.com/photo-1769888913286-b5cd5cbf8dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwdGV4dHVyZSUyMG1hdGVyaWFsfGVufDF8fHx8MTc3MTM4MjI4OHww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Maderas Decorativas',
        description: 'Acabados de madera para interiores'
      },
      {
        url: 'https://images.unsplash.com/photo-1668533677422-1e759410847f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBzdG9uZSUyMHRleHR1cmV8ZW58MXx8fHwxNzcxNDU2NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Piedras Pulidas',
        description: 'Mármoles y granitos con brillo'
      }
    ],
    3: [ // Componentes Arquitectónicos
      {
        url: 'https://images.unsplash.com/photo-1554181179-dc027f96ac9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZG9vciUyMHdpbmRvd3xlbnwxfHx8fDE3NzE0NjY2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Puertas y Ventanas',
        description: 'Familias parametrizables de carpintería'
      },
      {
        url: 'https://images.unsplash.com/photo-1638940191758-3789c3bf6ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGZhY2FkZSUyMG1vZGVybnxlbnwxfHx8fDE3NzE0NjY2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Fachadas y Muros Cortina',
        description: 'Sistemas de envolvente arquitectónica'
      },
      {
        url: 'https://images.unsplash.com/photo-1769695832202-0f10d9d21f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGNvbXBvbmVudHMlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcxNDY2MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Elementos Prefabricados',
        description: 'Componentes modulares de construcción'
      },
      {
        url: 'https://images.unsplash.com/photo-1495578942200-c5f5d2137def?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmljayUyMHdhbGwlMjB0ZXh0dXJlfGVufDF8fHx8MTc3MTQ2NjY5MXww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Muros y Divisiones',
        description: 'Sistemas de particiones interiores'
      }
    ],
    4: [ // Componentes Estructurales
      {
        url: 'https://images.unsplash.com/photo-1720572782505-423b226a406b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMHN0cnVjdHVyZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MTQ2NjY5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Estructuras Metálicas',
        description: 'Perfiles y conexiones de acero'
      },
      {
        url: 'https://images.unsplash.com/photo-1770208741295-f0d2145f1b03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMHRleHR1cmUlMjBzdXJmYWNlfGVufDF8fHx8MTc3MTQ2NjY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Elementos de Concreto',
        description: 'Vigas, columnas y losas'
      },
      {
        url: 'https://images.unsplash.com/photo-1763076470404-23554ef26747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBzYW1wbGVzfGVufDF8fHx8MTc3MTQ2NjI2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Cimentaciones',
        description: 'Zapatas, pilotes y muros de contención'
      },
      {
        url: 'https://images.unsplash.com/photo-1658825959612-8f4bce484393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHN0ZWxlJTIwdGV4dHVyZXxlbnwxfHx8fDE3NzE0NjY2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Refuerzos y Armaduras',
        description: 'Sistemas de refuerzo estructural'
      }
    ],
    5: [ // Componentes MEP
      {
        url: 'https://images.unsplash.com/photo-1769339604732-59dfc1f4d01e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIVkFDJTIwbWVjaGFuaWNhbCUyMHN5c3RlbXN8ZW58MXx8fHwxNzcxNDY2NjkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Sistemas HVAC',
        description: 'Equipos de climatización y ventilación'
      },
      {
        url: 'https://images.unsplash.com/photo-1738918937796-743064feefa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwcGFuZWxzJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NzE0NjY2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Sistemas Eléctricos',
        description: 'Tableros, luminarias y equipos eléctricos'
      },
      {
        url: 'https://images.unsplash.com/photo-1611236544238-2d272eff2cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHBpcGVzJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc3MTQ2NjY5NHww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Sistemas Sanitarios',
        description: 'Tuberías y accesorios de plomería'
      },
      {
        url: 'https://images.unsplash.com/photo-1744627049760-f22f045992fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXZpdCUyMGFyY2hpdGVjdHVyYWwlMjBkZXNpZ258ZW58MXx8fHwxNzcxNDY2MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Equipos de Instalaciones',
        description: 'Bombas, válvulas y accesorios MEP'
      }
    ],
    6: [ // Plantillas de Proyecto
      {
        url: 'https://images.unsplash.com/photo-1721244654210-a505a99661e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZmxvb3IlMjBwbGFufGVufDF8fHx8MTc3MTQzMzY5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Plantillas Arquitectónicas',
        description: 'Configuraciones estándar para proyectos arquitectónicos'
      },
      {
        url: 'https://images.unsplash.com/photo-1744627049760-f22f045992fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXZpdCUyMGFyY2hpdGVjdHVyYWwlMjBkZXNpZ258ZW58MXx8fHwxNzcxNDY2MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Plantillas Estructurales',
        description: 'Configuraciones para proyectos de ingeniería estructural'
      },
      {
        url: 'https://images.unsplash.com/photo-1769339604732-59dfc1f4d01e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIVkFDJTIwbWVjaGFuaWNhbCUyMHN5c3RlbXN8ZW58MXx8fHwxNzcxNDY2NjkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Plantillas MEP',
        description: 'Configuraciones para proyectos de instalaciones'
      },
      {
        url: 'https://images.unsplash.com/photo-1666541908174-31270a26d8a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwdGV4dHVyZXMlMjBtYXRlcmlhbHN8ZW58MXx8fHwxNzcxNDY2MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Plantillas BIM Corporativas',
        description: 'Estándares empresariales personalizados'
      }
    ]
  };

  const libraries = [
    {
      id: 1,
      title: 'Biblioteca de Materiales',
      description: 'Colección completa de materiales de construcción con propiedades físicas y visuales para Revit',
      items: '2,500+ materiales',
      category: 'Materiales',
      image: 'https://images.unsplash.com/photo-1666541908174-31270a26d8a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwdGV4dHVyZXMlMjBtYXRlcmlhbHN8ZW58MXx8fHwxNzcxNDY2MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Layers,
      isPremium: true
    },
    {
      id: 2,
      title: 'Biblioteca de Apariencias',
      description: 'Texturas fotorrealistas y acabados para renderizado de alta calidad en proyectos BIM',
      items: '1,800+ apariencias',
      category: 'Apariencias',
      image: 'https://images.unsplash.com/photo-1761824197923-283b689fe7aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwbWF0ZXJpYWxzJTIwbGlicmFyeXxlbnwxfHx8fDE3NzE0NjYyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Palette,
      isPremium: true
    },
    {
      id: 3,
      title: 'Componentes Arquitectónicos',
      description: 'Familias y elementos arquitectónicos parametrizables para diseño eficiente',
      items: '3,200+ componentes',
      category: 'Componentes',
      image: 'https://images.unsplash.com/photo-1769695832202-0f10d9d21f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGNvbXBvbmVudHMlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcxNDY2MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Box,
      isPremium: true
    },
    {
      id: 4,
      title: 'Componentes Estructurales',
      description: 'Elementos estructurales certificados para análisis y diseño en Revit Structure',
      items: '1,500+ elementos',
      category: 'Componentes',
      image: 'https://images.unsplash.com/photo-1763076470404-23554ef26747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBzYW1wbGVzfGVufDF8fHx8MTc3MTQ2NjI2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Layers,
      isPremium: true
    },
    {
      id: 5,
      title: 'Componentes MEP',
      description: 'Equipos y sistemas MEP parametrizables para proyectos de instalaciones',
      items: '2,100+ componentes',
      category: 'Componentes',
      image: 'https://images.unsplash.com/photo-1744627049760-f22f045992fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXZpdCUyMGFyY2hpdGVjdHVyYWwlMjBkZXNpZ258ZW58MXx8fHwxNzcxNDY2MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Box,
      isPremium: true
    },
    {
      id: 6,
      title: 'Plantillas de Proyecto',
      description: 'Plantillas predefinidas con estándares BIM y configuraciones optimizadas',
      items: '50+ plantillas',
      category: 'Plantillas',
      image: 'https://images.unsplash.com/photo-1666541908174-31270a26d8a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwdGV4dHVyZXMlMjBtYXRlcmlhbHN8ZW58MXx8fHwxNzcxNDY2MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: FolderOpen,
      isPremium: true
    }
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: 'Recursos Compartidos',
      description: 'Bibliotecas instaladas y sincronizadas con Autodesk Inventor y Revit'
    },
    {
      icon: Sparkles,
      title: 'Gestión Centralizada',
      description: 'Administra y personaliza todos tus recursos desde un solo lugar'
    },
    {
      icon: Download,
      title: 'Reutilización Eficiente',
      description: 'Acelera tus proyectos reutilizando elementos predefinidos'
    },
    {
      icon: Lock,
      title: 'Bibliotecas Protegidas',
      description: 'Incluye bibliotecas de solo lectura y personalizables según tus necesidades'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-10 md:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Crown className="h-5 w-5" />
              <span className="text-sm font-semibold">Contenido Premium</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bibliotecas BIM{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Autodesk
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Accede a una colección completa de materiales, apariencias y componentes 
              profesionales para Autodesk Inventor y Revit. Recursos compartidos que te 
              permiten gestionar, personalizar y reutilizar elementos en tus diseños.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Ver Planes Premium
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Libraries Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explora Nuestras Bibliotecas
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Colecciones especializadas de recursos BIM para acelerar tu flujo de trabajo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {libraries.map((library) => {
              const Icon = library.icon;
              return (
                <div
                  key={library.id}
                  className="group rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all bg-card relative"
                >
                  {/* Premium Badge */}
                  {library.isPremium && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      Premium
                    </div>
                  )}

                  {/* Image */}
                  <div 
                    className="relative overflow-hidden h-48 cursor-pointer"
                    onClick={() => setSelectedLibrary(library.id)}
                  >
                    <img
                      src={library.image}
                      alt={library.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Zoom Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary">
                        <ZoomIn className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className="px-3 py-1 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm">
                        <span className="text-xs font-medium text-neutral-900 dark:text-white">
                          {library.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {library.title}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <FolderOpen className="h-3 w-3" />
                          {library.items}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {library.description}
                    </p>

                    {/* Locked State */}
                    <button
                      disabled
                      className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border bg-muted/50 text-muted-foreground cursor-not-allowed"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Requiere Suscripción Premium
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent p-12 md:p-16 text-center text-white">
            <Crown className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Desbloquea Todas las Bibliotecas
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Suscríbete a un plan Premium y obtén acceso ilimitado a todas nuestras 
              bibliotecas BIM de Autodesk, incluyendo materiales, apariencias y componentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                Ver Planes y Precios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Explorar Cursos
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>+10,000 recursos disponibles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Compatible con Revit e Inventor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Actualizaciones mensuales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedLibrary && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedLibrary(null)}
        >
          <div 
            className="relative bg-card rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-2xl font-bold">
                  {libraries.find(lib => lib.id === selectedLibrary)?.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Vista previa de la biblioteca - Contenido Premium
                </p>
              </div>
              <button
                onClick={() => setSelectedLibrary(null)}
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {libraryGalleries[selectedLibrary]?.map((item, index) => (
                  <div 
                    key={index}
                    className="group rounded-xl border border-border overflow-hidden bg-muted/30 hover:border-primary/50 transition-all"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium CTA */}
              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center">
                <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-bold mb-2">Acceso Premium Requerido</h4>
                <p className="text-muted-foreground mb-4">
                  Suscríbete para desbloquear y descargar todos estos recursos en tu proyecto
                </p>
                <Link
                  to="/#pricing"
                  onClick={() => setSelectedLibrary(null)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Ver Planes Premium
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}