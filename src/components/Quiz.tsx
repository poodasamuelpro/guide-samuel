'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_DATA } from '@/lib/quizData';
import { QuizQuestion } from '@/types';
import { IconCheck, IconX, IconArrowRight } from '@/components/Icons';

interface QuizProps {
  moduleId: number;
  onPass: () => void;
  onBack: () => void;
}

export default function Quiz({ moduleId, onPass, onBack }: QuizProps) {
  const questions: QuizQuestion[] = QUIZ_DATA[moduleId] ?? [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    if (idx === q.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  }

  const passed = score >= Math.ceil(questions.length * 0.66);

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl"
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100' : 'bg-orange-100'}`}>
            {passed
              ? <IconCheck size={36} color="#16a34a" />
              : <IconX size={36} color="#ea580c" />
            }
          </div>
          <h2 className="text-2xl font-bold text-[#1a2a4a] mb-2">
            {passed ? 'Bravo !' : 'Pas tout à fait...'}
          </h2>
          <p className="text-gray-600 mb-2 text-base">
            {score}/{questions.length} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''}
          </p>
          {passed ? (
            <p className="text-green-700 font-semibold mb-6 text-sm">Module débloqué — +100 XP gagnés !</p>
          ) : (
            <p className="text-orange-600 font-semibold mb-6 text-sm">Relis le module et réessaie.</p>
          )}
          <div className="space-y-3">
            {passed ? (
              <button
                onClick={onPass}
                className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
              >
                <span>Continuer</span>
                <IconArrowRight size={18} color="white" />
              </button>
            ) : (
              <button
                onClick={onBack}
                className="w-full bg-gradient-to-r from-[#1a2a4a] to-[#2a3f6a] text-white font-bold py-4 rounded-xl"
              >
                Revoir le module
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#1a2a4a] to-[#0f1a2e] px-4 pt-8 pb-12">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-gray-400 text-sm mb-4 flex items-center gap-1 hover:text-white transition-colors">
            &#8592; Retour au module
          </button>
          <h2 className="text-white font-bold text-lg">Quiz — Module {moduleId}</h2>
          <div className="flex gap-2 mt-3">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i < current ? 'bg-[#f2994a]' : i === current ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-2">{current + 1}/{questions.length}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-6 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          >
            <p className="font-bold text-[#1a2a4a] text-base mb-6 leading-relaxed">{q.question}</p>

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                let btnClass = 'border-gray-200 bg-gray-50 hover:border-[#f2994a] cursor-pointer';
                let textClass = 'text-gray-700';
                if (selected !== null) {
                  if (idx === q.correctIndex) {
                    btnClass = 'border-green-500 bg-green-50';
                    textClass = 'text-green-800';
                  } else if (idx === selected) {
                    btnClass = 'border-red-400 bg-red-50';
                    textClass = 'text-red-700';
                  } else {
                    btnClass = 'border-gray-200 bg-gray-50 opacity-50';
                    textClass = 'text-gray-500';
                  }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left border-2 rounded-xl px-4 py-3.5 text-sm transition-all ${btnClass}`}
                  >
                    <span className="font-bold text-[#1a2a4a] mr-2">{String.fromCharCode(65 + idx)}.</span>
                    <span className={textClass}>{opt}</span>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 rounded-xl p-4 text-sm border ${
                  selected === q.correctIndex
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : 'bg-orange-50 text-orange-800 border-orange-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {selected === q.correctIndex
                    ? <IconCheck size={16} color="#16a34a" />
                    : <IconX size={16} color="#ea580c" />
                  }
                  <span>{selected === q.correctIndex ? 'Correct !' : 'Pas tout à fait'}</span>
                </div>
                <p className="text-xs leading-relaxed">{q.explanation}</p>
              </motion.div>
            )}

            {showExplanation && (
              <button
                onClick={handleNext}
                className="w-full mt-4 bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <span>{current + 1 < questions.length ? 'Question suivante' : 'Voir mon résultat'}</span>
                <IconArrowRight size={16} color="white" />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
