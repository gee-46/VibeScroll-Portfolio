"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import GlowCard from "@/components/GlowCard";

export default function Projects() {
    const projects = [
        {
            title: "Disaster Vision QA System",
            description: "Vision-language model answering disaster scene questions using BLIP. Hardware efficient architecture supporting LLaVA for high-end deployment.",
            tags: ["Python", "PyTorch", "BLIP", "VQA"],
            image: "/projects/project1_disaster_vision_qa_1773483420174.png",
            link: "https://github.com/gee-46/-Disaster-VQA-Response-System"
        },
        {
            title: "PPE Detection System",
            description: "Real-time Personal Protective Equipment compliance system utilizing computer vision to detect helmets, safety vests, and site gear with instant violation alerts.",
            tags: ["YOLO", "Computer Vision", "PyTorch", "Deep Learning"],
            image: "/projects/project2_ppe_detection.jpg",
            link: "https://github.com/gee-46/ppe-detection-system"
        },
        {
            title: "SlumSafe AI – Urban Risk Intelligence",
            description: "AI-driven geospatial and computer vision platform analyzing informal settlement hazards, structural density, and disaster vulnerability.",
            tags: ["GeoAI", "Computer Vision", "PyTorch", "AI for Good"],
            image: "/projects/project3_slumsafe_ai.jpg",
            link: "https://github.com/gee-46/SlumSafe-AI"
        },
        {
            title: "Gesture-Based Volume Control",
            description: "Computer vision application that controls system volume using real-time hand gesture recognition and distance mapping.",
            tags: ["OpenCV", "MediaPipe", "Computer Vision"],
            image: "/projects/project4_gesture_volume_1773483467511.png",
            link: "https://github.com/gee-46/gesture-volume-control"
        }
    ];

    return (
        <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-transparent border-t border-white/[0.06]">
            <div className="mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-[#EDEDED] mb-4">
                        Featured Work<span className="text-accent font-sans">.</span>
                    </h2>
                    <p className="text-secondary text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                        A curated selection of projects exploring generative AI, computer vision, and machine learning systems.
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        {/* GlowCard handles the hover interactions, cursor-gradient tracking and minor scaling */}
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                            <GlowCard className="p-7 flex flex-col justify-between">
                                <div>
                                    {/* Project Image */}
                                    <div className="relative w-full h-48 md:h-56 mb-6 rounded-xl overflow-hidden border border-white/[0.08] bg-black/60 shrink-0 cursor-none">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transform group-hover/glow:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover/glow:opacity-100 mix-blend-screen cursor-none"
                                        />
                                        <div className="absolute inset-0 border border-accent/20 rounded-xl opacity-0 group-hover/glow:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </div>

                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold font-grotesk text-zinc-100 group-hover/glow:text-accent-light transition-colors tracking-tight">
                                            {project.title}
                                        </h3>
                                        <ArrowUpRight className="text-secondary group-hover/glow:text-white transition-colors transform group-hover/glow:translate-x-1 group-hover/glow:-translate-y-1 ml-4 shrink-0" size={22} />
                                    </div>

                                    <p className="text-zinc-300/80 leading-relaxed mb-8 text-sm md:text-base font-light">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2 cursor-none border-t border-white/[0.06]">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="text-xs font-medium px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </GlowCard>
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
