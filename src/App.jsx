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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [orbs] = useState(() => MEMORIES.map(m => ({
    ...m,
    top: Math.random() * 60 + 20,
    left: Math.random() * 80 + 10,
    duration: Math.random() * 5 + 15,
  })));

  const [selected, setSelected] = useState([]);
  const [isPopped, setIsPopped] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });
  const [isMidnight, setIsMidnight] = useState(false);
  
  const videoRef = useRef(null);
  const fireworksInterval = useRef(null);

  // 1. Initialize Video Sound and Balloons on Click
  const handleStart = () => {
    setHasInteracted(true);
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.muted = false; // Explicitly unmute on interaction
    }
  };

  // 2. Countdown Logic
  useEffect(() => {
    const targetTime = new Date('January 1, 2026 00:00:00').getTime();
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = targetTime - now;

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
    if (isPopped) return;
    if (selected.find(s => s.id === orb.id)) {
      setSelected(selected.filter(s => s.id !== orb.id));
    } else if (selected.length < 5) {
      const newSelected = [...selected, orb];
      setSelected(newSelected);
      if (newSelected.length === 5) {
        setTimeout(() => {
          setIsPopped(true);
          confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        }, 800);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white font-sans">
      
      {/* --- VIDEO LAYER --- */}
      <div className="absolute inset-0 z-0">
        {!isMidnight && (
          <video
            ref={videoRef}
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-[3000ms]"
          >
            {/* Cinematic Countdown Video with Audio */}
            <source src="quran.mp4" type="video/mp4" />
          </video>
        )}

        {/* Midnight Image */}
        <img 
          src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2000" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${isMidnight ? 'opacity-100' : 'opacity-0'}`}
          alt="Fireworks"
        />
        <div className={`absolute inset-0 transition-colors duration-[3000ms] ${isMidnight ? 'bg-black/20' : 'bg-black/40'}`} />
      </div>

      {/* --- INITIAL INTERACTION OVERLAY (To enable sound) --- */}
      {!hasInteracted && (
        <div 
          onClick={handleStart}
          className="z-[200] absolute inset-0 bg-black/80 flex flex-col items-center justify-center cursor-pointer group"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.5)] mb-6"
          >
            <span className="text-4xl text-white">▶</span>
          </motion.div>
          <h2 className="text-xl font-bold tracking-widest uppercase text-white/80 group-hover:text-white">Click to Begin the Odyssey</h2>
          <p className="text-indigo-400 text-xs mt-4 tracking-[0.3em] font-medium">AUDIO ENABLED</p>
        </div>
      )}

      {/* --- HUD --- */}
      {hasInteracted && (
        <div className="z-[100] text-center pointer-events-none absolute top-12 w-full px-4">
          <motion.div animate={isMidnight ? { y: -60, scale: 0.7 } : {}}>
            <h2 className="text-[10px] tracking-[0.5em] uppercase font-bold text-indigo-400 mb-2">
              {!isPopped ? `Pillars of 2025: ${selected.length}/5` : "Reflections Saved"}
            </h2>
            <div className="text-6xl md:text-9xl font-black tracking-tighter tabular-nums drop-shadow-2xl">
              {isMidnight ? "2026" : `${timeLeft.h}:${timeLeft.m}:${timeLeft.s}`}
            </div>
          </motion.div>
        </div>
      )}

      {/* --- PILLARS --- */}
      <AnimatePresence>
        {hasInteracted && !isPopped && !isMidnight && orbs.map((orb) => {
          const isSelected = selected.find(s => s.id === orb.id);
          return (
            <motion.button
              key={orb.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, scale: isSelected ? 1.25 : 1,
                x: [0, (Math.random() - 0.5) * 40, 0],
                y: [0, (Math.random() - 0.5) * 40, 0],
              }}
              exit={{ opacity: 0, scale: 3, filter: 'blur(20px)' }}
              transition={{ 
                x: { duration: orb.duration, repeat: Infinity, ease: "easeInOut" },
                y: { duration: orb.duration, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3 }
              }}
              onClick={() => handleSelect(orb)}
              style={{ position: 'absolute', top: `${orb.top}%`, left: `${orb.left}%` }}
              className={`z-50 pointer-events-auto rounded-full flex flex-col items-center justify-center transition-all duration-500 backdrop-blur-xl border ${
                isSelected 
                ? 'w-32 h-32 bg-indigo-600 border-white shadow-[0_0_50px_rgba(255,255,255,0.6)]' 
                : 'w-24 h-24 bg-white/5 border-white/10 hover:border-white/50'
              }`}
            >
              <span className="text-3xl mb-1">{orb.icon}</span>
              <span className="text-[9px] font-bold uppercase text-center px-2 leading-tight">{orb.text}</span>
            </motion.button>
          );
        })}
      </AnimatePresence>

      {/* --- ADVICE --- */}
      <AnimatePresence>
        {isPopped && !isMidnight && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-[110] fixed bottom-16 max-w-xl mx-4 p-10 bg-black/60 backdrop-blur-3xl border border-indigo-500/50 rounded-[3rem] text-center shadow-2xl"
          >
            <p className="text-xl md:text-2xl font-light italic leading-relaxed text-indigo-50">
              "Your 2025 has been a journey of immense growth. Carry these pillars with you. 2026 is your year to build something legendary."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CELEBRATION --- */}
      {isMidnight && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="z-[120] text-center px-6"
        >
          <h1 className="text-7xl md:text-[11rem] font-black leading-none drop-shadow-2xl">
            HAPPY <br/> NEW YEAR
          </h1>
          <div className="mt-8 space-y-4">
            <p className="text-indigo-200 text-lg md:text-2xl font-bold tracking-[0.2em] uppercase max-w-2xl mx-auto leading-relaxed">
              Sanad Qheir Qawo Alle hakagadigo wll iyo sxp❤️
            </p>
            <p className="text-white/60 text-sm font-medium tracking-widest italic">
              — from Adan maalim Ali 😂😂😂
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}