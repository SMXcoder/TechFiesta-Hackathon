// src/pages/HowItWorks.js

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout'; // Use the shared layout

const HowItWorks = () => {
    const stepsRef = useRef([]);

    // --- Animation Logic ---
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
                    entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
                }
            });
        }, { threshold: 0.2 });

        stepsRef.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const steps = [
        {
            id: 1,
            title: "Create Your Account",
            description: "Sign up in minutes to create your secure, confidential profile. Your privacy is our top priority."
        },
        {
            id: 2,
            title: "Take a Quick Assessment",
            description: "Answer a few simple questions to help us understand your current well-being. This is not a diagnosis, just a starting point."
        },
        {
            id: 3,
            title: "Explore Personalized Resources",
            description: "Based on your assessment, discover a library of curated videos, articles, and audio exercises tailored to your needs."
        },
        {
            id: 4,
            title: "Connect and Grow",
            description: "Engage with our AI assistant for immediate support, connect with peers in the community forum, or book a session with a professional counselor."
        }
    ];

    return (
        <PublicLayout>
            {/* Main Container with matching Gradient Background */}
            <div className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
                
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
                        Your Path to Wellness
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        A simple, confidential, and supportive journey from your first check-in to finding the right resources for you.
                    </p>
                </div>

                {/* Timeline Steps */}
                <div className="max-w-2xl mx-auto space-y-12">
                    {steps.map((step, index) => (
                        <div 
                            key={step.id} 
                            ref={el => stepsRef.current[index] = el}
                            className="flex items-start gap-6 opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out"
                        >
                            {/* Number Circle & Line */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white font-bold text-xl shadow-lg shrink-0 z-10 relative">
                                    {step.id}
                                </div>
                                {/* Render vertical line for all except the last item */}
                                {index !== steps.length - 1 && (
                                    <div className="w-px h-24 bg-indigo-200 dark:bg-zinc-700 -my-2"></div>
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="pt-2 pb-8">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Brand/Home Link */}
                <div className="max-w-2xl mx-auto mt-16 flex justify-center">
                    <Link to="/" className="flex items-center space-x-3 group opacity-70 hover:opacity-100 transition-opacity">
                        <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-lg group-hover:bg-indigo-700 transition-colors">
                            M
                        </div>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">Back to Home</span>
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
};

export default HowItWorks;