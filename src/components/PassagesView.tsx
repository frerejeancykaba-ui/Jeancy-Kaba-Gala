import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Share2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Filter,
  Bookmark,
  MessageCircle,
} from 'lucide-react';
import { BIBLE_BOOKS, BibleBook, searchBooks } from '../data/bibleBooks';
import {
  CURATED_VERSES,
  BibleVerse,
  findQuestionsReferencingPassage,
  findQuestionsReferencingBook,
  searchBibleVerses,
  getPassagesByBookAndChapter,
} from '../data/biblePassages';
import { BiblicalQuestion } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

interface PassagesViewProps {
  onSelectQuestion: (question: BiblicalQuestion) => void;
  initialBookId?: string;
  initialChapter?: number;
}

export const PassagesView: React.FC<PassagesViewProps> = ({
  onSelectQuestion,
  initialBookId = 'jean',
  initialChapter = 3,
}) => {
  const { t } = useLanguage();
  const { currentUser, addSearchHistory } = useUser();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Navigation state
  const [testamentFilter, setTestamentFilter] = useState<'ALL' | 'AT' | 'NT'>('ALL');
  const [bookSearch, setBookSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<BibleBook>(() => {
    return BIBLE_BOOKS.find((b) => b.id === initialBookId) || BIBLE_BOOKS.find((b) => b.id === 'jean') || BIBLE_BOOKS[0];
  });
  const [selectedChapter, setSelectedChapter] = useState<number>(initialChapter);
  const [selectedVerseNumber, setSelectedVerseNumber] = useState<number | null>(null);

  // Audio speech synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter books based on testament and bookSearch
  const availableBooks = useMemo(() => {
    let list = BIBLE_BOOKS;
    if (testamentFilter !== 'ALL') {
      list = list.filter((b) => b.testament === testamentFilter);
    }
    if (bookSearch.trim()) {
      const q = bookSearch.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      list = list.filter((b) => {
        const name = b.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const abbr = b.abbreviation.toLowerCase();
        return name.includes(q) || abbr.includes(q);
      });
    }
    return list;
  }, [testamentFilter, bookSearch]);

  // When selected book changes, ensure chapter is within valid bounds
  const handleSelectBook = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    setSelectedVerseNumber(null);
  };

  // Get verses for current book & chapter
  const currentChapterVerses = useMemo(() => {
    const list = getPassagesByBookAndChapter(selectedBook.name, selectedChapter);
    if (list.length > 0) {
      if (selectedVerseNumber !== null) {
        return list.filter((v) => v.verse === selectedVerseNumber);
      }
      return list;
    }

    // Fallback if not yet in curated pool: provide chapter introduction and anchor verses
    return [
      {
        id: `${selectedBook.id}-${selectedChapter}-1`,
        bookId: selectedBook.id,
        bookName: selectedBook.name,
        chapter: selectedChapter,
        verse: 1,
        text: `Méditation sur ${selectedBook.name}, chapitre ${selectedChapter}. « Que la grâce et la paix vous soient multipliées par la connaissance de Dieu et de Jésus notre Seigneur. »`,
        translation: currentUser?.preferences.bibleTranslation || 'LSG 1910',
      },
    ];
  }, [selectedBook, selectedChapter, selectedVerseNumber, currentUser]);

  // Find linked questions from WHO'S GOD? for current chapter and verse
  const linkedQuestions = useMemo(() => {
    return findQuestionsReferencingPassage(
      selectedBook.name,
      selectedChapter,
      selectedVerseNumber || undefined
    );
  }, [selectedBook, selectedChapter, selectedVerseNumber]);

  // Find broader questions from the same book if no exact chapter question
  const bookRelatedQuestions = useMemo(() => {
    if (linkedQuestions.length > 0) return [];
    return findQuestionsReferencingBook(selectedBook.name).slice(0, 3);
  }, [selectedBook, linkedQuestions]);

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchBibleVerses(searchQuery.trim());
  }, [searchQuery]);

  const handleExecuteSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    addSearchHistory(query, 'passage');
  };

  const handleCopy = (verse: BibleVerse) => {
    const textToCopy = `« ${verse.text} » — ${verse.bookName} ${verse.chapter}:${verse.verse} (${verse.translation})\nDécouvert sur WHO'S GOD?`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(verse.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareWhatsApp = (verse: BibleVerse) => {
    const text = encodeURIComponent(
      `« ${verse.text} »\n— ${verse.bookName} ${verse.chapter}:${verse.verse} (${verse.translation})\n\nExplore les réponses bibliques sur : ${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handlePlayAudio = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Compute font size class based on user preferences
  const fontSizeClass = useMemo(() => {
    const pref = currentUser?.preferences.fontSize;
    if (pref === 'sm') return 'text-sm sm:text-base';
    if (pref === 'lg') return 'text-lg sm:text-xl';
    if (pref === 'xl') return 'text-xl sm:text-2xl';
    return 'text-base sm:text-lg';
  }, [currentUser]);

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Explorer les Saintes Écritures</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white font-['Playfair_Display',serif] tracking-tight">
          Passages & Textes Bibliques
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          Naviguez par livre, chapitre et verset. Chaque passage est directement connecté aux questions et réponses doctrinales de WHO'S GOD?.
        </p>
      </div>

      {/* Search Bar for Verses & Passages */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(e.target.value.trim().length > 0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                handleExecuteSearch(searchQuery.trim());
              }
            }}
            placeholder="Rechercher un verset ou passage (ex: Jean 3:16, Psaume 23, pardon, amour...)"
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111C3D] text-sm text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#D4AF37]"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearching(false);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ×
            </button>
          )}
        </div>

        {/* Suggestion Quick Chips */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center mt-3">
          <span className="text-[11px] font-semibold text-gray-400 mr-1">Exemples :</span>
          {[
            'Jean 3:16',
            'Psaume 23:1',
            'Jérémie 29:11',
            'Romains 8:28',
            'Ésaïe 40:31',
            '1 Jean 4:8',
            'Matthieu 6:33',
            'Philippiens 4:13',
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleExecuteSearch(chip)}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#1E3A8A] dark:hover:border-[#D4AF37] hover:text-[#1E3A8A] dark:hover:text-[#D4AF37] transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* IF ACTIVE SEARCH RESULTS */}
      {isSearching && searchQuery.trim().length > 0 ? (
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Résultats pour « {searchQuery} » ({searchResults.length})
            </h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearching(false);
              }}
              className="text-xs font-semibold text-[#1E3A8A] dark:text-[#D4AF37] hover:underline"
            >
              Retour à la navigation par livre
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700 text-center space-y-2">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Aucun verset répertorié ne correspond exactement à votre recherche.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Essayez avec une référence biblique (ex: « Jean 3:16 », « Psaume 23 ») ou explorez directement un livre ci-dessous.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map(({ verse, relatedQuestions }) => (
                <div
                  key={verse.id}
                  className="p-5 rounded-3xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700/80 shadow-xs space-y-4 hover:border-[#D4AF37]/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/20 text-[#1E3A8A] dark:text-[#D4AF37]">
                        {verse.bookName} {verse.chapter}:{verse.verse}
                      </span>
                      <span className="ml-2 text-[10px] text-gray-400 uppercase font-semibold">
                        {verse.translation}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(verse)}
                        className="p-2 rounded-lg text-gray-500 hover:text-[#1E3A8A] dark:hover:text-[#D4AF37] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Copier le verset"
                      >
                        {copiedId === verse.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleShareWhatsApp(verse)}
                        className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                        title="Partager sur WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <blockquote className="text-base sm:text-lg font-['Playfair_Display',serif] italic text-gray-900 dark:text-gray-100 leading-relaxed border-l-3 border-[#D4AF37] pl-4">
                    « {verse.text} »
                  </blockquote>

                  {/* Connected Answers */}
                  {relatedQuestions.length > 0 && (
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] dark:text-[#D4AF37]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Réponse biblique associée sur WHO'S GOD? :</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {relatedQuestions.map((q) => (
                          <button
                            key={q.id}
                            onClick={() => onSelectQuestion(q)}
                            className="text-left p-3 rounded-xl bg-gray-50 dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 hover:border-[#1E3A8A] dark:hover:border-[#D4AF37] flex items-center justify-between gap-3 group transition-colors"
                          >
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">
                                Question n°{q.id}
                              </span>
                              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-[#D4AF37] transition-colors">
                                {q.question}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1E3A8A] dark:group-hover:text-[#D4AF37] shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* MAIN NAVIGATION VIEW: BOOK -> CHAPTER -> VERSE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: BOOK SELECTOR (4 COLS) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-3xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#1E3A8A] dark:text-[#D4AF37]" />
                  <span>Livres de la Bible (66)</span>
                </h3>
                <span className="text-[10px] text-gray-400 uppercase font-semibold">
                  {selectedBook.testament === 'AT' ? 'Ancien T.' : 'Nouveau T.'}
                </span>
              </div>

              {/* Testament Filter Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setTestamentFilter('ALL')}
                  className={`py-1.5 rounded-lg transition-all ${
                    testamentFilter === 'ALL'
                      ? 'bg-white dark:bg-[#111C3D] text-[#1E3A8A] dark:text-[#D4AF37] shadow-xs'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Tous (66)
                </button>
                <button
                  onClick={() => setTestamentFilter('AT')}
                  className={`py-1.5 rounded-lg transition-all ${
                    testamentFilter === 'AT'
                      ? 'bg-white dark:bg-[#111C3D] text-[#1E3A8A] dark:text-[#D4AF37] shadow-xs'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  A.T. (39)
                </button>
                <button
                  onClick={() => setTestamentFilter('NT')}
                  className={`py-1.5 rounded-lg transition-all ${
                    testamentFilter === 'NT'
                      ? 'bg-white dark:bg-[#111C3D] text-[#1E3A8A] dark:text-[#D4AF37] shadow-xs'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  N.T. (27)
                </button>
              </div>

              {/* Filter book search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                  placeholder="Filtrer un livre..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0B132B] text-xs text-gray-900 dark:text-white"
                />
              </div>

              {/* Books List (Scrollable) */}
              <div className="max-h-[380px] overflow-y-auto pr-1 space-y-1">
                {availableBooks.map((book) => {
                  const isSelected = selectedBook.id === book.id;
                  return (
                    <button
                      key={book.id}
                      onClick={() => handleSelectBook(book)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#1E3A8A] text-white shadow-xs font-bold'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 text-[10px] uppercase font-bold ${
                            isSelected ? 'text-[#D4AF37]' : 'text-gray-400'
                          }`}
                        >
                          {book.abbreviation}
                        </span>
                        <span>{book.name}</span>
                      </div>
                      <span
                        className={`text-[10px] ${
                          isSelected ? 'text-white/80' : 'text-gray-400'
                        }`}
                      >
                        {book.chaptersCount} ch.
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CHAPTER SELECTOR & PASSAGE DISPLAY (8 COLS) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Book Meta & Chapter Selector Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700/80 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold font-['Playfair_Display',serif] text-gray-900 dark:text-white">
                      {selectedBook.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/20 text-[#B8860B] dark:text-[#D4AF37]">
                      {selectedBook.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedBook.testament === 'AT' ? 'Ancien Testament' : 'Nouveau Testament'} •{' '}
                    {selectedBook.chaptersCount} chapitres au total
                  </p>
                </div>

                {/* Chapter prev/next buttons */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    disabled={selectedChapter <= 1}
                    onClick={() => {
                      setSelectedChapter((prev) => Math.max(1, prev - 1));
                      setSelectedVerseNumber(null);
                    }}
                    className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Chapitre précédent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 px-1">
                    Ch. {selectedChapter} / {selectedBook.chaptersCount}
                  </span>
                  <button
                    disabled={selectedChapter >= selectedBook.chaptersCount}
                    onClick={() => {
                      setSelectedChapter((prev) => Math.min(selectedBook.chaptersCount, prev + 1));
                      setSelectedVerseNumber(null);
                    }}
                    className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Chapitre suivant"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chapters Number Grid */}
              <div>
                <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Sélectionner un chapitre :
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                  {Array.from({ length: selectedBook.chaptersCount }, (_, i) => i + 1).map((ch) => {
                    const isCurrent = ch === selectedChapter;
                    return (
                      <button
                        key={ch}
                        onClick={() => {
                          setSelectedChapter(ch);
                          setSelectedVerseNumber(null);
                        }}
                        className={`w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                          isCurrent
                            ? 'bg-[#1E3A8A] text-white shadow-sm ring-2 ring-[#D4AF37]/50'
                            : 'bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional: Filter by specific verse */}
              {currentChapterVerses.length > 1 && (
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-[11px] font-semibold text-gray-400 whitespace-nowrap">
                    Versets :
                  </span>
                  <button
                    onClick={() => setSelectedVerseNumber(null)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                      selectedVerseNumber === null
                        ? 'bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/20 text-[#1E3A8A] dark:text-[#D4AF37] font-bold'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    Tout le chapitre
                  </button>
                  {currentChapterVerses.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVerseNumber(v.verse)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                        selectedVerseNumber === v.verse
                          ? 'bg-[#1E3A8A] text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      v. {v.verse}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Passage Display Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111C3D] border border-gray-200 dark:border-gray-700/80 shadow-md space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold font-['Playfair_Display',serif] text-gray-900 dark:text-white">
                    {selectedBook.name} {selectedChapter}
                    {selectedVerseNumber ? `:${selectedVerseNumber}` : ''}
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase font-semibold">
                    {currentUser?.preferences.bibleTranslation || 'LSG 1910'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const fullText = currentChapterVerses.map((v) => v.text).join(' ');
                      handlePlayAudio(fullText);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      isPlayingAudio
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                    title="Écouter la lecture audio"
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Arrêter</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#D4AF37]" />
                        <span>Écouter</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Verses Text */}
              <div className="space-y-4">
                {currentChapterVerses.map((v) => (
                  <div
                    key={v.id}
                    className="group relative pl-7 py-1 text-gray-800 dark:text-gray-100 hover:bg-gray-50/70 dark:hover:bg-gray-800/40 rounded-xl transition-colors"
                  >
                    <span className="absolute left-1 top-1.5 text-xs font-bold text-[#1E3A8A] dark:text-[#D4AF37]">
                      {v.verse}
                    </span>
                    <p className={`font-['Playfair_Display',serif] ${fontSizeClass} leading-relaxed`}>
                      {v.text}
                    </p>

                    {/* Inline Quick Action Tools */}
                    <div className="mt-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(v)}
                        className="text-[11px] text-gray-500 hover:text-[#1E3A8A] dark:hover:text-[#D4AF37] flex items-center gap-1 font-semibold"
                      >
                        {copiedId === v.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span>Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleShareWhatsApp(v)}
                        className="text-[11px] text-emerald-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* LINKED PLATFORM ANSWERS SECTION */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {linkedQuestions.length > 0
                      ? `${linkedQuestions.length} Réponse(s) Biblique(s) Associée(s) sur WHO'S GOD? :`
                      : `Enseignements en lien avec le livre de ${selectedBook.name} :`}
                  </h4>
                </div>

                {linkedQuestions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {linkedQuestions.map((q) => (
                      <div
                        key={q.id}
                        onClick={() => onSelectQuestion(q)}
                        className="p-4 rounded-2xl bg-gradient-to-r from-[#1E3A8A]/5 via-transparent to-[#D4AF37]/10 border border-[#1E3A8A]/20 dark:border-[#D4AF37]/30 hover:border-[#1E3A8A] dark:hover:border-[#D4AF37] cursor-pointer transition-all shadow-xs group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-bold text-[#1E3A8A] dark:text-[#D4AF37] uppercase tracking-wider">
                              Question n°{q.id}
                            </span>
                            <h5 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-[#D4AF37] transition-colors">
                              {q.question}
                            </h5>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 italic">
                              « {q.shortAnswer} »
                            </p>
                          </div>

                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#1E3A8A] text-white group-hover:bg-[#172554] shrink-0 transition-colors">
                            <span>Lire</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : bookRelatedQuestions.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {bookRelatedQuestions.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => onSelectQuestion(q)}
                        className="p-3 rounded-xl bg-gray-50 dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-left hover:border-[#1E3A8A] dark:hover:border-[#D4AF37] transition-colors group"
                      >
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          Question n°{q.id}
                        </span>
                        <p className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-[#D4AF37]">
                          {q.question}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    Aucune question directe n'est encore indexée pour ce chapitre spécifique. Vous pouvez poser une question à ce sujet depuis notre recherche principale.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
