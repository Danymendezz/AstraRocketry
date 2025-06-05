
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Rocket, 
  Star, 
  Zap,
  Target,
  Trophy,
  BookOpen,
  Search,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos', icon: BookOpen },
    { id: 'missions', name: 'Misiones', icon: Rocket },
    { id: 'technology', name: 'Tecnología', icon: Zap },
    { id: 'competitions', name: 'Competencias', icon: Trophy },
    { id: 'education', name: 'Educación', icon: Star }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Misión Exitosa: Lanzamiento del Cohete Astra-1',
      category: 'missions',
      excerpt: 'Reporte completo de nuestra primera misión exitosa con el cohete Astra-1, alcanzando una altitud récord de 3.2 km.',
      content: 'El pasado 15 de marzo, el equipo de Astra Rocketry logró un hito histórico con el lanzamiento exitoso del cohete Astra-1...',
      author: 'Dr. María González',
      date: '2024-03-20',
      readTime: '8 min',
      image: 'Rocket launch with bright flames and smoke trail against blue sky',
      tags: ['Lanzamiento', 'Récord', 'Astra-1'],
      featured: true
    },
    {
      id: 2,
      title: 'Innovación en Sistemas de Propulsión Híbrida',
      category: 'technology',
      excerpt: 'Desarrollo de un nuevo sistema de propulsión híbrida que promete revolucionar la cohetería estudiantil.',
      content: 'Nuestro equipo de ingeniería ha desarrollado un innovador sistema de propulsión híbrida que combina...',
      author: 'Ing. Carlos Rodríguez',
      date: '2024-03-15',
      readTime: '12 min',
      image: 'Advanced rocket engine with hybrid propulsion system in laboratory setting',
      tags: ['Propulsión', 'Innovación', 'Híbrido'],
      featured: false
    },
    {
      id: 3,
      title: 'Campeones Nacionales 2023: Nuestra Victoria',
      category: 'competitions',
      excerpt: 'Crónica de nuestra participación victoriosa en el Campeonato Nacional de Cohetería Universitaria 2023.',
      content: 'El equipo Astra Rocketry se alzó con el primer lugar en el Campeonato Nacional de Cohetería...',
      author: 'Ana Martínez',
      date: '2024-03-10',
      readTime: '6 min',
      image: 'University team celebrating with trophy and medals at rocketry competition',
      tags: ['Competencia', 'Victoria', 'Nacional'],
      featured: true
    },
    {
      id: 4,
      title: 'Taller de Cohetería para Estudiantes de Secundaria',
      category: 'education',
      excerpt: 'Programa educativo que acerca la cohetería a estudiantes de secundaria mediante talleres prácticos.',
      content: 'Como parte de nuestro compromiso con la educación, hemos desarrollado un programa especial...',
      author: 'Prof. Luis Herrera',
      date: '2024-03-05',
      readTime: '5 min',
      image: 'High school students building model rockets in educational workshop',
      tags: ['Educación', 'Taller', 'Estudiantes'],
      featured: false
    },
    {
      id: 5,
      title: 'Análisis Aerodinámico: Optimización de Aletas',
      category: 'technology',
      excerpt: 'Estudio detallado sobre la optimización aerodinámica de aletas para mejorar la estabilidad del vuelo.',
      content: 'La aerodinámica es fundamental en el diseño de cohetes. Nuestro último estudio se enfoca...',
      author: 'Ing. Patricia Silva',
      date: '2024-02-28',
      readTime: '10 min',
      image: 'Computer simulation showing aerodynamic analysis of rocket fins and airflow',
      tags: ['Aerodinámica', 'Simulación', 'Aletas'],
      featured: false
    },
    {
      id: 6,
      title: 'Preparándose para el Mundial de Cohetería 2024',
      category: 'competitions',
      excerpt: 'Estrategias y preparativos para nuestra participación en el Campeonato Mundial de Cohetería Universitaria.',
      content: 'El equipo se prepara intensivamente para representar a Colombia en el Mundial de Cohetería...',
      author: 'Dr. Roberto Vega',
      date: '2024-02-20',
      readTime: '7 min',
      image: 'International rocketry competition with teams from different countries',
      tags: ['Mundial', 'Preparación', 'Colombia'],
      featured: true
    },
    {
      id: 7,
      title: 'Sistemas de Recuperación: Paracaídas Inteligentes',
      category: 'technology',
      excerpt: 'Desarrollo de sistemas de recuperación con paracaídas inteligentes para proteger la carga útil.',
      content: 'La recuperación segura de la carga útil es crucial en cualquier misión. Hemos desarrollado...',
      author: 'Ing. Sandra López',
      date: '2024-02-15',
      readTime: '9 min',
      image: 'Smart parachute recovery system deploying from rocket in mid-air',
      tags: ['Recuperación', 'Paracaídas', 'Seguridad'],
      featured: false
    },
    {
      id: 8,
      title: 'Misión Lunar Simulada: Proyecto Artemis Estudiantil',
      category: 'missions',
      excerpt: 'Simulación completa de una misión lunar como parte del proyecto educativo Artemis Estudiantil.',
      content: 'En colaboración con otras universidades, hemos desarrollado una simulación completa...',
      author: 'Dr. Fernando Castro',
      date: '2024-02-10',
      readTime: '15 min',
      image: 'Students conducting lunar mission simulation with realistic moon surface setup',
      tags: ['Lunar', 'Simulación', 'Artemis'],
      featured: true
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 parallax-stars"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6 text-white neon-text">
              INFORMES DE MISIÓN
            </h1>
            <p className="text-xl font-rajdhani text-gray-300 max-w-3xl mx-auto">
              Descubre nuestras últimas misiones, avances tecnológicos y logros 
              en el fascinante mundo de la cohetería universitaria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                placeholder="Buscar informes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-rajdhani font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-orbitron font-bold text-white mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              MISIONES DESTACADAS
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.article
                  key={post.id}
                  className="mission-card rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img  
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      alt={`${post.title} - Featured mission report`}
                     src="https://images.unsplash.com/photo-1577510409458-a70f1efcba3d" />
                    
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-rajdhani font-semibold">
                      DESTACADO
                    </div>

                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-rajdhani">
                      {categories.find(c => c.id === post.category)?.name}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-rajdhani font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 font-montserrat mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-rajdhani"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Button className="rocket-button bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                      Leer Informe
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-orbitron font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ARCHIVO DE MISIONES
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="space-panel rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img  
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    alt={`${post.title} - Mission report`}
                   src="https://images.unsplash.com/photo-1606498679340-0aec3185edbd" />
                  
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-rajdhani">
                    {categories.find(c => c.id === post.category)?.name}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-rajdhani font-bold text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 font-montserrat text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author.split(' ')[0]}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs font-rajdhani"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Leer Más
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Rocket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-rajdhani font-bold text-gray-400 mb-2">
                No se encontraron informes
              </h3>
              <p className="text-gray-500 font-montserrat">
                Intenta con otros términos de búsqueda o categorías
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center space-panel p-8 rounded-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Rocket className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-orbitron font-bold text-white mb-4">
              SUSCRÍBETE A NUESTROS INFORMES
            </h2>
            <p className="text-gray-300 font-rajdhani mb-6">
              Recibe las últimas noticias de nuestras misiones directamente en tu email
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                placeholder="astronauta@email.com"
              />
              <Button className="rocket-button bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3">
                Suscribirse
                <Star className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <p className="text-xs text-gray-500 font-montserrat mt-4">
              No spam, solo contenido espacial de calidad
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
