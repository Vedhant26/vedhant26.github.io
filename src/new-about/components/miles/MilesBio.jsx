// MilesBio.jsx — Spider-Verse bio section with comic panel borders and neon stats
import { motion } from 'framer-motion';
import { Code, Zap } from 'lucide-react';
import { bio } from '../../shared-data';

export default function MilesBio() {
  return (
    <section
      className="about-section"
      style={{
        background: 'var(--r-bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Halftone background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--r-accent-2) 0.5px, transparent 0.5px)',
          backgroundSize: '8px 8px',
          opacity: 0.03,
          pointerEvents: 'none',
        }}
      />

      <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2
            className="about-section-title"
            style={{
              background: 'linear-gradient(135deg, var(--r-accent-1), var(--r-accent-2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            About Me
          </h2>
          <div
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, var(--r-accent-1), var(--r-accent-2))',
              margin: '0 auto',
              boxShadow: '0 0 15px var(--r-glow-1)',
            }}
          />
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                fontFamily: 'Bangers, cursive',
                letterSpacing: '2px',
                color: 'var(--r-text-primary)',
              }}
            >
              {bio.greeting} 👋
            </h3>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--r-text-secondary)',
                lineHeight: 1.8,
                marginBottom: '1rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              A passionate{' '}
              <span style={{ fontWeight: 700, color: 'var(--r-accent-1)', textShadow: '0 0 10px var(--r-glow-1)' }}>
                Creative Technologist
              </span>{' '}
              and{' '}
              <span style={{ fontWeight: 700, color: 'var(--r-accent-2)', textShadow: '0 0 10px var(--r-glow-2)' }}>
                Web Developer
              </span>{' '}
              crafting next-generation interactive digital experiences with momentum and mastery.
            </p>
            <p style={{ color: 'var(--r-text-muted)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>
              {bio.longBio}
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '1.5rem', flexWrap: 'wrap' }}>
              <div
                className="neon-element"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--r-accent-1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                }}
              >
                <Code style={{ width: 18, height: 18 }} />
                <span style={{ fontWeight: 600, fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                  Full Stack Developer
                </span>
              </div>
              <div
                className="neon-element"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--r-accent-2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  borderColor: 'var(--r-accent-2)',
                  boxShadow: '0 0 5px var(--r-glow-2), inset 0 0 5px rgba(0, 212, 255, 0.1)',
                }}
              >
                <Zap style={{ width: 18, height: 18 }} />
                <span style={{ fontWeight: 600, fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                  Tech Enthusiast
                </span>
              </div>
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            <div
              className="comic-panel"
              style={{
                aspectRatio: '1 / 1',
                border: '4px solid var(--r-accent-1)',
                boxShadow: `
                  0 0 20px var(--r-glow-1),
                  inset 0 0 30px rgba(0,0,0,0.5)
                `,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Duotone portrait */}
              <div
                className="duotone-image-wrap"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, var(--r-accent-1), var(--r-accent-4))',
                }}
              >
                <img
                  src={bio.avatar}
                  alt={bio.name}
                  loading="eager"
                  className="duotone-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%) contrast(1.2) brightness(1.1)',
                    mixBlendMode: 'multiply',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255, 45, 149, 0.25), rgba(0, 212, 255, 0.15))',
                    mixBlendMode: 'screen',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Halftone over portrait */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)',
                  backgroundSize: '3px 3px',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />
            </div>

            {/* Glitching "Available" neon sign */}
            <motion.div
              animate={{
                opacity: [1, 0.7, 1, 0.9, 1],
                textShadow: [
                  '0 0 5px var(--r-glow-2), 0 0 10px var(--r-glow-2)',
                  '0 0 2px var(--r-glow-2)',
                  '0 0 8px var(--r-glow-2), 0 0 20px var(--r-glow-2)',
                  '0 0 3px var(--r-glow-2)',
                  '0 0 5px var(--r-glow-2), 0 0 10px var(--r-glow-2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                bottom: '-1rem',
                right: '-1rem',
                background: 'var(--r-bg-primary)',
                border: '2px solid var(--r-accent-2)',
                padding: '0.5rem 0.75rem',
                borderRadius: '4px',
                zIndex: 10,
                boxShadow: '0 0 10px var(--r-glow-2)',
              }}
            >
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  color: 'var(--r-accent-2)',
                  fontFamily: 'Bangers, cursive',
                  letterSpacing: '2px',
                }}
              >
                ⚡ AVAILABLE
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
