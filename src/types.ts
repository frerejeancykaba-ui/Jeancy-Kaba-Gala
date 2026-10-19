export type Language = 'fr' | 'ln' | 'en';

export interface BiblicalPassage {
  book: string;
  chapter: number;
  verses: string;
  text: string;
  explanation: string;
}

export interface BiblicalStory {
  character: string;
  reference: string;
  narrative: string;
  lesson: string;
}

export interface BiblicalQuestion {
  id: number;
  slug: string;
  categoryId: string;
  question: string;
  questionLn?: string;
  questionEn?: string;
  shortAnswer: string;
  shortAnswerLn?: string;
  shortAnswerEn?: string;
  biblicalPassages: BiblicalPassage[];
  understandPassage: string;
  biblicalStory: BiblicalStory;
  practicalApplication: string[];
  personalPrayer: string;
  relatedQuestionIds: number[];
  isPopular?: boolean;
}

export interface Category {
  id: string;
  title: string;
  titleLn: string;
  titleEn: string;
  description: string;
  descriptionLn: string;
  iconName: string;
  count: number;
  order: number;
}

export interface VerseOfTheDay {
  id: string;
  book: string;
  chapter: number;
  verse: string;
  text: string;
  theme: string;
  explanation: string;
  context: string;
}

export interface PrayerSubmission {
  name?: string;
  topic: string;
  message: string;
  isPrivate: boolean;
  timestamp: number;
}
