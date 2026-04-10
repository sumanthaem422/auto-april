import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const industries = [
  {
    name: 'Real Estate',
    metric: 'Lead Qualification',
    increase: '+340%',
    savings: '25% – 45%',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Healthcare & Clinics',
    metric: 'Appointment Booking',
    increase: '+215%',
    savings: '30% – 50%',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Fitness & Wellness',
    metric: 'Member Retention',
    increase: '+180%',
    savings: '20% – 40%',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Financial Services & Banking',
    metric: 'Client Onboarding',
    increase: '+280%',
    savings: '30% – 60%',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Manufacturing',
    metric: 'Supply Chain Queries',
    increase: '+190%',
    savings: '20% – 50%',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5e8a?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Retail & E-commerce',
    metric: 'Customer Support',
    increase: '+410%',
    savings: '30% – 45%',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Transportation & Logistics',
    metric: 'Dispatch Automation',
    increase: '+220%',
    savings: '25% – 50%',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Education',
    metric: 'Student Enrollment',
    increase: '+150%',
    savings: '20% – 35%',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Energy',
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
    <section className="py-24 bg-gray-50 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">Proven Across Industries</h2>
            <p className="text-gray-600 text-lg">
              See how businesses are leveraging Autoflowmation to scale without adding headcount.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-brand hover:border-brand hover:bg-brand/5 transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-brand hover:border-brand hover:bg-brand/5 transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {industries.map((industry) => (
            <div 
              key={industry.name} 
              className="w-[85vw] md:w-[400px] flex-none snap-start bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-48 md:h-56 overflow-hidden relative">
                <img 
                  src={industry.image} 
                  alt={industry.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-display font-bold text-white">{industry.name}</h3>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{industry.metric}</p>
                    <p className="text-2xl font-mono font-bold text-brand">{industry.increase}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Cost Savings</p>
                    <p className="text-xl font-mono font-bold text-gray-900">
                      {industry.savings}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
