
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Eye, 
  Award, 
  Rocket, 
  Zap, 
  Globe, 
  BookOpen,
  Star,
  Trophy,
  Calendar,
  MapPin
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Elena Vásquez",
      role: "Directora Técnica",
      specialty: "Propulsión Avanzada",
      avatar: "👩‍🚀"
    },
    {
      name: "Carlos Mendoza",
      role: "Jefe de Proyectos",
      specialty: "Sistemas de Control",
      avatar: "👨‍🚀"
    },
    {
      name: "Ana Rodríguez",
      role: "Especialista en Aerodinámica",
      specialty: "Diseño Estructural",
      avatar: "👩‍🚀"
    },
    {
      name: "Miguel Torres",
      role: "Ingeniero de Telemetría",
      specialty: "Comunicaciones",
      avatar: "👨‍🚀"
    },
    {
      name: "Sofia López",
      role: "Coordinadora de Seguridad",
      specialty: "Protocolos de Lanzamiento",
      avatar: "👩‍🚀"
    },
    {
      name: "David Chen",
      role: "Desarrollador de Software",
      specialty: "Sistemas Embebidos",
      avatar: "👨‍🚀"
    }
  ];

  const achievements = [
    {
      year: "2023",
      title: "Campeones Nacionales",
      description: "Primer lugar en la Competencia Nacional de Cohetería Universitaria",
      icon: Trophy,
      color: "text-yellow-500"
    },
    {
      year: "2022",
      title: "Récord de Altitud",
      description: "Alcanzamos 2,847 metros con nuestro cohete Astra-VII",
      icon: Target,
      color: "text-blue-500"
    },
    {
      year: "2021",
      title: "Innovación Técnica",
      description: "Premio a la mejor innovación en sistemas de recuperación",
      icon: Zap,
      color: "text-green-500"
    },
    {
      year: "2020",
      title: "Fundación del Club",
      description: "Inicio oficial de Astra Rocketry en la universidad",
      icon: Rocket,
      color: "text-red-500"
    }
  ];

  const missionValues = [
    {
      icon: Target,
      title: "Misión",
      description: "Impulsar la educación en ciencias aeroespaciales a través del diseño, construcción y lanzamiento de cohetes experimentales, fomentando la innovación y el trabajo en equipo entre estudiantes universitarios."
    },
    {
      icon: Eye,
      title: "Visión",
      description: "Ser el club de cohetería universitaria líder en América Latina, reconocido por nuestras contribuciones a la investigación aeroespacial y por formar la próxima generación de ingenieros espaciales."
    },
    {
      icon: Star,
      title: "Valores",
      description: "Excelencia técnica, trabajo en equipo, innovación constante, seguridad primero, y pasión por la exploración espacial. Creemos en el poder de la educación práctica y la experimentación."
    }
  ];

  const galleryImages = [
    {
      title: "Lanzamiento Astra-VII",
      description: "Nuestro cohete más exitoso alcanzando récord de altitud"
    },
    {
      title: "Taller de Construcción",
      description: "Estudiantes trabajando en el laboratorio de cohetería"
    },
    {
      title: "Competencia Nacional",
      description: "Equipo celebrando la victoria en el campeonato 2023"
    },
    {
      title: "Pruebas de Motor",
      description: "Ensayos de propulsión en campo de pruebas"
    },
    {
      title: "Ceremonia de Premios",
      description: "Recibiendo el trofeo de campeones nacionales"
    },
    {
      title: "Diseño CAD",
      description: "Proceso de diseño digital de nuevos prototipos"
    }
  ];

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
              SOBRE NOSOTROS
            </h1>
            <p className="text-xl font-rajdhani text-gray-300 max-w-3xl mx-auto">
              Conoce al equipo que está llevando la cohetería universitaria hacia nuevas fronteras
            </p>
          </motion.div>

          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img  
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl glow-red"
              alt="Astra Rocketry team group photo in engineering suits"
             src="https://images.unsplash.com/photo-1686488594144-65fb516275e1" />
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {missionValues.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="mission-card p-8 rounded-lg text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-20 h-20 bg-red-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-rajdhani font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-montserrat leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-white">
              NUESTRO EQUIPO
            </h2>
            <p className="text-xl font-rajdhani text-gray-300">
              Los astronautas que hacen posible cada misión
            </p>
            <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="space-panel p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="astronaut-avatar w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-rajdhani font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-red-500 font-montserrat font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-gray-400 font-montserrat text-sm">
                  {member.specialty}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="py-20 bg-gradient-to-b from-gray-900/30 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-white">
              LOGROS DESTACADOS
            </h2>
            <p className="text-xl font-rajdhani text-gray-300">
              Nuestra trayectoria hacia las estrellas
            </p>
            <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-500/30 hidden md:block"></div>

            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={achievement.year}
                  className={`relative flex items-center mb-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center z-10 hidden md:flex">
                    <Icon className={`w-6 h-6 ${achievement.color}`} />
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="mission-card p-6 rounded-lg">
                      <div className="flex items-center mb-4 md:hidden">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-4">
                          <Icon className={`w-5 h-5 ${achievement.color}`} />
                        </div>
                        <span className="text-2xl font-orbitron font-bold text-red-500">
                          {achievement.year}
                        </span>
                      </div>
                      <span className="text-2xl font-orbitron font-bold text-red-500 hidden md:block mb-4">
                        {achievement.year}
                      </span>
                      <h3 className="text-xl font-rajdhani font-bold text-white mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-400 font-montserrat">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-white">
              GALERÍA DE MISIONES
            </h2>
            <p className="text-xl font-rajdhani text-gray-300">
              Momentos destacados de nuestras aventuras espaciales
            </p>
            <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.title}
                className="relative group overflow-hidden rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img  
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  alt={image.description}
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-rajdhani font-bold text-white mb-1">
                      {image.title}
                    </h3>
                    <p className="text-sm text-gray-300 font-montserrat">
                      {image.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gradient-to-t from-gray-900/50 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center space-panel p-12 rounded-lg max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-white">
              ¿QUIERES UNIRTE A NUESTRA MISIÓN?
            </h2>
            <p className="text-lg font-montserrat text-gray-300 mb-8 leading-relaxed">
              Estamos siempre buscando nuevos talentos apasionados por la exploración espacial. 
              Si eres estudiante universitario y sueñas con las estrellas, ¡este es tu lugar!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="font-montserrat text-gray-300">Campus Principal</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Calendar className="w-5 h-5 text-red-500" />
                <span className="font-montserrat text-gray-300">Reuniones: Viernes 6PM</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-5 h-5 text-red-500" />
                <span className="font-montserrat text-gray-300">156 Miembros Activos</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
