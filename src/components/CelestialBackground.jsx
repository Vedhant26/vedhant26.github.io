import React, { useEffect, useRef } from 'react';

const CelestialBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // --- Stars ---
        // Each star follows a reverse-parabola arc from left to right.
        // As t goes 0→1, x moves left→right, y arcs UPWARD in the middle then back down.
        // y(t) = baseY - amplitude * 4 * t * (1 - t)
        const STAR_COUNT = 120;
        const stars = [];

        const createStar = (randomT) => {
            const baseY = Math.random() * height;          // starting & ending y
            const amplitude = Math.random() * 120 + 30;    // how high the arc goes
            return {
                t: randomT ? Math.random() : 0,            // parametric progress 0→1
                baseY,
                amplitude,
                radius: Math.random() * 1.8 + 0.2,
                baseAlpha: Math.random() * 0.6 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleOffset: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.0006 + 0.0002,    // t increment per frame
            };
        };

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(createStar(true)); // stagger initial positions
        }

        // Get star position from parametric t
        const getStarPos = (star) => {
            const x = star.t * (width + 20) - 10; // slight overshoot for smooth wrap
            const y = star.baseY - star.amplitude * 4 * star.t * (1 - star.t);
            return { x, y };
        };

        // --- Comet (prominent, reverse parabola arc) ---
        let comet = null;
        const spawnComet = () => {
            const startY = height * (0.55 + Math.random() * 0.3);
            comet = {
                startX: -40,
                startY,
                apexX: width * (0.35 + Math.random() * 0.3),
                apexY: height * (0.08 + Math.random() * 0.15),
                endX: width + 60,
                endY: height * (0.4 + Math.random() * 0.35),
                t: 0,
                speed: 0.0012 + Math.random() * 0.001,
                brightness: 1,
            };
        };

        const bezier = (t, p0, p1, p2) =>
            (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

        const getCometPos = (c, t) => ({
            x: bezier(t, c.startX, c.apexX, c.endX),
            y: bezier(t, c.startY, c.apexY, c.endY),
        });

        // --- Small shooting stars ---
        const shootingStars = [];
        const spawnShootingStar = () => {
            shootingStars.push({
                x: Math.random() * width * 0.8,
                y: Math.random() * height * 0.3,
                length: Math.random() * 80 + 40,
                speed: Math.random() * 8 + 6,
                angle: (Math.random() * 20 + 20) * (Math.PI / 180),
                alpha: 1,
                decay: Math.random() * 0.015 + 0.01,
            });
        };

        let time = 0;
        let lastShootingStar = 0;
        let lastComet = -600;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            time += 1;

            // --- Draw stars following reverse-parabola arcs ---
            stars.forEach((star) => {
                star.t += star.speed;
                // wrap around when off-screen
                if (star.t > 1) {
                    star.t = 0;
                    star.baseY = Math.random() * height;
                    star.amplitude = Math.random() * 120 + 30;
                }

                const { x, y } = getStarPos(star);
                const alpha =
                    star.baseAlpha +
                    Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3;

                // Fade in/out at edges for smooth appearance
                let edgeFade = 1;
                if (star.t < 0.05) edgeFade = star.t / 0.05;
                else if (star.t > 0.95) edgeFade = (1 - star.t) / 0.05;

                ctx.beginPath();
                ctx.arc(x, y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(
                    0.05,
                    Math.min(1, alpha * edgeFade)
                )})`;
                ctx.fill();
            });

            // --- Shooting stars ---
            if (time - lastShootingStar > 300 + Math.random() * 400) {
                spawnShootingStar();
                lastShootingStar = time;
            }

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i];
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.alpha -= s.decay;

                if (s.alpha <= 0) {
                    shootingStars.splice(i, 1);
                    continue;
                }

                const tailX = s.x - Math.cos(s.angle) * s.length;
                const tailY = s.y - Math.sin(s.angle) * s.length;

                const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
                grad.addColorStop(0, 'transparent');
                grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(s.x, s.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
                ctx.fill();
            }

            // --- Comet (reverse parabola arc, left → right) ---
            if (!comet && time - lastComet > 500 + Math.random() * 400) {
                spawnComet();
                lastComet = time;
            }

            if (comet) {
                comet.t += comet.speed;
                if (comet.t >= 1) {
                    comet = null;
                } else {
                    const head = getCometPos(comet, comet.t);

                    // Tail (series of past positions)
                    const TAIL_SEGMENTS = 30;
                    for (let j = TAIL_SEGMENTS; j >= 0; j--) {
                        const tt = comet.t - (j / TAIL_SEGMENTS) * 0.12;
                        if (tt < 0) continue;
                        const pos = getCometPos(comet, tt);
                        const segAlpha =
                            ((TAIL_SEGMENTS - j) / TAIL_SEGMENTS) *
                            0.6 *
                            comet.brightness;
                        const segRadius =
                            ((TAIL_SEGMENTS - j) / TAIL_SEGMENTS) * 2.5 + 0.5;

                        ctx.beginPath();
                        ctx.arc(pos.x, pos.y, segRadius, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(200, 220, 255, ${segAlpha})`;
                        ctx.fill();
                    }

                    // Glow
                    const glowGrad = ctx.createRadialGradient(
                        head.x, head.y, 0, head.x, head.y, 18
                    );
                    glowGrad.addColorStop(
                        0,
                        `rgba(180, 210, 255, ${0.5 * comet.brightness})`
                    );
                    glowGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = glowGrad;
                    ctx.fillRect(head.x - 18, head.y - 18, 36, 36);

                    // Head
                    ctx.beginPath();
                    ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${comet.brightness})`;
                    ctx.fill();
                }
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current)
                cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
            }}
        />
    );
};

export default CelestialBackground;
