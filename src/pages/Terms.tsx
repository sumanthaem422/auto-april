import { useEffect } from 'react';
import { Bot, ArrowRight, MessageCircle } from 'lucide-react';

export function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-32">
        <div className="bg-brand/10 text-brand px-4 py-1 rounded-full text-xs font-bold inline-block mb-6">
          Last Updated: April 27, 2026
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#0D1B2A] mb-12">Terms of Service</h1>

        <div className="prose prose-slate max-w-none text-[#374151] space-y-8 leading-relaxed">
          <p>
            <strong>AutoFlowmation.ai</strong> ("Company," "we," "our," or "us") provides AI automation services including WhatsApp AI agents, voice automation, lead flow systems, and private LLM infrastructure. By accessing our website at <strong>autoflowmation.ai</strong> or engaging our services, you agree to be bound by these Terms of Service.
          </p>
          
          <p className="font-medium">Please read these terms carefully before using our services.</p>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using AutoFlowmation.ai's website, products, or services, you confirm that you are at least 18 years of age, have the legal authority to enter into a binding agreement, and agree to comply with these Terms of Service and all applicable laws.
            </p>
            <p className="mt-4">
              If you are accessing our services on behalf of a business or organization, you represent that you have the authority to bind that entity to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">2. Services Provided</h2>
            <p>AutoFlowmation.ai offers the following services (collectively, "Services"):</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>WhatsApp AI Agents:</strong> Automated conversational agents deployed on WhatsApp Business API for lead qualification, appointment booking, and customer support.</li>
              <li><strong>Voice Synthesis Agents:</strong> AI-powered inbound and outbound voice calling agents for customer interactions.</li>
              <li><strong>Private Large Language Models (LLMs):</strong> Custom AI models trained on your business data, SOPs, and workflows.</li>
              <li><strong>Autonomous Lead Flow Systems:</strong> Automated pipelines connecting advertising platforms to AI qualification agents.</li>
              <li><strong>Data Automation & Backend Infrastructure:</strong> Custom data pipelines, CRM integrations, and workflow automation.</li>
            </ul>
            <p className="mt-4">
              The exact scope of services delivered to each client is defined in a separate <strong>Statement of Work (SOW)</strong> or <strong>Service Agreement</strong> signed between AutoFlowmation.ai and the client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">3. Client Responsibilities</h2>
            <p>As a client or user of our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide accurate, complete, and up-to-date business information required for service delivery.</li>
              <li>Ensure you hold all necessary licenses and permissions to use WhatsApp Business API, telephony services, or any third-party platforms we integrate with on your behalf.</li>
              <li>Not use our AI systems to send spam, engage in fraudulent activity, harass individuals, or violate any applicable laws including the Information Technology Act, 2000 (India) and applicable TRAI regulations.</li>
              <li>Obtain all necessary consents from your end customers before contacting them via AI voice or WhatsApp automation.</li>
              <li>Comply with WhatsApp's Business Policy and Meta's Platform Terms when using WhatsApp AI agents.</li>
              <li>Promptly notify us of any unauthorized access, security breach, or misuse of the AI systems we deploy for you.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">4. Payment Terms</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#0D1B2A]">4.1 Fees</h3>
                <p>All service fees are outlined in your individual Service Agreement or Statement of Work. Fees are denominated in Indian Rupees (₹) unless otherwise agreed in writing.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#0D1B2A]">4.2 Setup Fees</h3>
                <p>A one-time setup fee is charged at the time of project commencement. This fee is non-refundable once work has commenced.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#0D1B2A]">4.3 Monthly Retainer</h3>
                <p>Ongoing platform and support fees are billed monthly in advance. Invoices are raised on the 1st of each calendar month.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#0D1B2A]">4.4 Late Payments</h3>
                <p>Payments not received within 15 days of the invoice date will attract a late fee of 2% per month on the outstanding balance. Continued non-payment beyond 30 days may result in suspension of services.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#0D1B2A]">4.5 Price Changes</h3>
                <p>AutoFlowmation.ai reserves the right to revise pricing with 30 days' written notice to existing clients.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">5. Intellectual Property</h2>
            <div className="space-y-4">
              <p><strong>5.1 Our Property:</strong> All software, AI models (except private LLMs trained exclusively on your data), workflows, automation frameworks, code, designs, and methodologies created by AutoFlowmation.ai remain the exclusive intellectual property of AutoFlowmation.ai.</p>
              <p><strong>5.2 Your Data:</strong> All business data, SOPs, customer data, call recordings, and content you provide to us remains your exclusive property. We do not claim any ownership over your data.</p>
              <p><strong>5.3 Private LLMs:</strong> AI models trained exclusively on your proprietary business data are owned by you upon full payment of all outstanding fees. AutoFlowmation.ai retains the right to use anonymized, aggregated, non-identifiable data to improve our services.</p>
              <p><strong>5.4 Work Product:</strong> Unless explicitly stated otherwise in your Service Agreement, any custom automation, chatbot flows, or AI configurations built specifically for your business are licensed to you for your business use only and may not be resold or sublicensed.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">6. Data Privacy & Security</h2>
            <div className="space-y-4">
              <p><strong>6.1 Data Handling:</strong> We handle all client and end-customer data in accordance with our <strong>Privacy Policy</strong> available at autoflowmation.ai/privacy.</p>
              <p><strong>6.2 Data Storage:</strong> Client data is stored on secure cloud infrastructure (Google Cloud Platform or equivalent). We implement industry-standard encryption (AES-256 at rest, TLS 1.3 in transit).</p>
              <p><strong>6.3 Third-Party Processors:</strong> To deliver our services, we may share data with third-party service providers including but not limited to: OpenAI, Google Cloud, Meta (WhatsApp Business API), Twilio, and Vapi.ai. Each processor is bound by their own privacy and security terms.</p>
              <p><strong>6.4 Data Retention:</strong> We retain client data for the duration of the service engagement plus 12 months thereafter, unless a different period is agreed upon or required by law. Upon written request, we will delete your data within 30 days.</p>
              <p><strong>6.5 No Sale of Data:</strong> AutoFlowmation.ai does not sell, rent, or trade your personal or business data to any third party for marketing purposes.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">7. Confidentiality</h2>
            <p>Both parties agree to keep confidential all proprietary information shared during the engagement, including business strategies, customer data, pricing, and technical specifications. This obligation survives the termination of the service agreement for a period of 3 years.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">8. Limitation of Liability</h2>
            <div className="space-y-4">
              <p><strong>8.1 Service Availability:</strong> While we strive for maximum uptime and reliability, AutoFlowmation.ai does not guarantee uninterrupted service. Scheduled maintenance, third-party platform outages (WhatsApp, Twilio, etc.), or force majeure events may cause temporary service disruptions. We will notify clients of planned downtime with reasonable advance notice.</p>
              <p><strong>8.2 Liability Cap:</strong> To the maximum extent permitted by applicable law, AutoFlowmation.ai's total liability to you for any claim arising from or related to our services shall not exceed the total fees paid by you in the 3 months immediately preceding the event giving rise to the claim.</p>
              <p><strong>8.3 Exclusion of Consequential Damages:</strong> AutoFlowmation.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of revenue, loss of data, loss of customers, or business interruption, even if we have been advised of the possibility of such damages.</p>
              <p><strong>8.4 Third-Party Platforms:</strong> We are not responsible for changes, outages, policy violations, or account suspensions on third-party platforms (WhatsApp, Meta, Google, Twilio, etc.) that affect service delivery.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">9. Prohibited Uses</h2>
            <p>You may not use our services to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Send unsolicited bulk messages (spam) via WhatsApp or voice calls.</li>
              <li>Impersonate any person, business, or organization.</li>
              <li>Violate any individual's privacy or data protection rights.</li>
              <li>Engage in any fraudulent, deceptive, or misleading communications.</li>
              <li>Violate TRAI regulations, Do-Not-Disturb (DND) registry rules, or any other applicable Indian telecommunications laws.</li>
              <li>Use AI voice agents to claim to be a human when directly and sincerely asked by a caller.</li>
              <li>Conduct any illegal activity or facilitate illegal conduct.</li>
            </ul>
            <p className="mt-4">Violation of prohibited uses may result in immediate suspension of services without refund.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">10. Termination</h2>
            <div className="space-y-4">
              <p><strong>10.1 By Client:</strong> You may terminate our services with 30 days' written notice. All outstanding invoices must be settled prior to termination. Setup fees and any work completed to date are non-refundable.</p>
              <p><strong>10.2 By AutoFlowmation.ai:</strong> We reserve the right to suspend or terminate services immediately if payment is overdue, terms are breached, or illegal conduct is detected.</p>
              <p><strong>10.3 Effect of Termination:</strong> Upon termination, we will provide you with your data in a standard exportable format within 15 business days. After this period, your data will be deleted.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">11. Dispute Resolution</h2>
            <p>Disputes shall be resolved through binding arbitration conducted in Hyderabad, Telangana, India, under the Arbitration and Conciliation Act, 1996. The governing law is the law of India.</p>
          </section>

          <section className="bg-slate-50 p-8 rounded-3xl border border-border mt-12">
            <h2 className="text-2xl font-display font-bold text-[#0D1B2A] mb-4">15. Contact Information</h2>
            <p className="font-bold mb-4">AutoFlowmation.ai</p>
            <ul className="space-y-2 text-sm">
              <li>📧 Email: <a href="mailto:legal@autoflowmation.ai" className="text-brand hover:underline">legal@autoflowmation.ai</a></li>
              <li>📱 WhatsApp: <a href="https://wa.me/917794084682" className="text-brand hover:underline">+91 77940 84682</a></li>
              <li>📍 Kondapur, Hyderabad, Telangana – 500084, India</li>
            </ul>
          </section>
        </div>

        <div className="mt-16 bg-[#2563EB] rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Have questions about our terms?</h3>
            <p className="text-white/80">We're happy to explain anything.</p>
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
