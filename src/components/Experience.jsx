import React from 'react';
import Section from './Section';
import TextReveal from './TextReveal';

const experience = [
    {
        role: "Ambivert",
        company: "No guidance",
        period: "2022 - 2023",
        desc: "No skills.. Just a guy with a RTX 2050 laptop"
    },
    {
        role: "Student & Web Developer",
        company: "VIT-AP University",
        period: "2024 - 2028",
        desc: "Participated in 5+ Hackathons with Awards and top positions"
    },
    {
        role: "Web Developer Intern",
        company: "Oasis Infobyte",
        period: "2025",
        desc: "Associated with teams and helped with tasks of web development"
    }
];

const Experience = () => {
    return (
        <Section id="experience" className="container">
            <h2 className="section-title"><TextReveal text="Journey" /></h2>
            <div className="timeline-container" style={{ borderLeft: '2px solid #333', paddingLeft: '2rem' }}>
                {experience.map((item, i) => (
                    <div key={i} className="timeline-item" style={{ marginBottom: '3rem', position: 'relative' }}>
                        <div style={{
                            position: 'absolute', left: '-2.6rem', top: '0.5rem',
                            width: '12px', height: '12px', borderRadius: '50%',
                            background: 'var(--accent-amber)', boxShadow: '0 0 10px var(--accent-amber)'
                        }} />
                        <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.25rem' }}>{item.role}</h3>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>{item.company}</h4>
                        <span style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '1rem', fontFamily: 'monospace' }}>{item.period}</span>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Experience;
