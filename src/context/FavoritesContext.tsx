import React, { createContext, useContext, useState, useEffect } from 'react';
import { BiblicalQuestion } from '../types';
import { getQuestionById } from '../data/questions';

interface FavoritesContextType {
  favorites: number[];
  favoriteQuestions: BiblicalQuestion[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('whosgod_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('whosgod_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage:', e);
    }
  }, [favorites]);

  const isFavorite = (id: number) => favorites.includes(id);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item !== id));
  };

  const favoriteQuestions = favorites
    .map((id) => getQuestionById(id))
    .filter((q): q is BiblicalQuestion => q !== undefined);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteQuestions,
        isFavorite,
        toggleFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
