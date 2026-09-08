"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
    const [showEmailInfo, setShowEmailInfo] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section id="contact" className="py-40 px-6 md:px-12 relative z-20 bg-[#080808] overflow-hidden min-h-[80vh] flex flex-col justify-center border-t border-white/[0.06]">
            {/* Ambient Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

            <div className="max-w-4xl mx-auto text-center relative z-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center"
                >
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-[#EDEDED] mb-12">
                        Contact<span className="text-accent font-sans">.</span>
                    </motion.h2>

                    <motion.div variants={itemVariants} className="mb-16">
                        <p className="text-zinc-100 text-xl md:text-2xl font-medium mb-4 tracking-tight">
                            Interested in AI, Machine Learning, or building <span className="text-accent-light">intelligent systems</span>?
                        </p>
                        <p className="text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                            I&apos;m always open to connecting with developers, researchers, and innovators working on impactful AI technologies.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 cursor-none text-lg md:text-xl font-medium">
                        
                        {/* GitHub Link */}
                        <Magnetic>
                            <Link href="https://github.com/gee-46" target="_blank" className="group relative flex items-center gap-3 text-secondary hover:text-white transition-all hover:scale-105 duration-300 cursor-none py-2.5 px-5 rounded-full border border-white/[0.08] bg-[#0e0e10]/80 backdrop-blur-md">
                                <Github size={20} className="group-hover:text-accent-light transition-colors cursor-none" />
                                <span>GitHub</span>
                                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
                            </Link>
                        </Magnetic>

                        <span className="hidden md:inline-block text-white/10">•</span>

                        {/* LinkedIn Link */}
                        <Magnetic>
                            <Link href="https://www.linkedin.com/in/gautam-n-chipkar/" target="_blank" className="group relative flex items-center gap-3 text-secondary hover:text-white transition-all hover:scale-105 duration-300 cursor-none py-2.5 px-5 rounded-full border border-white/[0.08] bg-[#0e0e10]/80 backdrop-blur-md">
                                <Linkedin size={20} className="group-hover:text-accent-light transition-colors cursor-none" />
                                <span>LinkedIn</span>
                                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
                            </Link>
                        </Magnetic>

                        <span className="hidden md:inline-block text-white/10">•</span>

                        {/* Email Link */}
                        <div className="relative flex flex-col items-center">
                            <Magnetic>
                                <button 
                                    onClick={() => setShowEmailInfo(!showEmailInfo)}
                                    className="group relative flex items-center gap-3 text-secondary hover:text-white transition-all hover:scale-105 duration-300 cursor-none py-2.5 px-5 rounded-full border border-white/[0.08] bg-[#0e0e10]/80 backdrop-blur-md"
                                >
                                    <Mail size={20} className="group-hover:text-accent-light transition-colors cursor-none" />
                                    <span>Email</span>
                                    <div className="absolute left-0 bottom-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
                                </button>
                            </Magnetic>

                            {/* Popup Card */}
                            {showEmailInfo && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-16 left-1/2 -translate-x-1/2 w-max max-w-[320px] p-5 rounded-2xl border border-white/[0.1] bg-[#080808]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col items-center gap-1.5 cursor-none z-50 text-center"
                                >
                                    <span className="text-white text-sm md:text-base tracking-wide font-medium select-all">gautamchipkar46@gmail.com</span>
                                    <span className="text-secondary text-xs">Feel free to reach out for collaborations!</span>
                                </motion.div>
                            )}
                        </div>

                    </motion.div>
                </motion.div>
            </div>

            <div className="absolute bottom-8 left-0 w-full text-center text-muted text-xs md:text-sm z-20 pointer-events-none tracking-wider">
                <p>© {new Date().getFullYear()} Gautam N Chipkar. All rights reserved.</p>
            </div>
        </section>
    );
}
