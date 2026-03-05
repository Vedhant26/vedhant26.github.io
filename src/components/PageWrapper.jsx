import React from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            onAnimationComplete={() => {
                // Re-measure after Framer Motion finishes so GSAP gets correct positions
                ScrollTrigger.refresh();
            }}
            style={{
                paddingTop: '100px', // Space for fixed navbar
                minHeight: '100vh',
                width: '100%'
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageWrapper;

