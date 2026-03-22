"use client";

import { motion } from "framer-motion";

interface HeroIntroProps {
    onComplete: () => void;
}

export default function HeroIntro({ onComplete }: HeroIntroProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121212]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 3, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
        >
            <div className="relative flex flex-col items-center">
                {/* The GC Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)] glow-text"
                >
                    GC
                </motion.div>

                {/* The Animated Underline */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
                    className="h-[2px] w-full bg-accent mt-2 shadow-[0_0_10px_rgba(124,58,237,0.8)] origin-
                


