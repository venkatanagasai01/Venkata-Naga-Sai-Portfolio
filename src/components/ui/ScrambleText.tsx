"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const maxIterations = text.length;
    
    const interval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      // Increase iteration much faster for snappy UX
      if (iteration >= maxIterations) {
        clearInterval(interval);
      }
      
      iteration += 1; // Faster decode (was 1/3)
    }, 20); // Faster interval (was 30)

    return () => clearInterval(interval);
  }, [text, isInView]);

  return (
    <span ref={ref} className={className}>
      {displayText || text.replace(/./g, "_")}
    </span>
  );
}
