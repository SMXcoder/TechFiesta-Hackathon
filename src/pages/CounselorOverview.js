import React, { useRef, useEffect } from 'react';
import Card from '../components/Card';
import { Users, CalendarDays, Bell, Activity } from 'lucide-react';

const mockData = {
    stats: [
        { id: 'cases', title: 'Active Cases', value: 34, icon: Users, color: '#3b82f6' }, 
        { id: 'appointments', title: 'Appointments Today', value: 4, icon: CalendarDays, color: '#1e40af' },
        { id: 'alerts', title: 'Flagged Alerts', value: 2, icon: Bell, color: '#fbbf24' },
        { id: 'activity', title: 'Recent Activity', value: 12, icon: Activity, color: '#60a5fa' },
    ],
    recentActivity: [
        "New appointment for Anonymized Student 4 scheduled.",
        "High severity alert flagged for Anonymized Student 1.",
        "Session notes for Anonymized Student 2 updated.",
    ]
};

const CounselorOverview = () => {
    const counterRefs = useRef({});

    const animateCounter = (element, targetValue) => {
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();
        const update = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            element.textContent = Math.floor(progress * targetValue);
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };

    useEffect(() => {
        mockData.stats.forEach(stat => {
            const element = counterRefs.current[stat.id];
            if (element) {
                animateCounter(element, stat.value);
            }
        });
    }, []);

    return React.createElement('div', { className: "max-w-7xl mx-auto", 'aria-labelledby': "heading-overview" },
        React.createElement('h2', { id: "heading-overview", className: "text-2xl sm:text-3xl font-bold text-black dark:text-gray-100 mb-6" }, "Overview"),
        
        React.createElement('div', { id: "stats-grid", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" },
            mockData.stats.map((stat, index) => {
                const Icon = stat.icon;
                return React.createElement(Card, { key: stat.id, delay: index * 0.1, className: "slide-in flex flex-col" },
                    React.createElement('div', { className: "flex items-center justify-between mb-4" },
                        React.createElement('h3', { className: "text-lg font-semibold text-black dark:text-gray-200 truncate" }, stat.title),
                        React.createElement('div', { className: "text-2xl flex-shrink-0", style: { color: stat.color } },
                            React.createElement(Icon, { className: "w-6 h-6" })
                        )
                    ),
                    React.createElement('p', {
                        className: "text-4xl font-bold text-black dark:text-white",
                        ref: el => counterRefs.current[stat.id] = el
                    }, "0")
                );
            })
        ),

        React.createElement(Card, null,
            React.createElement('h3', { className: "text-xl font-bold text-black dark:text-gray-100 mb-4" }, "Recent Activity"),
            React.createElement('div', { id: "recent-activity-list", className: "space-y-4" },
                mockData.recentActivity.map((activity, index) => (
                    React.createElement('p', {
                        key: index, 
                        className: "text-sm text-black/90 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 py-2 last:border-b-0"
                    }, activity)
                ))
            )
        )
    );
};

export default CounselorOverview;