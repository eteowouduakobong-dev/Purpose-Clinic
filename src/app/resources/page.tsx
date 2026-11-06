"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Compass, HelpCircle, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const ARTICLES = [
  {
    id: "1",
    tag: "Life Transitions",
    title: "Why feeling lost is a biological sign of growth, not failure",
    readTime: "4 min read",
    summary:
      "When your brain experiences profound confusion about your future, it is often undergoing 'identity reconfiguration'. Your old operating system has expired, but the new one hasn't fully loaded.",
    content:
      "Society conditions us to view uncertainty as weakness. In reality, confusion is the necessary developmental bridge between an outgrown life and an authentic life. When you feel lost, it simply means your inner self has developed higher standards than your current reality can accommodate.",
  },
  {
    id: "2",
    tag: "Purpose Science",
    title: "The myth of the lightning bolt: Why purpose is excavated",
    readTime: "5 min read",
    summary:
      "Many people spend decades waiting for an epiphany to strike from the sky. Ancient and modern psychology prove that purpose is an archaeological dig, not a meteor strike.",
    content:
      "You don't 'find' your purpose like keys dropped in the grass. You uncover it layer by layer: examining your natural childhood curiosities, identifying which problems in the world make your heart ache, and courageously testing small experiments.",
  },
  {
    id: "3",
    tag: "Career & Money",
    title: "How to pivot without destroying your financial peace",
    readTime: "6 min read",
    summary:
      "The 'burn the ships' romanticized advice often creates panic, which shuts down creative thinking. Here is how to build a runway of safety while pivoting toward meaning.",
    content:
      "Do not gamble your peace. Use the 'two-track' transition model: maintain baseline financial security while devoting 5 to 10 hours a week to your purpose pilot project. When the second track demonstrates momentum and joy, the transition becomes a natural step, not a desperate leap.",
  },
  {
    id: "4",
    tag: "Psychology",
    title: "The Multipotentialite dilemma: What if you love everything?",
    readTime: "4 min read",
    summary:
      "If you hate the question 'what is your one true passion?', you might be a multipotentialite. How to combine diverse curiosities into a unified Ikigai.",
    content:
      "You do not need to choose only one passion for life. Instead, look for the 'umbrella theme'—the golden thread that connects your seemingly unrelated interests. For instance, coding, cooking, and writing are all about taking raw ingredients and creating transforming experiences.",
  },
];

const FAQS = [
  {
    q: "What if I go through the clinic and still feel confused?",
    a: "That is completely normal. The purpose of this clinic is not to deliver a rigid, unbreakable contract, but to clarify your compass. Often, the fog begins lifting after you take 2 or 3 small actions from your 30-day action plan.",
  },
  {
    q: "Is it possible to have more than one life purpose?",
    a: "Yes. Purpose is dynamic. Your purpose at 22 might center on exploration and mastery; at 35 it might center on building and nurturing; at 55 it might center on legacy and mentorship. Your core values remain your constant anchor.",
  },
  {
    q: "How does Purpose Clinic protect my privacy?",
    a: "Your reflections are private to you. In demo mode, your data lives securely in your local browser storage. When Supabase authentication is connected, your data is protected with Row Level Security (RLS) encrypted in Postgres.",
  },
  {
    q: "How often should I revisit the 6-stage journey?",
    a: "We recommend doing a comprehensive Life Audit every 6 months, and checking in with your Daily Tracker each morning or evening to maintain daily alignment.",
  },
];

export function ResourcesPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-stone-100/40 dark:bg-stone-950 flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Clarity & Wisdom Library
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Nourishment for the Journey
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-base max-w-2xl leading-relaxed">
            Essential essays, frameworks, and wisdom to dissolve existential anxiety and support you as you navigate life&apos;s crossroads.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-900/50">
                    {art.tag}
                  </span>
                  <span className="text-stone-400">{art.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {art.summary}
                </p>
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 italic">
                  &quot;{art.content}&quot;
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              Frequently Asked Questions for Seekers
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-semibold text-stone-900 dark:text-stone-100 text-sm flex items-center justify-between gap-4 bg-stone-50/50 dark:bg-stone-800/30 hover:bg-stone-50 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-linear-to-r from-emerald-800 to-teal-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Ready to clarify your personal path?</h3>
            <p className="text-emerald-100/90 text-sm">
              Walk through the 6-stage step-by-step clinic right now.
            </p>
          </div>
          <Link
            href="/journey"
            className="px-6 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <span>Enter The Clinic</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ResourcesPage;
