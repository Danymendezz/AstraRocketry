import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Menu, 
  X, 
  Users, 
  Ticket, 
  Heart, 
  ShoppingBag, 
  BookOpen, 
  BarChart3,
  Settings,
  LogIn,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

const Header = ({ isAuthenticated, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const publicNavItems = [
    { path: '/', label: 'Inicio', icon: Rocket },
    { path: '/about', label: 'Nosotros', icon: Users },
    { path: '/raffles', label: 'Rifas', icon: Ticket },
    { path: '/donations', label: 'Donaciones', icon: Heart },
    { path: '/store', label: 'Tienda', icon: ShoppingBag },
    { path: '/blog', label: 'Blog', icon: BookOpen },
  ];

  const authenticatedNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  const navItems = isAuthenticated ? [...publicNavItems, ...authenticatedNavItems] : publicNavItems;

  const isActive = (path) => location.pathname === path;

  const onLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 glass-effect border-b ${theme === 'dark' ? 'border-red-500/30' : 'border-border'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className={`w-8 h-8 text-red-500 ${theme === 'dark' ? 'rocket-launch' : ''}`} />
              {theme === 'dark' && <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-8 thruster-effect rounded-full opacity-70"></div>}
            </motion.div>
            <div>
              <span className={`text-2xl font-orbitron font-bold ${theme === 'dark' ? 'text-white neon-text-subtle' : 'text-foreground'}`}>
                ASTRA
              </span>
              <span className="text-xl font-rajdhani text-red-500 ml-1">
                ROCKETRY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? `${theme === 'dark' ? 'bg-red-500/20 text-red-400 glow-red-subtle' : 'bg-primary/10 text-primary'}`
                      : `${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-rajdhani font-medium">{item.label}</span>
                </Link>
              );
            })}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                onClick={onLogoutClick}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-red-500/20' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
              >
                <LogOut className="w-4 h-4" />
                <span className="font-rajdhani font-medium">Salir</span>
              </Button>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive("/login")
                    ? `${theme === 'dark' ? 'bg-red-500/20 text-red-400 glow-red-subtle' : 'bg-primary/10 text-primary'}`
                    : `${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span className="font-rajdhani font-medium">Login</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`${theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-blue-600 hover:text-blue-500'} ml-2`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`${theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-blue-600 hover:text-blue-500'} mr-2`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`${theme === 'dark' ? 'text-white hover:bg-red-500/20' : 'text-foreground hover:bg-accent'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className={`lg:hidden mt-4 ${theme === 'dark' ? 'space-panel' : 'bg-card border border-border'} rounded-lg p-4`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? `${theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-primary/10 text-primary'}`
                      : `${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-rajdhani font-medium">{item.label}</span>
                </Link>
              );
            })}
             {isAuthenticated ? (
              <Button
                variant="ghost"
                onClick={() => { onLogoutClick(); setIsMenuOpen(false); }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 w-full justify-start ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-red-500/20' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-rajdhani font-medium">Salir</span>
              </Button>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive("/login")
                    ? `${theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-primary/10 text-primary'}`
                    : `${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
                <span className="font-rajdhani font-medium">Login</span>
              </Link>
            )}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;