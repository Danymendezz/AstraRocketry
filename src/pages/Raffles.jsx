
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ticket, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  QrCode, 
  Trophy, 
  Flame,
  Sparkles,
  Star,
  Gift,
  Clock,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Raffles = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showDrawModal, setShowDrawModal] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [purchaseForm, setPurchaseForm] = useState({
    name: '',
    email: '',
    phone: '',
    seller: ''
  });

  // Initialize tickets
  useEffect(() => {
    const savedTickets = localStorage.getItem('raffleTickets');
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    } else {
      // Initialize 100 tickets
      const initialTickets = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        number: String(i + 1).padStart(3, '0'),
        status: 'available', // available, sold
        owner: null,
        purchaseDate: null,
        seller: null
      }));
      setTickets(initialTickets);
      localStorage.setItem('raffleTickets', JSON.stringify(initialTickets));
    }
  }, []);

  const handleTicketClick = (ticket) => {
    if (ticket.status === 'available') {
      setSelectedTicket(ticket);
      setShowPurchaseModal(true);
    } else {
      setSelectedTicket(ticket);
      setShowTicketModal(true);
    }
  };

  const handlePurchase = () => {
    if (!purchaseForm.name || !purchaseForm.email || !purchaseForm.phone) {
      toast({
        title: "❌ Datos incompletos",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket.id 
        ? {
            ...ticket,
            status: 'sold',
            owner: {
              name: purchaseForm.name,
              email: purchaseForm.email,
              phone: purchaseForm.phone
            },
            seller: purchaseForm.seller || 'Venta directa',
            purchaseDate: new Date().toISOString()
          }
        : ticket
    );

    setTickets(updatedTickets);
    localStorage.setItem('raffleTickets', JSON.stringify(updatedTickets));

    // Show digital ticket
    setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id));
    setShowPurchaseModal(false);
    setShowTicketModal(true);

    // Reset form
    setPurchaseForm({ name: '', email: '', phone: '', seller: '' });

    toast({
      title: "🎫 ¡Boleto comprado exitosamente!",
      description: "Tu boleto digital ha sido generado",
      duration: 5000
    });
  };

  const handleDraw = () => {
    const soldTickets = tickets.filter(t => t.status === 'sold');
    if (soldTickets.length === 0) {
      toast({
        title: "❌ No hay boletos vendidos",
        description: "Debe haber al menos un boleto vendido para realizar el sorteo",
        variant: "destructive"
      });
      return;
    }

    setShowDrawModal(true);
    setIsDrawing(true);

    // Simulate drawing animation
    setTimeout(() => {
      const randomTicket = soldTickets[Math.floor(Math.random() * soldTickets.length)];
      setWinner(randomTicket);
      setIsDrawing(false);
      setShowConfetti(true);

      // Hide confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);

      toast({
        title: "🏆 ¡Tenemos ganador!",
        description: `Boleto #${randomTicket.number} - ${randomTicket.owner.name}`,
        duration: 10000
      });
    }, 3000);
  };

  const soldTicketsCount = tickets.filter(t => t.status === 'sold').length;
  const availableTicketsCount = tickets.filter(t => t.status === 'available').length;

  return (
    <div className="min-h-screen pt-20">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
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
              RIFAS ESPACIALES
            </h1>
            <p className="text-xl font-rajdhani text-gray-300 max-w-3xl mx-auto">
              Compra tu boleto y ayúdanos a financiar nuestras misiones hacia las estrellas
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-panel p-6 rounded-lg text-center">
              <Ticket className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className="text-3xl font-orbitron font-bold text-white mb-2">
                {soldTicketsCount}
              </div>
              <div className="text-sm font-rajdhani text-gray-400 uppercase">
                Boletos Vendidos
              </div>
            </div>
            <div className="space-panel p-6 rounded-lg text-center">
              <Gift className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-orbitron font-bold text-white mb-2">
                {availableTicketsCount}
              </div>
              <div className="text-sm font-rajdhani text-gray-400 uppercase">
                Disponibles
              </div>
            </div>
            <div className="space-panel p-6 rounded-lg text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-orbitron font-bold text-white mb-2">
                $500K
              </div>
              <div className="text-sm font-rajdhani text-gray-400 uppercase">
                Premio Principal
              </div>
            </div>
          </motion.div>

          {/* Draw Button */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="rocket-button bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-12 py-4 text-lg font-rajdhani font-semibold pulse-glow"
              onClick={handleDraw}
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Realizar Sorteo
              <Flame className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Tickets Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-orbitron font-bold mb-4 text-white">
              TAQUILLA ESPACIAL
            </h2>
            <p className="text-lg font-rajdhani text-gray-300">
              Selecciona tu boleto de la suerte
            </p>
          </motion.div>

          <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-20 gap-2">
            {tickets.map((ticket, index) => (
              <motion.button
                key={ticket.id}
                className={`aspect-square rounded-lg border-2 font-rajdhani font-bold text-sm transition-all duration-300 ${
                  ticket.status === 'available'
                    ? 'ticket-available border-green-500 text-white hover:scale-110 hover:glow-green'
                    : 'ticket-sold border-gray-500 text-gray-400 cursor-not-allowed'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={ticket.status === 'available' ? { scale: 1.1 } : {}}
                whileTap={ticket.status === 'available' ? { scale: 0.95 } : {}}
                onClick={() => handleTicketClick(ticket)}
              >
                {ticket.number}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Modal */}
      <AnimatePresence>
        {showPurchaseModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="checkout-panel rounded-lg p-8 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-orbitron font-bold text-white">
                  COMPRAR BOLETO
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPurchaseModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Ticket className="w-10 h-10 text-green-500" />
                </div>
                <div className="text-3xl font-orbitron font-bold text-white mb-2">
                  #{selectedTicket?.number}
                </div>
                <div className="text-lg font-rajdhani text-green-500">
                  $25.000 COP
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                    value={purchaseForm.name}
                    onChange={(e) => setPurchaseForm({...purchaseForm, name: e.target.value})}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                    value={purchaseForm.email}
                    onChange={(e) => setPurchaseForm({...purchaseForm, email: e.target.value})}
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                    value={purchaseForm.phone}
                    onChange={(e) => setPurchaseForm({...purchaseForm, phone: e.target.value})}
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                    Vendedor (Opcional)
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                    value={purchaseForm.seller}
                    onChange={(e) => setPurchaseForm({...purchaseForm, seller: e.target.value})}
                    placeholder="Nombre del vendedor"
                  />
                </div>
              </div>

              <Button
                className="w-full mt-6 rocket-button bg-green-500 hover:bg-green-600 text-white py-3 font-rajdhani font-semibold"
                onClick={handlePurchase}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Comprar Boleto - $25.000
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Digital Ticket Modal */}
      <AnimatePresence>
        {showTicketModal && selectedTicket?.status === 'sold' && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="space-panel rounded-lg p-8 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-orbitron font-bold text-white">
                  PASE DE ABORDAJE
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Digital Ticket Design */}
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500 rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-sm font-rajdhani text-gray-300 uppercase tracking-wider">
                    Astra Rocketry - Rifa Espacial 2024
                  </div>
                  <div className="text-4xl font-orbitron font-bold text-white my-2">
                    #{selectedTicket.number}
                  </div>
                  <div className="text-lg font-rajdhani text-red-500">
                    BOLETO VÁLIDO
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-montserrat text-sm">Pasajero:</span>
                    <span className="text-white font-montserrat text-sm">{selectedTicket.owner?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-montserrat text-sm">Fecha:</span>
                    <span className="text-white font-montserrat text-sm">
                      {new Date(selectedTicket.purchaseDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-montserrat text-sm">Vendedor:</span>
                    <span className="text-white font-montserrat text-sm">{selectedTicket.seller}</span>
                  </div>
                </div>

                <div className="text-center mt-4 pt-4 border-t border-gray-600">
                  <QrCode className="w-16 h-16 text-white mx-auto mb-2" />
                  <div className="text-xs font-montserrat text-gray-400">
                    Código QR de verificación
                  </div>
                </div>
              </div>

              <div className="text-center text-sm font-montserrat text-gray-400">
                Guarda este boleto digital. Te llegará una copia por email.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draw Modal */}
      <AnimatePresence>
        {showDrawModal && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center max-w-lg w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {isDrawing ? (
                <div className="launch-sequence rounded-full w-64 h-64 mx-auto mb-8 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-24 h-24 text-white" />
                  </motion.div>
                </div>
              ) : winner ? (
                <div className="winner-celebration rounded-lg p-8">
                  <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
                  <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
                    ¡GANADOR!
                  </h2>
                  <div className="text-6xl font-orbitron font-bold text-yellow-500 mb-4">
                    #{winner.number}
                  </div>
                  <div className="text-2xl font-rajdhani text-white mb-2">
                    {winner.owner.name}
                  </div>
                  <div className="text-lg font-montserrat text-gray-300">
                    {winner.owner.email}
                  </div>
                </div>
              ) : null}

              <div className="text-2xl font-orbitron font-bold text-white mb-4">
                {isDrawing ? 'REALIZANDO SORTEO...' : winner ? '¡FELICITACIONES!' : ''}
              </div>

              {winner && (
                <Button
                  className="rocket-button bg-red-500 hover:bg-red-600 text-white px-8 py-3 font-rajdhani font-semibold"
                  onClick={() => setShowDrawModal(false)}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Cerrar
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Raffles;
