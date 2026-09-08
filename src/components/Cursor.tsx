"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 220, mass: 0.4 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        const handleMagneticEnter = () => setIsHovered(true);
        const handleMagneticLeave = () => setIsHovered(false);

        document.addEventListener("magnetic-enter", handleMagneticEnter);
        document.addEventListener("magnetic-leave", handleMagneticLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("magnetic-enter", handleMagneticEnter);
            document.removeEventListener("magnetic-leave", handleMagneticLeave);
        };
    }, [mouseX, mouseY, isVisible]);

    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
        return null;
    }

    return (
        <>
            {/* Center dot with mix-blend-difference (visible on both black and white backgrounds) */}
            <motion.div
                className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[99999] bg-white mix-blend-difference shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    scale: isHovered ? 0 : 1,
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Outer tracking ring with mix-blend-difference */}
            <motion.div
                className="fixed top-0 left-0 border border-white/90 rounded-full pointer-events-none z-[99998] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    width: isHovered ? 64 : 32,
                    height: isHovered ? 64 : 32,
                    backgroundColor: isHovered ? "rgba(255, 255, 255, 0.25)" : "transparent",
                    borderColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.7)",
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
            />
        </>
    );
}
