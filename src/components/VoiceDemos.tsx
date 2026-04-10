import React, { useState, useRef } from 'react';
import { Play, Pause, Phone, Volume2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const categories = ['Ecommerce', 'EdTech', 'HealthTech', 'BFSI', 'Hospitality'];

const agentsData = {
  Ecommerce: [
    {
      id: 'e1',
      title: 'Customer Support Agent',
      tags: ['Inbound Support', 'English'],
      desc: 'Listen to the AI handle a customer asking about a delayed refund, showing empathy and resolving the issue instantly.',
      phone: '+91 8035 317 400',
      duration: '0:45',
      audioSrc: '' // Dummy audio source
    },
    {
      id: 'e2',
      title: 'Cart Abandonment Agent',
      tags: ['Outbound Sales', 'English + Hindi'],
      desc: 'Hear how the AI proactively calls a customer to offer a discount on items left in their cart, successfully closing the sale.',
      phone: '+91 8035 317 449',
      duration: '1:12',
      audioSrc: ''
    },
    {
      id: 'e3',
      title: 'COD Confirmation Agent',
      tags: ['Logistics', 'English + Hindi'],
      desc: 'The AI calls to confirm a Cash-on-Delivery order and verifies the delivery address before dispatch.',
      phone: '+91 8035 317 450',
      duration: '0:30',
      audioSrc: ''
    },
    {
      id: 'e4',
      title: 'Recruitment Agent',
      tags: ['HR & Screening', 'English'],
      desc: 'Listen to the AI conduct a preliminary screening interview, asking about experience and availability.',
      phone: '+91 8035 317 441',
      duration: '1:45',
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
      // Simulate audio playing and stopping after 5 seconds for the dummy version
      setTimeout(() => {
        setPlayingId((current) => current === id ? null : current);
      }, 5000);
    }
  };

  const currentAgents = agentsData[activeTab as keyof typeof agentsData] || [];

  return (
    <section className="py-24 bg-gray-50 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-4">
            <Volume2 className="w-4 h-4" />
            Hear Them In Action
          </div>
          <h2 className="text-4xl font-display font-bold mb-4 text-gray-900">Experience Our Voice Agents</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Listen to real recordings of our AI handling complex conversations, or call the numbers to try them yourself.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white border border-gray-200 p-1.5 rounded-xl inline-flex overflow-x-auto max-w-full hide-scrollbar shadow-sm">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === cat 
                    ? "bg-brand text-white shadow-md" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {currentAgents.map(agent => (
            <div key={agent.id} className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-all flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between items-start mb-4 gap-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-gray-900 mb-2">{agent.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {agent.desc}
              </p>

              {/* Audio Player UX */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 flex items-center gap-4">
                <button 
                  onClick={() => togglePlay(agent.id, agent.audioSrc)}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm",
                    playingId === agent.id 
                      ? "bg-gray-900 text-white hover:bg-gray-800" 
                      : "bg-brand text-white hover:bg-brand/90 hover:scale-105"
                  )}
                >
                  {playingId === agent.id ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">Sample Recording</div>
                  <div className="text-xs text-gray-500">{playingId === agent.id ? 'Playing...' : agent.duration}</div>
                </div>

                <Waveform isPlaying={playingId === agent.id} />
              </div>

              {/* Live Demo CTA */}
              <div className="mt-auto pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600 font-medium">
                  Want to try it yourself?
                </div>
                <a 
                  href={`tel:${agent.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg font-semibold transition-colors w-full sm:w-auto justify-center border border-green-200"
                >
                  <Phone className="w-4 h-4" />
                  Call {agent.phone}
                </a>
              </div>
            </div>
          ))}
          
          {currentAgents.length === 0 && (
            <div className="col-span-2 text-center py-20 text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="font-semibold text-gray-900 text-lg mb-2">Training in Progress</p>
              <p>We are currently fine-tuning our voice agents for the {activeTab} sector.</p>
            </div>
          )}
        </div>
        
        {/* Hidden audio element for future use */}
        <audio ref={audioRef} className="hidden" onEnded={() => setPlayingId(null)} />
      </div>
    </section>
  );
}
