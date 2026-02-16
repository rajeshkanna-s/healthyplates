import { useParams, Link } from "react-router-dom";
import { decodeWishData } from "@/components/wish-creator/shareConfig";
import { Home, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

const SharedWish = () => {
  const { encoded } = useParams<{ encoded: string }>();
  const data = encoded ? decodeWishData(encoded) : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-2xl">😔</p>
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

  const handleCopy = () => {
    navigator.clipboard.writeText(data.wishText);
    toast.success("Wish copied!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ text: data.wishText }).catch(() => {});
    } else {
      navigator.clipboard.writeText(data.wishText);
      toast.success("Copied! Share it anywhere.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-violet-500/20 rounded-full px-4 py-2 text-violet-200 hover:text-white transition-colors text-sm"
        >
          <Home className="w-4 h-4" />
          Home
        </Link>
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-6">
          <span className="text-5xl block mb-3">{data.occasionEmoji}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {data.occasion} Wish
          </h1>
          {data.recipientName && (
            <p className="text-violet-300/70 text-sm">For {data.recipientName}</p>
          )}
        </div>

        <div className="bg-black/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 sm:p-8 space-y-5">
          <p className="text-white/90 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
            {data.wishText}
          </p>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-violet-500/10">
            {data.tone && (
              <span className="px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs">
                {data.tone}
              </span>
            )}
            {data.relationship && (
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs">
                {data.relationship}
              </span>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-200 text-sm font-medium hover:bg-violet-500/30 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-sm font-medium hover:bg-indigo-500/30 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/ValentineDay"
            className="inline-flex items-center gap-2 text-violet-300 hover:text-white text-sm transition-colors"
          >
            ✨ Create your own wish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharedWish;
