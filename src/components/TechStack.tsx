"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    SiPython,
    SiGit,
    SiGithub,
    SiTensorflow,
    SiNumpy,
    SiHuggingface,
} from "react-icons/si";
import {
    Database,
    Brain,
    Bot,
    Layers,
    Eye,
    ScanFace,
    LineChart,
    Boxes,
    GitBranch,
} from "lucide-react";

interface TechData {
    id: number;
    name: string;
    label: string;
    icon: React.ElementType;
    color: string;
    basePhi: number;
    baseTheta: number;
}

const RAW_TECH_ITEMS = [
    { id: 1, name: "Python", label: "PYTHON", icon: SiPython, color: "#38BDF8" },
    { id: 2, name: "SQL", label: "SQL", icon: Database, color: "#F59E0B" },
    { id: 3, name: "LLMs", label: "LLMS", icon: Brain, color: "#A78BFA" },
    { id: 4, name: "Agentic AI", label: "AGENTIC AI", icon: Bot, color: "#34D399" },
    { id: 5, name: "RAG", label: "RAG", icon: Layers, color: "#60A5FA" },
    { id: 6, name: "Computer Vision", label: "CV / VISION", icon: Eye, color: "#F472B6" },
    { id: 7, name: "Git", label: "GIT", icon: SiGit, color: "#FB923C" },
    { id: 8, name: "GitHub", label: "GITHUB", icon: SiGithub, color: "#EDEDED" },
    { id: 9, name: "MediaPipe", label: "MEDIAPIPE", icon: ScanFace, color: "#38BDF8" },
    { id: 10, name: "Matplotlib", label: "MATPLOTLIB", icon: LineChart, color: "#93C5FD" },
    { id: 11, name: "NumPy", label: "NUMPY", icon: SiNumpy, color: "#67E8F9" },
    { id: 12, name: "LangChain", label: "LANGCHAIN", icon: Boxes, color: "#FBBF24" },
    { id: 13, name: "LangGraph", label: "LANGGRAPH", icon: GitBranch, color: "#C084FC" },
    { id: 14, name: "TensorFlow", label: "TENSORFLOW", icon: SiTensorflow, color: "#F97316" },
    { id: 15, name: "Hugging Face", label: "HUGGING FACE", icon: SiHuggingface, color: "#FACC15" },
];

const N = RAW_TECH_ITEMS.length;
const TECH_ITEMS: TechData[] = RAW_TECH_ITEMS.map((item, i) => {
    const k = i + 0.5;
    const phi = Math.acos(1 - (2 * k) / N);
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;
    return {
        ...item,
        basePhi: phi,
        baseTheta: theta,
    };
});

interface RenderedNode {
    id: number;
    name: string;
    label: string;
    icon: React.ElementType;
    color: string;
    x: number;
    y: number;
    z: number;
    scale: number;
    opacity: number;
    blur: number;
    zIndex: number;
    glow: number;
}

const computeNodes = (rotX: number, rotY: number, r: number): RenderedNode[] => {
    return TECH_ITEMS.map((item) => {
        const x0 = r * Math.sin(item.basePhi) * Math.cos(item.baseTheta);
        const y0 = r * Math.cos(item.basePhi) * 0.82;
        const z0 = r * Math.sin(item.basePhi) * Math.sin(item.baseTheta);

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y1 = y0 * cosX - z0 * sinX;
        const z1 = y0 * sinX + z0 * cosX;

        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x2 = x0 * cosY + z1 * sinY;
        const z2 = -x0 * sinY + z1 * cosY;
        const y2 = y1;

        const normZ = Math.max(-1, Math.min(1, z2 / r));
        const scale = 0.65 + (normZ + 1) * 0.24;
        const opacity = 0.22 + (normZ + 1) * 0.39;
        const blur = normZ > 0.3 ? 0 : (0.3 - normZ) * 2.2;
        const zIndex = Math.round((normZ + 1) * 50) + 10;
        const glow = normZ > 0.2 ? (normZ - 0.2) / 0.8 : 0;

        return {
            id: item.id,
            name: item.name,
            label: item.label,
            icon: item.icon,
            color: item.color,
            x: x2,
            y: y2,
            z: z2,
            scale,
            opacity: Math.max(0.18, Math.min(1, opacity)),
            blur: Math.max(0, blur),
            zIndex,
            glow,
        };
    }).sort((a, b) => a.zIndex - b.zIndex);
};

export default function TechStack() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [radius, setRadius] = useState(230);
    const [nodes, setNodes] = useState<RenderedNode[]>(() => computeNodes(0.1, 0, 230));
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isInView, setIsInView] = useState(true);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { rootMargin: "200px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const rotY = useRef(0);
    const rotX = useRef(0.1);
    const targetRotY = useRef<number | null>(null);
    const targetRotX = useRef<number | null>(null);

    const isDragging = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0.003, y: 0 });
    const autoSpeed = useRef(0.0035);

    useEffect(() => {
        const updateRadius = () => {
            if (typeof window !== "undefined") {
                if (window.innerWidth < 640) {
                    setRadius(145);
                } else if (window.innerWidth < 1024) {
                    setRadius(190);
                } else {
                    setRadius(235);
                }
            }
        };
        updateRadius();
        window.addEventListener("resize", updateRadius, { passive: true });
        return () => window.removeEventListener("resize", updateRadius);
    }, []);

    useEffect(() => {
        if (!isInView) return;

        let animationFrameId: number;

        const update3DPositions = () => {
            const baseSpeed = autoSpeed.current;

            if (targetRotY.current !== null && targetRotX.current !== null) {
                const dy = targetRotY.current - rotY.current;
                const dx = targetRotX.current - rotX.current;

                rotY.current += dy * 0.08 + baseSpeed;
                rotX.current += dx * 0.08;

                if (Math.abs(dy) < 0.02 && Math.abs(dx) < 0.02) {
                    targetRotY.current = null;
                    targetRotX.current = null;
                }
            } else if (!isDragging.current) {
                velocity.current.x = velocity.current.x * 0.94 + baseSpeed * 0.06;
                velocity.current.y = velocity.current.y * 0.94;

                rotY.current += velocity.current.x;
                rotX.current += velocity.current.y;

                rotX.current = Math.max(-0.35, Math.min(0.35, rotX.current));
            }

            setNodes(computeNodes(rotX.current, rotY.current, radius));
            animationFrameId = requestAnimationFrame(update3DPositions);
        };

        update3DPositions();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [radius, isInView]);

    const handleNodeClick = useCallback(
        (id: number) => {
            setSelectedId(id);

            setTimeout(() => {
                setSelectedId((prev) => (prev === id ? null : prev));
            }, 1800);

            const item = TECH_ITEMS.find((t) => t.id === id);
            if (!item) return;

            const r = radius;
            const x0 = r * Math.sin(item.basePhi) * Math.cos(item.baseTheta);
            const y0 = r * Math.cos(item.basePhi) * 0.82;
            const z0 = r * Math.sin(item.basePhi) * Math.sin(item.baseTheta);

            const desiredRotY = -Math.atan2(x0, z0);
            const desiredRotX = Math.atan2(y0, Math.sqrt(x0 * x0 + z0 * z0));

            let curY = rotY.current % (Math.PI * 2);
            let diffY = desiredRotY - curY;
            while (diffY > Math.PI) diffY -= Math.PI * 2;
            while (diffY < -Math.PI) diffY += Math.PI * 2;

            targetRotY.current = rotY.current + diffY;
            targetRotX.current = Math.max(-0.35, Math.min(0.35, desiredRotX));
        },
        [radius]
    );

    const handlePointerDown = (clientX: number, clientY: number) => {
        isDragging.current = true;
        targetRotY.current = null;
        targetRotX.current = null;
        lastMousePos.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
        if (!isDragging.current) return;
        const deltaX = clientX - lastMousePos.current.x;
        const deltaY = clientY - lastMousePos.current.y;

        const sensitivity = 0.005;
        rotY.current += deltaX * sensitivity;
        rotX.current -= deltaY * sensitivity;

        velocity.current = {
            x: deltaX * sensitivity * 0.8,
            y: -deltaY * sensitivity * 0.8,
        };

        lastMousePos.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    return (
        <section id="tech-stack" className="relative py-28 px-4 md:px-8 max-w-5xl mx-auto z-20 bg-transparent select-none">
            <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-[0.28em] text-zinc-400 mb-10 uppercase">
                <span className="h-[1px] w-10 md:w-16 bg-zinc-700/80" />
                <span className="text-[11px] md:text-xs text-zinc-400 font-medium">15 TECHNOLOGIES · DAILY STACK</span>
                <span className="h-[1px] w-10 md:w-16 bg-zinc-700/80" />
            </div>

            <div
                ref={containerRef}
                onMouseLeave={handlePointerUp}
                onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
                onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
                onMouseUp={handlePointerUp}
                onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchEnd={handlePointerUp}
                className="relative w-full h-[580px] md:h-[650px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.16)_0%,rgba(167,139,250,0.04)_45%,transparent_72%)] pointer-events-none z-0" />

                <div
                    className="absolute inset-0 pointer-events-none opacity-25"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)`,
                        backgroundSize: "36px 36px",
                    }}
                />

                <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
                    {nodes.map((node) => {
                        const Icon = node.icon;
                        const isSelected = selectedId === node.id;

                        return (
                            <div
                                key={node.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNodeClick(node.id);
                                }}
                                className="absolute pointer-events-auto cursor-pointer transition-transform duration-75"
                                style={{
                                    transform: `translate3d(${node.x}px, ${node.y}px, 0px) translate(-50%, -50%) scale(${isSelected ? node.scale * 1.15 : node.scale
                                        })`,
                                    zIndex: isSelected ? 999 : node.zIndex,
                                    opacity: isSelected ? 1 : node.opacity,
                                    filter: isSelected ? "none" : node.blur > 0 ? `blur(${node.blur}px)` : "none",
                                }}
                            >
                                <div
                                    className={`group relative flex flex-col items-center justify-center w-[74px] h-[74px] md:w-[86px] md:h-[86px] rounded-2xl md:rounded-3xl bg-[#0e0e11]/95 border transition-all duration-300 ${isSelected
                                            ? "border-accent shadow-[0_0_35px_rgba(124,58,237,0.65)] bg-[#171720]"
                                            : "border-white/[0.1] hover:border-accent/60 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:bg-[#16161c]"
                                        }`}
                                    style={{
                                        boxShadow:
                                            node.glow > 0 && !isSelected
                                                ? `0 12px 35px rgba(0,0,0,0.8), 0 0 ${node.glow * 25}px rgba(124,58,237,${node.glow * 0.35
                                                })`
                                                : isSelected
                                                    ? undefined
                                                    : "0 8px 24px rgba(0,0,0,0.8)",
                                    }}
                                >
                                    <div
                                        className="text-2xl md:text-[28px] mb-1.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
                                        style={{ color: node.color }}
                                    >
                                        <Icon size={28} />
                                    </div>

                                    <span
                                        className={`text-[8.5px] md:text-[9.5px] font-mono tracking-wider font-semibold uppercase truncate max-w-[70px] text-center px-1 transition-colors ${isSelected
                                                ? "text-white"
                                                : "text-zinc-400 group-hover:text-white"
                                            }`}
                                    >
                                        {node.label}
                                    </span>

                                    {node.glow > 0.3 && (
                                        <div
                                            className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none transition-opacity duration-300"
                                            style={{
                                                background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)`,
                                                opacity: node.glow,
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
