"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import LanyardBadge from "./LanyardBadge";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    // Triggers drop once the About section is solidly in the main viewport
    const isInView = useInView(containerRef, { once: true, margin: "-120px 0px" });

    return (
        <section id="about" ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-transparent border-t border-white/[0.06]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                {/* Left Column - 3D Interactive Lanyard with In-View Drop */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center items-center w-full"
                >
                    <div className="relative w-full max-w-lg h-[540px] md:h-[620px] rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_0_50px_rgba(124,58,237,0.15)] bg-[#0e0e10]/80 backdrop-blur-sm flex items-center justify-center group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.14)_0%,transparent_70%)] pointer-events-none z-0" />
                        
                        {/* Corner Accents */}
                        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent/50 z-20 pointer-events-none opacity-60" />
                        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/50 z-20 pointer-events-none opacity-60" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent/50 z-20 pointer-events-none opacity-60" />
                        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent/50 z-20 pointer-events-none opacity-60" />
                        
                        {/* Interactive 3D Lanyard (Drops when isInView is true) */}
                        <LanyardBadge className="relative w-full h-full z-10" photoUrl="/gautam.png" hasDropped={isInView} />

                        {/* Interactive User Instructions Pill */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-3 bg-[#110f1c]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/[0.12] shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-105">
                            <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono text-zinc-300">
                                <span className="text-accent font-semibold uppercase">DRAG</span>
                                <span className="text-zinc-500">•</span>
                                <span className="text-zinc-400">Swing</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-zinc-600" />
                            <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono text-zinc-300">
                                <span className="text-cyan-400 font-semibold uppercase">DOUBLE TAP</span>
                                <span className="text-zinc-500">•</span>
                                <span className="text-zinc-400">Flip Front / Back</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column - Text (Desktop: Right, Mobile: Bottom) */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-[#EDEDED] mb-8">
                        About Me<span className="text-accent font-sans">.</span>
                    </h2>
                    <div className="space-y-6 text-zinc-300/90 text-base md:text-lg leading-relaxed md:leading-8 font-light">
                        <p>
                            I&apos;m <span className="text-white font-medium">Gautam N Chipkar</span>, a third-year Artificial Intelligence & Data Science (AI-DS) engineering student focused on building intelligent systems that solve real-world problems using Machine Learning, Computer Vision, and Generative AI.
                        </p>
                        <p>
                            My journey into AI started with building strong foundations in classical machine learning algorithms such as Linear Regression, Logistic Regression, K-Nearest Neighbors, and Decision Trees. I strongly believe that mastering core concepts is essential before moving toward advanced AI systems.
                        </p>
                        <p>
                            I have also developed practical computer vision applications using Python, OpenCV, and MediaPipe, focusing on real-time human-computer interaction systems.
                        </p>
                        <p>
                            During my internships at Infosys Springboard and Cognifyz Technologies, I worked on real datasets and built AI-driven applications, strengthening my understanding of the complete machine learning pipeline.
                        </p>
                        <p>
                            Currently, I am expanding my expertise in Deep Learning and Generative AI, exploring architectures such as CNNs, ANN, LSTMs, and NLP models while actively building practical AI projects.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
