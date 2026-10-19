import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BiblicalQuestion } from '../types';
import { getPopularQuestions } from '../data/questions';
import { QuestionCard } from './QuestionCard';
import { useLanguage } from '../context/LanguageContext';

interface PopularQuestionsSectionProps {
  onSelectQuestion: (question: BiblicalQuestion) => void;
  onExploreAll: () => void;
}

export const PopularQuestionsSection: React.FC<PopularQuestionsSectionProps> = ({
  onSelectQuestion,
  onExploreAll,
}) => {
  const { t } = useLanguage();
  const popularQuestions = getPopularQuestions();

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#1E3A8A] dark:text-[#D4AF37] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sélection Indispensable</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-['Playfair_Display',serif] tracking-tight">
            {t.popularQuestions}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
            {t.popularSubtitle}
          </p>
        </div>

        <button
          onClick={onExploreAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#1E3A8A] text-white hover:bg-[#172554] shadow-md transition-all transform active:scale-95 self-start md:self-end"
        >
          <span>{t.exploreBible}</span>
          <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>

      {/* 12 Questions Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {popularQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            onClick={() => onSelectQuestion(q)}
            featured={q.id <= 3}
          />
        ))}
      </div>
    </section>
  );
};
