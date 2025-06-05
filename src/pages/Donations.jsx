
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Rocket, 
  Target, 
  Zap, 
  Star, 
  Trophy,
  User,
  DollarSign,
  TrendingUp,
  Flame,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Donations = () => {
  const { toast } = useToast();
  const [currentAmount, setCurrentAmount] = useState(0);
  const [goalAmount] = useState(1000000); // $1,000,000 COP
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [recentDonations, setRecentDonations] = useState([]);
  const [showLaunchAnimation, setShowLaunchAnimation] = useState(false);

  // Load saved data
  useEffect(() => {
    const savedAmount = localStorage.getItem('donationAmount');
    const savedDonations = localStorage.getItem('recentDonations');
    
    if (savedAmount) {
      setCurrentAmount(parseInt(savedAmount));
    }
    
    if (savedDonations) {
      setRecentDonations(JSON.parse(savedDonations));
    }
  }, []);

  const progressPercentage = (currentAmount / goalAmount) * 100;
  const isGoalReached = currentAmount >= goalAmount;

  const donationPresets = [
    { amount: 10000, label: '$10K', description: 'Combustible básico' },
    { amount: 25000, label: '$25K', description: 'Componentes electrónicos' },
    { amount: 50000, label: '$50K', description: 'Sistema de navegación' },
    { amount: 100000, label: '$100K', description: 'Motor de propulsión' },
    { amount: 250000, label: '$250K', description: 'Cohete completo' },
    { amount: 500000, label: '$500K', description: 'Misión espacial' }
  ];

  const handleDonation = () => {
    const amount = parseInt(donationAmount);
    
    if (!amount || amount < 1000) {
      toast({
        title: "❌ Monto inválido",
        description: "El monto mínimo de donación es $1.000 COP",
        variant: "destructive"
      });
      return;
    }

    if (!donorName.trim()) {
      toast({
        title: "❌ Nombre requerido",
        description: "Por favor ingresa tu nombre",
        variant: "destructive"
      });
      return;
    }

    // Update amounts
    const newAmount = currentAmount + amount;
    setCurrentAmount(newAmount);
    localStorage.setItem('donationAmount', newAmount.toString());

    // Add to recent donations
    const newDonation = {
      id: Date.now(),
      name: donorName,
      email: donorEmail,
      amount: amount,
      date: new Date().toISOString(),
      avatar: `👨‍🚀` // Random astronaut avatar
    };

    const updatedDonations = [newDonation, ...recentDonations.slice(0, 9)];
    setRecentDonations(updatedDonations);
    localStorage.setItem('recentDonations', JSON.stringify(updatedDonations));

    // Check if goal reached
    if (newAmount >= goalAmount && !isGoalReached) {
      setShowLaunchAnimation(true);
      setTimeout(() => setShowLaunchAnimation(false), 5000);
      
      toast({
        title: "🚀 ¡META ALCANZADA!",
        description: "¡Despegue iniciado! Gracias por hacer posible nuestra misión",
        duration: 10000
      });
    } else {
      toast({
        title: "🔥 ¡Donación exitosa!",
        description: `Gracias ${donorName}! Combustible agregado al tanque`,
        duration: 5000
      });
    }

    // Reset form
    setDonationAmount('');
    setDonorName('');
    setDonorEmail('');
  };

  const handlePresetClick = (amount) => {
    setDonationAmount(amount.toString());
    
    // Play ignition sound effect (simulated)
    toast({
      title: "🔥 Combustible seleccionado",
      description: `$${amount.toLocaleString()} COP listo para cargar`,
      duration: 2000
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Launch Animation Overlay */}
      {showLaunchAnimation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="text-center">
            <motion.div
              className="relative mb-8"
              animate={{ 
                y: [0, -100, -200, -300],
                scale: [1, 1.2, 1.5, 2]
              }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              <Rocket className="w-32 h-32 text-red-500 mx-auto" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-32 thruster-effect rounded-full"></div>
            </motion.div>
            
            <motion.h2
              className="text-6xl font-orbitron font-bold text-white neon-text mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              ¡DESPEGUE!
            </motion.h2>
            
            <motion.p
              className="text-2xl font-rajdhani text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              Meta alcanzada - Misión en marcha
            </motion.p>

            {/* Confetti */}
            <div className="fixed inset-0 pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

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
              COMBUSTIBLE ESPACIAL
            </h1>
            <p className="text-xl font-rajdhani text-gray-300 max-w-3xl mx-auto">
              Tu donación impulsa nuestros cohetes hacia las estrellas. 
              Cada peso cuenta para hacer realidad nuestros sueños espaciales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Fuel Tank Progress */}
            <div className="space-panel p-8 rounded-lg mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-orbitron font-bold text-white mb-4">
                  TANQUE DE COMBUSTIBLE
                </h2>
                <div className="text-5xl font-orbitron font-bold text-red-500 mb-2">
                  ${currentAmount.toLocaleString()} COP
                </div>
                <div className="text-lg font-rajdhani text-gray-400">
                  de ${goalAmount.toLocaleString()} COP objetivo
                </div>
              </div>

              {/* Rocket Fuel Gauge */}
              <div className="relative">
                <div className="w-full h-20 bg-gray-800 rounded-lg overflow-hidden border-2 border-red-500/30">
                  <motion.div
                    className="fuel-gauge h-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  >
                    {/* Fuel flow animation */}
                    <div className="absolute inset-0 fuel-gauge"></div>
                  </motion.div>
                </div>
                
                {/* Rocket Icon */}
                <motion.div
                  className="absolute top-1/2 transform -translate-y-1/2"
                  style={{ left: `${Math.min(progressPercentage, 95)}%` }}
                  animate={isGoalReached ? { 
                    y: [-5, -15, -5],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: isGoalReached ? Infinity : 0 }}
                >
                  <div className="relative">
                    <Rocket className="w-8 h-8 text-white" />
                    {isGoalReached && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-8 thruster-effect rounded-full"></div>
                    )}
                  </div>
                </motion.div>
              </div>

              <div className="text-center mt-6">
                <div className="text-2xl font-rajdhani font-bold text-white">
                  {progressPercentage.toFixed(1)}% Completado
                </div>
                {isGoalReached ? (
                  <div className="text-green-500 font-rajdhani font-bold text-lg mt-2">
                    🚀 ¡META ALCANZADA - LISTOS PARA EL DESPEGUE!
                  </div>
                ) : (
                  <div className="text-gray-400 font-rajdhani mt-2">
                    ${(goalAmount - currentAmount).toLocaleString()} COP restantes
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Donation Presets */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-orbitron font-bold text-white mb-6">
                PAQUETES DE COMBUSTIBLE
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {donationPresets.map((preset, index) => (
                  <motion.button
                    key={preset.amount}
                    className="product-hover-effect space-panel p-4 rounded-lg text-center transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handlePresetClick(preset.amount)}
                  >
                    <div className="text-2xl font-orbitron font-bold text-red-500 mb-2">
                      {preset.label}
                    </div>
                    <div className="text-sm font-rajdhani text-gray-400">
                      {preset.description}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Custom Donation Form */}
            <motion.div
              className="checkout-panel p-8 rounded-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-orbitron font-bold text-white mb-6 text-center">
                CENTRO DE DONACIONES
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                    Monto de Donación (COP) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="10000"
                      min="1000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                    Nombre del Astronauta *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                    Email (Opcional)
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="astronauta@email.com"
                  />
                </div>
              </div>

              <Button
                className="w-full mt-6 rocket-button bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 text-lg font-rajdhani font-semibold pulse-glow"
                onClick={handleDonation}
              >
                <Heart className="w-6 h-6 mr-2" />
                Donar Combustible
                <Flame className="w-5 h-5 ml-2" />
              </Button>

              <div className="text-center mt-4 text-sm font-montserrat text-gray-400">
                Monto mínimo: $1.000 COP
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Donations Wall */}
      {recentDonations.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
                MURO DE ASTRONAUTAS
              </h2>
              <p className="text-lg font-rajdhani text-gray-300">
                Héroes que impulsan nuestra misión espacial
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {recentDonations.map((donation, index) => (
                <motion.div
                  key={donation.id}
                  className="space-panel p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="astronaut-avatar w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                    {donation.avatar}
                  </div>
                  <h3 className="text-lg font-rajdhani font-bold text-white mb-2">
                    {donation.name}
                  </h3>
                  <div className="text-2xl font-orbitron font-bold text-red-500 mb-2">
                    ${donation.amount.toLocaleString()}
                  </div>
                  <div className="text-sm font-montserrat text-gray-400">
                    {new Date(donation.date).toLocaleDateString()}
                  </div>
                  <div className="flex justify-center mt-3">
                    {Array.from({ length: Math.min(5, Math.floor(donation.amount / 10000)) }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-t from-gray-900/50 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
              IMPACTO DE TU DONACIÓN
            </h2>
            <p className="text-lg font-rajdhani text-gray-300">
              Así es como tu contribución impulsa nuestra misión
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Rocket,
                title: "Desarrollo de Cohetes",
                description: "Financiamos materiales y componentes para construir cohetes más avanzados",
                color: "text-red-500"
              },
              {
                icon: Target,
                title: "Competencias",
                description: "Participamos en competencias nacionales e internacionales",
                color: "text-blue-500"
              },
              {
                icon: Zap,
                title: "Educación",
                description: "Talleres y programas educativos para estudiantes interesados",
                color: "text-green-500"
              }
            ].map((impact, index) => {
              const Icon = impact.icon;
              return (
                <motion.div
                  key={impact.title}
                  className="mission-card p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon className={`w-8 h-8 ${impact.color}`} />
                  </div>
                  <h3 className="text-xl font-rajdhani font-bold text-white mb-3">
                    {impact.title}
                  </h3>
                  <p className="text-gray-400 font-montserrat">
                    {impact.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donations;
