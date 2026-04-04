"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-[#121212] border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left Column - Image (Desktop: Left, Mobile: Top) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center items-center lg:items-start w-full"
                >
                    <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(124,58,237,0.15)] group">
                        <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                        <Image 
                            src="/about/ai_developer_workspace.png" 
                            alt="AI Developer Workspace" 
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[0.2] group-hover:grayscale-0"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        
                        {/* High-tech overlay elements */}
                        <div className="absolute top-4 left-4 w-12 h-12 border-t sm border-l border-accent/50 z-20 pointer-events-none opacity-50" />
                        <div className="absolute bottom-4 right-4 w-12 h-12 border-b sm border-r border-accent/50 z-20 pointer-events-none opacity-50" />
                    </div>
                </motion.div>

                {/* Right Column - Text (Desktop: Right, Mobile: Bottom) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-8">
                        About Me<span className="text-accent">.</span>
                    </h2>
                    <div className="space-y-6 text-secondary text-lg leading-relaxed">
                        <p>
                            I’m Gautam N Chipkar, a third-year Artificial Intelligence & Data Science (AI-DS) engineering student focused on building intelligent systems that solve real-world problems using Machine Learning, Computer Vision, and Generative AI.
                        </p>
                        <p>
                            My journey into AI started with building strong foundations in classical machine learning algorithms such as Linear Regression, Logistic Regression, K-Nearest Neighbors, and Decision Trees. I strongly believe that mastering core concepts is essential before moving toward advanced AI systems.
                        </p>
                        <p>
                            I have also developed practical computer vision applications using Python, OpenCV, and MediaPipe, focusing on real-time human-computer interaction systems.
                        </p>
                        <p>
                            During my internships at Infosys Springboard and Cognifyz Technologies, I worked on real datasets and built AI-driven applications, strengthening my understanding of the complete machine learning pipeline.
                        </p>
                        <p>
                            Currently, I am expanding my expertise in Deep Learning and Generative AI, exploring architectures such as CNNs, ANN, LSTMs, and NLP models while actively building practical AI projects.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
