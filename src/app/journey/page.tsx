"use client";

import React from "react";
import { usePurpose } from "@/context/PurposeContext";
import { StageProgressBar } from "@/components/StageProgressBar";
import { LifeAuditStage } from "@/components/stages/LifeAuditStage";
import { ValuesStage } from "@/components/stages/ValuesStage";
import { SuperpowersStage } from "@/components/stages/SuperpowersStage";
import { IkigaiStage } from "@/components/stages/IkigaiStage";
import { ManifestoStage } from "@/components/stages/ManifestoStage";
import { ActionPlanStage } from "@/components/stages/ActionPlanStage";

export default function JourneyPage() {
  const { state } = usePurpose();

  return (
    <div className="min-h-screen bg-stone-100/40 dark:bg-stone-950 flex flex-col">
      <StageProgressBar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        {state.currentStage === 1 && <LifeAuditStage />}
        {state.currentStage === 2 && <ValuesStage />}
        {state.currentStage === 3 && <SuperpowersStage />}
        {state.currentStage === 4 && <IkigaiStage />}
        {state.currentStage === 5 && <ManifestoStage />}
        {state.currentStage === 6 && <ActionPlanStage />}
      </main>
    </div>
  );
}
