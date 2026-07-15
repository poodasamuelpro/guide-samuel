'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, MapPin, Shield, CheckCircle, Package } from 'lucide-react';
import { saveUser } from '@/lib/storage';
import { sanitize } from '@/lib/storage';
import { UserProfile } from '@/types';
import { GSLogo } from './Logo';

interface OnboardingProps {
  onComplete: (user: UserProfile) => void;
}

const TIPS = [
  'Apprendre à choisir les bons produits',
  'Gérer les taxes douanières',
  'Utiliser AliExpress ou Alibaba',
  'Vendre sur Facebook & WhatsApp',
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanFirst = sanitize(firstName.trim(), 40);
    const cleanLast = sanitize(lastName.trim(), 40);
    const cleanCity = sanitize(city.trim(), 40);

    if (cleanFirst.length < 2) {
      setError('Veuillez entrer votre prénom (au moins 2 caractères).');
      return;
    }
    if (cleanLast.length < 2) {
      setError('Veuillez entrer votre nom (au moins 2 caractères).');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user: UserProfile = {
        firstName: cleanFirst,
        lastName: cleanLast,
        city: cleanCity || undefined,
      };
      saveUser(user);
      onComplete(user);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <GSLogo size={56} />
            </div>
            <h1 className="text-2xl font-extrabold text-[#1a2a4a] tracking-tight">
              Bienvenue dans la formation !
            </h1>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Personnalisons votre expérience. Vos informations restent 
              sur votre appareil — aucun serveur.
            </p>
          </div>

          {/* What you'll learn */}
          <div className="bg-[#1a2a4a] rounded-2xl p-4 mb-6">
            <p className="text-xs font-semibold text-[#f2994a] uppercase tracking-widest mb-3">
              Ce que vous allez apprendre
            </p>
            <div className="grid grid-cols-2 gap-2">
              {TIPS.map((tip) => (
                <div key={tip} className="flex items-start gap-2">
                  <CheckCircle size={13} className="text-[#f2994a] shrink-0 mt-0.5" />
                  <span className="text-xs text-white/70 leading-tight">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className="card p-6 shadow-md">
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                {/* Prénom */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-[#1a2a4a] mb-1.5"
                  >
                    Prénom <span className="text-[#f2994a]">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ex: Samuel"
                      maxLength={40}
                      autoComplete="given-name"
                      required
                      className="sim-input pl-9"
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* Nom */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-[#1a2a4a] mb-1.5"
                  >
                    Nom <span className="text-[#f2994a]">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Ex: Ouédraogo"
                      maxLength={40}
                      autoComplete="family-name"
                      required
                      className="sim-input pl-9"
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* Ville (optionnel) */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-[#1a2a4a] mb-1.5"
                  >
                    Ville{' '}
                    <span className="text-gray-400 font-normal text-xs">(optionnel)</span>
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Ouagadougou"
                      maxLength={40}
                      autoComplete="address-level2"
                      className="sim-input pl-9"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-2"
                  aria-label="Commencer la formation"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Préparation…</span>
                    </>
                  ) : (
                    <>
                      <Package size={17} />
                      Commencer la formation
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Privacy note */}
            <div className="flex items-start gap-2 mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <Shield size={14} className="text-green-600 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                Vos données (prénom, nom, ville) sont uniquement stockées sur votre appareil. 
                Aucun serveur, aucun envoi extérieur.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
