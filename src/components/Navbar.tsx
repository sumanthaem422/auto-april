import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled ? 'bg-white border-border py-4' : 'bg-white/90 border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-11 h-11 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform duration-300">
            <Bot className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-display font-bold leading-none tracking-tight flex items-center">
              <span className="text-heading">Auto</span>
              <span className="text-brand">Flowmation</span>
            </span>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mt-1.5 group-hover:text-brand transition-colors">Enterprise AI</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <a href="/#services" className="text-[13px] font-bold text-heading hover:text-brand transition-colors uppercase tracking-[0.05em]">Services</a>
          <a href="/#livelab" className="text-[13px] font-bold text-heading hover:text-brand transition-colors uppercase tracking-[0.05em]">Live Lab</a>
          <a href="/#case-studies" className="text-[13px] font-bold text-heading hover:text-brand transition-colors uppercase tracking-[0.05em]">Case Studies</a>
          <a href="/#roi" className="text-[13px] font-bold text-heading hover:text-brand transition-colors uppercase tracking-[0.05em]">ROI</a>
          <a href="/#pricing" className="text-[13px] font-bold text-heading hover:text-brand transition-colors uppercase tracking-[0.05em]">Pricing</a>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button className="bg-brand text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand/90 transition-all shadow-sm flex items-center gap-2">
            Book Free Audit <span className="text-lg">→</span>
          </button>
        </div>

        <button
          className="lg:hidden text-heading"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 top-[73px] bg-white z-40 p-6 flex flex-col gap-6 lg:hidden"
        >
          <a href="/#services" className="text-[15px] font-bold text-heading uppercase tracking-widest border-b border-border pb-4" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="/#livelab" className="text-[15px] font-bold text-heading uppercase tracking-widest border-b border-border pb-4" onClick={() => setIsMobileMenuOpen(false)}>Live Lab</a>
          <a href="/#case-studies" className="text-[15px] font-bold text-heading uppercase tracking-widest border-b border-border pb-4" onClick={() => setIsMobileMenuOpen(false)}>Case Studies</a>
          <a href="/#roi" className="text-[15px] font-bold text-heading uppercase tracking-widest border-b border-border pb-4" onClick={() => setIsMobileMenuOpen(false)}>ROI</a>
          <a href="/#pricing" className="text-[15px] font-bold text-heading uppercase tracking-widest border-b border-border pb-4" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          
          <div className="mt-auto flex flex-col gap-4">
            <button className="bg-green py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2">
              Get Started
            </button>
            <button className="bg-brand py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2">
              Book Free Audit <span className="text-xl">→</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
