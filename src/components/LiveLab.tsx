import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Phone, PhoneOff, Bot, User, Loader2, Calendar, Mail, CheckCircle2, Lock, ChevronDown, ArrowRight } from 'lucide-react';
import { cn, generateUUID } from '../lib/utils';
import { trackLead, trackInteraction } from '../lib/analytics';

import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useLead } from '../context/LeadContext';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

interface Persona {
  id: string;
  name: string;
  badge: string;
  avatarBg: string;
  role: string;
  systemPrompt: string;
  greeting: string;
  suggestedPrompts: string[];
  stats: {
    temperature: number;
    tokens: string;
    latency: string;
    capabilities: string[];
  };
}

const PERSONAS: Record<string, Persona> = {
  sales: {
    id: 'sales',
    name: 'AI Sales Specialist',
    badge: 'Conversion Pro',
    avatarBg: 'bg-brand',
    role: 'Qualifies B2B/B2C leads, answers product queries, and captures email contacts for live demos.',
    systemPrompt: `You are a top-performing AI Sales Agent for Autoflowmation.ai, an elite Multi-Sector AI Automation Agency. Your goal is to qualify leads for B2B and B2C enterprises and get their email address to book a demo. 
Follow this playbook:
1. If they ask a question, answer it briefly and provide immense value.
2. Ask what industry they are in or what their biggest bottleneck is.
3. Once they reply, briefly explain how our Multi-Channel AI (Voice Agents, Omni-Channel OS, etc.) solves that specific problem.
4. IMMEDIATELY pivot to asking for their work email so you can send them a calendar invite for a custom live demo.
Keep responses short (1-3 sentences), conversational, and highly persuasive. Do not break character.`,
    greeting: "Hi! I'm the Autoflowmation AI Sales Specialist. I can build custom enterprise agent systems to scale your channels. What sector is your business in?",
    suggestedPrompts: [
      "How does AI support lead qualification?",
      "Tell me the ROI of a voice agent.",
      "How do I automate customer booking?"
    ],
    stats: {
      temperature: 0.2,
      tokens: '300 / msg',
      latency: '1.2s',
      capabilities: ['Lead qualification', 'CRM synchrony', 'Email capture']
    }
  },
  support: {
    id: 'support',
    name: 'AI Customer Success',
    badge: '24/7 Operations',
    avatarBg: 'bg-emerald-600',
    role: 'Handles mock complaints, checks delivery states, answers FAQs, and logs issues automatically.',
    systemPrompt: `You are the friendly, empathetic AI Customer Success Agent for AutoFlowmation. Your goal is to showcase 24/7 autonomous support capabilities.
Follow this playbook:
1. Greet the user and ask how you can resolve their query (mock refunds, order statuses, or flight/service bookings).
2. For refund or delivery tracking issues, ask for an imaginary mock receipt/dispatch ID. Once provided, simulate a database check, validate the query, and provide a resolution immediately.
3. Emphasize that continuous multi-channel live sync ensures no single customer ticket drops.
4. Politely invite them to test our dashboard or share their work email to see how this integrates with Zendesk, HubSpot, or Salesforce.
Keep responses short, professional, and warm.`,
    greeting: "Hello, I'm the AI Customer Success Agent. I deal with incident resolution, delivery tracking, and live user FAQs instantly. How can I help you today?",
    suggestedPrompts: [
      "Mock Refund support case",
      "Draft an automated checkout workflow",
      "Where are my simulated order dispatches?"
    ],
    stats: {
      temperature: 0.1,
      tokens: '250 / msg',
      latency: '0.9s',
      capabilities: ['Zendesk integration', 'Ticket resolution', 'Order lookup']
    }
  },
  architect: {
    id: 'architect',
    name: 'AI Systems Architect',
    badge: 'Technical Expert',
    avatarBg: 'bg-amber-600',
    role: 'Analyzes API connections, data security pipelines, system latency, and multi-channel synchronization.',
    systemPrompt: `You are the principal AI Systems Architect for Autoflowmation.ai. Your target is technical buyers wanting to explore architecture, privacy, integrations, and performance.
Follow this playbook:
1. Speak technically, clearly, and concisely. Use terms like 'high-availability', 'webhook pipelines', 'context window', 'vector database embeddings', and 'zero-data-retention APIs'.
2. Explain how our custom middleware proxies Gemini API keys securely, never exposing secrets to client-side.
3. Ask about their current tech stack (e.g. Node, React, PostgreSQL, Salesforce, Stripe) and give them an architectural recommendation.
Keep responses technically detailed but scannable and short (1-3 sentences max).`,
    greeting: "Greetings. I'm the principal AI Systems Architect. I direct our high-performance integration layers, pipeline design, and API proxy routing. What does your stack run on?",
    suggestedPrompts: [
      "Explain the API proxy logic.",
      "How do you secure API keys?",
      "Draw up a high-availability flow."
    ],
    stats: {
      temperature: 0.15,
      tokens: '380 / msg',
      latency: '1.4s',
      capabilities: ['API pipelines', 'Secret proxy shielding', 'High-availability architecture']
    }
  }
};

const INDUSTRIES = [
  "Auto",
  "Aesthetics & Wellness",
  "Home Services",
  "Retail",
  "Other",
  "Enterprise"
];

export function LiveLab() {
  const { openModal } = useLead();
  const [activeTab, setActiveTab] = useState<'chat' | 'voice'>('chat');
  const [activePersona, setActivePersona] = useState<string>('sales');
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: PERSONAS.sales.greeting }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
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

    // Teaser Gate Logic: Lock after 3 responses if no email provided
    if (userMessageCount >= 3 && !leadCaptured) {
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

      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          history,
          text,
          systemPrompt: PERSONAS[activePersona as keyof typeof PERSONAS].systemPrompt
        })
      });

      let data;
      const responseText = await response.text();
      
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        throw new Error(`Server returned non-JSON response (Status ${response.status}): ${responseText.trim().slice(0, 160)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Server error (Status ${response.status}): ${responseText.trim().slice(0, 100)}`);
      }

      const aiResponse = data.text || "I'm sorry, I couldn't process that request.";
      
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

    } catch (error: any) {
      console.error("Gemini API Error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        content: `Error details: ${errorMessage}\n\nTroubleshooting hint: If the problem is "GEMINI_API_KEY environment variable is required", please check your Settings > Secrets panel in the AI Studio UI.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleGateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataEntries = new FormData(e.currentTarget);
    const fullName = (formDataEntries.get('fullName') as string || '').trim();
    const email = (formDataEntries.get('email') as string || '').trim();
    const phone = (formDataEntries.get('phone') as string || '').trim();
    const company = (formDataEntries.get('company') as string || '').trim();
    const industry = (formDataEntries.get('industry') as string || '').trim();
    
    // Regex Patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneDigits = phone.replace(/\D/g, '');
    
    if (!fullName || fullName.length < 2) {
      alert('Please enter your full name (at least 2 characters)');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid work email');
      return;
    }

    if (phoneDigits.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    try {
      const path = 'leads';
      const leadId = generateUUID();
      await setDoc(doc(db, path, leadId), {
        fullName,
        email,
        phone: `+1${phoneDigits}`, 
        company: company || 'Not Specified',
        industry: industry || 'AI Strategy Consultation',
        source: 'Live Lab Booking Gate',
        createdAt: serverTimestamp()
      });

      setCapturedEmail(email);
      setLeadCaptured(true);
      setIsGated(false);
      trackLead('chat_gate', 'general');
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), role: 'model', content: `Awesome, ${fullName}! Your AI Strategy Consultation matches successfully. I have unlocked your sandbox operations and sent custom slots list directly to ${email}. Let's continue testing!` }
      ]);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'leads');
    } finally {
      setIsLoading(false);
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
              <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
                {/* Persona Selector Bar */}
                <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-2.5 flex items-center justify-between text-xs gap-4 overflow-x-auto shrink-0 scrollbar-hide">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">Workspace Profile:</span>
                  <div className="flex gap-2 shrink-0">
                    {Object.values(PERSONAS).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setActivePersona(p.id);
                          setMessages([
                            { id: Date.now().toString(), role: 'model', content: p.greeting }
                          ]);
                          setUserMessageCount(0);
                        }}
                        className={cn(
                          "px-3 py-1 rounded-full font-bold transition-all text-[10px] uppercase tracking-wider cursor-pointer border",
                          activePersona === p.id 
                            ? "bg-slate-950 text-white border-slate-950 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                        )}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages Area */}
                <div 
                  ref={messagesContainerRef}
                  className={cn(
                    "flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide transition-all duration-500",
                    isGated ? "blur-md scale-[0.98] opacity-50 pointer-events-none" : ""
                  )}
                >
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
                      className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm"
                    >
                      <motion.div 
                        initial={{ scale: 0.95, y: 15 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.18)] max-w-md w-full text-center overflow-y-auto max-h-[92%] select-none scrollbar-hide"
                      >
                        <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mx-auto mb-4 shrink-0">
                          <Calendar className="w-6 h-6 animate-pulse" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-1 leading-tight">Book AI Strategy Session</h3>
                        <p className="text-slate-500 text-xs mb-5 font-medium leading-relaxed max-w-sm mx-auto">
                          Choose your consultation slot to unlock your full sandbox access pass and design tailored workflows with our lead automation architects.
                        </p>
                        <form onSubmit={handleGateSubmit} className="space-y-3.5 text-left">
                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1 leading-none">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                type="text" 
                                name="fullName"
                                required
                                minLength={2}
                                maxLength={100}
                                placeholder="Alex Mercer"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1 leading-none">
                                Work Email <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                  type="email" 
                                  name="email"
                                  required
                                  placeholder="alex@company.com"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1 leading-none">
                                Phone <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                  type="tel" 
                                  name="phone"
                                  required
                                  maxLength={10}
                                  placeholder="10-digit Phone"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1 leading-none">
                                Company Name
                              </label>
                              <input 
                                type="text" 
                                name="company"
                                maxLength={100}
                                placeholder="Enterprise Corp"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1 leading-none">
                                Consultation Slot <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <select 
                                  name="industry"
                                  required
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all appearance-none cursor-pointer"
                                >
                                  <option value="Tomorrow, Morning Sync">Tomorrow, Morning Sync</option>
                                  <option value="Tomorrow, Afternoon Session">Tomorrow, Afternoon Sync</option>
                                  <option value="Wednesday, Business Slot">Wednesday, Business Slot</option>
                                  <option value="Thursday, Engineering Sync">Thursday, Engineering Sync</option>
                                  <option value="Custom Consultation Slot">Custom Schedule Preference</option>
                                </select>
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              </div>
                            </div>
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-3.5 bg-brand text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand/90 transition-all shadow-md shadow-brand/10 flex items-center justify-center gap-2 cursor-pointer mt-2"
                          >
                            Schedule Consultation <ArrowRight className="w-4 h-4" />
                          </button>
                        </form>
                        <p className="mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 opacity-80">
                          🛡️ Secure & No-Spam Guarantee | Direct CRM Sync Active
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100 z-10 flex flex-col gap-3">
                  {/* Persona-specific Suggested Prompts Chips */}
                  {!isGated && (
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide shrink-0">
                      {PERSONAS[activePersona].suggestedPrompts.map((promptText, idx) => {
                        const isActive = input === promptText;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setInput(promptText);
                              // Dynamically focus input
                              setTimeout(() => {
                                inputRef.current?.focus();
                              }, 30);
                              trackInteraction('chat', `pretext_select_${idx}`);
                            }}
                            disabled={isLoading}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-1 shrink-0 border",
                              isActive
                                ? "bg-brand/10 border-brand text-brand shadow-sm scale-[1.02]"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-dashed hover:border-brand/40"
                            )}
                          >
                            <span>{promptText}</span>
                            <ArrowRight className={cn("w-3 h-3 transition-transform", isActive ? "text-brand translate-x-1" : "text-slate-400")} />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Pretext modification helper */}
                  {input && PERSONAS[activePersona].suggestedPrompts.includes(input) && (
                    <div className="text-[10px] text-brand font-black tracking-wider uppercase flex items-center gap-1.5 px-1 animate-fade-in select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
                      <span>💡 Pre-text loaded! Customize this query as needed or click Send ↓</span>
                    </div>
                  )}

                  <form onSubmit={onSubmit} className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={isGated ? "Chat locked..." : "Ask the AI something..."}
                      disabled={isGated}
                      className={cn(
                        "flex-1 bg-slate-50 border rounded-xl px-4 py-3 text-[15px] focus:outline-none transition-all font-medium",
                        input && PERSONAS[activePersona].suggestedPrompts.includes(input)
                          ? "border-brand/60 ring-4 ring-brand/10 bg-white"
                          : "border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/10"
                      )}
                    />
                    <button 
                      type="submit"
                      disabled={isLoading || !input.trim() || isGated}
                      className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center hover:bg-brand/90 transition-all shadow-lg cursor-pointer"
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

              {/* Active Agent Meta Stats */}
              <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-800/80 mb-4 text-xs space-y-3 font-mono">
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-500">ACTIVE INTENT:</span>
                  <span className="text-brand font-black tracking-wide uppercase">{PERSONAS[activePersona as keyof typeof PERSONAS].name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">TEMPERATURE:</span>
                  <span className="text-white font-bold">{PERSONAS[activePersona as keyof typeof PERSONAS].stats.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">AVG LATENCY:</span>
                  <span className="text-green-400 font-bold">{PERSONAS[activePersona as keyof typeof PERSONAS].stats.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">COMPUTE COST:</span>
                  <span className="text-white font-bold text-slate-300">{PERSONAS[activePersona as keyof typeof PERSONAS].stats.tokens}</span>
                </div>
                <div className="pt-2 border-t border-slate-800/50">
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Agent Capabilities:</div>
                  <div className="grid grid-cols-1 gap-1">
                    {PERSONAS[activePersona as keyof typeof PERSONAS].stats.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-300 text-[10px]">
                        <span className="w-1 h-1 rounded-full bg-brand" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
                onClick={() => { trackInteraction('live_lab', 'book_audit'); openModal('Live Lab Sidebar'); }}
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
