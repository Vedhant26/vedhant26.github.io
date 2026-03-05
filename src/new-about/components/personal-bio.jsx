import React from 'react'
import { motion } from 'framer-motion'

export default function PersonalBio() {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 text-center">
                        My Story
                    </h2>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-xl leading-relaxed mb-6 text-gray-700">
                            I'm <strong>Vedhant Bidari</strong>, a passionate Creative Technologist and Web Developer
                            building next-generation interactive experiences. With expertise in modern web technologies,
                            I craft beautiful, functional, and innovative digital solutions.
                        </p>

                        <p className="text-lg leading-relaxed mb-6 text-gray-600">
                            My journey into technology started with curiosity and evolved into a deep passion for creating
                            impactful digital experiences. I specialize in full-stack development, with a focus on
                            React, Node.js, and modern web frameworks.
                        </p>

                        <p className="text-lg leading-relaxed text-gray-600">
                            Through hackathons and personal projects, I've honed my skills in problem-solving,
                            team collaboration, and rapid prototyping. I believe in continuous learning and pushing
                            the boundaries of what's possible with technology.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
