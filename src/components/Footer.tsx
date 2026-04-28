import { Bot, Linkedin, Instagram, Youtube, Twitter, MessageSquare, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#0D1B2A] text-[#94A3B8] pt-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16">
          
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="w-11 h-11 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform duration-300">
                <Bot className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold leading-none tracking-tight flex items-center">
                  <span className="text-white">Auto</span>
                  <span className="text-brand">Flowmation</span>
                </span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed mb-8 pr-4">
              The leading AI Automation Agency in India.
              We help businesses automate operations,
              scale faster, and eliminate manual bottlenecks.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <a href="https://www.linkedin.com/in/autoflowmation-ai-6089673b3/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/autoflowmation.ai/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.youtube.com/@autoflowmationai" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand transition-colors"><Youtube className="w-5 h-5" /></a>
              <a href="https://x.com/autoflowmationai" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Column 2 — SERVICES */}
          <div>
            <button 
              onClick={() => toggleSection('services')}
              className="w-full flex items-center justify-between lg:block text-left"
            >
              <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.1em] mb-5">SERVICES</h4>
              <span className="lg:hidden text-white">{openSection === 'services' ? '−' : '+'}</span>
            </button>
            <ul className={cn(
              "space-y-3 pt-2 lg:pt-0 lg:block",
              openSection === 'services' ? "block" : "hidden"
            )}>
              <li><a href="/#services" className="hover:text-white transition-colors text-sm">WhatsApp AI Agent</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors text-sm">Voice Synthesis</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors text-sm">Private LLMs</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors text-sm">Autonomous Lead Flow</a></li>
              <li><a href="/#livelab" className="text-brand font-bold hover:text-white transition-colors text-sm flex items-center gap-1">Live Lab <ArrowRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* Column 3 — INDUSTRIES */}
          <div>
            <button 
              onClick={() => toggleSection('industries')}
              className="w-full flex items-center justify-between lg:block text-left"
            >
              <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.1em] mb-5">INDUSTRIES</h4>
              <span className="lg:hidden text-white">{openSection === 'industries' ? '−' : '+'}</span>
            </button>
            <ul className={cn(
              "space-y-3 pt-2 lg:pt-0 lg:block",
              openSection === 'industries' ? "block" : "hidden"
            )}>
              <li><Link to="/realestate" className="hover:text-white transition-colors text-sm">Real Estate</Link></li>
              <li><Link to="/healthcare" className="hover:text-white transition-colors text-sm">Healthcare & Clinics</Link></li>
              <li><Link to="/fitness" className="hover:text-white transition-colors text-sm">Fitness & Wellness</Link></li>
              <li><Link to="/ecommerce" className="hover:text-white transition-colors text-sm">Ecommerce</Link></li>
              <li><Link to="/edtech" className="hover:text-white transition-colors text-sm">EdTech & Coaching</Link></li>
              <li><Link to="/hospitality" className="hover:text-white transition-colors text-sm">Hospitality</Link></li>
              <li><Link to="/bfsi" className="hover:text-white transition-colors text-sm">BFSI</Link></li>
              <li><Link to="/#services" className="hover:text-white transition-colors text-sm">All Industries →</Link></li>
            </ul>
          </div>

          {/* Column 4 — COMPANY */}
          <div>
            <button 
              onClick={() => toggleSection('company')}
              className="w-full flex items-center justify-between lg:block text-left"
            >
              <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.1em] mb-5">COMPANY</h4>
              <span className="lg:hidden text-white">{openSection === 'company' ? '−' : '+'}</span>
            </button>
            <ul className={cn(
              "space-y-3 pt-2 lg:pt-0 lg:block",
              openSection === 'company' ? "block" : "hidden"
            )}>
              <li><a href="/" className="hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="/#case-studies" className="hover:text-white transition-colors text-sm">Case Studies</a></li>
              <li><a href="/#how-it-works" className="hover:text-white transition-colors text-sm">Blog & Guides</a></li>
            </ul>
          </div>

          {/* Column 5 — CONTACT */}
          <div>
            <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.1em] mb-5">CONTACT</h4>
            <div className="space-y-6">
              <div>
                <p className="text-white text-xs font-bold mb-1 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </p>
                <a href="https://wa.me/917794084682" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                  +91 77940 84682
                  <span className="block text-brand text-xs font-bold mt-1">Click to open WhatsApp →</span>
                </a>
              </div>
              
              <div>
                <p className="text-white text-xs font-bold mb-1 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> Email
                </p>
                <a href="mailto:hello@autoflowmation.ai" className="text-sm hover:text-white transition-colors">
                  hello@autoflowmation.ai
                </a>
              </div>

              <div>
                <p className="text-white text-xs font-bold mb-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Location
                </p>
                <p className="text-sm">
                  Kondapur, Hyderabad<br />
                  Telangana, India
                </p>
              </div>

              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-lg shadow-brand/20 flex items-center gap-2">
                Book Free Audit <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1E293B] py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-xs">
            © 2026 AutoFlowmation.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-[#64748B] hover:text-white transition-colors text-xs">Privacy Policy</Link>
            <span className="text-[#1E293B] hidden md:inline">·</span>
            <Link to="/terms" className="text-[#64748B] hover:text-white transition-colors text-xs">Terms of Service</Link>
            <span className="text-[#1E293B] hidden md:inline">·</span>
            <Link to="/privacy" className="text-[#64748B] hover:text-white transition-colors text-xs">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
