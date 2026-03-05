import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from './TextReveal';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <motion.nav
                className="navbar"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="nav-logo">
                    <NavLink to="/">
                        <span className="logo-text">VB</span>
                    </NavLink>
                </div>

                {/* Desktop nav links */}
                <div className="nav-links nav-links-desktop">
                    <NavLink to="/" className="nav-link" end>
                        <TextReveal text="Home" />
                    </NavLink>
                    <NavLink to="/about" className="nav-link">
                        <TextReveal text="About" />
                    </NavLink>
                    <NavLink to="/projects" className="nav-link">
                        <TextReveal text="Projects" />
                    </NavLink>
                    <NavLink to="/journey" className="nav-link">
                        <TextReveal text="Journey" />
                    </NavLink>

                </div>

                {/* Mobile hamburger button */}
                <button
                    className="hamburger-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        zIndex: 1001,
                        position: 'relative',
                        pointerEvents: 'auto',
                    }}
                >
                    <div style={{
                        width: '24px',
                        height: '2px',
                        background: '#fff',
                        transition: 'all 0.3s ease',
                        transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                    }} />
                    <div style={{
                        width: '24px',
                        height: '2px',
                        background: '#fff',
                        margin: '6px 0',
                        transition: 'all 0.3s ease',
                        opacity: isMenuOpen ? 0 : 1,
                    }} />
                    <div style={{
                        width: '24px',
                        height: '2px',
                        background: '#fff',
                        transition: 'all 0.3s ease',
                        transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                    }} />
                </button>
            </motion.nav>

            {/* Mobile overlay menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '70vw',
                            maxWidth: '320px',
                            height: '100vh',
                            background: 'rgba(10, 10, 10, 0.98)',
                            backdropFilter: 'blur(20px)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '2rem',
                            borderLeft: '1px solid #222',
                        }}
                    >
                        {[
                            { to: '/', label: 'Home', end: true },
                            { to: '/about', label: 'About' },
                            { to: '/projects', label: 'Projects' },
                            { to: '/journey', label: 'Journey' },

                        ].map((link, i) => (
                            <motion.div
                                key={link.to}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.08 }}
                            >
                                <NavLink
                                    to={link.to}
                                    end={link.end}
                                    onClick={closeMenu}
                                    style={{
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    {link.label}
                                </NavLink>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 998,
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
