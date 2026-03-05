import React from 'react';
import Section from './Section';
import TextReveal from './TextReveal';
import { achievements } from './data';
import { motion } from 'framer-motion';

const AchievementCard = ({ item }) => {
    return (
        <motion.div
            className="fame-card"
            whileHover={{
                boxShadow: "0 0 20px rgba(255, 191, 0, 0.4)",
                borderColor: "var(--accent-amber)",
                scale: 1.02
            }}
        >
            <div className="fame-year">
                {item.year}
            </div>
            <h3 className="fame-title">
                <TextReveal text={item.title} />
            </h3>
            <p className="fame-desc">
                {item.description}
            </p>
        </motion.div>
    );
};

const HallOfFame = () => {
    return (
        <Section id="hall-of-fame" className="container">
            <h2 className="section-title"><TextReveal text="Hall of Fame" /></h2>

            {/* Horizontal Scroll Container */}
            <div className="fame-scroll">
                {achievements.map((item, i) => <AchievementCard key={i} item={item} />)}
            </div>
        </Section>
    );
};

export default HallOfFame;
