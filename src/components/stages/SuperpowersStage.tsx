"use client";

import React, { useState } from "react";
import { usePurpose } from "@/context/PurposeContext";
import {
  Sparkles,
  Zap,
  Clock,
  Compass,
  BatteryCharging,
  BatteryWarning,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Award,
} from "lucide-react";

const SUGGESTIONS = {
  naturalTalents: [
    "Synthesizing complex ideas simply",
    "Empathetic listening and calming others",
    "Finding order in chaotic data",
    "Telling captivating stories",
    "Spotting aesthetics, patterns and beauty",
    "Negotiating and finding common ground",
    "Building systems and automating workflows",
    "Encouraging people who have lost hope",
  ],
  flowActivities: [
    "Writing essays or journals",
    "Designing or sketching visual ideas",
    "Deep coding or building software",
    "Cooking a complex meal from scratch",
    "Mentoring someone one-on-one",
    "Researching rabbit holes of history/science",
    "Fixing broken objects with hands",
    "Playing musical instruments",
  ],
  childhoodPassions: [
    "Building Lego universes / forts",
    "Creating secret clubs and handbooks",
    "Rescuing stray animals",
    "Drawing comic strips and stories",
    "Exploring forests and nature",
    "Performing shows for family",
    "Taking apart gadgets to see inside",
  ],
  energyGivers: [
    "Solitary morning coffee with a notebook",
    "Deep 2-hour conversation with a trusted friend",
    "Creating something tangible from nothing",
    "Walking in nature without headphones",
    "Helping a friend solve an emotional knot",
  ],
  energyDrainers: [
    "Office politics and cynical gossip",
    "Mindless doomscrolling",
    "Pointless meetings without clear agendas",
    "Pretending to agree to avoid conflict",
    "Cluttered and noisy environments",
  ],
};

export function SuperpowersStage() {
  const { state, updateSuperpowers, completeStage, setStage } = usePurpose();
  const superpowers = state.superpowers;

  const [inputState, setInputState] = useState({
    naturalTalents: "",
    flowActivities: "",
    childhoodPassions: "",
    energyGivers: "",
    energyDrainers: "",
  });

  const addTag = (field: keyof typeof inputState, item: string) => {
    const trimmed = item.trim();
    if (!trimmed) return;
    const currentList = superpowers[field] as string[];
    if (!currentList.includes(trimmed)) {
      updateSuperpowers({ [field]: [...currentList, trimmed] });
    }
    setInputState((prev) => ({ ...prev, [field]: "" }));
  };

  const removeTag = (field: keyof typeof inputState, item: string) => {
    const currentList = superpowers[field] as string[];
    updateSuperpowers({ [field]: currentList.filter((t) => t !== item) });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: keyof typeof inputState
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(field, inputState[field]);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Box */}
      <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Stage 3: Superpowers & Flow States
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
          What makes you come fully alive?
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          Your true calling is rarely something you have to force. It leaves breadcrumbs in your
          natural gifts, the activities where time dissolves, and the things you were fascinated
          by as a child before the world told you what was &quot;practical&quot;.
        </p>
      </div>

      {/* Grid of Discovery Quadrants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Natural Talents */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                Natural Gifts & Superpowers
              </h3>
              <p className="text-xs text-stone-500">
                What comes effortlessly to you that others find difficult?
              </p>
            </div>
          </div>

          {/* Tag cloud */}
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {superpowers.naturalTalents.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-medium"
              >
                {t}
                <button
                  onClick={() => removeTag("naturalTalents", t)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Input field */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputState.naturalTalents}
              onChange={(e) =>
                setInputState((p) => ({ ...p, naturalTalents: e.target.value }))
              }
              onKeyDown={(e) => handleKeyDown(e, "naturalTalents")}
              placeholder="Type your gift & press Enter..."
              className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={() => addTag("naturalTalents", inputState.naturalTalents)}
              className="px-3 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl text-xs font-semibold cursor-pointer hover:opacity-90"
            >
              Add
            </button>
          </div>

          {/* Quick Inspirations */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-stone-400 block mb-1.5">
              Click to quickly add inspiration:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.naturalTalents.slice(0, 4).map((sug) => (
                <button
                  key={sug}
                  onClick={() => addTag("naturalTalents", sug)}
                  className="text-[11px] px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 cursor-pointer"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Flow Activities */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                Flow State Activities
              </h3>
              <p className="text-xs text-stone-500">
                When do hours pass like minutes? What absorbs your focus?
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {superpowers.flowActivities.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-medium"
              >
                {t}
                <button
                  onClick={() => removeTag("flowActivities", t)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputState.flowActivities}
              onChange={(e) =>
                setInputState((p) => ({ ...p, flowActivities: e.target.value }))
              }
              onKeyDown={(e) => handleKeyDown(e, "flowActivities")}
              placeholder="e.g. Deep research, playing music..."
              className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={() => addTag("flowActivities", inputState.flowActivities)}
              className="px-3 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl text-xs font-semibold cursor-pointer hover:opacity-90"
            >
              Add
            </button>
          </div>

          <div className="pt-2">
            <span className="text-[11px] font-semibold text-stone-400 block mb-1.5">
              Click to quickly add inspiration:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.flowActivities.slice(0, 4).map((sug) => (
                <button
                  key={sug}
                  onClick={() => addTag("flowActivities", sug)}
                  className="text-[11px] px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-teal-100 dark:hover:bg-teal-950/60 cursor-pointer"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Childhood Curiosities */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                Childhood Curiosities (Ages 7–12)
              </h3>
              <p className="text-xs text-stone-500">
                What did you love before grades, salaries, or status existed?
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {superpowers.childhoodPassions.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-medium"
              >
                {t}
                <button
                  onClick={() => removeTag("childhoodPassions", t)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputState.childhoodPassions}
              onChange={(e) =>
                setInputState((p) => ({ ...p, childhoodPassions: e.target.value }))
              }
              onKeyDown={(e) => handleKeyDown(e, "childhoodPassions")}
              placeholder="e.g. Drawing maps, stargazing..."
              className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => addTag("childhoodPassions", inputState.childhoodPassions)}
              className="px-3 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl text-xs font-semibold cursor-pointer hover:opacity-90"
            >
              Add
            </button>
          </div>
        </div>

        {/* 4. Energy Givers & Drainers */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                Energy Givers vs. Drainers
              </h3>
              <p className="text-xs text-stone-500">
                What expands your spirit vs. what hollows you out?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1 flex items-center gap-1">
                <BatteryCharging className="w-3 h-3" /> Givers ({superpowers.energyGivers.length})
              </span>
              <div className="space-y-1">
                {superpowers.energyGivers.slice(0, 3).map((g) => (
                  <div key={g} className="truncate text-stone-600 dark:text-stone-300">
                    • {g}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="font-semibold text-rose-600 dark:text-rose-400 block mb-1 flex items-center gap-1">
                <BatteryWarning className="w-3 h-3" /> Drainers ({superpowers.energyDrainers.length})
              </span>
              <div className="space-y-1">
                {superpowers.energyDrainers.slice(0, 3).map((d) => (
                  <div key={d} className="truncate text-stone-600 dark:text-stone-300">
                    • {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputState.energyGivers}
              onChange={(e) =>
                setInputState((p) => ({ ...p, energyGivers: e.target.value }))
              }
              onKeyDown={(e) => handleKeyDown(e, "energyGivers")}
              placeholder="Add an Energy Giver..."
              className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => addTag("energyGivers", inputState.energyGivers)}
              className="px-3 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer hover:bg-emerald-800"
            >
              + Giver
            </button>
          </div>
        </div>
      </div>

      {/* Proudest Life Moment Anchor */}
      <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
        <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-base sm:text-lg">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Your Deepest Peak Moment</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Recall a moment in your past when you laid your head on your pillow and thought:
          <em> &quot;Today, I did something that truly mattered.&quot;</em> What were you doing?
        </p>
        <textarea
          rows={3}
          value={superpowers.proudestMoments}
          onChange={(e) => updateSuperpowers({ proudestMoments: e.target.value })}
          placeholder="e.g. When I spent 3 weeks helping my sibling prepare for their presentation and watched them shine with confidence..."
          className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setStage(2)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Core Values</span>
        </button>

        <button
          onClick={() => completeStage(3)}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-lg shadow-emerald-700/20 transition-all cursor-pointer text-sm sm:text-base"
        >
          <span>Complete Superpowers & Enter Ikigai</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
