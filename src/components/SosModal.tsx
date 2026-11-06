"use client";

import React, { useState } from "react";
import { X, Sparkles, Heart, Wind, ShieldAlert } from "lucide-react";

export function SosModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [breathingStep, setBreathingStep] = useState<"Inhale" | "Hold" | "Exhale" | "Rest">("Inhale");
  const [activeTab, setActiveTab] = useState<"breathe" | "truths" | "braindump">("breathe");
  const [braindump, setBraindump] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase">
            <Heart className="w-3.5 h-3.5" /> Emergency Clarity Sanctuary
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
            Feeling Lost or Overwhelmed?
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Pause. You are safe. You do not have to solve your entire life in this 10-minute window.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab("breathe")}
            className={`py-2 rounded-lg transition-all ${
              activeTab === "breathe"
                ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            🌬️ Calm Breath
          </button>
          <button
            onClick={() => setActiveTab("truths")}
            className={`py-2 rounded-lg transition-all ${
              activeTab === "truths"
                ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            🛡️ 3 Anchors
          </button>
          <button
            onClick={() => setActiveTab("braindump")}
            className={`py-2 rounded-lg transition-all ${
              activeTab === "braindump"
                ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            ✍️ Brain Dump
          </button>
        </div>

        {/* Tab 1: Breathing */}
        {activeTab === "breathe" && (
          <div className="py-6 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="relative flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-4 border-emerald-500/40 animate-pulse flex items-center justify-center shadow-inner">
                <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                  {breathingStep}
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-500 max-w-xs">
              Slow down your heart rate. Inhale for 4 seconds, hold gently for 4, exhale slowly for 4.
            </p>
            <div className="flex gap-2">
              {(["Inhale", "Hold", "Exhale", "Rest"] as const).map((step) => (
                <button
                  key={step}
                  onClick={() => setBreathingStep(step)}
                  className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                    breathingStep === step
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "border-stone-200 dark:border-stone-700 text-stone-500"
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: 3 Anchors */}
        {activeTab === "truths" && (
          <div className="space-y-3 py-2 text-xs sm:text-sm">
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                1. Confusion is a healthy signal
              </span>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                Confusion does not mean you are broken. It means your inner self has outgrown your old circumstances and is refusing to settle for a script you didn&apos;t write.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                2. You only need the next right 10%
              </span>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                You never need to see the entire 10-year staircase. You only ever need enough light for the very next step in front of your feet.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-teal-700 dark:text-teal-400 block mb-1">
                3. Your worth is unconditional
              </span>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                Your value as a human being does not depend on your title, income, or having everything neatly figured out today.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Brain Dump */}
        {activeTab === "braindump" && (
          <div className="space-y-3 py-2">
            <p className="text-xs text-stone-500">
              Empty every messy thought, fear, or anxiety onto this blank slate. Getting it out of your head onto screen immediately reduces cortisol.
            </p>
            <textarea
              rows={5}
              value={braindump}
              onChange={(e) => setBraindump(e.target.value)}
              placeholder="I'm terrified that... I feel like everyone else has it figured out except me... I'm overwhelmed by..."
              className="w-full p-3.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold text-xs sm:text-sm cursor-pointer hover:opacity-90 transition-all"
          >
            I feel more centered now • Return to Journey
          </button>
        </div>
      </div>
    </div>
  );
}
