import { Globe, Link2, Linkedin, Coffee, LayoutGrid, Mail, ArrowLeft } from "lucide-react";

const socialLinks = [
  {
    label: "Portfolio",
    url: "https://rajeshkanna.in/",
    icon: Globe,
  },
  {
    label: "Linktree",
    url: "https://linktr.ee/rajeshkanna_s",
    icon: Link2,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/rajeshkanna-s/",
    icon: Linkedin,
  },
  {
    label: "Buy Me a Coffee",
    url: "https://www.buymeacoffee.com/rajeshkanna",
    icon: Coffee,
  },
  {
    label: "Bento",
    url: "https://bento.me/rajeshkanna",
    icon: LayoutGrid,
  },
];

const DeveloperBio = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a1628] relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,200,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#00e6a0]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#00bcd4]/8 rounded-full blur-[80px]" />

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center">
        {/* Photo card */}
        <div className="relative mb-6">
          <div className="w-56 h-64 sm:w-64 sm:h-72 rounded-2xl overflow-hidden border border-[#1e3a5f]/60 shadow-[0_0_40px_rgba(0,230,160,0.08)]">
            <img
              src="https://res.cloudinary.com/di4yfgmlz/image/upload/v1770372133/MYPIC/MYPIC_vhgoxn.png"
              alt="Rajeshkanna S - Software Engineer"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#00e676] border-2 border-[#0a1628] shadow-[0_0_10px_rgba(0,230,118,0.6)]" />
        </div>

        {/* Name & Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide mb-1">
          RAJESHKANNA S
        </h1>
        <p className="text-[#4dd9b4] text-sm sm:text-base font-medium mb-8">
          Software Engineer
        </p>

        {/* Connect text */}
        <p className="text-gray-400 text-xs mb-4 tracking-wider uppercase">
        Connect with me
        </p>

        {/* Social Links */}
        <div className="w-full space-y-3 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-full px-5 py-3.5 rounded-xl border border-[#1e3a5f]/50 bg-[#0f2035]/60 backdrop-blur-sm hover:border-[#00e6a0]/40 hover:bg-[#0f2035]/90 transition-all duration-300 group"
            >
              <link.icon className="w-5 h-5 text-[#4dd9b4] group-hover:text-[#00e6a0] transition-colors flex-shrink-0" />
              <span className="text-gray-200 text-sm sm:text-base font-medium group-hover:text-white transition-colors">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* Email */}
        <a
          href="mailto:rajeshkannaprogrammer@gmail.com"
          className="flex items-center gap-2 text-gray-400 hover:text-[#4dd9b4] transition-colors text-xs sm:text-sm"
        >
          <Mail className="w-4 h-4" />
          <span>rajeshkannaprogrammer@gmail.com</span>
        </a>
      </div>
    </div>
  );
};

export default DeveloperBio;
