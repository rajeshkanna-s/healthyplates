import { MessageCircle, Instagram, Facebook, Linkedin, Mail, Smartphone, Link, Copy } from "lucide-react";
import { toast } from "sonner";
import { SHARE_CONFIG, SHARE_ICONS, getShareUrl, encodeWishData } from "./shareConfig";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Smartphone,
  Link,
};

interface SharePanelProps {
  categoryId: string;
  wishText: string;
  occasion: string;
  occasionEmoji: string;
  recipientName: string;
  relationship: string;
  tone: string;
}

const SharePanel = ({
  categoryId,
  wishText,
  occasion,
  occasionEmoji,
  recipientName,
  relationship,
  tone,
}: SharePanelProps) => {
  const platforms = SHARE_CONFIG[categoryId] || SHARE_CONFIG.general;

  const getWishUrl = () => {
    const encoded = encodeWishData({
      occasion,
      occasionEmoji,
      recipientName,
      relationship,
      tone,
      wishText,
      categoryId,
    });
    return `${window.location.origin}/wish/${encoded}`;
  };

  const handlePlatformClick = (platform: string) => {
    const wishUrl = getWishUrl();

    if (platform === "copy_link") {
      navigator.clipboard.writeText(wishUrl);
      toast.success("Shareable link copied!");
      return;
    }

    if (platform === "instagram") {
      navigator.clipboard.writeText(wishText + "\n\n" + wishUrl);
      toast.success("Copied! Paste it on Instagram.");
      return;
    }

    const url = getShareUrl(platform, wishText, wishUrl);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopyWish = () => {
    navigator.clipboard.writeText(wishText);
    toast.success("Wish text copied!");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <p className="text-violet-300/60 text-xs">Share via:</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => {
          const config = SHARE_ICONS[platform];
          if (!config) return null;
          const IconComp = iconMap[config.icon];
          return (
            <button
              key={platform}
              onClick={() => handlePlatformClick(platform)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-violet-500/20 text-violet-200 text-xs font-medium hover:bg-violet-500/20 hover:border-violet-400/30 transition-all"
              title={config.label}
            >
              {IconComp && <IconComp className="w-3.5 h-3.5" />}
              {config.label}
            </button>
          );
        })}
      </div>
      <button
        onClick={handleCopyWish}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-200 text-xs font-medium hover:bg-violet-500/30 transition-colors"
      >
        <Copy className="w-3.5 h-3.5" />
        Copy Wish Text
      </button>
    </div>
  );
};

export default SharePanel;
