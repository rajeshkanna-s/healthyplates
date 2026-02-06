import { Heart, Download, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getWhatsAppShareText } from "@/data/valentineData";

interface StickyBottomBarProps {
  shareUrl: string;
  onDownload: () => void;
  partnerName: string;
}

const StickyBottomBar = ({ shareUrl, onDownload, partnerName }: StickyBottomBarProps) => {
  const handleSendToPartner = () => {
    const text = getWhatsAppShareText(shareUrl);
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "7 Days Love Surprise",
          text: `I made a special Valentine surprise for ${partnerName}! ❤️`,
          url: shareUrl,
        });
      } catch {
        navigator.clipboard.writeText(shareUrl);
        toast({ title: "Link copied!" });
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copied!" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 via-black/80 to-transparent pt-6 pb-4 px-4">
      <div className="max-w-md mx-auto flex gap-2 justify-center">
        <button
          onClick={handleSendToPartner}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-rose-500/30 hover:from-rose-500 hover:to-pink-500 transition-all text-sm"
        >
          <Heart className="w-4 h-4" fill="currentColor" />
          <span className="hidden sm:inline">Send to Partner</span>
          <span className="sm:hidden">Send</span>
        </button>
        <button
          onClick={onDownload}
          className="flex items-center justify-center gap-2 bg-white/10 border border-rose-500/30 text-rose-200 font-medium py-3 px-4 rounded-xl hover:bg-white/15 transition-all text-sm"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 bg-white/10 border border-rose-500/30 text-rose-200 font-medium py-3 px-4 rounded-xl hover:bg-white/15 transition-all text-sm"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </div>
  );
};

export default StickyBottomBar;
