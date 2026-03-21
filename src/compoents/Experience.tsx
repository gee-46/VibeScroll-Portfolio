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
