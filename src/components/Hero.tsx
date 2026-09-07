'use client';

import dynamic from 'next/dynamic';

// Three.js / Rapier / meshline all touch `window` and WebGL context during
// module init, so this must never run during SSR or Next's server render
// will throw. `ssr: false` guarantees it only mounts in the browser.
const LanyardBadge = dynamic(() => import('./LanyardBadge'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#050507] text-white lg:flex-row">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_60%)]" />

      {/* left: copy */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-8 py-24 sm:px-14 lg:px-20">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-sky-400/80">
          Portfolio / 2026
        </p>
        <h1 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          Gautam N Chipkar
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/60">
          AI Engineer <span className="text-white/35">(Incoming)</span> — building
          intelligent systems, automation workflows, and products that feel effortless.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Get in Touch
          </a>
        </div>

        <p className="mt-12 text-xs text-white/30">
          Interactive 3D identity card · drag to explore
        </p>
      </div>

      {/* right: 3D badge canvas */}
      <div className="relative z-10 h-[70vh] w-full lg:h-screen lg:w-[55%]">
        <LanyardBadge
          name="GAUTAM N CHIPKAR"
          role="AI Engineer (Incoming)"
          photoUrl="/gautam.png"
          strapLabel="GAUTAM N CHIPKAR • AI ENGINEER • "
        />
      </div>
    </section>
  );
}
