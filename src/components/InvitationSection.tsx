import React from 'react';
import { BookOpen, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InvitationSectionProps {
  onExplore: () => void;
  onOpenPrayer: () => void;
  onExplorePassages?: () => void;
}

export const InvitationSection: React.FC<InvitationSectionProps> = ({
  onExplore,
  onOpenPrayer,
  onExplorePassages,
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 text-center">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-[#1E3A8A] via-[#172554] to-[#0F172A] p-8 sm:p-12 md:p-16 text-white shadow-2xl border border-[#D4AF37]/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Invitation Personnelle</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-['Playfair_Display',serif] tracking-tight leading-tight">
            « Aucune question sincère n'est trop petite pour commencer à chercher Dieu. »
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 font-normal leading-relaxed max-w-2xl mx-auto">
            Que tu sois croyant depuis des années ou en quête de vérité pour la première fois, la Parole de Dieu offre un éclairage vivant, profond et transformateur pour ton cœur.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-[#D4AF37] text-[#1E3A8A] hover:bg-[#E5C158] shadow-lg shadow-[#D4AF37]/25 transition-all transform active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.exploreBible}</span>
            </button>

            {onExplorePassages && (
              <button
                onClick={onExplorePassages}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-white/15 hover:bg-white/25 text-white border border-white/25 transition-all transform active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>Explorer les Passages Bibliques</span>
              </button>
            )}

            <button
              onClick={onOpenPrayer}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all transform active:scale-95"
            >
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              <span>J'ai besoin de prière</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
