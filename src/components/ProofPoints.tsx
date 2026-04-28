import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const industries = [
  {
    name: 'Real Estate',
    slug: 'realestate',
    metric: 'Lead Qualification',
    increase: '+340%',
    savings: '25% – 45%',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Healthcare & Clinics',
    slug: 'healthcare',
    metric: 'Appointment Booking',
    increase: '+215%',
    savings: '30% – 50%',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Fitness & Wellness',
    slug: 'fitness',
    metric: 'Member Retention',
    increase: '+180%',
    savings: '20% – 40%',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Financial Services & Banking',
    slug: 'bfsi',
    metric: 'Client Onboarding',
    increase: '+280%',
    savings: '30% – 60%',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    metric: 'Supply Chain Queries',
    increase: '+190%',
    savings: '20% – 50%',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5e8a?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Retail & E-commerce',
    slug: 'ecommerce',
    metric: 'Customer Support',
    increase: '+410%',
    savings: '30% – 45%',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Transportation & Logistics',
    slug: 'logistics',
    metric: 'Dispatch Automation',
    increase: '+220%',
    savings: '25% – 50%',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Education',
    slug: 'edtech',
    metric: 'Student Enrollment',
    increase: '+150%',
    savings: '20% – 35%',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Energy',
    slug: 'energy',
    metric: 'Outage Reporting',
    increase: '+310%',
    savings: '30% – 55%',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80'
  }
];

export function ProofPoints() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-xs font-black uppercase tracking-[0.2em] mb-6">
              Industries
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-heading leading-tight tracking-tight">Proven Across Industries</h2>
            <p className="text-text-muted text-xl font-medium">
              See how businesses in your sector are leveraging Autoflowmation to scale without adding headcount.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center text-heading hover:bg-brand hover:text-white transition-all shadow-md group active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center text-heading hover:bg-brand hover:text-white transition-all shadow-md group active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {industries.map((industry) => (
            <Link 
              key={industry.name} 
              to={`/${industry.slug}`}
              className="w-[85vw] md:w-[450px] flex-none snap-start bg-bg-secondary border border-border rounded-[3rem] overflow-hidden shadow-sm group hover:shadow-xl transition-all flex flex-col h-full"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={industry.image} 
                  alt={industry.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8">
                  <h3 className="text-3xl font-display font-bold text-white tracking-tight">{industry.name}</h3>
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col justify-between gap-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-black text-heading opacity-50 uppercase tracking-[0.2em] mb-2">{industry.metric}</p>
                    <p className="text-3xl font-display font-black text-brand tracking-tight">{industry.increase}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-heading opacity-50 uppercase tracking-[0.2em] mb-2">OpEx Savings</p>
                    <p className="text-2xl font-display font-bold text-heading tracking-tight">
                      {industry.savings}
                    </p>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-bold text-heading">Ready to scale?</span>
                  <div className="text-brand font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    View Case Study <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
