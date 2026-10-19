import { ALL_QUESTIONS } from './questions';
import { BiblicalQuestion } from '../types';

export interface BibleVerse {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
}

// Curated pool of verified passages from Louis Segond (1910)
export const CURATED_VERSES: BibleVerse[] = [
  // Genèse 1
  { id: 'gn-1-1', bookId: 'genese', bookName: 'Genèse', chapter: 1, verse: 1, text: 'Au commencement, Dieu créa les cieux et la terre.', translation: 'LSG 1910' },
  { id: 'gn-1-2', bookId: 'genese', bookName: 'Genèse', chapter: 1, verse: 2, text: 'La terre était informe et vide ; il y avait des ténèbres à la surface de l\'abîme, et l\'Esprit de Dieu se mouvait au-dessus des eaux.', translation: 'LSG 1910' },
  { id: 'gn-1-3', bookId: 'genese', bookName: 'Genèse', chapter: 1, verse: 3, text: 'Dieu dit : Que la lumière soit ! Et la lumière fut.', translation: 'LSG 1910' },
  { id: 'gn-1-26', bookId: 'genese', bookName: 'Genèse', chapter: 1, verse: 26, text: 'Puis Dieu dit : Faisons l\'homme à notre image, selon notre ressemblance, et qu\'il domine sur les poissons de la mer, sur les oiseaux du ciel, sur le bétail, sur toute la terre.', translation: 'LSG 1910' },
  { id: 'gn-1-27', bookId: 'genese', bookName: 'Genèse', chapter: 1, verse: 27, text: 'Dieu créa l\'homme à son image, il le créa à l\'image de Dieu, il créa l\'homme et la femme.', translation: 'LSG 1910' },
  { id: 'gn-1-31', bookId: 'genese', bookName: 'Genèse', chapter: 1, verse: 31, text: 'Dieu vit tout ce qu\'il avait fait et voici, cela était très bon. Ainsi, il y eut un soir, et il y eut un matin : ce fut le sixième jour.', translation: 'LSG 1910' },

  // Genèse 2 & 3
  { id: 'gn-2-7', bookId: 'genese', bookName: 'Genèse', chapter: 2, verse: 7, text: 'L\'Éternel Dieu forma l\'homme de la poussière de la terre, il souffla dans ses narines un souffle de vie et l\'homme devint un être vivant.', translation: 'LSG 1910' },
  { id: 'gn-2-24', bookId: 'genese', bookName: 'Genèse', chapter: 2, verse: 24, text: 'C\'est pourquoi l\'homme quittera son père et sa mère, et s\'attachera à sa femme, et ils deviendront une seule chair.', translation: 'LSG 1910' },
  { id: 'gn-3-15', bookId: 'genese', bookName: 'Genèse', chapter: 3, verse: 15, text: 'Je mettrai inimitié entre toi et la femme, entre ta postérité et sa postérité : celle-ci t\'écrasera la tête, et tu lui blesseras le talon.', translation: 'LSG 1910' },

  // Exode 3 & 20
  { id: 'ex-3-14', bookId: 'exode', bookName: 'Exode', chapter: 3, verse: 14, text: 'Dieu dit à Moïse : Je suis celui qui suis. Et il ajouta : C\'est ainsi que tu répondras aux enfants d\'Israël : Celui qui s\'appelle "Je suis" m\'a envoyé vers vous.', translation: 'LSG 1910' },
  { id: 'ex-20-3', bookId: 'exode', bookName: 'Exode', chapter: 20, verse: 3, text: 'Tu n\'auras pas d\'autres dieux devant ma face.', translation: 'LSG 1910' },
  { id: 'ex-20-12', bookId: 'exode', bookName: 'Exode', chapter: 20, verse: 12, text: 'Honore ton père et ta mère, afin que tes jours se prolongent dans le pays que l\'Éternel, ton Dieu, te donne.', translation: 'LSG 1910' },

  // Psaumes 23
  { id: 'ps-23-1', bookId: 'psaumes', bookName: 'Psaumes', chapter: 23, verse: 1, text: 'L\'Éternel est mon berger : je ne manquerai de rien.', translation: 'LSG 1910' },
  { id: 'ps-23-2', bookId: 'psaumes', bookName: 'Psaumes', chapter: 23, verse: 2, text: 'Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles.', translation: 'LSG 1910' },
  { id: 'ps-23-3', bookId: 'psaumes', bookName: 'Psaumes', chapter: 23, verse: 3, text: 'Il restaure mon âme, il me conduit dans les sentiers de la justice, à cause de son nom.', translation: 'LSG 1910' },
  { id: 'ps-23-4', bookId: 'psaumes', bookName: 'Psaumes', chapter: 23, verse: 4, text: 'Quand je marche dans la vallée de l\'ombre de la mort, je ne crains aucun mal, car tu es avec moi : ta houlette et ton bâton me rassurent.', translation: 'LSG 1910' },
  { id: 'ps-23-5', bookId: 'psaumes', bookName: 'Psaumes', chapter: 23, verse: 5, text: 'Tu dresses devant moi une table, en face de mes adversaires ; tu oins d\'huile ma tête, et ma coupe déborde.', translation: 'LSG 1910' },
  { id: 'ps-23-6', bookId: 'psaumes', bookName: 'Psaumes', chapter: 23, verse: 6, text: 'Oui, le bonheur et la grâce m\'accompagneront tous les jours de ma vie, et j\'habiterai dans la maison de l\'Éternel jusqu\'à la fin de mes jours.', translation: 'LSG 1910' },

  // Psaumes 46, 51, 91, 103, 119, 139
  { id: 'ps-46-1', bookId: 'psaumes', bookName: 'Psaumes', chapter: 46, verse: 1, text: 'Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.', translation: 'LSG 1910' },
  { id: 'ps-51-10', bookId: 'psaumes', bookName: 'Psaumes', chapter: 51, verse: 10, text: 'Ô Dieu ! crée en moi un cœur pur, renouvelle en moi un esprit bien disposé.', translation: 'LSG 1910' },
  { id: 'ps-91-1', bookId: 'psaumes', bookName: 'Psaumes', chapter: 91, verse: 1, text: 'Celui qui demeure sous l\'abri du Très-Haut repose à l\'ombre du Tout-Puissant.', translation: 'LSG 1910' },
  { id: 'ps-91-2', bookId: 'psaumes', bookName: 'Psaumes', chapter: 91, verse: 2, text: 'Je dis à l\'Éternel : Mon refuge et ma forteresse, mon Dieu en qui je me confie !', translation: 'LSG 1910' },
  { id: 'ps-103-12', bookId: 'psaumes', bookName: 'Psaumes', chapter: 103, verse: 12, text: 'Autant l\'orient est éloigné de l\'occident, autant il éloigne de nous nos transgressions.', translation: 'LSG 1910' },
  { id: 'ps-119-105', bookId: 'psaumes', bookName: 'Psaumes', chapter: 119, verse: 105, text: 'Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.', translation: 'LSG 1910' },
  { id: 'ps-139-1', bookId: 'psaumes', bookName: 'Psaumes', chapter: 139, verse: 1, text: 'Éternel ! tu me sondes et tu me connais.', translation: 'LSG 1910' },
  { id: 'ps-139-14', bookId: 'psaumes', bookName: 'Psaumes', chapter: 139, verse: 14, text: 'Je te loue de ce que je suis une créature si merveilleuse. Tes œuvres sont admirables, et mon âme le reconnaît bien.', translation: 'LSG 1910' },

  // Proverbes 3
  { id: 'pr-3-5', bookId: 'proverbes', bookName: 'Proverbes', chapter: 3, verse: 5, text: 'Confie-toi en l\'Éternel de tout ton cœur, et ne t\'appuie pas sur ta sagesse.', translation: 'LSG 1910' },
  { id: 'pr-3-6', bookId: 'proverbes', bookName: 'Proverbes', chapter: 3, verse: 6, text: 'Reconnais-le dans toutes tes voies, et il aplanira tes sentiers.', translation: 'LSG 1910' },
  { id: 'pr-3-9', bookId: 'proverbes', bookName: 'Proverbes', chapter: 3, verse: 9, text: 'Honore l\'Éternel avec tes biens, et avec les prémices de tout ton revenu.', translation: 'LSG 1910' },

  // Ésaïe 40, 41, 53
  { id: 'es-40-31', bookId: 'esaie', bookName: 'Ésaïe', chapter: 40, verse: 31, text: 'Mais ceux qui se confient en l\'Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; ils courent, et ne se lassent point, ils marchent, et ne se fatiguent point.', translation: 'LSG 1910' },
  { id: 'es-41-10', bookId: 'esaie', bookName: 'Ésaïe', chapter: 41, verse: 10, text: 'Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu ; je te fortifie, je viens à ton secours, je te soutiens de ma droite triomphante.', translation: 'LSG 1910' },
  { id: 'es-53-5', bookId: 'esaie', bookName: 'Ésaïe', chapter: 53, verse: 5, text: 'Mais il était blessé pour nos péchés, brisé pour nos iniquités ; le châtiment qui nous donne la paix est tombé sur lui, et c\'est par ses meurtrissures que nous sommes guéris.', translation: 'LSG 1910' },

  // Jérémie 29
  { id: 'jr-29-11', bookId: 'jeremie', bookName: 'Jérémie', chapter: 29, verse: 11, text: 'Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l\'espérance.', translation: 'LSG 1910' },
  { id: 'jr-29-13', bookId: 'jeremie', bookName: 'Jérémie', chapter: 29, verse: 13, text: 'Vous me chercherez, et vous me trouverez, si vous me cherchez de tout votre cœur.', translation: 'LSG 1910' },

  // Matthieu 5, 6, 11, 28
  { id: 'mt-5-3', bookId: 'matthieu', bookName: 'Matthieu', chapter: 5, verse: 3, text: 'Heureux les pauvres en esprit, car le royaume des cieux est à eux !', translation: 'LSG 1910' },
  { id: 'mt-5-4', bookId: 'matthieu', bookName: 'Matthieu', chapter: 5, verse: 4, text: 'Heureux les affligés, car ils seront consolés !', translation: 'LSG 1910' },
  { id: 'mt-5-9', bookId: 'matthieu', bookName: 'Matthieu', chapter: 5, verse: 9, text: 'Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu !', translation: 'LSG 1910' },
  { id: 'mt-5-14', bookId: 'matthieu', bookName: 'Matthieu', chapter: 5, verse: 14, text: 'Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée.', translation: 'LSG 1910' },
  { id: 'mt-6-9', bookId: 'matthieu', bookName: 'Matthieu', chapter: 6, verse: 9, text: 'Voici donc comment vous devez prier : Notre Père qui es aux cieux ! Que ton nom soit sanctifié ;', translation: 'LSG 1910' },
  { id: 'mt-6-10', bookId: 'matthieu', bookName: 'Matthieu', chapter: 6, verse: 10, text: 'que ton règne vienne ; que ta volonté soit faite sur la terre comme au ciel.', translation: 'LSG 1910' },
  { id: 'mt-6-33', bookId: 'matthieu', bookName: 'Matthieu', chapter: 6, verse: 33, text: 'Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.', translation: 'LSG 1910' },
  { id: 'mt-11-28', bookId: 'matthieu', bookName: 'Matthieu', chapter: 11, verse: 28, text: 'Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.', translation: 'LSG 1910' },
  { id: 'mt-28-19', bookId: 'matthieu', bookName: 'Matthieu', chapter: 28, verse: 19, text: 'Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit.', translation: 'LSG 1910' },
  { id: 'mt-28-20', bookId: 'matthieu', bookName: 'Matthieu', chapter: 28, verse: 20, text: 'Et enseignez-leur à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu\'à la fin du monde.', translation: 'LSG 1910' },

  // Jean 1, 3, 10, 14, 15
  { id: 'jn-1-1', bookId: 'jean', bookName: 'Jean', chapter: 1, verse: 1, text: 'Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.', translation: 'LSG 1910' },
  { id: 'jn-1-12', bookId: 'jean', bookName: 'Jean', chapter: 1, verse: 12, text: 'Mais à tous ceux qui l\'ont reçue, à ceux qui croient en son nom, elle a donné le pouvoir de devenir enfants de Dieu.', translation: 'LSG 1910' },
  { id: 'jn-1-14', bookId: 'jean', bookName: 'Jean', chapter: 1, verse: 14, text: 'Et la Parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité ; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père.', translation: 'LSG 1910' },
  { id: 'jn-3-3', bookId: 'jean', bookName: 'Jean', chapter: 3, verse: 3, text: 'Jésus lui répondit : En vérité, en vérité, je te le dis, si un homme ne naît de nouveau, il ne peut voir le royaume de Dieu.', translation: 'LSG 1910' },
  { id: 'jn-3-16', bookId: 'jean', bookName: 'Jean', chapter: 3, verse: 16, text: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.', translation: 'LSG 1910' },
  { id: 'jn-10-10', bookId: 'jean', bookName: 'Jean', chapter: 10, verse: 10, text: 'Le voleur ne vient que pour dérober, égorger et détruire ; moi, je suis venu afin que les brebis aient la vie, et qu\'elles soient dans l\'abondance.', translation: 'LSG 1910' },
  { id: 'jn-14-6', bookId: 'jean', bookName: 'Jean', chapter: 14, verse: 6, text: 'Jésus lui dit : Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.', translation: 'LSG 1910' },
  { id: 'jn-14-27', bookId: 'jean', bookName: 'Jean', chapter: 14, verse: 27, text: 'Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s\'alarme point.', translation: 'LSG 1910' },
  { id: 'jn-15-5', bookId: 'jean', bookName: 'Jean', chapter: 15, verse: 5, text: 'Je suis le cep, vous êtes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire.', translation: 'LSG 1910' },

  // Romains 3, 5, 8, 10, 12
  { id: 'rm-3-23', bookId: 'romains', bookName: 'Romains', chapter: 3, verse: 23, text: 'Car tous ont péché et sont privés de la gloire de Dieu.', translation: 'LSG 1910' },
  { id: 'rm-5-8', bookId: 'romains', bookName: 'Romains', chapter: 5, verse: 8, text: 'Mais Dieu prouve son amour envers nous, en ce que, lorsque nous étions encore des pécheurs, Christ est mort pour nous.', translation: 'LSG 1910' },
  { id: 'rm-8-1', bookId: 'romains', bookName: 'Romains', chapter: 8, verse: 1, text: 'Il n\'y a donc maintenant aucune condamnation pour ceux qui sont en Jésus-Christ.', translation: 'LSG 1910' },
  { id: 'rm-8-28', bookId: 'romains', bookName: 'Romains', chapter: 8, verse: 28, text: 'Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.', translation: 'LSG 1910' },
  { id: 'rm-8-38', bookId: 'romains', bookName: 'Romains', chapter: 8, verse: 38, text: 'Car j\'ai l\'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir,', translation: 'LSG 1910' },
  { id: 'rm-8-39', bookId: 'romains', bookName: 'Romains', chapter: 8, verse: 39, text: 'ni les puissances, ni la hauteur, ni la profondeur, ni aucune autre créature ne pourra nous séparer de l\'amour de Dieu manifesté en Jésus-Christ notre Seigneur.', translation: 'LSG 1910' },
  { id: 'rm-10-9', bookId: 'romains', bookName: 'Romains', chapter: 10, verse: 9, text: 'Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton cœur que Dieu l\'a ressuscité des morts, tu seras sauvé.', translation: 'LSG 1910' },
  { id: 'rm-10-17', bookId: 'romains', bookName: 'Romains', chapter: 10, verse: 17, text: 'Ainsi la foi vient de ce qu\'on entend, et ce qu\'on entend vient de la parole de Christ.', translation: 'LSG 1910' },
  { id: 'rm-12-2', bookId: 'romains', bookName: 'Romains', chapter: 12, verse: 2, text: 'Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l\'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait.', translation: 'LSG 1910' },
  { id: 'rm-12-21', bookId: 'romains', bookName: 'Romains', chapter: 12, verse: 21, text: 'Ne te laisse pas vaincre par le mal, mais surmonte le mal par le bien.', translation: 'LSG 1910' },

  // 1 Corinthiens 13
  { id: '1co-13-4', bookId: '1-corinthiens', bookName: '1 Corinthiens', chapter: 13, verse: 4, text: 'La charité est patiente, elle est pleine de bonté ; la charité n\'est point envieuse ; la charité ne se vante point, elle ne s\'enfle point d\'orgueil.', translation: 'LSG 1910' },
  { id: '1co-13-13', bookId: '1-corinthiens', bookName: '1 Corinthiens', chapter: 13, verse: 13, text: 'Maintenant donc ces trois choses demeurent : la foi, l\'espérance, la charité ; mais la plus grande de ces choses, c\'est la charité.', translation: 'LSG 1910' },

  // Éphésiens 2, 6
  { id: 'ep-2-8', bookId: 'ephesiens', bookName: 'Éphésiens', chapter: 2, verse: 8, text: 'Car c\'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c\'est le don de Dieu.', translation: 'LSG 1910' },
  { id: 'ep-2-9', bookId: 'ephesiens', bookName: 'Éphésiens', chapter: 2, verse: 9, text: 'Ce n\'est point par les œuvres, afin que personne ne se glorifie.', translation: 'LSG 1910' },
  { id: 'ep-6-10', bookId: 'ephesiens', bookName: 'Éphésiens', chapter: 6, verse: 10, text: 'Au reste, fortifiez-vous dans le Seigneur, et par sa force toute-puissante.', translation: 'LSG 1910' },
  { id: 'ep-6-11', bookId: 'ephesiens', bookName: 'Éphésiens', chapter: 6, verse: 11, text: 'Revêtez-vous de toutes les armes de Dieu, afin de pouvoir tenir ferme contre les ruses du diable.', translation: 'LSG 1910' },

  // Philippiens 4
  { id: 'ph-4-6', bookId: 'philippiens', bookName: 'Philippiens', chapter: 4, verse: 6, text: 'Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.', translation: 'LSG 1910' },
  { id: 'ph-4-7', bookId: 'philippiens', bookName: 'Philippiens', chapter: 4, verse: 7, text: 'Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.', translation: 'LSG 1910' },
  { id: 'ph-4-13', bookId: 'philippiens', bookName: 'Philippiens', chapter: 4, verse: 13, text: 'Je puis tout par celui qui me fortifie.', translation: 'LSG 1910' },

  // Hébreux 11
  { id: 'he-11-1', bookId: 'hebreux', bookName: 'Hébreux', chapter: 11, verse: 1, text: 'Or la foi est une ferme assurance des choses qu\'on espère, une démonstration de celles qu\'on ne voit pas.', translation: 'LSG 1910' },
  { id: 'he-11-6', bookId: 'hebreux', bookName: 'Hébreux', chapter: 11, verse: 6, text: 'Or sans la foi il est impossible de lui être agréable ; car il faut que celui qui s\'approche de Dieu croie que Dieu existe, et qu\'il est le rémunérateur de ceux qui le cherchent.', translation: 'LSG 1910' },

  // 1 Jean 1, 3, 4
  { id: '1jn-1-9', bookId: '1-jean', bookName: '1 Jean', chapter: 1, verse: 9, text: 'Si nous confessons nos péchés, il est fidèle et juste pour nous les pardonner, et pour nous purifier de toute iniquité.', translation: 'LSG 1910' },
  { id: '1jn-3-1', bookId: '1-jean', bookName: '1 Jean', chapter: 3, verse: 1, text: 'Voyez quel amour le Père nous a témoigné, pour que nous soyons appelés enfants de Dieu ! Et nous le sommes.', translation: 'LSG 1910' },
  { id: '1jn-4-8', bookId: '1-jean', bookName: '1 Jean', chapter: 4, verse: 8, text: 'Celui qui n\'aime pas n\'a pas connu Dieu, car Dieu est amour.', translation: 'LSG 1910' },
  { id: '1jn-4-18', bookId: '1-jean', bookName: '1 Jean', chapter: 4, verse: 18, text: 'La crainte n\'est pas dans l\'amour, mais l\'amour parfait bannit la crainte.', translation: 'LSG 1910' },
  { id: '1jn-4-19', bookId: '1-jean', bookName: '1 Jean', chapter: 4, verse: 19, text: 'Pour nous, nous l\'aimons, parce qu\'il nous a aimés le premier.', translation: 'LSG 1910' },

  // Josué 1
  { id: 'jos-1-8', bookId: 'josue', bookName: 'Josué', chapter: 1, verse: 8, text: 'Que ce livre de la loi ne s\'éloigne point de ta bouche ; médite-le jour et nuit, pour agir fidèlement selon tout ce qui y est écrit ; car c\'est alors que tu auras du succès dans tes entreprises, c\'est alors que tu réussiras.', translation: 'LSG 1910' },
  { id: 'jos-1-9', bookId: 'josue', bookName: 'Josué', chapter: 1, verse: 9, text: 'Ne t\'ai-je pas donné cet ordre : Fortifie-toi et prends courage ? Ne t\'effraie point et ne t\'épouvante point, car l\'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.', translation: 'LSG 1910' },

  // Psaumes 1, 27, 121
  { id: 'ps-1-1', bookId: 'psaumes', bookName: 'Psaumes', chapter: 1, verse: 1, text: 'Heureux l\'homme qui ne marche pas selon le conseil des méchants, qui ne s\'arrête pas sur la voie des pécheurs, et qui ne s\'assied pas en compagnie des moqueurs,', translation: 'LSG 1910' },
  { id: 'ps-1-2', bookId: 'psaumes', bookName: 'Psaumes', chapter: 1, verse: 2, text: 'Mais qui trouve son plaisir dans la loi de l\'Éternel, et qui la médite jour et nuit !', translation: 'LSG 1910' },
  { id: 'ps-27-1', bookId: 'psaumes', bookName: 'Psaumes', chapter: 27, verse: 1, text: 'L\'Éternel est ma lumière et mon salut : de qui aurais-je crainte ? L\'Éternel est le soutien de ma vie : de qui aurais-je peur ?', translation: 'LSG 1910' },
  { id: 'ps-121-1', bookId: 'psaumes', bookName: 'Psaumes', chapter: 121, verse: 1, text: 'Je lève mes yeux vers les montagnes... D\'où me viendra le secours ?', translation: 'LSG 1910' },
  { id: 'ps-121-2', bookId: 'psaumes', bookName: 'Psaumes', chapter: 121, verse: 2, text: 'Le secours me vient de l\'Éternel, qui a fait les cieux et la terre.', translation: 'LSG 1910' },

  // Proverbes 4 & 16
  { id: 'pr-4-23', bookId: 'proverbes', bookName: 'Proverbes', chapter: 4, verse: 23, text: 'Garde ton cœur plus que toute autre chose, car de lui jaillissent les sources de la vie.', translation: 'LSG 1910' },
  { id: 'pr-16-3', bookId: 'proverbes', bookName: 'Proverbes', chapter: 16, verse: 3, text: 'Recommande à l\'Éternel tes œuvres, et tes projets réussiront.', translation: 'LSG 1910' },

  // Ésaïe 9 & 55
  { id: 'es-9-5', bookId: 'esaie', bookName: 'Ésaïe', chapter: 9, verse: 5, text: 'Car un enfant nous est né, un fils nous est donné, et la domination reposera sur son épaule ; on l\'appellera Admirable, Conseiller, Dieu puissant, Père éternel, Prince de la paix.', translation: 'LSG 1910' },
  { id: 'es-55-6', bookId: 'esaie', bookName: 'Ésaïe', chapter: 55, verse: 6, text: 'Cherchez l\'Éternel pendant qu\'il se trouve ; invoquez-le, tandis qu\'il est près.', translation: 'LSG 1910' },

  // Galates 5
  { id: 'ga-5-22', bookId: 'galates', bookName: 'Galates', chapter: 5, verse: 22, text: 'Mais le fruit de l\'Esprit, c\'est l\'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité,', translation: 'LSG 1910' },
  { id: 'ga-5-23', bookId: 'galates', bookName: 'Galates', chapter: 5, verse: 23, text: 'la douceur, la tempérance ; la loi n\'est pas contre ces choses.', translation: 'LSG 1910' },

  // Colossiens 3
  { id: 'col-3-12', bookId: 'colossiens', bookName: 'Colossiens', chapter: 3, verse: 12, text: 'Ainsi donc, comme des élus de Dieu, saints et bien-aimés, revêtez-vous d\'entrailles de miséricorde, de bonté, d\'humilité, de douceur, de patience.', translation: 'LSG 1910' },
  { id: 'col-3-13', bookId: 'colossiens', bookName: 'Colossiens', chapter: 3, verse: 13, text: 'Supportez-vous les uns les autres, et, si l\'un a sujet de se plaindre de l\'autre, pardonnez-vous réciproquement. De même que Christ vous a pardonné, pardonnez-vous aussi.', translation: 'LSG 1910' },

  // Jacques 1
  { id: 'jc-1-5', bookId: 'jacques', bookName: 'Jacques', chapter: 1, verse: 5, text: 'Si quelqu\'un d\'entre vous manque de sagesse, qu\'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée.', translation: 'LSG 1910' },

  // 1 Pierre 5
  { id: '1p-5-7', bookId: '1-pierre', bookName: '1 Pierre', chapter: 5, verse: 7, text: 'et déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.', translation: 'LSG 1910' },

  // Apocalypse 21 & 22
  { id: 'ap-21-4', bookId: 'apocalypse', bookName: 'Apocalypse', chapter: 21, verse: 4, text: 'Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n\'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu.', translation: 'LSG 1910' },
  { id: 'ap-21-5', bookId: 'apocalypse', bookName: 'Apocalypse', chapter: 21, verse: 5, text: 'Et celui qui était assis sur le trône dit : Voici, je fais toutes choses nouvelles.', translation: 'LSG 1910' },
  { id: 'ap-22-13', bookId: 'apocalypse', bookName: 'Apocalypse', chapter: 22, verse: 13, text: 'Je suis l\'alpha et l\'oméga, le premier et le dernier, le commencement et la fin.', translation: 'LSG 1910' },
];

function normalize(str: string): string {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

/**
 * Find all questions from the 100 questions database that cite a specific book
 */
export function findQuestionsReferencingBook(bookName: string): BiblicalQuestion[] {
  const normBook = normalize(bookName);
  return ALL_QUESTIONS.filter((q) => {
    return q.biblicalPassages.some((p) => {
      const pBook = normalize(p.book);
      return pBook.includes(normBook) || normBook.includes(pBook);
    });
  });
}

/**
 * Find all questions from the 100 questions database that cite a specific passage (Book, Chapter, and optional Verse)
 */
export function findQuestionsReferencingPassage(
  bookName: string,
  chapter: number,
  verse?: number
): BiblicalQuestion[] {
  const normBook = normalize(bookName);

  return ALL_QUESTIONS.filter((q) => {
    return q.biblicalPassages.some((p) => {
      const pBook = normalize(p.book);
      const isSameBook = pBook.includes(normBook) || normBook.includes(pBook);
      if (!isSameBook) return false;
      if (p.chapter !== chapter) return false;

      if (verse !== undefined) {
        // Check if verse is in the range string, e.g. "1-4" or "16"
        const cleanVerses = p.verses.replace(/\s+/g, '');
        if (cleanVerses.includes('-')) {
          const [startStr, endStr] = cleanVerses.split('-');
          const start = parseInt(startStr, 10);
          const end = parseInt(endStr, 10);
          if (!isNaN(start) && !isNaN(end)) {
            return verse >= start && verse <= end;
          }
        }
        return p.verses.includes(String(verse));
      }

      return true;
    });
  });
}

/**
 * Get verses for a specific book and chapter
 */
export function getPassagesByBookAndChapter(bookNameOrId: string, chapter: number): BibleVerse[] {
  const norm = normalize(bookNameOrId);
  return CURATED_VERSES.filter((v) => {
    const vBook = normalize(v.bookName);
    const vId = normalize(v.bookId);
    return (vBook.includes(norm) || vId === norm || norm.includes(vBook)) && v.chapter === chapter;
  });
}

/**
 * Search the Bible verses and also return linked platform questions!
 */
export function searchBibleVerses(query: string): {
  verse: BibleVerse;
  relatedQuestions: BiblicalQuestion[];
}[] {
  const q = normalize(query);
  if (!q) return [];

  const results: { verse: BibleVerse; relatedQuestions: BiblicalQuestion[] }[] = [];

  for (const v of CURATED_VERSES) {
    const vText = normalize(v.text);
    const vRef = normalize(`${v.bookName} ${v.chapter}:${v.verse}`);
    const vBook = normalize(v.bookName);

    if (vText.includes(q) || vRef.includes(q) || (q.includes(vBook) && q.includes(String(v.chapter)))) {
      const relatedQuestions = findQuestionsReferencingPassage(v.bookName, v.chapter, v.verse);
      results.push({ verse: v, relatedQuestions });
    }
  }

  return results;
}
