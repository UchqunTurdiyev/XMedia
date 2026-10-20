import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Services, Manifesto, Cases, Clients, Process, Stats, LeadSection, FAQ } from "@/components/Sections";
import { Footer, FloatingCTA } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <Stats />
        <Services />
        <Cases />
        <Clients />
        <Manifesto />
        <Process />
        <LeadSection />
        <FAQ />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
