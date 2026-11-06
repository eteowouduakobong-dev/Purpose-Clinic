"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  PurposeState,
  LifeAuditData,
  CoreValueItem,
  SuperpowersData,
  IkigaiData,
  PurposeManifestoData,
  MilestoneItem,
  DailyCheckInData,
} from "@/types/purpose";

const defaultState: PurposeState = {
  currentStage: 1,
  stagesCompleted: [],
  initialClarity: 3,
  currentClarity: 3,
  audit: {
    careerScore: 5,
    healthScore: 6,
    relationshipScore: 6,
    growthScore: 5,
    creativityScore: 4,
    financeScore: 5,
    environmentScore: 6,
    spiritualScore: 4,
    topFriction: "",
    energyLeaks: "",
    topPriority: "",
    auditNotes: "",
  },
  values: [],
  superpowers: {
    naturalTalents: [],
    flowActivities: [],
    childhoodPassions: [],
    energyGivers: [],
    energyDrainers: [],
    proudestMoments: "",
  },
  ikigai: {
    whatYouLove: [],
    whatYouAreGoodAt: [],
    whatWorldNeeds: [],
    whatYouCanGetPaidFor: [],
    passionTheme: "",
    missionTheme: "",
    professionTheme: "",
    vocationTheme: "",
    ikigaiSynthesis: "",
  },
  manifesto: {
    headline: "",
    fullStatement: "",
    whoIServe: "",
    whatITransform: "",
    guidingPrinciples: [],
    dailyDeclaration: "",
  },
  milestones: [
    {
      id: "1",
      title: "Complete the 6-stage Purpose Clinic discovery audit",
      timeframe: "30_DAYS",
      status: "IN_PROGRESS",
      alignmentReason: "To establish a crystal-clear baseline for who I am and where I am headed.",
    },
    {
      id: "2",
      title: "Establish a 15-minute daily morning intention & alignment ritual",
      timeframe: "30_DAYS",
      status: "PENDING",
      alignmentReason: "To anchor my decisions in my discovered core values every single day.",
    },
    {
      id: "3",
      title: "Start a small pilot project or creative output expressing my Ikigai",
      timeframe: "90_DAYS",
      status: "PENDING",
      alignmentReason: "Turn internal clarity into tangible real-world contribution.",
    },
    {
      id: "4",
      title: "Align my professional work or career direction with my Purpose Manifesto",
      timeframe: "1_YEAR",
      status: "PENDING",
      alignmentReason: "Achieve lasting harmony between financial sustenance and soulful purpose.",
    },
  ],
  dailyCheckIns: [
    {
      id: "demo-1",
      date: "2026-11-04",
      morningIntention: "Listen carefully before reacting and protect my morning focus time.",
      eveningReflection: "Felt centered during meetings. Took a 20-minute walk to decompress.",
      alignmentScore: 7,
      energyLevel: 8,
      clarityScore: 6,
      gratitude: "A quiet moment with warm tea and supportive peers.",
      mood: "peaceful",
    },
    {
      id: "demo-2",
      date: "2026-11-05",
      morningIntention: "Explore what truly lights me up without judging myself.",
      eveningReflection: "Began the Purpose Clinic audit. Realized I have been neglecting creative play.",
      alignmentScore: 8,
      energyLevel: 7,
      clarityScore: 7,
      gratitude: "Giving myself permission to feel uncertain and explore honestly.",
      mood: "inspired",
    },
  ],
};

const sampleTransformedProfile: PurposeState = {
  currentStage: 6,
  stagesCompleted: [1, 2, 3, 4, 5, 6],
  initialClarity: 3,
  currentClarity: 9,
  audit: {
    careerScore: 8,
    healthScore: 7,
    relationshipScore: 8,
    growthScore: 9,
    creativityScore: 8,
    financeScore: 7,
    environmentScore: 8,
    spiritualScore: 8,
    topFriction: "Feeling like I was living someone else's script instead of my own.",
    energyLeaks: "Doomscrolling and saying yes to projects out of obligation.",
    topPriority: "Carving out daily deep work and creative contribution.",
    auditNotes: "The audit was an eye-opener. I had good finances but almost zero creative flow.",
  },
  values: [
    {
      name: "Authenticity",
      rank: 1,
      definition: "Living in congruence with my inner truth rather than external expectations.",
      actionExample: "Speaking up respectfully when something violates my principles.",
    },
    {
      name: "Empowerment",
      rank: 2,
      definition: "Helping others uncover their innate potential and voice.",
      actionExample: "Mentoring emerging creators and listening without judgement.",
    },
    {
      name: "Curiosity",
      rank: 3,
      definition: "Approaching every challenge with wonder, inquiry, and lifelong learning.",
      actionExample: "Reading across disciplines and asking deep questions.",
    },
    {
      name: "Compassion",
      rank: 4,
      definition: "Holding space for human struggle with empathy and gentle kindness.",
      actionExample: "Extending grace to myself when I stumble.",
    },
    {
      name: "Creative Mastery",
      rank: 5,
      definition: "Translating messy insights into beautiful, accessible tools and stories.",
      actionExample: "Writing and building solutions every week.",
    },
  ],
  superpowers: {
    naturalTalents: [
      "Synthesizing complex, overwhelming ideas into simple roadmaps",
      "Empathetic listening and asking the right clarifying questions",
      "Designing calm, thoughtful experiences",
    ],
    flowActivities: [
      "Writing deep reflections and long-form guides",
      "Mentoring someone through a difficult life transition",
      "Building digital tools that remove anxiety",
    ],
    childhoodPassions: [
      "Building treehouses and intricate Lego universes",
      "Writing imaginative storybooks and drawing maps",
      "Stargazing and asking big philosophical questions",
    ],
    energyGivers: [
      "Solitary morning coffee with a journal",
      "One-on-one deep conversations about life dreams",
      "Finishing a creation that genuinely helps a friend",
    ],
    energyDrainers: [
      "Surface-level gossip and cynical complaining",
      "Chaotic environments without quiet sanctuary",
      "Pointless administrative bureaucracy",
    ],
    proudestMoments:
      "When a close friend told me my conversation helped them quit a soul-crushing job and pursue their true calling.",
  },
  ikigai: {
    whatYouLove: [
      "Guiding people through uncertainty",
      "Writing and storytelling",
      "Creating serene digital spaces",
      "Philosophy and human psychology",
    ],
    whatYouAreGoodAt: [
      "Framework design and breaking things down",
      "Empathetic coaching",
      "Writing clear prose",
      "Product design and technology",
    ],
    whatWorldNeeds: [
      "Mental clarity in a distracted, noisy world",
      "Tools that restore human agency and hope",
      "Safe spaces to admit confusion without shame",
    ],
    whatYouCanGetPaidFor: [
      "Life and career transformation coaching",
      "Software design & digital tool creation",
      "Writing and workshop facilitation",
    ],
    passionTheme: "Expressing empathetic wisdom through creative systems",
    missionTheme: "Helping lost seekers find clarity and courageous purpose",
    professionTheme: "Human-centered design and purpose facilitation",
    vocationTheme: "Transformative educational tools and supportive communities",
    ikigaiSynthesis:
      "At the intersection of deep empathy, structured design, and life philosophy, I create tools and spaces that guide people from chronic confusion to grounded purpose.",
  },
  manifesto: {
    headline: "To illuminate paths through uncertainty so that thoughtful seekers can live courageously.",
    fullStatement:
      "My purpose is to synthesize life wisdom and human-centered design into soothing, practical tools for overwhelmed individuals, empowering them to shed fear, discover their authentic gifts, and craft a life of deep meaning.",
    whoIServe: "Seekers, career-switchers, and creators who feel adrift and yearn for direction.",
    whatITransform: "From paralyzing self-doubt and aimless distraction to intentional, joyful purpose.",
    guidingPrinciples: [
      "Clarity is uncovered, not forced.",
      "Small daily intentional acts compound into a monumental life.",
      "Kindness to oneself is the prerequisite for authentic service to the world.",
      "Serve the human heart, not just the algorithm.",
    ],
    dailyDeclaration:
      "Today, I bring my genuine presence, honor my values, and take one courageous step in service of my purpose.",
  },
  milestones: [
    {
      id: "ex-1",
      title: "Host my first free Purpose Circle for 5 friends feeling stuck",
      timeframe: "30_DAYS",
      status: "COMPLETED",
      alignmentReason: "Validates my superpower of facilitating transformative clarity.",
    },
    {
      id: "ex-2",
      title: "Publish 8 weekly essays on navigating quarter-life transitions",
      timeframe: "90_DAYS",
      status: "IN_PROGRESS",
      alignmentReason: "Brings my writing flow into the service of seekers.",
    },
    {
      id: "ex-3",
      title: "Launch an ongoing mentorship cohort and digital sanctuary toolkit",
      timeframe: "1_YEAR",
      status: "PENDING",
      alignmentReason: "Establishes long-term sustainable impact and financial harmony.",
    },
  ],
  dailyCheckIns: [
    {
      id: "ex-log-1",
      date: "2026-11-06",
      morningIntention: "Anchor into stillness before responding to incoming requests.",
      eveningReflection: "Deep sense of gratitude. Felt entirely aligned while helping an anxious colleague.",
      alignmentScore: 9,
      energyLevel: 8,
      clarityScore: 9,
      gratitude: "Sunlight filtering through morning trees, and clarity of direction.",
      mood: "grounded",
    },
  ],
};

interface PurposeContextType {
  state: PurposeState;
  setStage: (stage: number) => void;
  completeStage: (stage: number) => void;
  updateAudit: (audit: Partial<LifeAuditData>) => void;
  updateValues: (values: CoreValueItem[]) => void;
  updateSuperpowers: (superpowers: Partial<SuperpowersData>) => void;
  updateIkigai: (ikigai: Partial<IkigaiData>) => void;
  updateManifesto: (manifesto: Partial<PurposeManifestoData>) => void;
  updateMilestones: (milestones: MilestoneItem[]) => void;
  addMilestone: (milestone: Omit<MilestoneItem, "id">) => void;
  toggleMilestoneStatus: (id: string) => void;
  deleteMilestone: (id: string) => void;
  addDailyCheckIn: (checkIn: Omit<DailyCheckInData, "id">) => void;
  setInitialClarity: (score: number) => void;
  setCurrentClarity: (score: number) => void;
  resetToDefault: () => void;
  loadSampleProfile: () => void;
  isLoaded: boolean;
}

const PurposeContext = createContext<PurposeContextType | undefined>(undefined);

const STORAGE_KEY = "purpose_clinic_state_v1";

export function PurposeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PurposeState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setState(parsed);
      }
    } catch (e) {
      console.warn("Failed to parse stored purpose clinic data:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.warn("Failed to persist purpose clinic data:", e);
      }
    }
  }, [state, isLoaded]);

  const setStage = (stage: number) => {
    setState((prev) => ({ ...prev, currentStage: stage }));
  };

  const completeStage = (stage: number) => {
    setState((prev) => {
      const stages = prev.stagesCompleted.includes(stage)
        ? prev.stagesCompleted
        : [...prev.stagesCompleted, stage];
      const nextStage = stage < 6 ? stage + 1 : stage;
      // Increment clarity score proportionally as stages are completed
      const newClarity = Math.min(10, Math.max(prev.currentClarity, 3 + stages.length));
      return {
        ...prev,
        stagesCompleted: stages,
        currentStage: nextStage,
        currentClarity: newClarity,
      };
    });
  };

  const updateAudit = (partial: Partial<LifeAuditData>) => {
    setState((prev) => ({
      ...prev,
      audit: { ...prev.audit, ...partial },
    }));
  };

  const updateValues = (values: CoreValueItem[]) => {
    setState((prev) => ({
      ...prev,
      values,
    }));
  };

  const updateSuperpowers = (partial: Partial<SuperpowersData>) => {
    setState((prev) => ({
      ...prev,
      superpowers: { ...prev.superpowers, ...partial },
    }));
  };

  const updateIkigai = (partial: Partial<IkigaiData>) => {
    setState((prev) => ({
      ...prev,
      ikigai: { ...prev.ikigai, ...partial },
    }));
  };

  const updateManifesto = (partial: Partial<PurposeManifestoData>) => {
    setState((prev) => ({
      ...prev,
      manifesto: { ...prev.manifesto, ...partial },
    }));
  };

  const updateMilestones = (milestones: MilestoneItem[]) => {
    setState((prev) => ({ ...prev, milestones }));
  };

  const addMilestone = (milestone: Omit<MilestoneItem, "id">) => {
    const newItem: MilestoneItem = {
      ...milestone,
      id: Date.now().toString(),
    };
    setState((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newItem],
    }));
  };

  const toggleMilestoneStatus = (id: string) => {
    setState((prev) => ({
      ...prev,
      milestones: prev.milestones.map((item) => {
        if (item.id === id) {
          const nextStatus: MilestoneItem["status"] =
            item.status === "COMPLETED"
              ? "PENDING"
              : item.status === "PENDING"
              ? "IN_PROGRESS"
              : "COMPLETED";
          return { ...item, status: nextStatus };
        }
        return item;
      }),
    }));
  };

  const deleteMilestone = (id: string) => {
    setState((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== id),
    }));
  };

  const addDailyCheckIn = (checkIn: Omit<DailyCheckInData, "id">) => {
    const newEntry: DailyCheckInData = {
      ...checkIn,
      id: Date.now().toString(),
    };
    setState((prev) => {
      // replace if same date exists or prepend
      const filtered = prev.dailyCheckIns.filter((d) => d.date !== checkIn.date);
      return {
        ...prev,
        dailyCheckIns: [newEntry, ...filtered],
        currentClarity: Math.round(
          (prev.currentClarity * 0.7) + (checkIn.clarityScore * 0.3)
        ),
      };
    });
  };

  const setInitialClarity = (score: number) => {
    setState((prev) => ({ ...prev, initialClarity: score }));
  };

  const setCurrentClarity = (score: number) => {
    setState((prev) => ({ ...prev, currentClarity: score }));
  };

  const resetToDefault = () => {
    setState(defaultState);
  };

  const loadSampleProfile = () => {
    setState(sampleTransformedProfile);
  };

  return (
    <PurposeContext.Provider
      value={{
        state,
        setStage,
        completeStage,
        updateAudit,
        updateValues,
        updateSuperpowers,
        updateIkigai,
        updateManifesto,
        updateMilestones,
        addMilestone,
        toggleMilestoneStatus,
        deleteMilestone,
        addDailyCheckIn,
        setInitialClarity,
        setCurrentClarity,
        resetToDefault,
        loadSampleProfile,
        isLoaded,
      }}
    >
      {children}
    </PurposeContext.Provider>
  );
}

export function usePurpose() {
  const context = useContext(PurposeContext);
  if (!context) {
    throw new Error("usePurpose must be used within a PurposeProvider");
  }
  return context;
}
