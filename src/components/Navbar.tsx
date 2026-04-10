import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Bot } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'bg-bg/80 backdrop-blur-md border-border py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-8 h-8 text-brand" />
          <span className="font-display font-bold text-xl tracking-tight">Autoflowmation.ai</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors uppercase tracking-widest">Services</a>
          <a href="#live-lab" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors uppercase tracking-widest">Live Lab</a>
          <a href="#roi" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors uppercase tracking-widest">ROI</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="bg-brand text-brand-text px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">
            Book Audit
          </button>
        </div>

        <button
          className="md:hidden text-text-main"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-card border-b border-border p-6 flex flex-col gap-4 md:hidden"
        >
          <a href="#services" className="text-sm font-medium text-text-muted uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#live-lab" className="text-sm font-medium text-text-muted uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Live Lab</a>
          <a href="#roi" className="text-sm font-medium text-text-muted uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>ROI</a>
        </motion.div>
      )}
    </header>
  );
}
