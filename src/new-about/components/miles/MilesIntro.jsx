// MilesIntro.jsx — Spider-Verse intro with kinetic typography and spray-paint style
import { motion } from 'framer-motion';
import { bio } from '../../shared-data';

const letterVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: Math.random() * 80 - 40,
    x: Math.random() * 60 - 30,
    rotate: Math.random() * 30 - 15,
    scale: 0.5,
  }),
  visible: (i) => ({
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      delay: i * 0.03,
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  }),
};

function KineticText({ text, className, style }) {
  return (
    <span className={className} style={{ display: 'inline-block', ...style }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function MilesIntro() {
  return (
    <section
      className="about-section slash-accent"
      style={{
        background: 'var(--r-bg-primary)',
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 1.5rem',
      }}
    >
      {/* Diagonal accent lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            rgba(255, 45, 149, 0.03) 60px,
            rgba(255, 45, 149, 0.03) 62px
          )`,
          pointerEvents: 'none',
        }}
      />

      <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ textAlign: 'left' }}
        >
          <h2
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: '2.5rem',
              fontFamily: 'Bangers, cursive',
            }}
          >
            <KineticText
              text="Hello,"
              style={{ color: 'var(--r-text-primary)', display: 'block' }}
            />
            <br />
            <span style={{ color: 'var(--r-text-primary)' }}>this is </span>
            <KineticText
              text="Vedhant"
              style={{ color: 'var(--r-accent-1)' }}
              className="spray-text"
            />
            <br />
            <KineticText
              text="Bidari"
              style={{ color: 'var(--r-accent-2)' }}
              className="spray-text"
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
              color: 'var(--r-text-secondary)',
              lineHeight: 1.6,
              fontWeight: 300,
              maxWidth: '800px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {bio.introBio.split('digital experiences').map((part, i) =>
              i === 0 ? (
                <span key={i}>
                  {part}
                  <span
                    style={{
                      color: 'var(--r-accent-1)',
                      fontWeight: 600,
                      textShadow: '0 0 20px var(--r-glow-1)',
                    }}
                  >
                    digital experiences
                  </span>
                </span>
              ) : (
                <span key={i}>
                  {part.split('impactful web solutions.').map((p2, j) =>
                    j === 0 ? (
                      <span key={j}>
                        {p2}
                        <span
                          style={{
                            color: 'var(--r-accent-2)',
                            fontWeight: 600,
                            textShadow: '0 0 20px var(--r-glow-2)',
                          }}
                        >
                          impactful web solutions.
                        </span>
                      </span>
                    ) : null
                  )}
                </span>
              )
            )}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
