// hero-section.jsx

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import InteractivePortrait from "./interactive-portrait"
import SignatureMarqueeSection from "./signature-marquee-section"

export default function HeroSection() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001,
  })

  // Phase 1: Shrink Portrait (0% -> 40%)
  const scale = useTransform(smoothProgress, [0, 0.4], [1, 0.45])

  // Phase 2: Text Parallax (0% -> 80%)
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1])

  // Phase 3: Exit (80% -> 100%)
  const exitY = useTransform(smoothProgress, [0.85, 1], ["0%", "-100%"])
  const exitOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0])

  const handleScrollDown = () => {
    if (containerRef.current) {
      const sectionBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight
      window.scrollTo({ top: sectionBottom, behavior: 'smooth' })
    }
  }

  return (
    <section ref={containerRef} id="about-hero" className="relative transition-colors duration-500" style={{ height: '200vh', background: '#1a1f1a' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: '#1a1f1a' }}>
        {/* Background Text Layer */}
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          style={{
            y: exitY,
            opacity: exitOpacity,
          }}
        >
          <motion.div
            className="w-full h-full flex items-center justify-center opacity-0"
            style={{ opacity: textOpacity }}
          >
            <SignatureMarqueeSection />
          </motion.div>
        </motion.div>

        {/* Foreground Portrait Layer */}
        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center"
          style={{
            scale: scale,
            y: exitY,
            opacity: exitOpacity,
          }}
        >
          <InteractivePortrait />
        </motion.div>

        {/* Mobile Scroll Down Button — right side, only visible on small screens */}
        <button
          onClick={handleScrollDown}
          aria-label="Scroll down"
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '1.5rem',
            zIndex: 50,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(204, 85, 0, 0.85)',
            border: '2px solid rgba(255, 191, 0, 0.6)',
            color: '#fff',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(204, 85, 0, 0.4)',
            animation: 'scrollBtnBounce 2s ease-in-out infinite',
          }}
          className="mobile-scroll-btn"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Inline styles for mobile-only visibility + bounce animation */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-scroll-btn {
            display: flex !important;
          }
        }
        @keyframes scrollBtnBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}
