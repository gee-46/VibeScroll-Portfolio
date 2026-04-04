"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const TOTAL_FRAMES = 120;

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    useEffect(() => {
        // Preload images
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setImages(loadedImages);
                }
            };

            // Also handle potential errors so we don't get stuck forever
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setImages(loadedImages);
                }
            };

            loadedImages.push(img);
        }
    }, []);

    const renderFrame = (index: number) => {
        if (images.length === 0) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[Math.floor(index)];
        if (!img) return;

        // We avoid setting canvas width/height here as doing it on every frame is very expensive.
        // It is done once on mount and on window resize instead.

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        // Use requestAnimationFrame to avoid blocking the main thread 
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Handle window resize dynamically to re-draw
    useEffect(() => {
        if (images.length === 0) return;
        
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                // Set logical size equal to window size for sharp rendering only on resize
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                renderFrame(frameIndex.get());
            }
        };

        window.addEventListener("resize", handleResize);
        // Initial draw once images are loaded
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [images]);

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                <canvas ref={canvasRef} className="h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                <Overlay progress={scrollYProgress} />
            </div>
        </div>
    );
}
