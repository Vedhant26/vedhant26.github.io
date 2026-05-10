// RetroHero.jsx — Pixel art portrait with CRT monitor frame
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { bio } from '../../shared-data';

export default function RetroHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });
  const scale = useTransform(smoothProgress, [0, 0.4], [1, 0.5]);
  const exitY = useTransform(smoothProgress, [0.85, 1], ['0%', '-100%']);
  const exitOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: 'var(--r-bg-primary)' }}>
        {/* Scrolling star field */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: i % 3 === 0 ? '3px' : '2px',
              height: i % 3 === 0 ? '3px' : '2px',
              background: i % 5 === 0 ? 'var(--r-accent-2)' : '#fff',
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
              opacity: 0.3 + (i % 4) * 0.15,
              animation: `retroBlink ${2 + (i % 3)}s ${i * 0.2}s step-start infinite`,
              imageRendering: 'pixelated',
            }} />
          ))}
        </div>

        {/* CRT scanlines */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', opacity: 0.5 }} />

        {/* HUD top bar */}
        <div className="hud-element" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 20 }}>
          <span style={{ color: 'var(--r-accent-1)' }}>♥♥♥</span>{' '}
          <span>PLAYER 1</span>
        </div>
        <div className="hud-element" style={{ position: 'absolute', top: '20px', right: '80px', zIndex: 20 }}>
          SCORE: <span style={{ color: 'var(--r-accent-2)' }}>99999</span>
        </div>

        {/* "PLAYER 1 — VEDHANT" title */}
        <motion.div style={{ y: exitY, opacity: exitOpacity, position: 'absolute', top: '15%', zIndex: 15, textAlign: 'center', width: '100%' }}>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(0.8rem, 2.5vw, 1.5rem)',
            color: 'var(--r-accent-2)',
            letterSpacing: '4px',
            textShadow: '3px 3px 0 rgba(0,0,0,0.5)',
            imageRendering: 'pixelated',
          }}>
            — PLAYER 1 —
          </h1>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
            color: 'var(--r-text-primary)',
            letterSpacing: '6px',
            marginTop: '0.5rem',
            textShadow: '4px 4px 0 rgba(0,0,0,0.6)',
          }}>
            VEDHANT
          </h2>
        </motion.div>

        {/* Pixelated portrait in CRT frame */}
        <motion.div className="relative z-10 flex items-center justify-center" style={{ scale, y: exitY, opacity: exitOpacity }}>
          <div className="retro-crt-wrap" style={{ maxWidth: '400px', width: '80vw' }}>
            {/* CRT monitor bezel */}
            <div style={{
              background: '#2a2a2a',
              borderRadius: '12px',
              padding: '20px 20px 30px',
              border: '4px solid #444',
              boxShadow: '0 10px 40px rgba(0,0,0,0.6), inset 0 0 30px rgba(0,180,216,0.05)',
            }}>
              {/* Screen */}
              <div className="phosphor-glow" style={{
                position: 'relative',
                aspectRatio: '4/5',
                overflow: 'hidden',
                border: '3px solid #111',
                background: '#0a0a0a',
              }}>
                <img
                  src={bio.avatar}
                  alt={bio.name}
                  className="pixel-render"
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.3) saturate(0.8)',
                    imageRendering: 'pixelated',
                  }}
                />
                {/* Scanline overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)', pointerEvents: 'none', zIndex: 10 }} />
                {/* CRT vignette */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse, transparent 55%, rgba(0,0,0,0.5) 100%)', pointerEvents: 'none', zIndex: 11 }} />
              </div>
              {/* Monitor base label */}
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.5rem', color: '#555', letterSpacing: '2px' }}>
                  RETRO-VISION 2000
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(transparent, var(--r-bg-primary))', zIndex: 20, pointerEvents: 'none' }} />
      </div>
    </section>
  );
}
