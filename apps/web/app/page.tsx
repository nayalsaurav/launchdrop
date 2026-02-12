import HeroSection from "@/components/landing/hero";
import Feature from "@/components/landing/feature";
import PromotionalCard from "@/components/landing/cta";
import HowItWorksSection from "@/components/landing/how-it-works";
import Navbar from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
export default function Home() {
  return (
    <main className="min-h-screen font-mono bg-background dark:bg-[oklch(0.21_0.005_49.25)]">
      <Navbar />
      <HeroSection />
      <Feature />
      <HowItWorksSection />
      <PromotionalCard />
      <Footer />
    </main>
  );
}
