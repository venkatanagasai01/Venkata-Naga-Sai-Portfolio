import HeroSection from "@/components/chapters/HeroSection";
import Chapter2Experience from "@/components/chapters/Chapter2_Experience";
import Chapter3Synapses from "@/components/chapters/Chapter3_Synapses";
import Chapter4Keynotes from "@/components/chapters/Chapter4_Keynotes";
import Chapter5Crucible from "@/components/chapters/Chapter5_Crucible";
import LiveStatus from "@/components/chapters/LiveStatus";
import Chapter9Knowledge from "@/components/chapters/Chapter9_Knowledge";
import Chapter10Certifications from "@/components/chapters/Chapter10_Certifications";
import Chapter6Handshake from "@/components/chapters/Chapter6_Handshake";
import FloatingNavbar from "@/components/layout/FloatingNavbar";

export default function Home() {
  return (
    <main className="w-full bg-[#050505]">
      <FloatingNavbar />
      <HeroSection />
      <Chapter2Experience />
      <Chapter4Keynotes />
      <Chapter3Synapses />
      <Chapter5Crucible />
      <Chapter9Knowledge />
      <Chapter10Certifications />
      <LiveStatus />
      <Chapter6Handshake />
    </main>
  );
}
