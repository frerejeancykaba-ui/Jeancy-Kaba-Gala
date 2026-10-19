import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { BiblicalQuestion } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: BiblicalQuestion) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
}) => {
  const { favoriteQuestions, removeFavorite } = useFavorites();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0B132B] shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col h-full animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800 bg-[#F8F5EF] dark:bg-[#111C3D]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
              <Bookmark className="w-5 h-5 fill-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                {t.favorites}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {favoriteQuestions.length} réponse{favoriteQuestions.length > 1 ? 's' : ''} enregistrée{favoriteQuestions.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {favoriteQuestions.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                <Bookmark className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Aucun favori pour le moment
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                Clique sur l'icône de marque-page sur n'importe quelle question pour l'enregistrer dans ton navigateur et la retrouver à tout moment sans compte.
              </p>
            </div>
          ) : (
            favoriteQuestions.map((q) => (
              <div
                key={q.id}
                className="group relative p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700 hover:border-[#1E3A8A] dark:hover:border-[#D4AF37] transition-all text-left"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A8A] dark:text-[#D4AF37]">
                    Question N° {q.id}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(q.id);
                    }}
                    className="p-1 rounded text-gray-400 hover:text-red-500 transition-colors"
                    title="Supprimer des favoris"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4
                  onClick={() => {
                    onSelectQuestion(q);
                    onClose();
                  }}
                  className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-[#D4AF37] cursor-pointer line-clamp-2 mb-1"
                >
                  {q.question}
                </h4>

                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  {q.shortAnswer}
                </p>

                <button
                  onClick={() => {
                    onSelectQuestion(q);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1E3A8A] dark:text-[#D4AF37] hover:underline"
                >
                  <span>Consulter la réponse</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
