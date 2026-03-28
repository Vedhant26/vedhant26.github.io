import React from 'react';

const Image = ({ src, alt, width, height, fill, className, priority, ...props }) => {
    const fillStyles = fill ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: 'cover',
    } : {};

    return (
        <img
            src={src}
            alt={alt || ""}
            width={width}
            height={height}
            className={className}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            style={{
                ...fillStyles,
            }}
            {...props}
        />
    );
};

export default Image;
