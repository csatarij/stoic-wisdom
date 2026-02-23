import { QuoteCategory, categoryLabels } from "@/data/stoicQuotes";

interface CategoryFilterProps {
  selected: QuoteCategory | null;
  onSelect: (cat: QuoteCategory | null) => void;
}

const categories = Object.entries(categoryLabels) as [QuoteCategory, string][];

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1 si-caption border transition-all ${
          selected === null
            ? "border-primary bg-primary/15 text-primary"
            : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
        }`}
      >
        All
      </button>
      {categories.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onSelect(selected === key ? null : key)}
          className={`px-3 py-1 si-caption border transition-all ${
            selected === key
              ? "border-primary bg-primary/15 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
