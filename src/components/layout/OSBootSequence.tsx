"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_MESSAGES = [
  "INITIALIZING NEURAL KERNEL...",
  "LOADING CORE MODULES: OK",
  "ESTABLISHING DATABASE CONNECTION: OK",
  "HYDRATING INTERFACE NODES: OK",
  "MOUNTING 3D ENVIRONMENT: OK",
  "AUTHENTICATING VISITOR...",
  "ACCESS GRANTED.",
  "WELCOME TO VNS-OS."
];

export default function OSBootSequence() {
  const [isBooting, setIsBooting] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [isSkipping, setIsSkipping] = useState(false);

  useEffect(() => {
    // Check if already booted in this session
    if (sessionStorage.getItem("hasBooted")) {
      setTimeout(() => setIsBooting(false), 0);
      return;
    }

    let currentIndex = 0;
    
    // Function to add next message
    const nextMessage = () => {
      if (currentIndex < BOOT_MESSAGES.length) {
        setMessages((prev) => [...prev, BOOT_MESSAGES[currentIndex]]);
        currentIndex++;
        // Randomize delay between messages for realism
        const delay = Math.random() * 300 + 100;
        setTimeout(nextMessage, delay);
      } else {
        // Finished booting
        setTimeout(() => {
          setIsSkipping(true);
          setTimeout(() => {
            setIsBooting(false);
            sessionStorage.setItem("hasBooted", "true");
          }, 800); // Wait for fade out
        }, 800);
      }
    };

    // Start boot sequence after initial tiny delay
    const startTimeout = setTimeout(nextMessage, 500);

    return () => {
      clearTimeout(startTimeout);
    };
  }, []);

  // Handle manual skip
  const handleSkip = () => {
    if (!isSkipping) {
      setIsSkipping(true);
      setTimeout(() => {
        setIsBooting(false);
        sessionStorage.setItem("hasBooted", "true");
      }, 800);
    }
  };

  if (!isBooting) return null;

  return (
    <AnimatePresence>
      {!isSkipping && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col justify-end p-8 md:p-16 cursor-pointer overflow-hidden"
          onClick={handleSkip}
        >
          
          {/* Subtle noise over the terminal */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }} />

          {/* CRT scanline effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10" />

          <div className="relative z-20 flex flex-col gap-2 max-w-3xl">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[#D4AF37] font-mono text-xs md:text-sm uppercase tracking-widest leading-relaxed drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
              >
                &gt; {msg}
              </motion.div>
            ))}
            
            {/* Blinking Cursor */}
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-3 h-5 bg-[#D4AF37] mt-2 shadow-[0_0_8px_#D4AF37]"
            />
          </div>
          
          <div className="absolute top-8 right-8 text-white/30 font-mono text-[10px] uppercase tracking-widest z-20">
            [CLICK ANYWHERE TO SKIP]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
