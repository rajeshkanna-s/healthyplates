import { useParams, Link } from "react-router-dom";
import { decodeWishData } from "@/components/wish-creator/shareConfig";
import { Home, Copy, Share2, Sparkles, Heart } from "lucide-react";
import { toast } from "sonner";

const OCCASION_THEMES: Record<string, {
  gradient: string;
  accent: string;
  glow1: string;
  glow2: string;
  border: string;
  tagBg: string;
  tagText: string;
  btnBg: string;
  btnHover: string;
  pattern?: string;
}> = {
  personal: {
    gradient: "from-rose-950 via-pink-950 to-fuchsia-950",
    accent: "text-rose-300",
    glow1: "bg-rose-500/10",
    glow2: "bg-pink-500/10",
    border: "border-rose-500/20",
    tagBg: "bg-rose-500/20 border-rose-500/30",
    tagText: "text-rose-300",
    btnBg: "bg-rose-500/20 border-rose-500/30 text-rose-200 hover:bg-rose-500/30",
    btnHover: "hover:bg-rose-500/30",
    pattern: "🌸",
  },
  festivals: {
    gradient: "from-amber-950 via-orange-950 to-yellow-950",
    accent: "text-amber-300",
    glow1: "bg-amber-500/10",
    glow2: "bg-orange-500/10",
    border: "border-amber-500/20",
    tagBg: "bg-amber-500/20 border-amber-500/30",
    tagText: "text-amber-300",
    btnBg: "bg-amber-500/20 border-amber-500/30 text-amber-200 hover:bg-amber-500/30",
    btnHover: "hover:bg-amber-500/30",
    pattern: "✨",
  },
  love: {
    gradient: "from-red-950 via-rose-950 to-pink-950",
    accent: "text-red-300",
    glow1: "bg-red-500/10",
    glow2: "bg-rose-500/10",
    border: "border-red-500/20",
    tagBg: "bg-red-500/20 border-red-500/30",
    tagText: "text-red-300",
    btnBg: "bg-red-500/20 border-red-500/30 text-red-200 hover:bg-red-500/30",
    btnHover: "hover:bg-red-500/30",
    pattern: "❤️",
  },
  professional: {
    gradient: "from-blue-950 via-slate-950 to-cyan-950",
    accent: "text-blue-300",
    glow1: "bg-blue-500/10",
    glow2: "bg-cyan-500/10",
    border: "border-blue-500/20",
    tagBg: "bg-blue-500/20 border-blue-500/30",
    tagText: "text-blue-300",
    btnBg: "bg-blue-500/20 border-blue-500/30 text-blue-200 hover:bg-blue-500/30",
    btnHover: "hover:bg-blue-500/30",
    pattern: "⭐",
  },
  general: {
    gradient: "from-violet-950 via-indigo-950 to-purple-950",
    accent: "text-violet-300",
    glow1: "bg-violet-500/10",
    glow2: "bg-indigo-500/10",
    border: "border-violet-500/20",
    tagBg: "bg-violet-500/20 border-violet-500/30",
    tagText: "text-violet-300",
    btnBg: "bg-violet-500/20 border-violet-500/30 text-violet-200 hover:bg-violet-500/30",
    btnHover: "hover:bg-violet-500/30",
    pattern: "💫",
  },
};

const SharedWish = () => {
  const { encoded } = useParams<{ encoded: string }>();
  const data = encoded ? decodeWishData(encoded) : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-5xl">😔</p>
          <h1 className="text-xl font-bold text-white">Wish not found</h1>
          <p className="text-violet-300/60 text-sm">This link may be invalid or expired.</p>
          <Link
            to="/ValentineDay"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Create Your Own Wish
          </Link>
        </div>
      </div>
    );
  }

  const theme = OCCASION_THEMES[data.categoryId] || OCCASION_THEMES.general;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.wishText);
    toast.success("Wish copied!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ text: data.wishText, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied! Share it anywhere.");
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} relative overflow-hidden`}>
      {/* Floating glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-10 left-10 w-80 h-80 ${theme.glow1} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-10 right-10 w-96 h-96 ${theme.glow2} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: "1s" }} />
        <div className={`absolute top-1/3 right-1/4 w-48 h-48 ${theme.glow1} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating pattern decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-10 animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
            }}
          >
            {theme.pattern}
          </span>
        ))}
      </div>

      {/* Home button */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/"
          className={`flex items-center gap-2 bg-black/40 backdrop-blur-sm ${theme.border} border rounded-full px-4 py-2 text-white/70 hover:text-white transition-colors text-sm`}
        >
          <Home className="w-4 h-4" />
          Home
        </Link>
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-12 sm:py-20">
        {/* Occasion emoji & header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <span className="text-7xl sm:text-8xl block drop-shadow-2xl">{data.occasionEmoji}</span>
            <div className={`absolute -inset-4 ${theme.glow1} rounded-full blur-2xl -z-10`} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
            {data.occasion}
          </h1>
          {data.recipientName && (
            <p className={`${theme.accent} text-lg font-medium`}>
              For {data.recipientName} 💝
            </p>
          )}
        </div>

        {/* Wish card */}
        <div className={`bg-black/30 backdrop-blur-xl ${theme.border} border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl`}>
          {/* Decorative top accent */}
          <div className="flex justify-center">
            <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${theme.glow1.replace('/10', '/40')} ${theme.glow2.replace('/10', '/40')}`}
              style={{ background: `linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1))` }}
            />
          </div>

          {/* Wish text */}
          <div className="relative">
            <span className="absolute -top-2 -left-1 text-3xl opacity-20 select-none">"</span>
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed whitespace-pre-wrap font-light pl-4">
              {data.wishText}
            </p>
            <span className="absolute -bottom-4 right-0 text-3xl opacity-20 select-none">"</span>
          </div>

          {/* Sender signature */}
          {data.senderName && (
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-sm">
                {data.senderName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white/50 text-xs">Sent with love by</p>
                <p className="text-white font-semibold text-sm">{data.senderName}</p>
              </div>
              <Heart className="w-4 h-4 text-red-400/60 ml-auto" />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {data.tone && (
              <span className={`px-3 py-1 rounded-full ${theme.tagBg} border ${theme.tagText} text-xs font-medium`}>
                {data.tone}
              </span>
            )}
            {data.relationship && (
              <span className={`px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium`}>
                {data.relationship}
              </span>
            )}
            <span className={`px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium`}>
              {data.occasion}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCopy}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${theme.btnBg} border text-sm font-medium transition-all active:scale-95`}
            >
              <Copy className="w-4 h-4" />
              Copy Wish
            </button>
            <button
              onClick={handleShare}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all active:scale-95`}
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/ValentineDay"
            className={`inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl px-6 py-3 text-sm font-medium transition-all`}
          >
            <Sparkles className="w-4 h-4" />
            Create Your Own Wish
          </Link>
          <p className="text-white/30 text-xs mt-3">Powered by Smart Wish Creator</p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SharedWish;
