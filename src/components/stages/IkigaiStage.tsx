"use client";

import React, { useState } from "react";
import { usePurpose } from "@/context/PurposeContext";
import {
  Crosshair,
  Heart,
  Zap,
  Globe,
  Coins,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Plus,
  X,
  Compass,
} from "lucide-react";

export function IkigaiStage() {
  const { state, updateIkigai, completeStage, setStage } = usePurpose();
  const ikigai = state.ikigai;

  const [inputLove, setInputLove] = useState("");
  const [inputGoodAt, setInputGoodAt] = useState("");
  const [inputNeeds, setInputNeeds] = useState("");
  const [inputPaid, setInputPaid] = useState("");

  const addItem = (
    field: "whatYouLove" | "whatYouAreGoodAt" | "whatWorldNeeds" | "whatYouCanGetPaidFor",
    text: string,
    resetFn: (v: string) => void
  ) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const currentList = ikigai[field];
    if (!currentList.includes(trimmed)) {
      updateIkigai({ [field]: [...currentList, trimmed] });
    }
    resetFn("");
  };

  const removeItem = (
    field: "whatYouLove" | "whatYouAreGoodAt" | "whatWorldNeeds" | "whatYouCanGetPaidFor",
    text: string
  ) => {
    updateIkigai({ [field]: ikigai[field].filter((item) => item !== text) });
  };

  // Helper to prefill from earlier stages if empty
  const importFromEarlierStages = () => {
    const loveItems = [...new Set([...ikigai.whatYouLove, ...state.superpowers.flowActivities])];
    const goodAtItems = [...new Set([...ikigai.whatYouAreGoodAt, ...state.superpowers.naturalTalents])];
    updateIkigai({
      whatYouLove: loveItems,
      whatYouAreGoodAt: goodAtItems,
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Box */}
      <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Crosshair className="w-3.5 h-3.5" /> Stage 4: The Ikigai Matrix
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
          Where your passion, vocation, and the world meet
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          <em>Ikigai</em> (生きがい) is the timeless Japanese concept meaning &quot;a reason for being&quot;.
          When people are confused, it is usually because one of the 4 circles is missing—such as having
          passion that doesn&apos;t pay, or a well-paying job that leaves the soul empty.
        </p>

        {(state.superpowers.flowActivities.length > 0 || state.superpowers.naturalTalents.length > 0) && (
          <button
            onClick={importFromEarlierStages}
            className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-semibold hover:bg-cyan-100 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Import flow & superpowers from previous stages
          </button>
        )}
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Circle 1: What you LOVE */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                1. What You Love
              </h3>
              <p className="text-xs text-stone-500">
                Topics, causes, and activities that energize and fascinate you
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {ikigai.whatYouLove.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-medium"
              >
                {item}
                <button
                  onClick={() => removeItem("whatYouLove", item)}
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
              value={inputLove}
              onChange={(e) => setInputLove(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem("whatYouLove", inputLove, setInputLove);
                }
              }}
              placeholder="e.g. Guiding people, storytelling, nature..."
              className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={() => addItem("whatYouLove", inputLove, setInputLove)}
              className="px-3 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold cursor-pointer hover:bg-rose-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Circle 2: What you are GOOD AT */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                2. What You Are Good At
              </h3>
              <p className="text-xs text-stone-500">
                Skills, crafts, emotional intelligence, and abilities
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {ikigai.whatYouAreGoodAt.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-medium"
              >
                {item}
                <button
                  onClick={() => removeItem("whatYouAreGoodAt", item)}
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
              value={inputGoodAt}
              onChange={(e) => setInputGoodAt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem("whatYouAreGoodAt", inputGoodAt, setInputGoodAt);
                }
              }}
              placeholder="e.g. Active listening, writing, programming..."
              className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={() => addItem("whatYouAreGoodAt", inputGoodAt, setInputGoodAt)}
              className="px-3 py-2 bg-amber-600 text-white rounded-xl text-xs font-semibold cursor-pointer hover:bg-amber-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Circle 3: What the WORLD NEEDS */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                3. What the World Needs
              </h3>
              <p className="text-xs text-stone-500">
                Real problems, pains, and aspirations in other people
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {ikigai.whatWorldNeeds.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-medium"
              >
                {item}
                <button
                  onClick={() => removeItem("whatWorldNeeds", item)}
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
              value={inputNeeds}
              onChange={(e) => setInputNeeds(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem("whatWorldNeeds", inputNeeds, setInputNeeds);
                }
              }}
              placeholder="e.g. Emotional support, educational clarity..."
              className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => addItem("whatWorldNeeds", inputNeeds, setInputNeeds)}
              className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold cursor-pointer hover:bg-emerald-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Circle 4: What you can get PAID FOR */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                4. What You Can Get Paid For
              </h3>
              <p className="text-xs text-stone-500">
                Economically viable services, products, or professions
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {ikigai.whatYouCanGetPaidFor.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 text-xs font-medium"
              >
                {item}
                <button
                  onClick={() => removeItem("whatYouCanGetPaidFor", item)}
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
              value={inputPaid}
              onChange={(e) => setInputPaid(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem("whatYouCanGetPaidFor", inputPaid, setInputPaid);
                }
              }}
              placeholder="e.g. Coaching, technical writing, consulting..."
              className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={() => addItem("whatYouCanGetPaidFor", inputPaid, setInputPaid)}
              className="px-3 py-2 bg-cyan-700 text-white rounded-xl text-xs font-semibold cursor-pointer hover:bg-cyan-800"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* The Ikigai Overlaps & Sweet Spot Synthesis */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-emerald-900 via-teal-900 to-stone-900 text-white space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-lg sm:text-xl">
            The Synthesis: Your Ikigai Sweet Spot
          </h3>
        </div>

        <p className="text-emerald-100/90 text-sm leading-relaxed max-w-3xl">
          Look across the 4 quadrants above. What common thread unites what you love, what you excel at,
          what human beings need, and what sustains you financially?
        </p>

        <div>
          <label className="block text-xs uppercase font-semibold text-emerald-200 tracking-wider mb-2">
            Synthesize Your Ikigai Statement
          </label>
          <textarea
            rows={3}
            value={ikigai.ikigaiSynthesis}
            onChange={(e) => updateIkigai({ ikigaiSynthesis: e.target.value })}
            placeholder="e.g., At the intersection of deep empathy, structured design, and life philosophy, I create tools and spaces that guide people from chronic confusion to grounded purpose."
            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm leading-relaxed"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setStage(3)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Superpowers</span>
        </button>

        <button
          onClick={() => completeStage(4)}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-lg shadow-emerald-700/20 transition-all cursor-pointer text-sm sm:text-base"
        >
          <span>Lock In Ikigai & Draft Purpose Manifesto</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
