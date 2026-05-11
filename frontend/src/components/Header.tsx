import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';
import logoColig from '../assets/logo_colig.png';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Quem Somos', path: '/#about' },
    { name: 'Ligas', path: '/#ligas' },
    { name: 'Eventos', path: '/#events' },
    { name: 'Notícias', path: '/#news' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'bg-bg-deep/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-black/50 ring-1 ring-primary/20 transition-[box-shadow,background-color] group-hover:bg-black/60 group-hover:ring-primary/40">
            <img
              src={logoColig}
              alt=""
              className="h-7 w-7 sm:h-9 sm:w-9 object-contain"
              decoding="async"
            />
          </div>
          <span className="text-xl font-bold tracking-tight">COLIG</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          {isAuthenticated ? (
            <Link
              to="/admin"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/10"
            >
              Painel Admin
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-primary hover:bg-light-teal text-white text-sm font-medium transition-colors"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-bg-deep border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-lg font-medium text-white/80 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-white/10 my-2" />
          {isAuthenticated ? (
            <Link
              to="/admin"
              className="text-lg font-medium text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Painel Admin
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-lg font-medium text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </motion.div>
      )}
    </header>
  );
}
