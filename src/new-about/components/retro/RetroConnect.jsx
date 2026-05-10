// RetroConnect.jsx — Player select screen + game menu
import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks, bio, footerLinks } from '../../shared-data';

export default function RetroConnect() {
  return (
    <section className="about-section" style={{ background: 'var(--r-bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
      {/* Star field background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute', width: '2px', height: '2px', background: '#fff',
            left: `${(i * 41 + 11) % 100}%`, top: `${(i * 29 + 17) % 100}%`,
            opacity: 0.2 + (i % 3) * 0.1,
            animation: `retroBlink ${2 + i % 4}s ${i * 0.3}s step-start infinite`,
            imageRendering: 'pixelated',
          }} />
        ))}
      </div>

      <div className="about-section-inner" style={{ maxWidth: '800px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="about-section-title" style={{ textAlign: 'center', color: 'var(--r-accent-2)', marginBottom: '0.5rem' }}>SELECT PLAYER</h2>
          <p className="hud-element" style={{ color: 'var(--r-text-muted)', marginBottom: '3rem' }}>CHOOSE YOUR PLATFORM</p>

          {/* Player select grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))', gap: '12px', marginBottom: '3rem' }}>
            {socialLinks.map((social, i) => (
              <motion.a key={i} href={social.link} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}
                className="rpg-dialog"
                style={{
                  textDecoration: 'none', display: 'block', textAlign: 'center',
                  padding: '1.2rem', cursor: 'pointer', transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--r-accent-1)'; e.currentTarget.style.boxShadow = '0 0 15px var(--r-glow-1), 6px 6px 0 rgba(0,0,0,0.6)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--r-accent-2)'; e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.6)'; }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{social.retroChar}</div>
                <h3 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.55rem', color: 'var(--r-accent-2)', marginBottom: '6px' }}>
                  {social.label.toUpperCase()}
                </h3>
                <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem', color: 'var(--r-text-muted)', lineHeight: 1.8 }}>
                  {social.value}
                </p>
                {/* READY indicator on hover (CSS only) */}
              </motion.a>
            ))}
          </div>

          {/* Game menu style CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <motion.a whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}
              href={`mailto:${bio.email}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem',
                color: 'var(--r-accent-2)', textDecoration: 'none', padding: '12px 24px',
                border: '3px solid var(--r-accent-2)',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--r-accent-2)'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--r-accent-2)'; }}
            >
              <span>▶</span> SEND EMAIL
            </motion.a>
            <motion.a whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}
              href={bio.resumeUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem',
                color: 'var(--r-accent-1)', textDecoration: 'none', padding: '12px 24px',
                border: '3px solid var(--r-accent-1)',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--r-accent-1)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--r-accent-1)'; }}
            >
              <span>▶</span> VIEW RESUME
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '3rem 1.5rem 2rem', textAlign: 'center', borderTop: '2px solid var(--r-border)', marginTop: '4rem' }}>
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem', color: 'var(--r-text-muted)', marginBottom: '1rem', lineHeight: 2 }}>
          (C) {new Date().getFullYear()} VEDHANT BIDARI. ALL RIGHTS RESERVED.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          {footerLinks.map((fl, i) => (
            <a key={i} href={fl.link} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.5rem', color: 'var(--r-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--r-accent-2)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--r-text-muted)'}>
              {fl.icon.toUpperCase()}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}
