import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A thin scroll progress indicator bar fixed at the top of the viewport.
 * Uses GSAP ScrollTrigger for smooth, performant tracking.
 * Respects prefers-reduced-motion.
 */
const ScrollProgress = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            setVisible(false);
            return;
        }

        // Create a ScrollTrigger that maps full page scroll to scaleX of the bar
        const trigger = ScrollTrigger.create({
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                const bar = document.getElementById('scroll-progress-bar');
                if (bar) {
                    bar.style.transform = `scaleX(${self.progress})`;
                }
            },
        });

        return () => {
            trigger.kill();
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                zIndex: 9999,
                pointerEvents: 'none',
                background: 'transparent',
            }}
        >
            <div
                id="scroll-progress-bar"
                style={{
                    height: '100%',
                    width: '100%',
                    transformOrigin: 'left center',
                    transform: 'scaleX(0)',
                    background: 'linear-gradient(90deg, #cc5500, #ffbf00)',
                    boxShadow: '0 0 8px rgba(255, 191, 0, 0.4), 0 0 20px rgba(204, 85, 0, 0.2)',
                    willChange: 'transform',
                }}
            />
        </div>
    );
};

export default ScrollProgress;
