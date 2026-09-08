"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Gamepad2 } from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
        >
            <div className="absolute inset-0 bg-[#080808]/40 backdrop-blur-xl border-b border-white/[0.06] pointer-events-none shadow-[0_4px_30px_rgba(0,0,0,0.5)]" />

            <Magnetic>
                <div className="relative z-10 text-[#EDEDED] font-bold text-lg md:text-xl tracking-[0.2em] pl-2 cursor-none font-sans">
                    GAUTAM<span className="text-accent">.</span>
                </div>
            </Magnetic>

            <div className="relative z-10 hidden md:flex items-center gap-7 text-secondary text-sm font-medium tracking-wider">
                <Magnetic><Link href="#about" className="hover:text-white transition-colors cursor-none block py-2 px-1">About</Link></Magnetic>
                <Magnetic><Link href="#experience" className="hover:text-white transition-colors cursor-none block py-2 px-1">Experience</Link></Magnetic>
                <Magnetic><Link href="#tech-stack" className="hover:text-white transition-colors cursor-none block py-2 px-1">Tech Stack</Link></Magnetic>
                <Magnetic><Link href="#projects" className="hover:text-white transition-colors cursor-none block py-2 px-1">Projects</Link></Magnetic>
                <Magnetic><Link href="#activities" className="hover:text-white transition-colors cursor-none block py-2 px-1">Achievements</Link></Magnetic>
                <Magnetic><Link href="#contact" className="hover:text-white transition-colors cursor-none block py-2 px-1">Contact</Link></Magnetic>
                
                <Magnetic>
                    <Link
                        href="/game.html"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 hover:bg-accent/25 border border-accent/30 hover:border-accent text-accent-light hover:text-white transition-all cursor-none text-xs font-semibold tracking-wider"
                    >
                        <Gamepad2 size={14} className="text-cyan-400" />
                        <span>3D WORLD</span>
                    </Link>
                </Magnetic>
                
                <div className="flex items-center gap-4 ml-1 border-l border-white/10 pl-6">
                    <Magnetic>
                        <Link href="https://github.com/gee-46" target="_blank" className="text-secondary hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all cursor-none block p-2">
                            <Github size={18} />
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link href="https://www.linkedin.com/in/gautam-n-chipkar/" target="_blank" className="text-secondary hover:text-accent-light hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.8)] transition-all cursor-none block p-2">
                            <Linkedin size={18} />
                        </Link>
                    </Magnetic>
                </div>
            </div>
        </motion.nav>
    );
}
