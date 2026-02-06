import { useEffect, useState } from "react";

interface HeartItem {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  type: "heart" | "pink" | "sparkle";
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  useEffect(() => {
    const newHearts: HeartItem[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 20,
      delay: Math.random() * 10,
      duration: 6 + Math.random() * 10,
      type: i % 3 === 0 ? "pink" : i % 5 === 0 ? "sparkle" : "heart",
    }));
    setHearts(newHearts);
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg) scale(0.5); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-10vh) rotate(360deg) scale(1); opacity: 0; }
        }
        @keyframes floatDown {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.5; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(244,63,94,0.6)); }
          50% { filter: drop-shadow(0 0 12px rgba(244,63,94,0.9)); }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute"
            style={{
              left: `${h.left}%`,
              bottom: h.id % 2 === 0 ? "-5%" : undefined,
              top: h.id % 2 === 1 ? "-5%" : undefined,
              fontSize: `${h.size}px`,
              animation: `${h.id % 2 === 0 ? "floatUp" : "floatDown"} ${h.duration}s linear ${h.delay}s infinite`,
              opacity: 0,
            }}
          >
            {h.type === "heart" ? "❤️" : h.type === "pink" ? "💕" : "💖"}
          </span>
        ))}
      </div>
    </>
  );
};

export default FloatingHearts;
