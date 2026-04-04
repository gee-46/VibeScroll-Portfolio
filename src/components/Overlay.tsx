"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface OverlayProps {
    progress: MotionValue<number>;
}

export default function Overlay({ progress }: OverlayProps) {
    // section 1: 0% -> 20%
    const opacity1 = useTransform(progress, [0, 0.15, 0.2], [1, 1, 0]);
    const y1 = useTransform(progress, [0, 0.2], [0, -50]);

    // section 2: 25% -> 50%
    const opacity2 = useTransform(progress, [0.2, 0.25, 0.45, 0.5], [0, 1, 1, 0]);
    const y2 = useTransform(progress, [0.2, 0.3], [50, 0]);

    // section 3: 55% -> 80%
    const opacity3 = useTransform(progress, [0.5, 0.55, 0.9, 0.95], [0, 1, 1, 0]);
    const y3 = useTransform(progress, [0.5, 0.6], [50, 0]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center">
            <div className="container mx-auto px-6 md:px-12 relative w-full h-full flex items-center">

                {/* SECTION 1 */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute w-full text-center left-0"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white drop-shadow-2xl mb-6 leading-tight">
                        Gautam N Chipkar
                        <span className="block text-accent text-3xl md:text-5xl lg:text-6xl mt-2 font-bold tracking-tight glow-text font-serif italic">
                            AI & Data Science Engineer
                        </span>
                    </h1>
                    <p className="text-secondary text-xl md:text-3xl mt-4 max-w-3xl mx-auto tracking-wide">
                        Building intelligent systems and <span className="text-white font-medium">creative digital experiences.</span>
                    </p>
                </motion.div>

                {/* SECTION 2 */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute left-6 md:left-12 max-w-3xl"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl mb-8 leading-tight">
                        I build AI-powered <br />
                        <span className="text-accent underline decoration-4 decoration-accent/50 underline-offset-8">digital experiences.</span>
                    </h2>
                    <div className="bg-white/5 backdrop-blur-xl inline-block p-6 rounded-2xl border border-white/10 shadow-2xl">
                        <p className="text-white/90 text-lg md:text-2xl font-medium tracking-wide">
                            Python <span className="text-accent mx-2">•</span>
                            Machine Learning <span className="text-accent mx-2">•</span>
                            Data Science <span className="text-accent mx-2">•</span>
                            GenAI
                        </p>
                    </div>
                </motion.div>

                {/* SECTION 3 */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute right-6 md:right-12 max-w-3xl text-right ml-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl mb-8 leading-tight">
                        Bridging design, <br />
                        data, and <span className="text-accent glow-text">engineering.</span>
                    </h2>
                    <div className="bg-white/5 backdrop-blur-xl inline-block p-6 rounded-2xl border border-white/10 shadow-2xl ml-auto">
                        <p className="text-white/90 text-lg md:text-2xl font-medium tracking-wide">
                            From machine learning models to beautiful interfaces.
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
