// RetroGallery.jsx — Clean square grid gallery with retro styling
import { motion } from 'framer-motion';
import { galleryImages } from '../../shared-data';

export default function RetroGallery() {
  return (
    <section className="about-section" style={{ background: 'var(--r-bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Tile grid background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--r-accent-2) 1px, transparent 1px), linear-gradient(90deg, var(--r-accent-2) 1px, transparent 1px)',
        backgroundSize: '32px 32px' }} />

      <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="about-section-title" style={{ textAlign: 'center', color: 'var(--r-accent-2)' }}>
            GALLERY
          </h2>
          <p className="hud-element" style={{ color: 'var(--r-text-muted)' }}>CAPTURED MOMENTS</p>
        </motion.div>

        <div className="retro-gallery-grid">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="retro-gallery-square"
              style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', border: '3px solid var(--r-accent-2)', background: '#0a0a0a' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Item count */}
        <div className="hud-element" style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--r-text-muted)' }}>
          ITEMS: {galleryImages.length} / {galleryImages.length}
        </div>
      </div>

      <style>{`
        .retro-gallery-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }
        .retro-gallery-square {
          width: calc(25% - 9px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .retro-gallery-square:hover {
          transform: scale(1.04);
          box-shadow: 0 0 16px rgba(255, 191, 0, 0.3);
        }
        @media (max-width: 1024px) {
          .retro-gallery-square {
            width: calc(33.333% - 8px);
          }
        }
        @media (max-width: 768px) {
          .retro-gallery-grid {
            gap: 10px;
          }
          .retro-gallery-square {
            width: calc(50% - 5px);
          }
        }
        @media (max-width: 480px) {
          .retro-gallery-grid {
            gap: 8px;
          }
          .retro-gallery-square {
            width: calc(50% - 4px);
          }
        }
      `}</style>
    </section>
  );
}
