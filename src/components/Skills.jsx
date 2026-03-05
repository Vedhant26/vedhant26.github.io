import React from 'react';
import Section from './Section';
import TextReveal from './TextReveal';
import { skills } from './data';
import { motion } from 'framer-motion';

const TechBadge = ({ name, index }) => (
    <motion.div
        className="tech-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05, type: 'spring' }}
        whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-orange)', color: '#000' }}
    >
        {name}
    </motion.div>
);

const Skills = () => {
    return (
        <Section id="skills" className="container">
            <h2 className="section-title"><TextReveal text="Technical Arsenal" /></h2>

            <div className="skills-wrapper">
                <div className="skill-group">
                    <h3 className="skill-category-title">Frontend & UI</h3>
                    <div className="badge-grid">
                        {skills.frontend.map((s, i) => <TechBadge key={s} name={s} index={i} />)}
                    </div>
                </div>

                <div className="skill-group">
                    <h3 className="skill-category-title">Backend & Systems</h3>
                    <div className="badge-grid">
                        {skills.backend.map((s, i) => <TechBadge key={s} name={s} index={i} />)}
                    </div>
                </div>

                <div className="skill-group">
                    <h3 className="skill-category-title">Tools & DevOps</h3>
                    <div className="badge-grid">
                        {skills.tools.map((s, i) => <TechBadge key={s} name={s} index={i} />)}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Skills;
