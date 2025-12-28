import React from 'react';
import Card from '../components/Card';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';

const CounselorCalendar = () => {
    const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    
    const appointmentsToday = [
        { time: '10:00 AM', name: 'Anonymized Student 4' },
        { time: '11:30 AM', name: 'Anonymized Student 7' },
        { time: '02:30 PM', name: 'Anonymized Student 5' },
    ];

    return React.createElement('div', { className: "max-w-7xl mx-auto" },
        React.createElement('h2', { className: "text-2xl sm:text-3xl font-bold text-black dark:text-gray-100 mb-6" }, "Calendar & Appointments"),
        
        React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" },
            // Calendar Column
            React.createElement('div', { className: "lg:col-span-2" },
                React.createElement(Card, { className: "min-h-[500px]" },
                    React.createElement('div', { className: "flex items-center justify-between mb-4" },
                        React.createElement('button', { className: "text-gray-500 hover:text-gray-800 transition-colors" }, React.createElement(ChevronLeft, null)),
                        React.createElement('h3', { className: "text-xl font-semibold text-black dark:text-gray-100" }, "September 2025"),
                        React.createElement('button', { className: "text-gray-500 hover:text-gray-800 transition-colors" }, React.createElement(ChevronRight, null))
                    ),
                    React.createElement('p', { className: "text-gray-500 dark:text-gray-400" }, "Calendar grid for appointment scheduling will be placed here.")
                )
            ),
            
            // Appointments List Column
            React.createElement(Card, null,
                React.createElement('h3', { className: "text-xl font-semibold mb-4 text-black dark:text-gray-100" }, `Appointments for ${today}`),
                React.createElement('div', { className: "space-y-3" },
                    appointmentsToday.length > 0 ? (
                        appointmentsToday.map((appt, index) => (
                            React.createElement('div', { key: index, className: "flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow" },
                                React.createElement(Clock, { className: "w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" }),
                                React.createElement('div', null,
                                    React.createElement('p', { className: "font-semibold text-black dark:text-white" }, appt.time),
                                    React.createElement('p', { className: "text-sm text-gray-600 dark:text-gray-300" }, appt.name)
                                )
                            )
                        ))
                    ) : (
                        React.createElement('p', { className: "text-center text-gray-500 pt-8" }, "No appointments scheduled for today.")
                    )
                )
            )
        )
    );
};

export default CounselorCalendar;