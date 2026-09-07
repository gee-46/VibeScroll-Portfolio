"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, AnimatePresence, type Variants } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import {
    Trophy,
    Award,
    Medal,
    Sparkles,
    Flame,
    GitCommit,
    ArrowUpRight,
    Github,
    Workflow,
    ChevronDown,
    Layers,
} from "lucide-react";
import { SiAirbnb, SiNextdotjs, SiHuggingface } from "react-icons/si";
import Link from "next/link";

function StatCounter({
    target,
    suffix = "+",
    duration = 1.8,
    inView,
}: {
    target: number;
    suffix?: string;
    duration?: number;
    inView: boolean;
}) {
    const [count, setCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, target, {
            duration,
            ease: "easeOut",
            onUpdate: (latest) => setCount(Math.floor(latest)),
            onComplete: () => setIsComplete(true),
        });
        return () => controls.stop();
    }, [inView, target, duration]);

    return (
        <span className="tabular-nums font-bold">
            {count}
            {isComplete && <span className="text-accent-light">{suffix}</span>}
        </span>
    );
}

export default function Activities() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [showContributions, setShowContributions] = useState(false);

    const statsTable = [
        {
            value: 180,
            suffix: "+",
            label: "Day Streak",
            sublabel: "DAILY ACTIVE CODING",
            isFlame: true,
        },
        {
            value: 1000,
            suffix: "+",
            label: "Contributions",
            sublabel: "COMMITS · PRS · REPOS",
            isCommit: true,
        },
        {
            value: 2,
            suffix: "+",
            label: "Major Orgs",
            sublabel: "AIRBNB · NEXT.JS · MCP · HF",
        },
        {
            value: 100,
            suffix: "%",
            label: "Merge Rate",
            sublabel: "ON PRODUCTION CODEBASES",
        },
    ];

    const openSourceList = [
        {
            icon: SiAirbnb,
            iconColor: "#FF5A5F",
            iconBg: "bg-[#FF5A5F]/10 border-[#FF5A5F]/20",
            tag: "OPEN SOURCE",
            title: "Contributor – Airbnb Omniduct",
            link: "https://github.com/airbnb/omniduct",
            repoDisplay: "airbnb/omniduct",
        },
        {
            icon: SiNextdotjs,
            iconColor: "#EDEDED",
            iconBg: "bg-white/10 border-white/20",
            tag: "OPEN SOURCE",
            title: "Contributor – Next.js",
            link: "https://github.com/vercel/next.js",
            repoDisplay: "vercel/next.js",
        },
        {
            icon: Workflow,
            iconColor: "#A78BFA",
            iconBg: "bg-purple-500/10 border-purple-500/20",
            tag: "OPEN SOURCE",
            title: "Contributor – Model Context Protocol (Python SDK)",
            link: "https://github.com/modelcontextprotocol/python-sdk",
            repoDisplay: "modelcontextprotocol/python-sdk",
        },
        {
            icon: SiHuggingface,
            iconColor: "#FACC15",
            iconBg: "bg-yellow-500/10 border-yellow-500/20",
            tag: "OPEN SOURCE",
            title: "Contributor – Hugging Face Hub",
            link: "https://github.com/huggingface/huggingface_hub",
            repoDisplay: "huggingface/huggingface_hub",
        },
    ];

    const achievements = [
        {
            icon: Trophy,
            iconColor: "text-amber-400",
            iconBg: "bg-amber-400/10 border-amber-400/20",
            badge: "4TH PLACE",
            scope: "100+ Teams",
            title: "🏆 4th Place – InnovateX 4.0",
            description:
                "24-hour international tech fest hackathon at Presidency University, Bengaluru, competing among 100+ teams. Developed an AI-driven solution addressing a real-world problem and secured 4th place overall.",
            footer: "Presidency University, Bengaluru",
        },
        {
            icon: Medal,
            iconColor: "text-purple-400",
            iconBg: "bg-purple-400/10 border-purple-400/20",
            badge: "8TH PLACE OVERALL",
            scope: "Top 40 • 120+ Teams",
            title: "🏅 8th Place – TechVerse Hackathon",
            description:
                "24-hour hackathon at Beaary's Institute of Technology, Mangalore. Advanced to the Top 40 from 120+ teams, then competed in the Rural Tech domain, securing 3rd place in the domain and 8th place overall.",
            footer: "Beaary's Institute of Technology, Mangalore",
        },
        {
            icon: Sparkles,
            iconColor: "text-blue-400",
            iconBg: "bg-blue-400/10 border-blue-400/20",
            badge: "SEMI-FINALIST",
            scope: "80,000+ Participants",
            title: "🏅 Semi-Finalist – The Economic Times AI Hackathon 2.0",
            description:
                "Qualified for Round 2 among 80,000+ participants in the online AI hackathon.",
            footer: "The Economic Times AI Hackathon 2.0",
        },
        {
            icon: Award,
            iconColor: "text-emerald-400",
            iconBg: "bg-emerald-400/10 border-emerald-400/20",
            badge: "BEST PERFORMANCE",
            scope: "2,000+ Teams",
            title: "🥇 Best Performance Certificate – SkilStation Summer School Hackathon",
            description:
                "Competed among 2,000+ teams, qualified for the final round, and received a Best Performance Certificate for strong performance.",
            footer: "SkilStation Summer School Hackathon",
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section
            id="activities"
            ref={sectionRef}
            className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-transparent border-t border-white/[0.06]"
        >
            {/* Section Header */}
            <div className="mb-20 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block text-xs font-mono tracking-[0.25em] text-zinc-400 font-semibold mb-4 uppercase select-none">
                        BUILDING AI → BUSINESS
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-[#EDEDED] mb-6">
                        Recognition & Contributions<span className="text-accent font-sans">.</span>
                    </h2>
                    <p className="text-secondary text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                        Key milestones from national hackathons, alongside real-world open source contributions to projects used by millions of developers.
                    </p>
                </motion.div>
            </div>

            {/* Layout:
                1 Full-Width Clean Stats Table Tab (col-span-1 md:col-span-2)
                followed by 4 Hackathon cards (2x2 grid)
                All cards are frozen/static (no mouse hover glow)
            */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {/* 1. FULL-WIDTH GITHUB STATS TABLE & ACCORDION TAB (FROZEN/STATIC CARD) */}
                <motion.div variants={cardVariants} className="col-span-1 md:col-span-2">
                    <div className="p-6 md:p-8 flex flex-col justify-between bg-[#0e0e10]/90 border border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-2xl">
                        <div>
                            {/* Card Top Label Row */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl border bg-accent/10 border-accent/20 text-accent-light shadow-inner">
                                        <Github size={18} />
                                    </div>
                                    <span className="text-xs font-semibold tracking-wider uppercase text-zinc-200 font-mono">
                                        GITHUB & OPEN SOURCE ACTIVITY
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        ACTIVE CONTRIBUTOR
                                    </span>
                                    <span className="hidden sm:inline text-zinc-600">|</span>
                                    <a
                                        href="https://github.com/gee-46"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-400 hover:text-accent-light transition-colors hidden sm:flex items-center gap-1 cursor-none"
                                    >
                                        github.com/gee-46
                                        <ArrowUpRight size={13} />
                                    </a>
                                </div>
                            </div>

                            {/* Clean Stats Table Row (Divided Columns reference design) */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y-0 lg:divide-x divide-white/[0.08] py-4 bg-white/[0.015] border border-white/[0.06] rounded-2xl mb-6">
                                {statsTable.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col justify-between px-6 py-4 lg:py-2"
                                    >
                                        <div className="flex items-baseline gap-2 mb-2">
                                            {item.isFlame && (
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.15, 0.95, 1.1, 1],
                                                        opacity: [0.9, 1, 0.85, 1, 0.9],
                                                        filter: [
                                                            "drop-shadow(0 0 8px rgba(249,115,22,0.7))",
                                                            "drop-shadow(0 0 16px rgba(249,115,22,0.95))",
                                                            "drop-shadow(0 0 8px rgba(249,115,22,0.7))",
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 2.2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                    className="relative inline-flex items-center justify-center p-1 rounded-lg bg-orange-500/10 text-orange-500 mr-1"
                                                >
                                                    <Flame size={20} className="fill-orange-500/30" />
                                                </motion.div>
                                            )}
                                            {item.isCommit && (
                                                <div className="inline-flex items-center justify-center p-1 rounded-lg bg-accent/10 text-accent-light mr-1">
                                                    <GitCommit size={20} />
                                                </div>
                                            )}
                                            <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-grotesk tracking-tight text-white">
                                                <StatCounter
                                                    target={item.value}
                                                    suffix={item.suffix}
                                                    inView={isInView}
                                                />
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-zinc-200 text-sm md:text-base font-medium tracking-tight">
                                                {item.label}
                                            </p>
                                            <span className="text-[10px] md:text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mt-0.5">
                                                {item.sublabel}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Dropup / Toggle Bar to Check Detailed Contributions */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                <button
                                    onClick={() => setShowContributions(!showContributions)}
                                    className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-white/[0.1] bg-[#14141a] hover:bg-[#1c1c26] transition-all duration-300 text-zinc-200 font-medium text-xs md:text-sm cursor-none"
                                >
                                    <Layers size={15} className="text-accent-light" />
                                    <span>
                                        {showContributions
                                            ? "Hide Contribution Details"
                                            : "Check Contributions (Airbnb, Next.js, MCP, HF)"}
                                    </span>
                                    <motion.span
                                        animate={{ rotate: showContributions ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown size={15} className="text-zinc-400 group-hover:text-white" />
                                    </motion.span>
                                </button>

                                <Magnetic>
                                    <Link
                                        href="https://github.com/gee-46"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 text-xs md:text-sm text-zinc-400 hover:text-accent-light transition-colors font-medium py-1 px-2 cursor-none"
                                    >
                                        <span>View Full GitHub Profile</span>
                                        <ArrowUpRight
                                            size={15}
                                            className="text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                        />
                                    </Link>
                                </Magnetic>
                            </div>

                            {/* Expandable Clean 4-Item List (No heavy paragraph text) */}
                            <AnimatePresence>
                                {showContributions && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 border-t border-white/[0.06]">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {openSourceList.map((item, idx) => {
                                                    const IconComp = item.icon;
                                                    return (
                                                        <a
                                                            key={idx}
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-between p-4 rounded-xl bg-[#121218] border border-white/[0.06] hover:border-white/[0.2] transition-colors cursor-none group/item"
                                                        >
                                                            <div className="flex items-center gap-3 min-w-0">
                                                                <div
                                                                    className={`p-2 rounded-lg border ${item.iconBg} flex items-center justify-center shrink-0`}
                                                                    style={{ color: item.iconColor }}
                                                                >
                                                                    <IconComp size={16} />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <h4 className="text-sm font-semibold font-grotesk text-zinc-100 group-hover/item:text-accent-light transition-colors truncate">
                                                                        {item.title}
                                                                    </h4>
                                                                    <span className="text-[11px] font-mono text-zinc-500 truncate block">
                                                                        {item.repoDisplay}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-1 text-xs text-accent-light shrink-0 font-medium pl-2">
                                                                <span className="hidden sm:inline">Repo</span>
                                                                <ArrowUpRight
                                                                    size={14}
                                                                    className="group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform"
                                                                />
                                                            </div>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* 2. HACKATHON ACHIEVEMENTS: 4 Cards in 2x2 Grid (FROZEN/STATIC CARDS) */}
                {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="h-full"
                        >
                            <div className="p-8 flex flex-col justify-between h-full bg-[#0e0e10]/80 border border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-2xl">
                                <div>
                                    {/* Top Metadata Row with Category Badges and Metrics */}
                                    <div className="flex items-center justify-between gap-4 mb-6 cursor-none">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl border ${achievement.iconBg} ${achievement.iconColor} shadow-inner`}>
                                                <IconComponent size={20} />
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/[0.04] border border-white/[0.08] text-zinc-200">
                                                {achievement.badge}
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium px-3 py-1 rounded-full border border-accent/20 bg-accent/10 text-accent-light">
                                            {achievement.scope}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl font-bold font-grotesk text-zinc-100 mb-3 tracking-tight cursor-none">
                                        {achievement.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-zinc-300/85 leading-relaxed text-sm md:text-base font-light cursor-none">
                                        {achievement.description}
                                    </p>
                                </div>

                                {/* Footer Area */}
                                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-zinc-400 font-medium tracking-wide cursor-none">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                                    <span>{achievement.footer}</span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
