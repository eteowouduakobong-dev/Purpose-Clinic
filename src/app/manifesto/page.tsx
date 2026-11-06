"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePurpose } from "@/context/PurposeContext";
import {
  Award,
  Sparkles,
  Printer,
  Copy,
  Check,
  Compass,
  ArrowRight,
  Heart,
  Quote,
} from "lucide-react";

export default function ManifestoPage() {
  const { state } = usePurpose();
  const manifesto = state.manifesto;
  const [copied, setCopied] = useState(false);

  const hasManifesto = Boolean(manifesto.headline || manifesto.fullStatement);

  const handleCopy = () => {
    const text = `PURPOSE CLINIC MANIFESTO\n\n"${manifesto.headline}"\n\n${manifesto.fullStatement}\n\nWho I Serve: ${manifesto.whoIServe}\nWhat I Transform: ${manifesto.whatITransform}\n\nDaily Declaration:\n"${manifesto.dailyDeclaration}"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-100/40 dark:bg-stone-950 flex flex-col">
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Intro */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" /> Your Official Purpose Card
            </div>
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              The Purpose Manifesto
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              Your anchor when noise, doubt, and life transitions shake your resolve.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 text-xs font-medium flex items-center gap-2 shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Text"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold flex items-center gap-2 shadow-sm cursor-pointer hover:opacity-90"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Certificate Card */}
        {hasManifesto ? (
          <div
            id="printable-card"
            className="relative overflow-hidden rounded-3xl bg-linear-to-br from-stone-900 via-emerald-950 to-teal-950 p-8 sm:p-14 text-white border-4 border-amber-500/40 shadow-2xl space-y-8"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Quote className="w-40 h-40" />
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-amber-300 block">
                    Purpose Clinic • Sacred Calling Card
                  </span>
                  <span className="text-[11px] text-emerald-200/70">
                    Verified through the 6-Stage Purpose Clinic Discovery
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-300/80">
                Clarity Level: {state.currentClarity}/10
              </span>
            </div>

            <div className="space-y-4 max-w-2xl">
              <span className="text-xs uppercase font-mono text-amber-400 tracking-wider">
                North Star Mantra:
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 leading-tight">
                &quot;{manifesto.headline}&quot;
              </h2>
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light pt-2">
                {manifesto.fullStatement}
              </p>
            </div>

            {/* Who I serve & transform */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-xs uppercase font-mono text-amber-300 tracking-wider">
                  Who I Serve
                </span>
                <p className="text-emerald-100">
                  {manifesto.whoIServe || "The people my gifts are meant to touch"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-xs uppercase font-mono text-amber-300 tracking-wider">
                  What I Transform
                </span>
                <p className="text-emerald-100">
                  {manifesto.whatITransform || "Moving from confusion to inspired clarity"}
                </p>
              </div>
            </div>

            {/* Values */}
            {state.values.length > 0 && (
              <div className="pt-2">
                <span className="text-xs uppercase font-mono text-amber-300 tracking-wider block mb-2">
                  My Guiding Core Values:
                </span>
                <div className="flex flex-wrap gap-2">
                  {state.values.map((v) => (
                    <span
                      key={v.name}
                      className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-amber-100 font-medium"
                    >
                      #{v.rank} {v.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Declaration */}
            {manifesto.dailyDeclaration && (
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono tracking-wider text-amber-300 block">
                    Daily Morning Declaration
                  </span>
                  <p className="text-sm italic text-amber-100">
                    &quot;{manifesto.dailyDeclaration}&quot;
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 mx-auto flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              Your Purpose Manifesto Awaits Discovery
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              You haven&apos;t formulated your Purpose Manifesto yet. Walk through the 6-stage journey to excavate your calling.
            </p>
            <div className="pt-2">
              <Link
                href="/journey"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md transition-all"
              >
                <span>Go to Step-by-Step Clinic</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
