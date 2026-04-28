import { motion } from 'motion/react';
import { Phone, Code, Rocket } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Phone,
      title: "Book Free Audit",
      description: "30-min strategy call. We map your full automation potential and identify revenue leaks.",
      timeline: "Day 1",
      badge: "Discovery"
    },
    {
      number: "02",
      icon: Code,
      title: "We Build for You",
      description: "Custom AI agent built in 7–14 days, tuned to your business data, tone, and SOPs.",
      timeline: "Days 2–14",
      badge: "Development"
    },
    {
      number: "03",
      icon: Rocket,
      title: "Go Live",
      description: "24/7 automated operations. Your team focuses on closing, not chasing leads.",
      timeline: "Day 15+",
      badge: "Autopilot"
    }
  ];

  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-heading">From Signup to Autopilot in 3 Steps</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto font-medium">
            Most businesses go live within 7–14 days. Our streamlined process ensures zero friction and maximum efficiency.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-0.5 bg-dashed border-t-2 border-dashed border-brand/20 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="bg-white border border-border p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group w-full h-full flex flex-col items-center text-center">
                <div className="absolute -top-4 left-10 bg-brand text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-brand/20 uppercase tracking-widest">
                  {step.badge}
                </div>
                
                <div className="w-20 h-20 rounded-3xl bg-brand/5 flex items-center justify-center mb-8 relative">
                  <step.icon className="w-10 h-10 text-brand" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-heading text-white text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold mb-4 text-heading">{step.title}</h3>
                <p className="text-text-muted leading-relaxed font-medium mb-6">
                  {step.description}
                </p>

                <div className="mt-auto pt-6 border-t border-border w-full">
                  <span className="text-brand font-black text-sm uppercase tracking-widest">{step.timeline}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
