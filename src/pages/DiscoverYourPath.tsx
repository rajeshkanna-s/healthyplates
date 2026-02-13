import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download, Compass } from 'lucide-react';
import jsPDF from 'jspdf';

interface StepData {
  question: string;
  hint?: string;
  multiSelect?: boolean;
  field: string;
  options: { value: string; label: string }[];
}

const steps: StepData[] = [
  {
    question: "First, tell us about yourself",
    field: "ageGroup",
    options: [
      { value: "18-25", label: "📱 18-25 years - Young & Exploring" },
      { value: "26-35", label: "💼 26-35 years - Building Career" },
      { value: "36-45", label: "🏠 36-45 years - Established Life" },
      { value: "46-55", label: "🎯 46-55 years - Peak Years" },
      { value: "56+", label: "🌟 56+ years - Experienced & Wise" },
    ],
  },
  {
    question: "What's your current life situation?",
    field: "situation",
    options: [
      { value: "student", label: "🎓 Student - Still studying" },
      { value: "employed", label: "💼 Employed - Working full-time" },
      { value: "selfEmployed", label: "🚀 Self-employed/Business owner" },
      { value: "unemployed", label: "🔍 Looking for opportunities" },
      { value: "homemaker", label: "🏡 Homemaker/Caregiver" },
      { value: "retired", label: "🌴 Retired" },
    ],
  },
  {
    question: "What activities make you feel most alive?",
    hint: "Select all that apply (choose 3-5 for best results)",
    multiSelect: true,
    field: "interests",
    options: [
      { value: "helping", label: "❤️ Helping people & making a difference" },
      { value: "teaching", label: "👨‍🏫 Teaching & explaining things" },
      { value: "creating", label: "🎨 Creating & expressing artistically" },
      { value: "learning", label: "📚 Learning new things constantly" },
      { value: "solving", label: "🧩 Solving complex problems" },
      { value: "building", label: "🔨 Building & making things" },
      { value: "leading", label: "👥 Leading & organizing people" },
      { value: "physical", label: "💪 Physical activities & sports" },
      { value: "analyzing", label: "📊 Analyzing data & patterns" },
      { value: "writing", label: "✍️ Writing & storytelling" },
      { value: "speaking", label: "🎤 Public speaking & performing" },
      { value: "cooking", label: "🍳 Cooking & experimenting with food" },
      { value: "gardening", label: "🌱 Gardening & growing things" },
      { value: "music", label: "🎵 Playing music or singing" },
      { value: "photography", label: "📸 Taking photos & capturing moments" },
      { value: "traveling", label: "✈️ Traveling & exploring new places" },
      { value: "reading", label: "📖 Reading books & stories" },
      { value: "designing", label: "💎 Designing beautiful things" },
      { value: "coding", label: "💻 Coding & programming" },
      { value: "researching", label: "🔬 Researching & discovering facts" },
      { value: "organizing", label: "📋 Organizing & planning events" },
      { value: "selling", label: "💼 Selling & convincing people" },
      { value: "counseling", label: "🤝 Listening & counseling others" },
      { value: "networking", label: "🌐 Meeting new people & networking" },
      { value: "meditating", label: "🧘 Meditation & spiritual practices" },
      { value: "volunteering", label: "🙏 Volunteering & social service" },
      { value: "investing", label: "📈 Investing & managing money" },
      { value: "dancing", label: "💃 Dancing & movement" },
      { value: "crafting", label: "🧶 Crafts & handmade work" },
      { value: "mentoring", label: "👔 Mentoring & guiding others" },
      { value: "competing", label: "🏆 Competing & winning" },
    ],
  },
  {
    question: "What do people often compliment you on?",
    hint: "Select all that apply (choose 3-5 for best results)",
    multiSelect: true,
    field: "strengths",
    options: [
      { value: "communication", label: "🗣️ Good at explaining & talking clearly" },
      { value: "creativity", label: "💡 Creative & imaginative ideas" },
      { value: "technical", label: "⚙️ Understanding technical things easily" },
      { value: "empathy", label: "🤗 Understanding others' feelings" },
      { value: "organization", label: "📋 Very organized & detail-oriented" },
      { value: "persistence", label: "🔥 Never giving up on goals" },
      { value: "quick", label: "⚡ Quick learner & adapt fast" },
      { value: "practical", label: "🛠️ Good with hands & practical skills" },
      { value: "logical", label: "🧠 Logical thinking & problem-solving" },
      { value: "artistic", label: "🎨 Artistic talent & aesthetic sense" },
      { value: "patient", label: "🕐 Very patient with people & tasks" },
      { value: "energetic", label: "⚡ High energy & enthusiasm" },
      { value: "calm", label: "😌 Staying calm under pressure" },
      { value: "persuasive", label: "💬 Persuading & influencing others" },
      { value: "reliable", label: "✅ Always reliable & trustworthy" },
      { value: "innovative", label: "🚀 Coming up with new ideas" },
      { value: "disciplined", label: "📅 Self-disciplined & consistent" },
      { value: "friendly", label: "😊 Friendly & easy to talk to" },
      { value: "confident", label: "💪 Confident in my abilities" },
      { value: "strategic", label: "♟️ Strategic & planning ahead" },
      { value: "focused", label: "🎯 Extremely focused when working" },
      { value: "observant", label: "👁️ Noticing small details others miss" },
      { value: "brave", label: "🦁 Taking risks & being courageous" },
      { value: "caring", label: "💝 Caring & nurturing nature" },
      { value: "honest", label: "💎 Always honest & transparent" },
      { value: "independent", label: "🦅 Working independently well" },
      { value: "collaborative", label: "🤝 Great team player" },
      { value: "numbers", label: "🔢 Good with numbers & calculations" },
    ],
  },
  {
    question: "How much time can you dedicate to growth?",
    field: "timeCapacity",
    options: [
      { value: "minimal", label: "⏱️ 15-30 min daily - Very busy" },
      { value: "moderate", label: "⏰ 1-2 hours daily - Regular schedule" },
      { value: "significant", label: "🕐 3-4 hours daily - Good availability" },
      { value: "full", label: "⏳ 5+ hours daily - Lots of free time" },
    ],
  },
  {
    question: "Can you invest money in your growth?",
    field: "financial",
    options: [
      { value: "none", label: "₹0 - No budget, need free options only" },
      { value: "minimal", label: "₹500-1,000/month - Very tight budget" },
      { value: "small", label: "₹1,000-3,000/month - Small budget" },
      { value: "moderate", label: "₹3,000-5,000/month - Moderate budget" },
      { value: "decent", label: "₹5,000-10,000/month - Decent budget" },
      { value: "good", label: "₹10,000-20,000/month - Good budget" },
      { value: "comfortable", label: "₹20,000-50,000/month - Comfortable" },
      { value: "high", label: "₹50,000+/month - High budget for growth" },
    ],
  },
  {
    question: "What drives you most?",
    hint: "Select your top 2-3 motivations",
    multiSelect: true,
    field: "motivation",
    options: [
      { value: "money", label: "💰 Financial freedom & wealth" },
      { value: "security", label: "🏦 Financial security & stability" },
      { value: "impact", label: "🌍 Making a positive impact" },
      { value: "mastery", label: "🎯 Becoming excellent at something" },
      { value: "freedom", label: "🗽 Independence & flexibility" },
      { value: "recognition", label: "🏆 Recognition & fame" },
      { value: "balance", label: "⚖️ Peace & work-life balance" },
      { value: "family", label: "👨‍👩‍👧 Taking care of family" },
      { value: "creativity", label: "🎨 Expressing my creativity" },
      { value: "growth", label: "📈 Personal growth & development" },
      { value: "adventure", label: "🌄 Adventure & new experiences" },
      { value: "knowledge", label: "📚 Gaining knowledge & wisdom" },
      { value: "helping", label: "❤️ Helping others succeed" },
      { value: "legacy", label: "📜 Leaving a lasting legacy" },
      { value: "health", label: "💪 Optimal health & fitness" },
      { value: "relationships", label: "💕 Strong relationships & love" },
      { value: "achievement", label: "🎖️ Achieving big goals" },
      { value: "fun", label: "🎉 Having fun & enjoying life" },
      { value: "simplicity", label: "🍃 Simple & minimalist lifestyle" },
    ],
  },
  {
    question: "What holds you back currently?",
    hint: "Select all that apply (be honest for best results)",
    multiSelect: true,
    field: "challenges",
    options: [
      { value: "confidence", label: "😰 Lack of confidence & self-doubt" },
      { value: "clarity", label: "🤔 Don't know what to do" },
      { value: "skills", label: "📚 Missing skills or knowledge" },
      { value: "money", label: "💸 Financial constraints" },
      { value: "time", label: "⏰ No time due to busy schedule" },
      { value: "support", label: "👥 No support system or mentors" },
      { value: "focus", label: "📱 Too many distractions" },
      { value: "fear", label: "😨 Fear of failure" },
      { value: "procrastination", label: "🛋️ Procrastination & laziness" },
      { value: "health", label: "🤒 Health issues or low energy" },
      { value: "family", label: "👨‍👩‍👧 Family responsibilities" },
      { value: "motivation", label: "😴 Low motivation & drive" },
      { value: "perfectionism", label: "✨ Perfectionism stopping me" },
      { value: "anxiety", label: "😟 Anxiety & stress" },
      { value: "comparison", label: "📊 Comparing myself to others" },
      { value: "consistency", label: "🔄 Can't stay consistent" },
      { value: "comfort", label: "🛌 Too comfortable in current situation" },
      { value: "overthinking", label: "🤯 Overthinking everything" },
    ],
  },
];

interface PathDetail {
  title: string;
  subtitle: string;
  why: string[];
  steps: string[];
  timeline: string;
  resources: string;
}

interface Recommendation {
  primary: PathDetail;
  alternatives: PathDetail[];
}

const getPathDetails = (path: string, financial: string): PathDetail => {
  const paths: Record<string, PathDetail> = {
    tech: {
      title: "💻 Tech & Programming",
      subtitle: "Build a career in technology",
      why: ["High demand for tech skills worldwide", "Excellent earning potential (₹5L-50L+ per year)", "Can work remotely from anywhere", "Constant learning keeps it interesting"],
      steps: ["Start with free courses (freeCodeCamp, Codecademy)", "Choose one language (Python for beginners)", "Build 3-5 small projects", "Create a GitHub portfolio", "Apply for junior positions or freelance gigs"],
      timeline: "6-12 months to job-ready",
      resources: financial === "none" ? "Free resources: freeCodeCamp, YouTube tutorials" : financial === "minimal" ? "Low-cost: Udemy courses (₹500-2000)" : "Premium: Full Stack bootcamps (₹50,000-2L)",
    },
    business: {
      title: "🚀 Start Your Business",
      subtitle: "Become an entrepreneur",
      why: ["Be your own boss", "Unlimited income potential", "Create something meaningful", "Your leadership skills will shine"],
      steps: ["Identify a problem you can solve", "Research your market & competitors", "Start small with minimum investment", "Build an online presence", "Get your first 10 customers"],
      timeline: "3-6 months to launch",
      resources: financial === "none" ? "Start service business (₹0 investment)" : "Medium startup: ₹50,000-2L",
    },
    creative: {
      title: "🎨 Creative Career",
      subtitle: "Turn your creativity into income",
      why: ["Express yourself daily", "Build a portfolio you're proud of", "Work on diverse projects", "Freelance flexibility (₹500-5000/hour)"],
      steps: ["Choose your medium (design, writing, art, video)", "Learn tools (Canva, Adobe, Figma)", "Create 10 portfolio pieces", "Join platforms (Upwork, Fiverr, Behance)", "Land your first paid projects"],
      timeline: "3-6 months to first income",
      resources: financial === "none" ? "Free tools: Canva, GIMP, YouTube tutorials" : "Good: Adobe CC (₹1600/month)",
    },
    health: {
      title: "💪 Health & Wellness",
      subtitle: "Transform your physical & mental well-being",
      why: ["Improve energy and confidence", "Set foundation for everything else", "Physical activities align with interests", "Can become a coach/trainer (₹20k-1L/month)"],
      steps: ["Start with 20-min daily exercise", "Fix sleep schedule (7-8 hours)", "Learn nutrition basics", "Track progress with photos/measurements", "Consider fitness certification"],
      timeline: "3 months to see results",
      resources: financial === "none" ? "Free: Bodyweight exercises, YouTube workouts" : "Good: Gym membership (₹2000-5000/month)",
    },
    education: {
      title: "📚 Education & Teaching",
      subtitle: "Share knowledge and help others learn",
      why: ["Make a lasting impact on lives", "Your love for learning fits perfectly", "Flexible opportunities (online/offline)", "Earn ₹500-3000/hour teaching"],
      steps: ["Choose subject you know well", "Create lesson plans or course outline", "Start tutoring (online or local)", "Build teaching portfolio", "Scale with online courses or coaching"],
      timeline: "1-3 months to start",
      resources: financial === "none" ? "Free: Teach on YouTube, local tutoring" : "Course platform (₹3000-5000/month)",
    },
    social: {
      title: "❤️ Social Impact Work",
      subtitle: "Help people and create change",
      why: ["Aligns with your desire to help", "Deeply fulfilling work", "Build strong community", "Your empathy is your superpower"],
      steps: ["Volunteer with local NGOs", "Identify specific cause you care about", "Learn fundraising or community organizing", "Build network in nonprofit sector", "Pursue certifications"],
      timeline: "6-12 months",
      resources: financial === "none" ? "Free: Start with volunteering" : "Certificate programs (₹20000-50000)",
    },
    freelance: {
      title: "🌟 Freelancing",
      subtitle: "Work independently on your terms",
      why: ["Total freedom and flexibility", "Choose your projects", "Earn ₹500-5000/hour based on skills", "Your practical skills are valuable"],
      steps: ["List all your marketable skills", "Create profiles on Upwork, Fiverr", "Set competitive starter rates", "Deliver excellent work for reviews", "Raise rates as you gain experience"],
      timeline: "1-2 months to first client",
      resources: financial === "none" ? "Free: Use skills you have, free platforms" : "Portfolio website (₹5000-10000)",
    },
    skill: {
      title: "🎯 Skill Mastery",
      subtitle: "Become excellent at a valuable skill",
      why: ["Quick learning ability is perfect for this", "Mastery opens many doors", "Can pivot to multiple careers", "Build confidence and earning potential"],
      steps: ["Pick ONE skill with market demand", "Study 1-2 hours daily consistently", "Practice with real projects", "Get feedback from experts", "Teach others to solidify knowledge"],
      timeline: "6-12 months to proficiency",
      resources: financial === "none" ? "Free: YouTube, free courses, library books" : "Premium courses (₹10000-30000)",
    },
  };
  return paths[path] || paths.skill;
};

const calculateBestPath = (userData: Record<string, string | string[]>): Recommendation => {
  const scores: Record<string, number> = { tech: 0, business: 0, creative: 0, health: 0, education: 0, social: 0, freelance: 0, skill: 0 };

  const age = userData.ageGroup as string;
  if (age === "18-25") { scores.tech += 2; scores.education += 2; scores.skill += 1; }
  else if (age === "26-35") { scores.business += 2; scores.freelance += 2; scores.tech += 1; }
  else if (age === "36-45") { scores.business += 3; scores.social += 1; }
  else { scores.health += 2; scores.social += 2; scores.creative += 1; }

  const situation = userData.situation as string;
  if (situation === "student") { scores.education += 3; scores.skill += 2; }
  else if (situation === "unemployed") { scores.skill += 3; scores.freelance += 2; scores.tech += 2; }
  else if (situation === "employed") { scores.business += 2; scores.freelance += 1; }

  const interests = (userData.interests || []) as string[];
  interests.forEach(i => {
    if (i === "helping") { scores.social += 3; scores.health += 1; }
    if (i === "creating") { scores.creative += 3; scores.freelance += 1; }
    if (i === "learning") { scores.education += 2; scores.skill += 2; }
    if (i === "solving") { scores.tech += 3; scores.business += 1; }
    if (i === "building") { scores.tech += 2; scores.business += 2; }
    if (i === "leading") scores.business += 3;
    if (i === "physical") scores.health += 3;
    if (i === "analyzing") { scores.tech += 2; scores.business += 2; }
  });

  const strengths = (userData.strengths || []) as string[];
  strengths.forEach(s => {
    if (s === "communication") { scores.social += 2; scores.business += 2; }
    if (s === "creativity") scores.creative += 3;
    if (s === "technical") scores.tech += 3;
    if (s === "empathy") { scores.social += 3; scores.health += 1; }
    if (s === "organization") scores.business += 2;
    if (s === "persistence") scores.skill += 2;
    if (s === "practical") scores.freelance += 2;
  });

  const motivations = (userData.motivation || []) as string[];
  motivations.forEach(m => {
    if (["money", "security"].includes(m)) { scores.tech += 2; scores.business += 2; }
    if (["impact", "helping"].includes(m)) { scores.social += 3; scores.education += 1; }
    if (["mastery", "achievement"].includes(m)) { scores.skill += 3; scores.creative += 1; }
    if (["freedom"].includes(m)) { scores.freelance += 3; scores.creative += 1; }
    if (["creativity"].includes(m)) { scores.creative += 3; }
    if (m === "health") scores.health += 3;
    if (["knowledge", "growth"].includes(m)) { scores.education += 2; scores.skill += 2; }
  });

  let maxScore = 0;
  let bestPath = "skill";
  for (const path in scores) {
    if (scores[path] > maxScore) { maxScore = scores[path]; bestPath = path; }
  }

  const financial = (userData.financial as string) || "none";
  const primary = getPathDetails(bestPath, financial);
  const alternatives = Object.keys(scores)
    .filter(p => p !== bestPath)
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 3)
    .map(p => getPathDetails(p, financial));

  return { primary, alternatives };
};

const DiscoverYourPath: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<Record<string, string | string[]>>({});
  const [result, setResult] = useState<Recommendation | null>(null);
  const totalSteps = steps.length;

  const progressPercent = ((currentStep) / totalSteps) * 100;

  const handleSelect = (field: string, value: string, multiSelect?: boolean) => {
    setUserData(prev => {
      if (multiSelect) {
        const arr = (prev[field] as string[]) || [];
        return { ...prev, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
      }
      return { ...prev, [field]: value };
    });
  };

  const isSelected = (field: string, value: string, multiSelect?: boolean) => {
    if (multiSelect) return ((userData[field] as string[]) || []).includes(value);
    return userData[field] === value;
  };

  const canProceed = () => {
    const step = steps[currentStep];
    if (step.multiSelect) return ((userData[step.field] as string[]) || []).length > 0;
    return !!userData[step.field];
  };

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const rec = calculateBestPath(userData);
      setResult(rec);
      setCurrentStep(totalSteps);
    }
  };

  const goBack = () => {
    if (currentStep === totalSteps) { setResult(null); setCurrentStep(totalSteps - 1); }
    else setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    const burgundy: [number, number, number] = [91, 14, 20];
    const gold: [number, number, number] = [120, 100, 20];

    doc.setFillColor(91, 14, 20);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(241, 225, 148);
    doc.setFontSize(22);
    doc.text("My Personalized Growth Path", 105, 18, { align: "center" });
    doc.setFontSize(11);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 28, { align: "center" });

    let y = 50;
    doc.setTextColor(...burgundy);
    doc.setFontSize(16);
    doc.text(`Recommended: ${result.primary.title}`, 15, y);
    y += 8;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(11);
    doc.text(result.primary.subtitle, 15, y);
    y += 12;

    doc.setTextColor(...burgundy);
    doc.setFontSize(13);
    doc.text("Why This Path Is Perfect For You:", 15, y);
    y += 8;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    result.primary.why.forEach(w => {
      doc.text(`• ${w}`, 20, y);
      y += 6;
    });

    y += 6;
    doc.setTextColor(...burgundy);
    doc.setFontSize(13);
    doc.text("Your Action Plan:", 15, y);
    y += 8;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    result.primary.steps.forEach((s, i) => {
      doc.text(`${i + 1}. ${s}`, 20, y);
      y += 6;
    });

    y += 6;
    doc.setTextColor(...gold);
    doc.setFontSize(11);
    doc.text(`Timeline: ${result.primary.timeline}`, 15, y);
    y += 6;
    doc.text(`Resources: ${result.primary.resources}`, 15, y);

    y += 14;
    doc.setTextColor(...burgundy);
    doc.setFontSize(13);
    doc.text("Alternative Paths Worth Considering:", 15, y);
    y += 8;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    result.alternatives.forEach(alt => {
      doc.text(`• ${alt.title} - ${alt.subtitle}`, 20, y);
      y += 6;
    });

    y += 10;
    doc.setTextColor(...burgundy);
    doc.setFontSize(13);
    doc.text("Your Profile:", 15, y);
    y += 8;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text(`Age Group: ${userData.ageGroup}`, 20, y); y += 6;
    doc.text(`Situation: ${userData.situation}`, 20, y); y += 6;
    doc.text(`Interests: ${(userData.interests as string[] || []).join(', ')}`, 20, y, { maxWidth: 170 }); y += 10;
    doc.text(`Strengths: ${(userData.strengths as string[] || []).join(', ')}`, 20, y, { maxWidth: 170 }); y += 10;
    doc.text(`Motivations: ${(userData.motivation as string[] || []).join(', ')}`, 20, y, { maxWidth: 170 }); y += 10;
    doc.text(`Challenges: ${(userData.challenges as string[] || []).join(', ')}`, 20, y, { maxWidth: 170 });

    doc.save("my-growth-path.pdf");
  };

  const showResult = currentStep === totalSteps && result;

  return (
    <>
      <Helmet>
        <title>Discover Your Path | HealthyPlates</title>
        <meta name="description" content="Take a guided quiz to find the perfect growth path based on your interests, strengths, and motivations." />
      </Helmet>

      <div className="min-h-screen py-8 px-4" style={{ background: "linear-gradient(135deg, #5B0E14 0%, #3a0a0e 100%)" }}>
        <div className="max-w-2xl mx-auto">
          <Card className="rounded-2xl shadow-2xl border-0 overflow-hidden" style={{ background: "#F1E194" }}>
            <div className="p-6 sm:p-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <Compass className="w-8 h-8" style={{ color: "#5B0E14" }} />
                <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "#5B0E14" }}>Discover Your Path</h1>
              </div>
              <p className="text-sm mb-6" style={{ color: "#5B0E14aa" }}>Let's find the perfect goal for you based on who you are</p>

              {/* Progress */}
              <div className="mb-8">
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#5B0E1433" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${showResult ? 100 : progressPercent}%`, background: "linear-gradient(90deg, #5B0E14, #8B2020)" }} />
                </div>
                <p className="text-xs mt-1 text-right" style={{ color: "#5B0E14aa" }}>
                  {showResult ? "Complete!" : `Step ${currentStep + 1} of ${totalSteps}`}
                </p>
              </div>

              {/* Steps */}
              {!showResult && currentStep < totalSteps && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" key={currentStep}>
                  <h2 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: "#5B0E14" }}>
                    {steps[currentStep].question}
                  </h2>
                  {steps[currentStep].hint && (
                    <p className="text-xs italic mb-4" style={{ color: "#5B0E1488" }}>{steps[currentStep].hint}</p>
                  )}
                  <div className="grid gap-2 sm:gap-3 mb-6 max-h-[50vh] overflow-y-auto pr-1">
                    {steps[currentStep].options.map(opt => {
                      const sel = isSelected(steps[currentStep].field, opt.value, steps[currentStep].multiSelect);
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelect(steps[currentStep].field, opt.value, steps[currentStep].multiSelect)}
                          className="text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm sm:text-base font-medium"
                          style={{
                            borderColor: sel ? "#5B0E14" : "#5B0E1433",
                            background: sel ? "#5B0E14" : "rgba(255,255,255,0.6)",
                            color: sel ? "#F1E194" : "#5B0E14",
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Results */}
              {showResult && result && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="rounded-2xl p-6 mb-6" style={{ background: "#5B0E14", color: "#F1E194" }}>
                    <h2 className="text-2xl font-bold mb-1">{result.primary.title}</h2>
                    <p className="text-sm opacity-90 mb-4">{result.primary.subtitle}</p>
                    <div className="rounded-xl p-4" style={{ background: "rgba(241,225,148,0.15)" }}>
                      <h3 className="font-semibold mb-2">✨ Why This Path Is Perfect For You:</h3>
                      <ul className="list-disc ml-5 space-y-1 text-sm">
                        {result.primary.why.map((w, i) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl p-5 mb-4" style={{ background: "rgba(91,14,20,0.08)" }}>
                    <h3 className="font-semibold mb-3" style={{ color: "#5B0E14" }}>🗺️ Your Action Plan</h3>
                    <ol className="list-decimal ml-5 space-y-2 text-sm" style={{ color: "#333" }}>
                      {result.primary.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                    <p className="mt-4 font-semibold text-sm" style={{ color: "#5B0E14" }}>⏰ Timeline: {result.primary.timeline}</p>
                    <p className="text-sm" style={{ color: "#666" }}>💰 {result.primary.resources}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-3" style={{ color: "#5B0E14" }}>🔄 Alternative Paths Worth Considering:</h3>
                    {result.alternatives.map((alt, i) => (
                      <div key={i} className="rounded-xl p-4 mb-2 transition-all hover:translate-x-1" style={{ background: "rgba(91,14,20,0.05)" }}>
                        <strong className="text-sm" style={{ color: "#5B0E14" }}>{alt.title}</strong>
                        <p className="text-xs" style={{ color: "#666" }}>{alt.subtitle}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={downloadPDF}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #28a745, #20c997)" }}
                  >
                    <Download className="w-5 h-5" /> Download My Growth Plan (PDF)
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-6">
                {currentStep > 0 && (
                  <Button onClick={goBack} variant="outline" className="flex-1 border-2" style={{ borderColor: "#5B0E14", color: "#5B0E14" }}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                )}
                {!showResult && (
                  <Button onClick={goNext} disabled={!canProceed()} className="flex-1 text-white" style={{ background: "#5B0E14" }}>
                    {currentStep === totalSteps - 1 ? "See My Path" : "Next"} <ChevronRight className="w-4 h-4 ml-1" />
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

export default DiscoverYourPath;
