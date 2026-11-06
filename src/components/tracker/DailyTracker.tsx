"use client";

import React, { useState } from "react";
import { usePurpose } from "@/context/PurposeContext";
import { DailyCheckInData } from "@/types/purpose";
import {
  Sun,
  Moon,
  Calendar,
  Sparkles,
  TrendingUp,
  Heart,
  Smile,
  Compass,
  CheckCircle2,
} from "lucide-react";

export function DailyTracker() {
  const { state, addDailyCheckIn } = usePurpose();

  const [date, setDate] = useState("2026-11-06");
  const [morningIntention, setMorningIntention] = useState("");
  const [eveningReflection, setEveningReflection] = useState("");
  const [alignmentScore, setAlignmentScore] = useState(7);
  const [energyLevel, setEnergyLevel] = useState(7);
  const [clarityScore, setClarityScore] = useState(state.currentClarity || 6);
  const [gratitude, setGratitude] = useState("");
  const [mood, setMood] = useState<DailyCheckInData["mood"]>("grounded");
  const [submittedMessage, setSubmittedMessage] = useState(false);

  React.useEffect(() => {
    try {
      const todayStr = new Date().toISOString().split("T")[0];
      setDate(todayStr);
    } catch {
      // keep fallback
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDailyCheckIn({
      date,
      morningIntention,
      eveningReflection,
      alignmentScore,
      energyLevel,
      clarityScore,
      gratitude,
      mood,
    });
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 3000);
  };

  const moods: { key: DailyCheckInData["mood"]; label: string; emoji: string }[] = [
    { key: "peaceful", label: "Peaceful", emoji: "🌿" },
    { key: "inspired", label: "Inspired", emoji: "✨" },
    { key: "grounded", label: "Grounded", emoji: "🏔️" },
    { key: "uncertain", label: "Uncertain", emoji: "🌫️" },
    { key: "restless", label: "Restless", emoji: "🌊" },
  ];

  const checkIns = state.dailyCheckIns;
  const averageAlignment =
    checkIns.length > 0
      ? (
          checkIns.reduce((acc, c) => acc + c.alignmentScore, 0) / checkIns.length
        ).toFixed(1)
      : "7.0";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <TrendingUp className="w-3.5 h-3.5" /> Daily Purpose & Life Tracker
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2 tracking-tight">
          Live in alignment, one day at a time
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Tracking your purpose isn&apos;t about rigid perfection. It is a gentle daily mirror to notice
          whether you lived according to your values, protect your energy, and nurture clarity.
        </p>

        {/* Top Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <span className="text-xs text-stone-500 block uppercase font-medium">
              Average Alignment
            </span>
            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {averageAlignment} <span className="text-xs text-stone-400">/ 10</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <span className="text-xs text-stone-500 block uppercase font-medium">
              Total Check-Ins
            </span>
            <span className="text-2xl font-bold text-teal-700 dark:text-teal-400">
              {checkIns.length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <span className="text-xs text-stone-500 block uppercase font-medium">
              Current Clarity
            </span>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {state.currentClarity} <span className="text-xs text-stone-400">/ 10</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <span className="text-xs text-stone-500 block uppercase font-medium">
              Manifesto Status
            </span>
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-1">
              {state.manifesto.headline ? "Active Anchor" : "In Progress"}
            </span>
          </div>
        </div>
      </div>

      {/* Daily Check-in Form */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
              Daily Alignment Check-in
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500">Date:</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Morning & Evening Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-sm">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Morning Intention</span>
              </div>
              <p className="text-xs text-stone-500">
                What is 1 conscious thing you will do today to honor your purpose or core values?
              </p>
              <textarea
                rows={3}
                value={morningIntention}
                onChange={(e) => setMorningIntention(e.target.value)}
                placeholder="e.g. Protect my 9am-11am deep creative flow, listen patiently to my partner..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-900/40 space-y-3">
              <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-semibold text-sm">
                <Moon className="w-4 h-4 text-teal-600" />
                <span>Evening Reflection</span>
              </div>
              <p className="text-xs text-stone-500">
                Where did you feel most aligned today? Where did energy slip away?
              </p>
              <textarea
                rows={3}
                value={eveningReflection}
                onChange={(e) => setEveningReflection(e.target.value)}
                placeholder="e.g. Felt grounded while writing. Slipped into unnecessary anxiety during lunch..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Metric Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Purpose Alignment:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{alignmentScore}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={alignmentScore}
                onChange={(e) => setAlignmentScore(parseInt(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Energy Level:</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{energyLevel}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Life Clarity:</span>
                <span className="text-teal-600 dark:text-teal-400 font-bold">{clarityScore}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={clarityScore}
                onChange={(e) => setClarityScore(parseInt(e.target.value))}
                className="w-full accent-teal-600 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Mood & Gratitude */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Primary Mood of the Day:
              </label>
              <div className="flex flex-wrap gap-2">
                {moods.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setMood(m.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                      mood === m.key
                        ? "bg-emerald-700 text-white shadow-xs scale-105"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                    }`}
                  >
                    <span>{m.emoji}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                One Small Gratitude:
              </label>
              <input
                type="text"
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                placeholder="e.g. Fresh cold morning air, a kind word from a stranger..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {submittedMessage ? (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Check-in saved successfully!
              </span>
            ) : (
              <div />
            )}
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              Save Today&apos;s Check-In
            </button>
          </div>
        </form>
      </div>

      {/* Historical Check-in Log */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
        <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg">
          Your Purpose Journey Log ({checkIns.length} entries)
        </h3>

        {checkIns.length === 0 ? (
          <p className="text-xs text-stone-400 py-6 text-center italic">
            No daily check-ins recorded yet. Record your first one above!
          </p>
        ) : (
          <div className="space-y-3">
            {checkIns.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/60 dark:border-stone-700/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {item.date}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 capitalize">
                      {item.mood}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                      Alignment: {item.alignmentScore}/10
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">
                      Energy: {item.energyLevel}/10
                    </span>
                  </div>
                </div>

                {item.morningIntention && (
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    <strong className="text-amber-700 dark:text-amber-400">Intention:</strong>{" "}
                    {item.morningIntention}
                  </p>
                )}

                {item.eveningReflection && (
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    <strong className="text-teal-700 dark:text-teal-400">Reflection:</strong>{" "}
                    {item.eveningReflection}
                  </p>
                )}

                {item.gratitude && (
                  <p className="text-[11px] text-stone-500 italic">
                    🌸 Gratitude: {item.gratitude}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
