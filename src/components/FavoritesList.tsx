import { stoicQuotes, StoicQuote } from "@/data/stoicQuotes";
import { Heart, X } from "lucide-react";

interface FavoritesListProps {
  favoriteIds: number[];
  onSelect: (quote: StoicQuote) => void;
  onClose: () => void;
}

const FavoritesList = ({ favoriteIds, onSelect, onClose }: FavoritesListProps) => {
  const favoriteQuotes = stoicQuotes.filter((q) => favoriteIds.includes(q.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-[95vw] max-w-[540px] max-h-[90vh] overflow-y-auto bg-card border border-border p-6 sm:p-8 animate-quote-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Heart className="size-5 text-primary" fill="currentColor" />
          <h2 className="si-h3 text-foreground">Favorites</h2>
          <span className="si-caption text-muted-foreground">({favoriteQuotes.length})</span>
        </div>

        {favoriteQuotes.length === 0 ? (
          <p className="si-body text-muted-foreground text-center py-8">
            No favorites yet. Tap the heart icon to save quotes.
          </p>
        ) : (
          <div className="space-y-4">
            {favoriteQuotes.map((q) => (
              <button
                key={q.id}
                onClick={() => {
                  onSelect(q);
                  onClose();
                }}
                className="w-full text-left p-4 border border-border hover:border-primary/40 transition-colors group"
              >
                <p className="si-body text-secondary-foreground italic group-hover:text-foreground transition-colors">
                  "{q.text}"
                </p>
                <p className="si-caption text-primary/70 mt-2">— {q.author}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
