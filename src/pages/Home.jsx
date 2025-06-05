import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Ticket, 
  Heart, 
  ShoppingBag, 
  Trophy, 
  Clock, 
  Zap,
  Star,
  Target,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/components/ThemeProvider';

const Home = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [countdown, setCountdown] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = (action) => {
    toast({
      title: `🚀 ${action} activado!`,
      description: "Sistemas de propulsión iniciados...",
      duration: 3000,
    });
  };

  const achievements = [
    {
      title: "Ganadores Colombia 2023",
      description: "Primer lugar en competencia nacional",
      icon: Trophy,
      color: "text-yellow-500 dark:text-yellow-400"
    },
    {
      title: "Récord de Altitud",
      description: "2,847 metros alcanzados",
      icon: Target,
      color: "text-blue-500 dark:text-blue-400"
    },
    {
      title: "Innovación Técnica",
      description: "Sistema de recuperación avanzado",
      icon: Zap,
      color: "text-green-500 dark:text-green-400"
    }
  ];

  return (
    <div className="min-h-screen"> 
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {theme === 'dark' && (
          <>
            <div className="absolute inset-0 parallax-stars"></div>
            <div className="absolute inset-0 quantum-field"></div>
            <div className="space-debris" style={{ top: '10%', animationDelay: '0s' }}></div>
            <div className="space-debris" style={{ top: '30%', animationDelay: '2s' }}></div>
            <div className="space-debris" style={{ top: '50%', animationDelay: '4s' }}></div>
            <div className="space-debris" style={{ top: '70%', animationDelay: '6s' }}></div>
            <div className="space-debris" style={{ top: '90%', animationDelay: '8s' }}></div>
          </>
        )}
         {theme === 'light' && (
          <div className="absolute inset-0 bg-gray-50 dark:bg-transparent stars-bg"></div>
        )}


        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <img  
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl glow-red"
              alt="Rocket launching with fire and smoke trail against starry sky"
             src="https://images.unsplash.com/photo-1647946106616-26fa1fd83e5e" />
          </motion.div>

          <motion.h1
            className={`text-5xl md:text-7xl font-orbitron font-bold mb-6 ${theme === 'dark' ? 'neon-text' : 'text-foreground'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            IMPULSANDO EL
            <span className="block text-red-500 text-6xl md:text-8xl">
              FUTURO
            </span>
          </motion.h1>

          <motion.p
            className={`text-xl md:text-2xl font-rajdhani ${theme === 'dark' ? 'text-muted-foreground' : 'text-foreground/80'} mb-12 max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            De la cohetería universitaria hacia las estrellas. 
            Únete a nuestra misión de exploración espacial y tecnología avanzada.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="rocket-button bg-red-500 hover:bg-red-600 text-white dark:text-primary-foreground px-8 py-4 text-lg font-rajdhani font-semibold"
              onClick={() => handleButtonClick('Compra de Boletos')}
            >
              <Ticket className="w-6 h-6 mr-2" />
              Comprar Boletos
              <Flame className="w-5 h-5 ml-2 text-orange-400 dark:text-orange-300" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rocket-button border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:hover:text-primary-foreground px-8 py-4 text-lg font-rajdhani font-semibold"
              onClick={() => handleButtonClick('Donación')}
            >
              <Heart className="w-6 h-6 mr-2" />
              Donar Ahora
            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="rocket-button bg-gray-700 hover:bg-gray-600 dark:bg-secondary dark:hover:bg-secondary/80 text-white dark:text-secondary-foreground px-8 py-4 text-lg font-rajdhani font-semibold"
              onClick={() => handleButtonClick('Tienda')}
            >
              <ShoppingBag className="w-6 h-6 mr-2" />
              Ir a la Tienda
            </Button>
          </motion.div>
        </div>

        {/* Rocket Animation */}
        {theme === 'dark' && (
          <motion.div
            className="absolute bottom-10 left-10 hidden lg:block"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div className="relative">
              <Rocket className="w-16 h-16 text-red-500" />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-16 thruster-effect rounded-full"></div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Achievement Carousel */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${theme === 'dark' ? 'text-foreground' : 'text-foreground'}`}>
              ÚLTIMOS LOGROS
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
                  className={`mission-card p-8 rounded-lg text-center ${theme === 'dark' ? '' : 'bg-card shadow-lg'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`mission-badge w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${theme === 'light' ? 'bg-yellow-400 border-yellow-500 text-gray-900' : ''}`}>
                    <Icon className={`w-10 h-10 ${achievement.color}`} />
                  </div>
                  <h3 className={`text-xl font-rajdhani font-bold ${theme === 'dark' ? 'text-foreground' : 'text-card-foreground'} mb-3`}>
                    {achievement.title}
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-muted-foreground' : 'text-foreground/80'} font-montserrat`}>
                    {achievement.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 relative">
        {theme === 'dark' && <div className="absolute inset-0 warp-drive"></div>}
        {theme === 'light' && <div className="absolute inset-0 bg-secondary dark:bg-transparent"></div>}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${theme === 'dark' ? 'text-foreground' : 'text-foreground'}`}>
              PRÓXIMO LANZAMIENTO
            </h2>
            <p className={`text-xl font-rajdhani ${theme === 'dark' ? 'text-muted-foreground' : 'text-foreground/80'}`}>
              Competencia Nacional de Cohetería 2024
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center items-center space-x-4 sm:space-x-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {Object.entries(countdown).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className={`launch-countdown w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-lg flex items-center justify-center mb-4 ${theme === 'light' ? 'border-primary' : ''}`}>
                  <span className={`text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
                    {value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className={`text-xs sm:text-sm md:text-base font-rajdhani ${theme === 'dark' ? 'text-muted-foreground' : 'text-foreground/70'} uppercase tracking-wider`}>
                  {unit === 'days' ? 'Días' : 
                   unit === 'hours' ? 'Horas' : 
                   unit === 'minutes' ? 'Minutos' : 'Segundos'}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button
              size="lg"
              className={`rocket-button bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white dark:text-primary-foreground px-12 py-4 text-lg font-rajdhani font-semibold ${theme === 'dark' ? 'pulse-glow' : ''}`}
            >
              <Clock className="w-6 h-6 mr-2" />
              Ver Detalles del Evento
              <Star className="w-5 h-5 ml-2 text-yellow-400 dark:text-yellow-300" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission Stats */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent to-black/50' : 'bg-secondary dark:bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '47', label: 'Lanzamientos Exitosos', icon: Rocket },
              { number: '2.8km', label: 'Altitud Máxima', icon: Target },
              { number: '156', label: 'Miembros Activos', icon: Star },
              { number: '12', label: 'Premios Ganados', icon: Trophy }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className={`text-center space-panel p-6 rounded-lg ${theme === 'light' ? 'bg-card shadow-md' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-8 h-8 text-red-500 mx-auto mb-4" />
                  <div className={`text-3xl font-orbitron font-bold ${theme === 'dark' ? 'text-foreground' : 'text-card-foreground'} mb-2`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-rajdhani ${theme === 'dark' ? 'text-muted-foreground' : 'text-foreground/70'} uppercase tracking-wider`}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;