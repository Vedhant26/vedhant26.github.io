// RetroGallery.jsx — Photos behind ? blocks on a tile grid
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../../shared-data';

function QuestionBlock({ image, index }) {
  const [revealed, setRevealed] = useState(false);
  const [coinVisible, setCoinVisible] = useState(false);

  const handleReveal = () => {
    if (revealed) return;
    setCoinVisible(true);
    setTimeout(() => { setRevealed(true); setCoinVisible(false); }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onClick={handleReveal}
      style={{ position: 'relative', aspectRatio: '1/1', cursor: revealed ? 'default' : 'pointer', overflow: 'visible' }}
    >
      {/* Coin pop animation */}
      <AnimatePresence>
        {coinVisible && (
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -60, opacity: 0, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, fontSize: '1.5rem', animation: 'coinSpin 0.6s linear' }}
          >
            🪙
          </motion.div>
        )}
      </AnimatePresence>

      {!revealed ? (
        /* Question block */
        <motion.div whileHover={{ y: -3 }} whileTap={{ y: 2 }}
          style={{
            width: '100%', height: '100%',
            background: 'var(--r-accent-2)',
            border: '4px solid #8B6914',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#8B6914',
            boxShadow: 'inset -4px -4px 0 rgba(0,0,0,0.3), inset 4px 4px 0 rgba(255,255,255,0.3), 4px 4px 0 rgba(0,0,0,0.4)',
            imageRendering: 'pixelated',
          }}>
          ?
        </motion.div>
      ) : (
        /* Revealed image */
        <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.4, type: 'spring' }}
          className="retro-crt-wrap"
          style={{ width: '100%', height: '100%', border: '3px solid var(--r-accent-2)', overflow: 'hidden', background: '#0a0a0a' }}>
          <img src={image.src} alt={image.alt} loading="lazy" className="pixel-render"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.2) saturate(0.9)', imageRendering: 'pixelated' }} />
          {/* Label */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.8)', padding: '6px',
            fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem', color: 'var(--r-accent-2)', textAlign: 'center', letterSpacing: '1px', zIndex: 15 }}>
            {image.alt}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function RetroGallery() {
  return (
    <section className="about-section" style={{ background: 'var(--r-bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Tile grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--r-accent-2) 1px, transparent 1px), linear-gradient(90deg, var(--r-accent-2) 1px, transparent 1px)',
        backgroundSize: '32px 32px' }} />

      <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="about-section-title" style={{ textAlign: 'center', color: 'var(--r-accent-2)' }}>
            GALLERY
          </h2>
          <p className="hud-element" style={{ color: 'var(--r-text-muted)' }}>HIT THE BLOCKS TO REVEAL!</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {galleryImages.map((img, i) => (
            <QuestionBlock key={i} image={img} index={i} />
          ))}
        </div>

        {/* Score hint */}
        <div className="hud-element" style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--r-text-muted)' }}>
          ITEMS: {galleryImages.length} / {galleryImages.length}
        </div>
      </div>
    </section>
  );
}
