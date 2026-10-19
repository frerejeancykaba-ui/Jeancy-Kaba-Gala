import React, { useState } from 'react';
import { Share2, Check, Sparkles, BookOpen, Quote, MessageCircle, Copy } from 'lucide-react';
import { VerseOfTheDay } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface VerseOfTheDayCardProps {
  verse: VerseOfTheDay;
  onExploreTheme?: (theme: string) => void;
}

export const VerseOfTheDayCard: React.FC<VerseOfTheDayCardProps> = ({
  verse,
  onExploreTheme,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const formattedReference = `${verse.book} ${verse.chapter}:${verse.verse}`;
  const shareText = `« ${verse.text} » — ${formattedReference}\n(Via WHO'S GOD? — Toutes tes questions sur Dieu méritent une réponse)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setShareMenuOpen(false);
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
      shareText
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setShareMenuOpen(false);
  };

  return (
    <section className="relative my-10 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#172554] to-[#0F172A] p-6 sm:p-10 text-white shadow-2xl shadow-[#1E3A8A]/25 border border-[#D4AF37]/30">
        {/* Subtle golden corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2563EB]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Tag */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.verseOfDayTitle}</span>
          </div>

          <span className="text-xs font-medium text-gray-300">
            {verse.theme}
          </span>
        </div>

        {/* Quote symbol & Verse Text */}
        <div className="relative mb-6">
          <Quote className="w-10 h-10 text-[#D4AF37]/30 absolute -top-4 -left-2 -z-0" />
          <blockquote className="relative z-10 text-lg sm:text-2xl md:text-3xl font-bold font-['Playfair_Display',serif] leading-relaxed text-gray-100">
            « {verse.text} »
          </blockquote>
        </div>

        {/* Biblical Reference Badge */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 pb-2">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#D4AF37]">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>{formattedReference}</span>
            <span className="text-xs text-gray-400 font-normal hidden sm:inline">
              (Louis Segond 1910)
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Share dropdown */}
            <div className="relative">
              <button
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Partager le verset"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.share}</span>
              </button>

              {shareMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShareMenuOpen(false)}
                  />
                  <div className="absolute right-0 bottom-full mb-2 w-48 rounded-xl bg-white dark:bg-[#111C3D] text-gray-800 dark:text-gray-100 shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50 overflow-hidden">
                    <button
                      onClick={handleWhatsAppShare}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>{t.shareWhatsApp}</span>
                    </button>
                    <button
                      onClick={handleFacebookShare}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-blue-600" />
                      <span>{t.shareFacebook}</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-t border-gray-100 dark:border-gray-700"
                    >
                      <Copy className="w-4 h-4 text-[#D4AF37]" />
                      <span>{t.copyVerse}</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#D4AF37] text-[#1E3A8A] hover:bg-[#E5C158] transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.copyVerse}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Accordion to read explanation & context */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>{showExplanation ? 'Masquer la méditation' : 'Lire la méditation du passage'}</span>
            <span className="text-[#D4AF37]">{showExplanation ? '▲' : '▼'}</span>
          </button>

          {showExplanation && (
            <div className="mt-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-200 space-y-2 animate-in fade-in">
              <p>
                <strong className="text-[#D4AF37]">Signification :</strong>{' '}
                {verse.explanation}
              </p>
              <p className="text-gray-300 text-[11px] sm:text-xs">
                <strong className="text-[#D4AF37]">Contexte biblique :</strong>{' '}
                {verse.context}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
