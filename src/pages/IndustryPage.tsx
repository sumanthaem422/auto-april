import React from 'react';
import { motion } from 'motion/react';
import { Bot, CheckCircle2, MessageSquare, Phone, Target, Zap, ArrowRight, ShieldCheck, TrendingUp, Clock } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

interface IndustryContent {
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  benefits: { title: string; desc: string; icon: React.ReactNode }[];
  useCases: { title: string; desc: string }[];
  stats: { label: string; value: string }[];
}

const INDUSTRY_DATA: Record<string, IndustryContent> = {
  realestate: {
    title: 'AI Automation for Real Estate',
    subtitle: 'Never miss a property inquiry again. Qualify leads and book viewings 24/7.',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
    description: 'Transform your real estate agency into a 24/7 lead-generating machine. Our AI agents handle inquiries from WhatsApp, Instagram, and web portals instantly, qualifying buyers and sellers before they ever talk to your human agents.',
    benefits: [
      { title: 'Instant Qualification', desc: 'Verify budget, location preference, and timeline within seconds of the first message.', icon: <Target className="w-6 h-6 text-brand" /> },
      { title: 'Automated Viewings', desc: 'AI syncs with your calendar to book property tours without back-and-forth emails.', icon: <TrendingUp className="w-6 h-6 text-brand" /> },
      { title: 'Omnichannel Defense', desc: 'Capture leads from MagicBricks, Housing.com, Instagram, and WhatsApp in one central CRM.', icon: <ShieldCheck className="w-6 h-6 text-brand" /> }
    ],
    useCases: [
      { title: 'New Launch Campaigns', desc: 'Handle thousands of simultaneous inquiries for new project launches without scaling your team.' },
      { title: 'Rental Management', desc: 'Collect applicant details, run basic screenings, and schedule walkthroughs automatically.' },
      { title: 'Seller Valuation', desc: 'Engage potential sellers with instant automated property value estimations to capture listing leads.' }
    ],
    stats: [
      { label: 'Faster Response', value: '10x' },
      { label: 'Booking Rate', value: '+45%' },
      { label: 'Cost per Lead', value: '-60%' }
    ]
  },
  healthcare: {
    title: 'AI for Healthcare & Clinics',
    subtitle: 'Smooth patient onboarding and 24/7 appointment management.',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
    description: 'Streamline your clinic operations with HIPAA-compliant AI agents. From booking consultations to following up on lab results, our AI handles the administrative burden so your medical staff can focus on patient care.',
    benefits: [
      { title: 'Patient Onboarding', desc: 'Collect medical history and symptoms securely before the first visit.', icon: <Bot className="w-6 h-6 text-brand" /> },
      { title: 'Follow-up Automation', desc: 'Automated post-procedure check-ins to ensure patient recovery and satisfaction.', icon: <CheckCircle2 className="w-6 h-6 text-brand" /> },
      { title: 'Slot Optimization', desc: 'Reduce no-shows with smart reminders and instant rescheduling capabilities.', icon: <Zap className="w-6 h-6 text-brand" /> }
    ],
    useCases: [
      { title: 'Dental & Aesthetics', desc: 'Showcase before/after transformations via WhatsApp and book consultations instantly.' },
      { title: 'Telemedicine Triaging', desc: 'AI triages patient severity and routes them to the correct specialist or emergency care.' },
      { title: 'Lab Result Queries', desc: 'Authenticated patients can get instant simple explanations of their routine lab results.' }
    ],
    stats: [
      { label: 'No-Show Reduction', value: '35%' },
      { label: 'Staff Time Saved', value: '25hrs/wk' },
      { label: 'Patient Rating', value: '4.9/5' }
    ]
  },
  fitness: {
    title: 'AI for Fitness & Wellness',
    subtitle: 'Automate gym memberships, personal training bookings, and lead follow-ups.',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
    description: 'Stop losing potential members to slow response times. Our AI handles membership inquiries instantly on WhatsApp, books trial sessions, and follows up with "ghosted" leads automatically.',
    benefits: [
      { title: '24/7 Lead Response', desc: 'Respond to gym inquiries on WhatsApp and Instagram in under 30 seconds.', icon: <MessageSquare className="w-6 h-6 text-brand" /> },
      { title: 'Personalized Journeys', desc: 'AI recommends classes or personal trainers based on student fitness goals.', icon: <Target className="w-6 h-6 text-brand" /> },
      { title: 'Membership Recovery', desc: 'Automatically re-engage members whose memberships are about to expire or have lapsed.', icon: <Zap className="w-6 h-6 text-brand" /> }
    ],
    useCases: [
      { title: 'Trial Class Booking', desc: 'AI qualifiers book high-intent prospects into your next free trial session.' },
      { title: 'Payment Reminders', desc: 'Gentle, automated nudges for membership renewals without manual calls.' },
      { title: 'Feedback Loop', desc: 'Collect sentiment data after ogni workout session to improve member satisfaction.' }
    ],
    stats: [
      { label: 'Lead Conversion', value: '2.5x' },
      { label: 'Retention Rate', value: '+22%' },
      { label: 'Response Time', value: '<30s' }
    ]
  },
  ecommerce: {
    title: 'AI for Ecommerce & Retail',
    subtitle: 'Recover abandoned carts and answer product queries on autopilot.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    description: 'Bring the shopping assistance of an in-store employee to your digital storefront. Our AI agents handle pre-purchase questions, track orders, and recover abandoned sales through automated WhatsApp and Instagram chat.',
    benefits: [
      { title: 'Cart Recovery', desc: 'High-conversion WhatsApp reminders for users who left items in their cart.', icon: <Bot className="w-6 h-6 text-brand" /> },
      { title: 'Order Tracking', desc: 'Automated status updates so your support team doesn\'t get "Where is my order?" calls.', icon: <Clock className="w-6 h-6 text-brand" /> },
      { title: 'Product Recommendation', desc: 'AI suggests complementary products based on browsing history and current cart.', icon: <CheckCircle2 className="w-6 h-6 text-brand" /> }
    ],
    useCases: [
      { title: 'Pre-sale Inquiries', desc: 'Answer "Will this fit?" or "Is this in stock?" instantly at the point of purchase.' },
      { title: 'Return Management', desc: 'Automated self-service return workflows that keep customers happy and reduce overhead.' },
      { title: 'Personalized Discounts', desc: 'AI offers time-sensitive discounts to users who spend too long on the checkout page.' }
    ],
    stats: [
      { label: 'Cart Recovery', value: '18%' },
      { label: 'Support Volume', value: '-65%' },
      { label: 'Repeat Sales', value: '+30%' }
    ]
  },
  edtech: {
    title: 'AI for EdTech & Coaching',
    subtitle: 'Automate student admissions, course queries, and student engagement.',
    heroImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200',
    description: 'Transform your educational platform with AI that speaks your language. From handling admission queries to personalized study reminders, our AI helps you maintain 24/7 student engagement across all platforms.',
    benefits: [
      { title: 'Admissions Automation', desc: 'Pre-calculate eligibility and book counselor calls for high-intent students.', icon: <CheckCircle2 className="w-6 h-6 text-brand" /> },
      { title: '24/7 Query Support', desc: 'Answer complex student questions about course modules or fees instantly.', icon: <MessageSquare className="w-6 h-6 text-brand" /> },
      { title: 'Student Nurturing', desc: 'AI sends personalized course updates and motivation based on student activity.', icon: <Zap className="w-6 h-6 text-brand" /> }
    ],
    useCases: [
      { title: 'Enrollment Support', desc: 'AI handles the entire documentation query process for new admissions.' },
      { title: 'Doubt Resolution', desc: 'Basic conceptual queries answered by AI trained on your course materials.' },
      { title: 'Fee Reminders', desc: 'Automated, polite WhatsApp reminders for upcoming or pending fee payments.' }
    ],
    stats: [
      { label: 'Enrollment Rate', value: '+42%' },
      { label: 'Response Speed', value: 'Instantly' },
      { label: 'Support Efficiency', value: '+80%' }
    ]
  },
  hospitality: {
    title: 'AI for Hospitality & Hotels',
    subtitle: 'Automate guest bookings, check-in info, and concierge services.',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    description: 'Provide a 5-star digital concierge experience. Our AI agents handle booking modifications, room service requests, and check-out procedures, allowing your staff to focus on in-person guest experiences.',
    benefits: [
      { title: 'Booking Conversion', desc: 'Direct booking assistance via WhatsApp to bypass OTA commissions.', icon: <TrendingUp className="w-6 h-6 text-brand" /> },
      { title: 'Instant Concierge', desc: 'Answer guest questions about Wi-Fi, pool hours, or local dining instantly.', icon: <MessageSquare className="w-6 h-6 text-brand" /> },
      { title: 'Automated Check-out', desc: 'Smooth check-out process and review collection via automated chat.', icon: <Zap className="w-6 h-6 text-brand" /> }
    ],
    useCases: [
      { title: 'Reservation Management', desc: 'AI handles dates changes, upgrades, and cancellations on the fly.' },
      { title: 'Upsell Campaigns', desc: 'Send personalized spa or dining offers to guests during their stay.' },
      { title: 'Review Collection', desc: 'Automated post-stay surveys that drive your Google and TripAdvisor ratings.' }
    ],
    stats: [
      { label: 'Direct Bookings', value: '+25%' },
      { label: 'Guest Feedback', value: '+34%' },
      { label: 'Staff Efficiency', value: '+40%' }
    ]
  },
  bfsi: {
    title: 'AI for Financial Services (BFSI)',
    subtitle: 'Secure automation for banking, insurance, and investment firms.',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    description: 'Modernize your financial services with high-security AI automation. Our agents assist with loan eligibility checks, policy status queries, and personalized financial product recommendations while ensuring maximum data privacy.',
    benefits: [
      { title: 'Eligibility Screening', desc: 'Advanced AI filters for loan or credit card applicants based on your criteria.', icon: <Target className="w-6 h-6 text-brand" /> },
      { title: 'Policy Assistance', desc: 'Instant clarity for customers on insurance coverage or investment performance.', icon: <MessageSquare className="w-6 h-6 text-brand" /> },
      { title: 'Document Collection', desc: 'Seamlessly guide customers through KYC and document upload processes.', icon: <ShieldCheck className="w-6 h-6 text-brand" /> }
    ],
    useCases: [
      { title: 'Lead Pre-qualification', desc: 'AI qualifies high-net-worth individual leads for your advisory team.' },
      { title: 'Claim Status', desc: 'Instant updates on insurance claim progress, reducing call center volume.' },
      { title: 'Renewals & Reminders', desc: 'Automated high-conversion reminders for policy renewals or EMI payments.' }
    ],
    stats: [
      { label: 'Onboarding Speed', value: '3x Faster' },
      { label: 'Qualified Leads', value: '+110%' },
      { label: 'Support Cost', value: '-55%' }
    ]
  },
  manufacturing: {
    title: 'AI for Manufacturing',
    subtitle: 'Streamline supply chain queries and shop floor documentation.',
    heroImage: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5e8a?auto=format&fit=crop&q=80&w=1200',
    description: 'Bring modern efficiency to the industrial world. Our AI agents handle internal supply chain inquiries, status updates for vendors, and automated shop floor reporting, reducing communication bottlenecks.',
    benefits: [
      { title: 'Vendor Management', desc: 'Automate status queries for parts and materials through secure voice and chat.', icon: <TrendingUp className="w-6 h-6 text-brand" /> },
      { title: 'Shop Floor Support', desc: 'Workers can query safety manuals or SOPs using natural voice commands.', icon: <ShieldCheck className="w-6 h-6 text-brand" /> },
      { title: 'Incident Reporting', desc: 'Hands-free automated logging of maintenance issues or safety incidents.', icon: <Zap className="w-6 h-6 text-brand" /> }
    ],
    useCases: [
      { title: 'Supply Chain Sync', desc: 'AI tracks shipment locations and updates ERP systems automatically.' },
      { title: 'Safety Training', desc: 'On-demand AI-narrated safety refreshers for workers entering specific zones.' },
      { title: 'Maintenance Logs', desc: 'Predictive maintenance reminders and automated ticket creation via AI analysis.' }
    ],
    stats: [
      { label: 'Response Speed', value: '5x' },
      { label: 'Downtime Reduction', value: '15%' },
      { label: 'Admin Overhead', value: '-40%' }
    ]
  },
  logistics: {
    title: 'AI for Logistics & Transport',
    subtitle: 'Automate dispatch, route queries, and customer status updates.',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    description: 'Keep your fleet moving with AI-driven operations. Our agents coordinate between drivers and dispatchers, handle customer tracking requests, and manage last-mile delivery communications automatically.',
    benefits: [
      { title: 'Delivery Updates', desc: 'Proactive AI notifications to customers via WhatsApp for real-time tracking.', icon: <Clock className="w-6 h-6 text-brand" /> },
      { title: 'Driver Assistance', desc: 'Voice-enabled route updates and load information for drivers on the go.', icon: <Phone className="w-6 h-6 text-brand" /> },
      { title: 'Proof of Delivery', desc: 'Automated collection of delivery confirmations and customer feedback.', icon: <CheckCircle2 className="w-6 h-6 text-brand" /> }
    ],
    useCases: [
      { title: 'Dynamic Routing', desc: 'AI communicates route changes to drivers based on real-time traffic data.' },
      { title: 'Custome Inquiries', desc: 'Handle "Where is my package?" queries 24/7 without human intervention.' },
      { title: 'Freight Matching', desc: 'Instantly qualify carrier leads and match them with available loads.' }
    ],
    stats: [
      { label: 'Delivery Accuracy', value: '99%' },
      { label: 'Support Volume', value: '-70%' },
      { label: 'Ops Efficiency', value: '+45%' }
    ]
  },
  energy: {
    title: 'AI for Energy & Utilities',
    subtitle: 'Automate outage reporting and energy efficiency advisory.',
    heroImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200',
    description: 'Modernize utility management with AI-first customer service. Our agents handle high-volume outage reports during emergencies and provide personalized energy-saving tips to residential and commercial clients.',
    benefits: [
      { title: 'Crisis Management', desc: 'Handle thousands of simultaneous outage reports during storms without crashing.', icon: <Zap className="w-6 h-6 text-brand" /> },
      { title: 'Smart Billing Help', desc: 'Explain complex energy bills and tier structures to customers instantly.', icon: <MessageSquare className="w-6 h-6 text-brand" /> },
      { title: 'Renewable Advisor', desc: 'Qualify leads for solar installations or heat pump upgrades automatically.', icon: <Target className="w-6 h-6 text-brand" /> }
    ],
    useCases: [
      { title: 'Outage Triaging', desc: 'AI identifies and groups reports to help field teams prioritize repairs.' },
      { title: 'Usage Insights', desc: 'Provide customers with real-time feedback on their peak-hour energy usage.' },
      { title: 'Field Service Sync', desc: 'Automated scheduling for meter readings or equipment inspections.' }
    ],
    stats: [
      { label: 'Crisis Capacity', value: 'Unlimited' },
      { label: 'CSAT Score', value: '+40%' },
      { label: 'Carbon Impact', value: '-12%' }
    ]
  }
};

export function IndustryPage() {
  const { industryId } = useParams<{ industryId: string }>();
  const content = industryId ? INDUSTRY_DATA[industryId] : null;

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4 font-syne">Industry Page Not Found</h1>
        <Link to="/" className="text-brand font-bold flex items-center gap-2">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-bg-secondary">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-brand font-bold text-xs uppercase tracking-widest mb-4 block">Industries / {industryId?.toUpperCase()}</span>
              <h1 className="text-4xl md:text-6xl font-black font-syne text-heading mb-6 leading-tight">
                {content.title}
              </h1>
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                {content.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/917794084682"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-brand/20"
                >
                  Book Industry Audit <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src={content.heroImage} alt={content.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-black font-syne text-heading">{content.stats[0].value}</div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider">{content.stats[0].label}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-24 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black font-syne text-heading mb-8">The Future of {content.title.split('for ')[1] || 'Your Industry'}</h2>
          <p className="text-xl text-text-muted leading-relaxed">
            {content.description}
          </p>
        </section>

        {/* Benefits Grid */}
        <section className="py-24 bg-heading text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-black font-syne mb-16 text-center">Why AI is Essential</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {content.benefits.map((benefit, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                  <div className="mb-6">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-white/60 leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black font-syne text-heading mb-8">Specific Use Cases</h2>
                <div className="space-y-6">
                  {content.useCases.map((useCase, i) => (
                    <div key={i} className="flex gap-4 p-6 rounded-2xl bg-bg-secondary border border-border">
                      <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center shrink-0 text-xs font-bold">{i + 1}</div>
                      <div>
                        <h4 className="font-bold text-heading mb-1">{useCase.title}</h4>
                        <p className="text-sm text-text-muted font-medium">{useCase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {content.stats.slice(1).map((stat, i) => (
                  <div key={i} className="bg-brand/5 border border-brand/10 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                    <div className="text-4xl font-black font-syne text-brand mb-2">{stat.value}</div>
                    <div className="text-xs font-black text-text-muted uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-brand text-white text-center mx-6 my-24 rounded-[3rem] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black font-syne mb-8">Ready to Automate?</h2>
            <p className="text-lg mb-10 font-medium opacity-90">
              Join leading {content.title.split('for ')[1]} businesses using AutoFlowmation.ai to scale without adding headcount.
            </p>
            <a 
              href="https://wa.me/917794084682"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-brand px-12 py-5 rounded-full font-black text-lg inline-flex items-center gap-3 shadow-xl hover:scale-105 transition-transform"
            >
              Start Your Pilot <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
