import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ValentineLanding from "@/components/valentine/ValentineLanding";
import ValentineExperience from "@/components/valentine/ValentineExperience";
import { ValentineFormData, ValentineSurprise } from "@/components/valentine/types";

const STORAGE_KEY = "valentine-surprise-data";

// Generate a short code from the data (max 12 chars)
const generateShortCode = (data: {
  yourName: string;
  partnerName: string;
  relationshipType: string;
  loveStyle: string;
  createdAt: string;
  customMessage?: string;
}): string => {
  // Create a simple hash from names + timestamp
  const str = data.yourName + data.partnerName + data.createdAt;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  // Convert to base36 for shorter representation
  const shortHash = Math.abs(hash).toString(36).toUpperCase();
  
  // Add first letters of names
  const initials = (data.yourName[0] + data.partnerName[0]).toUpperCase();
  
  // Relationship type short code
  const relCode = data.relationshipType[0].toUpperCase();
  
  // Style short code
  const styleCode = data.loveStyle[0].toUpperCase();
  
  // Format: INITIALS-HASH-CODES (max ~12 chars)
  return `${initials}${shortHash.slice(0, 6)}${relCode}${styleCode}`;
};

// Decode short code to get data (stored in localStorage on creator's device)
const decodeShortCode = (code: string): { 
  initials: string; 
  relCode: string; 
  styleCode: string;
} | null => {
  if (code.length < 4) return null;
  
  const initials = code.slice(0, 2);
  const relCode = code.slice(-2, -1);
  const styleCode = code.slice(-1);
  
  return { initials, relCode, styleCode };
};

// Map short codes back to full values
const getRelationshipFromCode = (code: string): string => {
  const map: Record<string, string> = { C: "couple", H: "husband-wife", L: "long-distance", R: "crush" };
  return map[code] || "couple";
};

const getStyleFromCode = (code: string): string => {
  const map: Record<string, string> = { C: "cute", R: "romantic", D: "deep", F: "fun" };
  return map[code] || "romantic";
};

interface ExtendedSurprise extends ValentineSurprise {
  customMessage?: string;
}

const ValentineDay = () => {
  const [searchParams] = useSearchParams();
  const shareCode = searchParams.get("s");
  const legacyCode = searchParams.get("c"); // For backward compatibility with base64 codes
  const [surprise, setSurprise] = useState<ExtendedSurprise | null>(null);
  const [step, setStep] = useState<"landing" | "experience">("landing");

  // Load existing surprise from localStorage
  useEffect(() => {
    if (!shareCode && !legacyCode) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as ExtendedSurprise;
          setSurprise(parsed);
          setStep("experience");
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }
  }, [shareCode, legacyCode]);

  // Handle legacy base64 share code (backward compatibility)
  if (legacyCode) {
    try {
      const decoded = JSON.parse(atob(legacyCode));
      const formData: ValentineFormData = {
        yourName: decoded.n || "Someone",
        partnerName: decoded.p || "You",
        relationshipType: decoded.r || "couple",
        loveStyle: decoded.s || "romantic",
        partnerPhoto: null,
        yourPhoto: null,
      };
      const shareUrl = `${window.location.origin}/ValentineDay?c=${legacyCode}`;
      return (
        <ValentineExperience
          formData={formData}
          createdAt={decoded.c || new Date().toISOString()}
          isPartnerView={true}
          shareUrl={shareUrl}
          customMessage={decoded.m}
        />
      );
    } catch {
      // Invalid share code, show landing
    }
  }

  // Handle new short share code
  if (shareCode) {
    const decoded = decodeShortCode(shareCode);
    if (decoded) {
      // For short codes, we need to extract names from the shared data
      // Since short codes don't store full names, use placeholders or check localStorage
      const formData: ValentineFormData = {
        yourName: decoded.initials[0] || "S",
        partnerName: decoded.initials[1] || "P",
        relationshipType: getRelationshipFromCode(decoded.relCode),
        loveStyle: getStyleFromCode(decoded.styleCode),
        partnerPhoto: null,
        yourPhoto: null,
      };
      
      // Try to get full data from localStorage if available
      const stored = localStorage.getItem(`valentine-shared-${shareCode}`);
      if (stored) {
        try {
          const fullData = JSON.parse(stored);
          formData.yourName = fullData.yourName || formData.yourName;
          formData.partnerName = fullData.partnerName || formData.partnerName;
          
          const shareUrl = `${window.location.origin}/ValentineDay?s=${shareCode}`;
          return (
            <ValentineExperience
              formData={formData}
              createdAt={fullData.createdAt || new Date().toISOString()}
              isPartnerView={true}
              shareUrl={shareUrl}
              customMessage={fullData.customMessage}
            />
          );
        } catch {}
      }
      
      // Fallback: use initials as names (partner view won't have full names)
      const shareUrl = `${window.location.origin}/ValentineDay?s=${shareCode}`;
      return (
        <ValentineExperience
          formData={formData}
          createdAt={new Date().toISOString()}
          isPartnerView={true}
          shareUrl={shareUrl}
        />
      );
    }
  }

  const handleFormSubmit = (formData: ValentineFormData, customMessage?: string) => {
    const createdAt = new Date().toISOString();
    
    // Generate short code
    const shortCode = generateShortCode({
      yourName: formData.yourName,
      partnerName: formData.partnerName,
      relationshipType: formData.relationshipType,
      loveStyle: formData.loveStyle,
      createdAt,
      customMessage,
    });
    
    // Also create legacy base64 code with full data for sharing (includes names)
    const legacyEncoded = btoa(
      JSON.stringify({
        n: formData.yourName,
        p: formData.partnerName,
        r: formData.relationshipType,
        s: formData.loveStyle,
        c: createdAt,
        m: customMessage,
      })
    );
    
    // Use legacy code for full name preservation in shared links
    const shareUrl = `${window.location.origin}/ValentineDay?s=${shortCode}`;
    
    // Store full data for short code lookup
    localStorage.setItem(`valentine-shared-${shortCode}`, JSON.stringify({
      yourName: formData.yourName,
      partnerName: formData.partnerName,
      createdAt,
      customMessage,
    }));
    
    const newSurprise: ExtendedSurprise = {
      formData,
      createdAt,
      shareUrl,
      customMessage,
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
    />
  );
};

export default ValentineDay;
