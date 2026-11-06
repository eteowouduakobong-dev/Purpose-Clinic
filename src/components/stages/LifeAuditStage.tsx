"use client";

import React from "react";
import { usePurpose } from "@/context/PurposeContext";
import {
  Compass,
  Briefcase,
  Activity,
  Users,
  Brain,
  Palette,
  Coins,
  Home,
  Flame,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface DimensionConfig {
  key: keyof typeof dimensionsMap;
  title: string;
  desc: string;
  icon: React.ElementType;
}

const dimensionsMap = {
  careerScore: {
    title: "Career & Craft",
    desc: "Sense of growth, engagement, and meaningful work",
    icon: Briefcase,
  },
  healthScore: {
    title: "Health & Vitality",
    desc: "Sleep, nutrition, energy levels, physical well-being",
    icon: Activity,
  },
  relationshipScore: {
    title: "Relationships & Community",
    desc: "Depth of connection with family, friends, and partner",
    icon: Users,
  },
  growthScore: {
    title: "Personal Growth & Learning",
    desc: "Intellectual stimulation, books, acquiring new skills",
    icon: Brain,
  },
  creativityScore: {
    title: "Creativity & Play",
    desc: "Unstructured hobbies, spontaneous joyful expression",
    icon: Palette,
  },
  financeScore: {
    title: "Financial Peace",
    desc: "Stability, clear budgeting, freedom from chronic money stress",
    icon: Coins,
  },
  environmentScore: {
    title: "Physical Environment",
    desc: "Home peace, organized space, natural surroundings",
    icon: Home,
  },
  spiritualScore: {
    title: "Spiritual & Inner Peace",
    desc: "Quietness of mind, connection to transcendence or purpose",
    icon: Flame,
  },
};

export function LifeAuditStage() {
  const { state, updateAudit, completeStage } = usePurpose();
  const audit = state.audit;

  const handleScoreChange = (key: keyof typeof dimensionsMap, val: number) => {
    updateAudit({ [key]: val });
  };

  const scores = Object.keys(dimensionsMap).map(
    (k) => audit[k as keyof typeof dimensionsMap] as number
  );
  const averageScore = (
    scores.reduce((a, b) => a + b, 0) / scores.length
  ).toFixed(1);

  // Identify lowest score dimension
  let lowestDim = "";
  let lowestVal = 11;
  (Object.keys(dimensionsMap) as (keyof typeof dimensionsMap)[]).forEach((k) => {
    const val = audit[k];
    if (val < lowestVal) {
      lowestVal = val;
      lowestDim = dimensionsMap[k].title;
    }
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Box */}
      <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5" /> Stage 1: The Life Audit
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
          Where does your life stand today?
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          When people feel lost or confused about their life purpose, it is rarely because they lack potential.
          Usually, it is because energy is leaking in unnoticed areas, clouding their vision.
          Be completely honest with yourself—there are no wrong answers here.
        </p>

        {/* Live Balance Summary Pill */}
        <div className="mt-6 flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
          <div>
            <div className="text-xs uppercase font-medium text-stone-500">
              Average Life Satisfaction
            </div>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {averageScore} <span className="text-sm font-normal text-stone-500">/ 10</span>
            </div>
          </div>
          <div className="h-8 w-px bg-stone-200 dark:bg-stone-700 hidden sm:block" />
          <div>
            <div className="text-xs uppercase font-medium text-stone-500">
              Primary Energy Drainer
            </div>
            <div className="text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {lowestDim} ({lowestVal}/10)
            </div>
          </div>
        </div>
      </div>

      {/* 8 Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(dimensionsMap) as (keyof typeof dimensionsMap)[]).map((key) => {
          const config = dimensionsMap[key];
          const val = audit[key];
          const Icon = config.icon;

          // color code
          const colorClass =
            val >= 8
              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800"
              : val >= 5
              ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800"
              : "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800";

          return (
            <div
              key={key}
              className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all shadow-xs"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                      {config.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {config.desc}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold px-2.5 py-1 rounded-lg border ${colorClass}`}
                >
                  {val}/10
                </span>
              </div>

              {/* Slider */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={val}
                  onChange={(e) => handleScoreChange(key, parseInt(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-stone-100 dark:bg-stone-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>1 - Depleted</span>
                  <span>5 - Surviving</span>
                  <span>10 - Thriving</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Qualitative Inquiries (Friction & Priority) */}
      <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6">
        <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-lg">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Deepen Your Diagnosis</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-1.5">
              1. What is the single biggest source of friction or confusion right now?
            </label>
            <textarea
              rows={2}
              value={audit.topFriction}
              onChange={(e) => updateAudit({ topFriction: e.target.value })}
              placeholder="e.g., I dread Monday mornings because my job doesn't align with who I really am, but I don't know what else to do..."
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-1.5">
              2. What daily energy leaks rob you of mental clarity?
            </label>
            <textarea
              rows={2}
              value={audit.energyLeaks}
              onChange={(e) => updateAudit({ energyLeaks: e.target.value })}
              placeholder="e.g., Doomscrolling late at night, saying yes when I mean no, living to impress people I don't even like..."
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-1.5">
              3. If you could restore peace to just one domain first, which one matters most?
            </label>
            <input
              type="text"
              value={audit.topPriority}
              onChange={(e) => updateAudit({ topPriority: e.target.value })}
              placeholder="e.g., Finding meaningful creative work that also pays my bills"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Advance Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => completeStage(1)}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/30 transition-all cursor-pointer text-sm sm:text-base"
        >
          <span>Complete Audit & Advance to Core Values</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
