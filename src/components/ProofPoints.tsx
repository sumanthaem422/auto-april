import { useCurrency } from '../context/CurrencyContext';

const industries = [
  {
    name: 'Real Estate',
    metric: 'Lead Qualification',
    increase: '+340%',
    savingsUSD: 45000,
    savingsINR: 3700000,
    image: 'https://picsum.photos/seed/realestate/600/400'
  },
  {
    name: 'Healthcare & Clinics',
    metric: 'Appointment Booking',
    increase: '+215%',
    savingsUSD: 28000,
    savingsINR: 2300000,
    image: 'https://picsum.photos/seed/healthcare/600/400'
  },
  {
    name: 'Fitness & Wellness',
    metric: 'Member Retention',
    increase: '+180%',
    savingsUSD: 15000,
    savingsINR: 1200000,
    image: 'https://picsum.photos/seed/fitness/600/400'
  }
];

export function ProofPoints() {
  const { currency, formatCurrency } = useCurrency();

  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Proven Across Industries</h2>
          <p className="text-text-muted max-w-2xl">
            See how businesses in Hyderabad are leveraging Autoflowmation to scale without adding headcount.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <div key={industry.name} className="group relative overflow-hidden rounded-3xl border border-border bg-bg">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={industry.image} 
                  alt={industry.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-display font-bold mb-6">{industry.name}</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-text-muted uppercase tracking-widest mb-1">{industry.metric}</p>
                    <p className="text-3xl font-mono text-brand">{industry.increase}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted uppercase tracking-widest mb-1">Annual Savings</p>
                    <p className="text-2xl font-mono">
                      {formatCurrency(currency === 'USD' ? industry.savingsUSD : industry.savingsINR)}
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
