"use client";

import { motion } from "framer-motion";

export default function Experience() {
    return (
        <section id="experience" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-transparent">
            {/* Header */}
            <div className="mb-24 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4"
                >
                    Experience<span className="text-accent">.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-secondary text-lg max-w-2xl mx-auto"
                >
                    Professional internships and hands-on ML/AI development.
                </motion.p>
            </div>

            {/* Timeline */}
            <div className="relative max-w-4xl mx-auto pl-4 md:pl-0">
                {/* Center / Left glowing line */}
                <div className="absolute top-0 bottom-0 left-[23px] md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-accent/80 via-accent/20 to-transparent" />

                {/* Entry 1 */}
                <div className="relative mb-24 md:mb-32">
                    {/* Glowing Node */}
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full bg-accent z-10 shadow-[0_0_20px_rgba(124,58,237,0.8)]" 
                    >
                        <div className="absolute inset-0 rounded-full animate-ping bg-accent/40" />
                    </motion.div>
                    
                    <div className="flex flex-col md:flex-row w-full justify-between items-start">
                        {/* Empty Space for Desktop layout alternating */}
                        <div className="hidden md:block w-5/12" />
                        
                        {/* Card Content (Right aligned on Desktop, Full on mobile) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full pl-16 md:pl-0 md:w-5/12"
                        >
                            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-accent/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all duration-500">
                                <h3 className="text-2xl font-bold text-white mb-1">Python Developer Intern</h3>
                                <p className="text-accent font-medium mb-6">Infosys Springboard 6.0</p>
                                
                                <p className="text-secondary mb-8 leading-relaxed text-sm md:text-base">
                                    My internship at Infosys Springboard was an enriching experience, starting with a competitive selection process followed by hands-on project development.
                                    <br /><br />
                                    During the internship, I engineered a contactless Human–Computer Interaction system that enables system volume control using real-time hand gesture recognition.
                                </p>

                                <div className="space-y-5">
                                    <div>
                                        <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">Built a real-time gesture recognition pipeline</h4>
                                        <p className="text-secondary/80 text-sm leading-relaxed">using Python, OpenCV, and MediaPipe to detect and track 21 hand landmarks.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">Implemented gesture-based control logic</h4>
                                        <p className="text-secondary/80 text-sm leading-relaxed">including pinch detection using Euclidean distance and finger-count mechanisms.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">Integrated system-level audio APIs</h4>
                                        <p className="text-secondary/80 text-sm leading-relaxed">using Pycaw to map gesture inputs to system volume levels for smooth adjustments.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">Currently refactoring the project</h4>
                                        <p className="text-secondary/80 text-sm leading-relaxed">for cross-platform mobile deployment using Kivy and Buildozer, optimizing the computer vision pipeline for Android architecture.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Entry 2 */}
                <div className="relative">
                    {/* Glowing Node */}
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full border-2 border-accent bg-[#121212] z-10 transition-colors" 
                    />

                    <div className="flex flex-col md:flex-row-reverse w-full justify-between items-start">
                        {/* Empty Space for Desktop layout alternating */}
                        <div className="hidden md:block w-5/12" />
                        
                        {/* Card Content (Left aligned on Desktop, Full on mobile)*/}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full pl-16 md:pl-0 md:w-5/12 text-left md:text-right"
                        >
                            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-accent/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all duration-500 text-left">
                                <h3 className="text-2xl font-bold text-white mb-1">Machine Learning Intern</h3>
                                <p className="text-accent font-medium mb-6">Cognifyz Technologies</p>
                                
                                <p className="text-secondary mb-8 leading-relaxed text-sm md:text-base">
                                    At Cognifyz Technologies, I worked as a Machine Learning Intern focusing on analyzing real-world datasets and building data-driven solutions.
                                </p>

                                <div className="space-y-5">
                                    <div>
                                        <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">Collected, cleaned, and interpreted</h4>
                                        <p className="text-secondary/80 text-sm leading-relaxed">raw datasets to ensure accuracy and reliability.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">Assisted in developing and optimizing</h4>
                                        <p className="text-secondary/80 text-sm leading-relaxed">machine learning models for analytical tasks.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">Applied statistical analysis </h4>
                                        <p className="text-secondary/80 text-sm leading-relaxed">and machine learning techniques to generate insights that support data-driven decision-making.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
