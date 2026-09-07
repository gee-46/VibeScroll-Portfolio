"use client";

import { useEffect, useRef } from "react";

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
        this.size = Math.random() * 1.5 + 1;
        this.color = color;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }

    update(width: number, height: number, mouseX: number, mouseY: number) {
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        if (this.baseX < 0 || this.baseX > width) this.speedX *= -1;
        if (this.baseY < 0 || this.baseY > height) this.speedY *= -1;

        const dx = mouseX - this.baseX;
        const dy = mouseY - this.baseY;
        const distSq = dx * dx + dy * dy;
        const maxDist = 140;
        const maxDistSq = maxDist * maxDist;

        if (distSq < maxDistSq) {
            const distance = Math.sqrt(distSq);
            const force = (maxDist - distance) / maxDist;
            this.x = this.baseX - (dx / distance) * force * 15;
            this.y = this.baseY - (dy / distance) * force * 15;
        } else {
            this.x += (this.baseX - this.x) * 0.08;
            this.y += (this.baseY - this.y) * 0.08;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let nodes: Node[] = [];
        const isMobile = width < 768;
        const nodeCount = isMobile ? 25 : 45; // Lean, optimized particle count
        const colors = [
            "rgba(124, 58, 237, 0.75)",
            "rgba(167, 139, 250, 0.55)",
        ];

        for (let i = 0; i < nodeCount; i++) {
            nodes.push(
                new Node(
                    Math.random() * width,
                    Math.random() * height,
                    colors[Math.floor(Math.random() * colors.length)]
                )
            );
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
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        document.body.addEventListener("mouseleave", onMouseLeave, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });

        let animationId: number;
        const maxConnectDist = 110;
        const maxConnectDistSq = maxConnectDist * maxConnectDist;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            ctx.lineWidth = 0.8;

            for (let i = 0; i < nodes.length; i++) {
                nodes[i].update(width, height, mouseX, mouseY);

                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < maxConnectDistSq) {
                        const distance = Math.sqrt(distSq);
                        const opacityDist = (1 - distance / maxConnectDist) * 0.22;

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(124, 58, 237, ${opacityDist})`;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }

                nodes[i].draw(ctx);
            }

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
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
            />
        </div>
    );
}
