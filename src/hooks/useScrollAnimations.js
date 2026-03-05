import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useCinematicScroll
 *
 * A cinematic scroll animation system using GSAP ScrollTrigger.
 * Designed to layer on top of existing Framer Motion layouts
 * without modifying structure, spacing, or typography.
 *
 * Features:
 *   1. Hero pinning — pins .hero-section for immersive storytelling
 *   2. Master reveal timeline — coordinated section-by-section reveals
 *   3. Scrub-based parallax — smooth scroll-linked movement
 *   4. Staggered children — cards/grids animate in sequence
 *   5. Scale-in effect — 0.95 → 1 subtle zoom
 *   6. Respects prefers-reduced-motion
 *   7. Mobile performant — uses will-change, simpler animations on touch
 */
export default function useScrollAnimations(containerRef) {
    const ctxRef = useRef(null);

    useEffect(() => {
        if (!containerRef?.current) return;

        // Respect reduced motion preference
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const isMobile = window.innerWidth < 768;

        // Wait for Framer Motion page transition to settle, then use rAF for layout
        const timer = setTimeout(() => {
            // Use rAF to ensure the browser has finished layout/paint
            requestAnimationFrame(() => {
                const container = containerRef.current;
                if (!container) return;

                ctxRef.current = gsap.context(() => {

                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    // 1. HERO PINNING — Immersive entrance
                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    const heroSection = container.querySelector('.hero-section');
                    if (heroSection) {
                        const heroContent = heroSection.querySelector('.hero-content');
                        const celestialBg = heroSection.querySelector('canvas') ||
                            heroSection.firstElementChild;

                        // Pin the hero so user scrolls "through" it
                        ScrollTrigger.create({
                            trigger: heroSection,
                            start: 'top top',
                            end: '+=50%',
                            pin: true,
                            pinSpacing: true,
                            scrub: true,
                        });

                        // Scrub: Hero content fades + drifts upward as user scrolls past
                        if (heroContent) {
                            gsap.to(heroContent, {
                                y: -60,
                                opacity: 0,
                                scale: 0.97,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: heroSection,
                                    start: 'top top',
                                    end: '+=50%',
                                    scrub: 0.8,
                                },
                            });
                        }

                        // Scrub: Background zooms subtly for depth
                        if (celestialBg) {
                            gsap.to(celestialBg, {
                                scale: 1.1,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: heroSection,
                                    start: 'top top',
                                    end: '+=50%',
                                    scrub: 1,
                                },
                            });
                        }
                    }

                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    // 2. MASTER REVEAL SYSTEM
                    //    Coordinated section-by-section reveals
                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    // Section reveals — fade + translateY + scale
                    gsap.utils.toArray('.gsap-reveal-section').forEach((section) => {
                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 85%',
                                end: 'top 40%',
                                once: true,
                            },
                        });

                        tl.from(section, {
                            y: 70,
                            opacity: 0,
                            scale: 0.95,
                            duration: 1.1,
                            ease: 'power3.out',
                        });
                    });

                    // Heading reveals — fade + lift
                    gsap.utils.toArray('.gsap-reveal-heading').forEach((heading) => {
                        gsap.from(heading, {
                            y: 45,
                            opacity: 0,
                            scale: 0.97,
                            duration: 0.95,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: heading,
                                start: 'top 85%',
                                once: true,
                            },
                        });
                    });

                    // Text paragraphs — softer fade + lift
                    gsap.utils.toArray('.gsap-reveal-text').forEach((text) => {
                        gsap.from(text, {
                            y: 30,
                            opacity: 0,
                            duration: 0.9,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: text,
                                start: 'top 88%',
                                once: true,
                            },
                        });
                    });

                    // Image reveals — scale-in + fade
                    gsap.utils.toArray('.gsap-reveal-image').forEach((img) => {
                        gsap.from(img, {
                            scale: 0.92,
                            opacity: 0,
                            duration: 1.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: img,
                                start: 'top 85%',
                                once: true,
                            },
                        });
                    });

                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    // 3. STAGGERED CHILDREN
                    //    Cards/grids animate in sequence
                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    gsap.utils.toArray('.gsap-stagger-children').forEach((parent) => {
                        const children = parent.children;
                        if (!children.length) return;

                        gsap.from(children, {
                            y: 50,
                            opacity: 0,
                            scale: 0.95,
                            duration: 1,
                            ease: 'power3.out',
                            stagger: {
                                each: 0.15,
                                from: 'start',
                            },
                            scrollTrigger: {
                                trigger: parent,
                                start: 'top 82%',
                                once: true,
                            },
                        });
                    });

                    // Individual card reveals with scale-in
                    gsap.utils.toArray('.gsap-reveal-card').forEach((card) => {
                        gsap.from(card, {
                            y: 60,
                            opacity: 0,
                            scale: 0.95,
                            duration: 1.05,
                            ease: 'expo.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 88%',
                                once: true,
                            },
                        });
                    });

                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    // 4. SCRUB-BASED PARALLAX
                    //    Smooth scroll-linked position shifts
                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    // Light parallax for marked elements
                    gsap.utils.toArray('[data-parallax]').forEach((el) => {
                        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
                        const yShift = isMobile ? 30 * speed : 60 * speed;

                        gsap.fromTo(el,
                            { y: yShift },
                            {
                                y: -yShift,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top bottom',
                                    end: 'bottom top',
                                    scrub: 1.5,
                                },
                            }
                        );
                    });

                    // Scrub-based section drift — sections shift subtly as they scroll through
                    gsap.utils.toArray('.gsap-scrub-drift').forEach((el) => {
                        gsap.fromTo(el,
                            { y: 25 },
                            {
                                y: -25,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top bottom',
                                    end: 'bottom top',
                                    scrub: 2,
                                },
                            }
                        );
                    });

                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    // 5. SECTION DIVIDER LINES
                    //    Decorative lines that draw-in on scroll
                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    gsap.utils.toArray('.gsap-draw-line').forEach((line) => {
                        gsap.from(line, {
                            scaleX: 0,
                            transformOrigin: 'left center',
                            duration: 1.2,
                            ease: 'power3.inOut',
                            scrollTrigger: {
                                trigger: line,
                                start: 'top 90%',
                                once: true,
                            },
                        });
                    });

                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    // 6. SCRUB FADE — Elements that fade
                    //    smoothly based on scroll position
                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    gsap.utils.toArray('.gsap-scrub-fade').forEach((el) => {
                        gsap.fromTo(el,
                            { opacity: 0, y: 40 },
                            {
                                opacity: 1,
                                y: 0,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 90%',
                                    end: 'top 50%',
                                    scrub: 1,
                                },
                            }
                        );
                    });

                    // Refresh ScrollTrigger after all animations are registered
                    ScrollTrigger.refresh();

                }, container);
            });
        }, 350); // Wait for Framer Motion page transition (250ms) + buffer

        return () => {
            clearTimeout(timer);
            if (ctxRef.current) {
                ctxRef.current.revert(); // This kills all ScrollTriggers created within the context
                ctxRef.current = null;
            }
        };
    }, [containerRef]);
}
