// MilesJourney.jsx — Timeline as dimensional rifts with neon pulse
import { motion } from 'framer-motion';
import { Trophy, GraduationCap, Code } from 'lucide-react';
import { journey } from '../../shared-data';

const iconMap = {
  trophy: Trophy,
  graduation: GraduationCap,
  code: Code,
};

export default function MilesJourney() {
  return (
    <section
      className="about-section"
      style={{
        background: 'var(--r-bg-tertiary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, var(--r-glow-1) 0%, transparent 70%)',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      <div className="about-section-inner" style={{ maxWidth: '800px', position: 'relative', zIndex: 2 }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="about-section-title"
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            color: 'var(--r-text-primary)',
          }}
        >
          My Journey
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
          {/* Neon timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '80px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, var(--r-accent-1), var(--r-accent-2), var(--r-accent-4))',
              boxShadow: '0 0 10px var(--r-glow-1), 0 0 20px var(--r-glow-2)',
              transformOrigin: 'top',
              zIndex: 0,
            }}
          />

          {journey.map((item, index) => {
            const Icon = iconMap[item.icon] || Code;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100,
                }}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div style={{ flexShrink: 0, width: '60px', textAlign: 'right' }}>
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      color: 'var(--r-accent-1)',
                      fontFamily: 'Bangers, cursive',
                      letterSpacing: '2px',
                      textShadow: '0 0 10px var(--r-glow-1)',
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Glowing node */}
                <div style={{ flexShrink: 0 }}>
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      boxShadow: '0 0 25px var(--r-glow-1), 0 0 50px var(--r-glow-2)',
                    }}
                    style={{
                      width: '42px',
                      height: '42px',
                      background: 'linear-gradient(135deg, var(--r-accent-1), var(--r-accent-4))',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      boxShadow: '0 0 15px var(--r-glow-1)',
                      border: '2px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <Icon style={{ width: 20, height: 20 }} />
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{
                    borderColor: 'var(--r-accent-1)',
                    boxShadow: '0 0 15px var(--r-glow-1)',
                  }}
                  style={{
                    flexGrow: 1,
                    paddingBottom: '2rem',
                    borderLeft: '2px solid var(--r-border)',
                    paddingLeft: '1.5rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      color: 'var(--r-text-primary)',
                      fontFamily: 'Bangers, cursive',
                      letterSpacing: '1px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--r-text-muted)', fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
