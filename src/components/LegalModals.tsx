import React from 'react';
import { X, Shield, FileText, Lock } from 'lucide-react';

export type LegalModalType = 'mentions' | 'privacy' | 'terms' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111C3D] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden text-left flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-[#F8F5EF] dark:bg-[#0B132B]">
          <div className="flex items-center gap-2.5">
            {type === 'mentions' && <FileText className="w-5 h-5 text-[#1E3A8A] dark:text-[#D4AF37]" />}
            {type === 'privacy' && <Lock className="w-5 h-5 text-emerald-600" />}
            {type === 'terms' && <Shield className="w-5 h-5 text-blue-600" />}
            <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
              {type === 'mentions' && 'Mentions Légales'}
              {type === 'privacy' && 'Politique de Confidentialité'}
              {type === 'terms' && 'Conditions Générales d\'Utilisation'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {type === 'mentions' && (
            <>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Édition de la plateforme</h4>
              <p>
                La plateforme web <strong>WHO'S GOD?</strong> est une initiative spirituelle, éducative et chrétienne conçue et développée par <strong>Jeancy KABA</strong>, résidant à Kinshasa, République démocratique du Congo (RDC).
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Contact téléphonique & WhatsApp :</strong> <a href="tel:+243991405043" className="text-[#1E3A8A] dark:text-[#D4AF37] font-semibold hover:underline">+243 991 405 043</a> • <strong>Email :</strong> <a href="mailto:frerejeancykaba@gmail.com" className="hover:underline">frerejeancykaba@gmail.com</a>
              </p>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Textes et citations bibliques</h4>
              <p>
                Les citations bibliques intégrales reproduites sur la plateforme proviennent de traductions du domaine public, notamment la Bible <strong>Louis Segond (1910)</strong>. Les commentaires et explications théologiques ont été rédigés pour rendre la foi chrétienne accessible au plus grand nombre.
              </p>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Hébergement & Technologies</h4>
              <p>
                L'application est déployée sur une infrastructure infonuagique sécurisée et réactive, conforme aux normes internationales de disponibilité et de protection réseau.
              </p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Respect absolu de votre vie privée</h4>
              <p>
                WHO'S GOD? a été conçue pour garantir l'anonymat et la paix d'esprit des personnes qui cherchent Dieu :
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Aucun compte requis :</strong> Vous pouvez consulter l'intégralité des 100 questions et réponses et enregistrer vos favoris sans jamais créer de compte ni fournir d'adresse email.
                </li>
                <li>
                  <strong>Stockage local (LocalStorage) :</strong> Vos préférences de thème (clair/sombre), de langue et vos questions favorites sont stockées uniquement dans votre navigateur sur votre propre appareil.
                </li>
                <li>
                  <strong>Demandes de prière :</strong> Les intentions de prière envoyées via notre formulaire sont traitées avec la plus stricte confidentialité pastorale. Elles ne sont jamais revendues, transmises à des tiers ou indexées sur les moteurs de recherche.
                </li>
                <li>
                  <strong>Aucun traceur publicitaire intrusif :</strong> Nous ne commercialisons aucune donnée personnelle.
                </li>
              </ul>
            </>
          )}

          {type === 'terms' && (
            <>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Acceptation des conditions</h4>
              <p>
                L'utilisation de la plateforme <strong>WHO'S GOD?</strong> implique l'acceptation pleine et entière des présentes conditions d'utilisation. La plateforme a pour objet le partage de la Parole de Dieu, de l'espérance et de la foi chrétienne.
              </p>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Règles d'utilisation</h4>
              <p>
                Chaque utilisateur s'engage à utiliser le service dans un esprit de respect et de sincérité. Sont strictement interdits : tout propos haineux, diffamatoire ou contraire aux lois en vigueur, ainsi que toute tentative de piratage du service ou des API connectées.
              </p>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Avertissement pastoral</h4>
              <p>
                Les conseils et réponses apportés par la plateforme et son moteur biblique relèvent de l'édification spirituelle et religieuse. Ils ne se substituent pas à un avis médical, psychiatrique, juridique ou financier professionnel.
              </p>
            </>
          )}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1E3A8A] text-white hover:bg-[#172554] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
