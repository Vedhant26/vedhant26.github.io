// MilesSkills.jsx — Graffiti tags on a brick wall
import { motion } from 'framer-motion';
import { Code, Database, Palette } from 'lucide-react';
import { skillCategories } from '../../shared-data';

const iconMap = { code: Code, database: Database, palette: Palette };

export default function MilesSkills() {
  return (
    <section className="about-section" style={{ background: 'var(--r-bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Brick pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(var(--r-text-muted) 1px, transparent 1px),
          linear-gradient(90deg, var(--r-text-muted) 1px, transparent 1px)
        `, backgroundSize: '60px 30px', backgroundPosition: '0 0, 30px 15px' }} />

      <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="about-section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          Skills & Expertise
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '2rem' }}>
          {skillCategories.map((cat, ci) => {
            const Icon = iconMap[cat.icon] || Code;
            return (
              <motion.div key={ci} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.15 }}>
                {/* Category icon with glitch frame */}
                <motion.div whileHover={{ scale: 1.1 }}
                  style={{ background: cat.color, padding: '3px', borderRadius: '4px', marginBottom: '1rem', width: 'fit-content', boxShadow: `0 0 15px ${cat.color}60` }}>
                  <div style={{ background: 'var(--r-bg-primary)', padding: '0.75rem', borderRadius: '2px', color: cat.color }}>
                    <Icon style={{ width: 28, height: 28 }} />
                  </div>
                </motion.div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'Bangers, cursive', letterSpacing: '2px', color: 'var(--r-text-primary)' }}>{cat.title}</h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cat.skills.map((skill, si) => (
                    <motion.span key={skill} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 + si * 0.05 }}
                      whileHover={{ scale: 1.08, borderColor: 'var(--r-accent-1)', boxShadow: '0 0 15px var(--r-glow-1)' }}
                      style={{ padding: '0.5rem 1rem', background: 'var(--r-bg-card)', border: '1px solid var(--r-border)', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--r-text-secondary)', fontFamily: 'Inter, sans-serif', transition: 'all 0.3s ease', cursor: 'default' }}>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
