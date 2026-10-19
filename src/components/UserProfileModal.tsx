import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  Bookmark,
  History,
  Sliders,
  LogOut,
  Save,
  Check,
  Trash2,
  ExternalLink,
  BookOpen,
  Calendar,
  MapPin,
  Sparkles,
  MessageSquare,
  Search,
  Type,
  FileText,
  Volume2,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getQuestionById } from '../data/questions';
import { BiblicalQuestion } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: BiblicalQuestion) => void;
  onExecuteSearch?: (query: string, type: 'question' | 'passage') => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
  onExecuteSearch,
}) => {
  const {
    currentUser,
    logout,
    updateProfile,
    updatePreferences,
    clearSearchHistory,
    removeSearchHistoryItem,
    toggleSaveAnswer,
    updateSavedAnswerNote,
  } = useUser();

  const { setLanguage } = useLanguage();
  const { toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'history' | 'preferences'>('profile');

  // Edit profile states
  const [name, setName] = useState(currentUser?.name || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [favoriteVerse, setFavoriteVerse] = useState(currentUser?.favoriteVerse || '');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Note editing state for saved answers
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');

  if (!isOpen || !currentUser) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      city,
      bio,
      favoriteVerse,
    });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const handleSaveNote = (questionId: number) => {
    updateSavedAnswerNote(questionId, tempNoteText);
    setEditingNoteId(null);
    setTempNoteText('');
  };

  const savedQuestions = currentUser.savedAnswers
    .map((item) => ({
      ...item,
      question: getQuestionById(item.questionId),
    }))
    .filter((item) => item.question !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-[#111C3D] rounded-3xl border border-[#1E3A8A]/20 dark:border-[#D4AF37]/30 shadow-2xl overflow-hidden transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Card */}
        <div className="relative bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#172554] px-6 py-6 text-white shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl ${currentUser.avatarColor || 'bg-[#1E3A8A]'} text-[#D4AF37] border-2 border-[#D4AF37]/50 flex items-center justify-center text-xl font-extrabold shadow-lg shrink-0`}
              >
                {currentUser.avatarInitials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-['Playfair_Display',serif]">
                    {currentUser.name}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/40">
                    Membre
                  </span>
                </div>
                <p className="text-xs text-white/70 flex items-center gap-2 mt-0.5">
                  <span>{currentUser.email}</span>
                  {currentUser.city && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#D4AF37]">
                        <MapPin className="w-3 h-3" />
                        {currentUser.city}
                      </span>
                    </>
                  )}
                </p>
                {currentUser.favoriteVerse && (
                  <p className="text-[11px] text-[#D4AF37] italic mt-1">
                    Verset de méditation : « {currentUser.favoriteVerse} »
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="self-start sm:self-center flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 text-white/90 hover:bg-red-500/20 hover:text-red-200 border border-white/15 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-none pb-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'profile'
                  ? 'bg-white text-[#1E3A8A] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Mon Profil</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'saved'
                  ? 'bg-white text-[#1E3A8A] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Réponses Sauvegardées ({currentUser.savedAnswers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'history'
                  ? 'bg-white text-[#1E3A8A] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Historique ({currentUser.searchHistory.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'preferences'
                  ? 'bg-white text-[#1E3A8A] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Préférences</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-gray-50/60 dark:bg-[#0B132B]/50">
          {/* TAB 1: EDIT PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Informations Personnelles
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mettez à jour vos informations de compte et votre témoignage.
                  </p>
                </div>
                {isSavedNotice && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Check className="w-4 h-4" /> Enregistré !
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Nom ou Prénom
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111C3D] text-sm text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Ville / Pays d'origine ou de résidence
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="ex: Kinshasa, RDC"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111C3D] text-sm text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Verset Biblique Préféré
                </label>
                <input
                  type="text"
                  value={favoriteVerse}
                  onChange={(e) => setFavoriteVerse(e.target.value)}
                  placeholder="ex: Psaume 23:1, Jérémie 29:11..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111C3D] text-sm text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Quelques mots sur votre marche avec Dieu (Bio)
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Partagez votre soif de vérité ou vos sujets de gratitude..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111C3D] text-sm text-gray-900 dark:text-white resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1E3A8A] text-white hover:bg-[#172554] shadow-sm transition-all"
                >
                  <Save className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Sauvegarder les modifications</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SAVED ANSWERS WITH NOTES */}
          {activeTab === 'saved' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Vos Réponses & Méditations Mémorisées
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Accédez aux réponses bibliques que vous avez gardées de côté, avec vos notes personnelles.
                  </p>
                </div>
              </div>

              {savedQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/50 text-[#D4AF37] flex items-center justify-center mb-3">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    Aucune réponse enregistrée pour l'instant
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-1">
                    Lorsque vous lisez une réponse biblique, cliquez sur le signet pour l'enregistrer dans votre espace personnel.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {savedQuestions.map(({ questionId, savedAt, note, question }) => {
                    if (!question) return null;
                    const isEditingThisNote = editingNoteId === questionId;

                    return (
                      <div
                        key={questionId}
                        className="p-4 rounded-2xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700/80 shadow-xs hover:border-[#D4AF37]/50 transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A8A] dark:text-[#D4AF37]">
                              Question n°{question.id}
                            </span>
                            <h4
                              onClick={() => {
                                onSelectQuestion(question);
                                onClose();
                              }}
                              className="text-sm font-bold text-gray-900 dark:text-white hover:text-[#1E3A8A] dark:hover:text-[#D4AF37] cursor-pointer transition-colors"
                            >
                              {question.question}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => {
                                onSelectQuestion(question);
                                onClose();
                              }}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-[#1E3A8A] dark:hover:text-[#D4AF37] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              title="Lire l'enseignement"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleSaveAnswer(questionId)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                              title="Retirer des favoris"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 italic">
                          « {question.shortAnswer} »
                        </p>

                        {/* Note area */}
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                          {isEditingThisNote ? (
                            <div className="space-y-2">
                              <textarea
                                value={tempNoteText}
                                onChange={(e) => setTempNoteText(e.target.value)}
                                placeholder="Écrivez votre note ou méditation sur ce verset..."
                                rows={2}
                                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#0B132B] text-xs text-gray-900 dark:text-white focus:outline-none"
                              />
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleSaveNote(questionId)}
                                  className="px-3 py-1 rounded-lg text-[11px] font-bold bg-[#1E3A8A] text-white hover:bg-[#172554]"
                                >
                                  Enregistrer la note
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingNoteId(null)}
                                  className="px-3 py-1 rounded-lg text-[11px] font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                                >
                                  Annuler
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2 text-xs">
                              {note ? (
                                <div className="text-gray-700 dark:text-gray-300 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200/60 dark:border-amber-800/40 flex-1">
                                  <span className="font-semibold text-[#B8860B] dark:text-[#D4AF37] block text-[10px] uppercase">
                                    Votre note personnelle :
                                  </span>
                                  <span>{note}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-[11px] italic">
                                  Aucune note ajoutée
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingNoteId(questionId);
                                  setTempNoteText(note || '');
                                }}
                                className="text-[11px] font-semibold text-[#1E3A8A] dark:text-[#D4AF37] hover:underline shrink-0"
                              >
                                {note ? 'Modifier la note' : '+ Ajouter une note'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SEARCH HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Historique de vos Recherches
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Retrouvez les questions et passages bibliques que vous avez explorés.
                  </p>
                </div>

                {currentUser.searchHistory.length > 0 && (
                  <button
                    onClick={clearSearchHistory}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Effacer tout</span>
                  </button>
                )}
              </div>

              {currentUser.searchHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 dark:bg-blue-950/50 text-[#1E3A8A] dark:text-[#D4AF37] flex items-center justify-center mb-3">
                    <History className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    Aucun historique de recherche
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-1">
                    Vos recherches de questions, versets et passages apparaîtront ici pour une reprise rapide d'étude.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {currentUser.searchHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700/80 hover:border-[#1E3A8A]/40 dark:hover:border-[#D4AF37]/40 transition-colors"
                    >
                      <button
                        onClick={() => {
                          if (onExecuteSearch) {
                            onExecuteSearch(item.query, item.type === 'passage' ? 'passage' : 'question');
                            onClose();
                          }
                        }}
                        className="flex items-center gap-3 text-left flex-1"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center shrink-0">
                          {item.type === 'passage' ? (
                            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                          ) : (
                            <Search className="w-4 h-4 text-[#1E3A8A]" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#1E3A8A] dark:hover:text-[#D4AF37] transition-colors">
                            {item.query}
                          </p>
                          <span className="text-[10px] text-gray-400">
                            {item.type === 'passage' ? 'Passage biblique' : 'Question spirituelle'} •{' '}
                            {new Date(item.timestamp).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </button>

                      <button
                        onClick={() => removeSearchHistoryItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        title="Supprimer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PERSONALIZED PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="pb-2 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Préférences d'Étude & d'Affichage
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Personnalisez la taille de lecture, la version biblique et les rappels selon votre confort.
                </p>
              </div>

              {/* 1. Font Size for Biblical Reading */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-[#1E3A8A] dark:text-[#D4AF37]" />
                  <span>Taille du texte des versets & réponses</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'sm', label: 'Compact', size: '13px' },
                    { id: 'base', label: 'Standard', size: '15px' },
                    { id: 'lg', label: 'Confort', size: '17px' },
                    { id: 'xl', label: 'Grand', size: '19px' },
                  ].map((sizeOption) => (
                    <button
                      key={sizeOption.id}
                      type="button"
                      onClick={() =>
                        updatePreferences({ fontSize: sizeOption.id as any })
                      }
                      className={`p-3 rounded-xl border text-center transition-all ${
                        currentUser.preferences.fontSize === sizeOption.id
                          ? 'border-[#1E3A8A] dark:border-[#D4AF37] bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] font-bold ring-1 ring-[#1E3A8A] dark:ring-[#D4AF37]'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111C3D] text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="block text-xs font-semibold">{sizeOption.label}</span>
                      <span className="text-[10px] text-gray-400">{sizeOption.size}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Preferred Bible Translation */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#1E3A8A] dark:text-[#D4AF37]" />
                  <span>Traduction de référence préférée</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'LSG 1910', name: 'Louis Segond 1910', desc: 'Classique & respectueuse du texte original' },
                    { id: 'BFC', name: 'Français Courant', desc: 'Langage accessible et dynamique' },
                    { id: 'PDV', name: 'Parole de Vie', desc: 'Idéale pour débuter' },
                    { id: 'KJV', name: 'King James (KJV)', desc: 'Référence anglophone' },
                  ].map((trans) => (
                    <button
                      key={trans.id}
                      type="button"
                      onClick={() =>
                        updatePreferences({ bibleTranslation: trans.id as any })
                      }
                      className={`p-3 rounded-xl border text-left transition-all ${
                        currentUser.preferences.bibleTranslation === trans.id
                          ? 'border-[#1E3A8A] dark:border-[#D4AF37] bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] ring-1 ring-[#1E3A8A] dark:ring-[#D4AF37]'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111C3D] text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="block text-xs font-bold">{trans.name}</span>
                      <span className="text-[10px] text-gray-400">{trans.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Language & Display */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Langue de navigation
                </label>
                <div className="flex items-center gap-2">
                  {[
                    { code: 'fr', name: 'Français' },
                    { code: 'ln', name: 'Lingála (RDC)' },
                    { code: 'en', name: 'English' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        updatePreferences({ preferredLanguage: l.code as any });
                        setLanguage(l.code as any);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        currentUser.preferences.preferredLanguage === l.code
                          ? 'border-[#1E3A8A] dark:border-[#D4AF37] bg-[#1E3A8A] dark:bg-[#D4AF37] text-white dark:text-[#0B132B]'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111C3D] text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Daily Verse Reminder Notification */}
              <div className="pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    Afficher en priorité le Verset du Jour
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Mise en avant de la Parole quotidienne dès l'ouverture du site.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updatePreferences({
                      dailyVerseReminder: !currentUser.preferences.dailyVerseReminder,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    currentUser.preferences.dailyVerseReminder
                      ? 'bg-[#1E3A8A] dark:bg-[#D4AF37]'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      currentUser.preferences.dailyVerseReminder
                        ? 'translate-x-5'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
