import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CelestialBackground from './CelestialBackground';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <CelestialBackground />

            <div className="hero-content container">
                <motion.h1
                    className="hero-name neon-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <span className="glitch" data-text="Vedhant Bidari">Vedhant Bidari</span>
                </motion.h1>

                <h2 className="hero-subtitle">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        Web Developer | Builder of Interactive Experiences
                    </motion.span>
                </h2>

                <motion.div
                    className="cta-group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                >
                    <Link to="/projects" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        View Projects
                    </Link>
                    <Link to="/about" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        About Me
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
