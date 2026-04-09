import { MessageSquare, PhoneCall, BrainCircuit, Zap } from 'lucide-react';

export function BentoGrid() {
  return (
    <section id="services" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Infrastructure for Scale</h2>
          <p className="text-text-muted max-w-2xl">
            We don't just build chatbots. We deploy autonomous systems that handle your entire top-of-funnel operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 auto-rows-[300px]">
          {/* WhatsApp OS */}
          <div className="md:col-span-2 bg-card border border-border shadow-sm rounded-2xl p-8 relative overflow-hidden group hover:border-brand/30 transition-colors">
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-auto bg-gray-50">
                <MessageSquare className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">WhatsApp OS</h3>
                <p className="text-text-muted max-w-md">
                  Turn your WhatsApp into an autonomous sales engine. Qualify leads, book appointments, and answer FAQs 24/7 in multiple languages.
                </p>
              </div>
            </div>
          </div>

          {/* Voice Synthesis */}
          <div className="bg-card border border-border shadow-sm rounded-2xl p-8 relative overflow-hidden group hover:border-brand/30 transition-colors">
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-auto bg-gray-50">
                <PhoneCall className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold mb-2">Voice Synthesis</h3>
                <p className="text-text-muted text-sm">
                  Human-like voice agents for inbound triage and outbound follow-ups.
                </p>
              </div>
            </div>
          </div>

          {/* Private LLMs */}
          <div className="bg-card border border-border shadow-sm rounded-2xl p-8 relative overflow-hidden group hover:border-brand/30 transition-colors">
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-auto bg-gray-50">
                <BrainCircuit className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold mb-2">Private LLMs</h3>
                <p className="text-text-muted text-sm">
                  Models trained exclusively on your business data and SOPs.
                </p>
              </div>
            </div>
          </div>

          {/* Autonomous Lead Flow */}
          <div className="md:col-span-2 bg-card border border-border shadow-sm rounded-2xl p-8 relative overflow-hidden group hover:border-brand/30 transition-colors">
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-auto bg-gray-50">
                <Zap className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">Autonomous Lead Flow</h3>
                <p className="text-text-muted max-w-md">
                  Connect your ads directly to our AI agents. Instant response times mean higher conversion rates and zero lead leakage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
