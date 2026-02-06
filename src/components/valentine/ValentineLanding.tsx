import { useState, useRef } from "react";
import { Heart, Upload, Camera, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ValentineFormData, DaySelection, MemoryQuizItem } from "./types";
import { relationshipTypes, loveStyles } from "@/data/valentineData";
import FloatingHearts from "./FloatingHearts";
import DayMessageSelector from "./DayMessageSelector";
import MemoryQuizInput from "./MemoryQuizInput";
import { Link } from "react-router-dom";

interface ValentineLandingProps {
  onSubmit: (data: ValentineFormData, customMessage?: string, selections?: DaySelection[], memoryQuiz?: MemoryQuizItem[]) => void;
}

const ValentineLanding = ({ onSubmit }: ValentineLandingProps) => {
  const [step, setStep] = useState<"form" | "select">("form");
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [relationshipType, setRelationshipType] = useState("couple");
  const [loveStyle, setLoveStyle] = useState("romantic");
  const [partnerPhoto, setPartnerPhoto] = useState<string | null>(null);
  const [yourPhoto, setYourPhoto] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [memoryQuiz, setMemoryQuiz] = useState<MemoryQuizItem[]>([]);
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

  const handleFormContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yourName.trim() || !partnerName.trim()) return;
    setStep("select");
  };

  const handleSelectionsComplete = (selections: DaySelection[]) => {
    const validQuiz = memoryQuiz.filter(q => q.question.trim() && q.answer.trim());
    onSubmit(
      { yourName: yourName.trim(), partnerName: partnerName.trim(), relationshipType, loveStyle, partnerPhoto, yourPhoto },
      customMessage.trim() || undefined,
      selections,
      validQuiz.length > 0 ? validQuiz : undefined
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-950 to-pink-950 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />

      {/* Home Button */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-rose-500/20 rounded-full px-4 py-2 text-rose-200 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {step === "form" ? (
          <>
            {/* Hero Text */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 rounded-full px-4 py-1.5 mb-4">
                <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
                <span className="text-rose-300 text-sm font-medium">Love Surprise</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                Create a Love Surprise for Your Partner
              </h1>
              <p className="text-rose-200/80 text-sm sm:text-base">
                One Link, One Heart, Endless Smiles ❤️
              </p>
              <p className="text-rose-300/60 text-xs mt-2">
                Build a personalized Valentine experience your partner opens daily till Valentine's Day.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleFormContinue}
              className="bg-black/30 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-5 sm:p-6 space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-rose-200 text-xs">Your Name</Label>
                  <Input
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    placeholder="Your name"
                    className="bg-white/10 border-rose-500/30 text-white placeholder:text-rose-300/40 focus-visible:ring-rose-500 h-10 text-sm"
                    required
                    maxLength={30}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-rose-200 text-xs">Partner's Name</Label>
                  <Input
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Partner's name"
                    className="bg-white/10 border-rose-500/30 text-white placeholder:text-rose-300/40 focus-visible:ring-rose-500 h-10 text-sm"
                    required
                    maxLength={30}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-rose-200 text-xs">Relationship Mode</Label>
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

              <div className="space-y-1.5">
                <Label className="text-rose-200 text-xs">Love Style</Label>
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
                <div className="space-y-1.5">
                  <Label className="text-rose-200 text-xs">Partner Photo</Label>
                  <input type="file" ref={partnerPhotoRef} accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, setPartnerPhoto)} />
                  <button
                    type="button"
                    onClick={() => partnerPhotoRef.current?.click()}
                    className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-rose-500/30 flex flex-col items-center justify-center gap-1 hover:border-rose-400/50 transition-colors overflow-hidden"
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
                <div className="space-y-1.5">
                  <Label className="text-rose-200 text-xs">Your Photo (Optional)</Label>
                  <input type="file" ref={yourPhotoRef} accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, setYourPhoto)} />
                  <button
                    type="button"
                    onClick={() => yourPhotoRef.current?.click()}
                    className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-rose-500/30 flex flex-col items-center justify-center gap-1 hover:border-rose-400/50 transition-colors overflow-hidden"
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

              {/* Custom Message */}
              <div className="space-y-1.5">
                <Label className="text-rose-200 text-xs">
                  Your Invite Message <span className="text-rose-400/50">(Optional)</span>
                </Label>
                <Textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Write a special message for your partner..."
                  className="bg-white/10 border-rose-500/30 text-white placeholder:text-rose-300/40 focus-visible:ring-rose-500 text-sm resize-none h-20"
                  maxLength={200}
                />
                <p className="text-rose-400/40 text-[10px] text-right">{customMessage.length}/200</p>
              </div>

              {/* Memory Quiz */}
              <MemoryQuizInput items={memoryQuiz} onChange={setMemoryQuiz} />

              <Button
                type="submit"
                disabled={!yourName.trim() || !partnerName.trim()}
                className="w-full h-12 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-base rounded-xl shadow-lg shadow-rose-500/25 transition-all"
              >
                Next: Choose Days & Messages
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </>
        ) : (
          <div className="bg-black/30 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-5 sm:p-6">
            <DayMessageSelector
              onComplete={handleSelectionsComplete}
              onBack={() => setStep("form")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentineLanding;
