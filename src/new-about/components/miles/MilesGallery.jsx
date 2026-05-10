// MilesGallery.jsx — Glitch-aesthetic photo gallery with no color filters
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
            Frames from the multiverse
          </p>
        </motion.div>

        {/* Glitch gallery grid */}
        <div className="miles-gallery-grid">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={`miles-gallery-item miles-gallery-item--${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`glitch-img-container ${hoveredIndex === index ? 'glitching' : ''}`}>
                {/* Main image — NO filters */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="glitch-img glitch-img--main"
                />
                {/* Red channel clone */}
                <img
                  src={image.src}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="glitch-img glitch-img--r"
                />
                {/* Cyan channel clone */}
                <img
                  src={image.src}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="glitch-img glitch-img--c"
                />

                {/* Scanline overlay */}
                <div className="glitch-scanlines" />

                {/* Bottom caption */}
                <div className="glitch-caption">
                  <span className="glitch-caption-text">{image.alt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── GALLERY GRID ── */
        .miles-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 260px;
          gap: 10px;
        }

        /* Make some items span more for visual variety */
        .miles-gallery-item--0 {
          grid-column: span 2;
          grid-row: span 2;
        }
        .miles-gallery-item--3 {
          grid-column: span 1;
          grid-row: span 2;
        }
        .miles-gallery-item--5 {
          grid-column: span 2;
          grid-row: span 1;
        }

        .miles-gallery-item {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid rgba(255, 45, 149, 0.15);
          transition: border-color 0.3s ease;
        }
        .miles-gallery-item:hover {
          border-color: rgba(255, 45, 149, 0.6);
        }

        /* ── GLITCH IMAGE CONTAINER ── */
        .glitch-img-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #0d0221;
        }

        .glitch-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Main image — clean, no filter */
        .glitch-img--main {
          z-index: 2;
        }

        /* Red channel (shifted) — hidden by default */
        .glitch-img--r {
          z-index: 3;
          opacity: 0;
          mix-blend-mode: screen;
          filter: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='r'%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3C/svg%3E#r");
        }

        /* Cyan channel (shifted) — hidden by default */
        .glitch-img--c {
          z-index: 3;
          opacity: 0;
          mix-blend-mode: screen;
          filter: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3C/svg%3E#c");
        }

        /* ── GLITCH ACTIVE STATE ── */
        .glitching .glitch-img--r {
          opacity: 0.7;
          animation: glitchR 0.3s steps(2) infinite;
        }
        .glitching .glitch-img--c {
          opacity: 0.7;
          animation: glitchC 0.3s steps(2) infinite;
        }
        .glitching .glitch-img--main {
          animation: glitchMain 0.4s steps(1) infinite;
        }

        @keyframes glitchR {
          0%   { transform: translate(4px, -2px); }
          25%  { transform: translate(-3px, 1px); }
          50%  { transform: translate(2px, 3px); }
          75%  { transform: translate(-4px, -1px); }
          100% { transform: translate(3px, 2px); }
        }

        @keyframes glitchC {
          0%   { transform: translate(-4px, 2px); }
          25%  { transform: translate(3px, -1px); }
          50%  { transform: translate(-2px, -3px); }
          75%  { transform: translate(4px, 1px); }
          100% { transform: translate(-3px, -2px); }
        }

        @keyframes glitchMain {
          0%, 100% { clip-path: inset(0 0 0 0); }
          10%  { clip-path: inset(20% 0 60% 0); }
          20%  { clip-path: inset(0 0 0 0); }
          30%  { clip-path: inset(50% 0 10% 0); }
          40%  { clip-path: inset(0 0 0 0); }
          50%  { clip-path: inset(10% 0 70% 0); }
          60%  { clip-path: inset(0 0 0 0); }
          70%  { clip-path: inset(80% 0 5% 0); }
          80%  { clip-path: inset(0 0 0 0); }
          90%  { clip-path: inset(40% 0 30% 0); }
        }

        /* ── SCANLINES ── */
        .glitch-scanlines {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          opacity: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 2px,
            rgba(0, 0, 0, 0.15) 4px
          );
          transition: opacity 0.3s ease;
        }
        .glitching .glitch-scanlines {
          opacity: 1;
        }

        /* ── CAPTION ── */
        .glitch-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 5;
          padding: 12px 16px;
          background: linear-gradient(transparent, rgba(13, 2, 33, 0.9));
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }
        .miles-gallery-item:hover .glitch-caption {
          transform: translateY(0);
        }
        .glitch-caption-text {
          font-family: 'Bangers', cursive;
          font-size: 1rem;
          letter-spacing: 2px;
          color: #ff2d95;
          text-shadow: 0 0 8px rgba(255, 45, 149, 0.5);
          text-transform: uppercase;
        }

        /* ── Neon corner accents on hover ── */
        .miles-gallery-item::before,
        .miles-gallery-item::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          z-index: 6;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .miles-gallery-item::before {
          top: 6px;
          left: 6px;
          border-top: 2px solid #ff2d95;
          border-left: 2px solid #ff2d95;
        }
        .miles-gallery-item::after {
          bottom: 6px;
          right: 6px;
          border-bottom: 2px solid #00d4ff;
          border-right: 2px solid #00d4ff;
        }
        .miles-gallery-item:hover::before,
        .miles-gallery-item:hover::after {
          opacity: 1;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .miles-gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 220px;
          }
          .miles-gallery-item--0 {
            grid-column: span 2;
            grid-row: span 1;
          }
          .miles-gallery-item--3 {
            grid-column: span 1;
            grid-row: span 1;
          }
        }

        @media (max-width: 768px) {
          .miles-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
            gap: 8px;
          }
          .miles-gallery-item--0,
          .miles-gallery-item--3,
          .miles-gallery-item--5 {
            grid-column: span 1;
            grid-row: span 1;
          }
        }

        @media (max-width: 480px) {
          .miles-gallery-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 250px;
          }
        }
      `}</style>
    </section>
  );
}
