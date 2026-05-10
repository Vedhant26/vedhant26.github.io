// RetroBio.jsx — RPG status screen
import { motion } from 'framer-motion';
import { bio } from '../../shared-data';

const stats = [
  { label: 'HP', value: 85, max: 100, color: '#e94560' },
  { label: 'MP', value: 70, max: 100, color: '#00b4d8' },
  { label: 'STR', value: 78, max: 100, color: '#ffd700' },
  { label: 'INT', value: 92, max: 100, color: '#43aa8b' },
  { label: 'DEX', value: 65, max: 100, color: '#bf5af2' },
];

export default function RetroBio() {
  return (
    <section className="about-section" style={{ background: 'var(--r-bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="about-section-title" style={{ textAlign: 'center', color: 'var(--r-accent-2)' }}>STATUS</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Character card */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rpg-dialog">
              {/* Portrait */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div className="retro-crt-wrap pixel-border" style={{ width: '80px', height: '80px', flexShrink: 0, overflow: 'hidden' }}>
                  <img src={bio.avatar} alt={bio.name} className="pixel-render"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated', filter: 'contrast(1.3) saturate(0.8)' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.75rem', color: 'var(--r-accent-2)', marginBottom: '8px' }}>
                    {bio.name.toUpperCase()}
                  </h3>
                  <p className="hud-element" style={{ color: 'var(--r-text-muted)', fontSize: '0.55rem' }}>
                    CLASS: DEVELOPER
                  </p>
                  <p className="hud-element" style={{ color: 'var(--r-text-muted)', fontSize: '0.55rem', marginTop: '4px' }}>
                    LVL: 25
                  </p>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.55rem', color: 'var(--r-text-secondary)', lineHeight: 2.2, marginBottom: '1rem' }}>
                Creative Technologist and Web Developer. Crafting next-gen interactive digital experiences!
              </p>

              {/* Equipped items */}
              <div style={{ borderTop: '2px solid var(--r-border)', paddingTop: '1rem' }}>
                <p className="hud-element" style={{ color: 'var(--r-accent-2)', marginBottom: '8px', fontSize: '0.55rem' }}>EQUIPPED:</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['⚔️ React', '🛡️ Node.js', '🔮 TypeScript'].map((item, i) => (
                    <span key={i} style={{
                      fontFamily: "'Press Start 2P', monospace", fontSize: '0.5rem',
                      padding: '4px 10px', border: '2px solid var(--r-border)',
                      color: 'var(--r-text-secondary)', background: 'var(--r-bg-primary)',
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Power-up badge */}
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ position: 'absolute', bottom: '-12px', right: '-12px', fontSize: '1.5rem', background: 'var(--r-bg-secondary)', border: '3px solid var(--r-accent-4)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                🍄
              </motion.div>
            </div>
          </motion.div>

          {/* Stats panel */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rpg-dialog">
              <p className="hud-element" style={{ color: 'var(--r-accent-2)', marginBottom: '1.5rem', fontSize: '0.6rem' }}>— STATS —</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {stats.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span className="hud-element" style={{ color: stat.color, fontSize: '0.6rem' }}>{stat.label}</span>
                      <span className="hud-element" style={{ color: 'var(--r-text-secondary)', fontSize: '0.55rem' }}>{stat.value}/{stat.max}</span>
                    </div>
                    <div className="pixel-progress">
                      <motion.div className="pixel-progress-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(stat.value / stat.max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.15, ease: 'linear' }}
                        style={{ background: stat.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* EXP bar */}
              <div style={{ marginTop: '1.5rem', borderTop: '2px solid var(--r-border)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span className="hud-element" style={{ color: 'var(--r-accent-4)', fontSize: '0.6rem' }}>EXP</span>
                  <span className="hud-element" style={{ color: 'var(--r-text-muted)', fontSize: '0.55rem' }}>7890 / 10000</span>
                </div>
                <div className="pixel-progress">
                  <motion.div className="pixel-progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: '78.9%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'linear' }}
                    style={{ background: 'var(--r-accent-4)' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
