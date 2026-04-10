import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Phone, PhoneOff, Bot, User, Loader2, Calendar, Mail, CheckCircle2, Lock, ChevronDown } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

const SYSTEM_PROMPT = `You are a top-performing AI Sales Agent for Autoflowmation.ai, an elite AI Automation Agency in Hyderabad. Your goal is to qualify the lead and get their email address to book a demo. 
Follow this playbook:
1. If they ask a question, answer it briefly and provide immense value.
2. Ask what industry they are in or what their biggest bottleneck is.
3. Once they reply, briefly explain how our AI (Voice Agents, WhatsApp OS, etc.) solves that specific problem.
4. IMMEDIATELY pivot to asking for their work email so you can send them a calendar invite for a custom live demo.
Keep responses short (1-3 sentences), conversational, and highly persuasive. Do not break character.`;

export function LiveLab() {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice'>('chat');
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: "Hi! I'm the Autoflowmation AI Sales Agent. I can build a custom AI prototype for your business. What industry are you in?" }
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
        content: "Sorry, I'm having trouble connecting right now. Please ensure the GEMINI_API_KEY is set." 
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
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), role: 'model', content: `Thanks! I've unlocked the sandbox and sent a calendar invite to ${email}. What else would you like to know?` }
      ]);
    }
  };

  const toggleCall = () => {
    if (callState === 'idle') {
      setCallState('calling');
      setVoiceStatus('Dialing...');
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
    <section id="live-lab" className="py-24 bg-gray-50 relative border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-4">
            <Bot className="w-4 h-4" />
            Interactive Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">Meet Your New AI Sales Agent</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            This isn't just a chatbot. It's an AI trained to qualify leads and book meetings 24/7. Try chatting with it below.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          
          {/* Main Lab Area */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[600px] relative">
            
            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              <button
                onClick={() => setActiveTab('chat')}
                className={cn(
                  "flex-1 py-4 text-sm font-semibold uppercase tracking-wider transition-colors",
                  activeTab === 'chat' ? "bg-white text-brand border-b-2 border-brand shadow-sm" : "text-gray-500 hover:text-gray-900"
                )}
              >
                Chat Agent
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={cn(
                  "flex-1 py-4 text-sm font-semibold uppercase tracking-wider transition-colors",
                  activeTab === 'voice' ? "bg-white text-brand border-b-2 border-brand shadow-sm" : "text-gray-500 hover:text-gray-900"
                )}
              >
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
                    <div key={msg.id} className={cn("flex gap-4 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm",
                        msg.role === 'user' ? "bg-gray-100" : "bg-brand text-white"
                      )}>
                        {msg.role === 'user' ? <User className="w-4 h-4 text-gray-600" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={cn(
                        "p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                        msg.role === 'user' 
                          ? "bg-gray-900 text-white rounded-tr-sm font-medium" 
                          : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-gray-100 rounded-tl-sm flex items-center gap-3 shadow-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-brand" />
                        <span className="text-sm text-gray-500 font-medium">AI is typing...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Teaser Gate Overlay */}
                <AnimatePresence>
                  {isGated && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-white/40 backdrop-blur-sm"
                    >
                      <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                        <div className="w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-4">
                          <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Unlock the Sandbox</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                          You've reached the free message limit. Enter your work email to continue chatting and get a free AI readiness report.
                        </p>
                        <form onSubmit={handleGateSubmit} className="space-y-3">
                          <input 
                            type="email" 
                            name="email"
                            required
                            placeholder="name@company.com" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                          />
                          <button type="submit" className="w-full py-3 bg-brand text-white rounded-xl font-semibold hover:bg-brand/90 transition-colors shadow-md">
                            Unlock Chat & Get Report
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100 z-10">
                  {/* Suggested Prompts */}
                  {!leadCaptured && messages.length <= 2 && (
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3 pb-1">
                      {SUGGESTED_PROMPTS.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(prompt)}
                          className="whitespace-nowrap px-4 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-600 transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}

                  <form onSubmit={onSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={isGated ? "Chat locked..." : "Type your message..."}
                      disabled={isGated}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all disabled:opacity-50"
                    />
                    <button 
                      type="submit"
                      disabled={isLoading || !input.trim() || isGated}
                      className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center hover:bg-brand/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      <Send className="w-5 h-5 ml-1" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Voice Interface */}
            {activeTab === 'voice' && (
              <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF9F6] p-8 relative overflow-hidden">
                
                {/* Industry Selection Dropdown */}
                <div className="relative w-full max-w-sm mb-12 z-20">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 font-bold text-lg hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    {selectedIndustry || "Select your industry"}
                    <ChevronDown className={cn("w-5 h-5 transition-transform", isDropdownOpen && "rotate-180")} />
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#FAF9F6] border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
                      >
                        {INDUSTRIES.map((ind, i) => (
                          <button
                            key={ind}
                            onClick={() => {
                              setSelectedIndustry(ind);
                              setIsDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-6 py-4 text-xl font-bold text-gray-900 hover:bg-gray-100 transition-colors",
                              i !== INDUSTRIES.length - 1 ? "border-b border-gray-300/60" : ""
                            )}
                          >
                            {ind}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative mb-8">
                  <div className={cn(
                    "relative z-10 w-32 h-32 rounded-full flex items-center justify-center border-2 transition-colors duration-500 shadow-xl",
                    callState === 'connected' ? "bg-white border-brand" : "bg-white border-gray-200"
                  )}>
                    <Mic className={cn(
                      "w-12 h-12 transition-colors duration-500",
                      callState === 'connected' ? "text-brand animate-pulse" : "text-gray-400"
                    )} />
                  </div>
                  {callState === 'connected' && (
                    <div className="absolute inset-0 border-4 border-brand/30 rounded-full animate-ping" />
                  )}
                </div>

                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  {selectedIndustry ? `${selectedIndustry} Agent` : 'Inbound Sales Agent'}
                </h3>
                <p className="text-gray-500 mb-12 h-6 font-medium">{voiceStatus}</p>

                <button
                  onClick={toggleCall}
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg",
                    callState === 'idle' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  )}
                >
                  {callState === 'idle' ? <Phone className="w-6 h-6 text-white" /> : <PhoneOff className="w-6 h-6 text-white" />}
                </button>
              </div>
            )}
          </div>

          {/* Contextual CTA Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Lead Status Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-gray-900 mb-4">Live Lab Status</h3>
              
              {leadCaptured ? (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-green-900">Demo Requested</p>
                    <p className="text-xs text-green-700 mt-1">Invite sent to {capturedEmail}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      1
                    </div>
                    Chat with the AI
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      2
                    </div>
                    Share your industry
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      3
                    </div>
                    Get a custom prototype
                  </div>
                </div>
              )}
            </div>

            {/* Hard CTA Card */}
            <div className="bg-gray-900 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/30 blur-[50px] rounded-full" />
              
              <h3 className="font-display font-bold text-xl mb-2 relative z-10">Skip the chat?</h3>
              <p className="text-gray-400 text-sm mb-6 relative z-10">
                Talk to a human expert and see exactly how we can automate your business.
              </p>
              
              <button className="w-full py-3 bg-brand hover:bg-brand/90 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 relative z-10 shadow-lg">
                <Calendar className="w-4 h-4" />
                Book Live Demo
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 relative z-10">
                <Mail className="w-3 h-3" />
                Usually replies in 5 mins
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
