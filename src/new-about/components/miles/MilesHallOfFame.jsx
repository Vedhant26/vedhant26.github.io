// MilesHallOfFame.jsx — Holographic comic trading cards
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { achievements } from '../../shared-data';

const tierColors = {
  gold: { bg: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,45,149,0.1))', border: '#ffd700', glow: 'rgba(255,215,0,0.4)' },
  silver: { bg: 'linear-gradient(135deg, rgba(192,192,192,0.12), rgba(0,212,255,0.08))', border: '#c0c0c0', glow: 'rgba(192,192,192,0.3)' },
  bronze: { bg: 'linear-gradient(135deg, rgba(205,127,50,0.12), rgba(191,90,242,0.08))', border: '#cd7f32', glow: 'rgba(205,127,50,0.3)' },
  special: { bg: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(255,238,0,0.08))', border: 'var(--r-accent-2)', glow: 'var(--r-glow-2)' },
};

export default function MilesHallOfFame() {
  return (
    <section className="about-section" style={{ background: 'linear-gradient(135deg, var(--r-bg-primary), var(--r-bg-secondary))', position: 'relative', overflow: 'hidden' }}>
      <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Trophy style={{ width: 48, height: 48, margin: '0 auto 1rem', color: 'var(--r-accent-3)', filter: 'drop-shadow(0 0 10px var(--r-glow-3))' }} />
          <h2 className="about-section-title" style={{ textAlign: 'center' }}>Hall of Fame</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--r-text-muted)', fontFamily: 'Inter, sans-serif' }}>Hackathons, Interests & Achievements</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))', gap: '1.5rem' }}>
          {achievements.map((a, i) => {
            const t = tierColors[a.tier] || tierColors.bronze;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.04, y: -5 }} className="holo-card"
                style={{ background: t.bg, backdropFilter: 'blur(10px)', padding: '1.5rem', borderRadius: '4px', border: `2px solid ${t.border}`, position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'box-shadow 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${t.glow}, 0 0 40px ${t.glow}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{a.emoji}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'Bangers, cursive', letterSpacing: '1px' }}>{a.title}</h3>
                <p style={{ color: 'var(--r-text-muted)', marginBottom: '0.75rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>{a.event}</p>
                <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: `${t.border}20`, color: t.border, borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, border: `1px solid ${t.border}40` }}>{a.place}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
