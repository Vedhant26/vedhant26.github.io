import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Award, Medal } from 'lucide-react'

export default function HallOfFame() {
    // Add your hackathon achievements here
    const achievements = [
        {
            id: 1,
            title: 'Hackathon Winner',
            event: 'Your Hackathon Name',
            date: '2024',
            description: 'Won 1st place for innovative project',
            image: '/images/certificate-1.jpg'
        },
        {
            id: 2,
            title: 'Best Innovation Award',
            event: 'Another Hackathon',
            date: '2024',
            description: 'Recognized for creative solution',
            image: '/images/certificate-2.jpg'
        },
        {
            id: 3,
            title: 'Runner Up',
            event: 'Tech Competition',
            date: '2023',
            description: 'Second place in coding competition',
            image: '/images/certificate-3.jpg'
        },
    ]

    return (
        <section className="py-20 px-6 bg-black text-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                    <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">
                        Hall of Fame
                    </h2>
                    <p className="text-xl text-gray-400">Hackathon Achievements & Certificates</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                            <div className="aspect-video bg-gray-800 flex items-center justify-center">
                                <Award className="w-20 h-20 text-yellow-400" />
                                {/* Replace with actual certificate image */}
                                {/* <img src={achievement.image} alt={achievement.title} className="w-full h-full object-cover" /> */}
                            </div>
                            <div className="p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <Medal className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">{achievement.title}</h3>
                                        <p className="text-yellow-400 font-semibold">{achievement.event}</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 mb-3">{achievement.description}</p>
                                <p className="text-sm text-gray-500">{achievement.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
