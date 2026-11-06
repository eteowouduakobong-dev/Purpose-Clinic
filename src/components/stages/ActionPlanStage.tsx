"use client";

import React, { useState } from "react";
import { usePurpose } from "@/context/PurposeContext";
import { MilestoneItem } from "@/types/purpose";
import confetti from "canvas-confetti";
import {
  MapPin,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  Trash2,
  ArrowLeft,
  Sparkles,
  Calendar,
  Flame,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function ActionPlanStage() {
  const {
    state,
    milestones,
    addMilestone,
    toggleMilestoneStatus,
    deleteMilestone,
    completeStage,
    setStage,
  } = {
    ...usePurpose(),
    milestones: usePurpose().state.milestones,
  };

  const [newTitle, setNewTitle] = useState("");
  const [newTimeframe, setNewTimeframe] = useState<MilestoneItem["timeframe"]>("30_DAYS");
  const [newReason, setNewReason] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addMilestone({
      title: newTitle.trim(),
      timeframe: newTimeframe,
      status: "PENDING",
      alignmentReason: newReason.trim(),
    });
    setNewTitle("");
    setNewReason("");
  };

  const celebrateAll = () => {
    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
      });
    } catch {
      // fallback
    }
    completeStage(6);
  };

  const timeframes: { key: MilestoneItem["timeframe"]; label: string; desc: string; icon: React.ElementType }[] = [
    { key: "30_DAYS", label: "30-Day Ignition", desc: "Low-friction quick wins to break inertia", icon: Flame },
    { key: "90_DAYS", label: "90-Day Momentum", desc: "Solid habit formation & real-world output", icon: Clock },
    { key: "1_YEAR", label: "1-Year North Star", desc: "Harmonizing life, career & calling", icon: Calendar },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Box */}
      <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <MapPin className="w-3.5 h-3.5" /> Stage 6: Action Blueprint & Habit Anchors
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
          Translate clarity into tangible everyday movement
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          Purpose is not a destination you arrive at once and stop; it is a direction you walk every single day.
          Break down your manifesto into 30-day, 90-day, and 1-year tangible commitments.
        </p>
      </div>

      {/* Add Milestone Form */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
        <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg flex items-center gap-2">
          <Plus className="w-5 h-5 text-teal-600" />
          <span>Add a New Purpose Milestone</span>
        </h3>

        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Milestone Action:
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Schedule 3 coffee chats with people in my dream industry..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Timeframe:
              </label>
              <select
                value={newTimeframe}
                onChange={(e) => setNewTimeframe(e.target.value as MilestoneItem["timeframe"])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <option value="30_DAYS">30 Days (Immediate Quick Win)</option>
                <option value="90_DAYS">90 Days (Momentum & Habit)</option>
                <option value="1_YEAR">1 Year (Major Life Pivot)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Why this aligns with my Purpose Manifesto:
            </label>
            <input
              type="text"
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              placeholder="e.g. Tests whether my superpower of coaching resonates with real people..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm cursor-pointer transition-all shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Commit to Milestone</span>
          </button>
        </form>
      </div>

      {/* Grouped Milestones by Timeframe */}
      <div className="space-y-6">
        {timeframes.map(({ key, label, desc, icon: Icon }) => {
          const items = milestones.filter((m) => m.timeframe === key);

          return (
            <div
              key={key}
              className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-teal-600 dark:text-teal-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                      {label}
                    </h4>
                    <p className="text-xs text-stone-500">{desc}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {items.filter((i) => i.status === "COMPLETED").length}/{items.length} Done
                </span>
              </div>

              {items.length === 0 ? (
                <p className="text-xs text-stone-400 py-3 text-center italic">
                  No milestones added for this timeframe yet.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {items.map((m) => {
                    const isDone = m.status === "COMPLETED";
                    const isWorking = m.status === "IN_PROGRESS";

                    return (
                      <div
                        key={m.id}
                        className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          isDone
                            ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
                            : isWorking
                            ? "bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50"
                            : "bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleMilestoneStatus(m.id)}
                            className="mt-0.5 text-stone-400 hover:text-emerald-600 cursor-pointer"
                            title="Click to toggle status"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : isWorking ? (
                              <Clock className="w-5 h-5 text-amber-500" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </button>

                          <div className="space-y-1">
                            <span
                              className={`text-sm font-semibold block ${
                                isDone
                                  ? "line-through text-stone-400 dark:text-stone-500"
                                  : "text-stone-900 dark:text-stone-100"
                              }`}
                            >
                              {m.title}
                            </span>
                            {m.alignmentReason && (
                              <p className="text-xs text-stone-500 dark:text-stone-400">
                                <strong>Why:</strong> {m.alignmentReason}
                              </p>
                            )}
                            <span
                              className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                                isDone
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                  : isWorking
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                  : "bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-300"
                              }`}
                            >
                              {m.status.replace("_", " ")}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteMilestone(m.id)}
                          className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                          title="Delete milestone"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Clinic Completion Box */}
      <div className="p-8 rounded-3xl bg-linear-to-br from-emerald-800 via-teal-800 to-emerald-900 text-white space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/10">
            <ShieldCheck className="w-7 h-7 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Congratulations! Your Purpose Clinic Blueprint is Complete.
            </h3>
            <p className="text-emerald-100/90 text-sm">
              You now have a structured compass, clear core values, an identified Ikigai, and an actionable roadmap.
            </p>
          </div>
        </div>

        <p className="text-sm text-emerald-100/80 leading-relaxed">
          The next step in your transformation is daily alignment. Use the built-in <strong>Daily Purpose Tracker</strong> every morning and evening to check in with your clarity score and live your manifesto.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={celebrateAll}
            className="px-6 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Complete Journey & Celebrate</span>
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setStage(5)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Manifesto</span>
        </button>

        <button
          onClick={celebrateAll}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-lg shadow-emerald-700/20 transition-all cursor-pointer text-sm sm:text-base"
        >
          <span>Finalize & Lock In My Purpose</span>
          <CheckCircle2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
