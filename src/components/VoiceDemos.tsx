import React, { useState, useRef } from 'react';
import { Play, Pause, Phone, Volume2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { trackInteraction } from '../lib/analytics';

const categories = ['Ecommerce', 'EdTech', 'HealthTech', 'BFSI', 'Hospitality', 'Real Estate', 'Logistics'];

const agentsData = {
  Ecommerce: [
    {
      id: 'e1',
      title: 'Customer Support Agent',
      tags: ['Inbound Support', 'English'],
      desc: 'Listen to the AI handle a customer asking about a delayed refund, showing empathy and resolving the issue instantly.',
      handles: ['Refund status inquiries', 'Order tracking & updates', 'Return policy guidance'],
      phone: '+91 8035 317 400',
      duration: '0:45',
      audioSrc: ''
    },
    {
      id: 'e2',
      title: 'Cart Abandonment Agent',
      tags: ['Outbound Sales', 'English + Hindi'],
      desc: 'Hear how the AI proactively calls a customer to offer a discount on items left in their cart, successfully closing the sale.',
      handles: ['Personalized discount offers', 'Address verification', 'Payment issue resolution'],
      phone: '+91 8035 317 449',
      duration: '1:12',
      audioSrc: ''
    }
  ],
  'Real Estate': [
    {
      id: 'r1',
      title: 'Property Inquiry Agent',
      tags: ['Lead Qualification', 'Multiple Languages'],
      desc: 'AI handles high-intent callers looking for premium listings, qualifying them based on budget and preferred location.',
      handles: ['Pre-screening based on budget', 'Sharing project brochures', 'Scheduling site visits'],
      phone: '+91 8035 317 500',
      duration: '1:05',
      audioSrc: ''
    }
  ],
  Logistics: [
    {
      id: 'l1',
      title: 'Dispatch Support Agent',
      tags: ['Operations', 'Hindi + English'],
      desc: 'Managing real-time queries from delivery partners and customers regarding parcel status and delivery windows.',
      handles: ['Route optimization updates', 'Delivery window confirmation', 'Address clarification calls'],
      phone: '+91 8035 317 600',
      duration: '0:55',
      audioSrc: ''
    }
  ],
  EdTech: [],
  HealthTech: [],
  BFSI: [],
  Hospitality: []
};

// Simulated Waveform Component for better Audio UX
const Waveform = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <div className="flex items-center gap-[3px] h-8 mx-4 flex-1 justify-center opacity-70">
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-brand rounded-full"
          animate={{
            height: isPlaying ? ['20%', '100%', '30%', '80%', '20%'] : '20%',
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut"
          }}
          style={{ height: '20%' }}
        />
      ))}
    </div>
  );
};

export function VoiceDemos() {
  const [activeTab, setActiveTab] = useState('Ecommerce');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (id: string, src: string) => {
    if (playingId === id) {
      setPlayingId(null);
      audioRef.current?.pause();
    } else {
      setPlayingId(id);
      trackInteraction('voice', `play_demo_${id}`);
      setTimeout(() => {
        setPlayingId((current) => current === id ? null : current);
      }, 5000);
    }
  };

  const currentAgents = agentsData[activeTab as keyof typeof agentsData] || [];

  return (
    <section className="py-24 bg-white border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Volume2 className="w-4 h-4" />
            Hear Them In Action
          </div>
          <h2 className="text-5xl font-display font-bold mb-6 text-heading leading-tight">Experience Our Voice Agents</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-xl font-medium mb-10">
            Don't just take our word for it. Listen to real recordings of our AI handling complex conversations, or call the numbers to try them yourself.
          </p>

          <div className="bg-bg-secondary inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-border">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-bold text-heading">🎧 Real recordings. Real conversations. Call the numbers to try it live.</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-bg-secondary border border-border p-2 rounded-[2rem] inline-flex overflow-x-auto max-w-full hide-scrollbar shadow-sm">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                  activeTab === cat 
                    ? "bg-brand text-white shadow-xl shadow-brand/20" 
                    : "text-text-muted hover:text-heading hover:bg-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {currentAgents.map(agent => (
            <div key={agent.id} className="bg-bg-secondary border border-border rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all flex flex-col group h-full">
              
              {/* Header */}
              <div className="flex justify-between items-start mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold font-display text-heading mb-3">{agent.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-white text-heading border border-border rounded-xl text-xs font-bold uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-muted leading-relaxed font-medium mb-8">
                {agent.desc}
              </p>

              {/* What this agent handles */}
              <div className="mb-8 p-6 bg-white rounded-2xl border border-border">
                <p className="text-xs font-bold text-heading uppercase tracking-widest mb-4">What this agent handles:</p>
                <ul className="space-y-3">
                  {agent.handles?.map((h, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-heading">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Audio Player UX */}
              <div className="bg-white rounded-2xl p-5 mb-8 border border-border flex items-center gap-4 shadow-sm">
                <button 
                  onClick={() => togglePlay(agent.id, agent.audioSrc)}
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all shadow-md",
                    playingId === agent.id 
                      ? "bg-heading text-white" 
                      : "bg-brand text-white hover:scale-105 active:scale-95"
                  )}
                >
                  {playingId === agent.id ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-heading truncate">Sample Recording</div>
                  <div className="text-xs text-text-muted font-medium">{playingId === agent.id ? 'Playing...' : agent.duration}</div>
                </div>

                <Waveform isPlaying={playingId === agent.id} />
              </div>

              {/* Live Demo CTA */}
              <div className="mt-auto pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-sm text-text-muted font-bold uppercase tracking-widest">
                  Try it live:
                </div>
                <a 
                  href={`tel:${agent.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 px-8 py-4 bg-green-bg text-green hover:bg-green-bg/80 rounded-2xl font-bold transition-all w-full sm:w-auto justify-center border-2 border-green/20 shadow-sm"
                >
                  <Phone className="w-5 h-5" />
                  {agent.phone}
                </a>
              </div>
            </div>
          ))}
          
          {currentAgents.length === 0 && (
            <div className="col-span-2 text-center py-24 text-text-muted border-4 border-dashed border-border rounded-[3rem] bg-bg-secondary">
              <div className="w-20 h-20 bg-white shadow-sm border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                <Volume2 className="w-10 h-10 text-brand opacity-50" />
              </div>
              <p className="font-bold text-heading text-2xl mb-3">Training in Progress</p>
              <p className="text-lg font-medium">We are currently fine-tuning our voice agents for the {activeTab} sector.</p>
            </div>
          )}
        </div>

        {/* CTA Banner */}
        <div className="bg-brand rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl shadow-brand/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 relative z-10">Want a voice agent trained on YOUR business?</h3>
          <p className="text-white/80 text-lg mb-10 relative z-10 font-medium">Impressed? We'll build a custom voice agent for your business in 7 days.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <button className="bg-white text-brand px-10 py-5 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-xl flex items-center gap-2">
              Build My Voice Agent <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-brand-hover text-white px-10 py-5 rounded-full font-bold text-lg border border-white/20 transition-all flex items-center gap-2">
              Talk to Expert
            </button>
          </div>
          <p className="mt-8 text-white/60 text-sm font-bold uppercase tracking-[0.2em]">🔥 47 businesses have tried these agents this month</p>
        </div>
        
        {/* Hidden audio element for future use */}
        <audio ref={audioRef} className="hidden" onEnded={() => setPlayingId(null)} />
      </div>
    </section>
  );
}
