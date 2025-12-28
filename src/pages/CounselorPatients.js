import React from 'react';
import Card from '../components/Card';
import { Search, UserPlus } from 'lucide-react';

const CounselorPatients = () => {
    return React.createElement('div', { className: "max-w-7xl mx-auto" },
        React.createElement('h2', { className: "text-2xl sm:text-3xl font-bold text-black dark:text-gray-100 mb-6" }, "Patient List"),
        
        React.createElement(Card, { className: "p-4 mb-6 flex justify-between items-center" },
            React.createElement('div', { className: "relative w-full md:w-1/2" },
                React.createElement(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
                React.createElement('input', {
                    type: "text",
                    placeholder: "Search patients by name or ID...",
                    className: "w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
                })
            ),
            React.createElement('button', { className: "bg-blue-600 text-white p-2 md:px-4 rounded-lg flex items-center hover:bg-blue-700 transition-colors" },
                React.createElement(UserPlus, { className: "w-5 h-5 mr-1" }),
                React.createElement('span', { className: "hidden md:inline" }, "Add Patient")
            )
        ),

        React.createElement(Card, { className: "min-h-[400px]" },
            React.createElement('h3', { className: "text-xl font-semibold mb-4 text-black dark:text-gray-100" }, "All Active Cases (34)"),
            React.createElement('p', { className: "text-gray-500 dark:text-gray-400" }, "Patient records would be displayed here in a searchable, sortable table.")
        )
    );
};

export default CounselorPatients;