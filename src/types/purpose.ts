export interface LifeAuditData {
  careerScore: number;
  healthScore: number;
  relationshipScore: number;
  growthScore: number;
  creativityScore: number;
  financeScore: number;
  environmentScore: number;
  spiritualScore: number;
  topFriction: string;
  energyLeaks: string;
  topPriority: string;
  auditNotes: string;
}

export interface CoreValueItem {
  name: string;
  rank: number;
  definition: string;
  actionExample: string;
}

export interface SuperpowersData {
  naturalTalents: string[];
  flowActivities: string[];
  childhoodPassions: string[];
  energyGivers: string[];
  energyDrainers: string[];
  proudestMoments: string;
}

export interface IkigaiData {
  whatYouLove: string[];
  whatYouAreGoodAt: string[];
  whatWorldNeeds: string[];
  whatYouCanGetPaidFor: string[];
  passionTheme: string;
  missionTheme: string;
  professionTheme: string;
  vocationTheme: string;
  ikigaiSynthesis: string;
}

export interface PurposeManifestoData {
  headline: string;
  fullStatement: string;
  whoIServe: string;
  whatITransform: string;
  guidingPrinciples: string[];
  dailyDeclaration: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  timeframe: "30_DAYS" | "90_DAYS" | "1_YEAR";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  alignmentReason: string;
  dueDate?: string;
}

export interface DailyCheckInData {
  id: string;
  date: string; // YYYY-MM-DD
  morningIntention: string;
  eveningReflection: string;
  alignmentScore: number; // 1-10
  energyLevel: number; // 1-10
  clarityScore: number; // 1-10
  gratitude: string;
  mood: "peaceful" | "inspired" | "uncertain" | "restless" | "grounded";
}

export interface PurposeState {
  currentStage: number; // 1 to 6
  stagesCompleted: number[];
  initialClarity: number; // 1 to 10
  currentClarity: number; // 1 to 10
  audit: LifeAuditData;
  values: CoreValueItem[];
  superpowers: SuperpowersData;
  ikigai: IkigaiData;
  manifesto: PurposeManifestoData;
  milestones: MilestoneItem[];
  dailyCheckIns: DailyCheckInData[];
}
