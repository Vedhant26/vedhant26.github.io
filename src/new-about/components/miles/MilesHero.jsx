// MilesHero.jsx — Cinematic Spider-Verse hero with glitch text and dimensional rift effects
// NO interactive portrait — pure themed experience
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Floating glitch particles
function GlitchParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    color: ['var(--r-accent-1)', 'var(--r-accent-2)', 'var(--r-accent-3)'][i % 3],
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 10, -10, 5, 0],
            opacity: [0, 1, 0.7, 1, 0],
            scale: [0.5, 1.2, 0.8, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

// Dimensional rift lines
function DimensionalRifts() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 0.3, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i,
            delay: i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: `${20 + i * 15}%`,
            left: '5%',
            right: '5%',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'var(--r-accent-1)' : 'var(--r-accent-2)'}, transparent)`,
            boxShadow: `0 0 15px ${i % 2 === 0 ? 'var(--r-glow-1)' : 'var(--r-glow-2)'}`,
            transformOrigin: i % 2 === 0 ? 'left' : 'right',
          }}
        />
      ))}
    </div>
  );
}

export default function MilesHero() {
  const containerRef = useRef(null);
  const [glitchFrame, setGlitchFrame] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });
  const scale = useTransform(smoothProgress, [0, 0.6], [1, 0.85]);
  const exitY = useTransform(smoothProgress, [0.5, 1], ['0%', '-60%']);
  const exitOpacity = useTransform(smoothProgress, [0.6, 1], [1, 0]);
  const nameY = useTransform(smoothProgress, [0, 0.5], ['0%', '15%']);
  const subtitleOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0.3]);

  // Random glitch trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchFrame(prev => prev + 1);
      setTimeout(() => setGlitchFrame(prev => prev + 1), 100);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  const isGlitching = glitchFrame % 2 === 1;

  return (
    <section ref={containerRef} className="relative" style={{ height: '120vh' }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ background: 'var(--r-bg-primary)' }}
      >
        {/* Background video replacing the deep blue background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <source src="/background video.mp4" type="video/mp4" />
        </video>

        {/* Diagonal neon streaks */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `
            linear-gradient(135deg, transparent 40%, rgba(255,45,149,0.04) 40%, rgba(255,45,149,0.04) 41%, transparent 41%),
            linear-gradient(135deg, transparent 55%, rgba(0,212,255,0.03) 55%, rgba(0,212,255,0.03) 56%, transparent 56%),
            linear-gradient(135deg, transparent 70%, rgba(255,238,0,0.02) 70%, rgba(255,238,0,0.02) 71%, transparent 71%)
          `,
          pointerEvents: 'none',
        }} />

        {/* Dimensional rift lines */}
        <DimensionalRifts />

        {/* Glitch particles */}
        <GlitchParticles />

        {/* Scan lines overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        }} />

        {/* Main content */}
        <motion.div
          style={{ y: exitY, opacity: exitOpacity, scale }}
          className="relative z-10 w-full px-6"
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            {/* Small subtitle above name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ opacity: subtitleOpacity }}
            >
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(0.5rem, 1vw, 0.75rem)',
                color: 'var(--r-accent-2)',
                letterSpacing: '6px',
                textTransform: 'uppercase',
                display: 'inline-block',
                padding: '6px 16px',
                border: '1px solid var(--r-accent-2)',
                boxShadow: '0 0 10px var(--r-glow-2)',
              }}>
                ⚡ HELLO, MY NAME IS ⚡
              </span>
            </motion.div>

            {/* Giant name with glitch effect */}
            <motion.div style={{ y: nameY }}>
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 80 }}
                style={{
                  fontFamily: "'Rock Salt', cursive",
                  fontSize: 'clamp(2rem, 8vw, 8rem)',
                  lineHeight: 1.2,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  marginTop: '1.5rem',
                  position: 'relative',
                  color: '#ffffff',
                  textShadow: isGlitching
                    ? '-3px 0 var(--r-accent-1), 3px 0 var(--r-accent-2)'
                    : '0 0 15px var(--r-accent-1), 0 0 30px var(--r-accent-1)',
                  transform: isGlitching ? 'skewX(-2deg)' : 'none',
                  transition: 'text-shadow 0.05s, transform 0.05s',
                }}
              >
                {/* RGB split ghost layers (only during glitch) */}
                {isGlitching && (
                  <>
                    <span style={{
                      position: 'absolute', inset: 0,
                      color: 'var(--r-accent-1)',
                      opacity: 0.5,
                      transform: 'translate(-4px, -2px)',
                      filter: 'blur(0.5px)',
                    }}>
                      VEDHANT
                    </span>
                    <span style={{
                      position: 'absolute', inset: 0,
                      color: 'var(--r-accent-2)',
                      opacity: 0.5,
                      transform: 'translate(4px, 2px)',
                      filter: 'blur(0.5px)',
                    }}>
                      VEDHANT
                    </span>
                  </>
                )}
                VEDHANT
              </motion.h1>

              {/* Last name */}
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 60 }}
                style={{
                  fontFamily: "'Rock Salt', cursive",
                  fontSize: 'clamp(1rem, 4vw, 4rem)',
                  fontWeight: 400,
                  color: '#ffffff',
                  letterSpacing: '0.05em',
                  textShadow: '0 0 15px var(--r-accent-2), 0 0 30px var(--r-accent-2)',
                  marginTop: '0.5rem',
                }}
              >
                BIDARI
              </motion.h2>
            </motion.div>

            {/* Role tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              style={{
                display: 'flex', gap: '1rem', justifyContent: 'center',
                flexWrap: 'wrap', marginTop: '2rem',
              }}
            >
              {['CREATIVE TECHNOLOGIST', 'WEB DEVELOPER', 'PROBLEM SOLVER'].map((role, i) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.15 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 20px ${i === 0 ? 'var(--r-glow-1)' : i === 1 ? 'var(--r-glow-2)' : 'var(--r-glow-3)'}`,
                  }}
                  style={{
                    fontFamily: "'Bangers', cursive",
                    fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
                    letterSpacing: '3px',
                    padding: '8px 20px',
                    border: `2px solid ${i === 0 ? 'var(--r-accent-1)' : i === 1 ? 'var(--r-accent-2)' : 'var(--r-accent-3)'}`,
                    color: i === 0 ? 'var(--r-accent-1)' : i === 1 ? 'var(--r-accent-2)' : 'var(--r-accent-3)',
                    borderRadius: '2px',
                    background: 'rgba(13, 2, 33, 0.6)',
                    backdropFilter: 'blur(4px)',
                    cursor: 'default',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  {role}
                </motion.span>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              style={{ marginTop: '3rem' }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                  color: 'var(--r-text-muted)', gap: '4px',
                }}
              >
                <span style={{ fontSize: '0.7rem', letterSpacing: '4px', fontFamily: 'Inter, sans-serif' }}>
                  SCROLL
                </span>
                <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 4v12M4 12l4 4 4-4" />
                  <rect x="3" y="1" width="10" height="22" rx="5" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px',
          background: 'linear-gradient(transparent, var(--r-bg-primary))',
          zIndex: 20, pointerEvents: 'none',
        }} />

        {/* Corner web decorations */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '200px', opacity: 0.06, zIndex: 1 }} viewBox="0 0 200 200">
          <path d="M0,0 Q100,10 200,0" stroke="var(--r-accent-1)" fill="none" strokeWidth="1" />
          <path d="M0,0 Q10,100 0,200" stroke="var(--r-accent-1)" fill="none" strokeWidth="1" />
          <path d="M0,0 Q80,80 160,160" stroke="var(--r-accent-2)" fill="none" strokeWidth="0.5" />
          <path d="M0,0 Q40,60 80,160" stroke="var(--r-accent-1)" fill="none" strokeWidth="0.5" />
          <path d="M0,0 Q60,40 160,80" stroke="var(--r-accent-2)" fill="none" strokeWidth="0.5" />
        </svg>
        <svg style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', opacity: 0.06, zIndex: 1, transform: 'scaleX(-1)' }} viewBox="0 0 200 200">
          <path d="M0,0 Q100,10 200,0" stroke="var(--r-accent-2)" fill="none" strokeWidth="1" />
          <path d="M0,0 Q10,100 0,200" stroke="var(--r-accent-2)" fill="none" strokeWidth="1" />
          <path d="M0,0 Q80,80 160,160" stroke="var(--r-accent-1)" fill="none" strokeWidth="0.5" />
        </svg>
      </div>
    </section>
  );
}
