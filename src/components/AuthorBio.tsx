import { AuthorInfo } from "@/data/stoicQuotes";
import { X } from "lucide-react";

interface AuthorBioProps {
  author: AuthorInfo;
  onClose: () => void;
}

const AuthorBio = ({ author, onClose }: AuthorBioProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-[95vw] max-w-[480px] max-h-[90vh] overflow-y-auto bg-card border border-border p-6 sm:p-8 animate-quote-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Author initial as avatar */}
        <div className="mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center bg-primary/15 border border-primary/30">
          <span className="si-h1 text-primary">{author.name.charAt(0)}</span>
        </div>

        <h2 className="si-h2 text-center text-foreground mb-1">{author.name}</h2>
        <p className="si-caption text-center text-muted-foreground mb-1">
          {author.born} — {author.died}
        </p>
        <p className="si-caption text-center text-primary/70 mb-5">{author.school}</p>

        <div className="h-px w-12 mx-auto bg-primary/30 mb-5" />

        <p className="si-body text-secondary-foreground leading-relaxed">{author.bio}</p>
      </div>
    </div>
  );
};

export default AuthorBio;
