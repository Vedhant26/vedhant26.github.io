import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react'

export default function ContactSection() {
    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            label: 'Email',
            value: 'your.email@example.com',
            link: 'mailto:your.email@example.com'
        },
        {
            icon: <Phone className="w-6 h-6" />,
            label: 'Phone',
            value: '+1 234 567 8900',
            link: 'tel:+12345678900'
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            label: 'Location',
            value: 'Your City, Country',
            link: null
        },
    ]

    const socialLinks = [
        {
            icon: <Github className="w-6 h-6" />,
            label: 'GitHub',
            url: 'https://github.com/yourusername'
        },
        {
            icon: <Linkedin className="w-6 h-6" />,
            label: 'LinkedIn',
            url: 'https://linkedin.com/in/yourusername'
        },
        {
            icon: <Twitter className="w-6 h-6" />,
            label: 'Twitter',
            url: 'https://twitter.com/yourusername'
        },
    ]

    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-xl text-gray-600">
                        Let's collaborate on your next project
                    </p>
                </motion.div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {contactInfo.map((contact, index) => (
                        <motion.div
                            key={contact.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-6 bg-gray-50 rounded-xl"
                        >
                            <div className="text-blue-600 mb-3 flex justify-center">
                                {contact.icon}
                            </div>
                            <h3 className="font-bold mb-2">{contact.label}</h3>
                            {contact.link ? (
                                <a
                                    href={contact.link}
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    {contact.value}
                                </a>
                            ) : (
                                <p className="text-gray-600">{contact.value}</p>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center gap-6"
                >
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-gray-900 text-white rounded-full hover:bg-blue-600 transition-colors transform hover:scale-110"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
