import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MessageSquare, Phone, Globe, Target, Calendar, BarChart3, Database, TrendingUp, CheckCircle2, Clock, Instagram, Send, LayoutGrid } from 'lucide-react';
import { cn } from '../lib/utils';

interface FeedItem {
  id: number;
  src: string;
  srcBg: string;
  name: string;
  action: string;
  score: string;
  scoreColor: string;
  scoreBg: string;
  accentColor: string;
  time: string;
  icon: React.ReactNode;
}

const FEED_DATA = [
  { src: 'WhatsApp', srcBg: 'rgba(37,211,102,0.15)', name: 'Rahul Sharma', action: 'WhatsApp → AI qualified lead', score: '91', scoreColor: '#22c55e', scoreBg: 'rgba(34,197,94,0.12)', accentColor: '#22c55e', icon: <MessageSquare className="w-3 h-3" /> },
  { src: 'Call', srcBg: 'rgba(37,99,235,0.15)', name: 'Priya Mehta', action: 'Inbound call → Appt. booked 10AM', score: 'HOT', scoreColor: '#ef4444', scoreBg: 'rgba(239,68,68,0.12)', accentColor: '#2563EB', icon: <Phone className="w-3 h-3" /> },
  { src: 'Ad', srcBg: 'rgba(245,158,11,0.15)', name: 'Arjun Kapoor', action: 'Ad lead → AI scored 88/100', score: '88', scoreColor: '#f59e0b', scoreBg: 'rgba(245,158,11,0.12)', accentColor: '#f59e0b', icon: <Target className="w-3 h-3" /> },
  { src: 'Instagram', srcBg: 'rgba(139,92,246,0.15)', name: 'Sneha Reddy', action: 'Instagram DM → Demo scheduled', score: 'WRM', scoreColor: '#8b5cf6', scoreBg: 'rgba(139,92,246,0.12)', accentColor: '#8b5cf6', icon: <Instagram className="w-3 h-3" /> },
  { src: 'Web', srcBg: 'rgba(239,68,68,0.15)', name: 'Vikram Nair', action: 'Web form → CRM synced instantly', score: 'NEW', scoreColor: '#94a3b8', scoreBg: 'rgba(148,163,184,0.1)', accentColor: '#ef4444', icon: <Globe className="w-3 h-3" /> },
];

const CHANNELS = [
  { name: 'WhatsApp', pct: 82, count: '142 leads', color: '#22c55e', icon: <MessageSquare className="w-4 h-4" /> },
  { name: 'Voice AI', pct: 67, count: '89 calls', color: '#2563EB', icon: <Phone className="w-4 h-4" /> },
  { name: 'Instagram', pct: 54, count: '63 leads', color: '#8b5cf6', icon: <Instagram className="w-4 h-4" /> },
  { name: 'Web Form', pct: 41, count: '38 leads', color: '#f59e0b', icon: <Globe className="w-4 h-4" /> },
  { name: 'Ad Leads', pct: 29, count: '29 leads', color: '#ef4444', icon: <Send className="w-4 h-4" /> },
];

export function PlatformFlow() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [stats, setStats] = useState({ leads: 247, booked: 34, calls: 89 });
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      const data = FEED_DATA[count % FEED_DATA.length];
      const newItem: FeedItem = {
        ...data,
        id: Date.now(),
        time: 'now'
      };

      setItems(prev => [newItem, ...prev].slice(0, 6));
      setStats(prev => ({
        leads: prev.leads + (count % 2 === 0 ? 1 : 0),
        booked: prev.booked + (count % 6 === 0 ? 1 : 0),
        calls: prev.calls + (count % 3 === 0 ? 1 : 0),
      }));

      const chips = ['wa', 'voice', 'crm'];
      setActiveChip(chips[count % 3]);
      setTimeout(() => setActiveChip(null), 800);

      count++;
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-5xl group font-mono selection:bg-brand/30">
      {/* Tablet Frame Decorations */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-slate-800 rounded-full z-20" />
      <div className="absolute -right-3 top-20 w-1.5 h-12 bg-slate-800 rounded-full z-20" />
      
      <div className="bg-[#040e1c] rounded-[2.5rem] overflow-hidden border-[12px] border-slate-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative min-h-[600px] w-full flex flex-col text-[#e2e8f0]">
        
        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_2px,#000_4px)]" />
        
        {/* Top Bar */}
        <div className="relative z-20 border-b border-blue-900/30 bg-[#071628]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/20">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <span className="font-syne font-bold text-sm tracking-tight text-white">AutoFlowmation.ai</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_1.4s_ease-in-out_infinite] shadow-[0_0_8px_#22c55e]" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Systems Active</span>
            </div>
            <div className="text-[11px] text-white/40 font-medium tracking-wider">{time}</div>
            <div className="text-[9px] font-black text-brand border border-brand/30 px-2 py-0.5 rounded uppercase tracking-widest">Live</div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="relative z-20 grid grid-cols-2 md:grid-cols-4 border-b border-blue-900/30">
          {[
            { label: 'Leads Today', value: stats.leads, delta: '+34% this week', color: 'text-brand' },
            { label: 'Appointments', value: stats.booked, delta: '+18% vs last wk', color: 'text-green-500' },
            { label: 'AI Calls Made', value: stats.calls, delta: '+21% this week', color: 'text-brand' },
            { label: 'Revenue Pipeline', value: '₹4.2L', delta: '+12% vs last wk', color: 'text-amber-500' },
          ].map((stat, i) => (
            <div key={i} className="p-5 border-r border-blue-900/30 last:border-r-0 relative group">
              <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1.5">{stat.label}</div>
              <div className="font-syne text-2xl font-black mb-1">{stat.value}</div>
              <div className={cn("text-[9px] font-bold", stat.color)}>{stat.delta}</div>
              <div className={cn("absolute bottom-0 left-0 right-0 h-0.5 opacity-50 bg-gradient-to-r from-transparent via-current to-transparent transition-transform scale-x-0 group-hover:scale-x-100", stat.color)} />
            </div>
          ))}
        </div>

        {/* Dashboard Panels */}
        <div className="relative z-20 flex-1 grid md:grid-cols-2">
          {/* Live Feed Panel */}
          <div className="p-6 border-r border-blue-900/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em]">Live Activity Feed</h3>
              <div className="text-[9px] font-bold text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded capitalize">{items.length} events</div>
            </div>
            
            <div className="space-y-2.5">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] relative group hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full" style={{ backgroundColor: item.accentColor }} />
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: item.srcBg, color: item.accentColor }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold truncate">{item.name}</div>
                      <div className="text-[9px] text-white/40 truncate mt-0.5">{item.action}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="text-[8px] text-white/20 font-bold">{item.time}</div>
                      <div className="text-[8px] font-black px-1.5 py-0.5 rounded" style={{ color: item.scoreColor, backgroundColor: item.scoreBg }}>{item.score}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Performance Panel */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em]">Channel Performance</h3>
              <div className="text-[9px] font-bold text-white/40">Today</div>
            </div>

            <div className="space-y-5">
              {CHANNELS.map((ch, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-current" style={{ color: ch.color }}>{ch.icon}</div>
                      <span className="text-[10px] font-bold">{ch.name}</span>
                      <span className="text-[9px] text-white/40 font-medium">{ch.count}</span>
                    </div>
                    <span className="text-[10px] font-black">{ch.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${ch.pct}%` }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: ch.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Rows */}
        <div className="relative z-20 grid grid-cols-3 border-t border-blue-900/30 p-4 gap-4">
          {[
            { id: 'wa', label: 'WhatsApp Bot', sub: '93 Active Chats', icon: <MessageSquare className="w-4 h-4" />, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
            { id: 'voice', label: 'Voice Agent', sub: '3 Calls in Process', icon: <Phone className="w-4 h-4" />, color: '#2563EB', bg: 'rgba(37,99,235,0.1)' },
            { id: 'crm', label: 'CRM Sync', sub: 'All Leads Saved', icon: <Database className="w-4 h-4" />, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
          ].map((chip) => (
            <div 
              key={chip.id} 
              className={cn(
                "flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-blue-900/20 transition-all duration-500",
                activeChip === chip.id ? "bg-white/[0.06] border-white/20 scale-[1.02]" : ""
              )}
            >
              <div 
                className={cn("w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform", activeChip === chip.id && "animate-pulse")} 
                style={{ backgroundColor: chip.bg, color: chip.color }}
              >
                {chip.icon}
              </div>
              <div className="hidden lg:block">
                <div className="text-[10px] font-bold">{chip.label}</div>
                <div className="text-[9px] text-white/40 mt-0.5 font-bold uppercase tracking-widest">{chip.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Bar */}
        <div className="relative z-20 border-t border-blue-900/30 bg-[#040e1c]/80 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[9px] text-white/20 font-bold tracking-widest uppercase">AUTOFLOWMATION.AI — COMMAND CENTER · 24/7</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-[9px] font-bold text-white/40">
              <span>UPTIME <span className="text-green-500">99.9%</span></span>
              <span>MISSED LEADS <span className="text-green-500">0</span></span>
            </div>
            <button className="bg-brand text-white text-[10px] font-black px-5 py-2 rounded-full hover:bg-brand/90 transition-all tracking-widest shadow-lg shadow-brand/20">
              BOOK FREE AUDIT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
