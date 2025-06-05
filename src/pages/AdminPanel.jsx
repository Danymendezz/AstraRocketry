import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Users, 
  Ticket, 
  ShoppingBag, 
  Heart, 
  BarChart3, 
  ShieldCheck, 
  FileText, 
  Bell,
  PlusCircle,
  Edit3,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Activity,
  Database,
  KeyRound
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data for admin panel
  const kpis = {
    totalUsers: 1256,
    activeRaffles: 3,
    totalDonations: 7580000, // COP
    totalSales: 23500000, // COP
    productsInStore: 42,
  };

  const recentActivity = [
    { id: 1, user: 'Admin1', action: 'Creó nueva rifa "Rifa Estelar"', timestamp: 'Hace 5 minutos', icon: PlusCircle },
    { id: 2, user: 'SellerX', action: 'Registró venta de 5 boletos', timestamp: 'Hace 15 minutos', icon: Ticket },
    { id: 3, user: 'DonorY', action: 'Realizó donación de $50.000', timestamp: 'Hace 30 minutos', icon: Heart },
    { id: 4, user: 'Admin2', action: 'Actualizó producto "Camiseta Astra"', timestamp: 'Hace 1 hora', icon: Edit3 },
  ];

  const products = [
    { id: 1, name: 'Camiseta Astra', category: 'Merch', price: 45000, stock: 50 },
    { id: 2, name: 'Modelo Cohete Falcon Mini', category: 'Modelos', price: 120000, stock: 20 },
    { id: 3, name: 'Taller Cohetería Básica', category: 'Talleres', price: 150000, stock: 15 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(kpis).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="space-panel hover:border-red-500/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </CardTitle>
                    {key === 'totalUsers' && <Users className="h-4 w-4 text-red-500" />}
                    {key === 'activeRaffles' && <Ticket className="h-4 w-4 text-red-500" />}
                    {key === 'totalDonations' && <Heart className="h-4 w-4 text-red-500" />}
                    {key === 'totalSales' && <ShoppingBag className="h-4 w-4 text-red-500" />}
                    {key === 'productsInStore' && <BarChart3 className="h-4 w-4 text-red-500" />}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-orbitron text-white">
                      {key.includes('Donations') || key.includes('Sales') ? `${value.toLocaleString()}` : value}
                    </div>
                    <p className="text-xs text-gray-500 pt-1">
                      {key === 'totalUsers' && '+20.1% desde el último mes'}
                      {key === 'activeRaffles' && 'Próximo sorteo en 15 días'}
                      {key === 'totalDonations' && '+15% meta mensual'}
                      {key === 'totalSales' && '+5% desde ayer'}
                      {key === 'productsInStore' && '3 nuevos esta semana'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {/* Radar Activity Placeholder */}
            <motion.div
              className="md:col-span-2 lg:col-span-1 space-panel p-6 rounded-lg flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-40 h-40 rounded-full radar-sweep mb-4">
                <Activity className="w-16 h-16 text-green-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="text-lg font-rajdhani font-semibold text-white">Radar de Actividad</h3>
              <p className="text-sm text-gray-400">Monitoreo en tiempo real</p>
            </motion.div>
          </div>
        );
      case 'raffles':
        return (
          <Card className="space-panel">
            <CardHeader>
              <CardTitle className="text-white font-orbitron">Gestión de Rifas</CardTitle>
              <CardDescription className="text-gray-400">Crear, editar y probar sorteos.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="rocket-button bg-red-500 hover:bg-red-600 text-white mb-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Crear Nueva Rifa
              </Button>
              <p className="text-gray-300">Listado de rifas y herramientas de prueba aquí.</p>
              <div className="mt-6 p-4 border border-dashed border-yellow-500 rounded-lg">
                <h4 className="text-yellow-500 font-rajdhani font-semibold mb-2">Ruleta de Prueba</h4>
                <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto flex items-center justify-center animate-spin" style={{animationDuration: '3s'}}>
                  <Ticket className="w-12 h-12 text-yellow-400" />
                </div>
                <Button variant="outline" className="mt-4 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                  Probar Sorteo
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 'store':
        return (
          <Card className="space-panel">
            <CardHeader>
              <CardTitle className="text-white font-orbitron">Gestión de Tienda</CardTitle>
              <CardDescription className="text-gray-400">CRUD de productos y categorías.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Button className="rocket-button bg-red-500 hover:bg-red-600 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" /> Añadir Producto
                </Button>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Buscar producto..." className="bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-3 py-2 w-full focus:border-red-500 focus:outline-none" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                  <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
                    <tr>
                      <th scope="col" className="px-6 py-3">Nombre</th>
                      <th scope="col" className="px-6 py-3">Categoría</th>
                      <th scope="col" className="px-6 py-3">Precio</th>
                      <th scope="col" className="px-6 py-3">Stock</th>
                      <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{product.name}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">${product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">{product.stock}</td>
                        <td className="px-6 py-4 flex space-x-2">
                          <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300"><Edit3 className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400"><Trash2 className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      case 'donations':
        return (
          <Card className="space-panel">
            <CardHeader>
              <CardTitle className="text-white font-orbitron">Gestión de Donaciones</CardTitle>
              <CardDescription className="text-gray-400">Ajustar metas y ver historial.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Contenido de gestión de donaciones aquí.</p>
            </CardContent>
          </Card>
        );
      case 'security':
        return (
          <Card className="space-panel">
            <CardHeader>
              <CardTitle className="text-white font-orbitron">Panel de Seguridad</CardTitle>
              <CardDescription className="text-gray-400">Logs de actividad y configuraciones.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h4 className="text-lg font-rajdhani font-semibold text-white mb-2">Logs de Actividad Reciente</h4>
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {recentActivity.map(activity => {
                      const Icon = activity.icon;
                      return (
                        <li key={activity.id} className="flex items-start text-sm">
                          <Icon className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-gray-300">{activity.user}: </span>
                            <span className="text-gray-400">{activity.action}</span>
                            <span className="text-xs text-gray-500 ml-2">{activity.timestamp}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h4 className="text-lg font-rajdhani font-semibold text-white mb-2">Configuraciones de Seguridad</h4>
                  <Button variant="outline" className="w-full mb-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black">
                    <KeyRound className="mr-2 h-4 w-4" /> Gestionar Claves API
                  </Button>
                  <Button variant="outline" className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                    <ShieldCheck className="mr-2 h-4 w-4" /> Auditoría de Seguridad
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <p className="text-gray-400">Selecciona una opción del menú.</p>;
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Visión General', icon: BarChart3 },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'raffles', label: 'Rifas', icon: Ticket },
    { id: 'store', label: 'Tienda', icon: ShoppingBag },
    { id: 'donations', label: 'Donaciones', icon: Heart },
    { id: 'security', label: 'Seguridad', icon: ShieldCheck },
    { id: 'reports', label: 'Reportes', icon: FileText },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
  ];

  return (
    <div className="min-h-screen pt-20"> {/* Changed from pt-20 to avoid overlap with fixed header */}
      {/* Header Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 parallax-stars"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-white neon-text">
              CENTRO DE CONTROL ASTRA
            </h1>
            <p className="text-lg font-rajdhani text-gray-300 max-w-2xl mx-auto">
              Panel de administración estilo NASA/SpaceX para gestionar todas las operaciones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Admin Panel Layout */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <motion.aside 
              className="lg:w-1/4 space-panel p-6 rounded-lg"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-xl font-orbitron font-bold text-white mb-6">Menú de Control</h2>
              <nav className="space-y-2">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className={`w-full justify-start control-button ${
                        activeTab === item.id ? 'bg-red-500 text-white hover:bg-red-600' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
              <div className="mt-8 pt-6 border-t border-gray-700">
                <Button variant="outline" className="w-full border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Ajustes Generales
                </Button>
              </div>
            </motion.aside>

            {/* Main Content Area */}
            <motion.main 
              className="lg:w-3/4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {renderContent()}
              
              {/* Recent Activity Log (condensed for non-security tabs) */}
              {activeTab !== 'security' && (
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card className="space-panel">
                    <CardHeader>
                      <CardTitle className="text-white font-orbitron">Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 max-h-48 overflow-y-auto">
                        {recentActivity.slice(0,3).map(activity => {
                           const Icon = activity.icon;
                           return (
                            <li key={activity.id} className="flex items-center text-sm">
                              <Icon className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-gray-300">{activity.user}: </span>
                                <span className="text-gray-400">{activity.action}</span>
                                <span className="text-xs text-gray-500 ml-2">{activity.timestamp}</span>
                              </div>
                            </li>
                           );
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;