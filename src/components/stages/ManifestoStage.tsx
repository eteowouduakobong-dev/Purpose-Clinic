"use client";

import React, { useState } from "react";
import { usePurpose } from "@/context/PurposeContext";
import confetti from "canvas-confetti";
import {
  Award,
  Sparkles,
  Printer,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Wand2,
  Heart,
  Quote,
} from "lucide-react";

export function ManifestoStage() {
  const { state, updateManifesto, completeStage, setStage } = usePurpose();
  const manifesto = state.manifesto;
  const [copied, setCopied] = useState(false);

  // Auto-generate / Synthesize based on earlier stages
  const generateDraft = () => {
    const topValue = state.values[0]?.name || "Authenticity";
    const superpower = state.superpowers.naturalTalents[0] || "empathetic guidance";
    const flow = state.superpowers.flowActivities[0] || "creative reflection";
    const need = state.ikigai.whatWorldNeeds[0] || "clarity and hope";

    const autoHeadline = `To illuminate paths through uncertainty and help seekers discover grounded purpose.`;
    const autoStatement = `My purpose is to use my gifts of ${superpower.toLowerCase()} and ${flow.toLowerCase()} in service of individuals seeking direction, transforming confusion into lasting confidence and inner peace, anchored by ${topValue.toLowerCase()}.`;
    const autoServe = "Individuals navigating career transitions, quarter-life pivots, and existential confusion.";
    const autoTransform = "From chronic self-doubt and aimless drift to clarity, intentional work, and soulful joy.";
    const autoPrinciples = [
      "Clarity is uncovered step by step, never forced overnight.",
      "Live true to my core values, even when the world demands conformity.",
      "Small daily intentional acts compound into an extraordinary life.",
    ];
    const autoDeclaration = `Today, I bring my genuine presence, honor my values, and take one courageous step forward.`;

    updateManifesto({
      headline: manifesto.headline || autoHeadline,
      fullStatement: manifesto.fullStatement || autoStatement,
      whoIServe: manifesto.whoIServe || autoServe,
      whatITransform: manifesto.whatITransform || autoTransform,
      guidingPrinciples: manifesto.guidingPrinciples.length > 0 ? manifesto.guidingPrinciples : autoPrinciples,
      dailyDeclaration: manifesto.dailyDeclaration || autoDeclaration,
    });
  };

  const handleCopy = () => {
    const text = `PURPOSE CLINIC MANIFESTO\n\n"${manifesto.headline}"\n\n${manifesto.fullStatement}\n\nWho I Serve: ${manifesto.whoIServe}\nWhat I Transform: ${manifesto.whatITransform}\n\nDaily Declaration:\n"${manifesto.dailyDeclaration}"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }
    completeStage(5);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Box */}
      <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5" /> Stage 5: The Purpose Manifesto
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
          Formulate your life&apos;s clear declaration
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          You have audited your life, uncovered your non-negotiable values, unearthed your natural superpowers,
          and mapped your Ikigai. Now, we distill everything into your personal <strong>Purpose Manifesto</strong>.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={generateDraft}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <Wand2 className="w-4 h-4" />
            Synthesize draft from my previous stages
          </button>
        </div>
      </div>

      {/* Editor Fields */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6">
        <div>
          <label className="block text-xs uppercase font-bold text-stone-600 dark:text-stone-400 tracking-wider mb-1.5">
            1. The Headline (Your North Star Mantra)
          </label>
          <input
            type="text"
            value={manifesto.headline}
            onChange={(e) => updateManifesto({ headline: e.target.value })}
            placeholder="e.g. To illuminate human potential through storytelling and soulful design."
            className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-stone-600 dark:text-stone-400 tracking-wider mb-1.5">
            2. The Full Purpose Statement
          </label>
          <textarea
            rows={3}
            value={manifesto.fullStatement}
            onChange={(e) => updateManifesto({ fullStatement: e.target.value })}
            placeholder="My purpose is to use my gifts of [superpower] for [who you serve] so that [transformation]..."
            className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-stone-600 dark:text-stone-400 tracking-wider mb-1.5">
              3. Who I Serve
            </label>
            <input
              type="text"
              value={manifesto.whoIServe}
              onChange={(e) => updateManifesto({ whoIServe: e.target.value })}
              placeholder="e.g. Seekers, students, and exhausted creators..."
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-stone-600 dark:text-stone-400 tracking-wider mb-1.5">
              4. What I Transform
            </label>
            <input
              type="text"
              value={manifesto.whatITransform}
              onChange={(e) => updateManifesto({ whatITransform: e.target.value })}
              placeholder="e.g. From paralysis and anxiety to energized purpose..."
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-stone-600 dark:text-stone-400 tracking-wider mb-1.5">
            5. Daily Morning Declaration (The Pledge)
          </label>
          <input
            type="text"
            value={manifesto.dailyDeclaration}
            onChange={(e) => updateManifesto({ dailyDeclaration: e.target.value })}
            placeholder="e.g. Today, I honor my truth, listen with compassion, and take one courageous step."
            className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Visual Purpose Certificate Card (Shareable & Printable) */}
      <div
        id="manifesto-card"
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-stone-900 via-emerald-950 to-teal-950 p-8 sm:p-12 text-white border-2 border-amber-500/30 shadow-2xl space-y-6"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Quote className="w-32 h-32" />
        </div>

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-widest text-amber-300">
              Purpose Clinic Sanctuary • Official Manifesto
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div className="space-y-4 max-w-2xl">
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 leading-tight">
            &quot;{manifesto.headline || "My Life Calling"}&quot;
          </h3>
          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
            {manifesto.fullStatement ||
              "Formulate your purpose statement above to see your formal certificate update live."}
          </p>
        </div>

        {/* Guiding Core Values Badges */}
        {state.values.length > 0 && (
          <div className="pt-2">
            <span className="text-xs uppercase tracking-wider text-amber-300/80 font-mono block mb-2">
              Anchored By Core Values:
            </span>
            <div className="flex flex-wrap gap-2">
              {state.values.map((v) => (
                <span
                  key={v.name}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-amber-100 font-medium"
                >
                  #{v.rank} {v.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {manifesto.dailyDeclaration && (
          <div className="pt-4 border-t border-white/10 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-amber-300 block">
                Daily Morning Declaration:
              </span>
              <p className="text-sm italic text-emerald-100">
                &quot;{manifesto.dailyDeclaration}&quot;
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setStage(4)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ikigai</span>
        </button>

        <button
          onClick={triggerCelebration}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-lg shadow-emerald-700/20 transition-all cursor-pointer text-sm sm:text-base"
        >
          <span>Celebrate & Unlock Action Blueprint</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
