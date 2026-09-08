"use client";

import { useEffect, useRef } from "react";

interface WaveConfig {
    amplitude: number;
    frequency: number;
    speed: number;
    offsetY: number;
    color: string;
    glowColor: string;
    lineWidth: number;
}

export default function FloatingWave() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let mouseX = width / 2;
        let mouseY = height / 2;
        let targetMouseX = width / 2;
        let targetMouseY = height / 2;
        let time = 0;

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            targetMouseX = e.clientX;
            targetMouseY = e.clientY;
        };

        window.addEventListener("resize", handleResize, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // Optimized harmonic waves
        const waves: WaveConfig[] = [
            {
                amplitude: 55,
                frequency: 0.0035,
                speed: 0.014,
                offsetY: 0.62,
                color: "rgba(124, 58, 237, 0.8)",
                glowColor: "rgba(124, 58, 237, 0.2)",
                lineWidth: 2.2,
            },
            {
                amplitude: 45,
                frequency: 0.0045,
                speed: -0.018,
                offsetY: 0.60,
                color: "rgba(56, 189, 248, 0.85)",
                glowColor: "rgba(56, 189, 248, 0.22)",
                lineWidth: 2.0,
            },
            {
                amplitude: 65,
                frequency: 0.0028,
                speed: 0.011,
                offsetY: 0.65,
                color: "rgba(167, 139, 250, 0.7)",
                glowColor: "rgba(167, 139, 250, 0.18)",
                lineWidth: 1.8,
            },
            {
                amplitude: 38,
                frequency: 0.0052,
                speed: 0.022,
                offsetY: 0.58,
                color: "rgba(34, 211, 238, 0.75)",
                glowColor: "rgba(34, 211, 238, 0.18)",
                lineWidth: 1.6,
            },
        ];

        // Lightweight floating particles that ride the waves
        const particleCount = 28;
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: 0,
            waveIndex: Math.floor(Math.random() * waves.length),
            speed: 0.3 + Math.random() * 0.6,
            size: 1.2 + Math.random() * 1.8,
            alpha: 0.4 + Math.random() * 0.6,
            color: Math.random() > 0.5 ? "rgba(56, 189, 248, 0.9)" : "rgba(167, 139, 250, 0.9)",
        }));

        const render = () => {
            time += 1;

            // Smooth mouse interpolation
            mouseX += (targetMouseX - mouseX) * 0.04;
            mouseY += (targetMouseY - mouseY) * 0.04;

            ctx.clearRect(0, 0, width, height);

            const step = 8;
            const pointsByWave: { x: number; y: number }[][] = [];

            // Draw floating harmonic waves without expensive shadowBlur filter passes
            waves.forEach((wave, waveIdx) => {
                const wavePoints: { x: number; y: number }[] = [];
                const baseLine = height * wave.offsetY;

                for (let x = 0; x <= width + step; x += step) {
                    const dx = x - mouseX;
                    const dy = baseLine - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const mouseInfluence = Math.max(0, 1 - dist / 320);
                    const mouseLift = Math.sin(dist * 0.02 - time * 0.05) * mouseInfluence * 38;

                    const primary = Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
                    const secondary = Math.cos(x * (wave.frequency * 1.8) - time * (wave.speed * 0.7)) * (wave.amplitude * 0.35);
                    const tertiary = Math.sin((x * 0.001) + time * 0.008) * 15;

                    const y = baseLine + primary + secondary + tertiary - mouseLift;
                    wavePoints.push({ x, y });
                }

                pointsByWave.push(wavePoints);

                // 1. Glowing wide underlay stroke
                ctx.beginPath();
                for (let i = 0; i < wavePoints.length; i++) {
                    if (i === 0) ctx.moveTo(wavePoints[i].x, wavePoints[i].y);
                    else ctx.lineTo(wavePoints[i].x, wavePoints[i].y);
                }
                ctx.strokeStyle = wave.glowColor;
                ctx.lineWidth = wave.lineWidth * 3.5;
                ctx.stroke();

                // 2. Crisp main wave stroke
                ctx.beginPath();
                for (let i = 0; i < wavePoints.length; i++) {
                    if (i === 0) ctx.moveTo(wavePoints[i].x, wavePoints[i].y);
                    else ctx.lineTo(wavePoints[i].x, wavePoints[i].y);
                }
                ctx.strokeStyle = wave.color;
                ctx.lineWidth = wave.lineWidth;
                ctx.stroke();

                // 3. Smooth liquid depth gradient fill
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();

                const grad = ctx.createLinearGradient(0, baseLine - wave.amplitude, 0, height);
                if (waveIdx === 0) {
                    grad.addColorStop(0, "rgba(124, 58, 237, 0.06)");
                    grad.addColorStop(1, "rgba(10, 10, 13, 0)");
                } else if (waveIdx === 1) {
                    grad.addColorStop(0, "rgba(56, 189, 248, 0.04)");
                    grad.addColorStop(1, "rgba(10, 10, 13, 0)");
                } else {
                    grad.addColorStop(0, "rgba(167, 139, 250, 0.03)");
                    grad.addColorStop(1, "rgba(10, 10, 13, 0)");
                }

                ctx.fillStyle = grad;
                ctx.fill();
            });

            // Cross-mesh connecting lines (ribbon effect)
            if (pointsByWave.length >= 2) {
                const p1 = pointsByWave[0];
                const p2 = pointsByWave[1];
                const meshStep = 32;

                ctx.beginPath();
                for (let i = 0; i < p1.length && i < p2.length; i += meshStep) {
                    ctx.moveTo(p1[i].x, p1[i].y);
                    ctx.lineTo(p2[i].x, p2[i].y);
                }
                ctx.strokeStyle = "rgba(167, 139, 250, 0.14)";
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Floating particles along waves
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.speed;
                if (p.x > width) p.x = 0;

                const wave = waves[p.waveIndex];
                const baseLine = height * wave.offsetY;
                const waveY =
                    baseLine +
                    Math.sin(p.x * wave.frequency + time * wave.speed) * wave.amplitude +
                    Math.cos(p.x * (wave.frequency * 1.8) - time * (wave.speed * 0.7)) * (wave.amplitude * 0.35);

                const pulse = 0.8 + Math.sin(time * 0.05 + p.x) * 0.3;

                ctx.beginPath();
                ctx.arc(p.x, waveY - 4, p.size * pulse, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-90"
        />
    );
}
