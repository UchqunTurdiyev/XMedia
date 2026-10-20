import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";
import { Marquee, Services, Manifesto, Process, Stats, Cases, LeadSection, FAQ } from "@/components/Sections";
import { Footer, FloatingCTA } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <Marquee />
        <Services />
        <Manifesto />
        <Process />
        <Stats />
        <Cases />
        <LeadSection />
        <FAQ />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
