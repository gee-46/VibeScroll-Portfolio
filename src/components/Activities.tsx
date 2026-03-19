"use client";

import { motion } from "framer-motion";
import GlowCard from "@/components/GlowCard";

export default function Activities() {
    const activities = [
        {
            title: "Google Cloud AI Labs — Mumbai",
            description: "Attended the Google Cloud AI Labs event in Mumbai where I explored the latest advancements in Artificial Intelligence and Generative AI.\n\nThe event included hands-on learning sessions, technical discussions with industry experts, and exposure to real-world AI applications built using Google Cloud technologies.",
        },
        {
            title: "GenAI Hackathon — Hack2Skill",
            description: "Participated in a Generative AI Hackathon organized through Hack2Skill where my team and I developed ManMitra, an AI-powered mental health awareness application.\n\nThe solution was designed to promote mental well-being by leveraging AI-driven interactions and intelligent assistance to help users better understand and manage mental health challenges.",
        },
        {
            title: "NASA Space Apps Challenge",
            description: "Participated in the NASA Space Apps Challenge, an international hackathon focused on solving global challenges using open data provided by NASA.\n\nMy team and I worked on developing and presenting an innovative idea addressing the given problem statement, focusing on applying technology and data-driven thinking to propose impactful solutions.",
        }
    ];

    return (
        <section id="activities" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-transparent">
            {/* Header */}
            <div className="mb-20 text-center max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6"
                >
                    Activities & Hackathons<span className="text-accent">.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[#B3B3B3] text-lg leading-relaxed"
                >
                    Active participation in technology events and hackathons through Hack2Skill, where my team and I have presented innovative ideas and solutions to real-world problem statements.
                </motion.p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map((activity, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
