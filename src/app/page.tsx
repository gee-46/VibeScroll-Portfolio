"use client";

import Navbar from "@/components/Navbar";
import HeroIntro from "@/components/HeroIntro";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Activities from "@/components/Activities";
import { useState } from "react";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="bg-transparent min-h-screen selection:bg-accent/30 selection:text-white">
      {showIntro && <HeroIntro onComplete={() => setShowIntro(false)} />}

      {!showIntro && (
        <>
          <Navbar />

          {/* The 500vh container handling the scrollytelling background and overlay texts */}
          <ScrollyCanvas />

          {/* Subsequent standard scrolling content */}
          <div className="relative z-20 bg-transparent">
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Activities />
            <Contact />
          </div>
        </>
      )}
    </main>
  );
}
