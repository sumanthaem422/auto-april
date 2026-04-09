import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Mic, Phone, PhoneOff, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export function LiveLab() {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice'>('chat');
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: "Hi! I'm the Autoflowmation AI agent. I can help qualify leads, answer FAQs, and book appointments. Try chatting with me!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice State (Simulated)
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [voiceStatus, setVoiceStatus] = useState('Ready to call');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: "You are a helpful AI assistant for an AI Automation Agency called Autoflowmation.ai based in Hyderabad. You help qualify leads and explain services. Keep responses concise and professional." }]
          },
          ...history,
          {
            role: 'user',
            parts: [{ text: userMsg }]
          }
        ]
      });

      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        content: response.text || "I'm sorry, I couldn't process that request." 
      }]);
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
    <section id="live-lab" className="py-24 bg-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">The Live Lab</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Experience our AI agents in real-time. Test the chat interface powered by Gemini or try the simulated voice agent.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('chat')}
              className={cn(
                "flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors",
                activeTab === 'chat' ? "bg-brand/10 text-brand border-b-2 border-brand" : "text-text-muted hover:text-text-main hover:bg-white/5"
              )}
            >
              Chat Agent
            </button>
            <button
              onClick={() => setActiveTab('voice')}
              className={cn(
                "flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors",
                activeTab === 'voice' ? "bg-brand/10 text-brand border-b-2 border-brand" : "text-text-muted hover:text-text-main hover:bg-white/5"
              )}
            >
              Voice Agent
            </button>
          </div>

          <div className="h-[500px] relative">
            {/* Chat Interface */}
            {activeTab === 'chat' && (
              <div className="absolute inset-0 flex flex-col bg-card">
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                  {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex gap-4 max-w-[80%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        msg.role === 'user' ? "bg-border" : "bg-brand/20"
                      )}>
                        {msg.role === 'user' ? <User className="w-4 h-4 text-text-main" /> : <Bot className="w-4 h-4 text-brand" />}
                      </div>
                      <div className={cn(
                        "p-4 rounded-2xl text-sm leading-relaxed",
                        msg.role === 'user' 
                          ? "bg-brand text-white rounded-tr-sm font-medium" 
                          : "bg-bg border border-border text-text-main rounded-tl-sm"
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-brand" />
                      </div>
                      <div className="p-4 rounded-2xl bg-card border border-border rounded-tl-sm flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-brand" />
                        <span className="text-sm text-text-muted">AI is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-border bg-card">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-bg border border-border rounded-full px-6 py-3 text-sm focus:outline-none focus:border-brand transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5 ml-1" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Voice Interface */}
            {activeTab === 'voice' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card p-8">
                <div className="relative mb-12">
                  <div className={cn(
                    "relative z-10 w-32 h-32 rounded-full flex items-center justify-center border transition-colors duration-500",
                    callState === 'connected' ? "bg-card border-brand" : "bg-card border-border"
                  )}>
                    <Mic className={cn(
                      "w-12 h-12 transition-colors duration-500",
                      callState === 'connected' ? "text-brand" : "text-text-muted"
                    )} />
                  </div>
                </div>

                <h3 className="text-2xl font-display font-medium mb-2">Inbound Sales Agent</h3>
                <p className="text-text-muted mb-12 h-6">{voiceStatus}</p>

                <button
                  onClick={toggleCall}
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-105",
                    callState === 'idle' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  )}
                >
                  {callState === 'idle' ? <Phone className="w-6 h-6 text-white" /> : <PhoneOff className="w-6 h-6 text-white" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
