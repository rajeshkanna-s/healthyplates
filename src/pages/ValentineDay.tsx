import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ValentineLanding from "@/components/valentine/ValentineLanding";
import ValentineExperience from "@/components/valentine/ValentineExperience";
import { ValentineFormData, ValentineSurprise, DaySelection, MemoryQuizItem } from "@/components/valentine/types";

const STORAGE_KEY = "valentine-surprise-data";

// Generate a short code (max ~12 chars) from the data
const generateShortCode = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  const code = Math.abs(hash).toString(36);
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

const decodeShareData = (decoded: Record<string, unknown>) => {
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
  const memoryQuiz: MemoryQuizItem[] | undefined = decoded.q
    ? (decoded.q as [string, string][]).map(([question, answer]) => ({ question, answer }))
    : undefined;
  return { formData, selections, memoryQuiz, customMessage: decoded.m as string | undefined, createdAt: (decoded.c as string) || new Date().toISOString() };
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
    // Try short code lookup
    const stored = getShareData(shareCode);
    if (stored) {
      const { formData, selections, memoryQuiz, customMessage, createdAt } = decodeShareData(stored as Record<string, unknown>);
      const shareUrl = `${window.location.origin}/ValentineDay?c=${shareCode}`;
      return (
        <ValentineExperience
          formData={formData}
          createdAt={createdAt}
          isPartnerView={true}
          shareUrl={shareUrl}
          customMessage={customMessage}
          selections={selections.length > 0 ? selections : undefined}
          memoryQuiz={memoryQuiz}
        />
      );
    }

    // Fallback: try base64 decode
    try {
      const decoded = JSON.parse(atob(shareCode));
      const { formData, selections, memoryQuiz, customMessage, createdAt } = decodeShareData(decoded);
      const shareUrl = `${window.location.origin}/ValentineDay?c=${shareCode}`;
      return (
        <ValentineExperience
          formData={formData}
          createdAt={createdAt}
          isPartnerView={true}
          shareUrl={shareUrl}
          customMessage={customMessage}
          selections={selections.length > 0 ? selections : undefined}
          memoryQuiz={memoryQuiz}
        />
      );
    } catch {
      // Invalid share code, show landing
    }
  }

  const handleFormSubmit = (formData: ValentineFormData, customMessage?: string, selections?: DaySelection[], memoryQuiz?: MemoryQuizItem[]) => {
    const createdAt = new Date().toISOString();
    
    // Encode selections as compact array
    const selectionsCompact = selections?.map(s => [s.dayNumber, s.messageIndices]) || [];
    
    // Encode memory quiz as compact array
    const quizCompact = memoryQuiz?.map(q => [q.question, q.answer]) || [];

    const shareData: Record<string, unknown> = {
      n: formData.yourName,
      p: formData.partnerName,
      r: formData.relationshipType,
      s: formData.loveStyle,
      c: createdAt,
      d: selectionsCompact,
    };

    // Only include optional fields if they have content
    if (customMessage) shareData.m = customMessage;
    if (quizCompact.length > 0) shareData.q = quizCompact;

    // Generate short code and store data
    const shortCode = generateShortCode(JSON.stringify(shareData));
    storeShareData(shortCode, shareData);

    // Also encode as base64 for cross-device sharing
    const encoded = btoa(JSON.stringify(shareData));
    
    // Use base64 URL for sharing (works cross-device)
    const shareUrl = `${window.location.origin}/ValentineDay?c=${encoded}`;
    
    const newSurprise: ValentineSurprise = {
      formData,
      createdAt,
      shareUrl,
      customMessage,
      selections: selections || [],
      memoryQuiz,
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
      memoryQuiz={surprise.memoryQuiz}
    />
  );
};

export default ValentineDay;
