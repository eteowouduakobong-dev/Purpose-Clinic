"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePurpose } from "@/context/PurposeContext";
import { SosModal } from "@/components/SosModal";
import {
  Compass,
  Sparkles,
  Heart,
  TrendingUp,
  Award,
  BookOpen,
  LifeBuoy,
  RefreshCw,
  FolderSync,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { state, loadSampleProfile, resetToDefault } = usePurpose();
  const [showSos, setShowSos] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const links = [
    { href: "/journey", label: "The Journey", icon: Compass },
    { href: "/tracker", label: "Daily Tracker", icon: TrendingUp },
    { href: "/manifesto", label: "My Manifesto", icon: Award },
    { href: "/resources", label: "Clarity Library", icon: BookOpen },
  ];

  return (
    <>
      <header className="w-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 sticky top-0 z-40 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-linear-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-stone-900 dark:text-stone-100 block leading-tight">
                Purpose Clinic
              </span>
              <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400 block -mt-0.5">
                Clarity for the Lost Soul
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    active
                      ? "bg-stone-100 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 font-semibold"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Clarity Score Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs font-semibold text-amber-800 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Clarity: {state.currentClarity}/10</span>
            </div>

            {/* Emergency Sanctuary SOS Button */}
            <button
              onClick={() => setShowSos(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 hover:bg-rose-100 text-xs font-semibold cursor-pointer transition-all"
              title="Click if you're feeling lost, panicked or anxious today"
            >
              <LifeBuoy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Feeling Stuck?</span>
              <span className="sm:hidden">SOS</span>
            </button>

            {/* Quick Demo Loader / Reset dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                title="Profile Options"
              >
                <FolderSync className="w-4 h-4" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2 shadow-xl z-50 text-xs space-y-1">
                  <div className="px-2.5 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Testing & Data
                  </div>
                  <button
                    onClick={() => {
                      loadSampleProfile();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Load Sample Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Reset your journey to start completely fresh?")) {
                        resetToDefault();
                      }
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Start Fresh (Reset)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around border-t border-stone-100 dark:border-stone-800 py-1.5 px-2 bg-stone-50/50 dark:bg-stone-900/50 text-xs">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg ${
                  active
                    ? "text-emerald-700 dark:text-emerald-400 font-bold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px]">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* SOS Modal */}
      <SosModal isOpen={showSos} onClose={() => setShowSos(false)} />
    </>
  );
}
