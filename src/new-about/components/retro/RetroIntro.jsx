// RetroIntro.jsx — RPG dialog box with typewriter effect
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { bio } from '../../shared-data';

function TypewriterText({ text, speed = 35, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);
  }, [text]);

  useEffect(() => {
    const startTyping = () => {
      intervalRef.current = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayed(text.slice(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          clearInterval(intervalRef.current);
          setDone(true);
          onComplete?.();
        }
      }, speed);
    };
    // Small delay before typing starts
    const timeout = setTimeout(startTyping, 400);
    return () => { clearTimeout(timeout); clearInterval(intervalRef.current); };
  }, [text, speed, onComplete]);

  return (
    <span>
      {displayed}
      {!done && <span style={{ animation: 'retroBlink 0.6s step-start infinite' }}>▮</span>}
      {done && <span style={{ animation: 'retroBlink 1s step-start infinite', marginLeft: '8px' }}>▼</span>}
    </span>
  );
}

export default function RetroIntro() {
  return (
    <section className="about-section" style={{ background: 'var(--r-bg-primary)', position: 'relative', overflow: 'hidden', padding: '5rem 1.5rem' }}>
      {/* Tile grid background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--r-accent-2) 1px, transparent 1px), linear-gradient(90deg, var(--r-accent-2) 1px, transparent 1px)',
        backgroundSize: '32px 32px' }} />

      <div className="about-section-inner" style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {/* RPG dialog box */}
          <div className="rpg-dialog" style={{ position: 'relative' }}>
            {/* Character name plate */}
            <div style={{
              position: 'absolute', top: '-16px', left: '20px',
              background: 'var(--r-accent-2)', color: '#000',
              padding: '4px 16px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.65rem', fontWeight: 'bold',
              border: '3px solid #8B6914',
              boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.3)',
            }}>
              VEDHANT
            </div>

            <div style={{ padding: '1rem 0.5rem' }}>
              <p style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)',
                color: 'var(--r-text-primary)',
                lineHeight: 2.4,
                letterSpacing: '1px',
              }}>
                <TypewriterText
                  text="Hello! I am a B.Tech CS student from VIT-AP University. I love building digital experiences that matter and crafting impactful web solutions!"
                  speed={30}
                />
              </p>
            </div>

            {/* Decorative corner pixels */}
            {[
              { top: '8px', left: '8px' },
              { top: '8px', right: '8px' },
              { bottom: '8px', left: '8px' },
              { bottom: '8px', right: '8px' },
            ].map((pos, i) => (
              <div key={i} style={{ position: 'absolute', ...pos, width: '4px', height: '4px', background: 'var(--r-accent-2)', opacity: 0.5 }} />
            ))}
          </div>

          {/* Stats bar below dialog */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'LVL', value: '25', color: 'var(--r-accent-2)' },
              { label: 'EXP', value: '■■■■■■■□□□', color: 'var(--r-accent-4)' },
              { label: 'CLASS', value: 'DEV', color: 'var(--r-accent-1)' },
            ].map((stat, i) => (
              <div key={i} className="hud-element" style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--r-text-muted)', marginBottom: '4px' }}>{stat.label}</div>
                <div style={{ color: stat.color, fontSize: '0.75rem' }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
