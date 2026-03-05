import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const Testimonials = () => {
    return (
        <Section id="quote" className="container">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                padding: '4rem 1rem',
                position: 'relative',
            }}>
                {/* Decorative opening quote mark */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.08, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{
                        position: 'absolute',
                        top: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: 'clamp(8rem, 20vw, 16rem)',
                        fontFamily: 'Georgia, serif',
                        color: '#ffbf00',
                        lineHeight: 1,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    "
                </motion.div>

                {/* Quote text with alternating sizes & colors */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        maxWidth: '900px',
                        lineHeight: 1.4,
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    <p style={{ margin: 0, fontWeight: 300 }}>
                        <span style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            color: '#fff',
                            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                            letterSpacing: '-0.02em',
                        }}>
                            "Money
                        </span>
                        {' '}
                        <span style={{
                            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                            fontWeight: 400,
                            color: '#999',
                            fontStyle: 'italic',
                            fontFamily: "'Georgia', serif",
                        }}>
                            isn't
                        </span>
                        {' '}
                        <span style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            color: '#ffbf00',
                            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                            letterSpacing: '-0.02em',
                        }}>
                            everything"
                        </span>
                        <br />
                        <span style={{
                            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                            fontWeight: 400,
                            color: '#999',
                            fontStyle: 'italic',
                            fontFamily: "'Georgia', serif",
                        }}>
                            said
                        </span>
                        {' '}
                        <span style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            color: '#fff',
                            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                            letterSpacing: '-0.02em',
                        }}>
                            everyone
                        </span>
                        {' '}
                        <span style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            color: '#ffbf00',
                            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                            letterSpacing: '-0.02em',
                        }}>
                            with MONEY.
                        </span>
                    </p>
                </motion.div>

                {/* Attribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    style={{
                        marginTop: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    <div style={{
                        width: '60px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #ffbf00)',
                    }} />
                    <span style={{
                        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#ccc',
                    }}>
                        Vedhant B
                    </span>
                    <div style={{
                        width: '60px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #ffbf00, transparent)',
                    }} />
                </motion.div>

                {/* Subtle glow effect behind quote */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(255,191,0,0.06) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                }} />
            </div>
        </Section>
    );
};

export default Testimonials;
