import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Sparkles, Bot, Layers } from 'lucide-react';
import { BiblicalQuestion } from '../types';
import { ALL_QUESTIONS } from '../data/questions';
import { CATEGORIES } from '../data/categories';
import { QuestionCard } from './QuestionCard';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

interface ExploreViewProps {
  onSelectQuestion: (question: BiblicalQuestion) => void;
  onCustomAiSearch: (query: string) => void;
  initialCategoryId?: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onSelectQuestion,
  onCustomAiSearch,
  initialCategoryId,
}) => {
  const { t, language } = useLanguage();
  const { addSearchHistory } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryId || 'all');

  const filteredQuestions = useMemo(() => {
    let list = ALL_QUESTIONS;

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((q) => q.categoryId === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim().length > 0) {
      const qNorm = searchQuery
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      list = list.filter((item) => {
        const itemQ = item.question
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const itemShort = item.shortAnswer
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const itemPassages = item.biblicalPassages
          .map((p) => `${p.book} ${p.text}`)
          .join(' ')
          .toLowerCase();

        return (
          itemQ.includes(qNorm) ||
          itemShort.includes(qNorm) ||
          itemPassages.includes(qNorm)
        );
      });
    }

    return list;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Base de données intégrale</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white font-['Playfair_Display',serif] tracking-tight mb-3">
          {t.all100Questions}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Explore les 100 réponses bibliques complètes réparties dans les 10 grandes thématiques de la vie et de la foi.
        </p>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="space-y-4 mb-8">
        {/* Search input */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                addSearchHistory(searchQuery.trim(), 'question');
              }
            }}
            placeholder="Filtrer les 100 questions (ex : pardon, souffrance, mariage, argent...)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700 text-sm md:text-base text-gray-900 dark:text-white focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#D4AF37] shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#1E3A8A] text-white dark:bg-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'bg-white dark:bg-[#111C3D] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100'
            }`}
          >
            Toutes les questions ({ALL_QUESTIONS.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1E3A8A] text-white dark:bg-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                  : 'bg-white dark:bg-[#111C3D] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100'
              }`}
            >
              {language === 'ln' ? cat.titleLn : language === 'en' ? cat.titleEn : cat.title} (10)
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between mb-6 text-xs text-gray-500 dark:text-gray-400">
        <span className="font-semibold">
          Affichage de {filteredQuestions.length} question{filteredQuestions.length > 1 ? 's' : ''} sur 100
        </span>

        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-[#1E3A8A] dark:text-[#D4AF37] font-semibold hover:underline"
          >
            Réinitialiser le filtre
          </button>
        )}
      </div>

      {/* Questions Cards Grid */}
      {filteredQuestions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onClick={() => onSelectQuestion(q)}
            />
          ))}
        </div>
      ) : (
        /* Empty State with AI prompt */
        <div className="text-center py-16 bg-white dark:bg-[#111C3D] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] flex items-center justify-center">
            <Bot className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {t.noResults}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Cette question précise ne figure pas textuellement dans notre base de 100 questions. Tu peux la soumettre directement à notre intelligence artificielle biblique pour obtenir une réponse fondée sur la Parole.
          </p>
          <button
            onClick={() => onCustomAiSearch(searchQuery)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-[#1E3A8A] text-white hover:bg-[#172554] shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Poser « {searchQuery} » à l'IA Biblique</span>
          </button>
        </div>
      )}
    </div>
  );
};
