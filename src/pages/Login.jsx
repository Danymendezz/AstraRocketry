import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Rocket, Lock, User } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'astrarocketry' && password === 'astrarocketry!123') {
      localStorage.setItem('astraUser', JSON.stringify({ username }));
      onLogin();
      toast({
        title: "🚀 ¡Acceso Concedido!",
        description: "Bienvenido al centro de control, Comandante.",
      });
      navigate('/admin');
    } else {
      toast({
        title: "❌ Acceso Denegado",
        description: "Credenciales incorrectas. Intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 parallax-stars"></div>
      <motion.div
        className="max-w-md w-full space-y-8 checkout-panel p-10 rounded-xl shadow-2xl z-10"
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div>
          <motion.div
            className="mx-auto h-20 w-20 text-red-500 flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket className="h-16 w-16" />
          </motion.div>
          <h2 className="mt-6 text-center text-4xl font-orbitron font-extrabold text-white neon-text">
            ACCESO AL SISTEMA
          </h2>
          <p className="mt-2 text-center text-md font-rajdhani text-gray-300">
            Ingresa tus credenciales de Comandante.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm rounded-t-md"
                  placeholder="Usuario (astrarocketry)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm rounded-b-md"
                  placeholder="Contraseña (astrarocketry!123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900 rocket-button"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-red-300 group-hover:text-red-100" aria-hidden="true" />
              </span>
              Iniciar Sesión
            </Button>
          </div>
        </form>
        <p className="mt-6 text-center text-xs text-gray-500">
          Solo personal autorizado. Actividad monitoreada.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;