"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const THEMES = [
  { id: "gold", name: "Gold", color: "#D4AF37" },
  { id: "emerald", name: "Emerald", color: "#10B981" },
  { id: "azure", name: "Azure", color: "#3B82F6" },
];

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("gold");

  const setTheme = (themeId: string) => {
    const theme = THEMES.find((t) => t.id === themeId);
    if (theme) {
      document.documentElement.style.setProperty("--accent", theme.color);
      setActiveTheme(themeId);
      localStorage.setItem("portfolio-theme", themeId);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
        aria-label="Toggle theme"
        data-cursor="hover"
      >
        <Palette size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-full right-0 mt-2 p-2 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl flex flex-col gap-2 min-w-[120px]"
          >
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-sans ${
                  activeTheme === theme.id ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.color }}
                />
                {theme.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
