'use client';

import { useEffect, useState, useCallback } from 'react';
import { AppState, UserProfile } from '@/types';
import { loadState, markModuleComplete } from '@/lib/storage';
import { generateCertificate } from '@/lib/certificate';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

// Views that show the header
const VIEWS_WITH_HEADER: View['type'][] = ['dashboard', 'landing'];

export default function App() {
  const [state, setState] = useState<AppState | null>(null);
  const [view, setView] = useState<View>({ type: 'landing' });

  useEffect(() => {
    const s = loadState();
    setState(s);
    if (s.onboardingDone) {
      setView({ type: 'dashboard' });
    }
  }, []);

  const refresh = useCallback(() => {
    setState(loadState());
  }, []);

  const handleNavigate = (target: string) => {
    if (target === 'landing') setView({ type: 'landing' });
    else if (target === 'dashboard') {
      const s = loadState();
      if (s.onboardingDone) setView({ type: 'dashboard' });
      else setView({ type: 'onboarding' });
    }
  };

  const handleStart = () => {
    const s = loadState();
    if (s.onboardingDone) setView({ type: 'dashboard' });
    else setView({ type: 'onboarding' });
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

  // Loading
  if (!state) {
    return (
      <div className="min-h-screen bg-[#1a2a4a] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#f2994a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm">Chargement de la formation…</p>
        </div>
      </div>
    );
  }

  const completedModules = state.modules.filter((m) => m.quizPassed).length;
  const showHeader = VIEWS_WITH_HEADER.includes(view.type as View['type']);

  // Landing
  if (view.type === 'landing') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header
          currentView="landing"
          totalXP={state.totalXP}
          modulesCompleted={completedModules}
          onNavigate={handleNavigate}
        />
        <main className="flex-1">
          <Landing onStart={handleStart} />
        </main>
        <Footer />
      </div>
    );
  }

  // Onboarding — no header/footer
  if (view.type === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Dashboard
  if (view.type === 'dashboard') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header
          currentView="dashboard"
          totalXP={state.totalXP}
          modulesCompleted={completedModules}
          onNavigate={handleNavigate}
        />
        <main className="flex-1">
          <Dashboard
            state={state}
            onStartModule={handleStartModule}
            onDownloadCertificate={handleDownloadCertificate}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Module — no full header, has back button inside
  if (view.type === 'module') {
    const ModuleComp = MODULE_COMPONENTS[view.id];
    if (!ModuleComp) return null;
    return (
      <div className="flex flex-col min-h-screen">
        <ModuleComp
          onStartQuiz={() => handleStartQuiz(view.id)}
          onBack={() => setView({ type: 'dashboard' })}
        />
        <Footer />
      </div>
    );
  }

  // Quiz — no footer
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
