import { useEffect } from 'react';
import { Bot, Mail, Shield, Lock, Eye, FileText, MessageCircle } from 'lucide-react';

export function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-32">
        <div className="bg-brand/10 text-brand px-4 py-1 rounded-full text-xs font-bold inline-block mb-6">
          Last Updated: April 27, 2026
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#0D1B2A] mb-12">Privacy Policy</h1>

        <div className="prose prose-slate max-w-none text-[#374151] space-y-12 leading-relaxed">
          <p>
            At <strong>AutoFlowmation.ai</strong>, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your data when you use our website and services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <div className="p-6 bg-slate-50 rounded-2xl border border-border">
              <Shield className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-[#0D1B2A] mb-2">Data Security</h3>
              <p className="text-sm">Industry-standard encryption (AES-256 at rest, TLS 1.3 in transit).</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-border">
              <Lock className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-[#0D1B2A] mb-2">No Data Sale</h3>
              <p className="text-sm">We never sell, rent, or trade your data to third parties for marketing.</p>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-brand" /> 1. What Data We Collect
            </h2>
            <p>We collect information that helps us deliver and improve our services:</p>
            <ul className="list-disc pl-6 space-y-3 mt-4">
              <li><strong>Contact Information:</strong> Name, phone number, work email address, and business details.</li>
              <li><strong>Communication Data:</strong> Chat transcripts from WhatsApp AI agents and recordings/transcripts from voice automation.</li>
              <li><strong>Usage Data:</strong> Analytics data such as page views, interaction with AI demos, and ROI calculator inputs.</li>
              <li><strong>Business Data:</strong> SOPs, documents, and workflows you provide to train custom AI models.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-brand" /> 2. How We Use Your Data
            </h2>
            <p>Your data is used strictly for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-3 mt-4">
              <li><strong>Service Delivery:</strong> To deploy and manage your AI agents, process leads, and integrate with your CRM.</li>
              <li><strong>Improvement:</strong> To fine-tune AI models and enhance the accuracy of conversational agents.</li>
              <li><strong>Billing:</strong> To process payments and manage your service subscription.</li>
              <li><strong>Communication:</strong> To send you project updates, support notifications, and calendar invites for demos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-brand" /> 3. Data Sharing
            </h2>
            <p>We do not share your personal data except with trusted service providers needed for operation:</p>
            <ul className="list-disc pl-6 space-y-3 mt-4">
              <li><strong>AI Infrastructure:</strong> OpenAI, Google Cloud Platform.</li>
              <li><strong>Communication Platforms:</strong> Meta (WhatsApp Business API), Twilio, Vapi.ai.</li>
              <li><strong>Analytics:</strong> Google Analytics, Microsoft Clarity (to improve user experience).</li>
            </ul>
            <p className="mt-4 italic">Each processor is strictly bound by security and privacy agreements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-brand" /> 4. Your Rights
            </h2>
            <p>You have full control over your data. You may request:</p>
            <ul className="list-disc pl-6 space-y-3 mt-4">
              <li><strong>Access:</strong> A copy of all data we hold about you.</li>
              <li><strong>Correction:</strong> Updates to any inaccurate information.</li>
              <li><strong>Deletion:</strong> Permanent removal of your data within 30 days of request.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-6">5. Cookie Policy</h2>
            <p>
              We use only essential and analytics cookies (Google Analytics, Clarity) to understand how users interact with our site. We do not use cookies for behavioral tracking or targeted advertising.
            </p>
          </section>

          <section className="bg-slate-50 p-8 rounded-3xl border border-border mt-12">
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">Contact for Privacy Requests</h2>
            <p className="mb-6">For any privacy-related requests or questions about our data handling practices:</p>
            <ul className="space-y-3 text-sm">
              <li>📧 Email: <a href="mailto:privacy@autoflowmation.ai" className="text-brand hover:underline font-bold">privacy@autoflowmation.ai</a></li>
              <li>📍 Governed by IT Act, 2000 and DPDP Act, 2023 (India)</li>
            </ul>
          </section>
        </div>

        <div className="mt-16 bg-[#2563EB] rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Concerned about your data?</h3>
            <p className="text-white/80">We're happy to answer any security questions.</p>
          </div>
          <button className="bg-white text-[#2563EB] px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/90 transition-all whitespace-nowrap">
            <MessageCircle className="w-5 h-5" />
            Chat with Us on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
