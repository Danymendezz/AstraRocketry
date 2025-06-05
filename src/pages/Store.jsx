import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Star, 
  Rocket, 
  Zap, 
  Package, 
  CreditCard,
  User,
  Mail,
  MapPin,
  Phone,
  Flame,
  Sparkles,
  Trophy,
  BookOpen,
  Shirt
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Store = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('astraCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('astraCart', JSON.stringify(cart));
  }, [cart]);

  const categories = [
    { id: 'all', name: 'Todo', icon: Package },
    { id: 'workshops', name: 'Talleres', icon: BookOpen },
    { id: 'merch', name: 'Merchandising', icon: Shirt },
    { id: 'models', name: 'Modelos', icon: Rocket }
  ];

  const products = [
    // Workshops
    {
      id: 1,
      name: 'Taller de Cohetería Básica',
      category: 'workshops',
      price: 150000,
      image: 'Workshop participants building model rockets in a laboratory setting',
      description: 'Aprende los fundamentos de la cohetería con nuestros expertos',
      features: ['8 horas de duración', 'Materiales incluidos', 'Certificado', 'Lanzamiento prático'],
      rating: 5,
      stock: 15
    },
    {
      id: 2,
      name: 'Taller Avanzado de Propulsión',
      category: 'workshops',
      price: 250000,
      image: 'Advanced rocket propulsion system being assembled by engineering students',
      description: 'Diseño y construcción de sistemas de propulsión avanzados',
      features: ['12 horas de duración', 'Simulaciones computacionales', 'Proyecto final', 'Mentoría personalizada'],
      rating: 5,
      stock: 8
    },
    {
      id: 3,
      name: 'Curso de Navegación Espacial',
      category: 'workshops',
      price: 200000,
      image: 'Students learning space navigation with computer simulations and star charts',
      description: 'Sistemas de navegación y control de vuelo espacial',
      features: ['10 horas de duración', 'Software especializado', 'Simulador de vuelo', 'Certificación'],
      rating: 4,
      stock: 12
    },

    // Merchandising
    {
      id: 4,
      name: 'Camiseta Astra Rocketry',
      category: 'merch',
      price: 45000,
      image: 'Black t-shirt with futuristic Astra Rocketry logo and rocket design',
      description: 'Camiseta oficial con diseño exclusivo del club',
      features: ['100% algodón', 'Diseño exclusivo', 'Tallas S-XXL', 'Estampado de alta calidad'],
      rating: 5,
      stock: 50
    },
    {
      id: 5,
      name: 'Sudadera Espacial',
      category: 'merch',
      price: 85000,
      image: 'Dark hoodie with space-themed graphics and Astra Rocketry branding',
      description: 'Sudadera con capucha temática espacial',
      features: ['Mezcla algodón-poliéster', 'Capucha ajustable', 'Bolsillo frontal', 'Diseño reflectante'],
      rating: 5,
      stock: 30
    },
    {
      id: 6,
      name: 'Gorra de Astronauta',
      category: 'merch',
      price: 35000,
      image: 'Baseball cap with astronaut helmet design and mission patches',
      description: 'Gorra estilo astronauta con parches de misión',
      features: ['Ajustable', 'Protección UV', 'Parches bordados', 'Diseño ergonómico'],
      rating: 4,
      stock: 40
    },
    {
      id: 7,
      name: 'Termo Espacial',
      category: 'merch',
      price: 55000,
      image: 'Stainless steel thermos with space mission graphics and temperature display',
      description: 'Termo de acero inoxidable con diseño de misión espacial',
      features: ['500ml capacidad', 'Mantiene temperatura 12h', 'Acero inoxidable', 'Diseño antideslizante'],
      rating: 5,
      stock: 25
    },

    // Models
    {
      id: 8,
      name: 'Modelo Cohete Falcon Mini',
      category: 'models',
      price: 120000,
      image: 'Detailed scale model of Falcon rocket with realistic details and launch pad',
      description: 'Modelo a escala funcional del cohete Falcon',
      features: ['Escala 1:100', 'Materiales premium', 'Base de lanzamiento', 'Manual detallado'],
      rating: 5,
      stock: 20
    },
    {
      id: 9,
      name: 'Kit de Construcción Saturno V',
      category: 'models',
      price: 180000,
      image: 'Saturn V rocket construction kit with multiple stages and detailed components',
      description: 'Kit completo para construir el legendario Saturno V',
      features: ['200+ piezas', 'Instrucciones paso a paso', 'Herramientas incluidas', 'Escala 1:144'],
      rating: 5,
      stock: 15
    },
    {
      id: 10,
      name: 'Estación Espacial ISS',
      category: 'models',
      price: 220000,
      image: 'International Space Station detailed model with solar panels and modules',
      description: 'Réplica detallada de la Estación Espacial Internacional',
      features: ['Paneles solares móviles', 'Módulos desmontables', 'LED incluidos', 'Soporte giratorio'],
      rating: 4,
      stock: 10
    },
    {
      id: 11,
      name: 'Rover Marciano Explorer',
      category: 'models',
      price: 160000,
      image: 'Mars rover model with working wheels and scientific instruments',
      description: 'Modelo funcional del rover explorador de Marte',
      features: ['Ruedas funcionales', 'Instrumentos científicos', 'Control remoto', 'Cámara integrada'],
      rating: 5,
      stock: 18
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast({
          title: "❌ Stock insuficiente",
          description: `Solo quedan ${product.stock} unidades disponibles`,
          variant: "destructive"
        });
        return;
      }
      
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    toast({
      title: "🚀 Producto agregado",
      description: `${product.name} añadido al carrito`,
      duration: 2000
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (newQuantity > product.stock) {
      toast({
        title: "❌ Stock insuficiente",
        description: `Solo quedan ${product.stock} unidades disponibles`,
        variant: "destructive"
      });
      return;
    }

    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "❌ Carrito vacío",
        description: "Agrega productos antes de proceder al checkout",
        variant: "destructive"
      });
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      toast({
        title: "❌ Información incompleta",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    // Simulate order processing
    toast({
      title: "🚀 Orden procesada",
      description: "Tu pedido ha sido enviado. Recibirás confirmación por email.",
      duration: 5000
    });

    // Clear cart and form
    setCart([]);
    setCustomerInfo({ name: '', email: '', phone: '', address: '' });
    setShowCheckout(false);
  };

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
              TIENDA ESPACIAL
            </h1>
            <p className="text-xl font-rajdhani text-gray-300 max-w-3xl mx-auto">
              Equípate para la misión con nuestros productos exclusivos, 
              talleres especializados y modelos de cohetes únicos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories & Cart */}
      <section className="py-8 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-rajdhani font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    {category.name}
                  </motion.button>
                );
              })}
            </div>

            {/* Cart Button */}
            <motion.button
              className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg font-rajdhani font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300"
              onClick={() => setShowCheckout(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-5 h-5" />
              Carrito ({getTotalItems()})
              <span className="bg-white/20 px-2 py-1 rounded text-sm">
                ${getTotalPrice().toLocaleString()}
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="product-hover-effect space-panel rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img  
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    alt={`${product.name} - ${product.description}`}
                   src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                  
                  {/* Stock Badge */}
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-rajdhani font-semibold">
                    Stock: {product.stock}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-rajdhani font-semibold">
                    {categories.find(c => c.id === product.category)?.name}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-rajdhani font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-400 font-montserrat text-sm mb-3">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < product.rating 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-600'
                        }`} 
                      />
                    ))}
                    <span className="text-gray-400 text-sm ml-2">({product.rating})</span>
                  </div>

                  {/* Features */}
                  <ul className="text-xs text-gray-400 font-montserrat mb-4 space-y-1">
                    {product.features.slice(0, 2).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-red-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-orbitron font-bold text-red-500">
                      ${product.price.toLocaleString()}
                    </div>
                    
                    <Button
                      className="rocket-button bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Agregar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            className="checkout-panel max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-orbitron font-bold text-white">
                  CENTRO DE CONTROL - CHECKOUT
                </h2>
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowCheckout(false)}
                >
                  <Package className="w-8 h-8" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cart Items */}
                <div>
                  <h3 className="text-xl font-rajdhani font-bold text-white mb-6">
                    INVENTARIO DE MISIÓN
                  </h3>
                  
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="font-rajdhani">Carrito vacío</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                          <img  
                            className="w-16 h-16 object-cover rounded"
                            alt={item.name}
                           src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                          
                          <div className="flex-1">
                            <h4 className="font-rajdhani font-semibold text-white">
                              {item.name}
                            </h4>
                            <p className="text-red-500 font-orbitron font-bold">
                              ${item.price.toLocaleString()}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-white hover:bg-gray-600"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-white font-rajdhani">
                              {item.quantity}
                            </span>
                            <button
                              className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-white hover:bg-gray-600"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="text-red-500 hover:text-red-400 ml-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {cart.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <div className="flex justify-between items-center text-xl font-orbitron font-bold">
                        <span className="text-white">TOTAL:</span>
                        <span className="text-red-500">${getTotalPrice().toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Customer Information */}
                <div>
                  <h3 className="text-xl font-rajdhani font-bold text-white mb-6">
                    DATOS DEL ASTRONAUTA
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                        Nombre Completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                          placeholder="Tu nombre completo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          placeholder="astronauta@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                        Teléfono *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          placeholder="+57 300 123 4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                        Dirección de Entrega *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none resize-none"
                          rows="3"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                          placeholder="Dirección completa de entrega"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-8 rocket-button bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 text-lg font-rajdhani font-semibold pulse-glow"
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                  >
                    <CreditCard className="w-6 h-6 mr-2" />
                    Procesar Orden
                    <Flame className="w-5 h-5 ml-2" />
                  </Button>

                  <div className="text-center mt-4 text-sm font-montserrat text-gray-400">
                    Envío gratuito en órdenes superiores a $200.000
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Store;