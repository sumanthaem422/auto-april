import { MessageSquare, PhoneCall, BrainCircuit, Zap, ArrowRight } from 'lucide-react';

export function BentoGrid() {
  const services = [
    {
      title: "Omni-Channel OS",
      description: "Turn your customer touchpoints into an autonomous sales engine. Qualify leads, book appointments, and answer FAQs 24/7 across chat, web, and email.",
      icon: MessageSquare,
      bullets: [
        "Multi-platform support",
        "Seamless CRM integration",
        "Autonomous B2B/B2C logic"
      ]
    },
    {
      title: "Voice Synthesis",
      description: "Human-like voice agents for inbound triage and outbound follow-ups with empathy and precision.",
      icon: PhoneCall,
      bullets: [
        "Human-like, empathetic tone",
        "Inbound + outbound calls",
        "Call transcripts & summaries"
      ]
    },
    {
      title: "Private LLMs",
      description: "Models trained exclusively on your business data and SOPs to ensure high accuracy and brand alignment.",
      icon: BrainCircuit,
      bullets: [
        "Trained on your SOPs & FAQs",
        "No data shared externally",
        "Custom persona & tone"
      ]
    },
    {
      title: "Autonomous Lead Flow",
      description: "Connect your ads directly to our AI agents. Instant response times mean higher conversion rates and zero leakage.",
      icon: Zap,
      bullets: [
        "Connects to Meta, Google Ads",
        "Responds in under 5 seconds",
        "Zero lead leakage guarantee"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-heading leading-tight">Everything Your Business Needs <br />to Run on Autopilot</h2>
          <p className="text-text-muted text-lg max-w-2xl font-medium">
            We build AI systems that handle your calls, chats, lead follow-ups, and more — while you focus on growing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="bg-bg-secondary border border-border shadow-sm rounded-3xl p-10 group hover:border-brand/40 transition-all hover:shadow-xl hover:shadow-brand/5 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center mb-8 shadow-lg shadow-brand/20">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold mb-4 text-heading">{service.title}</h3>
                <p className="text-text-muted mb-8 leading-relaxed font-medium">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-10">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-3 text-sm font-bold text-heading">
                      <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-brand" />
                      </div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#live-lab" className="text-brand font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
