"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User } from "lucide-react";

type Message = { role: "user" | "ai"; content: string };

const MOCK_KNOWLEDGE: Record<string, string> = {
  "who is sai": "Venkata Naga Sai is an AI & Data Science engineering student at Chaitanya Bharathi Institute of Technology. He specializes in building scalable full-stack applications with React, Next.js, and integrating state-of-the-art machine learning models.",
  "technologies": "He is highly proficient in React, Next.js, TypeScript, Python, TensorFlow, Spring Boot, and Node.js. He also has strong fundamentals in Data Structures & Algorithms and Database management (SQL/Supabase).",
  "hire": "You should hire Sai because he doesn't just write code; he architects solutions. His unique blend of full-stack engineering and AI expertise allows him to build intelligent products from end-to-end, as demonstrated by his QuantVision AI project.",
  "quantvision": "QuantVision AI is an end-to-end stock prediction platform processing 15+ financial indicators in real-time. It achieved 82% directional prediction accuracy using TensorFlow and features a modular React frontend."
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("who")) return MOCK_KNOWLEDGE["who is sai"];
  if (lower.includes("tech") || lower.includes("skill")) return MOCK_KNOWLEDGE["technologies"];
  if (lower.includes("hire") || lower.includes("why")) return MOCK_KNOWLEDGE["hire"];
  if (lower.includes("quantvision") || lower.includes("project")) return MOCK_KNOWLEDGE["quantvision"];
  
  return "I'm Sai's AI Assistant. You can ask me about his skills, projects (like QuantVision), or why he'd be a great fit for your team!";
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi! I'm Sai's AI Assistant. Ask me anything about his experience, projects, or skills." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: "ai", content: getMockResponse(userMessage) }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-transform"
        onClick={() => setIsOpen(true)}
        whileHover={{ rotate: 15 }}
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Sai&apos;s Agent</h4>
                  <p className="text-xs text-white/70">Powered by Intelligence</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
                    msg.role === "ai" ? "bg-purple-500/20 text-purple-400" : "bg-white/10 text-white"
                  }`}>
                    {msg.role === "ai" ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user" ? "bg-white text-black rounded-tr-none" : "bg-white/10 text-white rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-1 text-purple-400">
                    <Bot size={14} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 rounded-tl-none flex items-center gap-1">
                    <motion.div className="w-1.5 h-1.5 bg-white/50 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-white/50 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-white/50 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/[0.02]">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Sai..."
                  className="w-full bg-black border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white text-black disabled:opacity-50 disabled:bg-white/10 disabled:text-white/60 transition-colors"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
