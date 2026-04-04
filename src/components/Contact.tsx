"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showEmailInfo, setShowEmailInfo] = useState(false);

    // Neural Network Canvas Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        let particles: Particle[] = [];
        const particleCount = 40; // less dense for minimal look
        const connectionDistance = 150;
        
        let mouseX = -1000;
        let mouseY = -1000;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            baseRadius: number;
            radius: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.baseRadius = Math.random() * 1.5 + 0.5;
                this.radius = this.baseRadius;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction - glow and slight push
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.radius = this.baseRadius + (150 - distance) * 0.02;
                    // very subtle repel
                    this.x -= dx * 0.005;
                    this.y -= dy * 0.005;
                } else {
                    this.radius = this.baseRadius;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(124, 58, 237, ${this.radius > this.baseRadius ? 0.8 : 0.4})`;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const drawGrid = () => {
            if (!ctx) return;
            ctx.strokeStyle = "rgba(124, 58, 237, 0.03)";
            ctx.lineWidth = 1;
            const gridSize = 50;
            
            // Vertical lines
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            
            // Horizontal lines
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
        };

        let animationFrameId: number;

        const loop = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            
            drawGrid();

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Connect particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
                
                // Connect to mouse
                const dxMouse = mouseX - particles[i].x;
                const dyMouse = mouseY - particles[i].y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                if (distMouse < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    const opacity = 1 - (distMouse / 150);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        init();
        loop();

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        
        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section id="contact" className="py-40 px-6 md:px-12 relative z-20 bg-[#121212] overflow-hidden min-h-[80vh] flex flex-col justify-center">
            {/* Neural Network Background */}
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full pointer-events-auto z-0"
            />
            
            {/* Vignette Overlay to blend the edges into the rest of the dark site */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#121212_90%)] z-10 pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center"
                >
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-12">
                        CONTACT<span className="text-accent">.</span>
                    </motion.h2>

                    <motion.div variants={itemVariants} className="mb-16">
                        <p className="text-white text-xl md:text-2xl font-medium mb-4">
                            Interested in AI, Machine Learning, or building <span className="text-accent">intelligent systems</span>?
                        </p>
                        <p className="text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            I&apos;m always open to connecting with developers, researchers, and innovators working on impactful AI technologies.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 cursor-none text-lg md:text-xl font-medium">
                        
                        {/* GitHub Link */}
                        <Magnetic>
                            <Link href="https://github.com/gee-46" target="_blank" className="group relative flex items-center gap-3 text-secondary hover:text-white transition-all hover:scale-105 duration-300 cursor-none py-2 px-4">
                                <Github size={22} className="group-hover:text-accent transition-colors cursor-none" />
                                <span>GitHub</span>
                                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
                            </Link>
                        </Magnetic>

                        <span className="hidden md:inline-block text-white/20">•</span>

                        {/* LinkedIn Link */}
                        <Magnetic>
                            <Link href="https://www.linkedin.com/in/gautam-n-chipkar/" target="_blank" className="group relative flex items-center gap-3 text-secondary hover:text-white transition-all hover:scale-105 duration-300 cursor-none py-2 px-4">
                                <Linkedin size={22} className="group-hover:text-accent transition-colors cursor-none" />
                                <span>LinkedIn</span>
                                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
                            </Link>
                        </Magnetic>

                        <span className="hidden md:inline-block text-white/20">•</span>

                        {/* Email Link */}
                        <div className="relative flex flex-col items-center">
                            <Magnetic>
                                <button 
                                    onClick={() => setShowEmailInfo(!showEmailInfo)}
                                    className="group relative flex items-center gap-3 text-secondary hover:text-white transition-all hover:scale-105 duration-300 cursor-none py-2 px-4"
                                >
                                    <Mail size={22} className="group-hover:text-accent transition-colors cursor-none" />
                                    <span>Email</span>
                                    <div className="absolute left-0 bottom-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
                                </button>
                            </Magnetic>

                            {/* Popup Card */}
                            {showEmailInfo && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-14 left-1/2 -translate-x-1/2 w-max max-w-[300px] p-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl flex flex-col items-center gap-1 cursor-none z-50 text-center"
                                >
                                    <span className="text-white text-base tracking-wide font-medium">gautamchipkar46@gmail.com</span>
                                    <span className="text-secondary text-sm">Feel free to reach out for collaborations!</span>
                                </motion.div>
                            )}
                        </div>

                    </motion.div>
                </motion.div>
            </div>

            <div className="absolute bottom-8 left-0 w-full text-center text-secondary/60 text-sm z-20 pointer-events-none">
                <p>© {new Date().getFullYear()} Gautam N Chipkar. All rights reserved.</p>
            </div>
        </section>
    );
}
