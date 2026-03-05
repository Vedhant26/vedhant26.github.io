import React from 'react';

const Section = ({ id, className, children }) => {
    return (
        <section
            id={id}
            className={`section-container ${className || ''}`}
            style={{ padding: '6rem 0', position: 'relative' }}
        >
            {children}
        </section>
    );
};

export default Section;
