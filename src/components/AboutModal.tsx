import React from 'react';
import { X, Sparkles, MapPin, User, Heart, BookOpen, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrayer: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenPrayer,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111C3D] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden text-left flex flex-col max-h-[90vh]">
        {/* Header with Royal Blue Gradient */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#1E3A8A] via-[#172554] to-[#0F172A] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>À propos du projet</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Playfair_Display',serif] tracking-tight text-white mb-2">
            WHO'S GOD?
          </h2>
          <p className="text-sm sm:text-base text-gray-200 italic">
            « Toutes tes questions sur Dieu méritent une réponse fondée sur sa Parole. »
          </p>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {/* Identity & Origin Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-gray-400">Créateur & Visionnaire</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Jeancy KABA</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-gray-400">Origine du projet</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Kinshasa, RDC</p>
              </div>
            </div>
          </div>

          {/* Contact Direct & Intercession */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E3A8A]/10 to-[#D4AF37]/15 border border-[#1E3A8A]/20 dark:border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-xs">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">Contact & Ligne Pastorale</p>
                <p className="text-sm font-extrabold text-[#1E3A8A] dark:text-[#D4AF37]">+243 991 405 043</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:+243991405043"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#1E3A8A] text-white hover:bg-[#172554] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Appeler</span>
              </a>
              <a
                href="https://wa.me/243991405043"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              <span>Notre Mission</span>
            </h4>
            <p>
              Partager la connaissance de Dieu, l'amour manifesté en Jésus-Christ et les enseignements bibliques avec le monde entier.
              La plateforme a été pensée pour permettre à chacun de poser librement ses questions sur Dieu, la souffrance, le péché, le pardon, l'amour, le mariage, l'argent, la destinée, la mort et la vie éternelle sans tabou ni condamnation.
            </p>
          </div>

          {/* How it works */}
          <div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-[#1E3A8A] dark:text-[#D4AF37]" />
              <span>Une double technologie biblique</span>
            </h4>
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/40">
                <p className="text-xs font-bold text-blue-900 dark:text-blue-200">
                  1. Une base de 100 questions-réponses complètes vérifiées
                </p>
                <p className="text-xs text-blue-800/80 dark:text-blue-300 mt-0.5">
                  100 réponses complètes rédigées selon un standard théologique d'excellence avec versets exacts, récits bibliques historiques, applications pratiques et prières.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40">
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  2. Une intelligence artificielle biblique sécurisée côté serveur
                </p>
                <p className="text-xs text-amber-800/80 dark:text-amber-300 mt-0.5">
                  Pour toute question non présente dans la base, notre modèle IA entraîné et encadré répond en s'appuyant strictement sur les Écritures saintes.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile optimization for Kinshasa */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-900 dark:text-emerald-200">
              <strong>Optimisation Mobile & Connexion Locale :</strong> L'architecture de WHO'S GOD? a été optimisée avec un soin particulier pour charger rapidement même sur des smartphones Android et des connexions mobiles limitées à Kinshasa et en RDC.
            </p>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => {
                onClose();
                onOpenPrayer();
              }}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#1E3A8A] text-white hover:bg-[#172554] shadow-md transition-colors"
            >
              J'ai besoin de prière
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
