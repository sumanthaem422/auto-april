import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Phone, PhoneOff, Bot, User, Loader2, Calendar, Mail, CheckCircle2, Lock, ChevronDown, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';
import { trackLead, trackInteraction } from '../lib/analytics';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

const isGeminiEnabled = Boolean(GEMINI_API_KEY);

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

const SUGGESTED_PROMPTS = [
  "How can AI help my real estate business?",
  "What's the ROI of a voice agent?",
  "Can you automate my customer support?"
];

const INDUSTRIES = [
  "Auto",
  "Aesthetics & Wellness",
  "Home Services",
  "Retail",
  "Other",
  "Enterprise"
];

const SYSTEM_PROMPT = `You are a top-performing AI Sales Agent for Autoflowmation.ai, an elite Multi-Sector AI Automation Agency. Your goal is to qualify lead for B2B and B2C enterprises and get their email address to book a demo. 
Follow this playbook:
1. If they ask a question, answer it briefly and provide immense value.
2. Ask what industry they are in or what their biggest bottleneck is.
3. Once they reply, briefly explain how our Multi-Channel AI (Voice Agents, Omni-Channel OS, etc.) solves that specific problem.
4. IMMEDIATELY pivot to asking for their work email so you can send them a calendar invite for a custom live demo.
Keep responses short (1-3 sentences), conversational, and highly persuasive. Do not break character.`;

export function LiveLab() {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice'>('chat');
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: "Hi! I'm the Autoflowmation AI Sales Agent. I can build a custom enterprise automation prototype for your B2B or B2C business. What sector are you in?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lead Gen State
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [isGated, setIsGated] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [capturedEmail, setCapturedEmail] = useState('');

  // Voice State (Simulated)
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [voiceStatus, setVoiceStatus] = useState('Ready to call');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated Backend: Detect email in text
  const extractEmail = (text: string) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Check for email in user input (Simulated Function Calling / Intent Detection)
    const email = extractEmail(text);
    if (email) {
      setCapturedEmail(email);
      setLeadCaptured(true);
      setIsGated(false);
      
      trackLead('chat_gate', 'Unknown');
      
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), role: 'user', content: text },
        { id: (Date.now() + 1).toString(), role: 'model', content: `Perfect! I've sent a calendar invite to ${email}. Looking forward to showing you the custom prototype!` }
      ]);
      return;
    }

    // Teaser Gate Logic: Lock after 3 messages if no email provided
    if (userMessageCount >= 2 && !leadCaptured) {
      setIsGated(true);
      return;
    }

    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text }]);
    setUserMessageCount(prev => prev + 1);
    setIsLoading(true);
    
    trackInteraction('chat', 'send_message');

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          ...history,
          { role: 'user', parts: [{ text }] }
        ]
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that request.";
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        content: aiResponse 
      }]);

      // Check if AI managed to extract an email in its reasoning (fallback)
      const aiFoundEmail = extractEmail(aiResponse);
      if (aiFoundEmail && !leadCaptured) {
        setCapturedEmail(aiFoundEmail);
        setLeadCaptured(true);
      }

    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        content: ai
          ? "Sorry, I'm having trouble connecting right now. Please check your Gemini API configuration."
          : "Gemini API key is not configured. Live demo is unavailable in this local build."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleGateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    if (email) {
      setCapturedEmail(email);
      setLeadCaptured(true);
      setIsGated(false);
      trackLead('chat_gate', 'general');
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), role: 'model', content: `Thanks! I've unlocked the sandbox and sent a calendar invite to ${email}. What else would you like to know?` }
      ]);
    }
  };

  const toggleCall = () => {
    if (callState === 'idle') {
      setCallState('calling');
      setVoiceStatus('Dialing...');
      trackInteraction('voice', 'start_call');
      setTimeout(() => {
        setCallState('connected');
        setVoiceStatus('Connected. AI is speaking...');
      }, 2000);
    } else {
      setCallState('idle');
      setVoiceStatus('Call ended.');
      setTimeout(() => setVoiceStatus('Ready to call'), 2000);
    }
  };

  return (
    <section id="live-lab" className="py-24 bg-white relative border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Bot className="w-4 h-4" />
            Interactive Demo
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-heading leading-tight italic">The Live Lab</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-xl font-medium">
            Test our AI agents in real-time. Whether it's answering complex FAQs or making outbound sales calls, our AI performs better than humans.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          
          {/* Main Lab Area */}
          <div className="lg:col-span-2 bg-[#F8FAFC] border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[700px] relative">
            
            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-white px-6 pt-6 gap-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={cn(
                  "flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-t-2xl flex items-center justify-center gap-2",
                  activeTab === 'chat' ? "bg-[#F8FAFC] text-brand border-x border-t border-slate-200 shadow-sm" : "text-text-muted hover:text-heading"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full animate-pulse", activeTab === 'chat' ? "bg-brand" : "bg-gray-300")} />
                Autonomous Chat
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={cn(
                  "flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-t-2xl flex items-center justify-center gap-2",
                  activeTab === 'voice' ? "bg-[#F8FAFC] text-brand border-x border-t border-slate-200 shadow-sm" : "text-text-muted hover:text-heading"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full animate-pulse", activeTab === 'voice' ? "bg-brand" : "bg-gray-300")} />
                Voice Agent
              </button>
            </div>

            {/* Chat Interface */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Messages Area */}
                <div className={cn(
                  "flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide transition-all duration-500",
                  isGated ? "blur-md scale-[0.98] opacity-50 pointer-events-none" : ""
                )}>
                  {messages.map((msg) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id} 
                      className={cn("flex gap-4 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm",
                        msg.role === 'user' ? "bg-gray-100" : "bg-brand text-white"
                      )}>
                        {msg.role === 'user' ? <User className="w-4 h-4 text-gray-600" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={cn(
                        "p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm font-medium",
                        msg.role === 'user' 
                          ? "bg-slate-900 text-white rounded-tr-sm" 
                          : "bg-white border border-slate-100 text-slate-800 rounded-tl-sm"
                      )}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-slate-100 rounded-tl-sm flex items-center gap-3 shadow-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-brand" />
                        <span className="text-[13px] text-slate-500 font-bold uppercase tracking-wider">AI Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Lead Gate Overlay */}
                <AnimatePresence>
                  {isGated && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-white/20 backdrop-blur-[2px]"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] max-w-sm w-full text-center"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">Keep Exploring?</h3>
                        <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">
                          You've seen the power of our AI. Enter your email to unlock the full autonomous sandbox and book your custom audit.
                        </p>
                        <form onSubmit={handleGateSubmit} className="space-y-4">
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                              type="email" 
                              name="email"
                              required
                              placeholder="work@enterprise.com"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-bold"
                            />
                          </div>
                          <button 
                            type="submit"
                            className="w-full py-4 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2"
                          >
                            Unlock & Book Demo <ArrowRight className="w-4 h-4" />
                          </button>
                        </form>
                        <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          🛡️ Secure & No-Spam Guarantee
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100 z-10">
                  <form onSubmit={onSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={isGated ? "Chat locked..." : "Ask the AI something..."}
                      disabled={isGated}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all font-medium"
                    />
                    <button 
                      type="submit"
                      disabled={isLoading || !input.trim() || isGated}
                      className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center hover:bg-brand/90 transition-all shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Voice Interface */}
            {activeTab === 'voice' && (
              <div className="flex-1 flex flex-col items-center justify-center bg-white p-8 relative overflow-hidden">
                <div className="relative mb-12">
                  <motion.div 
                    animate={callState === 'connected' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={cn(
                      "relative z-10 w-40 h-40 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-2xl",
                      callState === 'connected' ? "bg-brand/5 border-brand ring-8 ring-brand/10" : "bg-slate-50 border-slate-200"
                    )}
                  >
                    <Mic className={cn(
                      "w-16 h-16 transition-colors duration-500",
                      callState === 'connected' ? "text-brand" : "text-slate-300"
                    )} />
                  </motion.div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Omni-Channel Voice</h3>
                  <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-12">{voiceStatus}</p>
                </div>

                <button
                  onClick={toggleCall}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-2xl group",
                    callState === 'idle' ? "bg-[#22C55E] hover:bg-[#16A34A]" : "bg-red-500 hover:bg-red-600"
                  )}
                >
                  {callState === 'idle' ? <Phone className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" /> : <PhoneOff className="w-8 h-8 text-white" />}
                </button>
              </div>
            )}
          </div>

          {/* Enterprise Sidebar - The "Brain" */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900 rounded-[2rem] p-6 shadow-2xl border border-slate-800 flex flex-col h-full max-h-[700px] overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-brand" />
                  </div>
                  <h3 className="text-white font-bold text-sm tracking-tight">Automation Brain</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Live Sync</span>
                </div>
              </div>

              {/* Automation Steps Visualization */}
              <div className="space-y-4 mb-8">
                {[
                  { label: 'Interaction Detected', status: 'active', active: true },
                  { label: 'AI Intelligence Processing', status: 'processing', active: isLoading || callState === 'connected' },
                  { label: 'Lead Data Extracted', status: 'pending', active: !!capturedEmail },
                  { label: 'CRM / Google Sheets Sync', status: 'pending', active: !!capturedEmail },
                  { label: 'Auto-Trigger Demo Call', status: 'pending', active: false }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                      step.active ? "border-brand bg-brand/20 shadow-[0_0_10px_rgba(37,99,235,0.5)]" : "border-slate-700 bg-transparent"
                    )}>
                      {step.active && <div className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />}
                    </div>
                    <span className={cn(
                      "text-[11px] font-bold tracking-wide uppercase",
                      step.active ? "text-white" : "text-slate-500"
                    )}>{step.label}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Lead Table (The "Excel" view) */}
              <div className="flex-1 bg-black/40 rounded-2xl border border-slate-800 p-4 font-mono overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Lead_Database_v1.xls</span>
                  <span className="text-[9px] text-slate-500">Cols: 4 | Rows: {leadCaptured ? '2' : '1'}</span>
                </div>
                
                <div className="space-y-3 overflow-y-auto pr-1">
                  <div className="grid grid-cols-3 gap-2 border-b border-slate-800/50 pb-2 text-[10px] font-bold text-slate-500">
                    <span>NAME</span>
                    <span>CHANNEL</span>
                    <span>STATUS</span>
                  </div>
                  
                  {/* Seed Lead */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400">
                    <span className="truncate">Rahul Sharma</span>
                    <span className="text-brand">WhatsApp</span>
                    <span className="text-green-500">SYNCED</span>
                  </div>

                  <AnimatePresence>
                    {leadCaptured && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-3 gap-2 text-[10px] text-white bg-brand/10 p-1.5 rounded border border-brand/20"
                      >
                        <span className="truncate">{capturedEmail.split('@')[0]}</span>
                        <span className="text-brand">{activeTab === 'chat' ? 'Chat' : 'Voice'}</span>
                        <span className="text-blue-400 animate-pulse">CAPTURED</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!leadCaptured && !isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Loader2 className="w-5 h-5 text-slate-700 animate-spin mb-2" />
                      <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Awaiting interaction...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Final CTA within Sidebar */}
              <button 
                onClick={() => trackInteraction('live_lab', 'book_audit')}
                className="mt-6 w-full py-4 bg-brand text-white rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-2"
              >
                Book Full Demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
