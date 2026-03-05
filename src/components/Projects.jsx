import React from 'react';
import Section from './Section';
import TextReveal from './TextReveal';
import { projects } from './data';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            className="project-card"
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className="card-image">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                />
            </div>

            <div className="card-content">
                <h3 className="project-title">
                    <TextReveal text={project.title} />
                </h3>
                <p className="project-desc">
                    {project.description}
                </p>

                <div className="tech-stack">
                    {project.tech.map(t => (
                        <span key={t} className="tech-tag">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="card-links">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-btn link-demo">
                        <ExternalLink size={16} /> Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn link-code">
                        <Github size={16} /> Code
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <Section id="projects" className="container">
            <h2 className="section-title"><TextReveal text="Featured Works" /></h2>
            <div className="projects-grid">
                {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
            </div>
        </Section>
    );
};

export default Projects;
