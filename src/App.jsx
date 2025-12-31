import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const MEMORIES = [
  { id: 1, text: "Loss of my Father", icon: "🕊️", cat: 'heart' },
  { id: 2, text: "Graduated in CS", icon: "🎓", cat: 'career' },
  { id: 3, text: "Got Married", icon: "💍", cat: 'heart' },
  { id: 4, text: "Built myJournal", icon: "🚀", cat: 'career' },
  { id: 5, text: "Late Night Coding", icon: "💻", cat: 'career' },
  { id: 6, text: "Mental Health", icon: "🧠", cat: 'growth' },
  { id: 7, text: "Resilience", icon: "🌊", cat: 'growth' },
  { id: 8, text: "Family Time", icon: "🏠", cat: 'heart' },
  { id: 9, text: "Gym Consistency", icon: "💪", cat: 'growth' },
  { id: 10, text: "New Friendships", icon: "🤝", cat: 'heart' },
  { id: 11, text: "Financial Goals", icon: "💰", cat: 'career' },
  { id: 12, text: "Learning Daily", icon: "📚", cat: 'career' },
  { id: 13, text: "Self-Discipline", icon: "⏳", cat: 'growth' },
  { id: 14, text: "Kindness", icon: "✨", cat: 'heart' },
  { id: 15, text: "Adventure", icon: "🌍", cat: 'growth' },
  { id: 16, text: "Creative Outlet", icon: "🎨", cat: 'career' },
  { id: 17, text: "Deep Reflection", icon: "🧘", cat: 'growth' },
  { id: 18, text: "Patience", icon: "🍁", cat: 'growth' },
  { id: 19, text: "Small Wins", icon: "🎯", cat: 'career' },
  { id: 20, text: "Consistency", icon: "🔄", cat: 'growth' },
];

export default function NewYearOdyssey() {
  const [orbs, setOrbs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [hasFinishedSelecting, setHasFinishedSelecting] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });
  const [isMidnight, setIsMidnight] = useState(false);
  const fireworksInterval = useRef(null);

  // 1. APPEAR IMMEDIATELY
  useEffect(() => {
    setOrbs(MEMORIES.map(m => ({
      ...m,
      top: Math.random() * 60 + 20,
      left: Math.random() * 80 + 10,
      driftX: [0, (Math.random() - 0.5) * 40, 0],
      driftY: [0, (Math.random() - 0.5) * 40, 0],
      duration: Math.random() * 10 + 15,
    })));
  }, []);

  // 2. REAL COUNTDOWN
  useEffect(() => {
    const targetTime = new Date('January 1, 2026 00:00:00').getTime();
    const timer = setInterval(() => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setIsMidnight(true);
        clearInterval(timer);
        triggerMidnightCelebration();
      } else {
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft({ h: String(h).padStart(2, '0'), m: String(m).padStart(2, '0'), s: String(s).padStart(2, '0') });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerMidnightCelebration = () => {
    const end = Date.now() + 15000;
    fireworksInterval.current = setInterval(() => {
      if (Date.now() > end) return clearInterval(fireworksInterval.current);
      confetti({ particleCount: 50, angle: 60, spread: 70, origin: { x: 0, y: 0.8 } });
      confetti({ particleCount: 50, angle: 120, spread: 70, origin: { x: 1, y: 0.8 } });
    }, 400);
  };

  const handleSelect = (orb) => {
    if (selected.length < 5 && !selected.find(s => s.id === orb.id)) {
      const newSelected = [...selected, orb];
      setSelected(newSelected);
      
      // If this was the 5th selection, pop all balloons after a tiny delay
      if (newSelected.length === 5) {
        setTimeout(() => {
          setHasFinishedSelecting(true);
          // Special pop confetti
          confetti({ particleCount: 100, spread: 160, origin: { y: 0.6 } });
        }, 600);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white font-sans">
      
      {/* Cinematic Backgrounds */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2000" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${isMidnight ? 'opacity-0' : 'opacity-40'}`}
          alt="Space"
        />
        <img 
          src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2000" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${isMidnight ? 'opacity-100' : 'opacity-0'}`}
          alt="Fireworks"
        />
      </div>

      {/* Main HUD */}
      <div className="z-[100] text-center pointer-events-none absolute top-12 w-full">
        <motion.div animate={isMidnight ? { y: -60, scale: 0.7 } : {}}>
          <h2 className="text-[10px] tracking-[0.5em] uppercase font-bold text-indigo-400 mb-2">
            {!hasFinishedSelecting ? `Select 5 Memories of your 2025 (${selected.length}/5)` : "Chapters Archived"}
          </h2>
          <div className="text-7xl md:text-9xl font-black tabular-nums tracking-tighter drop-shadow-2xl">
            {isMidnight ? "2026" : `${timeLeft.h}:${timeLeft.m}:${timeLeft.s}`}
          </div>
        </motion.div>
      </div>

      {/* MEMORY BALLOONS (Active until 5 are picked) */}
      <AnimatePresence>
        {!hasFinishedSelecting && !isMidnight && orbs.map((orb) => {
          const isSelected = selected.find(s => s.id === orb.id);
          return (
            <motion.button
              key={orb.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: isSelected ? 1.2 : 1, 
                x: orb.driftX, 
                y: orb.driftY 
              }}
              exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }} // The "Pop" effect
              transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => handleSelect(orb)}
              style={{ position: 'absolute', top: `${orb.top}%`, left: `${orb.left}%` }}
              className={`z-50 pointer-events-auto rounded-full flex flex-col items-center justify-center transition-all duration-500 backdrop-blur-md border ${
                isSelected 
                ? 'w-32 h-32 bg-indigo-600 border-white shadow-[0_0_40px_rgba(255,255,255,0.6)]' 
                : 'w-24 h-24 bg-white/10 border-white/20 hover:border-white/50 hover:bg-white/20'
              }`}
            >
              <span className="text-3xl mb-1">{orb.icon}</span>
              <span className="text-[9px] font-bold uppercase text-center px-2">{orb.text}</span>
            </motion.button>
          );
        })}
      </AnimatePresence>

      {/* ADVICE POP-UP (Only after popping 5) */}
      <AnimatePresence>
        {hasFinishedSelecting && !isMidnight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="z-[110] fixed bottom-16 max-w-xl mx-4 p-10 bg-black/60 backdrop-blur-3xl border border-indigo-500/50 rounded-[3rem] text-center shadow-2xl"
          >
            <div className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em] mb-4">Your 2026 Reflection</div>
            <p className="text-xl md:text-2xl font-light italic leading-relaxed text-indigo-50">
              "You have taken the hardest moments of 2025 and turned them into the pillars of your strength. As 2026 begins, trust the wisdom you've gained. Your journey is just getting started."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL CELEBRATION */}
      {isMidnight && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="z-[120] text-center"
        >
          <h1 className="text-7xl md:text-[11rem] font-black leading-none drop-shadow-2xl">
            HAPPY <br/> NEW YEAR
          </h1>
          <p className="mt-8 text-indigo-200 text-lg md:text-2xl font-bold tracking-[0.3em] uppercase">
            Make 2026 Legendary, don't give up, i believe you cant do.
            waan nijclhy...from Adan Ali
          </p>
        </motion.div>
      )}
    </div>
  );
}