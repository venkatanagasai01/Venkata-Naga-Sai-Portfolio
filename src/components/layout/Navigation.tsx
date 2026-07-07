"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { name: "Core", id: "about", href: "#about" },
  { name: "Systems", id: "models", href: "#models" },
  { name: "Capabilities", id: "capabilities", href: "#capabilities" },
  { name: "Logs", id: "logs", href: "#logs" },
  { name: "Link", id: "link", href: "#link" },
];

export default function Navigation() {
  const [active, setActive] = useState("Core");
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide navigation on scroll down
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActive(item.name);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav className="flex items-center gap-2 p-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.name;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  data-cursor="magnetic"
                  onClick={() => setActive(item.name)}
                  className={`relative flex items-center justify-center px-6 py-2.5 rounded-full transition-colors duration-300 ${
                    isActive ? "text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 font-sans text-xs uppercase tracking-widest font-medium mix-blend-difference">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
