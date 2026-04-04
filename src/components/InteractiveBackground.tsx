"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

class Node {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    color: string;
    speedX: number;
    speedY: number;

    constructor(x: number, y: number, color: string) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; // Small tech nodes
        this.color = color;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update(width: number, height: number, mouseX: number, mouseY: number) {
        // Natural drift
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Bounce off walls organically
        if (this.baseX < 0 || this.baseX > width) this.speedX *= -1;
        if (this.baseY < 0 || this.baseY > height) this.speedY *= -1;

        // Interaction physics (Repel from cursor)
        const dx = mouseX - this.baseX;
        const dy = mouseY - this.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const repulseX = (dx / distance) * force * 20; // Repulsion strength
            const repulseY = (dy / distance) * force * 20;

            // Move node away from cursor
            this.x = this.baseX - repulseX;
            this.y = this.baseY - repulseY;
        } else {
            // Return to natural position
            this.x += (this.baseX - this.x) * 0.1;
            this.y += (this.baseY - this.y) * 0.1;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let nodes: Node[] = [];
        const nodeCount = Math.floor((width * height) / 12000); // Responsive density
        const colors = [
            'rgba(124, 58, 237, 0.8)', // Neon violet
            'rgba(167, 139, 250, 0.6)', // Light purple
        ];

        // Initialize grid
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node(
                Math.random() * width,
                Math.random() * height,
                colors[Math.floor(Math.random() * colors.length)]
            ));
        }

        let mouseX = -1000;
        let mouseY = -1000;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            // Re-initialize density on resize
            nodes = [];
            const newCount = Math.floor((width * height) / 12000);
            for (let i = 0; i < newCount; i++) {
                nodes.push(new Node(
                    Math.random() * width,
                    Math.random() * height,
                    colors[Math.floor(Math.random() * colors.length)]
                ));
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseleave", onMouseLeave);
        window.addEventListener("resize", handleResize);

        let animationId: number;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Tech mesh baseline gradient (dim)
            const bgGradient = ctx.createRadialGradient(
                width / 2, height / 2, 0,
                width / 2, height / 2, width * 0.8
            );
            bgGradient.addColorStop(0, 'rgba(124, 58, 237, 0.05)');
            bgGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            // Update nodes and draw connections
            ctx.lineWidth = 1;

            for (let i = 0; i < nodes.length; i++) {
                nodes[i].update(width, height, mouseX, mouseY);

                // Draw connecting lines between close nodes
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const maxConnectDist = 120;

                    if (distance < maxConnectDist) {
                        // Base opacity based on distance
                        let opacityDist = 1 - (distance / maxConnectDist);
                        opacityDist *= 0.3; // Very subtle base lines

                        // Cursor illumination - Light up lines near mouse
                        const midX = (nodes[i].x + nodes[j].x) / 2;
                        const midY = (nodes[i].y + nodes[j].y) / 2;
                        const mouseDist = Math.sqrt(Math.pow(mouseX - midX, 2) + Math.pow(mouseY - midY, 2));

                        if (mouseDist < 200) {
                            opacityDist += (1 - mouseDist / 200) * 0.6; // Strong glow near cursor
                        }

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(124, 58, 237, ${opacityDist})`;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }

                // Draw actual node dots on top
                nodes[i].draw(ctx);
            }

            ctx.shadowBlur = 0;
            animationId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* mix-blend-screen gives it the "light projection" monitor look */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-screen opacity-80" />
        </div>
    );
}
