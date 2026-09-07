"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function LiquidBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    // The background starts showing after the 500vh sequence is done
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const onMouseMove = (e: MouseEvent) => {
            // Normalize mouse coordinates to -1 to 1 based on window size
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        };

        window.addEventListener("mousemove", onMouseMove);

        let animationId: number;

        // Smooth trailing animation loop
        const render = () => {
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            // Apply to container as CSS variables
            container.style.setProperty("--x", `${targetX * 50}px`);
            container.style.setProperty("--y", `${targetY * 50}px`);

            animationId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity }}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        >
            <div
                className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-40 mix-blend-screen transition-transform duration-75 ease-out"
                style={{
                    background: 'radial-gradient(circle, rgba(124,58,237,0.8) 0%, rgba(67,24,255,0.4) 50%, transparent 100%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(calc(-50% + var(--x, 0px)), calc(-50% + var(--y, 0px))) scale(1)',
                }}
            />
            <div
                className="absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[90px] opacity-30 mix-blend-screen transition-transform duration-75 ease-out"
                style={{
                    background: 'radial-gradient(circle, rgba(230,58,237,0.6) 0%, transparent 80%)',
                    top: '30%',
                    left: '20%',
                    transform: 'translate(calc(-50% + var(--x, 0px) * -0.5), calc(-50% + var(--y, 0px) * -0.5)) scale(1.2)',
                }}
            />
        </motion.div>
    );
}
