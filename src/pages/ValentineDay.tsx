import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ValentineLanding from "@/components/valentine/ValentineLanding";
import ValentineExperience from "@/components/valentine/ValentineExperience";
import { ValentineFormData, ValentineSurprise } from "@/components/valentine/types";

const STORAGE_KEY = "valentine-surprise-data";

const ValentineDay = () => {
  const [searchParams] = useSearchParams();
  const shareCode = searchParams.get("s");
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
      const shareUrl = `${window.location.origin}/ValentineDay?s=${shareCode}`;
      return (
        <ValentineExperience
          formData={formData}
          createdAt={decoded.c || new Date().toISOString()}
          isPartnerView={true}
          shareUrl={shareUrl}
        />
      );
    } catch {
      // Invalid share code, show landing
    }
  }

  const handleFormSubmit = (formData: ValentineFormData) => {
    const encoded = btoa(
      JSON.stringify({
        n: formData.yourName,
        p: formData.partnerName,
        r: formData.relationshipType,
        s: formData.loveStyle,
        c: new Date().toISOString(),
      })
    );
    const shareUrl = `${window.location.origin}/ValentineDay?s=${encoded}`;
    const newSurprise: ValentineSurprise = {
      formData,
      createdAt: new Date().toISOString(),
      shareUrl,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSurprise));
    setSurprise(newSurprise);
    setStep("experience");
  };

  const handleCreateNew = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSurprise(null);
    setStep("landing");
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
    />
  );
};

export default ValentineDay;
