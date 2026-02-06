import { useState, useMemo } from "react";
import { Heart, Lock, ArrowLeft, Share2, Copy, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValentineFormData } from "./types";
import { dayContent, dayMessages, getWhatsAppShareText, getShortShareText, hashtags } from "@/data/valentineData";
import ValentineDayCard from "./ValentineDayCard";
import ValentineFinale from "./ValentineFinale";
import LoveScore from "./LoveScore";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ValentineExperienceProps {
  formData: ValentineFormData;
  createdAt: string;
  isPartnerView: boolean;
  shareUrl: string;
}

const ValentineExperience = ({ formData, createdAt, isPartnerView, shareUrl }: ValentineExperienceProps) => {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const unlockedDays = useMemo(() => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(diffDays + 1, 1), 8);
  }, [createdAt]);

  // Get a deterministic message index based on names
  const getMessageIndex = (day: number): number => {
    const seed = (formData.yourName + formData.partnerName).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return (seed + day * 7) % 50;
  };

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

  // If a day card is active
  if (activeDay !== null) {
    const dayIndex = activeDay - 1;
    if (activeDay === 8) {
      return (
        <ValentineFinale
          formData={formData}
          shareUrl={shareUrl}
          onBack={() => setActiveDay(null)}
        />
      );
    }
    const content = dayContent[dayIndex];
    const messages = dayMessages[dayIndex] || [];
    const messageIndex = getMessageIndex(activeDay);
    return (
      <ValentineDayCard
        dayContent={content}
        bonusMessage={messages[messageIndex]}
        allMessages={messages}
        partnerName={formData.partnerName}
        yourName={formData.yourName}
        onBack={() => setActiveDay(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-950 to-pink-950 relative overflow-auto">
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

      <div className="max-w-2xl mx-auto px-4 pt-20 pb-24">
        {/* Partner View Header */}
        {isPartnerView && (
          <div className="text-center mb-8 animate-fade-in">
            <Heart className="w-12 h-12 text-rose-400 mx-auto mb-3 animate-pulse" fill="currentColor" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              A Love Surprise Was Created For You
            </h1>
            <p className="text-rose-200/80">
              From: <span className="font-semibold text-rose-300">{formData.yourName}</span>
            </p>
            <p className="text-rose-300/60 text-sm mt-1">
              Open One Card Daily Till Valentine's Day
            </p>
          </div>
        )}

        {/* Creator View Header */}
        {!isPartnerView && (
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Love Surprise for {formData.partnerName} ❤️
            </h1>
            <p className="text-rose-200/80 text-sm mb-4">
              Share this link with your partner — they'll unlock one card each day!
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
              <div className="flex gap-2 justify-center">
                <Button
                  size="sm"
                  onClick={handleWhatsAppShare}
                  className="bg-green-600 hover:bg-green-500 text-white text-xs"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const text = getShortShareText(shareUrl);
                    navigator.clipboard.writeText(text);
                    toast({ title: "Share text copied!" });
                  }}
                  className="bg-rose-600 hover:bg-rose-500 text-white text-xs"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Copy Share Text
                </Button>
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

        {/* Day Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {dayContent.map((day) => {
            const isUnlocked = day.day <= unlockedDays;
            const isCurrent = day.day === unlockedDays;
            return (
              <button
                key={day.day}
                onClick={() => isUnlocked && setActiveDay(day.day)}
                disabled={!isUnlocked}
                className={`relative p-4 rounded-2xl border transition-all duration-300 text-center ${
                  isUnlocked
                    ? isCurrent
                      ? "bg-gradient-to-br from-rose-500/30 to-pink-500/30 border-rose-400 shadow-lg shadow-rose-500/20 hover:scale-105 cursor-pointer"
                      : "bg-white/10 border-rose-500/20 hover:bg-white/15 hover:scale-105 cursor-pointer"
                    : "bg-black/20 border-white/5 opacity-50 cursor-not-allowed"
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                )}
                <span className="text-2xl sm:text-3xl block mb-1">
                  {isUnlocked ? day.emoji : <Lock className="w-5 h-5 mx-auto text-rose-500/40" />}
                </span>
                <span className="text-xs text-rose-200 font-medium block">Day {day.day}</span>
                <span className="text-[10px] text-rose-300/60 block mt-0.5">{day.name}</span>
              </button>
            );
          })}
        </div>

        {/* Love Score Section */}
        <LoveScore name1={formData.yourName} name2={formData.partnerName} />

        {/* Viral CTA */}
        <div className="text-center mt-8 mb-6">
          <p className="text-rose-300/60 text-sm mb-3">Want to make one too?</p>
          <Link
            to="/ValentineDay"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-rose-500/25 hover:from-rose-500 hover:to-pink-500 transition-all"
          >
            <Heart className="w-4 h-4" fill="currentColor" />
            Make One For Your Partner
          </Link>
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
    </div>
  );
};

export default ValentineExperience;
