import React from 'react';
import { motion } from 'framer-motion';
import './Marquee.css';

const Marquee = () => {
    const marqueeText = "WEB DEVELOPMENT • UI/UX ENGINEERING • KALI LINUX • MOTION GRAPHICS • SYSTEM ARCHITECTURE • ";

    return (
        <div className="marquee-container">
            <div className="marquee-track">
                <motion.div
                    className="marquee-content"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        }
                    }}
                >
                    <span>{marqueeText}</span>
                    <span>{marqueeText}</span>
                </motion.div>
            </div>
        </div>
    );
};

export default Marquee;
