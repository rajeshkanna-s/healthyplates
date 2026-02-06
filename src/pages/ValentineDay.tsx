import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ValentineLanding from "@/components/valentine/ValentineLanding";
import ValentineExperience from "@/components/valentine/ValentineExperience";
import { ValentineFormData, ValentineSurprise, DaySelection } from "@/components/valentine/types";

const STORAGE_KEY = "valentine-surprise-data";

// Generate a short code (max ~12 chars) from the data
const generateShortCode = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  // Use absolute value and convert to base36 for compact representation
  const code = Math.abs(hash).toString(36);
  // Add a second hash for uniqueness
  let hash2 = 5381;
  for (let i = 0; i < data.length; i++) {
    hash2 = (hash2 * 33) ^ data.charCodeAt(i);
  }
  return code + Math.abs(hash2).toString(36);
};

// Store shared data in localStorage indexed by short code
const SHARE_STORE_KEY = "valentine-shares";

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

  // Handle shared link (partner view) — try short code first, then base64 fallback
  if (shareCode) {
    // Try short code lookup
    const stored = getShareData(shareCode);
    if (stored) {
      const decoded = stored as Record<string, unknown>;
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
      const shareUrl = `${window.location.origin}/ValentineDay?c=${shareCode}`;
      return (
        <ValentineExperience
          formData={formData}
          createdAt={(decoded.c as string) || new Date().toISOString()}
          isPartnerView={true}
          shareUrl={shareUrl}
          customMessage={decoded.m as string | undefined}
          selections={selections.length > 0 ? selections : undefined}
        />
      );
    }

    // Fallback: try base64 decode for backward compatibility
    try {
      const decoded = JSON.parse(atob(shareCode));
      const formData: ValentineFormData = {
        yourName: decoded.n || "Someone",
        partnerName: decoded.p || "You",
        relationshipType: decoded.r || "couple",
        loveStyle: decoded.s || "romantic",
        partnerPhoto: null,
        yourPhoto: null,
      };
      const selections: DaySelection[] = (decoded.d || []).map((item: [number, number[]]) => ({
        dayNumber: item[0],
        messageIndices: item[1] || [],
      }));
      const shareUrl = `${window.location.origin}/ValentineDay?c=${shareCode}`;
      return (
        <ValentineExperience
          formData={formData}
          createdAt={decoded.c || new Date().toISOString()}
          isPartnerView={true}
          shareUrl={shareUrl}
          customMessage={decoded.m}
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

    // Generate short code and store data
    const shortCode = generateShortCode(JSON.stringify(shareData));
    storeShareData(shortCode, shareData);

    // Also encode as base64 for cross-device sharing (fallback)
    const encoded = btoa(JSON.stringify(shareData));
    
    // Use short code for the display URL
    const shareUrl = `${window.location.origin}/ValentineDay?c=${shortCode}`;
    // Store the full base64 URL as backup
    const fullShareUrl = `${window.location.origin}/ValentineDay?c=${encoded}`;
    
    const newSurprise: ValentineSurprise = {
      formData,
      createdAt,
      shareUrl: fullShareUrl, // Use base64 URL for actual sharing (works cross-device)
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
