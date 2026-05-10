// RetroJourney.jsx — Side-scroller level map with flag checkpoints
import { motion } from 'framer-motion';
import { journey } from '../../shared-data';

export default function RetroJourney() {
  return (
    <section className="about-section" style={{ background: 'var(--r-bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
      {/* Multi-layer parallax background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Clouds layer */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`cloud-${i}`} style={{
            position: 'absolute',
            top: `${10 + (i % 3) * 15}%`,
            left: `${(i * 18) % 100}%`,
            width: `${40 + i * 10}px`, height: '16px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '8px',
            imageRendering: 'pixelated',
          }} />
        ))}
        {/* Hills layer */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
          background: 'linear-gradient(transparent, rgba(0,180,216,0.03))',
        }} />
      </div>

      <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="about-section-title" style={{ textAlign: 'center', marginBottom: '4rem', color: 'var(--r-accent-2)' }}>
          QUEST LOG
        </motion.h2>

        {/* Level map */}
        <div style={{ position: 'relative', padding: '2rem 0' }}>
          {/* Dotted path */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4px',
            background: 'repeating-linear-gradient(180deg, var(--r-accent-2) 0, var(--r-accent-2) 8px, transparent 8px, transparent 16px)',
            transform: 'translateX(-50%)', opacity: 0.4, imageRendering: 'pixelated',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {journey.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div key={index}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: 'spring', stiffness: 80 }}
                  style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}>

                  {/* Level flag at center */}
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                    style={{
                      position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                      width: '32px', height: '32px', zIndex: 5,
                      background: index === 0 ? 'var(--r-accent-1)' : 'var(--r-accent-2)',
                      border: '3px solid #000',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Press Start 2P', monospace", fontSize: '0.5rem', color: '#000',
                      boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.3)',
                      imageRendering: 'pixelated',
                    }}>
                    {index === 0 ? '★' : '⚑'}
                  </motion.div>

                  {/* Level card */}
                  <div className="rpg-dialog" style={{ maxWidth: '350px', width: '42%' }}>
                    <div className="hud-element" style={{ color: 'var(--r-accent-1)', fontSize: '0.55rem', marginBottom: '8px' }}>
                      {item.level}
                    </div>
                    <h3 style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '0.7rem', color: 'var(--r-accent-2)',
                      marginBottom: '8px', lineHeight: 1.8,
                    }}>
                      {item.title.toUpperCase()}
                    </h3>
                    <p style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '0.5rem', color: 'var(--r-text-muted)', lineHeight: 2,
                    }}>
                      {item.desc}
                    </p>
                    <div className="hud-element" style={{ marginTop: '8px', color: 'var(--r-text-muted)', fontSize: '0.5rem' }}>
                      YEAR: {item.year}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* "Continue?" prompt */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.65rem', color: 'var(--r-accent-2)',
              animation: 'retroBlink 1.2s step-start infinite',
            }}>
              — QUEST CONTINUES... —
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
