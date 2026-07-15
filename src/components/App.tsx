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

function LegalFooter() {
  return (
    <footer className="bg-[#0f1a2e] border-t border-white/10 px-4 py-4 text-center">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {[
          { href: '/legal/mentions-legales', label: 'Mentions légales' },
          { href: '/legal/cgu', label: 'CGU' },
          { href: '/legal/confidentialite', label: 'Confidentialité' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-gray-500 hover:text-gray-300 text-xs transition-colors underline-offset-2 hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
      <p className="text-gray-600 text-xs mt-2">
        © 2025 Le Guide de Samuel · Formation privée, non commerciale
      </p>
    </footer>
  );
}

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
    <div className="min-h-screen bg-gradient-to-br from-[#1a2a4a] to-[#0f1a2e] flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#f2994a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-300 text-sm">Chargement...</p>
      </div>
    </div>
  );

  // Landing
  if (view.type === 'landing') {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Landing onStart={handleStart} />
        </div>
        <LegalFooter />
      </div>
    );
  }

  // Onboarding
  if (view.type === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Dashboard
  if (view.type === 'dashboard') {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1">
          <Dashboard
            state={state}
            onStartModule={handleStartModule}
            onDownloadCertificate={handleDownloadCertificate}
          />
        </div>
        <footer className="bg-white border-t border-gray-100 px-4 py-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { href: '/legal/mentions-legales', label: 'Mentions légales' },
              { href: '/legal/cgu', label: 'CGU' },
              { href: '/legal/confidentialite', label: 'Confidentialité' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-gray-600 text-xs transition-colors hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-2">
            © 2025 Le Guide de Samuel
          </p>
        </footer>
      </div>
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
