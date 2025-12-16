import React, { useState, useEffect } from 'react';

/**
 * useTheme Hook
 * Manages the theme state (light/dark) and persists it to localStorage.
 * It also applies the 'dark' class to the documentElement for Tailwind CSS.
 */
const useTheme = () => {
    // 1. Initialize state from localStorage or system preference
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) return storedTheme;

            // Check system preference if no stored theme
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light'; // Default to light
    });

    // 2. Effect to apply the class and save to localStorage whenever theme changes
    useEffect(() => {
        const root = window.document.documentElement;
        
        // Remove existing theme classes
        root.classList.remove('light', 'dark');
        
        // Add the current theme class
        root.classList.add(theme);
        
        // Save to localStorage
        localStorage.setItem('theme', theme);

    }, [theme]);

    // 3. Toggle function
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return [theme, toggleTheme];
};

export { useTheme };