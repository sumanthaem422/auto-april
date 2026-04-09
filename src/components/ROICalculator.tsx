import { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { Calculator, TrendingUp, Clock, DollarSign, Bot } from 'lucide-react';

export function ROICalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [leads, setLeads] = useState(500);
  const [hourlyRate, setHourlyRate] = useState(currency === 'USD' ? 25 : 500);
  const [hoursPerLead, setHoursPerLead] = useState(0.5);

  // Adjust default hourly rate when currency changes if user hasn't touched it much
  // For simplicity, we just calculate based on current state.
  
  const manualCostPerMonth = leads * hoursPerLead * hourlyRate;
  const aiCostPerMonth = currency === 'USD' ? 299 : 24999; // Example fixed AI cost
  const monthlySavings = manualCostPerMonth - aiCostPerMonth;
  const annualSavings = monthlySavings * 12;

  return (
    <section id="roi" className="py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg border border-border text-xs font-medium text-brand mb-6 uppercase tracking-widest">
              <Calculator className="w-3 h-3" />
              Revenue Leak Calculator
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Stop bleeding money on manual follow-ups.
            </h2>
            <p className="text-text-muted text-lg mb-10">
              Calculate exactly how much your current manual processes are costing you, and see the immediate ROI of implementing Autoflowmation.
            </p>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium uppercase tracking-wider text-text-muted">Monthly Leads</label>
                  <span className="font-mono">{leads}</span>
                </div>
                <input 
                  type="range" 
                  min="50" max="5000" step="50"
                  value={leads}
                  onChange={(e) => setLeads(Number(e.target.value))}
                  className="w-full accent-brand"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium uppercase tracking-wider text-text-muted">Staff Hourly Rate</label>
                  <span className="font-mono">{formatCurrency(hourlyRate)}/hr</span>
                </div>
                <input 
                  type="range" 
                  min={currency === 'USD' ? 10 : 100} 
                  max={currency === 'USD' ? 100 : 2000} 
                  step={currency === 'USD' ? 5 : 50}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-brand"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium uppercase tracking-wider text-text-muted">Hours Spent per Lead</label>
                  <span className="font-mono">{hoursPerLead} hrs</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" max="2" step="0.1"
                  value={hoursPerLead}
                  onChange={(e) => setHoursPerLead(Number(e.target.value))}
                  className="w-full accent-brand"
                />
              </div>
            </div>
          </div>

          <div className="bg-bg border border-border rounded-3xl p-8 relative overflow-hidden">
            <h3 className="text-xl font-display font-medium mb-8">Your Potential Impact</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center pb-6 border-b border-border/50">
                <div className="flex items-center gap-3 text-text-muted">
                  <Clock className="w-5 h-5" />
                  <span>Manual Cost / Month</span>
                </div>
                <span className="font-mono text-xl">{formatCurrency(manualCostPerMonth)}</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-border/50">
                <div className="flex items-center gap-3 text-text-muted">
                  <Bot className="w-5 h-5" />
                  <span>AI Cost / Month</span>
                </div>
                <span className="font-mono text-xl">{formatCurrency(aiCostPerMonth)}</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 text-text-main mb-2 uppercase tracking-widest text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Annual Savings
              </div>
              <div className="text-5xl font-display font-bold text-text-main mb-2">
                {formatCurrency(Math.max(0, annualSavings))}
              </div>
              <p className="text-sm text-text-muted">Plus increased conversion rates from instant 24/7 responses.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
