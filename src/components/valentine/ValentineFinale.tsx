import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Heart, Download, Share2, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValentineFormData } from "./types";
import { getWhatsAppShareText, getShortShareText, hashtags, dayMessages } from "@/data/valentineData";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ValentineFinaleProps {
  formData: ValentineFormData;
  shareUrl: string;
  onBack: () => void;
}

const ValentineFinale = ({ formData, shareUrl, onBack }: ValentineFinaleProps) => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number; duration: number }[]>([]);
  const [showNames, setShowNames] = useState(false);

  useEffect(() => {
    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: 12 + Math.random() * 20,
      duration: 4 + Math.random() * 6,
    }));
    setHearts(newHearts);
    setTimeout(() => setShowNames(true), 800);
  }, []);

  const downloadPoster = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d")!;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 1000);
    gradient.addColorStop(0, "#4a0020");
    gradient.addColorStop(0.5, "#6b0030");
    gradient.addColorStop(1, "#3d0025");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 1000);

    // Hearts decoration
    ctx.font = "40px serif";
    ctx.fillStyle = "rgba(255,100,150,0.15)";
    for (let i = 0; i < 20; i++) {
      ctx.fillText("❤", Math.random() * 760, Math.random() * 960);
    }

    // Title
    ctx.fillStyle = "#fff";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Happy Valentine's Day", 400, 200);

    // Heart emoji
    ctx.font = "80px serif";
    ctx.fillText("💖", 400, 320);

    // Names
    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#ffb3c6";
    ctx.fillText(formData.yourName, 400, 450);
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ff6b8a";
    ctx.fillText("❤️", 400, 500);
    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#ffb3c6";
    ctx.fillText(formData.partnerName, 400, 555);

    // Message
    ctx.font = "italic 20px sans-serif";
    ctx.fillStyle = "rgba(255,179,198,0.7)";
    ctx.fillText("Out of all the people in all the moments —", 400, 650);
    ctx.fillText("my heart chose you. And it still does.", 400, 680);

    // Footer
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "rgba(255,179,198,0.4)";
    ctx.fillText("Made with ❤️ | 7 Days Love Surprise", 400, 900);
    ctx.fillText("Developed by RAJESHKANNA S", 400, 930);

    const link = document.createElement("a");
    link.download = `valentine-${formData.yourName}-${formData.partnerName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast({ title: "Poster downloaded! ❤️" });
  }, [formData]);

  const finalMessages = dayMessages[6] || [];
  const seed = (formData.yourName + formData.partnerName).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const selectedMessages = [finalMessages[seed % 50], finalMessages[(seed + 13) % 50], finalMessages[(seed + 27) % 50]].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-950 to-pink-950 relative overflow-auto">
      {/* Falling Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute"
            style={{
              left: `${h.left}%`,
              top: "-10%",
              fontSize: `${h.size}px`,
              animation: `valentineHeartFall ${h.duration}s linear ${h.delay}s infinite`,
              opacity: 0.6,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      <style>{`
        @keyframes valentineHeartFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
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
        <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 rounded-full px-4 py-1.5 mb-6">
          <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
          <span className="text-sm text-rose-300 font-medium">Day 8 — Valentine's Day 💖</span>
        </div>

        {/* Big Heart */}
        <div className="text-7xl sm:text-8xl mb-6 animate-pulse" style={{ animationDuration: "1.5s" }}>
          💖
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          You Are My Forever ❤️
        </h1>

        {/* Main Text */}
        <div className="bg-black/20 backdrop-blur-sm border border-rose-500/15 rounded-2xl p-6 mb-8">
          <p className="text-rose-100/90 leading-relaxed whitespace-pre-line text-lg">
            Out of all the people in all the moments —{"\n"}my heart chose you.{"\n"}And it still does.
          </p>
        </div>

        {/* Photo Frame */}
        {(formData.partnerPhoto || formData.yourPhoto) && (
          <div className="flex justify-center items-center gap-4 mb-8">
            {formData.yourPhoto && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-3 border-rose-400 overflow-hidden shadow-xl shadow-rose-500/30">
                <img src={formData.yourPhoto} alt="You" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="text-4xl animate-pulse">❤️</div>
            {formData.partnerPhoto && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-3 border-pink-400 overflow-hidden shadow-xl shadow-pink-500/30">
                <img src={formData.partnerPhoto} alt="Partner" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}

        {/* Names Animation */}
        <div className={`transition-all duration-1000 ${showNames ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p
            className="text-3xl sm:text-4xl font-bold text-rose-300 mb-2"
            style={{ animation: "valentineNameGlow 2s ease-in-out infinite" }}
          >
            {formData.yourName}
          </p>
          <p className="text-2xl text-rose-400 mb-2">♥</p>
          <p
            className="text-3xl sm:text-4xl font-bold text-pink-300"
            style={{ animation: "valentineNameGlow 2s ease-in-out infinite 0.5s" }}
          >
            {formData.partnerName}
          </p>
        </div>

        {/* Selected Messages */}
        <div className="mt-8 space-y-3">
          {selectedMessages.map((msg, i) => (
            <div key={i} className="bg-white/5 border border-rose-500/10 rounded-xl p-4">
              <p className="text-rose-200/70 text-sm italic">"{msg}"</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Button
            onClick={downloadPoster}
            className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold py-6 rounded-xl shadow-lg shadow-rose-500/25"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Love Poster
          </Button>

          <Button
            onClick={() => {
              const text = getWhatsAppShareText(shareUrl);
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
            }}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-6 rounded-xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Share With Partner
          </Button>

          <Link
            to="/ValentineDay"
            className="block w-full bg-white/10 border border-rose-500/20 text-rose-200 font-semibold py-4 rounded-xl hover:bg-white/15 transition-colors text-center"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Make One For Someone You Love
            </span>
          </Link>
        </div>

        <p className="text-rose-400/30 text-xs mt-4">{hashtags.join(" ")}</p>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-rose-500/10">
          <p className="text-rose-300/40 text-xs">Made with ❤️ for you</p>
          <p className="text-rose-300/40 text-xs mt-1">Developed by RAJESHKANNA S</p>
          <Link
            to="/developer-bio"
            className="inline-block mt-2 px-4 py-1.5 text-xs font-medium rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/40 transition-all"
          >
            To Know RAJESHKANNA
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ValentineFinale;
