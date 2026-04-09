import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Bot } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
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
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
            AI THAT OPERATES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-500">YOUR BUSINESS</span>
          </h1>
          
          <p className="text-lg text-text-muted mb-10 max-w-xl leading-relaxed">
            We eliminate manual operational bottlenecks for high-growth businesses in Hyderabad. 24/7 WhatsApp AI agents, automated lead qualification, and document processing.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
            <button className="bg-brand text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-brand/90 transition-colors w-full sm:w-auto justify-center">
              Deploy Your Agent <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 rounded-full font-semibold border border-border hover:bg-card transition-colors w-full sm:w-auto text-center">
              View Case Studies
            </button>
          </div>

          <div className="flex items-center gap-6 pt-8 border-t border-border/50">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/100/100`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-bg"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-brand mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-text-muted font-medium">Trusted by 500+ businesses</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[400px]"
        >
          {/* Phone Frame Mockup */}
          <div className="relative rounded-[2.5rem] border-[8px] border-gray-200 bg-bg overflow-hidden shadow-2xl aspect-[9/19]">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-gray-200 rounded-b-3xl w-1/2 mx-auto z-20" />
            
            {/* Chat Interface */}
            <div className="absolute inset-0 flex flex-col bg-card">
              <div className="pt-12 pb-4 px-6 border-b border-border bg-card/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Autoflow AI</h3>
                    <p className="text-xs text-brand flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" /> Online
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden relative">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-card border border-border p-3 rounded-2xl rounded-tl-sm max-w-[85%] self-start text-sm"
                >
                  Hi! I noticed you're looking for a new property in Jubilee Hills. Are you looking for commercial or residential?
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 }}
                  className="bg-brand text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] self-end text-sm font-medium"
                >
                  Commercial space for a new clinic. Around 2000 sqft.
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4 }}
                  className="bg-card border border-border p-3 rounded-2xl rounded-tl-sm max-w-[85%] self-start text-sm"
                >
                  Perfect. I have 3 premium listings matching that in Jubilee Hills. Would you like me to schedule a viewing with our senior agent tomorrow at 10 AM?
                </motion.div>

                {/* Typing indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 5.5, duration: 1.5, repeat: Infinity }}
                  className="bg-card border border-border p-3 rounded-2xl rounded-tl-sm self-start flex gap-1 w-12"
                >
                  <span className="w-1.5 h-1.5 bg-text-muted rounded-full" />
                  <span className="w-1.5 h-1.5 bg-text-muted rounded-full" />
                  <span className="w-1.5 h-1.5 bg-text-muted rounded-full" />
                </motion.div>
              </div>
              
              <div className="p-4 border-t border-border bg-card">
                <div className="h-10 rounded-full bg-bg border border-border flex items-center px-4">
                  <span className="text-text-muted text-sm">Type a message...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badges */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute top-32 -right-12 bg-card border border-border p-3 rounded-xl shadow-xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Lead Qualified</p>
              <p className="text-text-muted text-xs">Instantly</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
