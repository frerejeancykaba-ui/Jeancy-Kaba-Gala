export interface BibleBook {
  id: string;
  name: string;
  nameEn: string;
  testament: 'AT' | 'NT';
  category: string;
  chaptersCount: number;
  abbreviation: string;
}

export const BIBLE_BOOKS: BibleBook[] = [
  // Ancien Testament (39 livres)
  // Pentateuque
  { id: 'genese', name: 'Genèse', nameEn: 'Genesis', testament: 'AT', category: 'Pentateuque', chaptersCount: 50, abbreviation: 'Gn' },
  { id: 'exode', name: 'Exode', nameEn: 'Exodus', testament: 'AT', category: 'Pentateuque', chaptersCount: 40, abbreviation: 'Ex' },
  { id: 'levitique', name: 'Lévitique', nameEn: 'Leviticus', testament: 'AT', category: 'Pentateuque', chaptersCount: 27, abbreviation: 'Lv' },
  { id: 'nombres', name: 'Nombres', nameEn: 'Numbers', testament: 'AT', category: 'Pentateuque', chaptersCount: 36, abbreviation: 'Nb' },
  { id: 'deuteronome', name: 'Deutéronome', nameEn: 'Deuteronomy', testament: 'AT', category: 'Pentateuque', chaptersCount: 34, abbreviation: 'Dt' },

  // Livres Historiques
  { id: 'josue', name: 'Josué', nameEn: 'Joshua', testament: 'AT', category: 'Historique', chaptersCount: 24, abbreviation: 'Jos' },
  { id: 'juges', name: 'Juges', nameEn: 'Judges', testament: 'AT', category: 'Historique', chaptersCount: 21, abbreviation: 'Jg' },
  { id: 'ruth', name: 'Ruth', nameEn: 'Ruth', testament: 'AT', category: 'Historique', chaptersCount: 4, abbreviation: 'Rt' },
  { id: '1-samuel', name: '1 Samuel', nameEn: '1 Samuel', testament: 'AT', category: 'Historique', chaptersCount: 31, abbreviation: '1S' },
  { id: '2-samuel', name: '2 Samuel', nameEn: '2 Samuel', testament: 'AT', category: 'Historique', chaptersCount: 24, abbreviation: '2S' },
  { id: '1-rois', name: '1 Rois', nameEn: '1 Kings', testament: 'AT', category: 'Historique', chaptersCount: 22, abbreviation: '1R' },
  { id: '2-rois', name: '2 Rois', nameEn: '2 Kings', testament: 'AT', category: 'Historique', chaptersCount: 25, abbreviation: '2R' },
  { id: '1-chroniques', name: '1 Chroniques', nameEn: '1 Chronicles', testament: 'AT', category: 'Historique', chaptersCount: 29, abbreviation: '1Ch' },
  { id: '2-chroniques', name: '2 Chroniques', nameEn: '2 Chronicles', testament: 'AT', category: 'Historique', chaptersCount: 36, abbreviation: '2Ch' },
  { id: 'esdras', name: 'Esdras', nameEn: 'Ezra', testament: 'AT', category: 'Historique', chaptersCount: 10, abbreviation: 'Esd' },
  { id: 'nehemie', name: 'Néhémie', nameEn: 'Nehemiah', testament: 'AT', category: 'Historique', chaptersCount: 13, abbreviation: 'Ne' },
  { id: 'esther', name: 'Esther', nameEn: 'Esther', testament: 'AT', category: 'Historique', chaptersCount: 10, abbreviation: 'Est' },

  // Livres Poétiques et de Sagesse
  { id: 'job', name: 'Job', nameEn: 'Job', testament: 'AT', category: 'Poétique & Sagesse', chaptersCount: 42, abbreviation: 'Jb' },
  { id: 'psaumes', name: 'Psaumes', nameEn: 'Psalms', testament: 'AT', category: 'Poétique & Sagesse', chaptersCount: 150, abbreviation: 'Ps' },
  { id: 'proverbes', name: 'Proverbes', nameEn: 'Proverbs', testament: 'AT', category: 'Poétique & Sagesse', chaptersCount: 31, abbreviation: 'Pr' },
  { id: 'ecclesiaste', name: 'Ecclésiaste', nameEn: 'Ecclesiastes', testament: 'AT', category: 'Poétique & Sagesse', chaptersCount: 12, abbreviation: 'Ec' },
  { id: 'cantique-des-cantiques', name: 'Cantique des Cantiques', nameEn: 'Song of Solomon', testament: 'AT', category: 'Poétique & Sagesse', chaptersCount: 8, abbreviation: 'Ct' },

  // Grands Prophètes
  { id: 'esaie', name: 'Ésaïe', nameEn: 'Isaiah', testament: 'AT', category: 'Grands Prophètes', chaptersCount: 66, abbreviation: 'Es' },
  { id: 'jeremie', name: 'Jérémie', nameEn: 'Jeremiah', testament: 'AT', category: 'Grands Prophètes', chaptersCount: 52, abbreviation: 'Jr' },
  { id: 'lamentations', name: 'Lamentations', nameEn: 'Lamentations', testament: 'AT', category: 'Grands Prophètes', chaptersCount: 5, abbreviation: 'Lm' },
  { id: 'ezechiel', name: 'Ézéchiel', nameEn: 'Ezekiel', testament: 'AT', category: 'Grands Prophètes', chaptersCount: 48, abbreviation: 'Ez' },
  { id: 'daniel', name: 'Daniel', nameEn: 'Daniel', testament: 'AT', category: 'Grands Prophètes', chaptersCount: 12, abbreviation: 'Dn' },

  // Petits Prophètes
  { id: 'osee', name: 'Osée', nameEn: 'Hosea', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 14, abbreviation: 'Os' },
  { id: 'joel', name: 'Joël', nameEn: 'Joel', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 3, abbreviation: 'Jl' },
  { id: 'amos', name: 'Amos', nameEn: 'Amos', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 9, abbreviation: 'Am' },
  { id: 'abdias', name: 'Abdias', nameEn: 'Obadiah', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 1, abbreviation: 'Ab' },
  { id: 'jonas', name: 'Jonas', nameEn: 'Jonah', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 4, abbreviation: 'Jon' },
  { id: 'michee', name: 'Michée', nameEn: 'Micah', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 7, abbreviation: 'Mi' },
  { id: 'nahum', name: 'Nahum', nameEn: 'Nahum', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 3, abbreviation: 'Na' },
  { id: 'habacuc', name: 'Habacuc', nameEn: 'Habakkuk', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 3, abbreviation: 'Ha' },
  { id: 'sophonie', name: 'Sophonie', nameEn: 'Zephaniah', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 3, abbreviation: 'So' },
  { id: 'aggee', name: 'Aggée', nameEn: 'Haggai', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 2, abbreviation: 'Ag' },
  { id: 'zacharie', name: 'Zacharie', nameEn: 'Zechariah', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 14, abbreviation: 'Za' },
  { id: 'malachie', name: 'Malachie', nameEn: 'Malachi', testament: 'AT', category: 'Petits Prophètes', chaptersCount: 4, abbreviation: 'Ml' },

  // Nouveau Testament (27 livres)
  // Évangiles & Actes
  { id: 'matthieu', name: 'Matthieu', nameEn: 'Matthew', testament: 'NT', category: 'Évangiles', chaptersCount: 28, abbreviation: 'Mt' },
  { id: 'marc', name: 'Marc', nameEn: 'Mark', testament: 'NT', category: 'Évangiles', chaptersCount: 16, abbreviation: 'Mc' },
  { id: 'luc', name: 'Luc', nameEn: 'Luke', testament: 'NT', category: 'Évangiles', chaptersCount: 24, abbreviation: 'Lc' },
  { id: 'jean', name: 'Jean', nameEn: 'John', testament: 'NT', category: 'Évangiles', chaptersCount: 21, abbreviation: 'Jn' },
  { id: 'actes', name: 'Actes', nameEn: 'Acts', testament: 'NT', category: 'Histoire de l\'Église', chaptersCount: 28, abbreviation: 'Ac' },

  // Épîtres de Paul
  { id: 'romains', name: 'Romains', nameEn: 'Romans', testament: 'NT', category: 'Épîtres Pauliniennes', chaptersCount: 16, abbreviation: 'Rm' },
  { id: '1-corinthiens', name: '1 Corinthiens', nameEn: '1 Corinthians', testament: 'NT', category: 'Épîtres Pauliniennes', chaptersCount: 16, abbreviation: '1Co' },
  { id: '2-corinthiens', name: '2 Corinthiens', nameEn: '2 Corinthians', testament: 'NT', category: 'Épîtres Pauliniennes', chaptersCount: 13, abbreviation: '2Co' },
  { id: 'galates', name: 'Galates', nameEn: 'Galatians', testament: 'NT', category: 'Épîtres Pauliniennes', chaptersCount: 6, abbreviation: 'Ga' },
  { id: 'ephesiens', name: 'Éphésiens', nameEn: 'Ephesians', testament: 'NT', category: 'Épîtres Pauliniennes', chaptersCount: 6, abbreviation: 'Ep' },
  { id: 'philippiens', name: 'Philippiens', nameEn: 'Philippians', testament: 'NT', category: 'Épîtres Pauliniennes', chaptersCount: 4, abbreviation: 'Ph' },
  { id: 'colossiens', name: 'Colossiens', nameEn: 'Colossians', testament: 'NT', category: 'Épîtres Pauliniennes', chaptersCount: 4, abbreviation: 'Col' },
  { id: '1-thessaloniciens', name: '1 Thessaloniciens', nameEn: '1 Thessalonians', testament: 'NT', category: 'Épîtres Pauliniennes', chaptersCount: 5, abbreviation: '1Th' },
  { id: '2-thessaloniciens', name: '2 Thessaloniciens', nameEn: '2 Thessalonians', testament: 'NT', category: 'Épîtres Pauliniennes', chaptersCount: 3, abbreviation: '2Th' },
  { id: '1-timothee', name: '1 Timothée', nameEn: '1 Timothy', testament: 'NT', category: 'Épîtres Pastorales', chaptersCount: 6, abbreviation: '1Tm' },
  { id: '2-timothee', name: '2 Timothée', nameEn: '2 Timothy', testament: 'NT', category: 'Épîtres Pastorales', chaptersCount: 4, abbreviation: '2Tm' },
  { id: 'tite', name: 'Tite', nameEn: 'Titus', testament: 'NT', category: 'Épîtres Pastorales', chaptersCount: 3, abbreviation: 'Tt' },
  { id: 'philemon', name: 'Philémon', nameEn: 'Philemon', testament: 'NT', category: 'Épîtres Pauliniennes', chaptersCount: 1, abbreviation: 'Phm' },

  // Épîtres Générales
  { id: 'hebreux', name: 'Hébreux', nameEn: 'Hebrews', testament: 'NT', category: 'Épîtres Générales', chaptersCount: 13, abbreviation: 'He' },
  { id: 'jacques', name: 'Jacques', nameEn: 'James', testament: 'NT', category: 'Épîtres Générales', chaptersCount: 5, abbreviation: 'Jc' },
  { id: '1-pierre', name: '1 Pierre', nameEn: '1 Peter', testament: 'NT', category: 'Épîtres Générales', chaptersCount: 5, abbreviation: '1P' },
  { id: '2-pierre', name: '2 Pierre', nameEn: '2 Peter', testament: 'NT', category: 'Épîtres Générales', chaptersCount: 3, abbreviation: '2P' },
  { id: '1-jean', name: '1 Jean', nameEn: '1 John', testament: 'NT', category: 'Épîtres Générales', chaptersCount: 5, abbreviation: '1Jn' },
  { id: '2-jean', name: '2 Jean', nameEn: '2 John', testament: 'NT', category: 'Épîtres Générales', chaptersCount: 1, abbreviation: '2Jn' },
  { id: '3-jean', name: '3 Jean', nameEn: '3 John', testament: 'NT', category: 'Épîtres Générales', chaptersCount: 1, abbreviation: '3Jn' },
  { id: 'jude', name: 'Jude', nameEn: 'Jude', testament: 'NT', category: 'Épîtres Générales', chaptersCount: 1, abbreviation: 'Jud' },

  // Révélation
  { id: 'apocalypse', name: 'Apocalypse', nameEn: 'Revelation', testament: 'NT', category: 'Prophétie & Révélation', chaptersCount: 22, abbreviation: 'Ap' },
];

export function getBookById(id: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === id);
}

export function searchBooks(query: string): BibleBook[] {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  if (!q) return BIBLE_BOOKS;
  return BIBLE_BOOKS.filter((b) => {
    const nameNorm = b.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const abbrNorm = b.abbreviation.toLowerCase();
    return nameNorm.includes(q) || abbrNorm.includes(q) || b.category.toLowerCase().includes(q);
  });
}
