export type MathLevel = 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';

export interface EarningPath {
  id: string;
  title: string;
  category: 'ai_annotation' | 'tutoring' | 'data_freelance' | 'latex' | 'content';
  shortDesc: string;
  avgHourlyRate: string;
  rateMin: number;
  rateMax: number;
  timeToFirstDollar: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  mathSkillsRequired: string[];
  toolsNeeded: string[];
  topPlatforms: string[];
  stepByStep: string[];
  insiderTip: string;
  pros: string[];
  cons: string[];
}

export interface PlatformInfo {
  id: string;
  name: string;
  category: 'AI Annotation' | 'Tutoring' | 'Freelance' | 'Micro-Gigs';
  typicalPay: string;
  payRangeHourly: [number, number];
  paymentMethod: string;
  payoutFrequency: string;
  qualificationRequirements: string;
  difficultyToEnter: 'Low' | 'Medium' | 'High';
  testTips: string;
  websiteUrl: string;
  featured?: boolean;
}

export interface PracticeProblem {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Undergraduate' | 'High School / AP' | 'Advanced';
  problemStatement: string;
  aiProposedSolution: string;
  actualFlaw: string;
  rubricHints: string[];
  sampleCritique: string;
  correctSolution: string;
}

export interface RoadmapItem {
  id: string;
  day: string;
  title: string;
  description: string;
  category: 'Preparation' | 'Application' | 'Outreach' | 'Execution';
  estimatedMinutes: number;
  actionUrl?: string;
  actionText?: string;
}

export interface ClientLog {
  id: string;
  nameOrPlatform: string;
  type: 'Tutoring' | 'AI Annotation' | 'Freelance' | 'LaTeX' | 'Other';
  hourlyRate: number;
  hoursWorked: number;
  totalEarned: number;
  date: string;
  notes?: string;
}
