"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<"default" | "hover" | "magnetic">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Main cursor physics (Fast)
  const springConfigMain = { damping: 20, stiffness: 800, mass: 0.05 };
  const cursorX = useSpring(mouseX, springConfigMain);
  const cursorY = useSpring(mouseY, springConfigMain);

  // Trail physics (Slower, creates the trail effect)
  const springConfigTrail = { damping: 25, stiffness: 400, mass: 0.2 };
  const trailX = useSpring(mouseX, springConfigTrail);
  const trailY = useSpring(mouseY, springConfigTrail);

  useEffect(() => {
    // Check if it's a touch device on mount
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      if (hoverState === "magnetic" && magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Parallax effect on magnetic target
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        mouseX.set(centerX + distanceX * 0.15);
        mouseY.set(centerY + distanceY * 0.15);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const magnetic = target.closest("[data-cursor='magnetic']") as HTMLElement;
      if (magnetic) {
        setHoverState("magnetic");
        setMagneticTarget(magnetic);
        return;
      }
      
      const hover = target.closest("[data-cursor='hover']");
      if (hover) {
        setHoverState("hover");
        setMagneticTarget(null);
        return;
      }
      
      setHoverState("default");
      setMagneticTarget(null);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [hoverState, magneticTarget, mouseX, mouseY]);

  if (isTouchDevice) return null;

  // Visual states
  const isHover = hoverState === "hover";
  const isMagnetic = hoverState === "magnetic" && magneticTarget;

  let mainSize = 6;
  let trailSize = 16;

  if (isHover) {
    mainSize = 12;
    trailSize = 0; // Hide trail on hover
  } else if (isMagnetic && magneticTarget) {
    const rect = magneticTarget.getBoundingClientRect();
    mainSize = Math.max(rect.width, rect.height) + 16;
    trailSize = 0;
  }

  return (
    <>
      {/* Trailing Cursor (Glow) */}
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none hidden md:flex items-center justify-center mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          opacity: isVisible && !isHover && !isMagnetic ? 0.5 : 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: trailSize,
            height: trailSize,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="rounded-full bg-accent/30 blur-[8px]"
        />
      </motion.div>

      {/* Main Cursor (Dot / Expandable) */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: mainSize,
            height: isMagnetic ? mainSize * 0.4 : mainSize,
            backgroundColor: isHover ? "rgba(255,255,255,0.1)" : isMagnetic ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,1)",
            border: isHover ? "1px solid rgba(255,255,255,0.5)" : isMagnetic ? "1px solid rgba(255,255,255,0.2)" : "0px solid transparent",
            borderRadius: isMagnetic ? "24px" : "9999px",
            backdropFilter: isHover || isMagnetic ? "blur(4px)" : "blur(0px)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-center justify-center overflow-hidden"
        >
        </motion.div>
      </motion.div>
    </>
  );
}
