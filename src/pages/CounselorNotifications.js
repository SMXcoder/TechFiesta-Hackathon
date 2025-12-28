import React from 'react';
import Card from '../components/Card';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const CounselorNotifications = () => {
    const alerts = [
        { id: 1, name: 'Anonymized Student 1', studentId: 'S-453', issue: 'Panic Attack (High Severity)', type: 'alert' },
        { id: 2, name: 'Anonymized Student 2', studentId: 'S-210', issue: 'Academic Stress (Medium Severity)', type: 'alert' },
        { id: 3, name: 'Anonymized Student 7', studentId: 'S-778', issue: 'New Message Received', type: 'info' },
    ];

    return React.createElement('div', { className: "max-w-7xl mx-auto" },
        React.createElement('h2', { className: "text-2xl sm:text-3xl font-bold text-black dark:text-gray-100 mb-6" }, "Notifications & Alerts"),
        
        React.createElement(Card, null,
            React.createElement('h3', { className: "text-xl font-semibold text-black dark:text-gray-100 mb-4" }, "AI-Flagged Alerts"),
            React.createElement('div', { id: "alerts-list", className: "space-y-4" },
                alerts.map(alert => {
                    const isAlert = alert.type === 'alert';
                    const borderColor = isAlert ? 'border-red-500' : 'border-blue-500';
                    const textColor = isAlert ? 'text-red-500' : 'text-blue-600';
                    const Icon = isAlert ? AlertTriangle : CheckCircle;
                    const ButtonText = isAlert ? 'Connect Helpline' : 'View Message';

                    return React.createElement('div', { key: alert.id, className: `p-4 card flex items-center justify-between border-l-4 ${borderColor}` },
                        React.createElement('div', { className: "flex items-center flex-1 min-w-0 mr-4" },
                            React.createElement(Icon, { className: `w-6 h-6 mr-3 ${textColor}` }),
                            React.createElement('div', null,
                                React.createElement('p', { className: `font-semibold ${textColor} truncate` }, `${alert.name} (${alert.studentId})`),
                                React.createElement('p', { className: "text-sm text-gray-600 dark:text-gray-300 truncate" }, alert.issue)
                            )
                        ),
                        React.createElement('button', {
                            className: `py-2 px-4 rounded-lg font-medium transition-colors flex-shrink-0 ${isAlert ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`,
                            onClick: () => console.log(`Action for ${alert.name}`)
                        }, ButtonText)
                    );
                })
            )
        )
    );
};

export default CounselorNotifications;