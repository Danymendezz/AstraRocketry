import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Raffles from '@/pages/Raffles';
import Donations from '@/pages/Donations';
import Store from '@/pages/Store';
import Blog from '@/pages/Blog';
import Dashboard from '@/pages/Dashboard';
import AdminPanel from '@/pages/AdminPanel';
import Login from '@/pages/Login';
import { ThemeProvider } from '@/components/ThemeProvider';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('astraUser');
    if (loggedInUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('astraUser');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="astra-ui-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
          <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <main className="pt-16"> {/* Added padding top to avoid overlap with fixed header */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/raffles" element={<Raffles />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/store" element={<Store />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;