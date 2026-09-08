"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";

interface ChooseWorldProps {
    onSelectWebsite: () => void;
    onSelectGame: () => void;
}

export default function ChooseWorld({ onSelectWebsite, onSelectGame }: ChooseWorldProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[120] flex w-full h-full select-none overflow-hidden cursor-none bg-[#080808]"
        >
            {/* ================= LEFT 1/4TH SPLIT (WHITE) ================= */}
            <div className="relative hidden md:flex w-1/4 h-full bg-[#FAFAFA] text-zinc-900 border-r border-zinc-200/80 flex-col justify-between p-8 lg:p-12 z-10 overflow-hidden shadow-[15px_0_40px_rgba(0,0,0,0.35)]">
                {/* Subtle geometric lines */}
                <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-zinc-300 via-zinc-400/40 to-transparent" />

                {/* Top Section in White Column */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="flex flex-col gap-1"
                >
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-500">
                        PORTFOLIO 2026
                    </span>
                    <span className="font-grotesk text-xs tracking-wider font-semibold text-zinc-800">
                        VOL. 01 / AI ENGINEER
                    </span>
                </motion.div>

                {/* Middle Vertical Text in White Column */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                    className="my-auto py-8"
                >
                    <div className="writing-mode-vertical font-mono text-[11px] tracking-[0.4em] uppercase text-zinc-400 font-medium">
                        GENAI · LLMs · RAG · AUTOMATION
                    </div>
                    <div className="w-8 h-[2px] bg-zinc-900 my-4" />
                    <p className="font-mono text-[10px] tracking-widest text-zinc-500">
                        15.8497° N<br />74.4977° E<br />BELAGAVI, INDIA
                    </p>
                </motion.div>

                {/* Bottom Section in White Column */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex flex-col gap-1 text-[10px] font-mono text-zinc-400"
                >
                    <span className="text-zinc-800 font-semibold tracking-wider">GAUTAM N. CHIPKAR</span>
                    <span>AI ENGINEER</span>
                </motion.div>
            </div>

            {/* Mobile Top Bar (White accent for small screens) */}
            <div className="md:hidden absolute top-0 left-0 right-0 h-3 bg-[#FAFAFA] z-20 border-b border-zinc-200" />

            {/* ================= RIGHT 3/4TH SPLIT (BLACK) ================= */}
            <div className="relative flex-1 h-full bg-[#080808] flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 text-center overflow-hidden">
                {/* Subtle ambient grid and shadows */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 0.85, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-zinc-400 font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase font-semibold mb-5 flex items-center gap-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                        PORTFOLIO 2026 · AI ENGINEER
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.35 }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 leading-[1.02] font-grotesk text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.12)]"
                    >
                        GAUTAM N.<br className="sm:hidden" /> CHIPKAR
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="text-zinc-400 font-light text-sm sm:text-base md:text-lg max-w-lg mb-10 sm:mb-12 font-sans"
                    >
                        Two ways to explore my journey.
                    </motion.p>

                    {/* Choices Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.65 }}
                        className="flex flex-col sm:flex-row gap-5 md:gap-7 justify-center items-stretch w-full max-w-2xl"
                    >
                        {/* Option 01: Cinematic Portfolio */}
                        <Magnetic>
                            <button
                                onClick={onSelectWebsite}
                                className="group w-full sm:w-[310px] text-left p-6 md:p-7 rounded-2xl border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,255,255,0.08)] focus:outline-none cursor-none flex flex-col justify-between"
                            >
                                <div>
                                    <span className="block text-[10px] tracking-[0.25em] text-zinc-500 font-mono uppercase mb-2 group-hover:text-zinc-300 transition-colors">
                                        OPTION 01
                                    </span>
                                    <span className="block font-bold text-lg md:text-xl text-white font-grotesk group-hover:text-white transition-colors">
                                        Cinematic Portfolio →
                                    </span>
                                    <p className="text-xs md:text-sm text-zinc-400 font-light mt-2 leading-relaxed">
                                        Explore my projects, experience, skills, contributions, and achievements.
                                    </p>
                                </div>
                            </button>
                        </Magnetic>

                        {/* Option 02: Career Adventure */}
                        <Magnetic>
                            <button
                                onClick={onSelectGame}
                                className="group w-full sm:w-[310px] text-left p-6 md:p-7 rounded-2xl border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,255,255,0.08)] focus:outline-none cursor-none flex flex-col justify-between"
                            >
                                <div>
                                    <span className="block text-[10px] tracking-[0.25em] text-zinc-500 font-mono uppercase mb-2 group-hover:text-zinc-300 transition-colors">
                                        OPTION 02
                                    </span>
                                    <span className="block font-bold text-lg md:text-xl text-white font-grotesk group-hover:text-white transition-colors">
                                        Career Adventure →
                                    </span>
                                    <p className="text-xs md:text-sm text-zinc-400 font-light mt-2 leading-relaxed">
                                        Explore my career through an interactive voxel world.
                                    </p>
                                </div>
                            </button>
                        </Magnetic>
                    </motion.div>

                    {/* Subtle Content Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-8 sm:mt-10 text-[9px] md:text-[10px] text-zinc-500/80 tracking-[0.25em] uppercase font-mono max-w-xl mx-auto leading-relaxed"
                    >
                        ABOUT · EXPERIENCE · PROJECTS · TECH STACK · CONTRIBUTIONS · ACHIEVEMENTS
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
