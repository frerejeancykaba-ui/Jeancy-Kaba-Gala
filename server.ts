import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { ALL_QUESTIONS, searchQuestions } from './src/data/questions';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize GoogleGenAI client on server-side only
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * In-memory prayer requests storage (sensitive data handled privately)
 */
interface PrayerRecord {
  id: string;
  name?: string;
  topic: string;
  message: string;
  isPrivate: boolean;
  createdAt: string;
}

const recentPrayers: PrayerRecord[] = [];

/**
 * Health check
 */
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    aiConfigured: Boolean(ai),
    questionsCount: ALL_QUESTIONS.length,
    timestamp: new Date().toISOString(),
  });
});

/**
 * AI Biblical Q&A Endpoint
 * Uses gemini-3.8-flash server-side with structured theological schema
 */
app.post('/api/ai/ask', async (req: Request, res: Response): Promise<void> => {
  const { question, language = 'fr' } = req.body;

  if (!question || typeof question !== 'string' || question.trim().length < 3) {
    res.status(400).json({ error: 'La question est requise (au moins 3 caractères).' });
    return;
  }

  const trimmedQuestion = question.trim();

  // Step 1: Check if this question corresponds to an existing verified question in our 100-question database
  const localMatches = searchQuestions(trimmedQuestion);
  const bestMatch = localMatches.length > 0 ? localMatches[0] : null;

  const normalizedTrimmed = trimmedQuestion
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const isDirectMatch =
    bestMatch &&
    (bestMatch.question
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(normalizedTrimmed) ||
      normalizedTrimmed.includes(
        bestMatch.question
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      ));

  if (isDirectMatch) {
    res.json({
      source: 'local_database',
      question: bestMatch,
      message: 'Réponse issue de notre base vérifiée de 100 questions bibliques.',
    });
    return;
  }

  // If AI is not configured, fall back to best local match gracefully
  if (!ai) {
    if (bestMatch) {
      res.json({
        source: 'local_database',
        question: bestMatch,
        message: 'Réponse issue de notre base vérifiée de 100 questions bibliques.',
      });
      return;
    }
    res.status(503).json({
      error: 'AI_UNAVAILABLE',
      message: 'Le service d\'intelligence artificielle est momentanément indisponible et aucune réponse locale exacte n\'a été trouvée.',
      suggestions: localMatches.slice(0, 3),
    });
    return;
  }

  // Step 2: Query Gemini 3.8 Flash with structured schema
  try {
    const prompt = `Tu es l'assistant théologique de "WHO'S GOD?", une plateforme chrétienne biblique fondée sur la Parole de Dieu et l'amour manifesté en Jésus-Christ.
L'utilisateur te pose une question spirituelle: "${trimmedQuestion}".
Langue souhaitée: ${language === 'ln' ? 'Lingala avec références bibliques en français' : language === 'en' ? 'Anglais' : 'Français'}.

Règles théologiques impératives:
1. Ne fabrique jamais un verset, une référence ou une citation biblique. Cite des livres, chapitres et versets exacts vérifiables (traductions fiables type Louis Segond 1910).
2. Distingue explicitement le texte biblique de son explication ou interprétation.
3. Reste profondément pastoral, bienveillant, clair et accessible à une personne qui découvre la Bible.
4. Réponds strictement selon le schéma JSON demandé:
- shortAnswer: 2 à 3 phrases claires et directes maximum.
- biblicalPassages: 3 à 5 passages pertinents avec book, chapter (nombre), verses (texte ex: "16" ou "1-3"), text (citation exacte) et explanation (lien précis avec la question).
- understandPassage: Contexte historique et spirituel du passage, ce que dit le texte vs l'interprétation.
- biblicalStory: Un personnage ou récit biblique concret en rapport (character, reference, narrative, lesson).
- practicalApplication: 2 à 4 conseils raisonnables, concrets et constructifs pour la vie quotidienne.
- personalPrayer: Une prière courte, sincère, chaleureuse et réconfortante.
- relatedQuestions: 3 questions bibliques complémentaires pour approfondir.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            shortAnswer: { type: Type.STRING },
            biblicalPassages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  book: { type: Type.STRING },
                  chapter: { type: Type.INTEGER },
                  verses: { type: Type.STRING },
                  text: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ['book', 'chapter', 'verses', 'text', 'explanation'],
              },
            },
            understandPassage: { type: Type.STRING },
            biblicalStory: {
              type: Type.OBJECT,
              properties: {
                character: { type: Type.STRING },
                reference: { type: Type.STRING },
                narrative: { type: Type.STRING },
                lesson: { type: Type.STRING },
              },
              required: ['character', 'reference', 'narrative', 'lesson'],
            },
            practicalApplication: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            personalPrayer: { type: Type.STRING },
            relatedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'shortAnswer',
            'biblicalPassages',
            'understandPassage',
            'biblicalStory',
            'practicalApplication',
            'personalPrayer',
            'relatedQuestions',
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');

    res.json({
      source: 'gemini_ai',
      question: {
        id: Date.now(),
        slug: trimmedQuestion.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50),
        categoryId: bestMatch ? bestMatch.categoryId : 'dieu',
        question: trimmedQuestion,
        shortAnswer: parsedData.shortAnswer,
        biblicalPassages: parsedData.biblicalPassages || [],
        understandPassage: parsedData.understandPassage || '',
        biblicalStory: parsedData.biblicalStory || {
          character: 'Jésus-Christ',
          reference: 'Jean 14:1-6',
          narrative: 'Jésus rassure ses disciples troublés et leur montre le chemin vers le Père.',
          lesson: 'La foi en Jésus apporte la paix véritable.',
        },
        practicalApplication: parsedData.practicalApplication || [],
        personalPrayer: parsedData.personalPrayer || '',
        relatedQuestionIds: bestMatch ? bestMatch.relatedQuestionIds : [1, 2, 11],
        aiGenerated: true,
        aiRelatedQuestions: parsedData.relatedQuestions || [],
      },
    });
  } catch (error: any) {
    console.error('Error generating AI biblical answer:', error);
    if (bestMatch) {
      res.json({
        source: 'local_database_fallback',
        question: bestMatch,
        message: 'L\'IA a rencontré une erreur technique, voici la réponse vérifiée la plus proche dans notre base.',
      });
      return;
    }
    res.status(500).json({
      error: 'AI_ERROR',
      message: 'Une erreur est survenue lors de la génération biblique. Veuillez réessayer.',
    });
  }
});

/**
 * Conversational Biblical AI Assistant Endpoint
 * Provides interactive, contextual theological answers
 */
app.post('/api/ai/chat', async (req: Request, res: Response): Promise<void> => {
  const { message, history = [], language = 'fr' } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({ error: 'Le message est requis.' });
    return;
  }

  const userQuery = message.trim();

  // Search local database for potential scripture context
  const localMatches = searchQuestions(userQuery);
  const contextPassages = localMatches.slice(0, 2).flatMap((q) =>
    q.biblicalPassages.map((p) => `${p.book} ${p.chapter}:${p.verses} - "${p.text}"`)
  );

  // If Gemini API is available, use gemini-3.8-flash
  if (ai) {
    try {
      const systemInstruction = `Tu es l'Assistant Biblique Intelligent officiel de la plateforme "WHO'S GOD?", conçue par Jeancy KABA à Kinshasa, République démocratique du Congo.
Slogan : « Toutes tes questions sur Dieu méritent une réponse fondée sur sa Parole. »

Ta mission : Répondre parfaitement, chaleureusement, avec une grande précision théologique et pastorale à TOUTES les questions sur Dieu, Jésus-Christ, la Bible, la vie quotidienne, la foi, les épreuves, la prière, le pardon, les relations et l'éternité.

Règles impératives :
1. Fonde chaque réponse sur les Saintes Écritures (traductions fiables type Louis Segond 1910).
2. Cite toujours avec exactitude les références bibliques (Livre Chapitre:Verset).
3. Sois profondément bienveillant, clair, encourageant et édifiant, sans esprit de jugement.
4. Structure ta réponse de façon aérée et agréable à lire :
   - Éclairage direct et spirituel
   - Paroles de l'Écriture (citations de versets clés)
   - Application concrète pour la vie de tous les jours
   - Une courte prière ou bénédiction pour la personne
5. Langue : Si la question est posée en Lingala, réponds chaleureusement en Lingala. Si elle est en Anglais, réponds en Anglais. Sinon réponds en Français impeccable.

Passages bibliques de référence disponibles dans notre base pouvant t'inspirer :
${contextPassages.join('\n')}`;

      // Build contents array supporting conversation history
      const formattedContents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

      if (Array.isArray(history)) {
        for (const h of history.slice(-6)) {
          if (h && (h.role === 'user' || h.role === 'model') && typeof h.text === 'string') {
            formattedContents.push({
              role: h.role,
              parts: [{ text: h.text }],
            });
          }
        }
      }

      formattedContents.push({
        role: 'user',
        parts: [{ text: userQuery }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || '';

      res.json({
        reply: replyText,
        source: 'gemini-3.8-flash',
        suggestedQuestions: localMatches.slice(0, 3).map((q) => q.question),
      });
      return;
    } catch (err: any) {
      console.error('Error in /api/ai/chat:', err);
    }
  }

  // Graceful theological fallback when offline or without API key
  const fallbackMatch = localMatches[0] || ALL_QUESTIONS[0];
  const passagesList = fallbackMatch.biblicalPassages
    .map((p) => `• *${p.book} ${p.chapter}:${p.verses}* : « ${p.text} »`)
    .join('\n');

  const fallbackReply = `Que la paix et la grâce de Dieu soient avec toi.

Concernant ta question : **${userQuery}**, la Parole de Dieu nous éclaire puissamment :

${fallbackMatch.shortAnswer}

📖 **Ce que dit l'Écriture :**
${passagesList}

💡 **Application pratique :**
${fallbackMatch.practicalApplication.map((app) => `• ${app}`).join('\n')}

🙏 **Une prière pour toi :**
« ${fallbackMatch.personalPrayer} »

*Note : Réponse préparée par l'équipe d'intercession et d'étude biblique de WHO'S GOD? à Kinshasa.*`;

  res.json({
    reply: fallbackReply,
    source: 'biblical_knowledge_base',
    suggestedQuestions: localMatches.slice(1, 4).map((q) => q.question),
  });
});

/**
 * Prayer Requests endpoint
 */
app.post('/api/prayer', (req: Request, res: Response): void => {
  const { name, topic, message, isPrivate = true } = req.body;

  if (!topic || !message) {
    res.status(400).json({ error: 'Le sujet et le message de prière sont requis.' });
    return;
  }

  const record: PrayerRecord = {
    id: `prayer-${Date.now()}`,
    name: name?.trim() || 'Anonyme',
    topic: String(topic).slice(0, 100),
    message: String(message).slice(0, 1000),
    isPrivate: Boolean(isPrivate),
    createdAt: new Date().toISOString(),
  };

  recentPrayers.push(record);
  if (recentPrayers.length > 50) recentPrayers.shift();

  res.json({
    success: true,
    message: 'Ta demande de prière a été reçue avec respect et sera portée dans l\'intercession.',
    id: record.id,
  });
});

// Setup Vite development server or production static serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WHO'S GOD? server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
