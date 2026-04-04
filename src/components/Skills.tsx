"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const skillsList = [
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "OpenCV",
    "Git",
    "GitHub",
    "Machine Learning",
    "Generative AI",
    "Neural Networks",
    "PyTorch",
    "TensorFlow",
    "LangChain"
];

// Combine two sets to make it long enough for the infinite marquee
const doubleSkills = [...skillsList, ...skillsList];

export default function Skills() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Future-proofing: Empty effect for any Skills-specific logic needed later
    useEffect(() => {
        return () => {
            // No-op since we removed local background canvas
        };
    }, []);

    return (
        <section className="relative py-32 overflow-hidden bg-transparent border-t border-white/5">

            {/* Subtle Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4 uppercase tracking-[0.2em]">
                        Skills
                    </h2>
                    <p className="text-secondary text-lg max-w-2xl mx-auto font-light tracking-wide">
                        Technologies I use to build intelligent systems and data-driven applications.
                    </p>
                </motion.div>
            </div>

            <div className="relative z-10 w-full overflow-hidden flex flex-col gap-6 py-8">
                {/* Row 1 (Moves Left) */}
                <div className="flex w-[200%] md:w-[200%] animate-marquee-left">
                    {doubleSkills.map((skill, index) => (
                        <SkillChip key={`r1-${index}`} name={skill} />
                    ))}
                </div>

                {/* Row 2 (Moves Right), offset the array slightly differently */}
                <div className="flex w-[200%] md:w-[200%] animate-marquee-right" style={{ animationDuration: '40s' }}>
                    {[...doubleSkills].reverse().map((skill, index) => (
                        <SkillChip key={`r2-${index}`} name={skill} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function SkillChip({ name }: { name: string }) {
    return (
        <div className="flex-shrink-0 px-8 py-4 mx-3 rounded-full border border-accent/30 bg-white/[0.03] backdrop-blur-md text-white/90 font-medium tracking-wide shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:border-accent hover:bg-white/[0.08] hover:text-white transition-all duration-300 cursor-default select-none group">
            <span className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                {name}
            </span>
        </div>
    );
}
