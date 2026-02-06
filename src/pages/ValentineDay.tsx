import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ValentineLanding from "@/components/valentine/ValentineLanding";
import ValentineExperience from "@/components/valentine/ValentineExperience";
import { ValentineFormData, ValentineSurprise, DaySelection } from "@/components/valentine/types";

const STORAGE_KEY = "valentine-surprise-data";

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
      
      // Decode selections
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
    
    const encoded = btoa(
      JSON.stringify({
        n: formData.yourName,
        p: formData.partnerName,
        r: formData.relationshipType,
        s: formData.loveStyle,
        c: createdAt,
        m: customMessage,
        d: selectionsCompact,
      })
    );
    const shareUrl = `${window.location.origin}/ValentineDay?c=${encoded}`;
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
