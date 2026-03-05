import React from 'react';

const Image = ({ src, alt, width, height, fill, className, priority, ...props }) => {
    // If fill is true, we need to ensure the parent is relative and this is absolute
    // Next.js 'fill' implies position: absolute, height: 100%, width: 100%, inset: 0
    const fillStyles = fill ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: 'cover', // Default to cover usually, or handled by className
    } : {};

    // Combine className with fill utility if needed (though style handles it mostly)
    // We'll trust the passed className for object-fit, etc.

    return (
        <img
            src={src}
            alt={alt || ""}
            width={width}
            height={height}
            className={className}
            style={{
                ...fillStyles,
                // Next.js handles layout wrapper, here we assume direct img
            }}
            {...props}
        />
    );
};

export default Image;






