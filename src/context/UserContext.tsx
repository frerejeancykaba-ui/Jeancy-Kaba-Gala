import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';

export interface UserPreferences {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  bibleTranslation: 'LSG 1910' | 'BFC' | 'PDV' | 'KJV';
  preferredLanguage: 'fr' | 'ln' | 'en';
  theme: 'light' | 'dark';
  dailyVerseReminder: boolean;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  type: 'question' | 'passage' | 'ai';
  timestamp: number;
}

export interface SavedAnswerNote {
  questionId: number;
  savedAt: number;
  note?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  city?: string;
  bio?: string;
  favoriteVerse?: string;
  avatarInitials: string;
  avatarColor: string;
  createdAt: string;
  preferences: UserPreferences;
  searchHistory: SearchHistoryItem[];
  savedAnswers: SavedAnswerNote[];
}

interface UserContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  register: (name: string, email: string, password?: string, city?: string, favoriteVerse?: string) => Promise<boolean>;
  login: (email: string, password?: string) => Promise<boolean>;
  loginAsGuest: (name?: string, city?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, 'name' | 'city' | 'bio' | 'favoriteVerse'>>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  addSearchHistory: (query: string, type: 'question' | 'passage' | 'ai') => void;
  clearSearchHistory: () => void;
  removeSearchHistoryItem: (id: string) => void;
  toggleSaveAnswer: (questionId: number, note?: string) => void;
  isAnswerSaved: (questionId: number) => boolean;
  getSavedAnswerNote: (questionId: number) => string | undefined;
  updateSavedAnswerNote: (questionId: number, note: string) => void;
}

const STORAGE_SESSION_KEY = 'whosgod_user_session_v1';
const STORAGE_USERS_KEY = 'whosgod_registered_users_v1';

const DEFAULT_PREFERENCES: UserPreferences = {
  fontSize: 'base',
  bibleTranslation: 'LSG 1910',
  preferredLanguage: 'fr',
  theme: 'light',
  dailyVerseReminder: true,
};

const AVATAR_COLORS = [
  'bg-blue-600',
  'bg-indigo-600',
  'bg-amber-600',
  'bg-emerald-600',
  'bg-violet-600',
  'bg-rose-600',
  'bg-cyan-700',
];

function getInitials(name: string): string {
  if (!name.trim()) return 'WG';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getRandomColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load session on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as User;
        setCurrentUser(parsed);
      }
    } catch (e) {
      console.error('Failed to restore user session:', e);
    }
  }, []);

  // Save current user to localStorage whenever it changes
  const saveUserSession = (user: User | null) => {
    setCurrentUser(user);
    try {
      if (user) {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
        // Also update the user in the registered users list
        const allUsersRaw = localStorage.getItem(STORAGE_USERS_KEY);
        let allUsers: Record<string, User> = allUsersRaw ? JSON.parse(allUsersRaw) : {};
        allUsers[user.email.toLowerCase()] = user;
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(allUsers));
      } else {
        localStorage.removeItem(STORAGE_SESSION_KEY);
      }
    } catch (e) {
      console.error('Failed to persist user session:', e);
    }
  };

  const register = async (
    name: string,
    email: string,
    _password?: string,
    city?: string,
    favoriteVerse?: string
  ): Promise<boolean> => {
    const trimmedEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !trimmedEmail) return false;

    const newUser: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: cleanName,
      email: trimmedEmail,
      city: city?.trim() || 'Kinshasa, RDC',
      favoriteVerse: favoriteVerse?.trim() || 'Jean 3:16',
      avatarInitials: getInitials(cleanName),
      avatarColor: getRandomColor(cleanName),
      createdAt: new Date().toISOString(),
      preferences: { ...DEFAULT_PREFERENCES },
      searchHistory: [
        {
          id: `hist_${Date.now()}`,
          query: 'Qui est Dieu ?',
          type: 'question',
          timestamp: Date.now(),
        },
      ],
      savedAnswers: [
        {
          questionId: 1, // Qui est Dieu ?
          savedAt: Date.now(),
          note: 'Définition fondamentale de la nature divine et de son amour.',
        },
      ],
    };

    saveUserSession(newUser);
    return true;
  };

  const login = async (email: string, _password?: string): Promise<boolean> => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return false;

    try {
      const allUsersRaw = localStorage.getItem(STORAGE_USERS_KEY);
      const allUsers: Record<string, User> = allUsersRaw ? JSON.parse(allUsersRaw) : {};

      if (allUsers[trimmedEmail]) {
        saveUserSession(allUsers[trimmedEmail]);
        return true;
      }

      // If user doesn't exist yet, auto-create a friendly profile with this email
      const generatedName = trimmedEmail.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = generatedName
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      return await register(formattedName || 'Chercheur de Vérité', trimmedEmail, '', 'Kinshasa, RDC');
    } catch (e) {
      console.error('Login error:', e);
      return false;
    }
  };

  const loginAsGuest = (name = 'Frère Jeancy', city = 'Kinshasa, RDC') => {
    const guestUser: User = {
      id: `guest_${Date.now()}`,
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@whosgod.cd`,
      city,
      bio: 'Pèlerin en marche, passionné par la Parole de Dieu et la prière.',
      favoriteVerse: 'Jérémie 29:11',
      avatarInitials: getInitials(name),
      avatarColor: 'bg-[#1E3A8A]',
      createdAt: new Date().toISOString(),
      preferences: { ...DEFAULT_PREFERENCES },
      searchHistory: [
        { id: 'h1', query: 'Pourquoi Dieu permet-il la souffrance ?', type: 'question', timestamp: Date.now() - 3600000 },
        { id: 'h2', query: 'Jean 3:16', type: 'passage', timestamp: Date.now() - 7200000 },
        { id: 'h3', query: 'Comment prier avec foi ?', type: 'question', timestamp: Date.now() - 86400000 },
      ],
      savedAnswers: [
        { questionId: 1, savedAt: Date.now() - 86400000, note: 'Méditation sur le Créateur tout-puissant.' },
        { questionId: 13, savedAt: Date.now() - 43200000, note: 'La puissance de la résurrection du Christ.' },
        { questionId: 41, savedAt: Date.now() - 21600000, note: 'Réponse réconfortante lors des moments d\'épreuve.' },
      ],
    };

    saveUserSession(guestUser);
  };

  const logout = () => {
    saveUserSession(null);
  };

  const updateProfile = (updates: Partial<Pick<User, 'name' | 'city' | 'bio' | 'favoriteVerse'>>) => {
    if (!currentUser) return;
    const updated: User = {
      ...currentUser,
      ...updates,
      avatarInitials: updates.name ? getInitials(updates.name) : currentUser.avatarInitials,
    };
    saveUserSession(updated);
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    if (!currentUser) return;
    const updated: User = {
      ...currentUser,
      preferences: {
        ...currentUser.preferences,
        ...prefs,
      },
    };
    saveUserSession(updated);
  };

  const addSearchHistory = (query: string, type: 'question' | 'passage' | 'ai') => {
    if (!currentUser || !query.trim()) return;
    const clean = query.trim();

    // Prevent immediate duplicate
    const filtered = currentUser.searchHistory.filter((item) => item.query.toLowerCase() !== clean.toLowerCase());
    const newItem: SearchHistoryItem = {
      id: `sh_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      query: clean,
      type,
      timestamp: Date.now(),
    };

    const updated: User = {
      ...currentUser,
      searchHistory: [newItem, ...filtered].slice(0, 30), // keep last 30
    };
    saveUserSession(updated);
  };

  const clearSearchHistory = () => {
    if (!currentUser) return;
    saveUserSession({
      ...currentUser,
      searchHistory: [],
    });
  };

  const removeSearchHistoryItem = (id: string) => {
    if (!currentUser) return;
    saveUserSession({
      ...currentUser,
      searchHistory: currentUser.searchHistory.filter((i) => i.id !== id),
    });
  };

  const toggleSaveAnswer = (questionId: number, note?: string) => {
    if (!currentUser) return;
    const exists = currentUser.savedAnswers.some((item) => item.questionId === questionId);

    let updatedSaved: SavedAnswerNote[];
    if (exists) {
      updatedSaved = currentUser.savedAnswers.filter((item) => item.questionId !== questionId);
    } else {
      updatedSaved = [
        {
          questionId,
          savedAt: Date.now(),
          note: note || '',
        },
        ...currentUser.savedAnswers,
      ];
    }

    saveUserSession({
      ...currentUser,
      savedAnswers: updatedSaved,
    });
  };

  const isAnswerSaved = (questionId: number): boolean => {
    if (!currentUser) return false;
    return currentUser.savedAnswers.some((item) => item.questionId === questionId);
  };

  const getSavedAnswerNote = (questionId: number): string | undefined => {
    if (!currentUser) return undefined;
    return currentUser.savedAnswers.find((item) => item.questionId === questionId)?.note;
  };

  const updateSavedAnswerNote = (questionId: number, note: string) => {
    if (!currentUser) return;
    const updated = currentUser.savedAnswers.map((item) =>
      item.questionId === questionId ? { ...item, note } : item
    );
    saveUserSession({
      ...currentUser,
      savedAnswers: updated,
    });
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        register,
        login,
        loginAsGuest,
        logout,
        updateProfile,
        updatePreferences,
        addSearchHistory,
        clearSearchHistory,
        removeSearchHistoryItem,
        toggleSaveAnswer,
        isAnswerSaved,
        getSavedAnswerNote,
        updateSavedAnswerNote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
