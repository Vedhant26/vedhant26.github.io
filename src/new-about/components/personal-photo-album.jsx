import React from 'react'
import { motion } from 'framer-motion'

export default function PersonalPhotoAlbum() {
    // Add your photos here - replace with your actual images
    const photos = [
        { id: 1, src: '/images/your-photo-1.jpg', caption: 'Photo 1' },
        { id: 2, src: '/images/your-photo-2.jpg', caption: 'Photo 2' },
        { id: 3, src: '/images/your-photo-3.jpg', caption: 'Photo 3' },
        { id: 4, src: '/images/your-photo-4.jpg', caption: 'Photo 4' },
        { id: 5, src: '/images/your-photo-5.jpg', caption: 'Photo 5' },
        { id: 6, src: '/images/your-photo-6.jpg', caption: 'Photo 6' },
    ]

    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black uppercase mb-12 text-center"
                >
                    Photo Album
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
                        >
                            <img
                                src={photo.src}
                                alt={photo.caption}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
