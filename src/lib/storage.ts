'use client';

import { AppState, UserProfile, ModuleProgress } from '@/types';

const STORAGE_KEY = 'guide_samuel_v1';

const defaultModules: ModuleProgress[] = Array.from({ length: 5 }, (_, i) => ({
  moduleId: i + 1,
  completed: false,
  quizPassed: false,
  xpEarned: 0,
}));

const defaultState: AppState = {
  user: null,
  modules: defaultModules,
  totalXP: 0,
  badges: [],
  onboardingDone: false,
};

export function loadState(): AppState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    // Merge with defaults to handle new fields
    return {
      ...defaultState,
      ...parsed,
      modules: parsed.modules ?? defaultModules,
    };
  } catch {
    return defaultState;
  }
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silent
  }
}

export function saveUser(user: UserProfile): AppState {
  const state = loadState();
  const next = { ...state, user, onboardingDone: true };
  saveState(next);
  return next;
}

export function markModuleComplete(moduleId: number, xp: number): AppState {
  const state = loadState();
  const modules = state.modules.map((m) =>
    m.moduleId === moduleId
      ? { ...m, completed: true, quizPassed: true, xpEarned: xp, completedAt: new Date().toISOString() }
      : m
  );
  const totalXP = modules.reduce((sum, m) => sum + m.xpEarned, 0);
  const badge = `module_${moduleId}`;
  const badges = state.badges.includes(badge) ? state.badges : [...state.badges, badge];

  // Check all modules completed
  const allDone = modules.every((m) => m.quizPassed);
  if (allDone && !badges.includes('champion')) {
    badges.push('champion');
  }

  const next: AppState = { ...state, modules, totalXP, badges };
  saveState(next);
  return next;
}

export function isModuleUnlocked(moduleId: number, state: AppState): boolean {
  if (moduleId === 1) return true;
  return state.modules[moduleId - 2]?.quizPassed === true;
}

export function allModulesCompleted(state: AppState): boolean {
  return state.modules.every((m) => m.quizPassed);
}

// Sanitize string — strip HTML tags, limit length
export function sanitize(value: string, maxLen = 50): string {
  return value
    .replace(/[<>"'&]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen);
}
