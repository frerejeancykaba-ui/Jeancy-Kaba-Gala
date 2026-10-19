import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { BiblicalQuestion } from '../types';
import { searchQuestions } from '../data/questions';
import { VoiceSearchModal } from './VoiceSearchModal';

interface HeroSearchProps {
  onSelectQuestion: (question: BiblicalQuestion) => void;
  onCustomAiSearch: (query: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSelectQuestion,
  onCustomAiSearch,
}) => {
  const { t } = useLanguage();
  const { addSearchHistory } = useUser();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<BiblicalQuestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Quick suggestions chips
  const quickChips = [
    'Pourquoi Dieu permet-il la souffrance ?',
    'Comment être sauvé ?',
    'Qui est Jésus-Christ ?',
    'Comment pardonner à quelqu\'un qui m\'a blessé ?',
    'Dieu m\'a-t-il abandonné ?',
    'Que dit la Bible sur l\'argent ?',
  ];

  // Update suggestions as user types
  useEffect(() => {
    if (query.trim().length >= 2) {
      const results = searchQuestions(query.trim());
      setSuggestions(results.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    addSearchHistory(query.trim(), 'question');

    if (suggestions.length > 0) {
      // Pick first matching question
      onSelectQuestion(suggestions[0]);
    } else {
      // Trigger AI search
      onCustomAiSearch(query.trim());
    }
    setIsFocused(false);
  };

  const handleChipClick = (chipText: string) => {
    setQuery(chipText);
    addSearchHistory(chipText, 'question');
    const results = searchQuestions(chipText);
    if (results.length > 0) {
      onSelectQuestion(results[0]);
    } else {
      onCustomAiSearch(chipText);
    }
  };

  const handleVoiceConfirmed = (spokenQuery: string) => {
    setQuery(spokenQuery);
    const results = searchQuestions(spokenQuery);
    if (results.length > 0) {
      onSelectQuestion(results[0]);
    } else {
      onCustomAiSearch(spokenQuery);
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Decorative divine radiant aura in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#1E3A8A]/10 via-[#D4AF37]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] border border-[#1E3A8A]/15 dark:border-[#D4AF37]/30 mb-6 shadow-xs animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Plateforme Biblique Intelligente • 100 Questions & Réponses</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1F2937] dark:text-white font-['Playfair_Display',serif] tracking-tight leading-[1.15] mb-5">
          {t.heroTitle}
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-normal leading-relaxed mb-10">
          {t.heroSubtitle}
        </p>

        {/* Big Search Bar Container */}
        <div ref={searchContainerRef} className="relative max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center w-full p-2 rounded-2xl md:rounded-3xl bg-white dark:bg-[#111C3D] shadow-2xl shadow-[#1E3A8A]/10 dark:shadow-black/50 border-2 border-[#1E3A8A]/15 dark:border-[#D4AF37]/30 focus-within:border-[#1E3A8A] dark:focus-within:border-[#D4AF37] transition-all"
          >
            {/* Search Icon */}
            <div className="pl-3.5 pr-2 text-[#1E3A8A] dark:text-[#D4AF37]">
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            {/* Input field */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder={t.searchPlaceholder}
              className="w-full py-3 px-2 text-sm md:text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-transparent focus:outline-none"
            />

            {/* Voice Search Button */}
            <button
              type="button"
              onClick={() => setVoiceModalOpen(true)}
              className="p-2.5 rounded-full text-gray-500 hover:text-[#1E3A8A] dark:text-gray-400 dark:hover:text-[#D4AF37] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
              title="Poser ta question par la voix"
              aria-label="Recherche vocale"
            >
              <Mic className="w-5 h-5 text-[#D4AF37]" />
            </button>

            {/* Submit CTA Button */}
            <button
              type="submit"
              className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm bg-gradient-to-r from-[#1E3A8A] to-[#172554] text-white hover:from-[#172554] hover:to-[#0F172A] shadow-md shadow-[#1E3A8A]/20 transition-all transform active:scale-95 shrink-0"
            >
              <span>{t.findAnswer}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </form>

          {/* Mobile Submit Button */}
          <div className="mt-2 sm:hidden">
            <button
              onClick={() => handleSubmit()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-[#1E3A8A] text-white shadow-md active:scale-98"
            >
              <span>{t.findAnswer}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {isFocused && query.trim().length >= 2 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#111C3D] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-30 text-left overflow-hidden animate-in fade-in zoom-in-95">
              <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Questions vérifiées dans la base :
              </div>

              {suggestions.length > 0 ? (
                suggestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      onSelectQuestion(q);
                      setIsFocused(false);
                      setQuery('');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#1E3A8A]/5 dark:hover:bg-gray-800 flex items-start gap-3 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                  >
                    <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {q.question}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                        {q.shortAnswer}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Aucune question exacte dans la base des 100 questions.
                  </p>
                  <button
                    onClick={() => {
                      onCustomAiSearch(query.trim());
                      setIsFocused(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#1E3A8A] text-white hover:bg-[#172554] shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Demander une réponse personnalisée par l'IA Biblique</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Suggestions fréquentes :
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-[#111C3D] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/80 hover:border-[#1E3A8A] dark:hover:border-[#D4AF37] hover:text-[#1E3A8A] dark:hover:text-[#D4AF37] hover:bg-[#1E3A8A]/5 shadow-xs transition-all transform active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Search Modal */}
      <VoiceSearchModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onSearchConfirmed={handleVoiceConfirmed}
      />
    </section>
  );
};
