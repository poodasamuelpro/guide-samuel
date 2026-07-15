'use client';

import { useEffect, useState, useCallback } from 'react';
import { AppState, UserProfile } from '@/types';
import { loadState, markModuleComplete } from '@/lib/storage';
import { generateCertificate } from '@/lib/certificate';

import Landing from '@/components/Landing';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';
import Quiz from '@/components/Quiz';

import Module1 from '@/components/modules/Module1';
import Module2 from '@/components/modules/Module2';
import Module3 from '@/components/modules/Module3';
import Module4 from '@/components/modules/Module4';
import Module5 from '@/components/modules/Module5';

type View =
  | { type: 'landing' }
  | { type: 'onboarding' }
  | { type: 'dashboard' }
  | { type: 'module'; id: number }
  | { type: 'quiz'; moduleId: number };

const MODULE_COMPONENTS: Record<number, React.ComponentType<{ onStartQuiz: () => void; onBack: () => void }>> = {
  1: Module1,
  2: Module2,
  3: Module3,
  4: Module4,
  5: Module5,
};

export default function App() {
  const [state, setState] = useState<AppState | null>(null);
  const [view, setView] = useState<View>({ type: 'landing' });

  useEffect(() => {
    const s = loadState();
    setState(s);
    // Skip landing if already onboarded
    if (s.onboardingDone) {
      setView({ type: 'dashboard' });
    }
  }, []);

  const refresh = useCallback(() => {
    setState(loadState());
  }, []);

  const handleStart = () => {
    const s = loadState();
    if (s.onboardingDone) {
      setView({ type: 'dashboard' });
    } else {
      setView({ type: 'onboarding' });
    }
  };

  const handleOnboardingComplete = (user: UserProfile) => {
    void user;
    refresh();
    setView({ type: 'dashboard' });
  };

  const handleStartModule = (id: number) => {
    setView({ type: 'module', id });
  };

  const handleStartQuiz = (moduleId: number) => {
    setView({ type: 'quiz', moduleId });
  };

  const handleQuizPass = (moduleId: number) => {
    markModuleComplete(moduleId, 100);
    refresh();
    setView({ type: 'dashboard' });
  };

  const handleDownloadCertificate = async () => {
    if (!state) return;
    await generateCertificate(state);
  };

  if (!state) return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2a4a] to-[#0f1a2e] flex items-center justify-center">
      <div className="text-white text-center">
        <div className="text-4xl mb-3 animate-bounce">🌍</div>
        <p className="text-gray-300 text-sm">Chargement...</p>
      </div>
    </div>
  );

  // Landing
  if (view.type === 'landing') {
    return <Landing onStart={handleStart} />;
  }

  // Onboarding
  if (view.type === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Dashboard
  if (view.type === 'dashboard') {
    return (
      <Dashboard
        state={state}
        onStartModule={handleStartModule}
        onDownloadCertificate={handleDownloadCertificate}
      />
    );
  }

  // Module
  if (view.type === 'module') {
    const ModuleComp = MODULE_COMPONENTS[view.id];
    if (!ModuleComp) return null;
    return (
      <ModuleComp
        onStartQuiz={() => handleStartQuiz(view.id)}
        onBack={() => setView({ type: 'dashboard' })}
      />
    );
  }

  // Quiz
  if (view.type === 'quiz') {
    return (
      <Quiz
        moduleId={view.moduleId}
        onPass={() => handleQuizPass(view.moduleId)}
        onBack={() => setView({ type: 'module', id: view.moduleId })}
      />
    );
  }

  return null;
}
