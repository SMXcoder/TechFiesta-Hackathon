// src/components/Card.js - Ensure this file exists and contains this content

import React from 'react';
// Assuming 'tailwind-merge' is installed
import { twMerge } from 'tailwind-merge'; 

/**
 * Card Component
 * Provides standard dashboard card styling and animation structure.
 */
const Card = ({ children, className, onClick, style, delay = 0 }) => {
    // Base styles for the light/dark background, border, shadow, and transition
    const baseClasses = 'p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]';
    const mergedClasses = twMerge(baseClasses, className);
    
    // Implements the slide-in animation effect (relies on external CSS @keyframes slideIn)
    const cardStyle = { 
        ...style, 
        animation: `slideIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards`, 
        animationDelay: `${delay}s`,
        opacity: 0, // Starts invisible for the animation
    };

    return React.createElement('div', {
        className: mergedClasses,
        onClick: onClick,
        style: cardStyle,
    }, children);
};

export default Card;