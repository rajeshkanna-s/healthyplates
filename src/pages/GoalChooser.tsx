import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download, Target } from 'lucide-react';
import jsPDF from 'jspdf';

interface StepData {
  question: string;
  field: string;
  options: { value: string; label: string }[];
  dynamic?: boolean;
}

const specificGoals: Record<string, { value: string; label: string }[]> = {
  career: [
    { value: "Get a promotion", label: "🎯 Get a promotion" },
    { value: "Switch to a new career", label: "💼 Switch to a new career" },
    { value: "Start my own business", label: "🚀 Start my own business" },
    { value: "Develop leadership skills", label: "📈 Develop leadership skills" },
    { value: "Improve networking", label: "🤝 Improve networking" },
    { value: "Learn new professional skills", label: "💻 Learn new professional skills" },
  ],
  health: [
    { value: "Lose weight", label: "🏃 Lose weight" },
    { value: "Build muscle/strength", label: "💪 Build muscle/strength" },
    { value: "Improve mental health", label: "🧘 Improve mental health" },
    { value: "Run a marathon", label: "🏃‍♂️ Run a marathon" },
    { value: "Eat healthier", label: "🥗 Eat healthier" },
    { value: "Sleep better", label: "😴 Sleep better" },
    { value: "Quit bad habits", label: "🚭 Quit smoking/bad habits" },
  ],
  learning: [
    { value: "Learn a new language", label: "🗣️ Learn a new language" },
    { value: "Learn coding/programming", label: "💻 Learn coding/programming" },
    { value: "Get a degree/certification", label: "📚 Get a degree/certification" },
    { value: "Master a musical instrument", label: "🎸 Master a musical instrument" },
    { value: "Read more books", label: "📖 Read more books" },
    { value: "Complete an online course", label: "🎓 Complete an online course" },
  ],
  financial: [
    { value: "Save money", label: "💰 Save money" },
    { value: "Invest in stocks/assets", label: "📊 Invest in stocks/assets" },
    { value: "Buy a house", label: "🏠 Buy a house" },
    { value: "Pay off debt", label: "💳 Pay off debt" },
    { value: "Increase income", label: "💵 Increase income" },
    { value: "Build emergency fund", label: "🎯 Build emergency fund" },
  ],
  relationships: [
    { value: "Find a life partner", label: "💑 Find a life partner" },
    { value: "Spend more time with family", label: "👨‍👩‍👧 Spend more time with family" },
    { value: "Make new friends", label: "🤝 Make new friends" },
    { value: "Improve current relationship", label: "💕 Improve current relationship" },
    { value: "Start a family", label: "👶 Start a family" },
  ],
  personal: [
    { value: "Practice mindfulness", label: "🧘 Practice mindfulness" },
    { value: "Build confidence", label: "😊 Build confidence" },
    { value: "Improve time management", label: "⏰ Improve time management" },
    { value: "Find life purpose", label: "🎯 Find life purpose" },
    { value: "Overcome anxiety/stress", label: "🧠 Overcome anxiety/stress" },
    { value: "Start journaling", label: "📝 Start journaling" },
  ],
  creative: [
    { value: "Write a book", label: "✍️ Write a book" },
    { value: "Learn to paint/draw", label: "🎨 Learn to paint/draw" },
    { value: "Improve photography", label: "📸 Improve photography" },
    { value: "Create music", label: "🎵 Create music" },
    { value: "Make videos/films", label: "🎬 Make videos/films" },
    { value: "Learn a craft", label: "🧶 Learn a craft" },
  ],
  lifestyle: [
    { value: "Travel more", label: "🌍 Travel more" },
    { value: "Organize/declutter home", label: "🏡 Organize/declutter home" },
    { value: "Achieve work-life balance", label: "⚖️ Achieve work-life balance" },
    { value: "Live more sustainably", label: "🌱 Live more sustainably" },
    { value: "Create daily routines", label: "🧘‍♀️ Create daily routines" },
    { value: "Simplify life", label: "🎯 Simplify life" },
  ],
};

const baseSteps: StepData[] = [
  {
    question: "I am...",
    field: "gender",
    options: [
      { value: "male", label: "👨 Male" },
      { value: "female", label: "👩 Female" },
      { value: "other", label: "🌟 Prefer not to say" },
    ],
  },
  {
    question: "My age group is...",
    field: "ageGroup",
    options: [
      { value: "18-25", label: "18-25 years" },
      { value: "26-35", label: "26-35 years" },
      { value: "36-45", label: "36-45 years" },
      { value: "46-55", label: "46-55 years" },
      { value: "56+", label: "56+ years" },
    ],
  },
  {
    question: "My goal is about...",
    field: "category",
    options: [
      { value: "career", label: "💼 Career & Professional Growth" },
      { value: "health", label: "💪 Health & Fitness" },
      { value: "learning", label: "📚 Learning & Skills" },
      { value: "financial", label: "💰 Financial Goals" },
      { value: "relationships", label: "❤️ Relationships & Family" },
      { value: "personal", label: "🌱 Personal Development" },
      { value: "creative", label: "🎨 Creative & Hobbies" },
      { value: "lifestyle", label: "🏡 Lifestyle & Balance" },
    ],
  },
  {
    question: "Specifically, I want to...",
    field: "specificGoal",
    dynamic: true,
    options: [],
  },
  {
    question: "I want to achieve this in...",
    field: "timeline",
    options: [
      { value: "1month", label: "1 Month" },
      { value: "3months", label: "3 Months" },
      { value: "6months", label: "6 Months" },
      { value: "1year", label: "1 Year" },
      { value: "2years", label: "2 Years" },
      { value: "5years", label: "5+ Years" },
    ],
  },
  {
    question: "Currently, I am...",
    field: "currentStatus",
    options: [
      { value: "starting", label: "🚀 Just getting started" },
      { value: "beginner", label: "🌱 Beginner level" },
      { value: "intermediate", label: "📈 Making some progress" },
      { value: "advanced", label: "💪 Already experienced" },
    ],
  },
  {
    question: "My motivation level is...",
    field: "motivation",
    options: [
      { value: "veryHigh", label: "🔥 Very High - I'm super excited!" },
      { value: "high", label: "😊 High - I'm ready to commit" },
      { value: "medium", label: "🤔 Medium - I need some push" },
      { value: "low", label: "😅 Low - I struggle with motivation" },
    ],
  },
  {
    question: "Time I can dedicate daily...",
    field: "timeCommitment",
    options: [
      { value: "15min", label: "⏱️ 15-30 minutes" },
      { value: "1hour", label: "⏰ 1 hour" },
      { value: "2hours", label: "🕐 2 hours" },
      { value: "3hours", label: "🕓 3+ hours" },
      { value: "flexible", label: "🔄 Flexible schedule" },
    ],
  },
  {
    question: "My support system is...",
    field: "support",
    options: [
      { value: "strong", label: "👨‍👩‍👧‍👦 Strong - Family/friends support me" },
      { value: "some", label: "🤝 Some - I have a few supporters" },
      { value: "minimal", label: "👤 Minimal - Mostly doing this alone" },
      { value: "none", label: "🏃 None - I'm completely on my own" },
    ],
  },
  {
    question: "My biggest challenge will be...",
    field: "challenge",
    options: [
      { value: "time", label: "⏰ Finding enough time" },
      { value: "money", label: "💵 Financial constraints" },
      { value: "knowledge", label: "📚 Lack of knowledge/skills" },
      { value: "consistency", label: "🔄 Staying consistent" },
      { value: "fear", label: "😰 Fear of failure" },
      { value: "distraction", label: "📱 Too many distractions" },
    ],
  },
];

const displayMaps: Record<string, Record<string, string>> = {
  gender: { male: "Male", female: "Female", other: "Prefer not to say" },
  timeline: { "1month": "1 Month", "3months": "3 Months", "6months": "6 Months", "1year": "1 Year", "2years": "2 Years", "5years": "5+ Years" },
  currentStatus: { starting: "Just getting started", beginner: "Beginner level", intermediate: "Making some progress", advanced: "Already experienced" },
  motivation: { veryHigh: "Very High - Super excited!", high: "High - Ready to commit", medium: "Medium - Need some push", low: "Low - Struggle with motivation" },
  timeCommitment: { "15min": "15-30 minutes daily", "1hour": "1 hour daily", "2hours": "2 hours daily", "3hours": "3+ hours daily", flexible: "Flexible schedule" },
  support: { strong: "Strong - Family/friends support", some: "Some supporters", minimal: "Minimal - Mostly alone", none: "None - Completely on my own" },
  challenge: { time: "Finding enough time", money: "Financial constraints", knowledge: "Lack of knowledge/skills", consistency: "Staying consistent", fear: "Fear of failure", distraction: "Too many distractions" },
};

const GoalChooser: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [goalData, setGoalData] = useState<Record<string, string>>({});
  const totalSteps = baseSteps.length;

  const progressPercent = ((currentStep) / totalSteps) * 100;

  const getCurrentOptions = (): { value: string; label: string }[] => {
    const step = baseSteps[currentStep];
    if (step.dynamic && step.field === "specificGoal") {
      return specificGoals[goalData.category] || [];
    }
    return step.options;
  };

  const handleSelect = (field: string, value: string) => {
    setGoalData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => !!goalData[baseSteps[currentStep]?.field];

  const goNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(prev => prev + 1);
    else setCurrentStep(totalSteps);
  };

  const goBack = () => {
    if (currentStep === totalSteps) setCurrentStep(totalSteps - 1);
    else setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const showSummary = currentStep === totalSteps;

  const summaryItems = [
    { label: "Profile", value: `${displayMaps.gender[goalData.gender] || goalData.gender}, ${goalData.ageGroup}` },
    { label: "My Goal", value: goalData.specificGoal },
    { label: "Timeline", value: displayMaps.timeline[goalData.timeline] },
    { label: "Current Level", value: displayMaps.currentStatus[goalData.currentStatus] },
    { label: "Motivation Level", value: displayMaps.motivation[goalData.motivation] },
    { label: "Time I Can Dedicate", value: displayMaps.timeCommitment[goalData.timeCommitment] },
    { label: "Support System", value: displayMaps.support[goalData.support] },
    { label: "Biggest Challenge", value: displayMaps.challenge[goalData.challenge] },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    const teal: [number, number, number] = [120, 154, 153];
    const peach: [number, number, number] = [255, 210, 194];

    doc.setFillColor(120, 154, 153);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 210, 194);
    doc.setFontSize(22);
    doc.text("My Personalized Goal Plan", 105, 18, { align: "center" });
    doc.setFontSize(11);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 28, { align: "center" });

    let y = 55;
    summaryItems.forEach(item => {
      doc.setTextColor(...teal);
      doc.setFontSize(12);
      doc.text(item.label, 15, y);
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(11);
      doc.text(item.value || "-", 15, y + 7);
      y += 18;
    });

    y += 5;
    doc.setDrawColor(...teal);
    doc.line(15, y, 195, y);
    y += 10;

    doc.setTextColor(...teal);
    doc.setFontSize(13);
    doc.text("Recommended Next Steps:", 15, y);
    y += 8;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    const nextSteps = [
      "Break your goal into smaller milestones",
      "Create a weekly action plan",
      "Find an accountability partner",
      "Track your progress regularly",
      "Celebrate small wins along the way",
    ];
    nextSteps.forEach(s => {
      doc.text(`✓ ${s}`, 20, y);
      y += 7;
    });

    y += 8;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text("Remember: You've got this! Start today, stay consistent, and adjust as needed.", 15, y, { maxWidth: 180 });

    doc.save("my-goal-plan.pdf");
  };

  return (
    <>
      <Helmet>
        <title>Choose Your Goal | HealthyPlates</title>
        <meta name="description" content="Define your goal clearly with a step-by-step guided questionnaire and download your personalized goal plan." />
      </Helmet>

      <div className="min-h-screen py-8 px-4" style={{ background: "linear-gradient(135deg, #789A99 0%, #5a7a79 100%)" }}>
        <div className="max-w-2xl mx-auto">
          <Card className="rounded-2xl shadow-2xl border-0 overflow-hidden" style={{ background: "#FFD2C2" }}>
            <div className="p-6 sm:p-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-8 h-8" style={{ color: "#789A99" }} />
                <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "#789A99" }}>Choose Your Goal</h1>
              </div>
              <p className="text-sm mb-6" style={{ color: "#789A99aa" }}>Answer a few questions to define your goal clearly</p>

              {/* Progress */}
              <div className="mb-8">
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#789A9933" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${showSummary ? 100 : progressPercent}%`, background: "linear-gradient(90deg, #789A99, #5a7a79)" }} />
                </div>
                <p className="text-xs mt-1 text-right" style={{ color: "#789A99aa" }}>
                  {showSummary ? "Complete!" : `Step ${currentStep + 1} of ${totalSteps}`}
                </p>
              </div>

              {/* Steps */}
              {!showSummary && currentStep < totalSteps && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" key={currentStep}>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: "#789A99" }}>
                    {baseSteps[currentStep].question}
                  </h2>
                  <div className="grid gap-2 sm:gap-3 mb-6 max-h-[50vh] overflow-y-auto pr-1">
                    {getCurrentOptions().map(opt => {
                      const sel = goalData[baseSteps[currentStep].field] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelect(baseSteps[currentStep].field, opt.value)}
                          className="text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm sm:text-base font-medium"
                          style={{
                            borderColor: sel ? "#789A99" : "#789A9933",
                            background: sel ? "#789A99" : "rgba(255,255,255,0.5)",
                            color: sel ? "#FFD2C2" : "#789A99",
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Summary */}
              {showSummary && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h2 className="text-xl font-bold mb-4" style={{ color: "#789A99" }}>🎉 Your Personalized Goal Plan</h2>
                  <div className="rounded-xl p-5 mb-6" style={{ background: "rgba(120,154,153,0.08)" }}>
                    {summaryItems.map((item, i) => (
                      <div key={i} className={`py-3 ${i < summaryItems.length - 1 ? 'border-b' : ''}`} style={{ borderColor: "#789A9933" }}>
                        <p className="text-sm font-semibold" style={{ color: "#789A99" }}>{item.label}</p>
                        <p className="text-sm" style={{ color: "#333" }}>{item.value || "-"}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={downloadPDF}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #28a745, #20c997)" }}
                  >
                    <Download className="w-5 h-5" /> Download My Goal Plan (PDF)
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-6">
                {currentStep > 0 && (
                  <Button onClick={goBack} variant="outline" className="flex-1 border-2" style={{ borderColor: "#789A99", color: "#789A99" }}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                )}
                {!showSummary && (
                  <Button onClick={goNext} disabled={!canProceed()} className="flex-1 text-white" style={{ background: "#789A99" }}>
                    {currentStep === totalSteps - 1 ? "See My Plan" : "Next"} <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GoalChooser;
