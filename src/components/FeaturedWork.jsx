import React from 'react';
import Section from './Section';
import TextReveal from './TextReveal';
import { projects } from './data';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProject = ({ project, index }) => {
    return (
        <motion.div
            className="featured-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
        >
            <div className="featured-image-container">
                <img src={project.image} alt={project.title} className="featured-image" />
                <div className="featured-overlay">
                    <Link to="/projects" className="view-case-btn">View Case Study</Link>
                </div>
            </div>
            <div className="featured-info">
                <h3 className="featured-title"><TextReveal text={project.title} /></h3>
                <p className="featured-desc">{project.description}</p>
                <div className="featured-tags">
                    {project.tech.slice(0, 3).map(t => <span key={t} className="featured-tag">{t}</span>)}
                </div>
            </div>
        </motion.div>
    );
};

const FeaturedWork = () => {
    return (
        <Section id="featured" className="container">
            <motion.div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title" style={{ marginBottom: 0 }}><TextReveal text="Selected Works" /></h2>
                <Link to="/projects" className="link-arrow">
                    All Projects <ArrowRight size={20} />
                </Link>
            </motion.div>

            <div className="featured-grid">
                {projects.slice(0, 2).map((p, i) => <FeaturedProject key={i} project={p} index={i} />)}
            </div>
        </Section>
    );
};

export default FeaturedWork;
