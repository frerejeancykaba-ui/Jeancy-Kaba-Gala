import React from 'react';
import { Heart, Sparkles, BookOpen, ShieldCheck, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useLanguage } from '../context/LanguageContext';
import { LegalModalType } from './LegalModals';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenLegalModal: (type: LegalModalType) => void;
  onOpenAbout: () => void;
  onOpenPrayer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenLegalModal,
  onOpenAbout,
  onOpenPrayer,
}) => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#111C3D] text-gray-300 border-t border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Presentation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#1E3A8A] font-extrabold shadow-md">
                <svg
                  viewBox="0 0 100 100"
                  className="w-5 h-5 text-[#1E3A8A]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                >
                  <path d="M50 16 L50 84 M28 38 L72 38" />
                  <circle cx="50" cy="38" r="4" fill="currentColor" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-['Playfair_Display',serif]">
                WHO'S GOD?
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              « Toutes tes questions sur Dieu méritent une réponse fondée sur sa Parole. »
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Kinshasa, République démocratique du Congo</span>
            </div>

            <div className="space-y-1.5 pt-0.5">
              <a
                href="tel:+243991405043"
                className="flex items-center gap-2 text-xs text-gray-300 hover:text-[#D4AF37] transition-colors group"
                title="Appeler le numéro de contact"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className="font-semibold">+243 991 405 043</span>
              </a>

              <a
                href="https://wa.me/243991405043"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors group"
                title="Écrire sur WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium">WhatsApp : +243 991 405 043</span>
              </a>
            </div>

            <button
              onClick={onOpenPrayer}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#D4AF37] text-[#1E3A8A] hover:bg-[#E5C158] transition-colors shadow-xs"
            >
              <Heart className="w-3.5 h-3.5 fill-[#1E3A8A]" />
              <span>J'ai besoin de prière</span>
            </button>
          </div>

          {/* Col 2: Categories (1 to 5) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Thèmes Bibliques (1)
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-[#D4AF37] transition-colors text-left flex items-center gap-1.5"
                  >
                    <span className="text-gray-500">•</span>
                    <span>
                      {language === 'ln' ? cat.titleLn : language === 'en' ? cat.titleEn : cat.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories (6 to 10) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Thèmes Bibliques (2)
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(5, 10).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-[#D4AF37] transition-colors text-left flex items-center gap-1.5"
                  >
                    <span className="text-gray-500">•</span>
                    <span>
                      {language === 'ln' ? cat.titleLn : language === 'en' ? cat.titleEn : cat.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform, Legal & Project */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Plateforme & Mentions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  À propos de la plateforme
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('mentions')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {t.legal}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('privacy')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {t.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('terms')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {t.terms}
                </button>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-gray-500 leading-normal">
              Traduction biblique de référence : <strong>Louis Segond (1910)</strong> libre de droits.
            </div>
          </div>
        </div>

        {/* Creator Solemn Notice */}
        <div className="pt-8 border-t border-gray-800 text-center space-y-2">
          <p className="text-xs sm:text-sm font-medium text-gray-300">
            « Créé par <strong className="text-[#D4AF37]">Jeancy KABA</strong> à Kinshasa, RDC, pour partager la connaissance et l'amour de Dieu manifesté en Jésus-Christ notre Seigneur. »
          </p>

          <p className="text-[11px] text-gray-500">
            © {currentYear} WHO'S GOD? — Tous droits réservés. Aucune question sincère n'est trop petite pour chercher Dieu.
          </p>
        </div>
      </div>
    </footer>
  );
};
