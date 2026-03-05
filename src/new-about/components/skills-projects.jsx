import React from 'react'
import { motion } from 'framer-motion'
import { Code, Palette, Database, Zap } from 'lucide-react'

export default function SkillsProjects() {
    const skills = [
        {
            category: 'Frontend',
            icon: <Code className="w-8 h-8" />,
            items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'JavaScript']
        },
        {
            category: 'Backend',
            icon: <Database className="w-8 h-8" />,
            items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs']
        },
        {
            category: 'Design',
            icon: <Palette className="w-8 h-8" />,
            items: ['Figma', 'Adobe XD', 'UI/UX', 'Responsive Design', 'Accessibility']
        },
        {
            category: 'Tools',
            icon: <Zap className="w-8 h-8" />,
            items: ['Git', 'VS Code', 'Vite', 'Docker', 'Vercel']
        },
    ]

    const projects = [
        {
            title: 'Project Name 1',
            description: 'A brief description of your amazing project and what it does',
            tech: ['React', 'Node.js', 'MongoDB']
        },
        {
            title: 'Project Name 2',
            description: 'Another innovative project showcasing your skills',
            tech: ['Next.js', 'Tailwind', 'API']
        },
        {
            title: 'Project Name 3',
            description: 'Your latest creation that solves real-world problems',
            tech: ['Vue', 'Express', 'MySQL']
        },
    ]

    return (
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black text-white">
            <div className="max-w-7xl mx-auto">
                {/* Skills Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 text-center">
                        Skills & Expertise
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-800 p-6 rounded-xl"
                            >
                                <div className="text-blue-400 mb-4">{skill.icon}</div>
                                <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
                                <ul className="space-y-2">
                                    {skill.items.map((item) => (
                                        <li key={item} className="text-gray-300">{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 text-center">
                        Featured Projects
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors"
                            >
                                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                <p className="text-gray-300 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
