import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const AboutThemeContext = createContext(null);

export function AboutThemeProvider({ children }) {
  const [currentReality, setCurrentReality] = useState('miles');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const konamiBuffer = useRef([]);
  const [konamiActivated, setKonamiActivated] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Konami code listener: ↑↑↓↓←→←→BA
  useEffect(() => {
    const KONAMI = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];

    const handleKeyDown = (e) => {
      konamiBuffer.current.push(e.code);
      if (konamiBuffer.current.length > KONAMI.length) {
        konamiBuffer.current.shift();
      }
      if (konamiBuffer.current.length === KONAMI.length &&
          konamiBuffer.current.every((key, i) => key === KONAMI[i])) {
        setKonamiActivated(true);
        konamiBuffer.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleReality = useCallback(() => {
    if (isTransitioning) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsTransitioning(true);
  }, [isTransitioning]);

  const completeTransition = useCallback(() => {
    setCurrentReality(prev => prev === 'miles' ? 'retro' : 'miles');
    // Small delay to let new reality render before revealing
    requestAnimationFrame(() => {
      setIsTransitioning(false);
    });
  }, []);

  const dismissKonami = useCallback(() => {
    setKonamiActivated(false);
  }, []);

  return (
    <AboutThemeContext.Provider value={{
      currentReality,
      isTransitioning,
      prefersReducedMotion,
      konamiActivated,
      toggleReality,
      completeTransition,
      dismissKonami,
    }}>
      {/* 
        Split into two layers:
        1. The themed content wrapper (creates stacking context)
        2. Fixed-position overlays rendered OUTSIDE the wrapper 
           so their z-index works globally
      */}
      <div
        data-reality={currentReality}
        data-transitioning={isTransitioning ? 'true' : undefined}
        className="about-reality-root"
      >
        {children}
      </div>
    </AboutThemeContext.Provider>
  );
}

export function useAboutTheme() {
  const ctx = useContext(AboutThemeContext);
  if (!ctx) throw new Error('useAboutTheme must be used within AboutThemeProvider');
  return ctx;
}
