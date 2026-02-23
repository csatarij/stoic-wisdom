import { useRef, useCallback } from "react";
import { StoicQuote } from "@/data/stoicQuotes";
import { Download, X } from "lucide-react";

interface QuoteImageProps {
  quote: StoicQuote;
  onClose: () => void;
}

const QuoteImage = ({ quote, onClose }: QuoteImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAndDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 1200;
    const h = 630;
    canvas.width = w;
    canvas.height = h;

    // Background
    ctx.fillStyle = "#0f1419";
    ctx.fillRect(0, 0, w, h);

    // Subtle border
    ctx.strokeStyle = "rgba(0, 188, 212, 0.3)";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, w - 80, h - 80);

    // Quote mark
    ctx.font = "120px serif";
    ctx.fillStyle = "rgba(0, 188, 212, 0.4)";
    ctx.textAlign = "center";
    ctx.fillText("\u201C", w / 2, 160);

    // Quote text - word wrap
    ctx.font = "32px Georgia, serif";
    ctx.fillStyle = "#c8d6e0";
    ctx.textAlign = "center";
    const words = quote.text.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    const maxWidth = w - 160;

    for (const word of words) {
      const test = currentLine + (currentLine ? " " : "") + word;
      if (ctx.measureText(test).width > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = test;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = 46;
    const startY = 220 + ((4 - lines.length) * lineHeight) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, w / 2, startY + i * lineHeight);
    });

    // Divider
    ctx.fillStyle = "rgba(0, 188, 212, 0.5)";
    ctx.fillRect(w / 2 - 40, h - 170, 80, 2);

    // Author
    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "rgba(0, 188, 212, 0.8)";
    ctx.fillText(quote.author.toUpperCase(), w / 2, h - 130);

    // Source
    if (quote.source) {
      ctx.font = "italic 16px sans-serif";
      ctx.fillStyle = "rgba(200, 214, 224, 0.5)";
      ctx.fillText(quote.source, w / 2, h - 100);
    }

    // Watermark
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(200, 214, 224, 0.2)";
    ctx.fillText("Stoic Wisdom", w / 2, h - 55);

    // Download
    const link = document.createElement("a");
    link.download = `stoic-quote-${quote.author.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [quote]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-[95vw] max-w-[500px] bg-card border border-border p-6 animate-quote-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        <h2 className="si-h3 text-foreground mb-4">Quote of the Day Card</h2>

        {/* Preview */}
        <div className="aspect-[1200/630] w-full bg-background border border-border mb-4 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-3xl text-primary/40 mb-2">"</div>
            <p className="si-body italic text-secondary-foreground text-sm leading-relaxed">
              {quote.text}
            </p>
            <div className="h-px w-8 mx-auto my-3 bg-primary/40" />
            <p className="si-caption text-primary/70 font-semibold uppercase text-xs">
              {quote.author}
            </p>
          </div>
        </div>

        <button
          onClick={generateAndDownload}
          className="w-full flex items-center justify-center gap-2 border border-primary bg-primary/10 text-primary px-4 py-3 si-body font-medium hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <Download className="size-4" />
          Download Image (1200×630)
        </button>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default QuoteImage;
