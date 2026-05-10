// symbiote-transition.jsx — Full-screen glitch reality transition
// RGB splits, slice displacement, noise bursts, scanline tears

import { useEffect, useRef } from 'react';
import { useAboutTheme } from '../about-theme-context';

export default function SymbioteTransition() {
  const containerRef = useRef(null);
  const { isTransitioning, completeTransition, prefersReducedMotion } = useAboutTheme();
  const animFrameRef = useRef(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    if (!isTransitioning || prefersReducedMotion || isRunningRef.current) {
      if (isTransitioning && prefersReducedMotion) {
        completeTransition();
      }
      return;
    }

    isRunningRef.current = true;

    const container = containerRef.current;
    if (!container) {
      isRunningRef.current = false;
      return;
    }

    // Clear any previous children
    container.innerHTML = '';

    const TOTAL_DURATION = 850;
    const SWAP_AT = 0.5;
    let swapped = false;

    // === LAYER 1: Static noise canvas ===
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.style.cssText = `
      position: fixed; inset: 0; width: 100vw; height: 100vh;
      z-index: 1; opacity: 0;
    `;
    container.appendChild(noiseCanvas);
    const nCtx = noiseCanvas.getContext('2d');
    noiseCanvas.width = 300;
    noiseCanvas.height = 200;

    // === LAYER 2: Horizontal slice container ===
    const sliceContainer = document.createElement('div');
    sliceContainer.style.cssText = `
      position: fixed; inset: 0; z-index: 2; overflow: hidden;
      pointer-events: none;
    `;
    container.appendChild(sliceContainer);

    // === LAYER 3: RGB split overlays ===
    const rgbOverlay = document.createElement('div');
    rgbOverlay.style.cssText = `
      position: fixed; inset: 0; z-index: 3; pointer-events: none;
      mix-blend-mode: screen; opacity: 0;
    `;
    container.appendChild(rgbOverlay);

    // === LAYER 4: Flash overlay ===
    const flashOverlay = document.createElement('div');
    flashOverlay.style.cssText = `
      position: fixed; inset: 0; z-index: 4; pointer-events: none;
      background: white; opacity: 0;
    `;
    container.appendChild(flashOverlay);

    // === LAYER 5: Scanline tear bars ===
    const tearContainer = document.createElement('div');
    tearContainer.style.cssText = `
      position: fixed; inset: 0; z-index: 5; pointer-events: none;
      overflow: hidden;
    `;
    container.appendChild(tearContainer);

    // Create random horizontal tear bars
    function spawnTears(count) {
      tearContainer.innerHTML = '';
      for (let i = 0; i < count; i++) {
        const tear = document.createElement('div');
        const top = Math.random() * 100;
        const height = 1 + Math.random() * 4;
        const offsetX = (Math.random() - 0.5) * 60;
        const colors = [
          'rgba(255,45,149,0.6)',
          'rgba(0,212,255,0.6)',
          'rgba(255,238,0,0.5)',
          'rgba(191,90,242,0.5)',
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        tear.style.cssText = `
          position: absolute;
          top: ${top}%;
          left: 0; right: 0;
          height: ${height}px;
          background: ${color};
          transform: translateX(${offsetX}px);
          box-shadow: 0 0 8px ${color};
        `;
        tearContainer.appendChild(tear);
      }
    }

    // Create horizontal displacement slices
    function spawnSlices(count) {
      sliceContainer.innerHTML = '';
      for (let i = 0; i < count; i++) {
        const slice = document.createElement('div');
        const top = Math.random() * 100;
        const height = 2 + Math.random() * 30;
        const offsetX = (Math.random() - 0.5) * 80;
        const skew = (Math.random() - 0.5) * 5;
        slice.style.cssText = `
          position: absolute;
          top: ${top}%;
          left: -5%; right: -5%;
          height: ${height}px;
          background: rgba(0, 0, 0, 0.85);
          transform: translateX(${offsetX}px) skewX(${skew}deg);
        `;
        sliceContainer.appendChild(slice);
      }
    }

    // Draw noise static
    function drawNoise() {
      const imageData = nCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = Math.random() * 200;
      }
      nCtx.putImageData(imageData, 0, 0);
    }

    // === ANIMATION TIMELINE ===
    const startTime = performance.now();

    function animate(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / TOTAL_DURATION);

      // --- Phase 1: Glitch ramp-up (0% – 50%) ---
      if (progress < SWAP_AT) {
        const p = progress / SWAP_AT; // 0→1 within phase
        const intensity = p * p; // ease-in quadratic

        // Noise layer
        drawNoise();
        noiseCanvas.style.opacity = (0.15 + intensity * 0.5).toString();

        // RGB split
        const split = Math.floor(intensity * 15);
        rgbOverlay.style.opacity = (intensity * 0.7).toString();
        rgbOverlay.style.background = `
          linear-gradient(90deg,
            rgba(255,0,50,${0.15 * intensity}) 0%,
            transparent ${50 - split}%,
            transparent ${50 + split}%,
            rgba(0,150,255,${0.15 * intensity}) 100%
          )
        `;

        // Tears & slices — more as intensity grows
        if (Math.random() < 0.3 + intensity * 0.5) {
          spawnTears(Math.floor(3 + intensity * 20));
        }
        if (Math.random() < 0.2 + intensity * 0.4) {
          spawnSlices(Math.floor(2 + intensity * 8));
        }

        // Screen shake via CSS on the root
        const shakeX = (Math.random() - 0.5) * intensity * 20;
        const shakeY = (Math.random() - 0.5) * intensity * 10;
        document.documentElement.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
      }

      // --- Phase 2: FLASH + SWAP (at 50%) ---
      if (progress >= SWAP_AT && !swapped) {
        swapped = true;

        // White flash
        flashOverlay.style.opacity = '1';

        // Full noise burst
        noiseCanvas.style.opacity = '0.9';
        drawNoise();

        // Big displacement
        spawnSlices(15);
        spawnTears(30);

        // Swap the reality content
        completeTransition();

        // Fade flash
        setTimeout(() => {
          flashOverlay.style.transition = 'opacity 0.2s ease-out';
          flashOverlay.style.opacity = '0';
        }, 40);
      }

      // --- Phase 3: Glitch wind-down (50% – 100%) ---
      if (progress >= SWAP_AT && progress < 1) {
        const p = (progress - SWAP_AT) / (1 - SWAP_AT); // 0→1
        const decay = 1 - p * p; // quadratic ease-out decay

        drawNoise();
        noiseCanvas.style.opacity = (decay * 0.4).toString();

        rgbOverlay.style.opacity = (decay * 0.5).toString();
        const split = Math.floor(decay * 10);
        rgbOverlay.style.background = `
          linear-gradient(90deg,
            rgba(255,0,50,${0.1 * decay}) 0%,
            transparent ${50 - split}%,
            transparent ${50 + split}%,
            rgba(0,150,255,${0.1 * decay}) 100%
          )
        `;

        if (Math.random() < decay * 0.4) {
          spawnTears(Math.floor(decay * 12));
        } else if (p > 0.5) {
          tearContainer.innerHTML = '';
        }

        if (Math.random() < decay * 0.3) {
          spawnSlices(Math.floor(decay * 5));
        } else if (p > 0.6) {
          sliceContainer.innerHTML = '';
        }

        const shakeX = (Math.random() - 0.5) * decay * 12;
        const shakeY = (Math.random() - 0.5) * decay * 6;
        document.documentElement.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
      }

      // --- Done ---
      if (progress >= 1) {
        document.documentElement.style.transform = '';
        container.innerHTML = '';
        isRunningRef.current = false;
        return;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    // Cleanup only on unmount — NOT on isTransitioning changes
    // The animation manages its own lifecycle via isRunningRef
  }, [isTransitioning, prefersReducedMotion, completeTransition]);

  // Cleanup on unmount only
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      document.documentElement.style.transform = '';
      isRunningRef.current = false;
    };
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="glitch-transition-overlay"
      aria-hidden="true"
    />
  );
}
