import React, { useState } from 'react';
import {
  Crown,
  Cross,
  Sparkles,
  Flame,
  HeartCrack,
  HeartHandshake,
  Coins,
  ShieldCheck,
  Users,
  Hourglass,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { getQuestionsByCategory } from '../data/questions';
import { BiblicalQuestion } from '../types';
import { QuestionCard } from './QuestionCard';
import { useLanguage } from '../context/LanguageContext';

interface CategoriesViewProps {
  onSelectQuestion: (question: BiblicalQuestion) => void;
  initialCategoryId?: string;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onSelectQuestion,
  initialCategoryId,
}) => {
  const { language, t } = useLanguage();
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    initialCategoryId || 'dieu'
  );

  const iconMap: Record<string, React.ElementType> = {
    Crown,
    Cross,
    Sparkles,
    Flame,
    HeartCrack,
    HeartHandshake,
    Coins,
    ShieldCheck,
    Users,
    Hourglass,
  };

  const activeCategory =
    CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0];
  const categoryQuestions = getQuestionsByCategory(activeCategory.id);

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Classification Théologique</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white font-['Playfair_Display',serif] tracking-tight mb-3">
          {t.categoriesTitle}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          {t.categoriesSubtitle}
        </p>
      </div>

      {/* Grid of 10 Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
        {CATEGORIES.map((cat) => {
          const IconComp = iconMap[cat.iconName] || BookOpen;
          const isSelected = activeCategoryId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md shadow-[#1E3A8A]/25 scale-102 dark:bg-[#D4AF37] dark:text-[#0B132B] dark:border-[#D4AF37]'
                  : 'bg-white dark:bg-[#111C3D] text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-800 hover:border-[#1E3A8A]/40 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <IconComp
                  className={`w-5 h-5 ${
                    isSelected
                      ? 'text-[#D4AF37] dark:text-[#0B132B]'
                      : 'text-[#1E3A8A] dark:text-[#D4AF37]'
                  }`}
                />
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white dark:bg-black/20 dark:text-[#0B132B]'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  {cat.order}/10
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold truncate">
                  {language === 'ln' ? cat.titleLn : language === 'en' ? cat.titleEn : cat.title}
                </p>
                <p
                  className={`text-[10px] ${
                    isSelected ? 'text-white/80 dark:text-black/70' : 'text-gray-400'
                  }`}
                >
                  10 questions
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Category Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-800 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] dark:text-[#D4AF37] block mb-1">
            Catégorie N° {activeCategory.order} sur 10
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-['Playfair_Display',serif]">
            {language === 'ln'
              ? activeCategory.titleLn
              : language === 'en'
              ? activeCategory.titleEn
              : activeCategory.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-2xl">
            {language === 'ln' ? activeCategory.descriptionLn : activeCategory.description}
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] text-xs font-bold shrink-0">
          10 réponses bibliques
        </div>
      </div>

      {/* Questions list for selected category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categoryQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            onClick={() => onSelectQuestion(q)}
          />
        ))}
      </div>
    </div>
  );
};
