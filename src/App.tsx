/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurrencyProvider } from './context/CurrencyContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveLab } from './components/LiveLab';
import { VoiceDemos } from './components/VoiceDemos';
import { ROICalculator } from './components/ROICalculator';
import { BentoGrid } from './components/BentoGrid';
import { ProofPoints } from './components/ProofPoints';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-bg text-text-main selection:bg-brand/30">
        <Navbar />
        <main>
          <Hero />
          <BentoGrid />
          <VoiceDemos />
          <LiveLab />
          <ROICalculator />
          <ProofPoints />
        </main>
        <Footer />
      </div>
    </CurrencyProvider>
  );
}
