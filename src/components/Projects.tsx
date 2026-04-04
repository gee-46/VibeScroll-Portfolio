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
            title: "Conversational QA Chatbot",
            description: "Context-aware chatbot with message history and deep document understanding capable of retrieving factual answers.",
            tags: ["LangChain", "LLMs", "NLP", "RAG"],
            image: "/projects/project2_conversational_qa_1773483434466.png",
            link: "https://github.com/gee-46/ContextIQ-AI-Document-Intelligence-Assistant"
        },
        {
            title: "ManMitra – AI Mental Health Assistant",
            description: "Built during Google Cloud GenAI Hackathon. AI-powered mental health awareness assistant offering empathetic responses and coping strategies.",
            tags: ["GCP", "GenAI", "Mental Health"],
            image: "/projects/project3_manmitra_mental_health_1773483451109.png",
            link: "https://github.com/gee-46/mannmitra-2.0"
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
        <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-transparent">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
                    Featured Work<span className="text-accent">.</span>
                </h2>
                <p className="text-secondary text-lg max-w-2xl">
                    A selection of projects exploring generative AI, computer vision, and machine learning systems.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        {/* GlowCard handles the hover interactions, cursor-gradient tracking and minor scaling */}
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                        <GlowCard className="p-6">
                            {/* Project Image */}
                            <div className="relative w-full h-48 md:h-56 mb-6 rounded-lg overflow-hidden border border-white/5 bg-black/50 shrink-0 cursor-none">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transform group-hover/glow:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover/glow:opacity-100 mix-blend-screen cursor-none"
                                />
                                <div className="absolute inset-0 border border-accent/20 rounded-lg opacity-0 group-hover/glow:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>

                            <div className="flex flex-col flex-grow cursor-none">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-2xl font-bold text-white group-hover/glow:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <ArrowUpRight className="text-secondary group-hover/glow:text-white transition-colors transform group-hover/glow:translate-x-1 group-hover/glow:-translate-y-1 ml-4 shrink-0" />
                                </div>

                                <p className="text-secondary leading-relaxed mb-8 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto cursor-none">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/80">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </GlowCard>
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
