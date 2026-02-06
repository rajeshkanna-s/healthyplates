import { useState, useMemo, useCallback } from "react";
import { Heart, ArrowLeft, Share2, Copy, Check, MessageCircle, Instagram, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValentineFormData, DaySelection } from "./types";
import { dayContent, dayMessages, getWhatsAppShareText, hashtags } from "@/data/valentineData";

import ValentineDayCard from "./ValentineDayCard";
import ValentineFinale from "./ValentineFinale";
import LoveScore from "./LoveScore";
import FloatingHearts from "./FloatingHearts";
import QRCodeModal from "./QRCodeModal";
import StickyBottomBar from "./StickyBottomBar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ValentineExperienceProps {
  formData: ValentineFormData;
  createdAt: string;
  isPartnerView: boolean;
  shareUrl: string;
  customMessage?: string;
  selections?: DaySelection[];
}

const ValentineExperience = ({ formData, createdAt, isPartnerView, shareUrl, customMessage, selections }: ValentineExperienceProps) => {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Filter days based on selections
  const visibleDays = useMemo(() => {
    if (!selections || selections.length === 0) {
      return dayContent; // Show all if no selections (backward compat)
    }
    const selectedDayNumbers = new Set(selections.map(s => s.dayNumber));
    return dayContent.filter(d => selectedDayNumbers.has(d.day));
  }, [selections]);

  // Get selected messages for a specific day
  const getSelectedMessages = useCallback((dayNum: number): string[] => {
    if (!selections) return [];
    const sel = selections.find(s => s.dayNumber === dayNum);
    if (!sel || sel.messageIndices.length === 0) return [];
    const messages = dayMessages[dayNum - 1] || [];
    return sel.messageIndices.map(i => messages[i]).filter(Boolean);
  }, [selections]);

  const getCountdownText = (dayNum: number): string => {
    const targetDate = new Date(2026, 1, 6 + dayNum);
    const now = new Date();
    const diffMs = targetDate.getTime() - now.getTime();
    if (diffMs <= 0) return "Today!";
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  const getCurrentDay = useMemo(() => {
    const now = new Date();
    const valentinesDates = [
      new Date(2026, 1, 7), new Date(2026, 1, 8), new Date(2026, 1, 9),
      new Date(2026, 1, 10), new Date(2026, 1, 11), new Date(2026, 1, 12),
      new Date(2026, 1, 13), new Date(2026, 1, 14),
    ];
    for (let i = 0; i < valentinesDates.length; i++) {
      if (now.toDateString() === valentinesDates[i].toDateString()) return i + 1;
    }
    if (now < valentinesDates[0]) return 0;
    if (now > valentinesDates[7]) return 8;
    return 1;
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: "Link copied!", description: "Share it with your partner ❤️" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = getWhatsAppShareText(shareUrl);
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleInstagramShare = () => {
    navigator.clipboard.writeText(
      `I created a Valentine's Day Surprise 💘\nOne reveal every day till Valentine's Day\n\n${shareUrl}\n\n${hashtags.join(" ")}`
    );
    toast({ title: "Caption copied! 📸", description: "Paste it on Instagram with your screenshot" });
  };

  const downloadInviteImage = useCallback(() => {
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
    for (let i = 0; i < 25; i++) {
      ctx.fillText("❤", Math.random() * 760, Math.random() * 960);
    }

    ctx.fillStyle = "#fff";
    ctx.font = "bold 42px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Valentine's Day Surprise", 400, 120);

    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#ffb3c6";
    ctx.fillText("Open one card daily till Valentine's Day", 400, 160);

    ctx.font = "100px serif";
    ctx.fillText("💖", 400, 300);

    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText(`From: ${formData.yourName}`, 400, 420);
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ff6b8a";
    ctx.fillText("❤️", 400, 470);
    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText(`To: ${formData.partnerName}`, 400, 520);

    if (customMessage) {
      ctx.font = "italic 20px sans-serif";
      ctx.fillStyle = "rgba(255,179,198,0.9)";
      const words = customMessage.split(" ");
      let line = "";
      let y = 600;
      for (const word of words) {
        const testLine = line + word + " ";
        if (ctx.measureText(testLine).width > 700) {
          ctx.fillText(line, 400, y);
          line = word + " ";
          y += 28;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 400, y);
    }

    ctx.font = "18px sans-serif";
    ctx.fillStyle = "#ffb3c6";
    ctx.fillText("Scan or visit:", 400, 780);
    ctx.font = "bold 14px sans-serif";
    const displayUrl = shareUrl.length > 80 ? shareUrl.substring(0, 77) + "..." : shareUrl;
    ctx.fillText(displayUrl, 400, 810);

    ctx.font = "14px sans-serif";
    ctx.fillStyle = "rgba(255,179,198,0.4)";
    ctx.fillText("Made with ❤️ | Valentine's Day Surprise", 400, 920);
    ctx.fillText("Developed by RAJESHKANNA S", 400, 945);

    const link = document.createElement("a");
    link.download = `love-invite-${formData.partnerName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast({ title: "Invite image downloaded! ❤️" });
  }, [formData, shareUrl, customMessage]);

  const handleCreateNew = () => {
    localStorage.removeItem("valentine-surprise-data");
    navigate("/ValentineDay", { replace: true });
    window.location.reload();
  };

  // Active day view
  if (activeDay !== null) {
    if (activeDay === 8) {
      return (
        <ValentineFinale
          formData={formData}
          shareUrl={shareUrl}
          onBack={() => setActiveDay(null)}
          customMessage={customMessage}
        />
      );
    }
    const content = dayContent[activeDay - 1];
    const selectedMsgs = getSelectedMessages(activeDay);
    return (
      <ValentineDayCard
        dayContent={content}
        selectedMessages={selectedMsgs}
        partnerName={formData.partnerName}
        yourName={formData.yourName}
        onBack={() => setActiveDay(null)}
        customMessage={customMessage}
        isPartnerView={isPartnerView}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-950 to-pink-950 relative overflow-auto pb-24">
      <FloatingHearts />

      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4">
        <Link
          to="/"
          className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-rose-500/20 rounded-full px-4 py-2 text-rose-200 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-20 pb-8 relative z-10">
        {/* Partner View Header */}
        {isPartnerView && (
          <div className="text-center mb-8 animate-fade-in">
            <Heart className="w-12 h-12 text-rose-400 mx-auto mb-3 animate-pulse" fill="currentColor" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              A Love Surprise Was Created For You
            </h1>
            <p className="text-xl text-rose-200 mt-1">
              by <span className="font-bold text-rose-300">{formData.yourName}</span> ❤️
            </p>
            <p className="text-rose-300/60 text-sm mt-2">
              Open One Card Daily Till Valentine's Day
            </p>
            {customMessage && (
              <div className="mt-4 bg-black/20 border border-rose-500/20 rounded-xl p-4 max-w-sm mx-auto">
                <p className="text-rose-300 text-xs font-medium mb-1">
                  {formData.yourName} wrote for you:
                </p>
                <p className="text-rose-200/80 text-sm italic">"{customMessage}"</p>
              </div>
            )}
          </div>
        )}

        {/* Creator View Header */}
        {!isPartnerView && (
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Love Surprise for {formData.partnerName} ❤️
            </h1>
            <p className="text-rose-200/80 text-sm mb-4">
              Share this link with your partner — they'll see your selected days & messages!
            </p>

            {/* Share Section */}
            <div className="bg-black/30 backdrop-blur-sm border border-rose-500/20 rounded-xl p-4 mb-4 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-white/10 border border-rose-500/30 rounded-lg px-3 py-2 text-rose-200 text-xs truncate"
                />
                <Button
                  size="sm"
                  onClick={handleCopyLink}
                  className="bg-rose-600 hover:bg-rose-500 text-white shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                <Button size="sm" onClick={handleWhatsAppShare} className="bg-green-600 hover:bg-green-500 text-white text-xs">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  WhatsApp
                </Button>
                <Button size="sm" onClick={handleInstagramShare} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs">
                  <Instagram className="w-4 h-4 mr-1" />
                  Instagram
                </Button>
                <QRCodeModal url={shareUrl} partnerName={formData.partnerName} />
              </div>
              <p className="text-rose-400/50 text-xs">{hashtags.join(" ")}</p>
            </div>
          </div>
        )}

        {/* Photos Banner */}
        {(formData.partnerPhoto || formData.yourPhoto) && (
          <div className="flex justify-center items-center gap-4 mb-8">
            {formData.yourPhoto && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-rose-400 overflow-hidden shadow-lg shadow-rose-500/20">
                <img src={formData.yourPhoto} alt="You" className="w-full h-full object-cover" />
              </div>
            )}
            {formData.yourPhoto && formData.partnerPhoto && (
              <Heart className="w-6 h-6 text-rose-400 animate-pulse" fill="currentColor" />
            )}
            {formData.partnerPhoto && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-pink-400 overflow-hidden shadow-lg shadow-pink-500/20">
                <img src={formData.partnerPhoto} alt="Partner" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}

        {/* Day Cards Grid - Only selected days */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {visibleDays.map((day) => {
            const isToday = getCurrentDay === day.day;
            const isPast = getCurrentDay > day.day;
            const isFuture = getCurrentDay < day.day;

            return (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`relative p-3 sm:p-4 rounded-2xl border transition-all duration-300 text-center hover:scale-105 cursor-pointer ${
                  isToday
                    ? "bg-gradient-to-br from-rose-500/40 to-pink-500/40 border-rose-400 shadow-lg shadow-rose-500/30"
                    : isPast
                    ? "bg-white/15 border-rose-500/30"
                    : "bg-white/5 border-rose-500/15 hover:bg-white/10"
                }`}
              >
                {isToday && (
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                )}
                <span className="text-2xl sm:text-3xl block mb-1">{day.emoji}</span>
                <span className="text-xs text-rose-200 font-medium block">Day {day.day}</span>
                <span className="text-[10px] text-rose-300 font-semibold block mt-0.5">{day.name}</span>
                <span className="text-[9px] text-rose-300/60 block mt-0.5">{day.weekday}</span>
                <span className="text-[9px] text-rose-400/50 block">{day.date}</span>

                {isFuture && (
                  <div className="flex items-center justify-center gap-1 mt-1 text-[9px] text-rose-300/50">
                    <Clock className="w-3 h-3" />
                    <span>{getCountdownText(day.day)}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Love Score Section */}
        <LoveScore name1={formData.yourName} name2={formData.partnerName} />

        {/* Viral CTA */}
        <div className="text-center mt-8 mb-6">
          <p className="text-rose-300/60 text-sm mb-3">Want to make one too?</p>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-rose-500/25 hover:from-rose-500 hover:to-pink-500 transition-all"
          >
            <Heart className="w-4 h-4" fill="currentColor" />
            Make One For Your Partner
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-rose-500/10">
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

      {/* Sticky Bottom Bar */}
      <StickyBottomBar
        shareUrl={shareUrl}
        onDownload={downloadInviteImage}
        partnerName={formData.partnerName}
      />
    </div>
  );
};

export default ValentineExperience;
