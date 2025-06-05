import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  BarChart3, 
  Star, 
  DollarSign, 
  TrendingUp, 
  Settings,
  Bell,
  LogOut,
  Fuel
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'Vendedor Estrella',
    role: 'Vendedor',
    avatar: '👨‍🚀',
    ticketsSold: 78,
    totalSales: 1950000, // 78 * 25000
    rank: 3,
    team: 'Equipo Alfa Centauri'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: '¡Nueva venta registrada! Boleto #042', time: 'hace 5 min' },
    { id: 2, message: 'Recordatorio: Reunión de equipo mañana a las 10 AM', time: 'hace 1 hora' },
    { id: 3, message: '¡Alcanzaste el 75% de tu meta de ventas!', time: 'hace 3 horas' }
  ]);

  const salesData = [
    { name: 'Ene', ventas: 30 },
    { name: 'Feb', ventas: 45 },
    { name: 'Mar', ventas: 60 },
    { name: 'Abr', ventas: 50 },
    { name: 'May', ventas: 78 },
    { name: 'Jun', ventas: 70 },
  ];

  const ranking = [
    { name: 'Laura Gómez', sales: 92, avatar: '👩‍🚀' },
    { name: 'Pedro Sánchez', sales: 85, avatar: '👨‍🚀' },
    { name: 'Vendedor Estrella', sales: 78, avatar: '👨‍🚀', isCurrentUser: true },
    { name: 'Ana Torres', sales: 70, avatar: '👩‍🚀' },
    { name: 'Carlos Ruiz', sales: 65, avatar: '👨‍🚀' },
  ];

  // Simulating fetching user data if needed, for now it's static
  useEffect(() => {
    const storedUser = localStorage.getItem('astraUser');
    if (storedUser) {
      // In a real app, you might fetch more user details based on the stored token/ID
      // For now, we'll just use the static user and potentially update parts if needed
      // setUser(prevUser => ({...prevUser, ...JSON.parse(storedUser)}));
    } else {
      // If no user in localStorage, redirect to login (though ProtectedRoute should handle this)
      navigate('/login');
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem('astraUser');
    toast({
      title: "🚀 Sesión cerrada",
      description: "¡Hasta la próxima misión, astronauta!",
      duration: 3000
    });
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900"> {/* Changed from pt-20 */}
      {/* Header */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 parallax-stars opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white neon-text">
                DASHBOARD VENDEDOR
              </h1>
              <p className="text-lg font-rajdhani text-gray-300">
                Bienvenido, {user.name}. ¡Listo para impulsar las ventas!
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="astronaut-avatar w-16 h-16 rounded-full flex items-center justify-center text-3xl">
                {user.avatar}
              </div>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-red-500">
                <Bell className="w-6 h-6" />
              </Button>
              <Button 
                variant="outline" 
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Salir
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Quick Actions */}
          <motion.div 
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Tickets Vendidos */}
            <div className="space-panel p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-rajdhani font-bold text-white">Boletos Vendidos</h2>
                <Ticket className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-5xl font-orbitron font-bold text-green-500 mb-2">{user.ticketsSold}</div>
              <p className="text-sm font-montserrat text-gray-400">Meta mensual: 100 boletos</p>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${(user.ticketsSold / 100) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Total Ventas */}
            <div className="space-panel p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-rajdhani font-bold text-white">Total Ventas</h2>
                <DollarSign className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-4xl font-orbitron font-bold text-yellow-500 mb-2">
                ${user.totalSales.toLocaleString()}
              </div>
              <p className="text-sm font-montserrat text-gray-400">Comisión estimada: ${(user.totalSales * 0.1).toLocaleString()}</p>
            </div>

            {/* Quick Actions */}
            <div className="space-panel p-6 rounded-lg">
              <h2 className="text-xl font-rajdhani font-bold text-white mb-4">Acciones Rápidas</h2>
              <div className="space-y-3">
                <Button className="w-full rocket-button bg-blue-500 hover:bg-blue-600">
                  <Ticket className="w-5 h-5 mr-2" /> Registrar Nueva Venta
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Users className="w-5 h-5 mr-2" /> Ver Mis Compradores
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Settings className="w-5 h-5 mr-2" /> Configuración de Cuenta
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Sales Chart & Ranking */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Sales Chart (Fuel Gauge Style) */}
            <div className="space-panel p-6 rounded-lg">
              <h2 className="text-xl font-rajdhani font-bold text-white mb-4">Progreso de Ventas (Últimos 6 Meses)</h2>
              <div className="h-64 bg-gray-800 rounded-lg p-4 flex items-end justify-around">
                {salesData.map((month, index) => (
                  <div key={month.name} className="text-center w-1/6 px-1">
                    <motion.div
                      className="fuel-gauge rounded-t-md mx-auto"
                      style={{ height: `${(month.ventas / 100) * 100}%`, width: '60%' }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.ventas / 100) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    >
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-white font-orbitron">
                        {month.ventas}
                      </div>
                    </motion.div>
                    <p className="text-xs font-montserrat text-gray-400 mt-2">{month.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ranking de Vendedores */}
            <div className="space-panel p-6 rounded-lg">
              <h2 className="text-xl font-rajdhani font-bold text-white mb-4">Ranking de Vendedores</h2>
              <ul className="space-y-3">
                {ranking.map((seller, index) => (
                  <li 
                    key={seller.name} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      seller.isCurrentUser ? 'bg-red-500/20 border border-red-500' : 'bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-orbitron text-gray-400 w-6">#{index + 1}</span>
                      <div className="astronaut-avatar w-8 h-8 rounded-full flex items-center justify-center text-sm">
                        {seller.avatar}
                      </div>
                      <span className="font-montserrat text-white">{seller.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-orbitron text-red-400">{seller.sales}</span>
                      <Ticket className="w-4 h-4 text-red-400" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notifications */}
            <div className="space-panel p-6 rounded-lg">
              <h2 className="text-xl font-rajdhani font-bold text-white mb-4">Notificaciones Recientes</h2>
              <ul className="space-y-3">
                {notifications.map(notif => (
                  <li key={notif.id} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                    <Bell className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-montserrat text-white">{notif.message}</p>
                      <p className="text-xs font-montserrat text-gray-500">{notif.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;