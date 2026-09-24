"use client";

// Performance-optimized: Pure CSS background instead of a full Three.js Canvas.
// The old version ran 500 particles on every animation frame, which is extremely
// expensive when layered behind an already GPU-heavy page.

export default function BackgroundSystem() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#030303] overflow-hidden">
      
      {/* Layer 1: Moving Gradient / Lighting — CSS animation, GPU-composited */}
      <div className="absolute inset-0 z-10 mix-blend-screen opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[150px] animate-[pulse_10s_ease-in-out_infinite] will-change-[opacity]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-[#ffffff] blur-[120px] animate-[pulse_8s_ease-in-out_infinite_reverse] will-change-[opacity]" />
      </div>

      {/* Layer 2: Glass/Noise overlay (Static SVG — zero runtime cost) */}
      <div className="absolute inset-0 z-20 opacity-[0.02] mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Layer 3: Vignette */}
      <div className="absolute inset-0 z-30 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#030303_150%)]" />

    </div>
  );
}
