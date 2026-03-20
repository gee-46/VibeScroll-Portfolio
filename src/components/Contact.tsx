"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
