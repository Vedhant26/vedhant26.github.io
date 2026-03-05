import React from 'react';
import Section from './Section';
import TextReveal from './TextReveal';
import { motion } from 'framer-motion';
import { Code, Server, Layout, Database } from 'lucide-react';

const services = [
    {
        icon: <Layout size={32} />,
        title: "Frontend Architecture",
        desc: "Building scalable, high-performance UI systems using React, Next.js, and modern CSS."
    },
    {
        icon: <Server size={32} />,
        title: "Backend Development",
        desc: "Robust API design, database management, and server-side logic using Node.js and PostgreSQL."
    },
    {
        icon: <Code size={32} />,
        title: "Creative Coding",
        desc: "Interactive web experiences, WebGL animations, and custom visual effects."
    },
    {
        icon: <Database size={32} />,
        title: "System Design",
        desc: "Architecting cloud-native solutions and microservices for enterprise-scale applications."
    }
];

const Services = () => {
    return (
        <Section id="services" className="container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <TextReveal text="What I Do" />
            </motion.h2>
            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {services.map((item, i) => (
                    <motion.div
                        key={i}
                        className="service-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        whileHover={{ y: -5, borderColor: 'var(--accent-orange)' }}
                        style={{
                            padding: '2rem',
                            border: '1px solid #333',
                            background: '#111',
                            borderRadius: '8px'
                        }}
                    >
                        <div style={{ color: 'var(--accent-orange)', marginBottom: '1rem' }}>{item.icon}</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#fff' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Services;
