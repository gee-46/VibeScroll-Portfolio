'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
    Terminal, 
    Brain, 
    Bot, 
    Sprout, 
    Calendar, 
    ChevronDown, 
    ChevronUp
} from 'lucide-react';

interface ExperienceItem {
    id: string;
    organization: string;
    role: string;
    type: string;
    duration: string;
    isCurrent?: boolean;
    isFeatured?: boolean;
    projectName?: string;
    projectSubtitle?: string;
    description: string;
    keyPoints: string[];
    tags: string[];
    icon: React.ElementType;
    iconColor: string;
    iconBg: string;
}

const EXPERIENCES: ExperienceItem[] = [
    {
        id: "infosys",
        organization: "Infosys Springboard 6.0",
        role: "Python Developer Intern",
        type: "Industrial Internship",
        duration: "October 2025 – February 2026",
        description:
            "Worked on a real-time contactless Human–Computer Interaction system that enables system volume control using hand gestures.",
        keyPoints: [
            "Built a real-time hand gesture recognition pipeline using Python, OpenCV and MediaPipe.",
            "Implemented gesture-based volume control using hand landmarks, pinch detection and finger-count logic.",
            "Integrated Pycaw for system-level audio control.",
            "Refactored the solution for Android deployment using Kivy and Buildozer.",
        ],
        tags: ["Python", "OpenCV", "MediaPipe", "Pycaw", "Kivy", "Buildozer"],
        icon: Terminal,
        iconColor: "#38BDF8",
        iconBg: "bg-sky-500/10 border-sky-500/20",
    },
    {
        id: "cognifyz",
        organization: "Cognifyz Technologies",
        role: "Machine Learning Intern",
        type: "Data Science & ML",
        duration: "January 2026 – February 2026",
        description:
            "Worked on real-world data analysis and machine learning tasks, focusing on transforming raw datasets into useful analytical insights.",
        keyPoints: [
            "Collected, cleaned and interpreted datasets.",
            "Assisted in developing and optimizing machine learning models.",
            "Applied statistical analysis and ML techniques to generate data-driven insights.",
        ],
        tags: ["Python", "Machine Learning", "Data Science", "Data Analysis", "Statistics"],
        icon: Brain,
        iconColor: "#A78BFA",
        iconBg: "bg-purple-500/10 border-purple-500/20",
    },
    {
        id: "sofzenix",
        organization: "Sofzenix IT Solutions LLP",
        role: "AI / Automation Intern",
        type: "Industrial Internship",
        duration: "July 2026 – Present",
        isCurrent: true,
        description:
            "Contributing to the development of AI-driven automation and enterprise software solutions across backend services, AI components, application architecture and workflow automation.",
        keyPoints: [
            "Contributing to AI-driven automation and enterprise software development using Python, FastAPI, REST APIs and modern AI tooling.",
            "Worked on SmartAI CRM, an AI-powered CRM platform involving AI assistant workflows, analytics, lead/contact management, sales processes, document management and workflow automation.",
            "Currently contributing to the Sofzenix eSign & Intelligent Document Automation Platform, an enterprise SaaS platform for document generation, approval, electronic signing, storage, auditing and analysis.",
            "Working across document intelligence capabilities including OCR/PDF extraction, document classification, key-value extraction, contract clause analysis, semantic search and AI assistants.",
            "Working with technologies including Python, FastAPI, LangChain, OpenAI/Gemini APIs, REST APIs, Git/GitHub and Docker.",
            "Applying modular architecture, API-driven development, workflow automation, separation of concerns and decoupled AI service design.",
        ],
        tags: [
            "AI / Automation",
            "Python",
            "FastAPI",
            "React",
            "TypeScript",
            "LangChain",
            "OpenAI",
            "Gemini",
            "Docker",
            "REST APIs",
        ],
        icon: Bot,
        iconColor: "#34D399",
        iconBg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
        id: "samruddhi",
        organization: "Samruddhi Organics",
        role: "AI Intern | Project Lead",
        type: "AI/ML Engineering",
        duration: "July 2026 – Present",
        isCurrent: true,
        isFeatured: true,
        projectName: "NutriPalm AI",
        projectSubtitle: "Precision Agriculture & Farm Intelligence Platform",
        description:
            "Building NutriPalm AI, an end-to-end precision agriculture platform that combines AI, GIS, satellite intelligence, OCR, weather data and Digital Twin technology to help farmers monitor farms and make data-driven agricultural decisions.",
        keyPoints: [
            "Building GIS-based farm mapping with GPS-assisted boundary surveying, interactive polygon editing, satellite basemaps, area/perimeter calculation and GeoJSON spatial data.",
            "Integrating Sentinel-2 satellite data for NDVI, vegetation health and crop-stress analysis.",
            "Integrating real-time weather intelligence including temperature, humidity, wind and rainfall using farm geolocation.",
            "Engineered a Python/Tesseract soil-report OCR pipeline to extract N, P, K, pH, EC, Organic Carbon and reported micronutrients from soil reports.",
            "Building an AI fertilizer recommendation engine that analyses nutrient deficiencies and generates fertilizer recommendations, dosage calculations, yield projections and ROI insights.",
            "Developing a Digital Twin representation of farm plots combining soil, environmental, crop and spatial information.",
            "Building account-specific farm analytics and dashboards backed by real user/plot data.",
            "Working with React, TypeScript, Python, FastAPI, Supabase/PostgreSQL, REST APIs, satellite/geospatial APIs and AI/ML components.",
            "Implementing authentication, Row Level Security, ownership-based data isolation and persistent backend services.",
            "Investigated authorized Karnataka cadastral/Bhu-Naksha integration and designed the system to support authorized cadastral data without relying on unofficial or fabricated parcel data.",
        ],
        tags: [
            "AI/ML",
            "Python",
            "FastAPI",
            "React",
            "TypeScript",
            "Supabase",
            "PostgreSQL",
            "GIS",
            "Sentinel-2",
            "OCR",
            "Digital Twin",
            "REST APIs",
        ],
        icon: Sprout,
        iconColor: "#FBBF24",
        iconBg: "bg-amber-500/10 border-amber-500/20",
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const desktopPathRef = useRef<SVGPathElement>(null);
    const mobilePathRef = useRef<SVGPathElement>(null);
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

    const [desktopHead, setDesktopHead] = useState({ x: 50, y: 0 });
    const [mobileHead, setMobileHead] = useState({ x: 20, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    const toggleExpand = (id: string) => {
        setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Scroll Progress for the Timeline Beam with immediate real-time synchronization
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 65%", "end 45%"],
    });

    // Smooth C1-continuous organic S-curves that flow gracefully down the center without overlapping cards
    const desktopCurvedPath = 
        "M 50,0 C 46.5,8 46.5,12 50,20 C 53.5,28 53.5,34 50,42 C 46.5,50 46.5,56 50,65 C 53.5,74 53.5,80 50,88 C 47.5,94 48.5,98 50,100";

    const mobileCurvedPath = 
        "M 20,0 C 16,8 16,12 20,20 C 24,28 24,34 20,42 C 16,50 16,56 20,65 C 24,74 24,80 20,88 C 17,94 18,98 20,100";

    // Track real-time position along the SVG path for desktop & mobile
    const updateHeadPositions = useCallback((progress: number) => {
        const clamped = Math.max(0, Math.min(1, progress));
        if (desktopPathRef.current) {
            const length = desktopPathRef.current.getTotalLength();
            const pt = desktopPathRef.current.getPointAtLength(clamped * length);
            setDesktopHead({ x: pt.x, y: pt.y });
        }
        if (mobilePathRef.current) {
            const length = mobilePathRef.current.getTotalLength();
            const pt = mobilePathRef.current.getPointAtLength(clamped * length);
            setMobileHead({ x: pt.x, y: pt.y });
        }
    }, []);

    useEffect(() => {
        setIsMounted(true);
        updateHeadPositions(scrollYProgress.get());
    }, [scrollYProgress, updateHeadPositions]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        updateHeadPositions(latest);
    });

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-transparent"
        >
            {/* 1. Section Header */}
            <div className="mb-24 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block text-xs font-mono tracking-[0.25em] text-zinc-400 font-semibold mb-4 uppercase select-none">
                        CAREER PATHWAY & INTERNSHIPS
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-[#EDEDED] mb-4">
                        Experience<span className="text-accent font-sans">.</span>
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                        A chronological track of applied engineering, machine learning pipelines, and production AI systems.
                    </p>
                </motion.div>
            </div>

            {/* 2. Interactive Timeline Grid Container */}
            <div className="relative">
                {/* ======================================================== */}
                {/* DESKTOP CURVED SVG TIMELINE BEAM (Hidden on mobile < md)  */}
                {/* ======================================================== */}
                <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10">
                    <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        fill="none"
                    >
                        <defs>
                            <linearGradient id="beamGradientDesktop" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                                <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.85" />
                                <stop offset="85%" stopColor="#C084FC" stopOpacity="1" />
                                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                            </linearGradient>
                            <filter id="beamGlowDesktop" x="-40%" y="-40%" width="180%" height="180%">
                                <feGaussianBlur stdDeviation="2.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Continuous Subtle Guide Track */}
                        <path
                            d={desktopCurvedPath}
                            stroke="rgba(255, 255, 255, 0.08)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* Glowing Ambient Aura along the active curve */}
                        <motion.path
                            d={desktopCurvedPath}
                            stroke="#8B5CF6"
                            strokeWidth="6"
                            strokeOpacity="0.3"
                            strokeLinecap="round"
                            filter="url(#beamGlowDesktop)"
                            vectorEffect="non-scaling-stroke"
                            style={{ pathLength: scrollYProgress }}
                        />

                        {/* Active Luminous Laser Beam Trail */}
                        <motion.path
                            ref={desktopPathRef}
                            d={desktopCurvedPath}
                            stroke="url(#beamGradientDesktop)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            style={{ pathLength: scrollYProgress }}
                        />
                    </svg>

                    {/* Radiant Light Beam Head (Comet Core) */}
                    {isMounted && (
                        <div
                            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center transition-transform duration-75"
                            style={{
                                left: `${desktopHead.x}%`,
                                top: `${desktopHead.y}%`,
                            }}
                        >
                            {/* Outer pulsing laser aura */}
                            <div className="absolute w-8 h-8 rounded-full bg-accent/40 animate-ping" />
                            {/* Middle radiant glow halo */}
                            <div className="absolute w-6 h-6 rounded-full bg-accent-light/40 blur-sm" />
                            {/* Inner glowing shell */}
                            <div className="w-4 h-4 rounded-full bg-accent border-2 border-white shadow-[0_0_20px_rgba(192,132,252,1)] flex items-center justify-center">
                                {/* Brilliant pure white laser core */}
                                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                            </div>
                        </div>
                    )}
                </div>

                {/* ======================================================== */}
                {/* MOBILE CURVED SVG TIMELINE BEAM (Visible on mobile < md)  */}
                {/* ======================================================== */}
                <div className="md:hidden absolute inset-0 w-12 h-full pointer-events-none z-10">
                    <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 40 100"
                        preserveAspectRatio="none"
                        fill="none"
                    >
                        <defs>
                            <linearGradient id="beamGradientMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                                <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                            </linearGradient>
                        </defs>

                        {/* Continuous Guide Line */}
                        <path
                            d={mobileCurvedPath}
                            stroke="rgba(255, 255, 255, 0.08)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* Glowing Active Progress Beam */}
                        <motion.path
                            ref={mobilePathRef}
                            d={mobileCurvedPath}
                            stroke="url(#beamGradientMobile)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            style={{ pathLength: scrollYProgress }}
                        />
                    </svg>

                    {/* Mobile Traveling Beam Head */}
                    {isMounted && (
                        <div
                            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center transition-transform duration-75"
                            style={{
                                left: `${mobileHead.x}px`,
                                top: `${mobileHead.y}%`,
                            }}
                        >
                            <div className="absolute w-6 h-6 rounded-full bg-accent/40 animate-ping" />
                            <div className="w-3.5 h-3.5 rounded-full bg-accent border-2 border-white shadow-[0_0_12px_rgba(192,132,252,1)] flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. Experiences Cards Stack */}
                <div className="space-y-16 md:space-y-28">
                    {EXPERIENCES.map((exp, index) => {
                        const isEven = index % 2 === 1; // 0: Infosys (Left), 1: Cognifyz (Right), 2: Sofzenix (Left), 3: Samruddhi (Right)
                        const IconComponent = exp.icon;
                        const isExpanded = expandedCards[exp.id];
                        const displayBullets =
                            exp.keyPoints.length > 4 && !isExpanded
                                ? exp.keyPoints.slice(0, 3)
                                : exp.keyPoints;

                        return (
                            <div
                                key={exp.id}
                                className="relative flex flex-col md:flex-row items-center w-full"
                            >
                                {/* CENTER NODE MARKER (Desktop) */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-5 h-5 rounded-full bg-[#0e0e12] border-2 border-white/20 z-15 items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                                >
                                    <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                                </motion.div>

                                {/* MOBILE NODE MARKER */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.5 }}
                                    className="md:hidden absolute left-[20px] -translate-x-1/2 top-7 w-4 h-4 rounded-full bg-[#0e0e12] border-2 border-white/20 z-15 flex items-center justify-center"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                </motion.div>

                                {/* DESKTOP ALTERNATING WRAPPER */}
                                <div
                                    className={`w-full flex ${
                                        isEven ? "md:justify-end" : "md:justify-start"
                                    } pl-12 md:pl-0`}
                                >
                                    {/* CARD CONTAINER */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="w-full md:w-[46%] relative group"
                                    >
                                        {/* HORIZONTAL CONNECTOR TO CENTER BEAM (Desktop only) */}
                                        <div
                                            className={`hidden md:block absolute top-9.5 h-[2px] bg-gradient-to-r ${
                                                isEven
                                                    ? "from-white/20 to-transparent -left-[8.7%] w-[8.7%]"
                                                    : "from-transparent to-white/20 -right-[8.7%] w-[8.7%]"
                                            } pointer-events-none`}
                                        />

                                        {/* MAIN EXPERIENCE CARD */}
                                        <div
                                            className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                                                exp.isFeatured
                                                    ? "bg-[#0e0e14]/95 border-accent/40 shadow-[0_4px_40px_rgba(124,58,237,0.18)]"
                                                    : "bg-[#0e0e11]/90 border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:border-white/[0.18]"
                                            }`}
                                        >
                                            {/* Top Subtle Ambient Glow for Featured Current Card */}
                                            {exp.isFeatured && (
                                                <div className="absolute top-0 right-0 w-64 h-32 bg-accent/15 blur-[60px] pointer-events-none" />
                                            )}

                                            {/* Card Header Row */}
                                            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                                {/* Org Logo / Icon & Name */}
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`p-2.5 rounded-xl border ${exp.iconBg} flex items-center justify-center shrink-0 shadow-inner`}
                                                        style={{ color: exp.iconColor }}
                                                    >
                                                        <IconComponent size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg sm:text-xl font-bold font-grotesk text-white tracking-tight leading-snug">
                                                            {exp.organization}
                                                        </h3>
                                                        <p className="text-accent-light font-medium text-xs sm:text-sm font-sans mt-0.5">
                                                            {exp.role}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Status Badges */}
                                                <div className="flex items-center gap-2">
                                                    {exp.isCurrent && (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                            PRESENT
                                                        </span>
                                                    )}
                                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                                                        {exp.type}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Duration Sub-bar */}
                                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-5">
                                                <Calendar size={13} className="text-zinc-500" />
                                                <span>{exp.duration}</span>
                                            </div>

                                            {/* FEATURED PROJECT BANNER (For Samruddhi Organics) */}
                                            {exp.projectName && (
                                                <div className="mb-5 p-4 rounded-xl bg-accent/[0.08] border border-accent/25 relative overflow-hidden">
                                                    <div className="flex items-center justify-between gap-2 mb-1">
                                                        <span className="text-[10px] font-mono tracking-widest text-accent-light uppercase font-semibold">
                                                            FLAGSHIP PROJECT LEAD
                                                        </span>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-light" />
                                                    </div>
                                                    <h4 className="text-base sm:text-lg font-bold font-grotesk text-white">
                                                        {exp.projectName}
                                                    </h4>
                                                    <p className="text-xs text-zinc-300 font-light mt-0.5">
                                                        {exp.projectSubtitle}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Short Description */}
                                            <p className="text-zinc-300/90 leading-relaxed text-xs sm:text-sm font-light mb-6">
                                                {exp.description}
                                            </p>

                                            {/* Key Achievement / Responsibility Bullets */}
                                            <div className="space-y-2.5 border-t border-white/[0.06] pt-5 mb-6">
                                                {displayBullets.map((point, pIdx) => (
                                                    <div
                                                        key={pIdx}
                                                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300/85 font-light leading-relaxed"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-accent/70 mt-1.5 shrink-0" />
                                                        <span>{point}</span>
                                                    </div>
                                                ))}

                                                {/* Expand / Collapse Button if key points > 4 */}
                                                {exp.keyPoints.length > 4 && (
                                                    <button
                                                        onClick={() => toggleExpand(exp.id)}
                                                        className="inline-flex items-center gap-1.5 text-xs text-accent-light hover:text-white transition-colors font-medium mt-2 pt-1 cursor-none select-none"
                                                    >
                                                        <span>
                                                            {isExpanded
                                                                ? "Show fewer points"
                                                                : `View all ${exp.keyPoints.length} key points (${
                                                                      exp.keyPoints.length - displayBullets.length
                                                                  } more)`}
                                                        </span>
                                                        {isExpanded ? (
                                                            <ChevronUp size={13} />
                                                        ) : (
                                                            <ChevronDown size={13} />
                                                        )}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Technology Tags */}
                                            <div className="flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-4">
                                                {exp.tags.map((tag, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-medium tracking-wide bg-white/[0.03] border border-white/[0.06] text-zinc-300 hover:border-accent/30 transition-colors"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
