import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Lightbulb, Keyboard, Compass, ChevronRight, Check } from 'lucide-react';

interface SplashAndOnboardingProps {
  onComplete: () => void;
}

const ONBOARDING_STEPS = [
  {
    title: "Welcome to Review.AI",
    subtitle: "The Elite Automated Design System Auditor",
    description: "Designed for world-class design systems, Review.AI brings the visual analysis capabilities of Senior Product Designers and accessibility experts straight into your CI/CD pipeline.",
    icon: Sparkles,
    badge: "Core AI Engine",
    visual: (
      <div className="relative h-44 w-full rounded-2xl bg-gradient-to-br from-[#6C63FF]/10 to-[#A855F7]/10 border border-[#6C63FF]/20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent"></div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border border-dashed border-[#6C63FF]/30 flex items-center justify-center"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#A855F7] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#6C63FF]/30"
          >
            AI
          </motion.div>
        </motion.div>
      </div>
    )
  },
  {
    title: "Multimodal Visual Scanning",
    subtitle: "Fitts's Law, Hick's Law & Human Psychology",
    description: "Our core parser translates static mockups into interactive layouts. It maps visual attention flows (F & Z patterns), estimates heatmaps, and counts interactive decision load points automatically.",
    icon: Cpu,
    badge: "Attention Tracking",
    visual: (
      <div className="relative h-44 w-full rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between overflow-hidden">
        {/* Mock visual scan overlay */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
            <span className="text-[10px] font-mono text-slate-400">fitts_compliance_test.svg</span>
          </div>
          <span className="text-[10px] text-amber-400 font-mono bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">Critical: 28px target</span>
        </div>
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full max-w-[180px] bg-slate-850 p-2 rounded-lg border border-slate-700/50 space-y-2 relative">
            <div className="h-6 w-full bg-slate-800 rounded flex items-center justify-between px-2">
              <div className="w-10 h-2 bg-slate-700 rounded"></div>
              {/* Hotspot */}
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 rounded-full bg-red-500 border border-white flex items-center justify-center text-[8px] text-white font-bold"
              >
                !
              </motion.div>
            </div>
            <div className="h-2 w-3/4 bg-slate-800 rounded"></div>
          </div>
          <div className="absolute inset-x-0 h-0.5 bg-[#6C63FF] opacity-50 shadow-lg shadow-[#6C63FF]/50 top-1/2 -translate-y-1/2 animate-[bounce_2s_infinite]"></div>
        </div>
      </div>
    )
  },
  {
    title: "WCAG Accessibility Shield",
    subtitle: "Contrast, Readability & Simulators",
    description: "Instantly check WCAG 2.1 AA and AAA color compliance. Render any frame through standard protanopia, deuteranopia, and tritanopia simulators to protect visually impaired users.",
    icon: ShieldCheck,
    badge: "Accessibility Compliance",
    visual: (
      <div className="relative h-44 w-full rounded-2xl bg-white border border-slate-100 p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">Contrast Assessment</span>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Passed (7.4:1)</span>
        </div>
        <div className="flex gap-4 items-center justify-center flex-1">
          <div className="text-center">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">Standard Vision</span>
            <div className="w-16 h-12 bg-[#6C63FF] rounded-lg flex items-center justify-center text-white font-bold text-xs">Preview</div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <div className="text-center grayscale">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">Monochromacy</span>
            <div className="w-16 h-12 bg-[#6C63FF] rounded-lg flex items-center justify-center text-white font-bold text-xs">Preview</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Keyboard Shortcuts & Command Palette",
    subtitle: "Navigate with lightning speed",
    description: "Launch global workspace commands instantly. Power-users can trigger core system capabilities without picking up the mouse.",
    icon: Keyboard,
    badge: "Power-User Productivity",
    visual: (
      <div className="relative h-44 w-full rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <span className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold font-mono shadow-md">Ctrl</span>
          <span className="text-slate-500 font-bold font-mono">+</span>
          <span className="px-3.5 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold font-mono shadow-md">K</span>
        </div>
        <p className="text-[10px] text-center font-mono text-slate-400">Launch Global Command Palette</p>
        <div className="bg-slate-800/40 p-2 rounded-lg border border-slate-800 text-[10px] text-slate-500 text-center">
          Available system-wide on any workspace dashboard.
        </div>
      </div>
    )
  }
];

export function SplashAndOnboarding({ onComplete }: SplashAndOnboardingProps) {
  const [phase, setPhase] = useState<'splash' | 'onboarding'>('splash');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState("Initializing Review.AI modules...");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // 1. Splash Screen progress timeline
  useEffect(() => {
    if (phase !== 'splash') return;

    const steps = [
      { prg: 20, txt: "Initializing Review.AI core modules..." },
      { prg: 45, txt: "Binding WCAG Accessibility contrast metrics..." },
      { prg: 70, txt: "Loading Fitts's & Hick's Law cognitive solvers..." },
      { prg: 90, txt: "Rendering executive audit layout templates..." },
      { prg: 100, txt: "Environment ready." }
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Check if user has already completed onboarding
            const completed = localStorage.getItem('hasCompletedOnboarding');
            if (completed === 'true') {
              onComplete();
            } else {
              setPhase('onboarding');
            }
          }, 600);
          return 100;
        }

        const nextVal = prev + Math.floor(Math.random() * 8) + 4;
        const cappedVal = Math.min(nextVal, 100);

        // Update narrative statement based on progress threshold
        const targetStep = steps.find(s => cappedVal <= s.prg) || steps[steps.length - 1];
        if (targetStep) {
          setLoadingStep(targetStep.txt);
        }

        return cappedVal;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  const handleNext = () => {
    if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    onComplete();
  };

  const currentStep = ONBOARDING_STEPS[currentStepIndex];
  const StepIcon = currentStep.icon;

  return (
    <div id="intro-workflow-shell" className="fixed inset-0 z-50 bg-[#FAFAFB] flex items-center justify-center font-sans">
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: Splash Screen */}
        {phase === 'splash' && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center max-w-sm w-full p-6 text-center space-y-8"
          >
            {/* Elite Floating Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-xl shadow-black/10 relative overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF] to-[#A855F7] opacity-30"
                ></motion.div>
                <div className="w-7 h-7 bg-white rounded-full z-10 flex items-center justify-center shadow-inner">
                  <div className="w-3.5 h-3.5 bg-black rounded-full"></div>
                </div>
              </div>
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-tr from-[#6C63FF] to-[#A855F7] rounded-full border-2 border-[#FAFAFB] flex items-center justify-center text-white text-[9px] font-bold"
              >
                ✦
              </motion.div>
            </motion.div>

            {/* Brand Naming */}
            <div className="space-y-1.5">
              <h1 className="text-xl font-black text-black tracking-tight uppercase">Review.AI</h1>
              <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Senior Design Intelligence</p>
            </div>

            {/* Progress Narrative */}
            <div className="space-y-4 w-full">
              <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                <motion.div 
                  className="bg-black h-full rounded-full" 
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-gray-500 font-semibold tracking-wide h-4 flex items-center justify-center">
                {loadingStep}
              </p>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: Interactive Onboarding Flow */}
        {phase === 'onboarding' && (
          <motion.div
            key="onboarding-flow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-subtle max-w-xl w-full mx-4 rounded-3xl shadow-2xl p-8 flex flex-col justify-between min-h-[560px] relative overflow-hidden"
          >
            {/* Elegant glass highlights background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6C63FF]/5 to-[#A855F7]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Progress Header Indicator */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-[#6C63FF] bg-[#6C63FF]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Onboarding Tutorial
                </span>
                <span className="text-xs text-gray-400 font-semibold">
                  Step {currentStepIndex + 1} of {ONBOARDING_STEPS.length}
                </span>
              </div>
              <button 
                onClick={handleSkip}
                className="text-xs font-semibold text-gray-400 hover:text-black transition-colors"
              >
                Skip
              </button>
            </div>

            {/* Sliding Onboarding Content Container */}
            <div className="flex-1 py-6 flex flex-col justify-between space-y-6">
              {/* Dynamic Visual Demo Widget */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${currentStepIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep.visual}
                </motion.div>
              </AnimatePresence>

              {/* Text narrative */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-[#6C63FF]/10 text-[#6C63FF]">
                    <StepIcon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#6C63FF] uppercase tracking-wider">{currentStep.badge}</span>
                </div>
                <h2 className="text-lg font-bold text-black tracking-tight">{currentStep.title}</h2>
                <h3 className="text-xs font-semibold text-[#A855F7] tracking-tight">{currentStep.subtitle}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {currentStep.description}
                </p>
              </div>
            </div>

            {/* Stepper Footer Controls */}
            <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {ONBOARDING_STEPS.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStepIndex ? 'w-5 bg-black' : 'w-1.5 bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Active trigger buttons */}
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-black text-white rounded-full text-xs font-semibold hover:bg-zinc-800 transition-all flex items-center gap-1.5 group shadow-soft"
              >
                <span>{currentStepIndex === ONBOARDING_STEPS.length - 1 ? 'Get Started' : 'Continue'}</span>
                {currentStepIndex === ONBOARDING_STEPS.length - 1 ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
