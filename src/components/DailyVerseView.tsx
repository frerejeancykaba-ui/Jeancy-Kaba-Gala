import React, { useState } from 'react';
import { Sparkles, BookOpen, Quote, Share2, Copy, Check, Calendar, ArrowRight } from 'lucide-react';
import { DAILY_VERSES, getVerseOfTheDay } from '../data/verses';
import { VerseOfTheDay } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const DailyVerseView: React.FC = () => {
  const { t } = useLanguage();
  const todayVerse = getVerseOfTheDay();
  const [selectedVerse, setSelectedVerse] = useState<VerseOfTheDay>(todayVerse);
  const [copied, setCopied] = useState(false);

  const formattedReference = `${selectedVerse.book} ${selectedVerse.chapter}:${selectedVerse.verse}`;
  const shareText = `« ${selectedVerse.text} » — ${formattedReference}\n(Via WHO'S GOD? — Toutes tes questions sur Dieu méritent une réponse)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#1E3A8A] dark:text-[#D4AF37] mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Nourriture Quotidienne de l'Âme</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white font-['Playfair_Display',serif] tracking-tight mb-3">
          La Parole du Jour
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Chaque jour, un verset biblique inspiré sélectionné de manière déterministe pour guider et fortifier tes pensées.
        </p>
      </div>

      {/* Main Big Verse Display Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#172554] to-[#0F172A] p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/40 mb-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
              {selectedVerse.theme}
            </span>
            <span className="text-xs text-gray-300">Traduction Louis Segond 1910</span>
          </div>

          <div className="relative">
            <Quote className="w-12 h-12 text-[#D4AF37]/25 absolute -top-4 -left-3" />
            <blockquote className="relative z-10 text-xl sm:text-3xl md:text-4xl font-bold font-['Playfair_Display',serif] leading-relaxed text-gray-100">
              « {selectedVerse.text} »
            </blockquote>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="text-lg sm:text-xl font-bold text-[#D4AF37] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
              <span>{formattedReference}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleWhatsAppShare}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#D4AF37] text-[#1E3A8A] hover:bg-[#E5C158] shadow-xs transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-gray-200">
            <p>
              <strong className="text-[#D4AF37]">Explication spirituelle :</strong>{' '}
              {selectedVerse.explanation}
            </p>
            <p className="text-gray-300 text-xs">
              <strong className="text-[#D4AF37]">Contexte historique :</strong>{' '}
              {selectedVerse.context}
            </p>
          </div>
        </div>
      </div>

      {/* Other Curated Verses Pool */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Playfair_Display',serif]">
          Autres versets réconfortants du répertoire vérifié
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {DAILY_VERSES.map((v) => {
            const isSelected = selectedVerse.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVerse(v)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md dark:bg-[#D4AF37] dark:text-[#0B132B]'
                    : 'bg-white dark:bg-[#111C3D] text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-800 hover:border-[#1E3A8A]/40'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 opacity-75">
                  {v.theme}
                </span>
                <p className="text-xs font-bold text-[#D4AF37] dark:text-[#1E3A8A] mb-1">
                  {v.book} {v.chapter}:{v.verse}
                </p>
                <p className="text-xs line-clamp-2 leading-relaxed opacity-90">
                  « {v.text} »
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
