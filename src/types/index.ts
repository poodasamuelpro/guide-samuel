export interface UserProfile {
  firstName: string;
  lastName: string;
  city?: string;
  completedAt?: string;
}

export interface ModuleProgress {
  moduleId: number;
  completed: boolean;
  quizPassed: boolean;
  xpEarned: number;
  completedAt?: string;
}

export interface AppState {
  user: UserProfile | null;
  modules: ModuleProgress[];
  totalXP: number;
  badges: string[];
  onboardingDone: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleData {
  id: number;
  title: string;
  icon: string;
  color: string;
  description: string;
  xpReward: number;
  badge: string;
  badgeLabel: string;
}
