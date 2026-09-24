"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<"default" | "hover" | "magnetic">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Single cursor — removed the second "trail" cursor entirely.
  // Two independent spring-animated divs tracking the mouse on every
  // move event was doubling the compositor work for minimal visual gain.
  const springConfig = { damping: 20, stiffness: 600, mass: 0.05 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest("[data-cursor='magnetic']")) {
        setHoverState("magnetic");
        return;
      }
      
      if (target.closest("[data-cursor='hover']")) {
        setHoverState("hover");
        return;
      }
      
      setHoverState("default");
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouchDevice, mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  const isHover = hoverState === "hover";
  const isMagnetic = hoverState === "magnetic";
  const mainSize = isHover || isMagnetic ? 12 : 6;

  return (
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
          height: mainSize,
          backgroundColor: isHover ? "rgba(255,255,255,0.1)" : isMagnetic ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,1)",
          border: isHover || isMagnetic ? "1px solid rgba(255,255,255,0.5)" : "0px solid transparent",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="rounded-full flex items-center justify-center overflow-hidden"
      />
    </motion.div>
  );
}
