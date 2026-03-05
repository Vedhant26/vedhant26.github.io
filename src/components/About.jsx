import React from 'react';
import Section from './Section';
import TextReveal from './TextReveal';
import { motion } from 'framer-motion';
import profileImg from '../assets/gom.jpeg';
import { Gamepad2, Dumbbell, Camera, Music } from 'lucide-react';

const InterestCard = ({ icon, title, desc, delay }) => (
    <motion.div
        className="interest-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -5, borderColor: 'var(--accent-orange)' }}
    >
        <div className="interest-icon">{icon}</div>
        <h4>{title}</h4>
        <p>{desc}</p>
    </motion.div>
);

const PhotoPlaceholder = ({ label }) => (
    <div className="photo-frame">
        <div className="photo-content">
            <span>{label}</span>
        </div>
    </div>
);

const About = () => {
    const interests = [
        { icon: <Gamepad2 />, title: "Gaming", desc: "Strategizing in competitive FPS & RPGs." },
        { icon: <Dumbbell />, title: "Basketball", desc: "Point guard mentality on and off the court." },
        { icon: <Camera />, title: "Photography", desc: "Capturing urban aesthetics and moments." },
        { icon: <Music />, title: "Music", desc: "Curating synthwave and lo-fi playlists." }
    ];

    return (
        <Section id="about" className="container">
            {/* Bio Section */}
            <div className="about-grid">
                <div className="about-image">
                    <img
                        src={profileImg}
                        alt="Vedhant Bidari Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
                    />
                </div>

                <div className="about-text">
                    <h2 className="section-title"><TextReveal text="About Me" /></h2>
                    <h3 className="my-name">
                        <TextReveal text="Vedhant Bidari" />
                    </h3>
                    <p className="about-desc">
                        I engineering momentum. My code is a reflection of my discipline—structured, efficient, and built to perform under pressure.
                        <br /><br />
                        Born from the fast-paced world of competitive creative technology, I bridge the gap between complex logic and fluid design. Whether I'm architecting a scalable backend or fine-tuning a micro-interaction, my focus remains the same:
                        <span style={{ color: 'var(--accent-orange)' }}> Impact through Precision.</span>
                    </p>

                    <div className="stats-row">
                        <div className="stat-item">
                            <span className="stat-number">5+</span>
                            <span className="stat-label">Years Coding</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Projects Shipped</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">∞</span>
                            <span className="stat-label">Coffees Consumed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interests Section */}
            <div className="interests-section" style={{ marginTop: '6rem' }}>
                <h3 className="subsection-title"><TextReveal text="Beyond The Code" /></h3>
                <div className="interests-grid">
                    {interests.map((item, i) => (
                        <InterestCard key={i} {...item} delay={i * 0.1} />
                    ))}
                </div>
            </div>

            {/* Gallery Section */}
            <div className="gallery-section" style={{ marginTop: '6rem' }}>
                <h3 className="subsection-title"><TextReveal text="Life in Frames" /></h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>A glimpse into my world, travels, and inspirations.</p>

                <div className="photo-grid">
                    {/* Replace these divs with real images when available */}
                    <PhotoPlaceholder label="Travel Shot 1" />
                    <PhotoPlaceholder label="Gaming Setup" />
                    <PhotoPlaceholder label="Basketball Court" />
                    <PhotoPlaceholder label="Tech Meetup" />
                </div>
            </div>
        </Section>
    );
};

export default About;
