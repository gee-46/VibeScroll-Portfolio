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
