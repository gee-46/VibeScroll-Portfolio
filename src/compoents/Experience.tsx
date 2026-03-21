"use client";

import { motion } from "framer-motion";

export default function Experience() {
    return (
        <section id="experience" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-transparent">
            {/* Header */}
            <div className="mb-24 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4"
                >
                    Experience<span className="text-accent">.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-secondary text-lg max-w-2xl mx-auto"
                >
                    Professional internships and hands-on ML/AI development.
                </motion.p>
            </div>

            {/* Timeline */}
            <div className="relative max-w-4xl mx-auto pl-4 md:pl-0">
                {/* Center / Left glowing line */}
                <div className="absolute top-0 bottom-0 left-[23px] md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-accent/80 via-accent/20 to-transparent" />

                {/* Entry 1 */}
                <div className="relative mb-24 md:mb-32">
                    {/* Glowing Node */}
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full bg-accent z-10 shadow-[0_0_20px_rgba(124,58,237,0.8)]" 
                    >
                        <div className="absolute inset-0 rounded-full animate-ping bg-accent/40" />
                    </motion.div>
                    
                    <div className="flex flex-col md:flex-row w-full justify-between items-start">
                        {/* Empty Space for Desktop layout alternating */}
                        <div className="hidden md:block w-5/12" />
