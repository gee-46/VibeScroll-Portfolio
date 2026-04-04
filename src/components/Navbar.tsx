"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-md border-b border-white/5 pointer-events-none" />

            <Magnetic>
                <div className="relative z-10 text-white font-bold text-xl tracking-widest pl-2 cursor-none">
                    GAUTAM<span className="text-accent">.</span>
                </div>
            </Magnetic>

            <div className="relative z-10 hidden md:flex items-center gap-6 text-secondary text-sm font-medium tracking-wide">
                <Magnetic><Link href="#about" className="hover:text-white transition-colors cursor-none block p-2">About</Link></Magnetic>
                <Magnetic><Link href="#experience" className="hover:text-white transition-colors cursor-none block p-2">Experience</Link></Magnetic>
                <Magnetic><Link href="#skills" className="hover:text-white transition-colors cursor-none block p-2">Skills</Link></Magnetic>
                <Magnetic><Link href="#projects" className="hover:text-white transition-colors cursor-none block p-2">Projects</Link></Magnetic>
                <Magnetic><Link href="#activities" className="hover:text-white transition-colors cursor-none block p-2">Activities</Link></Magnetic>
                <Magnetic><Link href="#contact" className="hover:text-white transition-colors cursor-none block p-2">Contact</Link></Magnetic>
                
                <div className="flex items-center gap-3 ml-2 border-l border-white/10 pl-5">
                    <Magnetic>
                        <Link href="https://github.com/gee-46" target="_blank" className="text-secondary hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all cursor-none block p-2">
                            <Github size={18} />
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link href="https://www.linkedin.com/in/gautam-n-chipkar/" target="_blank" className="text-secondary hover:text-accent hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.8)] transition-all cursor-none block p-2">
                            <Linkedin size={18} />
                        </Link>
                    </Magnetic>
                </div>
            </div>
        </motion.nav>
    );
}
