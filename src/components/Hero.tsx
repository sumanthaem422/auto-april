import { motion } from 'motion/react';
import { ArrowRight, Bot } from 'lucide-react';
import { trackInteraction } from '../lib/analytics';
import { PlatformFlow } from './PlatformFlow';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs font-medium text-brand mb-8 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            Enterprise AI Automation
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-black leading-[1.05] mb-8 text-heading tracking-tight">
            AI THAT <br />
            OPERATES <br />
            <span className="text-brand">YOUR BUSINESS</span>
          </h1>
          
          <p className="text-xl text-text-muted mb-10 max-w-xl leading-relaxed font-medium">
            We eliminate manual operational bottlenecks for high-growth B2B and B2C enterprises. 
            24/7 autonomous agents, automated lead qualification, and intelligent document processing.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <button 
              onClick={() => trackInteraction('roi', 'deploy_agent_hero')}
              className="bg-brand text-white px-10 py-4.5 rounded-full font-bold flex items-center gap-2 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 w-full sm:w-auto justify-center text-lg"
            >
              Deploy Your Agent <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => trackInteraction('roi', 'view_cases_hero')}
              className="px-10 py-4.5 rounded-full font-bold border-2 border-border hover:bg-bg-secondary transition-all w-full sm:w-auto text-center text-lg text-heading"
            >
              View Case Studies
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full"
        >
          <PlatformFlow />
        </motion.div>
      </div>
    </section>
  );
}

// Add infinite scroll animation to tailwind config or CSS
