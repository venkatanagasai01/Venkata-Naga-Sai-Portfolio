import dynamic from "next/dynamic";
import HeroSection from "@/components/chapters/HeroSection";
import FloatingNavbar from "@/components/layout/FloatingNavbar";

// Lazy load below-the-fold components
const Chapter2Experience = dynamic(() => import("@/components/chapters/Chapter2_Experience"));
const Chapter3Synapses = dynamic(() => import("@/components/chapters/Chapter3_Synapses"));
const Chapter4Keynotes = dynamic(() => import("@/components/chapters/Chapter4_Keynotes"));
const Chapter5Crucible = dynamic(() => import("@/components/chapters/Chapter5_Crucible"));
const LiveStatus = dynamic(() => import("@/components/chapters/LiveStatus"));
const Chapter9Knowledge = dynamic(() => import("@/components/chapters/Chapter9_Knowledge"));
const Chapter10Certifications = dynamic(() => import("@/components/chapters/Chapter10_Certifications"));
const Chapter6Handshake = dynamic(() => import("@/components/chapters/Chapter6_Handshake"));
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
