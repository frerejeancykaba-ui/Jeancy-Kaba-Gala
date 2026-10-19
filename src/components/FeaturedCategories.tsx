import React from 'react';
import {
  Crown,
  Cross,
  Sparkles,
  HeartHandshake,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FeaturedCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
  onExploreAll: () => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  onSelectCategory,
  onExploreAll,
}) => {
  const { t } = useLanguage();

  const featuredCards = [
    {
      id: 'dieu',
      title: '1. DIEU',
      subtitle: 'Qui est Dieu ? Comment le connaître ?',
      description: 'Découvre sa nature souveraine, sa présence éternelle et son amour infini.',
      icon: Crown,
      color: 'from-blue-600 to-indigo-800',
      badgeColor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300',
    },
    {
      id: 'jesus',
      title: '2. JÉSUS-CHRIST',
      subtitle: 'Pourquoi Jésus est-il mort et ressuscité ?',
      description: 'Le salut par la croix, la puissance de la résurrection et son appel pour ta vie.',
      icon: Cross,
      color: 'from-amber-600 to-yellow-700',
      badgeColor: 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-[#D4AF37]',
    },
    {
      id: 'foi-salut',
      title: '3. FOI ET PRIÈRE',
      subtitle: 'Comment croire et développer sa relation avec Dieu ?',
      description: 'Recevoir le salut par grâce, grandir dans l\'espérance et prier avec puissance.',
      icon: Sparkles,
      color: 'from-emerald-600 to-teal-800',
      badgeColor: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
    {
      id: 'amour-mariage',
      title: '4. AMOUR ET MARIAGE',
      subtitle: 'Que dit la Bible sur les relations et le mariage ?',
      description: 'Le véritable amour agapé, le choix du conjoint, la fidélité et la vie de couple.',
      icon: HeartHandshake,
      color: 'from-rose-600 to-pink-800',
      badgeColor: 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300',
    },
    {
      id: 'argent-travail',
      title: '5. VIE QUOTIDIENNE',
      subtitle: 'Comment affronter les difficultés, le travail et l\'argent ?',
      description: 'Sagesse financière, éthique du travail, gestion du stress et vraie réussite.',
      icon: Briefcase,
      color: 'from-cyan-600 to-blue-800',
      badgeColor: 'text-cyan-700 bg-cyan-50 dark:bg-cyan-950/60 dark:text-cyan-300',
    },
    {
      id: 'peche-pardon',
      title: '6. PÉCHÉ ET PARDON',
      subtitle: 'Comment obtenir le pardon et recommencer ?',
      description: 'Briser la culpabilité, vaincre la colère et goûter au pardon libérateur du Christ.',
      icon: ShieldCheck,
      color: 'from-purple-600 to-violet-800',
      badgeColor: 'text-purple-700 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300',
    },
  ];

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Grandes Thématiques</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-['Playfair_Display',serif] tracking-tight">
            Explore la Bible par Catégories
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
            Clique sur l'une des six cartes thématiques pour accéder directement aux réponses bibliques correspondantes.
          </p>
        </div>

        <button
          onClick={onExploreAll}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#1E3A8A] dark:text-[#D4AF37] hover:underline self-start md:self-end"
        >
          <span>Voir toutes les 10 catégories</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelectCategory(card.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory(card.id);
                }
              }}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-[#111C3D] border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-[#1E3A8A]/30 dark:hover:border-[#D4AF37]/40 transition-all duration-200 cursor-pointer hover:-translate-y-1 text-left"
            >
              <div>
                {/* Icon Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md bg-gradient-to-br ${card.color} text-white transition-transform group-hover:scale-110`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${card.badgeColor}`}>
                    10 questions
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-[#D4AF37] transition-colors mb-1 font-['Playfair_Display',serif]">
                  {card.title}
                </h3>

                <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 leading-snug">
                  {card.subtitle}
                </h4>

                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-[#1E3A8A] dark:text-[#D4AF37]">
                <span>Explorer ce thème</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
