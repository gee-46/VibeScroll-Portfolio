"use client";

import Navbar from "@/components/Navbar";
import HeroIntro from "@/components/HeroIntro";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Activities from "@/components/Activities";
import { useState } from "react";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="bg-[#080808] min-h-screen selection:bg-accent/30 selection:text-white">
      {showIntro && <HeroIntro onComplete={() => setShowIntro(false)} />}

      {!showIntro && (
        <>
          <Navbar />

          {/* The 500vh container handling the scrollytelling background and overlay texts - untouched */}
          <ScrollyCanvas />

          {/* Subsequent standard scrolling content with smooth gradient entry */}
          <div className="relative z-20 bg-[#080808]">
            {/* Smooth transition from hero canvas to solid dark background */}
            <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#080808] pointer-events-none z-10" />
            
            <About />
            <Experience />
            <TechStack />
            <Projects />
            <Activities />
            <Contact />
          </div>
        </>
      )}
    </main>
  );
}
