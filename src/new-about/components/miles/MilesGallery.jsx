// MilesGallery.jsx — Clean square grid photo gallery
import { useState } from 'react';
import { motion } from 'framer-motion';
import { galleryImages } from '../../shared-data';

export default function MilesGallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
            Moments captured along the way
          </p>
        </motion.div>

        {/* Clean square grid */}
        <div className="clean-gallery-grid">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="clean-gallery-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="clean-gallery-img"
              />
              {/* Caption overlay */}
              <div className={`clean-gallery-caption ${hoveredIndex === index ? 'visible' : ''}`}>
                <span className="clean-gallery-caption-text">{image.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── CLEAN SQUARE GRID ── */
        .clean-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .clean-gallery-item {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .clean-gallery-item:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 45, 149, 0.3);
        }

        .clean-gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .clean-gallery-item:hover .clean-gallery-img {
          transform: scale(1.06);
        }

        /* ── CAPTION ── */
        .clean-gallery-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 16px;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .clean-gallery-caption.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .clean-gallery-caption-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.3px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .clean-gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 768px) {
          .clean-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .clean-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}
