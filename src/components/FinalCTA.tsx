import { Bot, ArrowRight } from 'lucide-react';
import { trackInteraction } from '../lib/analytics';

export function FinalCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0D1B2A] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-brand/20 flex items-center justify-center mx-auto mb-8">
              <Bot className="w-8 h-8 text-brand" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
              Ready to Automate <br className="hidden md:block" /> Your Business?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
              Join 500+ enterprise partners running on Autoflowmation AI. Your operations can be on autopilot in as little as 14 days.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => trackInteraction('roi', 'book_audit_footer')}
                className="bg-brand text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand/90 transition-all shadow-xl shadow-brand/20 flex items-center gap-2 w-full sm:w-auto"
              >
                Book Free Audit <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-8 text-white/40 text-sm font-bold uppercase tracking-[0.2em]">
              <span>24/7 Deployment</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>Full Setup Included</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>Zero Leakage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
