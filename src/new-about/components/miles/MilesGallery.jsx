// MilesGallery.jsx — Comic book panel gallery with duotone and speech bubbles
import { motion } from 'framer-motion';
import { galleryImages } from '../../shared-data';

const panelLayouts = [
  { gridColumn: 'span 2', gridRow: 'span 2', clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' },
  { gridColumn: 'span 1', gridRow: 'span 1', clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%)' },
  { gridColumn: 'span 1', gridRow: 'span 1', clipPath: 'polygon(0 0, 100% 0, 100% 95%, 3% 100%)' },
  { gridColumn: 'span 1', gridRow: 'span 2', clipPath: 'polygon(0 0, 100% 3%, 100% 100%, 0 97%)' },
  { gridColumn: 'span 1', gridRow: 'span 1', clipPath: 'polygon(3% 0, 100% 0, 97% 100%, 0 100%)' },
  { gridColumn: 'span 2', gridRow: 'span 1', clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)' },
  { gridColumn: 'span 1', gridRow: 'span 1', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 5% 100%)' },
  { gridColumn: 'span 1', gridRow: 'span 1', clipPath: 'polygon(0 3%, 97% 0, 100% 97%, 3% 100%)' },
];

export default function MilesGallery() {
  return (
    <section
      className="about-section"
      style={{
        background: 'var(--r-bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="about-section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2
            className="about-section-title spray-text"
            style={{
              textAlign: 'center',
              color: 'var(--r-accent-1)',
              textShadow: '0 0 30px var(--r-glow-1)',
            }}
          >
            Photo Gallery
          </h2>
          <p style={{ color: 'var(--r-text-muted)', fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
            Frames from the multiverse
          </p>
        </motion.div>

        {/* Comic panel grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '200px',
            gap: '4px',
          }}
        >
          {galleryImages.map((image, index) => {
            const layout = panelLayouts[index % panelLayouts.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  zIndex: 10,
                  transition: { duration: 0.2 },
                }}
                className="comic-panel"
                style={{
                  gridColumn: layout.gridColumn,
                  gridRow: layout.gridRow,
                  position: 'relative',
                  overflow: 'hidden',
                  clipPath: layout.clipPath,
                  border: '3px solid #111',
                  background: '#111',
                  cursor: 'pointer',
                }}
              >
                {/* Duotone image */}
                <div
                  className="duotone-image-wrap"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, var(--r-accent-1), var(--r-accent-4))',
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="duotone-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(100%) contrast(1.3) brightness(1.1)',
                      mixBlendMode: 'multiply',
                    }}
                  />
                  {/* Color overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, rgba(255, 45, 149, 0.2), rgba(0, 212, 255, 0.15))`,
                      mixBlendMode: 'screen',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Halftone overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                    pointerEvents: 'none',
                    zIndex: 2,
                    opacity: 0.5,
                  }}
                />

                {/* Caption speech bubble on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    zIndex: 5,
                    background: '#fff',
                    color: '#111',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    border: '2px solid #111',
                    fontFamily: 'Bangers, cursive',
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    pointerEvents: 'none',
                  }}
                >
                  {image.alt}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: '15px',
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '8px solid #111',
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .about-section-inner > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 150px !important;
          }
          .about-section-inner > div:last-child > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            clip-path: none !important;
          }
        }
      `}</style>
    </section>
  );
}
