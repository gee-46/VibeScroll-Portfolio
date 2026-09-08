"use client";

import { useEffect } from "react";

export default function GamePage() {
    useEffect(() => {
        window.location.replace("/game.html");
    }, []);

    return (
        <div className="fixed inset-0 bg-[#0a0a0d] flex items-center justify-center text-white font-sans">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                <p className="text-xs tracking-widest text-zinc-400 font-mono">ENTERING GAUTAM&apos;S WORLD...</p>
            </div>
        </div>
    );
}
