import { Check } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { cn } from '../lib/utils';

const tiers = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses looking to automate basic inquiries.',
    priceUSD: 299,
    priceINR: 24999,
    features: [
      '1 AI Agent (Dedicated Channel)',
      'Up to 1,000 conversations/mo',
      'Basic FAQ Training',
      'Email Support',
      'Standard Analytics'
    ]
  },
  {
    name: 'Professional',
    description: 'For growing businesses needing advanced qualification and booking.',
    priceUSD: 799,
    priceINR: 64999,
    popular: true,
    features: [
      '3 AI Agents (Omnichannel)',
      'Up to 5,000 conversations/mo',
      'Custom SOP Training',
      'CRM Integration (HubSpot, etc.)',
      'Priority Support',
      'Advanced Analytics Dashboard'
    ]
  },
  {
    name: 'Enterprise',
    description: 'Custom autonomous systems for high-volume operations.',
    priceUSD: 'Custom',
    priceINR: 'Custom',
    features: [
      'Unlimited AI Agents',
      'Unlimited conversations',
      'Voice Synthesis Agents',
      'Custom API Integrations',
      'Dedicated Success Manager',
      'On-premise Deployment Options'
    ]
  }
];

export function Pricing() {
  const { currency, formatCurrency } = useCurrency();

  return (
    <section id="pricing" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Transparent Pricing</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Invest in infrastructure, not headcount. Choose the plan that fits your scale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={cn(
                "relative bg-card border rounded-3xl p-8 flex flex-col",
                tier.popular ? "border-brand shadow-lg bg-white" : "border-border shadow-sm"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold mb-2">{tier.name}</h3>
                <p className="text-text-muted text-sm h-10">{tier.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-display font-bold">
                    {typeof tier.priceUSD === 'number' 
                      ? formatCurrency(currency === 'USD' ? tier.priceUSD : tier.priceINR)
                      : tier.priceUSD}
                  </span>
                  {typeof tier.priceUSD === 'number' && <span className="text-text-muted">/mo</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-text-main shrink-0" />
                    <span className="text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-4 rounded-full font-semibold transition-colors",
                tier.popular 
                  ? "bg-brand text-white hover:opacity-90" 
                  : "bg-bg border border-border hover:bg-gray-50 text-text-main"
              )}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
