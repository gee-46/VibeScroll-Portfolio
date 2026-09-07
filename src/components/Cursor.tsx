"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the outer ring trailing effect
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
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

        // Provide a global way to hook into hover states for magnetic elements
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

    // Don't render anything if it's a touch device / cursor hasn't moved yet
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
        return null;
    }

    return (
        <>
            {/* Center glowing dot (Exact pointer location) */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[100] shadow-[0_0_10px_rgba(124,58,237,0.8)]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "linear-gradient(135deg, #A78BFA, #7C3AED)",
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    scale: isHovered ? 0 : 1, // Shrink dot when hovered
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Outer tracking ring */}
            <motion.div
                className="fixed top-0 left-0 border border-accent rounded-full pointer-events-none z-[99] mix-blend-screen"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    width: isHovered ? 60 : 32,
                    height: isHovered ? 60 : 32,
                    backgroundColor: isHovered ? "rgba(124,58,237,0.15)" : "transparent",
                    boxShadow: isHovered ? "0 0 20px rgba(124,58,237,0.3)" : "none",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </>
    );
}
