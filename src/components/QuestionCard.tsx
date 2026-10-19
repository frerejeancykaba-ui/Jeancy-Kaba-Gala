import React from 'react';
import { Bookmark, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { BiblicalQuestion } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';

interface QuestionCardProps {
  question: BiblicalQuestion;
  onClick: () => void;
  featured?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onClick,
  featured = false,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { language } = useLanguage();
  const favorite = isFavorite(question.id);

  const displayQuestion =
    language === 'ln' && question.questionLn
      ? question.questionLn
      : language === 'en' && question.questionEn
      ? question.questionEn
      : question.question;

  const displayAnswer =
    language === 'ln' && question.shortAnswerLn
      ? question.shortAnswerLn
      : language === 'en' && question.shortAnswerEn
      ? question.shortAnswerEn
      : question.shortAnswer;

  const firstPassage = question.biblicalPassages[0];

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-200 border text-left bg-white dark:bg-[#111C3D] hover:-translate-y-1 ${
        featured
          ? 'border-[#1E3A8A]/30 dark:border-[#D4AF37]/40 shadow-lg shadow-[#1E3A8A]/5 hover:shadow-xl dark:shadow-black/40'
          : 'border-gray-200/80 dark:border-gray-800 shadow-xs hover:shadow-md hover:border-[#1E3A8A]/30 dark:hover:border-[#D4AF37]/30'
      }`}
    >
      <div>
        {/* Top Badges & Favorite Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37]">
            <BookOpen className="w-3 h-3" />
            <span>N° {question.id}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(question.id);
            }}
            className={`p-1.5 rounded-full transition-colors ${
              favorite
                ? 'text-[#D4AF37] bg-[#D4AF37]/15'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Bookmark className={`w-4 h-4 ${favorite ? 'fill-[#D4AF37]' : ''}`} />
          </button>
        </div>

        {/* Question Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-2 font-['Playfair_Display',serif]">
          {displayQuestion}
        </h3>

        {/* Short Answer Preview */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed mb-4">
          {displayAnswer}
        </p>
      </div>

      {/* Footer Info: First verse reference + read CTA */}
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
        {firstPassage ? (
          <span className="font-semibold text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
            {firstPassage.book} {firstPassage.chapter}:{firstPassage.verses}
          </span>
        ) : (
          <span className="font-semibold text-gray-400">Parole de Dieu</span>
        )}

        <div className="flex items-center gap-1 font-bold text-[#1E3A8A] dark:text-[#D4AF37] group-hover:translate-x-1 transition-transform">
          <span>Lire la réponse</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
