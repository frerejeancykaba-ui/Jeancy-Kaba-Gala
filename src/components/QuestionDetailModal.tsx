import React, { useState, useEffect } from 'react';
import {
  X,
  Bookmark,
  Share2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  Scroll,
  Heart,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Bot,
} from 'lucide-react';
import { BiblicalQuestion } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { getRelatedQuestions, getQuestionById } from '../data/questions';

interface QuestionDetailModalProps {
  question: BiblicalQuestion | null;
  onClose: () => void;
  onSelectRelatedQuestion: (question: BiblicalQuestion) => void;
}

export const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  question,
  onClose,
  onSelectRelatedQuestion,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { currentUser, isAnswerSaved, toggleSaveAnswer, getSavedAnswerNote, updateSavedAnswerNote } = useUser();
  const { language, t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedVerse, setCopiedVerse] = useState(false);
  const [copiedPrayer, setCopiedPrayer] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  useEffect(() => {
    if (question && currentUser) {
      setPersonalNote(getSavedAnswerNote(question.id) || '');
    }
  }, [question, currentUser]);

  // Stop speech when modal closes or question changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [question]);

  if (!question) return null;

  const favorite = isFavorite(question.id);
  const relatedList = getRelatedQuestions(question);

  const displayQuestion =
    language === 'ln' && question.questionLn
      ? question.questionLn
      : language === 'en' && question.questionEn
      ? question.questionEn
      : question.question;

  const displayShortAnswer =
    language === 'ln' && question.shortAnswerLn
      ? question.shortAnswerLn
      : language === 'en' && question.shortAnswerEn
      ? question.shortAnswerEn
      : question.shortAnswer;

  // Text to speech
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('La lecture vocale n\'est pas supportée par votre navigateur.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const fullTextToRead = `${question.question}. ${displayShortAnswer}. ${question.understandPassage}. Prière : ${question.personalPrayer}`;
    const utterance = new SpeechSynthesisUtterance(fullTextToRead);
    utterance.lang = language === 'en' ? 'en-US' : 'fr-FR';
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?q=${question.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyPassages = () => {
    const text = question.biblicalPassages
      .map((p) => `« ${p.text} » (${p.book} ${p.chapter}:${p.verses})`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2500);
  };

  const handleCopyPrayer = () => {
    navigator.clipboard.writeText(question.personalPrayer);
    setCopiedPrayer(true);
    setTimeout(() => setCopiedPrayer(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const shareMessage = `WHO'S GOD? — Question biblique :\n*${question.question}*\n\n« ${displayShortAnswer} »\n\nDécouvre la réponse complète sur : ${window.location.origin}/?q=${question.id}`;
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const shareUrl = `${window.location.origin}/?q=${question.id}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#F8F5EF] dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-[#F8F5EF]/95 dark:bg-[#0B132B]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37]">
              Question N° {question.id}
            </span>

            {(question as any).aiGenerated ? (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                <Bot className="w-3 h-3" />
                <span>Réponse IA Biblique</span>
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                <ShieldCheck className="w-3 h-3" />
                <span>Base Vérifiée</span>
              </span>
            )}
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            {/* Audio Speech Button */}
            <button
              onClick={toggleSpeech}
              title={isPlayingAudio ? t.stopAudio : t.listenAudio}
              className={`p-2 rounded-full transition-colors ${
                isPlayingAudio
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-[#1E3A8A] dark:hover:text-[#D4AF37]'
              }`}
            >
              {isPlayingAudio ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Favorite / Save toggle */}
            <button
              onClick={() => {
                toggleFavorite(question.id);
                toggleSaveAnswer(question.id, personalNote);
              }}
              className={`p-2 rounded-full transition-colors ${
                favorite || isAnswerSaved(question.id)
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                  : 'bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
              title={favorite || isAnswerSaved(question.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <Bookmark className={`w-4 h-4 ${favorite || isAnswerSaved(question.id) ? 'fill-[#D4AF37]' : ''}`} />
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-5 sm:px-8 md:px-10 py-6 space-y-8">
          {/* Main Question Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-['Playfair_Display',serif] tracking-tight leading-tight">
              {displayQuestion}
            </h2>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#1E3A8A] dark:text-[#D4AF37]">
              Fondé sur la Parole de Dieu • Traduction fidèle Louis Segond
            </p>
          </div>

          {/* SECTION 1: RÉPONSE COURTE */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1E3A8A]/10 via-[#1E3A8A]/5 to-transparent dark:from-[#D4AF37]/10 dark:via-[#D4AF37]/5 dark:to-transparent border-l-4 border-[#1E3A8A] dark:border-[#D4AF37]">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1E3A8A] dark:text-[#D4AF37] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{t.shortAnswer}</span>
            </div>
            <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
              {displayShortAnswer}
            </p>
          </div>

          {/* SECTION 2: CE QUE DIT LA BIBLE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
              <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
                <BookOpen className="w-4 h-4 text-[#1E3A8A] dark:text-[#D4AF37]" />
                <span>{t.whatBibleSays}</span>
              </div>
              <button
                onClick={handleCopyPassages}
                className="text-xs font-semibold text-[#1E3A8A] dark:text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                {copiedVerse ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier les versets</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              {question.biblicalPassages.map((passage, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111C3D] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E3A8A] dark:text-[#D4AF37] bg-[#1E3A8A]/5 dark:bg-[#D4AF37]/10 px-2.5 py-1 rounded-md">
                      {passage.book} {passage.chapter}:{passage.verses}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">Passage {idx + 1}</span>
                  </div>
                  <blockquote className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 font-['Playfair_Display',serif] italic leading-relaxed">
                    « {passage.text} »
                  </blockquote>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    <strong className="text-gray-700 dark:text-gray-200">Lien avec la question :</strong>{' '}
                    {passage.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: COMPRENDRE LE PASSAGE */}
          <div className="space-y-3 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111C3D] border border-gray-200/80 dark:border-gray-800 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
              <HelpCircle className="w-4 h-4 text-[#1E3A8A] dark:text-[#D4AF37]" />
              <span>{t.understandPassage}</span>
            </div>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {question.understandPassage}
            </p>
          </div>

          {/* SECTION 4: UNE HISTOIRE BIBLIQUE LIÉE */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-transparent dark:from-amber-400/10 dark:via-amber-400/5 dark:to-transparent border border-amber-200/60 dark:border-amber-800/40 space-y-3">
            <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-amber-800 dark:text-[#D4AF37]">
              <Scroll className="w-4 h-4" />
              <span>{t.biblicalStory}</span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {question.biblicalStory.character}
              </h4>
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                {question.biblicalStory.reference}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {question.biblicalStory.narrative}
            </p>
            <div className="pt-2 border-t border-amber-200/40 dark:border-amber-800/30">
              <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                <span className="text-amber-700 dark:text-[#D4AF37]">Leçon à retenir :</span>{' '}
                {question.biblicalStory.lesson}
              </p>
            </div>
          </div>

          {/* SECTION 5: COMMENT APPLIQUER CETTE PAROLE ? */}
          <div className="space-y-3 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111C3D] border border-gray-200/80 dark:border-gray-800 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
              <Check className="w-4 h-4 text-[#1E3A8A] dark:text-[#D4AF37]" />
              <span>{t.practicalApp}</span>
            </div>
            <ul className="space-y-2.5">
              {question.practicalApplication.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 6: UNE PRIÈRE POUR TOI */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#172554] text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
                <Heart className="w-4 h-4 fill-[#D4AF37]" />
                <span>{t.prayerForYou}</span>
              </div>
              <button
                onClick={handleCopyPrayer}
                className="text-xs font-semibold text-gray-200 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md transition-colors"
              >
                {copiedPrayer ? (
                  <>
                    <Check className="w-3 h-3 text-[#D4AF37]" />
                    <span>Prière copiée</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#D4AF37]" />
                    <span>Copier la prière</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm sm:text-base font-medium italic text-gray-100 leading-relaxed">
              « {question.personalPrayer} »
            </p>
          </div>

          {/* PERSONAL MEDITATION NOTE (USER MANAGEMENT SYSTEM) */}
          {currentUser && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E3A8A] dark:text-[#D4AF37] flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Votre Note Personnelle de Méditation</span>
                </span>
                {noteSavedFeedback && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Note enregistrée
                  </span>
                )}
              </div>
              <textarea
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                onBlur={() => {
                  if (personalNote.trim()) {
                    if (!isAnswerSaved(question.id)) {
                      toggleSaveAnswer(question.id, personalNote);
                    } else {
                      updateSavedAnswerNote(question.id, personalNote);
                    }
                    setNoteSavedFeedback(true);
                    setTimeout(() => setNoteSavedFeedback(false), 2000);
                  }
                }}
                placeholder="Écrivez ici votre méditation, verset connexe ou application personnelle..."
                rows={2}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111C3D] text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
          )}

          {/* SECTION 7: POUR ALLER PLUS LOIN */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-[#1E3A8A] dark:text-[#D4AF37]" />
              <span>{t.goFurther}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedList.map((relQ) => (
                <button
                  key={relQ.id}
                  onClick={() => onSelectRelatedQuestion(relQ)}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-800 text-left hover:border-[#1E3A8A] dark:hover:border-[#D4AF37] hover:shadow-md transition-all group"
                >
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Question N° {relQ.id}
                  </span>
                  <p className="text-xs font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#1E3A8A] dark:group-hover:text-[#D4AF37] line-clamp-2">
                    {relQ.question}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 8: PARTAGE & ACTIONS */}
          <div className="p-5 rounded-2xl bg-gray-100 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                {t.share} cette réponse avec tes proches :
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleFacebookShare}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-xs transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Facebook</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 transition-colors shadow-xs"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Lien copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t.copyLink}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
