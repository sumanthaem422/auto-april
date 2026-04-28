/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { Hero } from './components/Hero';
import { LiveLab } from './components/LiveLab';
import { VoiceDemos } from './components/VoiceDemos';
import { ROICalculator } from './components/ROICalculator';
import { BentoGrid } from './components/BentoGrid';
import { ProofPoints } from './components/ProofPoints';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';

import { IndustryPage } from './pages/IndustryPage';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <CurrencyProvider>
        <div className="min-h-screen bg-white text-text-main selection:bg-brand/30">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
            <section id="services">
      <BentoGrid />
    </section>
                  <section id="how-it-works">
                    <HowItWorks />
                  </section>
                  <VoiceDemos />
                  <section id="livelab">
                    <LiveLab />
                  </section>
                  <section id="roi">
                    <ROICalculator />
                  </section>
                  <section id="proof">
                    <ProofPoints />
                  </section>
                  <section id="case-studies">
                    <Testimonials />
                  </section>
                  <FinalCTA />
                </>
              } />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms-of-service" element={<Terms />} />
              <Route path="/:industryId" element={<IndustryPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CurrencyProvider>
    </Router>
  );
}
