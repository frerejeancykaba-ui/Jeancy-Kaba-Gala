import React, { useState } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Heart,
  Bookmark,
  Sparkles,
  BookOpen,
  Info,
  Layers,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { useUser } from '../context/UserContext';
import { Language } from '../types';
import { User as UserIcon } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'explore' | 'categories' | 'passages' | 'daily' | 'about') => void;
  activeView: string;
  onOpenPrayerModal: () => void;
  onOpenFavorites: () => void;
  onOpenAbout: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeView,
  onOpenPrayerModal,
  onOpenFavorites,
  onOpenAbout,
  onOpenAuth,
  onOpenProfile,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { favorites } = useFavorites();
  const { currentUser, isAuthenticated } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: 'FR' },
    { code: 'ln', label: 'Lingála', flag: 'CD' },
    { code: 'en', label: 'English', flag: 'EN' },
  ];

  const handleNavClick = (view: 'home' | 'explore' | 'categories' | 'passages' | 'daily' | 'about') => {
    if (view === 'about') {
      onOpenAbout();
    } else {
      onNavigate(view);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F8F5EF]/90 dark:bg-[#0B132B]/90 border-b border-[#1E3A8A]/10 dark:border-[#D4AF37]/20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            aria-label="WHO'S GOD? - Accueil"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#172554] dark:from-[#D4AF37] dark:to-[#B8860B] flex items-center justify-center shadow-md shadow-[#1E3A8A]/20 dark:shadow-[#D4AF37]/20 transition-transform duration-200 group-hover:scale-105">
              <svg
                viewBox="0 0 100 100"
                className="w-6 h-6 text-[#D4AF37] dark:text-[#0B132B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
              >
                <path d="M50 16 L50 84 M28 38 L72 38" />
                <circle cx="50" cy="38" r="4" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#1E3A8A] dark:text-white font-['Playfair_Display',serif]">
                  WHO'S GOD?
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]" />
              </div>
              <p className="text-[10px] tracking-wider uppercase font-semibold text-[#1F2937]/70 dark:text-gray-400">
                Parole & Vérité
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'home'
                  ? 'text-[#1E3A8A] dark:text-[#D4AF37] bg-[#1E3A8A]/5 dark:bg-[#D4AF37]/10 font-semibold'
                  : 'text-[#1F2937]/80 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-[#D4AF37]'
              }`}
            >
              {t.home}
            </button>

            <button
              onClick={() => handleNavClick('explore')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'explore'
                  ? 'text-[#1E3A8A] dark:text-[#D4AF37] bg-[#1E3A8A]/5 dark:bg-[#D4AF37]/10 font-semibold'
                  : 'text-[#1F2937]/80 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-[#D4AF37]'
              }`}
            >
              {t.explore}
            </button>

            <button
              onClick={() => handleNavClick('categories')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'categories'
                  ? 'text-[#1E3A8A] dark:text-[#D4AF37] bg-[#1E3A8A]/5 dark:bg-[#D4AF37]/10 font-semibold'
                  : 'text-[#1F2937]/80 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-[#D4AF37]'
              }`}
            >
              {t.categories}
            </button>

            <button
              onClick={() => handleNavClick('passages')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'passages'
                  ? 'text-[#1E3A8A] dark:text-[#D4AF37] bg-[#1E3A8A]/5 dark:bg-[#D4AF37]/10 font-semibold'
                  : 'text-[#1F2937]/80 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-[#D4AF37]'
              }`}
            >
              {t.passages}
            </button>

            <button
              onClick={() => handleNavClick('daily')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'daily'
                  ? 'text-[#1E3A8A] dark:text-[#D4AF37] bg-[#1E3A8A]/5 dark:bg-[#D4AF37]/10 font-semibold'
                  : 'text-[#1F2937]/80 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-[#D4AF37]'
              }`}
            >
              {t.dailyVerse}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#1F2937]/80 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-[#D4AF37] transition-colors"
            >
              {t.about}
            </button>
          </nav>

          {/* Action Tools: Prayer, Favorites, User Profile, Language, Theme */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {/* User Profile / Login Button */}
            {isAuthenticated && currentUser ? (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1E3A8A]/20 dark:border-[#D4AF37]/30 bg-white dark:bg-[#111C3D] hover:border-[#1E3A8A] dark:hover:border-[#D4AF37] transition-all shadow-xs group"
                title="Mon Espace Spirituel"
              >
                <div
                  className={`w-6 h-6 rounded-full ${currentUser.avatarColor || 'bg-[#1E3A8A]'} text-[#D4AF37] text-[10px] font-bold flex items-center justify-center`}
                >
                  {currentUser.avatarInitials}
                </div>
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 max-w-[90px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1E3A8A] dark:text-[#D4AF37] hover:bg-[#1E3A8A]/10 dark:hover:bg-gray-800 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t.loginRegister}</span>
              </button>
            )}
            {/* Need Prayer Action Button */}
            <button
              onClick={onOpenPrayerModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white shadow-sm hover:shadow-md hover:from-[#172554] hover:to-[#1D4ED8] transition-all transform active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span>{t.needPrayer}</span>
            </button>

            {/* Favorites Drawer Toggle */}
            <button
              onClick={onOpenFavorites}
              aria-label="Voir les favoris"
              className="relative p-2.5 rounded-full text-[#1F2937]/80 dark:text-gray-300 hover:bg-[#1E3A8A]/10 dark:hover:bg-gray-800 transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#1E3A8A] text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#1F2937]/80 dark:text-gray-300 hover:bg-[#1E3A8A]/10 dark:hover:bg-gray-800 transition-colors"
              >
                <Globe className="w-4 h-4 text-[#1E3A8A] dark:text-[#D4AF37]" />
                <span className="uppercase">{language}</span>
              </button>

              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700 shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-left transition-colors ${
                          language === lang.code
                            ? 'bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] font-semibold'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span>{lang.label}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">
                          {lang.flag}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Basculer le thème"
              className="p-2.5 rounded-full text-[#1F2937]/80 dark:text-gray-300 hover:bg-[#1E3A8A]/10 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#D4AF37]" />
              ) : (
                <Moon className="w-4 h-4 text-[#1E3A8A]" />
              )}
            </button>
          </div>

          {/* Mobile Right Bar: Prayer + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenPrayerModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1E3A8A] text-white"
            >
              <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-[11px]">Prière</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-[#F8F5EF] dark:bg-[#0B132B] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {/* User Account Card on Mobile */}
          <div className="p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between">
            {isAuthenticated && currentUser ? (
              <div
                onClick={() => {
                  onOpenProfile();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <div
                  className={`w-9 h-9 rounded-xl ${currentUser.avatarColor || 'bg-[#1E3A8A]'} text-[#D4AF37] font-bold text-xs flex items-center justify-center shadow-xs`}
                >
                  {currentUser.avatarInitials}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    {currentUser.name}
                  </p>
                  <span className="text-[10px] text-gray-400">
                    {currentUser.city || 'Mon Espace'} • Gérer mon profil
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-[#1E3A8A] text-white flex items-center justify-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                <span>Se connecter / Créer un compte</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-3 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 ${
                activeView === 'home'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.home}</span>
            </button>

            <button
              onClick={() => handleNavClick('explore')}
              className={`p-3 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 ${
                activeView === 'explore'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.explore}</span>
            </button>

            <button
              onClick={() => handleNavClick('categories')}
              className={`p-3 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 ${
                activeView === 'categories'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t.categories}</span>
            </button>

            <button
              onClick={() => handleNavClick('passages')}
              className={`p-3 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 ${
                activeView === 'passages'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.passages}</span>
            </button>

            <button
              onClick={() => handleNavClick('daily')}
              className={`p-3 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 ${
                activeView === 'daily'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.dailyVerse}</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="p-3 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            >
              <Info className="w-4 h-4" />
              <span>{t.about}</span>
            </button>
          </div>

          {/* Quick Settings on Mobile */}
          <div className="pt-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-800">
            {/* Language Pill Selector */}
            <div className="flex items-center gap-1 bg-white dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold uppercase ${
                    language === l.code
                      ? 'bg-[#1E3A8A] text-white dark:bg-[#D4AF37] dark:text-[#0B132B]'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {l.code}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onOpenFavorites();
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative"
              >
                <Bookmark className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#1E3A8A] text-[9px] font-bold flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#D4AF37]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#1E3A8A]" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
