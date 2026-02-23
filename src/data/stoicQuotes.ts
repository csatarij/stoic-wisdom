export type QuoteCategory = "resilience" | "wisdom" | "death" | "happiness" | "discipline" | "virtue" | "mindfulness";

export interface StoicQuote {
  id: number;
  text: string;
  author: string;
  source?: string;
  categories: QuoteCategory[];
}

export interface AuthorInfo {
  name: string;
  born: string;
  died: string;
  bio: string;
  school: string;
}

export const authorBios: Record<string, AuthorInfo> = {
  "Seneca": {
    name: "Lucius Annaeus Seneca",
    born: "c. 4 BC",
    died: "AD 65",
    bio: "Roman Stoic philosopher, statesman, and dramatist. Tutor and later advisor to Emperor Nero. His works on ethics, natural philosophy, and consolation remain foundational texts of Stoic thought.",
    school: "Stoicism",
  },
  "Marcus Aurelius": {
    name: "Marcus Aurelius Antoninus",
    born: "AD 121",
    died: "AD 180",
    bio: "Roman Emperor from 161 to 180 and a Stoic philosopher. His personal writings, known as 'Meditations', are a series of private notes to himself on Stoic philosophy and self-improvement.",
    school: "Stoicism",
  },
  "Epictetus": {
    name: "Epictetus",
    born: "c. AD 50",
    died: "c. AD 135",
    bio: "Born into slavery in Hierapolis, Phrygia. After gaining freedom, he taught philosophy in Rome and later Nicopolis. His teachings, recorded by his student Arrian, emphasize the dichotomy of control.",
    school: "Stoicism",
  },
};

export const categoryLabels: Record<QuoteCategory, string> = {
  resilience: "Resilience",
  wisdom: "Wisdom",
  death: "Mortality",
  happiness: "Happiness",
  discipline: "Discipline",
  virtue: "Virtue",
  mindfulness: "Mindfulness",
};

export const stoicQuotes: StoicQuote[] = [
  { id: 1, text: "We suffer more often in imagination than in reality.", author: "Seneca", source: "Letters to Lucilius", categories: ["resilience", "mindfulness"] },
  { id: 2, text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius", source: "Meditations", categories: ["happiness", "mindfulness"] },
  { id: 3, text: "It is not things that disturb us, but our judgments about things.", author: "Epictetus", source: "Enchiridion", categories: ["wisdom", "mindfulness"] },
  { id: 4, text: "You have power over your mind — not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", source: "Meditations", categories: ["resilience", "discipline"] },
  { id: 5, text: "He who fears death will never do anything worthy of a man who is alive.", author: "Seneca", source: "Letters to Lucilius", categories: ["death", "resilience"] },
  { id: 6, text: "Man is not worried by real problems so much as by his imagined anxieties about real problems.", author: "Epictetus", source: "Discourses", categories: ["wisdom", "mindfulness"] },
  { id: 7, text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius", source: "Meditations", categories: ["virtue", "discipline"] },
  { id: 8, text: "If it is not right, do not do it; if it is not true, do not say it.", author: "Marcus Aurelius", source: "Meditations", categories: ["virtue", "wisdom"] },
  { id: 9, text: "No man is free who is not master of himself.", author: "Epictetus", categories: ["discipline", "wisdom"] },
  { id: 10, text: "Luck is what happens when preparation meets opportunity.", author: "Seneca", categories: ["discipline", "resilience"] },
  { id: 11, text: "The best revenge is not to be like your enemy.", author: "Marcus Aurelius", source: "Meditations", categories: ["virtue", "wisdom"] },
  { id: 12, text: "Difficulties strengthen the mind, as labor does the body.", author: "Seneca", categories: ["resilience", "discipline"] },
  { id: 13, text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus", source: "Discourses", categories: ["discipline", "virtue"] },
  { id: 14, text: "It is not because things are difficult that we do not dare; it is because we do not dare that things are difficult.", author: "Seneca", source: "Letters to Lucilius", categories: ["resilience", "wisdom"] },
  { id: 15, text: "The soul becomes dyed with the color of its thoughts.", author: "Marcus Aurelius", source: "Meditations", categories: ["mindfulness", "happiness"] },
  { id: 16, text: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus", categories: ["happiness", "wisdom"] },
  { id: 17, text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca", source: "Letters to Lucilius", categories: ["mindfulness", "happiness"] },
  { id: 18, text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.", author: "Marcus Aurelius", source: "Meditations", categories: ["happiness", "wisdom"] },
  { id: 19, text: "He who laughs at himself never runs out of things to laugh at.", author: "Epictetus", categories: ["happiness", "wisdom"] },
  { id: 20, text: "True happiness is to enjoy the present, without anxious dependence upon the future.", author: "Seneca", source: "On the Happy Life", categories: ["happiness", "mindfulness"] },
];

export function getDailyQuote(): StoicQuote {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return stoicQuotes[dayOfYear % stoicQuotes.length];
}

export function getRandomQuote(
  currentId?: number,
  categoryFilter?: QuoteCategory | null
): StoicQuote {
  const pool = categoryFilter
    ? stoicQuotes.filter((q) => q.categories.includes(categoryFilter))
    : stoicQuotes;

  if (pool.length === 0) return stoicQuotes[0];
  if (pool.length === 1) return pool[0];

  let quote: StoicQuote;
  do {
    quote = pool[Math.floor(Math.random() * pool.length)];
  } while (quote.id === currentId);
  return quote;
}
