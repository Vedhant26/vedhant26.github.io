// NewAboutPage.jsx — Dual-Reality About Section
// Miles Morales Spider-Verse × 90's Nintendo Retro-Verse
import React from 'react';
import { createPortal } from 'react-dom';
import { AboutThemeProvider, useAboutTheme } from './about-theme-context';
import DimensionSwitch from './components/dimension-switch';
import SymbioteTransition from './components/symbiote-transition';
import PageWrapper from '../components/PageWrapper';
import './about.css';

// Eager-load both realities' components for instant swap
import MilesHero from './components/miles/MilesHero';
import MilesIntro from './components/miles/MilesIntro';
import MilesGallery from './components/miles/MilesGallery';
import MilesBio from './components/miles/MilesBio';
import MilesJourney from './components/miles/MilesJourney';
import MilesHallOfFame from './components/miles/MilesHallOfFame';
import MilesSkills from './components/miles/MilesSkills';
import MilesConnect from './components/miles/MilesConnect';

import RetroHero from './components/retro/RetroHero';
import RetroIntro from './components/retro/RetroIntro';
import RetroGallery from './components/retro/RetroGallery';
import RetroBio from './components/retro/RetroBio';
import RetroJourney from './components/retro/RetroJourney';
import RetroHallOfFame from './components/retro/RetroHallOfFame';
import RetroSkills from './components/retro/RetroSkills';
import RetroConnect from './components/retro/RetroConnect';

function KonamiOverlay() {
  const { konamiActivated, dismissKonami } = useAboutTheme();
  if (!konamiActivated) return null;

  return (
    <div className="konami-overlay" onClick={dismissKonami} role="dialog" aria-label="Easter egg activated">
      <div className="konami-text">
        🎮 KONAMI CODE ACTIVATED! 🎮
      </div>
      <div className="konami-sub">
        +30 LIVES<br />
        YOU FOUND THE SECRET!<br />
        ↑↑↓↓←→←→BA
      </div>
      <div style={{ fontSize: '3rem', animation: 'starPop 0.8s ease forwards' }}>
        🏆
      </div>
      <button className="konami-dismiss" onClick={dismissKonami}>
        PRESS START
      </button>
    </div>
  );
}

// Portal overlays — rendered to document.body to escape stacking contexts
function PortalOverlays() {
  const { currentReality } = useAboutTheme();

  return (
    <>
      {createPortal(
        <div data-reality={currentReality} style={{ display: 'contents' }}>
          <DimensionSwitch />
        </div>,
        document.body
      )}
      {createPortal(
        <div data-reality={currentReality}>
          <SymbioteTransition />
        </div>,
        document.body
      )}
      {createPortal(
        <div data-reality={currentReality}>
          <KonamiOverlay />
        </div>,
        document.body
      )}
    </>
  );
}

function AboutContent() {
  const { currentReality } = useAboutTheme();

  return (
    <>
      {/* Global background effects */}
      {currentReality === 'miles' && (
        <>
          <div className="miles-halftone-bg" />
          <div className="miles-scanlines" />
        </>
      )}
      {currentReality === 'retro' && (
        <div className="retro-scanlines-bg" />
      )}

      {/* Portal-based overlays (outside stacking context) */}
      <PortalOverlays />

      {/* Reality-specific content */}
      <main
        className="relative"
        style={{ paddingTop: 0, minHeight: '100vh' }}
        role="main"
        aria-label={`About section - ${currentReality === 'miles' ? 'Spider-Verse' : 'Retro'} theme`}
      >
        {currentReality === 'miles' ? (
          <>
            <MilesHero />
            <MilesIntro />
            <MilesGallery />
            <MilesBio />
            <MilesJourney />
            <MilesHallOfFame />
            <MilesSkills />
            <MilesConnect />
          </>
        ) : (
          <>
            <RetroHero />
            <RetroIntro />
            <RetroGallery />
            <RetroBio />
            <RetroJourney />
            <RetroHallOfFame />
            <RetroSkills />
            <RetroConnect />
          </>
        )}
      </main>
    </>
  );
}

export default function NewAboutPage() {
  return (
    <PageWrapper>
      <div style={{ marginTop: '-100px' }}>
        <AboutThemeProvider>
          <AboutContent />
        </AboutThemeProvider>
      </div>
    </PageWrapper>
  );
}
