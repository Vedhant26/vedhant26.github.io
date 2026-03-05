import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import basketballImg from '../assets/basketball.png';
import hoopImg from '../assets/hoop.png';
import '@fontsource/dancing-script';

// ━━━ Hyperspace Warp Canvas ━━━
const HyperspaceWarp = ({ active }) => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        if (!active) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // High-DPI support
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const setSize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        setSize();

        const W = () => window.innerWidth;
        const H = () => window.innerHeight;

        // Create 800 stars in a 3D cylinder around the viewer
        const STAR_COUNT = 800;
        const stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 50 + Math.random() * 1500;
            stars.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                z: Math.random() * 2000,
                baseSize: Math.random() * 2 + 0.8,
                warmth: Math.random(),
                prevSX: null,
                prevSY: null,
            });
        }

        const startTime = performance.now();
        const DURATION = 3500;
        const FOCAL = 300;

        const draw = (now) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / DURATION, 1);

            const w = W();
            const h = H();
            const cx = w / 2;
            const cy = h / 2;

            // Speed: gentle start, massive exponential ramp
            const speedCurve = t < 0.12
                ? t * 4
                : Math.pow(t, 2.5) * 55 + 0.5;
            const speed = 1 + speedCurve;

            // ── Clear to solid black each frame ──
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, w, h);

            // ── Draw each star ──
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];

                s.z -= speed;

                if (s.z <= 1) {
                    const a = Math.random() * Math.PI * 2;
                    const r = 50 + Math.random() * 1500;
                    s.x = Math.cos(a) * r;
                    s.y = Math.sin(a) * r;
                    s.z = 1800 + Math.random() * 200;
                    s.prevSX = null;
                    s.prevSY = null;
                    continue;
                }

                const scale = FOCAL / s.z;
                const sx = s.x * scale + cx;
                const sy = s.y * scale + cy;

                if (sx < -100 || sx > w + 100 || sy < -100 || sy > h + 100) {
                    s.prevSX = null;
                    s.prevSY = null;
                    continue;
                }

                const depth = 1 - s.z / 2000;
                const brightness = Math.min(1, depth * 1.8);
                const dotSize = s.baseSize * scale * 2;

                // Star color: white to warm amber
                const r2 = 220 + Math.floor(s.warmth * 35);
                const g2 = 215 + Math.floor(s.warmth * 25);
                const b2 = 240 - Math.floor(s.warmth * 90);

                if (s.prevSX !== null && t > 0.06) {
                    const dx = sx - s.prevSX;
                    const dy = sy - s.prevSY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 0.5) {
                        const lineW = Math.min(dotSize * 0.9, 5);

                        // Gradient streak: transparent tail → bright head
                        const grad = ctx.createLinearGradient(
                            s.prevSX, s.prevSY, sx, sy
                        );
                        grad.addColorStop(0, `rgba(${r2}, ${g2}, ${b2}, 0)`);
                        grad.addColorStop(0.4, `rgba(${r2}, ${g2}, ${b2}, ${brightness * 0.5})`);
                        grad.addColorStop(1, `rgba(255, 255, 255, ${brightness})`);

                        ctx.beginPath();
                        ctx.moveTo(s.prevSX, s.prevSY);
                        ctx.lineTo(sx, sy);
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = lineW;
                        ctx.lineCap = 'round';
                        ctx.stroke();

                        // Bright head dot
                        if (dotSize > 0.8) {
                            ctx.beginPath();
                            ctx.arc(sx, sy, Math.min(dotSize * 0.5, 3.5), 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
                            ctx.fill();
                        }
                    }
                } else {
                    // Early phase: simple bright dot
                    ctx.beginPath();
                    ctx.arc(sx, sy, Math.max(dotSize * 0.6, 0.8), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r2}, ${g2}, ${b2}, ${brightness * 0.95})`;
                    ctx.fill();
                }

                s.prevSX = sx;
                s.prevSY = sy;
            }

            // ── Additive glow layer ──
            if (t > 0.25) {
                ctx.globalCompositeOperation = 'screen';
                const gi = (t - 0.25) * 0.7;
                const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.55);
                g1.addColorStop(0, `rgba(255, 230, 160, ${gi * 0.2})`);
                g1.addColorStop(0.5, `rgba(160, 120, 255, ${gi * 0.06})`);
                g1.addColorStop(1, 'transparent');
                ctx.fillStyle = g1;
                ctx.fillRect(0, 0, w, h);
                ctx.globalCompositeOperation = 'source-over';
            }

            // ── Cinematic vignette ──
            const vig = ctx.createRadialGradient(cx, cy, w * 0.2, cx, cy, w * 0.8);
            vig.addColorStop(0, 'transparent');
            vig.addColorStop(1, `rgba(0, 0, 0, ${0.35 + t * 0.15})`);
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, w, h);

            // ── Final white-out flash (last 30%) ──
            if (t > 0.7) {
                // Ramps from 0 to 1 between t=0.7 and t=0.9
                const f = Math.min((t - 0.7) / 0.2, 1);
                ctx.fillStyle = `rgba(255, 255, 255, ${f * f})`;
                ctx.fillRect(0, 0, w, h);
            }

            // Always continue loop until t=1 to ensure smooth progression
            if (t < 1) {
                animRef.current = requestAnimationFrame(draw);
            } else {
                // Keep drawing a solid white frame even after t=1 to prevent flicker
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, w, h);
                // We keep the loop alive slightly or just rely on the last frame
                // but since t is now 1, we don't need to request more frames
                // browser will keep the buffer.
            }
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [active]);

    if (!active) return null;

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 10001,
                pointerEvents: 'none',
                background: '#000',
            }}
        />
    );
};

const BasketballGame = () => {
    const navigate = useNavigate();
    const [scored, setScored] = useState(false);
    const hoopRef = useRef(null);
    const ballControls = useAnimation();
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleDragEnd = async (event, info) => {
        if (!hoopRef.current) return;

        const ballRect = event.target.getBoundingClientRect();
        const hoopRect = hoopRef.current.getBoundingClientRect();

        // Check horizontal alignment with forgiveness
        // The ball's horizontal center should be roughly within the hoop's horizontal range
        const ballCenterX = ballRect.left + ballRect.width / 2;
        const hoopLeft = hoopRect.left;
        const hoopRight = hoopRect.right;

        const isHorizontallyAligned = (
            ballCenterX > hoopLeft &&
            ballCenterX < hoopRight
        );

        // Check vertical alignment
        // The ball should not be dropped *below* the hoop's opening.
        // Since y increases downwards, ballRect.top should be less than hoopRect.bottom
        // We'll allow anything above the bottom of the hoop to count as a "drop in"
        const isVerticallyValid = ballRect.top < hoopRect.bottom;

        // Combined Success Condition
        // If it's in the vertical column above the hoop (or interacting with it), it counts.
        if (isHorizontallyAligned && isVerticallyValid && !scored) {
            setScored(true);
        } else {
            // Bounce on floor (return to y=0 relative to start)
            ballControls.start({
                y: 0,
                transition: { type: "spring", stiffness: 300, damping: 10, bounce: 0.8 }
            });
        }
    };

    useEffect(() => {
        if (scored) {
            // Navigate after warp reaches peak white
            const timer = setTimeout(() => {
                navigate('/journey');
            }, 3200);
            return () => clearTimeout(timer);
        }
    }, [scored, navigate]);

    // Responsive sizes
    const ballSize = isMobile ? 'clamp(80px, 22vw, 120px)' : '180px';
    const hoopSize = isMobile ? 'clamp(150px, 40vw, 220px)' : '350px';

    return (
        <>
            {/* === HYPERSPACE WARP TRANSITION === */}
            <HyperspaceWarp active={scored} />


            {/* Game Overlay */}
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: isMobile ? '60vh' : '90vh',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '2rem'
                }}
            >
                {/* Hint Overlay */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: isMobile ? '50%' : '80px',
                        left: isMobile ? '50%' : '240px',
                        transform: isMobile ? 'translate(-50%, 50%)' : 'none',
                        pointerEvents: 'none',
                        zIndex: 40,
                        display: scored ? 'none' : 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        gap: '10px',
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    {/* Arrow pointing Left towards ball */}
                    {!isMobile && (
                        <svg width="50" height="30" viewBox="0 0 50 30" fill="none" stroke="white" strokeWidth="3" style={{ opacity: 0.8, filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))' }}>
                            <path d="M 5 15 L 45 15" strokeLinecap="round" strokeDasharray="5,5" />
                            <path d="M 15 5 L 5 15 L 15 25" strokeLinecap="round" />
                        </svg>
                    )}
                    <div style={{
                        fontFamily: '"Dancing Script", cursive',
                        fontSize: isMobile ? '1.1rem' : '1.5rem',
                        color: '#fff',
                        textShadow: '0 0 10px rgba(0,0,0,0.8)',
                        whiteSpace: 'nowrap'
                    }}>
                        {isMobile ? 'Drag the ball to the basket!' : 'Drop me in the basket!'}
                    </div>
                </motion.div>
                {/* Hoop */}
                <motion.div
                    ref={hoopRef}
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
                    style={{
                        position: 'absolute',
                        bottom: isMobile ? '20px' : '50px',
                        right: isMobile ? '10px' : '50px',
                        width: hoopSize,
                        height: hoopSize,
                        pointerEvents: 'auto'
                    }}
                >
                    <img
                        src={hoopImg}
                        alt="Basketball Hoop"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </motion.div>

                {/* Ball */}
                <motion.div
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    animate={ballControls}
                    initial={{ x: isMobile ? -30 : -100, opacity: 0, scale: 0.8 }}
                    whileInView={{ x: 0, opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        default: { type: "spring", stiffness: 60, damping: 15, delay: 0.4 },
                        scale: { duration: 0.2 } // Separate transition for hover/drag scale if needed
                    }}
                    whileHover={{ scale: 1.1, cursor: 'grab' }}
                    whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
                    style={{
                        position: 'absolute',
                        bottom: isMobile ? '20px' : '50px',
                        left: isMobile ? '20px' : '50px',
                        width: ballSize,
                        height: ballSize,
                        pointerEvents: 'auto',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
                        backgroundColor: 'transparent',
                        touchAction: 'none',
                    }}
                >
                    <img
                        src={basketballImg}
                        alt="Basketball"
                        draggable="false" // Prevent browser native drag
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </motion.div>
            </div>
        </>
    );
};

export default BasketballGame;
