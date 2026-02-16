export const SHARE_CONFIG: Record<string, string[]> = {
  personal: ["whatsapp", "instagram", "sms", "copy_link"],
  festivals: ["whatsapp", "instagram", "facebook", "copy_link"],
  love: ["whatsapp", "instagram", "sms", "copy_link"],
  professional: ["linkedin", "email", "whatsapp", "copy_link"],
  general: ["whatsapp", "email", "sms", "copy_link"],
};

export const SHARE_ICONS: Record<string, { label: string; icon: string }> = {
  whatsapp: { label: "WhatsApp", icon: "MessageCircle" },
  instagram: { label: "Instagram", icon: "Instagram" },
  facebook: { label: "Facebook", icon: "Facebook" },
  linkedin: { label: "LinkedIn", icon: "Linkedin" },
  email: { label: "Email", icon: "Mail" },
  sms: { label: "SMS", icon: "Smartphone" },
  copy_link: { label: "Copy Link", icon: "Link" },
};

export function getShareUrl(platform: string, text: string, url: string): string | null {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  switch (platform) {
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(text + "\n\n" + url)}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "email":
      return `mailto:?subject=${encodeURIComponent("A Special Wish For You")}&body=${encodeURIComponent(text + "\n\n" + url)}`;
    case "sms":
      return `sms:?body=${encodeURIComponent(text + "\n\n" + url)}`;
    case "instagram":
      // Instagram doesn't support direct sharing via URL, copy instead
      return null;
    case "copy_link":
      return null;
    default:
      return null;
  }
}

export function encodeWishData(data: {
  occasion: string;
  occasionEmoji: string;
  recipientName: string;
  relationship: string;
  tone: string;
  wishText: string;
  categoryId: string;
}): string {
  const json = JSON.stringify(data);
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeWishData(encoded: string): {
  occasion: string;
  occasionEmoji: string;
  recipientName: string;
  relationship: string;
  tone: string;
  wishText: string;
  categoryId: string;
} | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
