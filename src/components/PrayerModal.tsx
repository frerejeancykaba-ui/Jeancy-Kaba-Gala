import React, { useState } from 'react';
import {
  X,
  Heart,
  Send,
  MessageCircle,
  Shield,
  CheckCircle2,
  AlertCircle,
  Lock,
  Phone,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerModal: React.FC<PrayerModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Paix intérieure & Réconfort');
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [sendVia, setSendVia] = useState<'server' | 'whatsapp'>('server');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Pastor/Intercession phone number in Kinshasa, RDC
  const PASTOR_WHATSAPP_NUMBER = '243991405043';
  const FORMATTED_PHONE = '+243 991 405 043';

  if (!isOpen) return null;

  const prayerTopics = [
    'Paix intérieure & Réconfort',
    'Santé et Guérison',
    'Famille et Foyer',
    'Délivrance & Combat spirituel',
    'Travail, Emploi & Finances',
    'Salut & Foi en Jésus-Christ',
    'Mariage & Vie affective',
    'Autre sujet de prière',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMessage('Veuillez décrire brièvement votre sujet de prière.');
      return;
    }

    if (sendVia === 'whatsapp') {
      const formattedMessage = `*DEMANDE DE PRIÈRE — WHO'S GOD?*\n*Nom :* ${name.trim() || 'Anonyme'}\n*Sujet :* ${topic}\n*Message :*\n${message.trim()}\n\n_« Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos. » (Matthieu 11:28)_`;
      const url = `https://wa.me/${PASTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(
        formattedMessage
      )}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setStatus('success');
      return;
    }

    // Send to secure server endpoint
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          topic,
          message: message.trim(),
          isPrivate,
        }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l\'envoi de la requête au serveur.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(
        'Impossible de transmettre la demande au serveur pour le moment. Vous pouvez l\'envoyer directement via WhatsApp.'
      );
    }
  };

  const handleReset = () => {
    setName('');
    setMessage('');
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#111C3D] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden text-left flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#1E3A8A] to-[#172554] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Heart className="w-4 h-4 fill-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">J'ai besoin de prière</h3>
              <p className="text-[11px] text-gray-300">
                « Priez les uns pour les autres afin que vous soyez guéris » (Jacques 5:16)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto">
          {status === 'success' ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                Demande de prière transmise !
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
                Sois fortifié(e) : notre équipe s'accorde dans la prière pour ta situation. Dieu connaît le cri de ton âme et sa fidélité est grande.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 italic">
                « Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières... Et la paix de Dieu gardera vos cœurs. » (Philippiens 4:6-7)
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#1E3A8A] text-white hover:bg-[#172554] shadow-md transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Optional Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Ton prénom <span className="text-gray-400 font-normal lowercase">(facultatif)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Esther, David, ou laisse vide pour l'anonymat"
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#D4AF37] text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Topic Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Sujet de prière *
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#D4AF37] text-gray-900 dark:text-gray-100"
                >
                  {prayerTopics.map((tItem, idx) => (
                    <option key={idx} value={tItem}>
                      {tItem}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Ton message ou intention de prière *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décris avec tes mots ce qui pèse sur ton cœur afin que nous puissions prier pour toi..."
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#D4AF37] text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Mode choice: WhatsApp or Secure Server */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                  Canal d'envoi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSendVia('server')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      sendVia === 'server'
                        ? 'border-[#1E3A8A] bg-[#1E3A8A]/10 text-[#1E3A8A] dark:border-[#D4AF37] dark:bg-[#D4AF37]/15 dark:text-[#D4AF37]'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-[#1E3A8A] dark:text-[#D4AF37]" />
                    <span>Envoi confidentiel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSendVia('whatsapp')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      sendVia === 'whatsapp'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp direct</span>
                  </button>
                </div>
              </div>

              {/* Confidentiality toggle */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <input
                  type="checkbox"
                  id="privacyCheckbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="mt-0.5 accent-[#1E3A8A]"
                />
                <label
                  htmlFor="privacyCheckbox"
                  className="text-xs text-gray-600 dark:text-gray-300 select-none cursor-pointer"
                >
                  <strong className="text-gray-900 dark:text-white">Confidentialité garantie :</strong> Mon message ne sera jamais publié ni partagé avec des tiers.
                </label>
              </div>

              {/* Error display */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#1E3A8A] to-[#172554] text-white shadow-md hover:from-[#172554] hover:to-[#0F172A] transition-all transform active:scale-98 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Transmission en cours...</span>
                ) : sendVia === 'whatsapp' ? (
                  <>
                    <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                    <span>Ouvrir WhatsApp avec ma demande</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    <span>{t.sendPrayer}</span>
                  </>
                )}
              </button>

              {/* Direct Phone / WhatsApp Contact */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Contact direct / Urgence :</span>
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+243991405043"
                    className="font-bold text-[#1E3A8A] dark:text-[#D4AF37] hover:underline"
                  >
                    +243 991 405 043
                  </a>
                  <a
                    href={`https://wa.me/${PASTOR_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
