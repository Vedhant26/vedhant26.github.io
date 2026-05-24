// dimension-switch.jsx — The reality toggle button
// Glitchy neon in Miles mode, Mario ? block in Retro mode

import { useAboutTheme } from '../about-theme-context';

export default function DimensionSwitch() {
  const { currentReality, toggleReality, isTransitioning } = useAboutTheme();

  return (
    <button
      className="dimension-switch"
      onClick={toggleReality}
      disabled={isTransitioning}
      aria-label={`Switch to ${currentReality === 'miles' ? 'Retro Nintendo' : 'Spider-Verse'} theme`}
      title={`Switch to ${currentReality === 'miles' ? 'Retro' : 'Spider-Verse'} Reality`}
      id="dimension-switch-btn"
    >
      <div className={`switch-hint-arrow ${currentReality}`}>
        <span>Switch Reality!</span>
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 50,90 Q 20,50 50,10" />
          <path d="M 35,25 L 50,10 L 65,25" />
        </svg>
      </div>

      {currentReality === 'miles' ? (
        <div className="switch-miles">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>SWITCH</span>
        </div>
      ) : (
        <div className="switch-retro">?</div>
      )}
    </button>
  );
}
