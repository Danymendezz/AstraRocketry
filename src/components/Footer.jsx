import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone,
  Satellite
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const Footer = () => {
  const { theme } = useTheme();
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Mail, href: 'mailto:contact@astrarocketry.com', label: 'Email' },
  ];

  return (
    <footer className={`relative bg-gradient-to-t ${theme === 'dark' ? 'from-black via-gray-900' : 'from-gray-200 via-gray-100'} to-transparent border-t ${theme === 'dark' ? 'border-red-500/30' : 'border-border'} mt-20`}>
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="space-debris" style={{ top: '20%', animationDelay: '0s' }}></div>
          <div className="space-debris" style={{ top: '40%', animationDelay: '3s' }}></div>
          <div className="space-debris" style={{ top: '60%', animationDelay: '6s' }}></div>
          <div className="space-debris" style={{ top: '80%', animationDelay: '9s' }}></div>
        </div>
      )}

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <Rocket className="w-10 h-10 text-red-500 float-animation" />
                {theme === 'dark' && <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-12 thruster-effect rounded-full opacity-60"></div>}
              </div>
              <div>
                <span className={`text-3xl font-orbitron font-bold ${theme === 'dark' ? 'text-white neon-text-subtle' : 'text-foreground'}`}>
                  ASTRA
                </span>
                <span className="text-2xl font-rajdhani text-red-500 ml-1">
                  ROCKETRY
                </span>
              </div>
            </motion.div>
            
            <motion.p 
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-foreground/80'} font-montserrat leading-relaxed mb-6 max-w-md`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Impulsando el futuro de la cohetería universitaria a través de la innovación, 
              la educación y la exploración espacial. Únete a nuestra misión hacia las estrellas.
            </motion.p>

            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`w-12 h-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} rounded-full flex items-center justify-center ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'} hover:text-red-500 ${theme === 'dark' ? 'hover:bg-red-500/20' : 'hover:bg-red-100'} transition-all duration-300 orbital-ring`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    {social.label === 'Instagram' && theme === 'dark' && <Satellite className="w-3 h-3 absolute -top-1 -right-1 text-red-500 animate-pulse" />}
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-lg font-rajdhani font-semibold text-red-500 mb-4 block">
              Enlaces Rápidos
            </span>
            <ul className="space-y-3">
              {[
                'Sobre Nosotros',
                'Proyectos',
                'Competencias',
                'Talleres',
                'Galería',
                'Contacto'
              ].map((link, index) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-muted-foreground hover:text-foreground'} transition-colors duration-300 font-montserrat flex items-center space-x-2`}
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-lg font-rajdhani font-semibold text-red-500 mb-4 block">
              Centro de Control
            </span>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'} font-montserrat text-sm`}>
                  Universidad Tecnológica<br />
                  Campus Principal, Edificio de Ingeniería<br />
                  Laboratorio de Cohetería
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500" />
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'} font-montserrat text-sm`}>
                  +57 (1) 234-5678
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-500" />
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'} font-montserrat text-sm`}>
                  contact@astrarocketry.com
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-border'} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-muted-foreground/80'} font-montserrat text-sm mb-4 md:mb-0`}>
            © {new Date().getFullYear()} Astra Rocketry. Todos los derechos reservados. | Misión: Explorar el cosmos.
          </span>
          
          <div className={`flex items-center space-x-6 text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-muted-foreground/80'} font-montserrat`}>
            <a href="#" className="hover:text-red-500 transition-colors duration-300">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-red-500 transition-colors duration-300">
              Términos de Uso
            </a>
            <a href="#" className="hover:text-red-500 transition-colors duration-300">
              Código de Conducta
            </a>
          </div>
        </motion.div>

        {/* Rocket Launch Animation */}
        {theme === 'dark' && (
          <motion.div 
            className="absolute bottom-4 right-4 hidden lg:block"
            initial={{ y: 0 }}
            animate={{ y: [-5, -15, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <Rocket className="w-8 h-8 text-red-500 transform rotate-45" />
              <div className="absolute -bottom-2 -left-2 w-3 h-8 thruster-effect rounded-full opacity-70 transform -rotate-45"></div>
            </div>
          </motion.div>
        )}
      </div>
    </footer>
  );
};

export default Footer;