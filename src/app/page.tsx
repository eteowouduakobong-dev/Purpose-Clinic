"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePurpose } from "@/context/PurposeContext";
import { STAGES } from "@/components/StageProgressBar";
import {
  Compass,
  Sparkles,
  ArrowRight,
  Heart,
  TrendingUp,
  Award,
  CheckCircle2,
  Shield,
  LifeBuoy,
  BookOpen,
  Sun,
  Users,
} from "lucide-react";

export default function HomePage() {
  const { state, setInitialClarity, loadSampleProfile } = usePurpose();
  const [pulseScore, setPulseScore] = useState(state.initialClarity || 3);
  const [pulseSaved, setPulseSaved] = useState(false);

  const handlePulseSave = () => {
    setInitialClarity(pulseScore);
    setPulseSaved(true);
    setTimeout(() => setPulseSaved(false), 2500);
  };

  const pulseDescriptions: Record<number, { title: string; desc: string }> = {
    1: { title: "Completely Foggy & Exhausted", desc: "You feel like you are wandering aimlessly or trapped in an unfulfilling cycle." },
    2: { title: "Heavy Confusion & Restlessness", desc: "You know your current situation isn't right, but you have no clue what direction to turn." },
    3: { title: "Occasional Sparks, Constant Drift", desc: "You have flashes of curiosity, but daily noise and fear keep you from anchoring them." },
    4: { title: "Seeking a Higher Standard", desc: "Your life is functioning on the surface, but a deep voice whispers that you were meant for more." },
    5: { title: "At the Crossroads", desc: "You have several paths before you and need a structured compass to decide." },
    6: { title: "Partial Clarity, Lacking Blueprint", desc: "You know what you love, but lack the bridge to turn it into sustainable everyday living." },
    7: { title: "Aligned in Sparks", desc: "You have a solid idea of your gifts, but friction in certain areas is slowing down your momentum." },
    8: { title: "Strong Purpose, Refining Habits", desc: "Your direction is clear; you are refining consistency and balance." },
    9: { title: "Deeply Grounded & Purposeful", desc: "You wake up with intention and your daily actions serve your true calling." },
    10: { title: "Total Luminous Harmony", desc: "Living in complete harmony with your authentic gifts, values, and community impact." },
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col selection:bg-emerald-200">
      {/* Hero Sanctuary */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-200/40 dark:bg-emerald-950/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-100/40 dark:bg-amber-950/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>A Safe Harbor for the Lost Soul</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 max-w-4xl mx-auto leading-[1.15]">
            Confused about your life&apos;s direction?{" "}
            <span className="bg-linear-to-r from-emerald-700 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
              You are in the right place.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
            Purpose is not a single lightning bolt you wait for. It is an excavation.
            Step inside our gentle, step-by-step clinic to unpack your life, excavate your core values,
            and build your personal Purpose Manifesto.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/journey"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base shadow-xl shadow-emerald-700/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
            >
              <Compass className="w-5 h-5" />
              <span>Enter The 6-Stage Clinic</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={() => {
                loadSampleProfile();
                window.location.href = "/journey";
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Explore Transformed Demo Profile</span>
            </button>
          </div>
        </div>
      </section>

      {/* Instant Clarity Pulse Check Section */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 -mt-8 sm:-mt-12 z-10">
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200/90 dark:border-stone-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                Diagnostic Pulse Check
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                How clear does your life feel right now?
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                {pulseScore}
              </span>
              <span className="text-stone-400 text-sm">/ 10</span>
            </div>
          </div>

          {/* Interactive slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={pulseScore}
              onChange={(e) => setPulseScore(parseInt(e.target.value))}
              className="w-full accent-emerald-600 h-2.5 bg-stone-100 dark:bg-stone-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-stone-400 font-medium">
              <span>1 - Completely Lost</span>
              <span>5 - Uncertain Crossroad</span>
              <span>10 - Crystal Clear</span>
            </div>
          </div>

          {/* Dynamic feedback based on score */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                {pulseDescriptions[pulseScore]?.title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                {pulseDescriptions[pulseScore]?.desc}
              </p>
            </div>
            <button
              onClick={handlePulseSave}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shrink-0 cursor-pointer transition-all shadow-xs"
            >
              {pulseSaved ? "Saved Baseline ✓" : "Record As My Baseline"}
            </button>
          </div>
        </div>
      </section>

      {/* The 6-Stage Roadmap Section */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-20 sm:py-28 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">
            The Step-by-Step Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            How Purpose Clinic Heals Confusion
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            We don&apos;t give you generic advice. We guide you through 6 psychological and philosophical stages
            designed to systematically dissolve uncertainty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STAGES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.number}
                className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-400">
                      0{s.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <Link
                  href="/journey"
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  <span>Explore Stage {s.number}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why People Feel Lost (The 3 Core Leaks) */}
      <section className="bg-stone-100/70 dark:bg-stone-900/60 py-16 sm:py-24 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              Why do so many thoughtful people feel lost?
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Confusion isn&apos;t a personal flaw. It happens when one of these three invisible fractures occurs:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
              <span className="text-2xl">🎭</span>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                1. Borrowed Scripts
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                You followed the rules of school, parents, and culture. You got good grades or a stable job, but you realize you are starring in someone else&apos;s movie.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
              <span className="text-2xl">⏳</span>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                2. Energy Leakage
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                You are drained by chronic digital distractions and superficial obligations, leaving zero cognitive space for your real gifts to breathe.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
              <span className="text-2xl">🧭</span>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                3. The Missing Compass
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                You never formally excavated your non-negotiable core values or Ikigai, so every decision feels like an exhausting gamble.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Everyday Tracker Highlight */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-20 sm:py-28">
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-emerald-900 via-teal-900 to-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Daily Purpose Alignment Tracker</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
              Track your life every day, not just on New Year&apos;s Eve.
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Purpose Clinic includes a morning intention &amp; evening reflection tracker.
              Monitor your alignment score, log gratitude, and watch your clarity grow week over week.
            </p>
            <div className="pt-2">
              <Link
                href="/tracker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-emerald-950 font-bold text-sm hover:bg-emerald-50 transition-all cursor-pointer shadow-md"
              >
                <span>Open Daily Tracker</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full max-w-xs p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-3 text-xs">
            <div className="flex justify-between items-center text-amber-300 font-semibold border-b border-white/10 pb-2">
              <span>Today&apos;s Alignment</span>
              <span>8.5 / 10</span>
            </div>
            <div className="space-y-1 text-emerald-100">
              <span className="block font-medium">Morning Intention:</span>
              <p className="italic text-[11px] text-white/80">
                &quot;To listen deeply and protect my 2-hour morning creative flow.&quot;
              </p>
            </div>
            <div className="space-y-1 text-emerald-100">
              <span className="block font-medium">Evening Reflection:</span>
              <p className="italic text-[11px] text-white/80">
                &quot;Felt grounded. Overcame doubt by remembering my core value of Courage.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="text-center py-16 px-4 bg-stone-100/50 dark:bg-stone-900/30 border-t border-stone-200 dark:border-stone-800 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Your life is waiting to be uncovered.
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-base max-w-md mx-auto">
          Take the first step today. It only takes 15 minutes to gain a lifetime of clarity.
        </p>
        <div>
          <Link
            href="/journey"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base shadow-xl shadow-emerald-700/25 transition-all cursor-pointer"
          >
            <span>Begin Stage 1: The Life Audit</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
