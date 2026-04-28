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
  const aiCostPerMonth = currency === 'USD' ? 299 : 24999;
  const monthlySavings = manualCostPerMonth - aiCostPerMonth;
  const annualSavings = monthlySavings * 12;
  const savingsPercent = Math.max(0, Math.min(95, Math.round((monthlySavings / manualCostPerMonth) * 100)));

  return (
    <section id="roi" className="py-24 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Calculator className="w-4 h-4" />
              ROI Calculator
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 text-heading leading-tight">
              AI Pays For Itself. <br />Calculate Your ROI.
            </h2>
            <p className="text-text-muted text-xl mb-12 font-medium">
              See how much you save by replacing manual bottlenecks with autonomous AI agents. Higher conversion, lower overhead.
            </p>

            <div className="space-y-10">
              <div className="bg-bg-secondary p-8 rounded-[2rem] border border-border">
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-heading">Monthly Leads</label>
                  <span className="font-bold text-brand text-lg">{leads}</span>
                </div>
                <input 
                  type="range" 
                  min="50" max="5000" step="50"
                  value={leads}
                  onChange={(e) => setLeads(Number(e.target.value))}
                  className="w-full accent-brand h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-bg-secondary p-8 rounded-[2rem] border border-border">
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-heading">Staff Cost / Hour</label>
                  <span className="font-bold text-brand text-lg">{formatCurrency(hourlyRate)}/hr</span>
                </div>
                <input 
                  type="range" 
                  min={currency === 'USD' ? 10 : 100} 
                  max={currency === 'USD' ? 100 : 2000} 
                  step={currency === 'USD' ? 5 : 50}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-brand h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-heading rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[80px] rounded-full" />
            
            <h3 className="text-2xl font-display font-bold mb-10 text-white relative z-10 tracking-tight">Your Projected Impact</h3>
            
            <div className="space-y-8 mb-12 relative z-10">
              <div className="flex justify-between items-center pb-6 border-b border-white/10">
                <div className="flex items-center gap-4 text-gray-400">
                  <Bot className="w-6 h-6 text-brand" />
                  <span className="font-bold text-sm tracking-widest uppercase">Operational Cost Savings</span>
                </div>
                <span className="font-display font-bold text-3xl text-brand">{savingsPercent}%</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 backdrop-blur-md relative z-10">
              <div className="flex items-center gap-3 text-brand mb-4 uppercase tracking-[0.2em] text-xs font-black">
                <TrendingUp className="w-5 h-5" />
                Annual Savings Estimate
              </div>
              <div className="text-6xl font-display font-bold text-white mb-4 tracking-tighter">
                {formatCurrency(Math.max(0, annualSavings))}
              </div>
              <p className="text-gray-400 font-medium italic">
                *Includes reduction in lead leakage and 24/7 coverage.
              </p>
            </div>
            
            <button className="w-full mt-10 py-5 bg-brand text-white rounded-2xl font-bold hover:bg-brand/90 transition-all shadow-xl shadow-brand/20 text-lg">
              Claim Your Savings →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
