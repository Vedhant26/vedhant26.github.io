// RetroHallOfFame.jsx — Arcade high score table
import { motion } from 'framer-motion';
import { achievements } from '../../shared-data';

const tierScores = { gold: 99999, silver: 75000, bronze: 50000, special: 88888 };
const tierSymbols = { gold: '★', silver: '☆', bronze: '◆', special: '♦' };

export default function RetroHallOfFame() {
  return (
    <section className="about-section retro-crt-wrap" style={{ background: 'var(--r-bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="about-section-title" style={{ textAlign: 'center', color: 'var(--r-accent-2)' }}>
            HIGH SCORES
          </h2>
          <p className="hud-element" style={{ color: 'var(--r-text-muted)' }}>HALL OF FAME</p>
        </motion.div>

        {/* High score table */}
        <div className="rpg-dialog" style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Table header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '2px solid var(--r-accent-2)', marginBottom: '12px' }}>
            <span className="hud-element" style={{ width: '30px', color: 'var(--r-accent-2)', fontSize: '0.55rem' }}>RK</span>
            <span className="hud-element" style={{ flex: 1, color: 'var(--r-accent-2)', fontSize: '0.55rem' }}>ACHIEVEMENT</span>
            <span className="hud-element" style={{ width: '80px', textAlign: 'right', color: 'var(--r-accent-2)', fontSize: '0.55rem' }}>SCORE</span>
          </div>

          {/* Entries */}
          {achievements.map((a, i) => {
            const score = tierScores[a.tier] || 50000;
            const symbol = tierSymbols[a.tier] || '◆';
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: i < achievements.length - 1 ? '1px solid rgba(255,215,0,0.1)' : 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,215,0,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{
                  width: '30px',
                  fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem',
                  color: i === 0 ? 'var(--r-accent-2)' : 'var(--r-text-muted)',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1, paddingLeft: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: a.tier === 'gold' ? '#ffd700' : a.tier === 'silver' ? '#c0c0c0' : 'var(--r-accent-1)', fontSize: '0.8rem' }}>{symbol}</span>
                    <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.5rem', color: 'var(--r-text-primary)', lineHeight: 1.8 }}>
                      {a.title.toUpperCase()}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem', color: 'var(--r-text-muted)', marginLeft: '24px' }}>
                    {a.event}
                  </span>
                </div>
                <span style={{
                  width: '80px', textAlign: 'right',
                  fontFamily: "'Press Start 2P', monospace", fontSize: '0.55rem',
                  color: 'var(--r-accent-2)',
                }}>
                  {score.toLocaleString()}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* INSERT COIN */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.7rem', color: 'var(--r-accent-1)',
            animation: 'retroBlink 1s step-start infinite',
          }}>
            INSERT COIN TO CONTINUE
          </p>
        </div>
      </div>
    </section>
  );
}
