"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

