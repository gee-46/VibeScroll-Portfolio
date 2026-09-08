"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    SiPython,
    SiGit,
    SiGithub,
    SiTensorflow,
    SiNumpy,
    SiHuggingface,
    SiCoursera,
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
    Award,
    ExternalLink,
    CheckCircle2,
    Calendar,
    ShieldCheck,
    X,
    Sparkles,
    Maximize2,
} from "lucide-react";
import GlowCard from "@/components/GlowCard";
import Magnetic from "@/components/Magnetic";

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

interface Certificate {
    id: string;
    title: string;
    issuer: string;
    issuerBadge: string;
    issuerColor: string;
    date: string;
    credentialId?: string;
    certNumber?: string;
    image: string;
    description: string;
    skills: string[];
    verifyUrl?: string;
    signatory?: string;
}

const CERTIFICATES: Certificate[] = [
    {
        id: "azure-ai",
        title: "Microsoft Certified: Azure AI Fundamentals",
        issuer: "Microsoft",
        issuerBadge: "AI-900 · FUNDAMENTALS",
        issuerColor: "#00A4EF",
        date: "August 14, 2026",
        credentialId: "E271F90AD6EFEDEA",
        certNumber: "32B6BF-D8FC8Q",
        image: "/certificates/microsoft_azure_ai.png",
        description:
            "Demonstrated foundational knowledge of machine learning workloads, computer vision, natural language processing, conversational AI, and responsible generative AI architectures on Microsoft Azure.",
        skills: ["Azure AI", "Computer Vision", "NLP", "Azure ML Studio", "Responsible AI"],
        signatory: "Satya Narayana Nadella, CEO Microsoft",
    },
    {
        id: "ibm-python",
        title: "Python for Data Science, AI & Development",
        issuer: "IBM",
        issuerBadge: "IBM · COURSERA",
        issuerColor: "#0F62FE",
        date: "June 11, 2025",
        credentialId: "MN0BI8K17DK0",
        image: "/certificates/ibm_python_ai.png",
        description:
            "Authorized by IBM and offered through Coursera. Comprehensive mastery of core Python programming, NumPy arrays, Pandas dataframes, REST APIs, web scraping, and foundational AI pipelines.",
        skills: ["Python", "NumPy", "Pandas", "REST APIs", "Data Science", "AI Dev"],
        verifyUrl: "https://coursera.org/verify/MN0BI8K17DK0",
        signatory: "Joseph Santarcangelo, Senior Data Scientist IBM",
    },
    {
        id: "infosys-gesture",
        title: "Internship 6.0: GestureVolume (Contactless HCI)",
        issuer: "Infosys Springboard",
        issuerBadge: "INFOSYS SPRINGBOARD",
        issuerColor: "#007CC3",
        date: "Conducted Oct–Dec 2025 · Issued Jan 27, 2026",
        image: "/certificates/infosys_springboard.png",
        description:
            "Certificate of Completion for mandatory assignment in Internship 6.0. Built a real-time contactless human-computer interaction system utilizing OpenCV, MediaPipe hand landmark tracking, and Pycaw audio control.",
        skills: ["OpenCV", "MediaPipe", "Pycaw", "HCI", "Gesture Recognition", "Python"],
        verifyUrl: "https://verify.onwingspan.com",
        signatory: "Satheesha B. Nanjappa, Senior VP & Head Education, Infosys Limited",
    },
];

export default function TechStack() {
    const [activeTab, setActiveTab] = useState<"tech" | "certs">("tech");
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    // 3D Sphere Refs and State
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const [radius, setRadius] = useState(230);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedIdRef = useRef<number | null>(null);
    selectedIdRef.current = selectedId;

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
            if (window.innerWidth < 640) {
                setRadius(140);
            } else if (window.innerWidth < 1024) {
                setRadius(190);
            } else {
                setRadius(235);
            }
        };

        updateRadius();
        window.addEventListener("resize", updateRadius);
        return () => window.removeEventListener("resize", updateRadius);
    }, []);

    const handleNodeClick = useCallback(
        (id: number) => {
            if (selectedId === id) {
                setSelectedId(null);
                targetRotX.current = null;
                targetRotY.current = null;
                return;
            }

            setSelectedId(id);
            const item = TECH_ITEMS.find((n) => n.id === id);
            if (!item) return;

            const desiredRotY = -item.baseTheta;
            let curY = rotY.current;
            const twoPi = Math.PI * 2;
            let diff = ((desiredRotY - curY) % twoPi + twoPi) % twoPi;
            if (diff > Math.PI) diff -= twoPi;
            targetRotY.current = curY + diff;

            const desiredRotX = 0;
            let curX = rotX.current;
            let diffX = ((desiredRotX - curX) % twoPi + twoPi) % twoPi;
            if (diffX > Math.PI) diffX -= twoPi;
            targetRotX.current = curX + diffX;
        },
        [selectedId]
    );

    // 60FPS Direct Hardware-Accelerated DOM Transform Updates
    useEffect(() => {
        if (!isInView || activeTab !== "tech") return;

        let animationFrameId: number;

        const update3DPositions = () => {
            if (targetRotY.current !== null && targetRotX.current !== null) {
                const dy = targetRotY.current - rotY.current;
                const dx = targetRotX.current - rotX.current;
                rotY.current += dy * 0.08;
                rotX.current += dx * 0.08;

                if (Math.abs(dy) < 0.001 && Math.abs(dx) < 0.001) {
                    rotY.current = targetRotY.current;
                    rotX.current = targetRotX.current;
                    targetRotY.current = null;
                    targetRotX.current = null;
                }
            } else if (!isDragging.current) {
                rotY.current += velocity.current.x;
                rotX.current += velocity.current.y;

                velocity.current.x += (autoSpeed.current - velocity.current.x) * 0.03;
                velocity.current.y += (0 - velocity.current.y) * 0.03;
                rotX.current = Math.max(-0.35, Math.min(0.35, rotX.current));
            }

            const r = radius;
            const rx = rotX.current;
            const ry = rotY.current;
            const cosX = Math.cos(rx);
            const sinX = Math.sin(rx);
            const cosY = Math.cos(ry);
            const sinY = Math.sin(ry);

            for (let i = 0; i < TECH_ITEMS.length; i++) {
                const item = TECH_ITEMS[i];
                const el = itemRefs.current[item.id];
                if (!el) continue;

                const x0 = r * Math.sin(item.basePhi) * Math.cos(item.baseTheta);
                const y0 = r * Math.cos(item.basePhi) * 0.82;
                const z0 = r * Math.sin(item.basePhi) * Math.sin(item.baseTheta);

                const y1 = y0 * cosX - z0 * sinX;
                const z1 = y0 * sinX + z0 * cosX;

                const x2 = x0 * cosY + z1 * sinY;
                const z2 = -x0 * sinY + z1 * cosY;
                const y2 = y1;

                const normZ = Math.max(-1, Math.min(1, z2 / r));
                const scale = 0.65 + (normZ + 1) * 0.24;
                const opacity = Math.max(0.18, Math.min(1, 0.22 + (normZ + 1) * 0.39));
                const blur = normZ > 0.3 ? 0 : Math.max(0, (0.3 - normZ) * 2.2);
                const zIndex = Math.round((normZ + 1) * 50) + 10;
                const isSelected = selectedIdRef.current === item.id;

                el.style.transform = `translate3d(${x2.toFixed(1)}px, ${y2.toFixed(1)}px, 0px) translate(-50%, -50%) scale(${(isSelected ? scale * 1.15 : scale).toFixed(3)})`;
                el.style.zIndex = `${isSelected ? 999 : zIndex}`;
                el.style.opacity = `${isSelected ? 1 : opacity.toFixed(2)}`;
                el.style.filter = isSelected ? "none" : blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : "none";
            }

            animationFrameId = requestAnimationFrame(update3DPositions);
        };

        animationFrameId = requestAnimationFrame(update3DPositions);
        return () => cancelAnimationFrame(animationFrameId);
    }, [radius, isInView, activeTab]);

    const handlePointerDown = (clientX: number, clientY: number) => {
        isDragging.current = true;
        lastMousePos.current = { x: clientX, y: clientY };
        targetRotY.current = null;
        targetRotX.current = null;
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
        if (!isDragging.current) return;
        const deltaX = clientX - lastMousePos.current.x;
        const deltaY = clientY - lastMousePos.current.y;

        const sensitivity = 0.005;
        rotY.current += deltaX * sensitivity;
        rotX.current -= deltaY * sensitivity;
        rotX.current = Math.max(-0.45, Math.min(0.45, rotX.current));

        velocity.current = {
            x: deltaX * sensitivity * 0.8,
            y: -deltaY * sensitivity * 0.8,
        };

        lastMousePos.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedCert(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <section id="tech-stack" className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto z-20 bg-transparent select-none border-t border-white/[0.06]">
            {/* Header Area with Title & Toggle Button */}
            <div className="flex flex-col items-center text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-[0.28em] text-zinc-400 mb-3 uppercase">
                        <span className="h-[1px] w-8 md:w-12 bg-zinc-700/80" />
                        <span className="text-[11px] md:text-xs text-zinc-400 font-medium">CAPABILITIES & VALIDATION</span>
                        <span className="h-[1px] w-8 md:w-12 bg-zinc-700/80" />
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-[#EDEDED] mb-4">
                        Stack & Credentials<span className="text-accent font-sans">.</span>
                    </h2>
                    <p className="text-secondary text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mb-8">
                        Core technologies powering my AI systems, accompanied by verified industry certifications.
                    </p>

                    {/* Interactive Switch Toggle */}
                    <div className="inline-flex items-center p-1.5 rounded-full bg-[#0f0f14] border border-white/[0.1] shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl relative">
                        {/* Tab 1: Tech Stack */}
                        <button
                            onClick={() => setActiveTab("tech")}
                            className={`relative px-5 md:px-7 py-2.5 rounded-full text-xs md:text-sm font-grotesk font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 cursor-none z-10 ${
                                activeTab === "tech"
                                    ? "text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                                    : "text-zinc-400 hover:text-zinc-200"
                            }`}
                        >
                            <Layers size={16} className={activeTab === "tech" ? "text-accent-light" : "text-zinc-500"} />
                            <span>Tech Stack</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/[0.08] text-zinc-300 ml-1">
                                15
                            </span>
                        </button>

                        {/* Tab 2: Certifications */}
                        <button
                            onClick={() => setActiveTab("certs")}
                            className={`relative px-5 md:px-7 py-2.5 rounded-full text-xs md:text-sm font-grotesk font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 cursor-none z-10 ${
                                activeTab === "certs"
                                    ? "text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                                    : "text-zinc-400 hover:text-zinc-200"
                            }`}
                        >
                            <Award size={16} className={activeTab === "certs" ? "text-accent-light" : "text-zinc-500"} />
                            <span>Certifications</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-accent/20 text-accent-light ml-1 font-bold">
                                3
                            </span>
                        </button>

                        {/* Animated Slider Background */}
                        <motion.div
                            layoutId="activeTabPill"
                            className="absolute inset-y-1.5 rounded-full bg-gradient-to-r from-accent/80 to-purple-600/80 border border-white/20 z-0"
                            style={{
                                left: activeTab === "tech" ? "6px" : "auto",
                                right: activeTab === "certs" ? "6px" : "auto",
                                width: activeTab === "tech" ? "calc(50% - 6px)" : "calc(50% - 6px)",
                            }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* TAB CONTENT WITH ANIMATE PRESENCE */}
            <AnimatePresence mode="wait">
                {activeTab === "tech" ? (
                    <motion.div
                        key="tech-tab"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4 }}
                        className="relative"
                    >
                        {/* 3D Sphere Interactive Canvas */}
                        <div
                            ref={containerRef}
                            onMouseLeave={handlePointerUp}
                            onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
                            onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
                            onMouseUp={handlePointerUp}
                            onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
                            onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
                            onTouchEnd={handlePointerUp}
                            className="relative w-full h-[520px] md:h-[600px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing rounded-3xl border border-white/[0.06] bg-[#09090c]/60 backdrop-blur-sm"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.16)_0%,rgba(167,139,250,0.03)_45%,transparent_72%)] pointer-events-none z-0" />

                            <div
                                className="absolute inset-0 pointer-events-none opacity-25"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)`,
                                    backgroundSize: "36px 36px",
                                }}
                            />

                            <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
                                {TECH_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    const isSelected = selectedId === item.id;

                                    return (
                                        <div
                                            key={item.id}
                                            ref={(el) => {
                                                itemRefs.current[item.id] = el;
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNodeClick(item.id);
                                            }}
                                            className="absolute pointer-events-auto cursor-pointer will-change-transform"
                                            style={{
                                                transform: `translate3d(0px, 0px, 0px) translate(-50%, -50%) scale(0.8)`,
                                                opacity: 0,
                                            }}
                                        >
                                            <div
                                                className={`group relative flex flex-col items-center justify-center w-[74px] h-[74px] md:w-[86px] md:h-[86px] rounded-2xl md:rounded-3xl bg-[#0e0e11]/95 border transition-all duration-300 ${
                                                    isSelected
                                                        ? "border-accent shadow-[0_0_35px_rgba(124,58,237,0.65)] bg-[#171720]"
                                                        : "border-white/[0.1] hover:border-accent/60 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:bg-[#16161c]"
                                                }`}
                                            >
                                                <div
                                                    className="text-2xl md:text-[28px] mb-1.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
                                                    style={{ color: item.color }}
                                                >
                                                    <Icon size={28} />
                                                </div>

                                                <span
                                                    className={`text-[8.5px] md:text-[9.5px] font-mono tracking-wider font-semibold uppercase truncate max-w-[70px] text-center px-1 transition-colors ${
                                                        isSelected
                                                            ? "text-white"
                                                            : "text-zinc-400 group-hover:text-white"
                                                    }`}
                                                >
                                                    {item.label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Drag Hint Pill */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#121218]/90 border border-white/[0.08] backdrop-blur-md text-[10px] md:text-xs font-mono text-zinc-400 pointer-events-none flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                <span>DRAG TO ROTATE 3D SPHERE · CLICK ICON TO FOCUS</span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="certs-tab"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {CERTIFICATES.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <GlowCard
                                    className="h-full flex flex-col justify-between p-6 rounded-2xl md:rounded-3xl border border-white/[0.08] bg-[#0c0c10]/90 backdrop-blur-xl group hover:border-accent/40 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
                                >
                                    <div>
                                        {/* Certificate Image Thumbnail with View Overlay */}
                                        <div
                                            onClick={() => setSelectedCert(cert)}
                                            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-[#14141a] border border-white/[0.08] cursor-pointer group/img shadow-md"
                                        >
                                            <Image
                                                src={cert.image}
                                                alt={cert.title}
                                                fill
                                                className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                                                <div className="w-10 h-10 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                                                    <Maximize2 size={18} />
                                                </div>
                                                <span className="text-[11px] font-mono tracking-wider font-semibold text-white uppercase bg-black/60 px-2.5 py-1 rounded-full border border-white/20">
                                                    View Credential
                                                </span>
                                            </div>

                                            {/* Issuer Tag Floating on top-left */}
                                            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#09090d]/90 border border-white/15 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                                                <ShieldCheck size={12} className="text-accent-light" />
                                                <span className="text-[9.5px] font-mono uppercase font-bold text-zinc-200 tracking-wider">
                                                    {cert.issuer}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Header Info */}
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-accent-light">
                                                    {cert.issuerBadge}
                                                </span>
                                                <span className="text-[10.5px] font-mono text-zinc-400 flex items-center gap-1">
                                                    <Calendar size={11} className="text-zinc-400" />
                                                    {cert.date.split("·")[0].trim()}
                                                </span>
                                            </div>

                                            <h3 className="text-lg md:text-xl font-heading font-semibold text-white tracking-tight leading-snug group-hover:text-purple-200 transition-colors">
                                                {cert.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-secondary text-xs md:text-sm font-light leading-relaxed mb-4">
                                            {cert.description}
                                        </p>
                                    </div>

                                    <div>
                                        {/* Skills Pills */}
                                        <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-white/[0.06]">
                                            {cert.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Bar */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setSelectedCert(cert)}
                                                className="flex-1 py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono font-medium text-zinc-200 hover:text-white transition-all text-center flex items-center justify-center gap-1.5 cursor-none"
                                            >
                                                <Eye size={13} className="text-accent-light" />
                                                <span>View Full Image</span>
                                            </button>

                                            {cert.verifyUrl && (
                                                <Magnetic>
                                                    <a
                                                        href={cert.verifyUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="py-2 px-3 rounded-xl bg-accent/15 hover:bg-accent/25 border border-accent/40 text-xs font-mono font-semibold text-accent-light hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-none shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                                                    >
                                                        <span>Verify</span>
                                                        <ExternalLink size={12} />
                                                    </a>
                                                </Magnetic>
                                            )}
                                        </div>
                                    </div>
                                </GlowCard>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FULL RESOLUTION CERTIFICATE MODAL LIGHTBOX */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-none"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl w-full bg-[#0d0d12] border border-white/20 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-4 md:p-6 flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent-light">
                                        <Award size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-base md:text-lg font-heading font-semibold text-white">
                                            {selectedCert.title}
                                        </h4>
                                        <p className="text-xs font-mono text-zinc-400">
                                            {selectedCert.issuer} · {selectedCert.date}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-none"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Full Certificate Image */}
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner">
                                <Image
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-white/10 mt-4 text-xs font-mono text-zinc-400">
                                <div className="space-y-0.5">
                                    {selectedCert.credentialId && (
                                        <p>
                                            <span className="text-zinc-500">CREDENTIAL ID:</span>{" "}
                                            <span className="text-zinc-200 font-semibold">{selectedCert.credentialId}</span>
                                        </p>
                                    )}
                                    {selectedCert.signatory && (
                                        <p className="text-[11px] text-zinc-400 italic">
                                            {selectedCert.signatory}
                                        </p>
                                    )}
                                </div>

                                {selectedCert.verifyUrl && (
                                    <a
                                        href={selectedCert.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-2 px-4 rounded-xl bg-accent text-white font-semibold flex items-center gap-2 hover:bg-accent-light transition-all shadow-[0_0_20px_rgba(124,58,237,0.5)] cursor-none"
                                    >
                                        <span>Verify Official Issuer</span>
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
