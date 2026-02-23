import { useState, useCallback, useEffect } from "react";
import {
  getRandomQuote,
  getDailyQuote,
  stoicQuotes,
  authorBios,
  StoicQuote,
  QuoteCategory,
} from "@/data/stoicQuotes";
import { useFavorites } from "@/hooks/useFavorites";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import AnimatedBackground from "@/components/AnimatedBackground";
import AuthorBio from "@/components/AuthorBio";
import CategoryFilter from "@/components/CategoryFilter";
import FavoritesList from "@/components/FavoritesList";
import QuoteImage from "@/components/QuoteImage";
import {
  RefreshCw,
  Copy,
  Heart,
  Image,
  Calendar,
  Shuffle,
  Check,
  BookOpen,
} from "lucide-react";

type Mode = "random" | "daily";

const Index = () => {
  const [quote, setQuote] = useState<StoicQuote>(() => getDailyQuote());
  const [mode, setMode] = useState<Mode>("daily");
  const [animKey, setAnimKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [category, setCategory] = useState<QuoteCategory | null>(null);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const { favorites, toggle, isFavorite } = useFavorites();
  const { markSeen, seenCount, progress } = useReadingHistory(stoicQuotes.length);

  // Mark current quote as seen
  useEffect(() => {
    markSeen(quote.id);
  }, [quote.id, markSeen]);

  const nextQuote = useCallback(() => {
    const next = getRandomQuote(quote.id, category);
    setQuote(next);
    setAnimKey((k) => k + 1);
    setMode("random");
  }, [quote.id, category]);

  const toggleMode = useCallback(() => {
    if (mode === "random") {
      setQuote(getDailyQuote());
      setMode("daily");
    } else {
      const next = getRandomQuote(quote.id, category);
      setQuote(next);
      setMode("random");
    }
    setAnimKey((k) => k + 1);
  }, [mode, quote.id, category]);

  const copyQuote = useCallback(() => {
    const text = `"${quote.text}" — ${quote.author}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [quote]);

  const selectFromFavorites = useCallback((q: StoicQuote) => {
    setQuote(q);
    setAnimKey((k) => k + 1);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showAuthor || showFavorites || showImage) return;
      if (e.code === "Space" || e.code === "ArrowRight") {
        e.preventDefault();
        nextQuote();
      }
      if (e.code === "KeyC" && !e.metaKey && !e.ctrlKey) {
        copyQuote();
      }
      if (e.code === "KeyF") {
        toggle(quote.id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [nextQuote, copyQuote, toggle, quote.id, showAuthor, showFavorites, showImage]);

  // Handle category change
  useEffect(() => {
    if (category && mode === "random") {
      const next = getRandomQuote(quote.id, category);
      setQuote(next);
      setAnimKey((k) => k + 1);
    }
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

  const authorInfo = authorBios[quote.author];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
      <AnimatedBackground />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-3 sm:p-4">
        {/* Mode toggle */}
        <button
          onClick={toggleMode}
          className="flex items-center gap-1.5 px-3 py-1.5 si-caption border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
          title={mode === "daily" ? "Switch to random" : "Switch to daily"}
        >
          {mode === "daily" ? (
            <>
              <Calendar className="size-4" />
              <span className="hidden sm:inline">Daily</span>
            </>
          ) : (
            <>
              <Shuffle className="size-4" />
              <span className="hidden sm:inline">Random</span>
            </>
          )}
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFavorites(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 si-caption border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
          >
            <Heart className="size-4" />
            <span className="hidden sm:inline">{favorites.length}</span>
          </button>
          <button
            onClick={() => setShowImage(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 si-caption border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
            title="Download as image"
          >
            <Image className="size-4" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-[1] w-[95vw] max-w-[700px] text-center">
        {/* Category filter */}
        <div className="mb-8 sm:mb-10">
          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>

        {/* Quote block */}
        <div key={animKey} className="animate-quote-in">
          {/* Decorative quote mark */}
          <div
            className="mx-auto mb-4 sm:mb-6 text-[4rem] sm:text-[5rem] leading-none font-light select-none"
            style={{ color: "hsl(var(--quote-mark))" }}
          >
            {"\u201C"}
          </div>

          {/* Quote text */}
          <blockquote
            className="si-h2 sm:si-h1 font-light italic px-2 sm:px-4"
            style={{ color: "hsl(var(--quote-text))" }}
          >
            {quote.text}
          </blockquote>

          {/* Divider */}
          <div
            className="mx-auto my-6 sm:my-8 h-px w-16"
            style={{ backgroundColor: "hsl(var(--quote-divider))" }}
          />

          {/* Author - clickable */}
          <button
            onClick={() => setShowAuthor(true)}
            className="si-body sm:si-h3 font-semibold tracking-wide uppercase hover:underline underline-offset-4 transition-all"
            style={{ color: "hsl(var(--quote-author))" }}
            title="View author bio"
          >
            {quote.author}
          </button>

          {/* Source */}
          {quote.source && (
            <p className="si-caption mt-1 text-muted-foreground">{quote.source}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3">
          {/* New Quote */}
          <button
            onClick={nextQuote}
            className="inline-flex items-center gap-2 border border-primary bg-transparent px-6 py-3 si-body font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
          >
            <RefreshCw className="size-4" />
            New Quote
          </button>

          {/* Copy */}
          <button
            onClick={copyQuote}
            className="inline-flex items-center gap-2 border border-border bg-transparent px-4 py-3 si-body text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground active:scale-95"
            title="Copy quote (C)"
          >
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
          </button>

          {/* Favorite */}
          <button
            onClick={() => toggle(quote.id)}
            className={`inline-flex items-center gap-2 border bg-transparent px-4 py-3 si-body transition-all active:scale-95 ${
              isFavorite(quote.id)
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
            title="Favorite (F)"
          >
            <Heart
              className="size-4"
              fill={isFavorite(quote.id) ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Reading progress */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 si-caption text-muted-foreground">
            <BookOpen className="size-4" />
            <span>
              {seenCount} of {stoicQuotes.length} quotes explored
            </span>
          </div>
          <div className="w-32 h-1 bg-border overflow-hidden">
            <div
              className="h-full bg-primary/60 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Keyboard hint */}
        <p className="mt-6 si-caption text-muted-foreground/50 hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 border border-border text-muted-foreground/60">Space</kbd> or{" "}
          <kbd className="px-1.5 py-0.5 border border-border text-muted-foreground/60">&rarr;</kbd> for new
          &nbsp;&middot;&nbsp;
          <kbd className="px-1.5 py-0.5 border border-border text-muted-foreground/60">C</kbd> copy
          &nbsp;&middot;&nbsp;
          <kbd className="px-1.5 py-0.5 border border-border text-muted-foreground/60">F</kbd> favorite
        </p>
      </div>

      {/* Modals */}
      {showAuthor && authorInfo && (
        <AuthorBio author={authorInfo} onClose={() => setShowAuthor(false)} />
      )}
      {showFavorites && (
        <FavoritesList
          favoriteIds={favorites}
          onSelect={selectFromFavorites}
          onClose={() => setShowFavorites(false)}
        />
      )}
      {showImage && (
        <QuoteImage quote={quote} onClose={() => setShowImage(false)} />
      )}
    </div>
  );
};

export default Index;
