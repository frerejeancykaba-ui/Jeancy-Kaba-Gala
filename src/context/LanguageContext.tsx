import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface Translations {
  home: string;
  explore: string;
  categories: string;
  passages: string;
  dailyVerse: string;
  about: string;
  needPrayer: string;
  favorites: string;
  myProfile: string;
  loginRegister: string;
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  findAnswer: string;
  popularQuestions: string;
  popularSubtitle: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  verseOfDayTitle: string;
  explorePassage: string;
  share: string;
  shareWhatsApp: string;
  shareFacebook: string;
  copyLink: string;
  copyVerse: string;
  copied: string;
  invitationTitle: string;
  invitationSubtitle: string;
  exploreBible: string;
  footerTagline: string;
  footerRights: string;
  privacy: string;
  terms: string;
  legal: string;
  close: string;
  shortAnswer: string;
  whatBibleSays: string;
  understandPassage: string;
  biblicalStory: string;
  practicalApp: string;
  prayerForYou: string;
  goFurther: string;
  listenAudio: string;
  stopAudio: string;
  sourceVerified: string;
  sourceAI: string;
  voiceSearch: string;
  all100Questions: string;
  filterAll: string;
  noResults: string;
  askAiPrompt: string;
  sendPrayer: string;
}

const DICTIONARY: Record<Language, Translations> = {
  fr: {
    home: 'Accueil',
    explore: 'Explorer les questions',
    categories: 'Catégories',
    passages: 'Explorer les passages',
    dailyVerse: 'Verset du jour',
    about: 'À propos',
    needPrayer: 'J\'ai besoin de prière',
    favorites: 'Favoris',
    myProfile: 'Mon Espace',
    loginRegister: 'Se connecter',
    heroTitle: 'Tu te poses des questions sur Dieu ? Commençons ici.',
    heroSubtitle: 'Explore la Bible, découvre Jésus-Christ et trouve des réponses à tes questions sur la foi, la vie et l\'espérance.',
    searchPlaceholder: 'Pose ta question... Pourquoi Dieu permet-il la souffrance ?',
    findAnswer: 'Trouver une réponse',
    popularQuestions: 'Questions les plus recherchées',
    popularSubtitle: 'Des réponses claires et fondées sur la Parole pour les interrogations fondamentales du cœur.',
    categoriesTitle: 'Thèmes et Catégories Bibliques',
    categoriesSubtitle: 'Explore 100 questions et réponses approfondies classées par domaines de vie.',
    verseOfDayTitle: 'LA PAROLE DU JOUR',
    explorePassage: 'Méditer ce passage',
    share: 'Partager',
    shareWhatsApp: 'Partager sur WhatsApp',
    shareFacebook: 'Partager sur Facebook',
    copyLink: 'Copier le lien',
    copyVerse: 'Copier le verset',
    copied: 'Copié dans le presse-papier !',
    invitationTitle: 'Aucune question sincère n\'est trop petite pour commencer à chercher Dieu.',
    invitationSubtitle: 'La Bible apporte une clarté vivante pour chaque saison de ton existence.',
    exploreBible: 'Explorer les 100 questions',
    footerTagline: 'Toutes tes questions sur Dieu méritent une réponse fondée sur sa Parole.',
    footerRights: 'Créé par Jeancy KABA à Kinshasa, RDC, pour partager la connaissance et l\'amour de Dieu manifesté en Jésus-Christ notre Seigneur.',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d\'utilisation',
    legal: 'Mentions légales',
    close: 'Fermer',
    shortAnswer: 'RÉPONSE COURTE',
    whatBibleSays: 'CE QUE DIT LA BIBLE',
    understandPassage: 'COMPRENDRE LE PASSAGE',
    biblicalStory: 'UNE HISTOIRE BIBLIQUE LIÉE',
    practicalApp: 'COMMENT APPLIQUER CETTE PAROLE ?',
    prayerForYou: 'UNE PRIÈRE POUR TOI',
    goFurther: 'POUR ALLER PLUS LOIN',
    listenAudio: 'Écouter la réponse',
    stopAudio: 'Arrêter la lecture',
    sourceVerified: 'Réponse vérifiée issue de la base biblique',
    sourceAI: 'Réponse approfondie assistée par IA théologique',
    voiceSearch: 'Recherche vocale',
    all100Questions: 'Les 100 Questions Bibliques',
    filterAll: 'Toutes les questions',
    noResults: 'Aucune question trouvée pour cette recherche.',
    askAiPrompt: 'Poser cette question à l\'intelligence artificielle biblique',
    sendPrayer: 'Envoyer ma demande',
  },
  ln: {
    home: 'Ebandeli',
    explore: 'Mituna nyonso',
    categories: 'Biteni ya mateya',
    passages: 'Talela biteni ya Biblia',
    dailyVerse: 'Liloba ya lelo',
    about: 'Na ntina ya biso',
    needPrayer: 'Nazali na mposa ya losambo',
    favorites: 'Oyo nalingi mingi',
    myProfile: 'Esika na ngai',
    loginRegister: 'Kokota',
    heroTitle: 'Ozali komituna mituna na ntina ya Nzambe? Tobanda awa.',
    heroSubtitle: 'Tanga Biblia, yeba Yesu Klisto mpe zwa biyano na mituna na yo na ntina ya kondima, bomoi mpe elikya.',
    searchPlaceholder: 'Tuna motuna na yo... Mpo na nini Nzambe atikaka mpasi?',
    findAnswer: 'Zwa eyano',
    popularQuestions: 'Mituna oyo batunaka mingi',
    popularSubtitle: 'Biyano ya polele oyo euti na Liloba ya Nzambe mpo na kopesa kimya na motema.',
    categoriesTitle: 'Biteni ya Biblia',
    categoriesSubtitle: 'Talela mituna 100 mpe biyano ya bosolo oyo ebongisami malamu.',
    verseOfDayTitle: 'LILOBA YA LELO',
    explorePassage: 'Kanyisa liloba oyo',
    share: 'Kabola',
    shareWhatsApp: 'Kabola na WhatsApp',
    shareFacebook: 'Kabola na Facebook',
    copyLink: 'Kopola lien',
    copyVerse: 'Kopola vɛrsɛ',
    copied: 'Ekopami malamu!',
    invitationTitle: 'Motuna moko te ezali moke mpo na kobanda koluka Nzambe.',
    invitationSubtitle: 'Biblia epesaka pole ya solo mpo na bomoi na yo mobimba.',
    exploreBible: 'Talela mituna 100 nyonso',
    footerTagline: 'Mituna nyonso na yo na ntina ya Nzambe esengeli kozwa eyano euti na Liloba na Ye.',
    footerRights: 'Esalamaki na Jeancy KABA na Kinshasa, RDC, mpo na kokabola boyebi mpe bolingo ya Nzambe na Yesu Klisto.',
    privacy: 'Bokengi ya basango na yo',
    terms: 'Mibeko ya kosalela',
    legal: 'Makambo ya mibeko',
    close: 'Kanga',
    shortAnswer: 'EYANO YA MOKUSE',
    whatBibleSays: 'BIBLIA ELOBI NINI',
    understandPassage: 'KOSOSOLA LILOBA OYO',
    biblicalStory: 'LISOLO MOKO YA BIBLIA',
    practicalApp: 'NDENGE NINI KOSALELA LILOBA OYO?',
    prayerForYou: 'LOSAMBO MPO NA YO',
    goFurther: 'MPO NA KOYEBA LISUSU MINGI',
    listenAudio: 'Yoka eyano',
    stopAudio: 'Tika koyoka',
    sourceVerified: 'Eyano ya bosolo euti na Biblia',
    sourceAI: 'Eyano euti na mayele ya masini ya Biblia (IA)',
    voiceSearch: 'Koluka na mongongo',
    all100Questions: 'Mituna 100 ya Biblia',
    filterAll: 'Mituna nyonso',
    noResults: 'Motuna moko te emonani na boluki oyo.',
    askAiPrompt: 'Tuna motuna oyo na mayele ya masini ya Biblia',
    sendPrayer: 'Tinda losambo na ngai',
  },
  en: {
    home: 'Home',
    explore: 'Explore Questions',
    categories: 'Categories',
    passages: 'Bible Passages',
    dailyVerse: 'Verse of the Day',
    about: 'About',
    needPrayer: 'I Need Prayer',
    favorites: 'Favorites',
    myProfile: 'My Profile',
    loginRegister: 'Sign In',
    heroTitle: 'Have questions about God? Let\'s begin here.',
    heroSubtitle: 'Explore the Bible, discover Jesus Christ, and find grounded answers to your questions on faith, life, and hope.',
    searchPlaceholder: 'Ask your question... Why does God allow suffering?',
    findAnswer: 'Find an answer',
    popularQuestions: 'Most Searched Questions',
    popularSubtitle: 'Clear, scripturally grounded answers to the foundational questions of the human heart.',
    categoriesTitle: 'Biblical Topics & Categories',
    categoriesSubtitle: 'Explore 100 structured questions and in-depth answers covering every area of life.',
    verseOfDayTitle: 'WORD OF THE DAY',
    explorePassage: 'Meditate on this passage',
    share: 'Share',
    shareWhatsApp: 'Share on WhatsApp',
    shareFacebook: 'Share on Facebook',
    copyLink: 'Copy link',
    copyVerse: 'Copy verse text',
    copied: 'Copied to clipboard!',
    invitationTitle: 'No sincere question is too small to begin seeking God.',
    invitationSubtitle: 'The Bible brings living clarity to every season of your life.',
    exploreBible: 'Explore all 100 questions',
    footerTagline: 'Every question you have about God deserves an answer grounded in His Word.',
    footerRights: 'Created by Jeancy KABA in Kinshasa, DRC, to share the knowledge and love of God manifested in Jesus Christ our Lord.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    legal: 'Legal Notice',
    close: 'Close',
    shortAnswer: 'SHORT ANSWER',
    whatBibleSays: 'WHAT THE BIBLE SAYS',
    understandPassage: 'UNDERSTANDING THE PASSAGE',
    biblicalStory: 'A RELATED BIBLICAL STORY',
    practicalApp: 'HOW TO APPLY THIS WORD?',
    prayerForYou: 'A PRAYER FOR YOU',
    goFurther: 'GO DEEPER',
    listenAudio: 'Listen to answer',
    stopAudio: 'Stop audio',
    sourceVerified: 'Verified answer from local biblical database',
    sourceAI: 'In-depth answer generated by Biblical AI',
    voiceSearch: 'Voice search',
    all100Questions: 'The 100 Biblical Questions',
    filterAll: 'All questions',
    noResults: 'No questions matched your search.',
    askAiPrompt: 'Ask this question to the Biblical AI',
    sendPrayer: 'Send prayer request',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('whosgod_lang') as Language | null;
    if (saved === 'fr' || saved === 'ln' || saved === 'en') return saved;
    return 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('whosgod_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: DICTIONARY[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
