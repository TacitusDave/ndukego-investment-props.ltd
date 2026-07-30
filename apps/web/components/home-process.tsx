"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Book a Consultation",
    desc: "Reach out via phone, email, or our online form. Our team will schedule a free discovery call.",
  },
  {
    step: "02",
    title: "Define Your Goals",
    desc: "We assess your financial situation, property needs, and investment horizon to craft a tailored plan.",
  },
  {
    step: "03",
    title: "Select & Verify",
    desc: "We present verified opportunities. Every property listing passes our title and inspection checklist.",
  },
  {
    step: "04",
    title: "Close with Confidence",
    desc: "We walk you through the entire transaction — documentation, legal sign-off, and handover.",
  },
];

export function HomeProcess() {
  return (
    <section className="relative py-28 overflow-hidden bg-[#050505]">
      {/* ── Animated radial crimson glow ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(193,18,31,0.22) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Slow scan beam ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 w-48"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.025), transparent)",
        }}
        animate={{ x: ["-200px", "calc(100vw + 200px)"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />

      {/* ── Subtle outer rings ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        animate={{ opacity: [0.12, 0.25, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div
          className="w-[600px] h-[600px] rounded-full border border-[#C1121F]/20"
          style={{ boxShadow: "0 0 120px 0 rgba(193,18,31,0.08)" }}
        />
      </motion.div>

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 max-w-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C1121F] mb-3">
            How It Works
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From first call to final handover
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <div key={step.step} className="relative">
              {/* Connecting line — desktop only */}
              {i < STEPS.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-[2.25rem] left-full z-10 h-px"
                  style={{
                    width: "calc(100% + 1.25rem)",
                    background: "linear-gradient(to right, rgba(193,18,31,0.6), rgba(193,18,31,0.1))",
                  }}
                  initial={{ scaleX: 0, originX: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6 + i * 0.25, duration: 0.6, ease: "easeOut" }}
                />
              )}

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.18, duration: 0.65, ease: "easeOut" }}
                className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-6 h-full overflow-hidden hover:border-[#C1121F]/25 hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Card glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(193,18,31,0.12) 0%, transparent 70%)",
                  }}
                />

                {/* Step number */}
                <motion.p
                  className="text-5xl font-bold tabular-nums mb-5 leading-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(193,18,31,0.6) 0%, rgba(193,18,31,0.15) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.18, duration: 0.5 }}
                >
                  {step.step}
                </motion.p>

                <h3 className="font-bold text-white mb-2.5 text-[15px]">{step.title}</h3>
                <p className="text-sm text-white/35 leading-relaxed">{step.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Flowing line at bottom — pulse repeats */}
        <motion.div
          className="mt-12 h-px mx-auto max-w-2xl"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(193,18,31,0.5) 30%, rgba(255,255,255,0.15) 50%, rgba(193,18,31,0.5) 70%, transparent)",
          }}
          animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
