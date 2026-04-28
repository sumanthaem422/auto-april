import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Sandeep Varma",
      business: "Varma Real Estate",
      location: "Enterprise Partner",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sandeep",
      quote: "Before Autoflowmation, our team spent 4 hours a day manually calling back cold leads. Now, the AI qualifies everyone instantly. It's like having 10 extra employees who never sleep.",
      before: "4 hrs/day manual follow-up",
      after: "0 hrs — fully automated"
    },
    {
      name: "Dr. Ananya Reddy",
      business: "Lotus Wellness Clinic",
      location: "Kondapur",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
      quote: "Our appointments have increased by 40% because the AI responds to inquiries in under 5 seconds. Patients love the instant confirmation, and my staff loves the reduced phone call volume.",
      before: "30% lead leakage rate",
      after: "Zero leakage — 24/7 coverage"
    },
    {
      name: "Vikram Mehta",
      business: "GlowFit Gyms",
      location: "Gachibowli",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
      quote: "The voice agent sounds incredibly human. Most of our members don't even realize they're talking to an AI when they call to reschedule. Best investment we've made this year.",
      before: "Missed 20+ calls/weekend",
      after: "100% call answered rate"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-heading mb-4">What Our Clients Say</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Real businesses getting real results with autonomous AI operations.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white border border-border p-8 rounded-[2rem] shadow-sm flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full bg-bg-secondary" />
                <div>
                  <div className="flex gap-0.5 text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <h4 className="font-bold text-heading text-sm">{t.name}</h4>
                </div>
              </div>

              <p className="text-heading font-medium italic leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </p>

              <div className="border-t border-border pt-6 mt-auto">
                <p className="text-xs font-bold text-heading uppercase tracking-widest mb-1">{t.business}</p>
                <div className="flex flex-col gap-1 text-sm font-medium">
                  <span className="text-text-muted line-through opacity-70 mb-1">{t.before}</span>
                  <span className="text-brand font-bold bg-brand/5 px-3 py-1 rounded-lg w-max">{t.after}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
