import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ValentineLanding from "@/components/valentine/ValentineLanding";
import ValentineExperience from "@/components/valentine/ValentineExperience";
import { ValentineFormData, ValentineSurprise, DaySelection } from "@/components/valentine/types";

const STORAGE_KEY = "valentine-surprise-data";
const SHARE_STORE_KEY = "valentine-shares";

// Generate a 15-char unique ID from names + timestamp
const generate15CharCode = (name1: string, name2: string): string => {
  const ts = Date.now().toString(36); // ~8 chars in base36
  // Hash the names
  let hash = 0;
  const combined = (name1 + name2).toLowerCase().replace(/\s/g, "");
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash + combined.charCodeAt(i)) | 0;
  }
  const nameCode = Math.abs(hash).toString(36);
  // Combine: nameHash + timestamp, pad/trim to exactly 15 chars
  const code = (nameCode + ts).replace(/[^a-z0-9]/g, "");
  if (code.length >= 15) return code.substring(0, 15);
  // Pad with extra hash chars if too short
  let extra = 7919;
  for (let i = 0; i < combined.length; i++) {
    extra = (extra * 31 + combined.charCodeAt(i)) | 0;
  }
  const padded = code + Math.abs(extra).toString(36);
  return padded.substring(0, 15);
};

const storeShareData = (code: string, data: object) => {
  try {
    const store = JSON.parse(localStorage.getItem(SHARE_STORE_KEY) || "{}");
    store[code] = data;
    localStorage.setItem(SHARE_STORE_KEY, JSON.stringify(store));
  } catch { /* ignore */ }
};

const getShareData = (code: string): object | null => {
  try {
    const store = JSON.parse(localStorage.getItem(SHARE_STORE_KEY) || "{}");
    return store[code] || null;
  } catch { return null; }
};

const decodeSharePayload = (decoded: Record<string, unknown>) => {
  const formData: ValentineFormData = {
    yourName: (decoded.n as string) || "Someone",
    partnerName: (decoded.p as string) || "You",
    relationshipType: (decoded.r as string) || "couple",
    loveStyle: (decoded.s as string) || "romantic",
    partnerPhoto: null,
    yourPhoto: null,
  };
  const selections: DaySelection[] = ((decoded.d as [number, number[]][]) || []).map((item) => ({
    dayNumber: item[0],
    messageIndices: item[1] || [],
  }));
  return { formData, selections, createdAt: (decoded.c as string) || new Date().toISOString(), customMessage: decoded.m as string | undefined };
};

const ValentineDay = () => {
  const [searchParams] = useSearchParams();
  const shareCode = searchParams.get("c");
  const [surprise, setSurprise] = useState<ValentineSurprise | null>(null);
  const [step, setStep] = useState<"landing" | "experience">("landing");

  // Load existing surprise from localStorage
  useEffect(() => {
    if (!shareCode) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as ValentineSurprise;
          setSurprise(parsed);
          setStep("experience");
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }
  }, [shareCode]);

  // Handle shared link (partner view)
  if (shareCode) {
    // Try short code lookup from localStorage
    const stored = getShareData(shareCode);
    if (stored) {
      const { formData, selections, createdAt, customMessage } = decodeSharePayload(stored as Record<string, unknown>);
      const shareUrl = `${window.location.origin}/ValentineDay?c=${shareCode}`;
      return (
        <ValentineExperience
          formData={formData}
          createdAt={createdAt}
          isPartnerView={true}
          shareUrl={shareUrl}
          customMessage={customMessage}
          selections={selections.length > 0 ? selections : undefined}
        />
      );
    }

    // Fallback: try base64 decode for backward compatibility
    try {
      const decoded = JSON.parse(atob(shareCode));
      const { formData, selections, createdAt, customMessage } = decodeSharePayload(decoded);
      const shareUrl = `${window.location.origin}/ValentineDay?c=${shareCode}`;
      return (
        <ValentineExperience
          formData={formData}
          createdAt={createdAt}
          isPartnerView={true}
          shareUrl={shareUrl}
          customMessage={customMessage}
          selections={selections.length > 0 ? selections : undefined}
        />
      );
    } catch {
      // Invalid share code, show landing
    }
  }

  const handleFormSubmit = (formData: ValentineFormData, customMessage?: string, selections?: DaySelection[]) => {
    const createdAt = new Date().toISOString();

    // Encode selections as compact array: [[dayNum, [msgIdx1, msgIdx2]], ...]
    const selectionsCompact = selections?.map(s => [s.dayNumber, s.messageIndices]) || [];

    const shareData = {
      n: formData.yourName,
      p: formData.partnerName,
      r: formData.relationshipType,
      s: formData.loveStyle,
      c: createdAt,
      m: customMessage,
      d: selectionsCompact,
    };

    // Generate 15-char unique code and store locally
    const shortCode = generate15CharCode(formData.yourName, formData.partnerName);
    storeShareData(shortCode, shareData);

    // The short code URL (compact, 15 chars max after ?c=)
    const shareUrl = `${window.location.origin}/ValentineDay?c=${shortCode}`;

    const newSurprise: ValentineSurprise = {
      formData,
      createdAt,
      shareUrl,
      customMessage,
      selections: selections || [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSurprise));
    setSurprise(newSurprise);
    setStep("experience");
  };

  if (step === "landing" || !surprise) {
    return <ValentineLanding onSubmit={handleFormSubmit} />;
  }

  return (
    <ValentineExperience
      formData={surprise.formData}
      createdAt={surprise.createdAt}
      isPartnerView={false}
      shareUrl={surprise.shareUrl}
      customMessage={surprise.customMessage}
      selections={surprise.selections}
    />
  );
};

export default ValentineDay;
