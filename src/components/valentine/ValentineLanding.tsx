import { useState, useRef } from "react";
import { Heart, Upload, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValentineFormData } from "./types";
import { relationshipTypes, loveStyles } from "@/data/valentineData";

interface ValentineLandingProps {
  onSubmit: (data: ValentineFormData) => void;
}

const ValentineLanding = ({ onSubmit }: ValentineLandingProps) => {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [relationshipType, setRelationshipType] = useState("couple");
  const [loveStyle, setLoveStyle] = useState("romantic");
  const [partnerPhoto, setPartnerPhoto] = useState<string | null>(null);
  const [yourPhoto, setYourPhoto] = useState<string | null>(null);
  const partnerPhotoRef = useRef<HTMLInputElement>(null);
  const yourPhotoRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yourName.trim() || !partnerName.trim()) return;
    onSubmit({ yourName: yourName.trim(), partnerName: partnerName.trim(), relationshipType, loveStyle, partnerPhoto, yourPhoto });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-950 to-pink-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-rose-500/20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${16 + Math.random() * 24}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 rounded-full px-4 py-1.5 mb-4">
            <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
            <span className="text-rose-300 text-sm font-medium">7 Days Love Surprise</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Create a 7-Day Love Surprise for Your Partner
          </h1>
          <p className="text-rose-200/80 text-sm sm:text-base">
            One Link, One Heart, Seven Smiles ❤️
          </p>
          <p className="text-rose-300/60 text-xs mt-2">
            Build a personalized Valentine experience your partner opens daily till Valentine's Day.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-black/30 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-6 space-y-5"
        >
          <div className="space-y-2">
            <Label className="text-rose-200 text-sm">Your Name</Label>
            <Input
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder="Enter your name"
              className="bg-white/10 border-rose-500/30 text-white placeholder:text-rose-300/40 focus-visible:ring-rose-500"
              required
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-rose-200 text-sm">Partner's Name</Label>
            <Input
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Enter partner's name"
              className="bg-white/10 border-rose-500/30 text-white placeholder:text-rose-300/40 focus-visible:ring-rose-500"
              required
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-rose-200 text-sm">Relationship Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {relationshipTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setRelationshipType(type.value)}
                  className={`p-2.5 rounded-xl text-sm font-medium transition-all border ${
                    relationshipType === type.value
                      ? "bg-rose-500/30 border-rose-400 text-white"
                      : "bg-white/5 border-rose-500/20 text-rose-300 hover:bg-white/10"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-rose-200 text-sm">Love Style</Label>
            <div className="grid grid-cols-2 gap-2">
              {loveStyles.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => setLoveStyle(style.value)}
                  className={`p-2.5 rounded-xl text-sm font-medium transition-all border ${
                    loveStyle === style.value
                      ? "bg-rose-500/30 border-rose-400 text-white"
                      : "bg-white/5 border-rose-500/20 text-rose-300 hover:bg-white/10"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Uploads */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-rose-200 text-xs">Partner Photo</Label>
              <input type="file" ref={partnerPhotoRef} accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, setPartnerPhoto)} />
              <button
                type="button"
                onClick={() => partnerPhotoRef.current?.click()}
                className="w-full aspect-square rounded-xl border-2 border-dashed border-rose-500/30 flex flex-col items-center justify-center gap-1 hover:border-rose-400/50 transition-colors overflow-hidden"
              >
                {partnerPhoto ? (
                  <img src={partnerPhoto} alt="Partner" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-rose-400" />
                    <span className="text-rose-300/60 text-xs">Upload</span>
                  </>
                )}
              </button>
            </div>
            <div className="space-y-2">
              <Label className="text-rose-200 text-xs">Your Photo (Optional)</Label>
              <input type="file" ref={yourPhotoRef} accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, setYourPhoto)} />
              <button
                type="button"
                onClick={() => yourPhotoRef.current?.click()}
                className="w-full aspect-square rounded-xl border-2 border-dashed border-rose-500/30 flex flex-col items-center justify-center gap-1 hover:border-rose-400/50 transition-colors overflow-hidden"
              >
                {yourPhoto ? (
                  <img src={yourPhoto} alt="You" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <Camera className="w-5 h-5 text-rose-400" />
                    <span className="text-rose-300/60 text-xs">Optional</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!yourName.trim() || !partnerName.trim()}
            className="w-full h-12 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-base rounded-xl shadow-lg shadow-rose-500/25 transition-all"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Love Week
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ValentineLanding;
