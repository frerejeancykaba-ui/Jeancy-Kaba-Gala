import { BiblicalQuestion } from '../../types';
import { QUESTIONS_CAT1_GOD } from './cat1_god';
import { QUESTIONS_CAT2_JESUS } from './cat2_jesus';
import { QUESTIONS_CAT3_FAITH } from './cat3_faith';
import { QUESTIONS_CAT4_PRAYER } from './cat4_prayer';
import { QUESTIONS_CAT5_SUFFERING } from './cat5_suffering';
import { QUESTIONS_CAT6_LOVE } from './cat6_love';
import { QUESTIONS_CAT7_MONEY } from './cat7_money';
import { QUESTIONS_CAT8_SIN } from './cat8_sin';
import { QUESTIONS_CAT9_FAMILY } from './cat9_family';
import { QUESTIONS_CAT10_ETERNITY } from './cat10_eternity';

export const ALL_QUESTIONS: BiblicalQuestion[] = [
  ...QUESTIONS_CAT1_GOD,
  ...QUESTIONS_CAT2_JESUS,
  ...QUESTIONS_CAT3_FAITH,
  ...QUESTIONS_CAT4_PRAYER,
  ...QUESTIONS_CAT5_SUFFERING,
  ...QUESTIONS_CAT6_LOVE,
  ...QUESTIONS_CAT7_MONEY,
  ...QUESTIONS_CAT8_SIN,
  ...QUESTIONS_CAT9_FAMILY,
  ...QUESTIONS_CAT10_ETERNITY,
];

/**
 * The 12 Popular Questions requested on homepage:
 * 1. Qui est Dieu ?
 * 2. Dieu existe-t-il vraiment ?
 * 3. Pourquoi Jésus est-il mort sur la croix ? (id: 12)
 * 4. Comment être sauvé ? (id: 23)
 * 5. Comment pardonner à quelqu'un qui m'a fait du mal ? (id: 73)
 * 6. Dieu m'a-t-il abandonné ? (id: 43)
 * 7. Pourquoi les justes souffrent-ils ? (id: 42)
 * 8. Comment prier efficacement ? (id: 31)
 * 9. Que dit la Bible sur l'argent ? (id: 61)
 * 10. Comment trouver un amour véritable ? (id: 51)
 * 11. Qu'est-ce que le Saint-Esprit ? (id: 37)
 * 12. Que se passe-t-il après la mort ? (id: 91)
 */
export const POPULAR_QUESTION_IDS: number[] = [1, 2, 12, 23, 73, 43, 42, 31, 61, 51, 37, 91];

export function getPopularQuestions(): BiblicalQuestion[] {
  return POPULAR_QUESTION_IDS.map((id) => ALL_QUESTIONS.find((q) => q.id === id)!).filter(Boolean);
}

export function getQuestionById(id: number): BiblicalQuestion | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

export function getQuestionBySlug(slug: string): BiblicalQuestion | undefined {
  return ALL_QUESTIONS.find((q) => q.slug === slug);
}

export function getQuestionsByCategory(categoryId: string): BiblicalQuestion[] {
  return ALL_QUESTIONS.filter((q) => q.categoryId === categoryId);
}

export function getRelatedQuestions(question: BiblicalQuestion): BiblicalQuestion[] {
  const byIds = question.relatedQuestionIds
    .map((id) => getQuestionById(id))
    .filter((q): q is BiblicalQuestion => q !== undefined);

  if (byIds.length < 3) {
    const sameCat = ALL_QUESTIONS.filter((q) => q.categoryId === question.categoryId && q.id !== question.id);
    for (const q of sameCat) {
      if (!byIds.some((existing) => existing.id === q.id)) {
        byIds.push(q);
      }
      if (byIds.length >= 3) break;
    }
  }

  return byIds.slice(0, 3);
}

function normalizeStr(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();
}

export interface SearchMatchResult {
  question: BiblicalQuestion;
  score: number;
}

/**
 * Intelligent local search engine matching queries against question text,
 * short answer, passages, keywords and Lingala equivalents.
 */
export function searchQuestions(rawQuery: string): BiblicalQuestion[] {
  const query = normalizeStr(rawQuery);
  if (!query) return [];

  const tokens = query.split(/\s+/).filter((t) => t.length > 1);
  if (tokens.length === 0) return [];

  const results: SearchMatchResult[] = [];

  for (const q of ALL_QUESTIONS) {
    const normQ = normalizeStr(q.question);
    const normQLn = q.questionLn ? normalizeStr(q.questionLn) : '';
    const normShort = normalizeStr(q.shortAnswer);
    const normPassages = normalizeStr(
      q.biblicalPassages.map((p) => `${p.book} ${p.chapter} ${p.text} ${p.explanation}`).join(' ')
    );
    const normStory = normalizeStr(`${q.biblicalStory.character} ${q.biblicalStory.lesson}`);

    let score = 0;

    // Exact question match bonus
    if (normQ === query || normQLn === query) {
      score += 150;
    } else if (normQ.includes(query) || (normQLn && normQLn.includes(query))) {
      score += 70;
    }

    // Token matching
    for (const token of tokens) {
      if (normQ.includes(token)) score += 20;
      if (normQLn && normQLn.includes(token)) score += 18;
      if (normShort.includes(token)) score += 8;
      if (normStory.includes(token)) score += 6;
      if (normPassages.includes(token)) score += 4;
    }

    if (score > 0) {
      results.push({ question: q, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.map((r) => r.question);
}
