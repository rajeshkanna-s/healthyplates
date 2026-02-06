import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Heart, Download, MessageCircle, Sparkles, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValentineFormData, DaySelection, MemoryQuizItem } from "./types";
import { getWhatsAppShareText, hashtags, dayMessages, dayContent } from "@/data/valentineData";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import FloatingHearts from "./FloatingHearts";
import StickyBottomBar from "./StickyBottomBar";
import MemoryQuizDisplay from "./MemoryQuizDisplay";

interface ValentineFinaleProps {
  formData: ValentineFormData;
  shareUrl: string;
  onBack: () => void;
  customMessage?: string;
  selections?: DaySelection[];
  memoryQuiz?: MemoryQuizItem[];
  isPartnerView?: boolean;
}

const ValentineFinale = ({ formData, shareUrl, onBack, customMessage, selections, memoryQuiz, isPartnerView }: ValentineFinaleProps) => {
  const [showNames, setShowNames] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowNames(true), 800);
  }, []);

  // Get the selected messages for Valentine's Day (Day 8) if any
  const selectedDay8Messages = (() => {
    if (!selections) return [];
    const sel = selections.find(s => s.dayNumber === 8);
    if (!sel || sel.messageIndices.length === 0) return [];
    const messages = dayMessages[7] || [];
    return sel.messageIndices.map(i => messages[i]).filter(Boolean);
  })();

  // Fallback to random messages if none selected
  const finalMessages = selectedDay8Messages.length > 0
    ? selectedDay8Messages
    : (() => {
        const msgs = dayMessages[7] || [];
        const seed = (formData.yourName + formData.partnerName).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
        return [msgs[seed % 50], msgs[(seed + 13) % 50], msgs[(seed + 27) % 50]].filter(Boolean);
      })();

  const downloadPoster = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createLinearGradient(0, 0, 800, 1000);
    gradient.addColorStop(0, "#4a0020");
    gradient.addColorStop(0.5, "#6b0030");
    gradient.addColorStop(1, "#3d0025");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 1000);

    ctx.font = "40px serif";
    ctx.fillStyle = "rgba(255,100,150,0.15)";
    for (let i = 0; i < 20; i++) {
      ctx.fillText("❤", Math.random() * 760, Math.random() * 960);
    }

    ctx.fillStyle = "#fff";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Valentine's Day Surprise", 400, 200);

    ctx.font = "80px serif";
    ctx.fillText("💖", 400, 320);

    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#ffb3c6";
    ctx.fillText(formData.yourName, 400, 450);
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ff6b8a";
    ctx.fillText("❤️", 400, 500);
    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#ffb3c6";
    ctx.fillText(formData.partnerName, 400, 555);

    ctx.font = "italic 20px sans-serif";
    ctx.fillStyle = "rgba(255,179,198,0.7)";
    ctx.fillText("Out of all the people in all the moments —", 400, 650);
    ctx.fillText("my heart chose you. And it still does.", 400, 680);

    if (customMessage) {
      ctx.font = "italic 18px sans-serif";
      ctx.fillStyle = "rgba(255,179,198,0.9)";
      ctx.fillText(`"${customMessage}"`, 400, 750);
    }

    ctx.font = "14px sans-serif";
    ctx.fillStyle = "rgba(255,179,198,0.4)";
    ctx.fillText("Made with ❤️ | Valentine's Day Surprise", 400, 900);
    ctx.fillText("Developed by RAJESHKANNA S", 400, 930);

    const link = document.createElement("a");
    link.download = `valentine-${formData.yourName}-${formData.partnerName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast({ title: "Poster downloaded! ❤️" });
  }, [formData, customMessage]);

  const handleInstagramShare = () => {
    navigator.clipboard.writeText(
      `Happy Valentine's Day! 💖\nFrom ${formData.yourName} to ${formData.partnerName}\n\n${hashtags.join(" ")}`
    );
    toast({ title: "Caption copied for Instagram! 📸" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-950 to-pink-950 relative overflow-auto pb-24">
      <FloatingHearts />

      <style>{`
        @keyframes valentineNameGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(244,63,94,0.5), 0 0 40px rgba(244,63,94,0.3); }
          50% { text-shadow: 0 0 30px rgba(244,63,94,0.8), 0 0 60px rgba(244,63,94,0.5); }
        }
      `}</style>

      {/* Back Button */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-rose-500/20 rounded-full px-4 py-2 text-rose-200 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-20 pb-16 text-center">
        {/* Day Badge */}
        <div className="inline-flex flex-col items-center gap-1 bg-rose-500/20 border border-rose-500/30 rounded-2xl px-5 py-3 mb-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
            <span className="text-sm text-rose-300 font-medium">💖 Valentine's Day</span>
          </div>
          <span className="text-xs text-rose-400/70">Saturday, February 14, 2026</span>
        </div>

        {/* Big Heart */}
        <div className="text-7xl sm:text-8xl mb-6 animate-pulse" style={{ animationDuration: "1.5s" }}>
          💖
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          You Are My Forever ❤️
        </h1>

        <div className="bg-black/20 backdrop-blur-sm border border-rose-500/15 rounded-2xl p-6 mb-8">
          <p className="text-rose-100/90 leading-relaxed whitespace-pre-line text-lg">
            Out of all the people in all the moments —{"\n"}my heart chose you.{"\n"}And it still does.
          </p>
        </div>

        {customMessage && (
          <div className="mb-8 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-xl p-4">
            <p className="text-rose-300 text-xs font-medium mb-1">{formData.yourName} wrote for you:</p>
            <p className="text-rose-200/80 text-sm italic">"{customMessage}"</p>
          </div>
        )}


        <div className={`transition-all duration-1000 ${showNames ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-3xl sm:text-4xl font-bold text-rose-300 mb-2" style={{ animation: "valentineNameGlow 2s ease-in-out infinite" }}>
            {formData.yourName}
          </p>
          <p className="text-2xl text-rose-400 mb-2">♥</p>
          <p className="text-3xl sm:text-4xl font-bold text-pink-300" style={{ animation: "valentineNameGlow 2s ease-in-out infinite 0.5s" }}>
            {formData.partnerName}
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {finalMessages.map((msg, i) => (
            <div key={i} className="bg-white/5 border border-rose-500/10 rounded-xl p-4">
              <p className="text-rose-200/70 text-sm italic">"{msg}"</p>
            </div>
          ))}
        </div>

        {/* Memory Quiz for Partner */}
        {isPartnerView && memoryQuiz && memoryQuiz.length > 0 && (
          <MemoryQuizDisplay items={memoryQuiz} creatorName={formData.yourName} />
        )}

        <div className="mt-8 space-y-3">
          <Button onClick={downloadPoster} className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold py-6 rounded-xl shadow-lg shadow-rose-500/25">
            <Download className="w-5 h-5 mr-2" />
            Download Love Poster
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={() => { const text = getWhatsAppShareText(shareUrl); window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank"); }} className="bg-green-600 hover:bg-green-500 text-white font-semibold py-4 rounded-xl">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
            <Button onClick={handleInstagramShare} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 rounded-xl">
              <Instagram className="w-5 h-5 mr-2" />
              Instagram
            </Button>
          </div>
          <button
            onClick={() => { localStorage.removeItem("valentine-surprise-data"); window.location.href = "/ValentineDay"; }}
            className="block w-full bg-white/10 border border-rose-500/20 text-rose-200 font-semibold py-4 rounded-xl hover:bg-white/15 transition-colors text-center"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Make One For Someone You Love
            </span>
          </button>
        </div>

        <p className="text-rose-400/30 text-xs mt-4">{hashtags.join(" ")}</p>

        <div className="mt-10 pt-6 border-t border-rose-500/10">
          <p className="text-rose-300/40 text-xs">Made with ❤️ for you</p>
          <p className="text-rose-300/40 text-xs mt-1">Developed by RAJESHKANNA S</p>
          <Link to="/developer-bio" className="inline-block mt-2 px-4 py-1.5 text-xs font-medium rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/40 transition-all">
            To Know RAJESHKANNA
          </Link>
        </div>
      </div>

      <StickyBottomBar shareUrl={shareUrl} onDownload={downloadPoster} partnerName={formData.partnerName} />
    </div>
  );
};

export default ValentineFinale;
