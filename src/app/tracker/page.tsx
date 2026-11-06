"use client";

import React from "react";
import { DailyTracker } from "@/components/tracker/DailyTracker";

export default function TrackerPage() {
  return (
    <div className="min-h-screen bg-stone-100/40 dark:bg-stone-950 flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <DailyTracker />
      </main>
    </div>
  );
}
