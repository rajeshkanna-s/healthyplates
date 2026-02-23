import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { occasionCategories } from "./wishData";
import { generateWishes } from "./wishTemplates";
import { relationships, tones, lengths, type OccasionCategory, type Occasion } from "./types";
import SharePanel from "./SharePanel";

const WishCreatorApp = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<OccasionCategory | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
  const [recipientName, setRecipientName] = useState("");
  const [relationship, setRelationship] = useState("Friend");
  const [tone, setTone] = useState("simple");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [extraDetails, setExtraDetails] = useState("");
  const [senderName, setSenderName] = useState("");
  const [generatedWishes, setGeneratedWishes] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!selectedOccasion || !selectedCategory) return;
    const wishes = generateWishes(
      selectedOccasion.id,
      tone,
      length,
      recipientName,
      relationship,
      extraDetails,
      4
    );
    setGeneratedWishes(wishes);
    setStep(6);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Copied! Share it anywhere.");
    }
  };

  const handleRegenerate = () => {
    if (!selectedOccasion || !selectedCategory) return;
    const wishes = generateWishes(selectedOccasion.id, tone, length, recipientName, relationship, extraDetails, 4);
    setGeneratedWishes(wishes);
    toast.success("New wishes generated!");
  };

  const handleChangeTone = (newTone: string) => {
    setTone(newTone);
    if (!selectedOccasion) return;
    const wishes = generateWishes(selectedOccasion.id, newTone, length, recipientName, relationship, extraDetails, 4);
    setGeneratedWishes(wishes);
  };

  const handleStartOver = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedOccasion(null);
    setRecipientName("");
    setSenderName("");
    setRelationship("Friend");
    setTone("simple");
    setLength("medium");
    setExtraDetails("");
    setGeneratedWishes([]);
  };

  const stepTitles: Record<number, string> = {
    1: "Pick a Category",
    2: "Choose Occasion",
    3: "Add Details",
    4: "Personalize (Optional)",
    5: "Review & Generate",
    6: "Your Wishes ✨",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Home Button */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-violet-500/20 rounded-full px-4 py-2 text-violet-200 hover:text-white transition-colors text-sm"
        >
          <Home className="w-4 h-4" />
          Home
        </Link>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 rounded-full px-4 py-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">Smart Wish Creator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Create Beautiful Wishes Instantly
          </h1>
          <p className="text-violet-200/70 text-sm">
            Pick an occasion, add details, and get personalized messages ready to share.
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1 mb-6 px-4">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? "bg-violet-400" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Step title */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg font-semibold text-white">
            Step {step}: {stepTitles[step]}
          </h2>
          {step > 1 && step < 6 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-violet-300 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
        </div>

        {/* Card */}
        <div className="bg-black/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-5 sm:p-6">
          {/* Step 1: Category */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {occasionCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setStep(2);
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-violet-500/20 bg-white/5 hover:bg-violet-500/20 hover:border-violet-400/40 transition-all text-left group"
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <div>
                    <p className="text-white font-medium text-sm group-hover:text-violet-200">{cat.label}</p>
                    <p className="text-violet-300/50 text-xs">{cat.occasions.length} occasions</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Occasion */}
          {step === 2 && selectedCategory && (
            <div className="space-y-3">
              <p className="text-violet-300/60 text-xs mb-2">
                Category: {selectedCategory.emoji} {selectedCategory.label}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {selectedCategory.occasions.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => {
                      setSelectedOccasion(occ);
                      setStep(3);
                    }}
                    className="flex items-center gap-2 p-3 rounded-xl border border-violet-500/20 bg-white/5 hover:bg-violet-500/20 hover:border-violet-400/40 transition-all text-left"
                  >
                    <span className="text-lg">{occ.emoji}</span>
                    <span className="text-white text-sm font-medium">{occ.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-violet-200 text-xs">Your Name (shown on shared wish)</Label>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g., Priya"
                  className="bg-white/10 border-violet-500/30 text-white placeholder:text-violet-300/40 focus-visible:ring-violet-500 h-10 text-sm"
                  maxLength={30}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-violet-200 text-xs">Recipient's Name</Label>
                <Input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g., Ankit"
                  className="bg-white/10 border-violet-500/30 text-white placeholder:text-violet-300/40 focus-visible:ring-violet-500 h-10 text-sm"
                  maxLength={30}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-violet-200 text-xs">Relationship</Label>
                <div className="flex flex-wrap gap-2">
                  {relationships.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRelationship(r)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                        relationship === r
                          ? "bg-violet-500/30 border-violet-400 text-white"
                          : "bg-white/5 border-violet-500/20 text-violet-300 hover:bg-white/10"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-violet-200 text-xs">Tone</Label>
                <div className="grid grid-cols-3 gap-2">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={`p-2.5 rounded-xl text-sm font-medium transition-all border ${
                        tone === t.value
                          ? "bg-violet-500/30 border-violet-400 text-white"
                          : "bg-white/5 border-violet-500/20 text-violet-300 hover:bg-white/10"
                      }`}
                    >
                      {t.emoji} {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-violet-200 text-xs">Length</Label>
                <div className="grid grid-cols-3 gap-2">
                  {lengths.map((l) => (
                    <button
                      key={l.value}
                      onClick={() => setLength(l.value)}
                      className={`p-2.5 rounded-xl text-xs font-medium transition-all border ${
                        length === l.value
                          ? "bg-violet-500/30 border-violet-400 text-white"
                          : "bg-white/5 border-violet-500/20 text-violet-300 hover:bg-white/10"
                      }`}
                    >
                      <div>{l.label}</div>
                      <div className="text-[10px] opacity-60">{l.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setStep(4)}
                className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl"
              >
                Next: Personalize
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 4: Personalization */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-violet-200 text-xs">
                  Add a Special Detail <span className="text-violet-400/50">(Optional)</span>
                </Label>
                <Textarea
                  value={extraDetails}
                  onChange={(e) => setExtraDetails(e.target.value)}
                  placeholder="e.g., We've been friends for 10 years, She just got promoted, He loves travelling..."
                  className="bg-white/10 border-violet-500/30 text-white placeholder:text-violet-300/40 focus-visible:ring-violet-500 text-sm resize-none h-24"
                  maxLength={200}
                />
                <p className="text-violet-400/40 text-[10px] text-right">{extraDetails.length}/200</p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(5)}
                  className="flex-1 h-11 border-violet-500/30 text-violet-200 hover:bg-violet-500/20 rounded-xl bg-transparent"
                >
                  Skip
                </Button>
                <Button
                  onClick={() => setStep(5)}
                  className="flex-1 h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl"
                >
                  Next: Review
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="space-y-2">
                {[
                  { label: "Category", value: selectedCategory?.label },
                  { label: "Occasion", value: `${selectedOccasion?.emoji} ${selectedOccasion?.label}` },
                  { label: "To", value: recipientName || "(no name)" },
                  { label: "Relationship", value: relationship },
                  { label: "Tone", value: tones.find((t) => t.value === tone)?.label },
                  { label: "Length", value: lengths.find((l) => l.value === length)?.label },
                  ...(extraDetails ? [{ label: "Detail", value: extraDetails }] : []),
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-1.5 border-b border-violet-500/10">
                    <span className="text-violet-300/60 text-xs">{item.label}</span>
                    <span className="text-white text-sm font-medium text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-base rounded-xl shadow-lg shadow-violet-500/25"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Wishes
              </Button>
            </div>
          )}

          {/* Step 6: Results */}
          {step === 6 && (
            <div className="space-y-4">
              {generatedWishes.map((wish, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-violet-500/15 space-y-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-violet-400 text-xs font-semibold">Option {idx + 1}</span>
                    <span className="text-violet-500/30 text-xs">
                      {idx === 0 ? "📱 Status" : idx === 1 ? "💬 WhatsApp" : idx === 2 ? "💌 Emotional" : "✨ Bonus"}
                    </span>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">{wish}</p>
                  <SharePanel
                    categoryId={selectedCategory?.id || "general"}
                    wishText={wish}
                    occasion={selectedOccasion?.label || ""}
                    occasionEmoji={selectedOccasion?.emoji || "✨"}
                    recipientName={recipientName}
                    relationship={relationship}
                    tone={tone}
                    senderName={senderName}
                  />
                </div>
              ))}

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  className="h-10 border-violet-500/30 text-violet-200 hover:bg-violet-500/20 rounded-xl bg-transparent text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  Generate More
                </Button>
                <Button
                  onClick={handleStartOver}
                  variant="outline"
                  className="h-10 border-violet-500/30 text-violet-200 hover:bg-violet-500/20 rounded-xl bg-transparent text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  Start Over
                </Button>
              </div>

              {/* Change Tone on results */}
              <div className="pt-2">
                <p className="text-violet-300/50 text-xs mb-2">Change Tone:</p>
                <div className="flex flex-wrap gap-2">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => handleChangeTone(t.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                        tone === t.value
                          ? "bg-violet-500/30 border-violet-400 text-white"
                          : "bg-white/5 border-violet-500/20 text-violet-300 hover:bg-white/10"
                      }`}
                    >
                      {t.emoji} {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishCreatorApp;
