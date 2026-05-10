// RetroSkills.jsx — Power-ups / inventory items grid
import { motion } from 'framer-motion';
import { skillCategories } from '../../shared-data';

const itemIcons = {
  'React': '⚔️', 'Next.js': '🗡️', 'Tailwind CSS': '🎨', 'Framer Motion': '💫',
  'JavaScript': '📜', 'TypeScript': '📘', 'Node.js': '🛡️', 'Express': '🏹',
  'MongoDB': '💎', 'PostgreSQL': '🔷', 'REST APIs': '📡', 'GraphQL': '🌐',
  'Basic Level Hacking': '🗝️', 'Kali Linux': '🐧', 'Cryptography': '🔐',
  'Phishing': '🎣', 'Github': '🐙',
};

export default function RetroSkills() {
  return (
    <section className="about-section" style={{ background: 'var(--r-bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="about-section-title" style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--r-accent-2)' }}>
          INVENTORY
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '2rem' }}>
          {skillCategories.map((cat, ci) => (
            <motion.div key={ci} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.15 }}>
              <div className="rpg-dialog">
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--r-border)' }}>
                  <span style={{ fontSize: '1.2rem' }}>{cat.retroIcon}</span>
                  <span className="hud-element" style={{ color: cat.color, fontSize: '0.6rem' }}>{cat.retroLabel}</span>
                </div>

                {/* Skill items */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {cat.skills.map((skill, si) => (
                    <motion.div key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.1 + si * 0.05 }}
                      whileHover={{ scale: 1.05, borderColor: 'var(--r-accent-2)' }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px', border: '2px solid var(--r-border)',
                        background: 'var(--r-bg-primary)',
                        cursor: 'default', transition: 'border-color 0.2s',
                      }}
                      title={skill}
                    >
                      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{itemIcons[skill] || '✦'}</span>
                      <span style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '0.4rem', color: 'var(--r-text-secondary)',
                        lineHeight: 1.6, overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {skill.toUpperCase()}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Slot count */}
                <div className="hud-element" style={{ marginTop: '0.75rem', textAlign: 'right', color: 'var(--r-text-muted)', fontSize: '0.45rem' }}>
                  {cat.skills.length}/{cat.skills.length + 2} SLOTS
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
