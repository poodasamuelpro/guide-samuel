'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, X, CheckCircle,
  XCircle, Trophy, RotateCcw, BookOpen, Zap
} from 'lucide-react';
import { getQuizQuestions } from '@/lib/quizData';
import { MODULES } from '@/lib/modules';

interface QuizProps {
  moduleId: number;
  onPass: () => void;
  onBack: () => void;
}

const PASS_THRESHOLD = 0.66;

export default function Quiz({ moduleId, onPass, onBack }: QuizProps) {
  const [questions, setQuestions] = useState(() => getQuizQuestions(moduleId));
  const module = MODULES.find((m) => m.id === moduleId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  // Results
  const correctCount = submitted
    ? answers.filter((a, i) => a === questions[i].correctIndex).length
    : 0;
  const passed = correctCount / questions.length >= PASS_THRESHOLD;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  const handleSelect = (optionIndex: number) => {
    if (showExplanation) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleConfirm = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (isLast) {
      setSubmitted(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleRetry = () => {
    const newQuestions = getQuizQuestions(moduleId); // nouveau set aléatoire anti-triche
    setQuestions(newQuestions);
    setAnswers(Array(5).fill(null));
    setCurrentIndex(0);
    setShowExplanation(false);
    setSubmitted(false);
  };

  if (!current && !submitted) return null;

  // Results screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5faf9] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="w-full max-w-md"
        >
          <div className="card p-8 text-center shadow-xl">
            {/* Score circle */}
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-4 ${
              passed
                ? 'border-green-400 bg-green-50'
                : 'border-orange-300 bg-orange-50'
            }`}>
              {passed ? (
                <Trophy size={36} className="text-green-600" />
              ) : (
                <RotateCcw size={36} className="text-orange-500" />
              )}
            </div>

            <h2 className={`text-2xl font-extrabold mb-2 ${passed ? 'text-green-700' : 'text-[#073b4c]'}`}>
              {passed ? 'Bravo, réussi !' : 'Presque ! Encore un effort'}
            </h2>

            {/* Score */}
            <div className="my-5">
              <div className={`text-5xl font-extrabold ${passed ? 'text-green-600' : 'text-[#6ba832]'}`}>
                {scorePercent}%
              </div>
              <p className="text-gray-500 text-sm mt-1">
                {correctCount}/{questions.length} bonne{correctCount > 1 ? 's' : ''} réponse{correctCount > 1 ? 's' : ''}
              </p>
            </div>

            {/* Per-question summary */}
            <div className="space-y-2 mb-6 text-left">
              {questions.map((q, i) => {
                const correct = answers[i] === q.correctIndex;
                return (
                  <div key={q.id} className={`flex items-start gap-2.5 p-3 rounded-xl border text-sm ${
                    correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    {correct
                      ? <CheckCircle size={15} className="text-green-600 shrink-0 mt-0.5" />
                      : <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                    }
                    <span className={`text-xs leading-relaxed ${correct ? 'text-green-800' : 'text-red-700'}`}>
                      Q{i+1} : {correct ? 'Correct' : `Réponse : ${q.options[q.correctIndex]}`}
                    </span>
                  </div>
                );
              })}
            </div>

            {passed ? (
              <div>
                <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-[#eef9de] rounded-xl border border-[#8bd346]/30">
                  <Zap size={16} className="text-[#6ba832]" />
                  <span className="text-sm font-bold text-[#073b4c]">+100 XP gagnés !</span>
                  <span className="text-xs text-gray-500">Badge «{module?.badgeLabel}» débloqué</span>
                </div>
                <button onClick={onPass} className="btn-primary w-full">
                  <CheckCircle size={17} />
                  Continuer vers le dashboard
                  <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button onClick={handleRetry} className="btn-primary w-full">
                  <RotateCcw size={17} />
                  Réessayer le quiz
                </button>
                <button onClick={onBack} className="btn-secondary w-full">
                  <BookOpen size={17} />
                  Revoir le module
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === current.correctIndex;

  return (
    <div className="min-h-screen bg-[#f5faf9] flex flex-col">
      {/* Header */}
      <div className="bg-[#073b4c] pt-4 pb-6">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-white/85 hover:text-white text-sm transition-colors min-h-0 p-0 bg-transparent border-none"
              aria-label="Retour au module"
            >
              <ArrowLeft size={16} />
              Retour
            </button>
            <div className="text-center">
              <p className="text-[10px] text-white/80 uppercase tracking-widest">Quiz — Module {moduleId}</p>
              <p className="text-white font-bold text-sm">{module?.title}</p>
            </div>
            <div className="text-right">
              <span className="text-[#6ba832] font-bold text-sm">{currentIndex + 1}</span>
              <span className="text-white/75 text-sm">/{questions.length}</span>
            </div>
          </div>
          {/* Progress */}
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#8bd346] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentIndex + (submitted ? 1 : 0)) / questions.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-4 pt-6 pb-10">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              {/* Question text */}
              <div className="card p-5 mb-4 shadow-md">
                <p className="text-[11px] font-bold text-[#6ba832] uppercase tracking-widest mb-2">
                  Question {currentIndex + 1} sur {questions.length}
                </p>
                <p className="text-[#073b4c] font-bold text-base leading-relaxed">
                  {current.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5 mb-4">
                {current.options.map((option, i) => {
                  let optClass = 'quiz-option';
                  if (showExplanation) {
                    if (i === current.correctIndex) optClass += ' correct';
                    else if (i === selectedAnswer) optClass += ' incorrect';
                  } else if (i === selectedAnswer) {
                    optClass += ' selected';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={optClass}
                      disabled={showExplanation}
                      aria-pressed={selectedAnswer === i}
                      aria-label={`Option ${String.fromCharCode(65+i)}: ${option}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                          showExplanation && i === current.correctIndex
                            ? 'border-green-500 bg-green-500 text-white'
                            : showExplanation && i === selectedAnswer && i !== current.correctIndex
                            ? 'border-red-400 bg-red-400 text-white'
                            : selectedAnswer === i
                            ? 'border-[#073b4c] bg-[#073b4c] text-white'
                            : 'border-gray-300 text-gray-400'
                        }`}>
                          {showExplanation && i === current.correctIndex ? (
                            <Check size={11} />
                          ) : showExplanation && i === selectedAnswer && i !== current.correctIndex ? (
                            <X size={11} />
                          ) : (
                            String.fromCharCode(65 + i)
                          )}
                        </span>
                        <span className="flex-1 text-left text-sm">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-xl p-4 mb-4 border ${
                      isCorrect
                        ? 'bg-green-50 border-green-200'
                        : 'bg-orange-50 border-orange-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {isCorrect
                        ? <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
                        : <XCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                      }
                      <div>
                        <p className={`text-xs font-bold mb-1 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                          {isCorrect ? 'Bonne réponse !' : 'Pas tout à fait…'}
                        </p>
                        <p className={`text-xs leading-relaxed ${isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
                          {current.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              {!showExplanation ? (
                <button
                  onClick={handleConfirm}
                  disabled={selectedAnswer === null}
                  className={`btn-primary w-full ${selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label="Valider la réponse"
                >
                  Valider ma réponse
                  <Check size={17} />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="btn-primary w-full"
                  aria-label={isLast ? 'Voir les résultats' : 'Question suivante'}
                >
                  {isLast ? (
                    <>Voir mes résultats <Trophy size={17} /></>
                  ) : (
                    <>Question suivante <ArrowRight size={17} /></>
                  )}
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
