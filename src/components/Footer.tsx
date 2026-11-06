"use client";

import React from "react";
import Link from "next/link";
import { Compass, Heart, Shield, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/50 mt-auto transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                Purpose Clinic
              </span>
              <p className="text-xs text-stone-500">
                Helping confused souls uncover their reason for being.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-stone-500 dark:text-stone-400">
            <Link href="/journey" className="hover:text-emerald-600 transition-colors">
              The 6 Stages
            </Link>
            <Link href="/tracker" className="hover:text-emerald-600 transition-colors">
              Daily Tracker
            </Link>
            <Link href="/manifesto" className="hover:text-emerald-600 transition-colors">
              Manifesto
            </Link>
            <Link href="/resources" className="hover:text-emerald-600 transition-colors">
              Clarity Library
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 dark:border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p>
            &copy; 2026 Purpose Clinic. Built with Next.js, Supabase, Prisma &amp; Vercel.
          </p>
          <p className="flex items-center gap-1 italic text-stone-500">
            &quot;The two most important days in your life are the day you are born and the day you find out why.&quot; — Mark Twain
          </p>
        </div>
      </div>
    </footer>
  );
}
