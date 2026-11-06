"use client";

import React from "react";
import { usePurpose } from "@/context/PurposeContext";
import { Check, Sparkles, Compass, Heart, Crosshair, Award, MapPin } from "lucide-react";

export const STAGES = [
  {
    number: 1,
    title: "Life Audit",
    short: "Audit",
    desc: "Unpack current life satisfaction & identify friction leaks",
    icon: Compass,
  },
  {
    number: 2,
    title: "Core Values",
    short: "Values",
    desc: "Excavate your top 5 non-negotiable guiding stars",
    icon: Heart,
  },
  {
    number: 3,
    title: "Superpowers & Flow",
    short: "Superpowers",
    desc: "Discover your natural gifts & effortless flow states",
    icon: Sparkles,
  },
  {
    number: 4,
    title: "The Ikigai Matrix",
    short: "Ikigai",
    desc: "Find the sweet intersection of love, talent, need & reward",
    icon: Crosshair,
  },
  {
    number: 5,
    title: "Purpose Manifesto",
    short: "Manifesto",
    desc: "Synthesize your personalized Purpose Statement & Card",
    icon: Award,
  },
  {
    number: 6,
    title: "Action Blueprint",
    short: "Action",
    desc: "Anchor your calling into tangible 30-90-365 day milestones",
    icon: MapPin,
  },
];

export function StageProgressBar() {
  const { state, setStage } = usePurpose();
  const current = state.currentStage;
  const completed = state.stagesCompleted;

  const progressPercent = Math.round((completed.length / STAGES.length) * 100);

  return (
    <div className="w-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 sticky top-0 z-30 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
        {/* Top Header with Progress and Clarity */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Stage {current} of 6
            </span>
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300 hidden sm:inline">
              {STAGES[current - 1]?.title}: {STAGES[current - 1]?.desc}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-1.5">
              <span>Clarity:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                {state.currentClarity}/10
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Progress:</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden mb-3">
          <div
            className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-6 gap-1 sm:gap-2">
          {STAGES.map((s) => {
            const isCurrent = s.number === current;
            const isDone = completed.includes(s.number);
            const Icon = s.icon;

            return (
              <button
                key={s.number}
                onClick={() => setStage(s.number)}
                className={`flex flex-col sm:flex-row items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-2 rounded-xl text-left transition-all group ${
                  isCurrent
                    ? "bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-600/40 font-semibold shadow-xs"
                    : isDone
                    ? "bg-stone-50 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                    : "text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800/40"
                }`}
                title={s.desc}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs transition-colors ${
                    isCurrent
                      ? "bg-emerald-600 text-white shadow-xs"
                      : isDone
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300"
                  }`}
                >
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span>{s.number}</span>
                  )}
                </div>
                <div className="hidden md:block truncate">
                  <div className="text-xs truncate leading-tight font-medium">
                    {s.short}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
