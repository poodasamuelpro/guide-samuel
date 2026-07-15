'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { sanitize, saveUser } from '@/lib/storage';
import { UserProfile } from '@/types';

interface OnboardingProps {
  onComplete: (user: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = 'Prénom requis';
    if (!lastName.trim()) e.lastName = 'Nom requis';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const user: UserProfile = {
      firstName: sanitize(firstName),
      lastName: sanitize(lastName),
      city: city ? sanitize(city) : undefined,
    };
    saveUser(user);
    onComplete(user);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a2a4a] to-[#0f1a2e] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
      >
        {/* Avatar & titre */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#f2994a] to-[#f5af4d] rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
            👋
          </div>
          <h1 className="text-2xl font-bold text-[#1a2a4a] mb-2">Bienvenue !</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            C'est Samuel. Avant de commencer, dis-moi comment t'appeler  --  je vais personnaliser ton guide.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Prénom */}
          <div>
            <label className="block text-sm font-semibold text-[#1a2a4a] mb-1">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={50}
              placeholder="Ex: Fatima"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-all
                ${errors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#f2994a]'}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-[#1a2a4a] mb-1">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              maxLength={50}
              placeholder="Ex: Ouédraogo"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-all
                ${errors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#f2994a]'}`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>

          {/* Ville (optionnel) */}
          <div>
            <label className="block text-sm font-semibold text-[#1a2a4a] mb-1">
              Ville <span className="text-gray-400 font-normal">(optionnel)</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              maxLength={50}
              placeholder="Ex: Ouagadougou"
              className="w-full border-2 border-gray-200 focus:border-[#f2994a] rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#f2994a] to-[#f5af4d] text-white font-bold py-4 rounded-xl text-base shadow-lg mt-2"
          >
            Commencer mon guide 🚀
          </motion.button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 Tes données restent sur ton téléphone  --  aucun envoi externe
        </p>
      </motion.div>
    </div>
  );
}
