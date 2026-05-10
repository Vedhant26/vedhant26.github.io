// MilesConnect.jsx — Neon signs on a dark Brooklyn street
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, ExternalLink } from 'lucide-react';
import { socialLinks, bio, footerLinks } from '../../shared-data';

const iconMap = { mail: Mail, github: Github, linkedin: Linkedin, instagram: Instagram };

const neonColors = ['#ff2d95', '#00d4ff', '#0077b5', '#ff6ec7'];

export default function MilesConnect() {
  return (
    <section className="about-section" style={{ background: 'var(--r-bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
      {/* Street ambiance */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at bottom, rgba(255,45,149,0.05), transparent 70%)', pointerEvents: 'none' }} />

      <div className="about-section-inner" style={{ maxWidth: '800px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="about-section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Let's Connect</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--r-text-muted)', marginBottom: '3rem', fontFamily: 'Inter, sans-serif' }}>Find me across the multiverse</p>

          {/* Neon social cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            {socialLinks.map((social, i) => {
              const Icon = iconMap[social.icon] || Mail;
              const neon = neonColors[i % neonColors.length];
              return (
                <motion.a key={i} href={social.link} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
                  style={{ background: 'var(--r-bg-card)', padding: '1.5rem', borderRadius: '4px', textDecoration: 'none', color: neon, border: `2px solid ${neon}40`, transition: 'all 0.3s ease', display: 'block' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = neon; e.currentTarget.style.boxShadow = `0 0 15px ${neon}60, 0 0 30px ${neon}30, inset 0 0 15px ${neon}10`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${neon}40`; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <Icon style={{ width: 28, height: 28, margin: '0 auto', filter: `drop-shadow(0 0 8px ${neon})` }} />
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.95rem', fontFamily: 'Bangers, cursive', letterSpacing: '2px' }}>{social.label}</h3>
                  <p style={{ fontSize: '0.75rem', opacity: 0.7, fontFamily: 'Inter, sans-serif' }}>{social.value}</p>
                </motion.a>
              );
            })}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href={`mailto:${bio.email}`}
              className="neon-element"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: 'var(--r-accent-1)', color: '#fff', borderRadius: '4px', fontWeight: 700, textDecoration: 'none', fontFamily: 'Bangers, cursive', letterSpacing: '2px', fontSize: '1rem', border: '2px solid var(--r-accent-1)', boxShadow: '0 0 20px var(--r-glow-1)' }}>
              <Mail style={{ width: 18, height: 18 }} /> SEND EMAIL
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href={bio.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="neon-element"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: 'transparent', border: '2px solid var(--r-accent-2)', color: 'var(--r-accent-2)', borderRadius: '4px', fontWeight: 700, textDecoration: 'none', fontFamily: 'Bangers, cursive', letterSpacing: '2px', fontSize: '1rem', boxShadow: '0 0 10px var(--r-glow-2)' }}>
              <ExternalLink style={{ width: 18, height: 18 }} /> VIEW RESUME
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '3rem 1.5rem 2rem', textAlign: 'center', borderTop: '1px solid var(--r-border)', marginTop: '4rem' }}>
        <p style={{ color: 'var(--r-text-muted)', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
          © {new Date().getFullYear()} {bio.name}. Crafted in the Spider-Verse.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          {footerLinks.map((fl, i) => {
            const Icon = iconMap[fl.icon] || Mail;
            return (
              <a key={i} href={fl.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--r-text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--r-accent-1)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--r-text-muted)'}>
                <Icon style={{ width: 20, height: 20 }} />
              </a>
            );
          })}
        </div>
      </footer>
    </section>
  );
}
