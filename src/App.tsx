import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AgitateSection from './components/AgitateSection';
import StepsSection from './components/StepsSection';
import SolutionSection from './components/SolutionSection';
import ComparisonSection from './components/ComparisonSection';
import MarketProofSection from './components/MarketProofSection';
import FaqSection from './components/FaqSection';
import AuthoritySection from './components/AuthoritySection';
import FinalCtaSection from './components/FinalCtaSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AgitateSection />
        <StepsSection />
        <SolutionSection />
        <ComparisonSection />
        <MarketProofSection />
        <FaqSection />
        <AuthoritySection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
