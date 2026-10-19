import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { UserProvider } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { VerseOfTheDayCard } from './components/VerseOfTheDayCard';
import { FeaturedCategories } from './components/FeaturedCategories';
import { PopularQuestionsSection } from './components/PopularQuestionsSection';
import { InvitationSection } from './components/InvitationSection';
import { Footer } from './components/Footer';
import { QuestionDetailModal } from './components/QuestionDetailModal';
import { PrayerModal } from './components/PrayerModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AboutModal } from './components/AboutModal';
import { LegalModal, LegalModalType } from './components/LegalModals';
import { ExploreView } from './components/ExploreView';
import { CategoriesView } from './components/CategoriesView';
import { DailyVerseView } from './components/DailyVerseView';
import { PassagesView } from './components/PassagesView';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { BiblicalQuestion } from './types';
import { getVerseOfTheDay } from './data/verses';
import { getQuestionById } from './data/questions';
import { Sparkles, Bot, AlertCircle, Loader2 } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'explore' | 'categories' | 'passages' | 'daily'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedQuestion, setSelectedQuestion] = useState<BiblicalQuestion | null>(null);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // AI Loading & Error State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiLoadingMessage, setAiLoadingMessage] = useState('');
  const [aiErrorModal, setAiErrorModal] = useState<string | null>(null);

  // Handle URL query parameters on initial mount (e.g. ?q=12 or ?cat=dieu)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const questionId = params.get('q');
      const catParam = params.get('cat');

      if (questionId) {
        const found = getQuestionById(Number(questionId));
        if (found) setSelectedQuestion(found);
      } else if (catParam) {
        setSelectedCategory(catParam);
        setActiveView('explore');
      }
    } catch (e) {
      console.error('Error parsing URL query params:', e);
    }
  }, []);

  const handleSelectQuestion = (q: BiblicalQuestion) => {
    setSelectedQuestion(q);
    // Sync browser URL history without reload
    const newUrl = `${window.location.pathname}?q=${q.id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleCloseQuestionModal = () => {
    setSelectedQuestion(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveView('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomAiSearch = async (queryText: string) => {
    if (!queryText.trim()) return;

    setIsAiLoading(true);
    setAiLoadingMessage('Sondage des Écritures et formulation théologique fondée sur la Parole...');
    setAiErrorModal(null);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: queryText }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.suggestions && data.suggestions.length > 0) {
          handleSelectQuestion(data.suggestions[0]);
          return;
        }
        throw new Error(data.message || 'Impossible de joindre le service biblique pour le moment.');
      }

      if (data.question) {
        handleSelectQuestion(data.question);
      }
    } catch (err: any) {
      console.error(err);
      setAiErrorModal(
        err.message ||
          'Une erreur temporaire est survenue lors de la consultation. Tu peux explorer les 100 questions vérifiées de notre base locale.'
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <UserProvider>
            <div className="min-h-screen flex flex-col bg-[#F8F5EF] dark:bg-[#0B132B] text-[#1F2937] dark:text-gray-100 transition-colors duration-200">
              {/* Top Navigation */}
              <Navbar
                activeView={activeView}
                onNavigate={(view) => {
                  if (view !== 'about') {
                    setActiveView(view);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                onOpenPrayerModal={() => setPrayerModalOpen(true)}
                onOpenFavorites={() => setFavoritesDrawerOpen(true)}
                onOpenAbout={() => setAboutModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onOpenProfile={() => setProfileModalOpen(true)}
              />

              {/* Main Page Content Views */}
              <main className="flex-1">
                {activeView === 'home' && (
                  <>
                    {/* Hero Section with big search & speech recognition */}
                    <HeroSearch
                      onSelectQuestion={handleSelectQuestion}
                      onCustomAiSearch={handleCustomAiSearch}
                    />

                    {/* Daily Verse Card */}
                    <VerseOfTheDayCard verse={getVerseOfTheDay()} />

                    {/* 6 Interactive Featured Categories on Hero/Home */}
                    <FeaturedCategories
                      onSelectCategory={handleSelectCategory}
                      onExploreAll={() => {
                        setActiveView('categories');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />

                    {/* 12 Most Searched Popular Questions */}
                    <PopularQuestionsSection
                      onSelectQuestion={handleSelectQuestion}
                      onExploreAll={() => {
                        setActiveView('explore');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />

                    {/* Solemn Invitation Section */}
                    <InvitationSection
                      onExplore={() => {
                        setActiveView('explore');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onExplorePassages={() => {
                        setActiveView('passages');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onOpenPrayer={() => setPrayerModalOpen(true)}
                    />
                  </>
                )}

                {activeView === 'explore' && (
                  <ExploreView
                    onSelectQuestion={handleSelectQuestion}
                    onCustomAiSearch={handleCustomAiSearch}
                    initialCategoryId={selectedCategory}
                  />
                )}

                {activeView === 'categories' && (
                  <CategoriesView
                    onSelectQuestion={handleSelectQuestion}
                    initialCategoryId={selectedCategory !== 'all' ? selectedCategory : 'dieu'}
                  />
                )}

                {activeView === 'passages' && (
                  <PassagesView onSelectQuestion={handleSelectQuestion} />
                )}

                {activeView === 'daily' && <DailyVerseView />}
              </main>

              {/* Platform Footer */}
              <Footer
                onSelectCategory={handleSelectCategory}
                onOpenLegalModal={(type) => setLegalModalType(type)}
                onOpenAbout={() => setAboutModalOpen(true)}
                onOpenPrayer={() => setPrayerModalOpen(true)}
              />

              {/* MODALS */}

              {/* 1. Full 8-Part Structured Question Detail Modal */}
              <QuestionDetailModal
                question={selectedQuestion}
                onClose={handleCloseQuestionModal}
                onSelectRelatedQuestion={handleSelectQuestion}
              />

              {/* 2. Need Prayer Form Modal */}
              <PrayerModal
                isOpen={prayerModalOpen}
                onClose={() => setPrayerModalOpen(false)}
              />

              {/* 3. Favorites Drawer */}
              <FavoritesDrawer
                isOpen={favoritesDrawerOpen}
                onClose={() => setFavoritesDrawerOpen(false)}
                onSelectQuestion={handleSelectQuestion}
              />

              {/* 4. User Authentication Modal (Register / Login / 1-Click Guest) */}
              <AuthModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
              />

              {/* 5. User Profile Management Modal (Profile, Saved Answers with Notes, Search History, Preferences) */}
              <UserProfileModal
                isOpen={profileModalOpen}
                onClose={() => setProfileModalOpen(false)}
                onSelectQuestion={handleSelectQuestion}
                onExecuteSearch={(query, type) => {
                  if (type === 'passage') {
                    setActiveView('passages');
                  } else {
                    setActiveView('explore');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 6. About Modal with Jeancy KABA, Kinshasa RDC */}
              <AboutModal
                isOpen={aboutModalOpen}
                onClose={() => setAboutModalOpen(false)}
                onOpenPrayer={() => setPrayerModalOpen(true)}
              />

              {/* 7. Legal Modals (Mentions, Privacy, Terms) */}
              <LegalModal
                type={legalModalType}
                onClose={() => setLegalModalType(null)}
              />

            {/* 6. AI Loading Overlay */}
            {isAiLoading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
                <div className="p-8 rounded-3xl bg-white dark:bg-[#111C3D] border border-[#1E3A8A]/20 dark:border-[#D4AF37]/30 shadow-2xl text-center max-w-md w-full space-y-4">
                  <div className="relative w-16 h-16 mx-auto">
                    <span className="absolute inset-0 rounded-full border-4 border-[#1E3A8A]/20 dark:border-[#D4AF37]/20" />
                    <span className="absolute inset-0 rounded-full border-4 border-[#1E3A8A] dark:border-[#D4AF37] border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-[#1E3A8A] dark:text-[#D4AF37]">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-['Playfair_Display',serif]">
                    Recherche Théologique en cours...
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {aiLoadingMessage}
                  </p>
                </div>
              </div>
            )}

            {/* 7. AI Error Dialog */}
            {aiErrorModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
                <div className="p-6 rounded-3xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700 shadow-2xl text-center max-w-md w-full space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Information sur la recherche
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {aiErrorModal}
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setAiErrorModal(null)}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1E3A8A] text-white hover:bg-[#172554] transition-colors"
                    >
                      Compris
                    </button>
                    <button
                      onClick={() => {
                        setAiErrorModal(null);
                        setActiveView('explore');
                      }}
                      className="px-5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 transition-colors"
                    >
                      Explorer les 100 questions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </UserProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
