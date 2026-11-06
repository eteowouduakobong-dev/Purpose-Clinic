"use client";

import React, { useState } from "react";
import { usePurpose } from "@/context/PurposeContext";
import { CoreValueItem } from "@/types/purpose";
import { Heart, Check, ArrowRight, ArrowLeft, Plus, X, Sparkles, HelpCircle } from "lucide-react";

interface ValueCategory {
  name: string;
  items: string[];
}

const VALUE_CATEGORIES: ValueCategory[] = [
  {
    name: "Wisdom & Intellect",
    items: ["Curiosity", "Truth", "Wisdom", "Lifelong Learning", "Clarity", "Perspective", "Insight", "Knowledge"],
  },
  {
    name: "Heart & Connection",
    items: ["Compassion", "Empathy", "Love", "Kindness", "Belonging", "Generosity", "Loyalty", "Nurturing"],
  },
  {
    name: "Courage & Freedom",
    items: ["Authenticity", "Freedom", "Courage", "Autonomy", "Boldness", "Resilience", "Independence", "Adventure"],
  },
  {
    name: "Impact & Excellence",
    items: ["Empowerment", "Contribution", "Excellence", "Leadership", "Mastery", "Service", "Innovation", "Justice"],
  },
  {
    name: "Joy & Vitality",
    items: ["Playfulness", "Creativity", "Vitality", "Humor", "Gratitude", "Peace", "Harmony", "Beauty"],
  },
  {
    name: "Soul & Integrity",
    items: ["Integrity", "Honor", "Spirituality", "Simplicity", "Humility", "Faith", "Presence", "Patience"],
  },
];

export function ValuesStage() {
  const { state, updateValues, completeStage, setStage } = usePurpose();
  const selectedValues = state.values;
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const isSelected = (name: string) => selectedValues.some((v) => v.name === name);

  const toggleValue = (name: string) => {
    if (isSelected(name)) {
      updateValues(selectedValues.filter((v) => v.name !== name));
    } else {
      if (selectedValues.length >= 5) {
        alert("You have selected 5 core values! To add another, please deselect one first.");
        return;
      }
      const newItem: CoreValueItem = {
        name,
        rank: selectedValues.length + 1,
        definition: "",
        actionExample: "",
      };
      updateValues([...selectedValues, newItem]);
    }
  };

  const handleDefinitionChange = (name: string, definition: string) => {
    updateValues(
      selectedValues.map((v) => (v.name === name ? { ...v, definition } : v))
    );
  };

  const handleActionChange = (name: string, actionExample: string) => {
    updateValues(
      selectedValues.map((v) => (v.name === name ? { ...v, actionExample } : v))
    );
  };

  const moveRank = (index: number, direction: "up" | "down") => {
    const newItems = [...selectedValues];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // update rank numbers
    const updated = newItems.map((item, idx) => ({ ...item, rank: idx + 1 }));
    updateValues(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Heart className="w-3.5 h-3.5" /> Stage 2: Core Values Excavation
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
          What are your non-negotiable guiding stars?
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          When life feels confusing, it is almost always because you are violating one of your core values
          or trying to live up to someone else&apos;s. Select exactly <strong>5 core values</strong> that define
          who you are when all superficial masks are stripped away.
        </p>

        {/* Selected Count Indicator */}
        <div className="mt-5 flex items-center gap-3">
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
            Selected: <strong className="text-rose-600 dark:text-rose-400">{selectedValues.length}</strong> / 5
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedValues.length >= num
                    ? "bg-rose-500 border-rose-500 scale-105"
                    : "border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categories Tab Filter */}
      <div className="flex flex-wrap gap-2 pb-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeCategory === "All"
              ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs"
              : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
          }`}
        >
          All Domains
        </button>
        {VALUE_CATEGORIES.map((c) => (
          <button
            key={c.name}
            onClick={() => setActiveCategory(c.name)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === c.name
                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Values Selection Cloud */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <div className="flex flex-wrap gap-2.5">
          {VALUE_CATEGORIES.filter(
            (c) => activeCategory === "All" || c.name === activeCategory
          ).flatMap((c) =>
            c.items.map((val) => {
              const checked = isSelected(val);
              return (
                <button
                  key={val}
                  onClick={() => toggleValue(val)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    checked
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/20 scale-105"
                      : "bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-rose-300 dark:hover:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                  }`}
                >
                  {checked ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-stone-400" />
                  )}
                  <span>{val}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Deepen Top 5 Definitions */}
      {selectedValues.length > 0 && (
        <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-lg">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span>Define Your Top 5 Values in Practice</span>
            </div>
            <span className="text-xs text-stone-500">
              Drag or use arrows to prioritize
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            A value without a personal definition is just a slogan. What does each value mean to YOU,
            and how will you test it when making hard choices?
          </p>

          <div className="space-y-4">
            {selectedValues.map((v, idx) => (
              <div
                key={v.name}
                className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <h4 className="font-bold text-base text-stone-900 dark:text-stone-100">
                      {v.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => moveRank(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 rounded text-stone-400 hover:text-stone-700 disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveRank(idx, "down")}
                      disabled={idx === selectedValues.length - 1}
                      className="p-1 rounded text-stone-400 hover:text-stone-700 disabled:opacity-30 cursor-pointer"
                      title="Move down"
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => toggleValue(v.name)}
                      className="p-1 text-stone-400 hover:text-rose-600 cursor-pointer"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                      Personal Definition (What it means to me):
                    </label>
                    <input
                      type="text"
                      value={v.definition}
                      onChange={(e) => handleDefinitionChange(v.name, e.target.value)}
                      placeholder={`e.g., Living true to myself even under peer pressure...`}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                      Action in Daily Life (How I live it):
                    </label>
                    <input
                      type="text"
                      value={v.actionExample}
                      onChange={(e) => handleActionChange(v.name, e.target.value)}
                      placeholder={`e.g., Saying 'no' to projects that violate my peace...`}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setStage(1)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Audit</span>
        </button>

        <button
          onClick={() => completeStage(2)}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-lg shadow-emerald-700/20 transition-all cursor-pointer text-sm sm:text-base"
        >
          <span>Confirm Values & Unlock Superpowers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
