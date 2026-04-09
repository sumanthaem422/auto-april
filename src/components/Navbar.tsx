import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Bot } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

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
          <a href="#pricing" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors uppercase tracking-widest">Pricing</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex bg-card rounded-full p-1 border border-border">
            <button
              onClick={() => setCurrency('USD')}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                currency === 'USD' ? 'bg-brand text-brand-text' : 'text-text-muted hover:text-text-main'
              )}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                currency === 'INR' ? 'bg-brand text-brand-text' : 'text-text-muted hover:text-text-main'
              )}
            >
              INR
            </button>
          </div>
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
          <a href="#pricing" className="text-sm font-medium text-text-muted uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex bg-bg rounded-full p-1 border border-border">
              <button
                onClick={() => setCurrency('USD')}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                  currency === 'USD' ? 'bg-brand text-brand-text' : 'text-text-muted'
                )}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                  currency === 'INR' ? 'bg-brand text-brand-text' : 'text-text-muted'
                )}
              >
                INR
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
