import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import BackgroundSystem from "@/components/layout/BackgroundSystem";
import OSBootSequence from "@/components/layout/OSBootSequence";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venkata Naga Sai | Software Architect",
  description: "Portfolio of Venkata Naga Sai, an AI & Full-Stack Architect specializing in scalable systems and elegant digital experiences.",
  keywords: ["AI Architect", "Software Engineer", "Next.js", "React", "Premium Portfolio", "Venkata Naga Sai"],
  openGraph: {
    title: "Venkata Naga Sai | Software Architect",
    description: "Portfolio of Venkata Naga Sai, an AI & Full-Stack Architect specializing in scalable systems and elegant digital experiences.",
    url: "https://venkatanagasai01.github.io", // Or actual URL
    siteName: "Venkata Naga Sai Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venkata Naga Sai | Software Architect",
    description: "Portfolio of Venkata Naga Sai, an AI & Full-Stack Architect specializing in scalable systems and elegant digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="flex flex-col bg-[#030303] text-[#FAFAFA] selection:bg-accent/30 selection:text-white md:cursor-none min-h-screen">
        <OSBootSequence />
        <BackgroundSystem />
        
        <div className="relative z-10 flex flex-col w-full min-h-screen">
          <SmoothScroll>
            <CustomCursor />
            {children}
            <ScrollToTop />
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
