import React from 'react';
import Card from '../components/Card';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components so they can be rendered
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const barData = {
    labels: ['Anxiety', 'Depression', 'Burnout', 'Stress', 'Isolation'],
    datasets: [{
      label: '# of Cases',
      data: [45, 30, 25, 40, 15],
      backgroundColor: ['#3b82f6', '#1e40af', '#facc15', '#fb923c', '#93c5fd'],
      borderRadius: 5,
    }]
};

const doughnutData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: ['#3b82f6', '#facc15', '#f87171'],
      borderWidth: 0,
    }]
};

const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        title: { display: false }
    },
    scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
        x: { grid: { display: false } }
    }
};

const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
        legend: { position: 'right' } 
    }
};

const CounselorAnalytics = () => {
    return React.createElement('div', { className: "max-w-7xl mx-auto" },
        React.createElement('h2', { className: "text-2xl sm:text-3xl font-bold text-black dark:text-gray-100 mb-6" }, "Analysis & Trends"),
        
        React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" },
            // Bar Chart Card
            React.createElement(Card, null,
                React.createElement('h3', { className: "text-lg font-semibold mb-4 text-black dark:text-gray-100" }, "Most Common Issues"),
                React.createElement('div', { className: "h-64" },
                    // Renders the actual Bar Chart component
                    React.createElement(Bar, { data: barData, options: barOptions })
                )
            ),
            
            // Doughnut Chart Card
            React.createElement(Card, null,
                React.createElement('h3', { className: "text-lg font-semibold mb-4 text-black dark:text-gray-100" }, "Sentiment Analysis"),
                React.createElement('div', { className: "h-64 flex justify-center relative" },
                    // Renders the actual Doughnut Chart component
                    React.createElement(Doughnut, { data: doughnutData, options: doughnutOptions })
                )
            )
        ),
        
        // Score Card
        React.createElement(Card, null,
            React.createElement('h3', { className: "text-lg font-semibold mb-4 text-center text-black dark:text-gray-100" }, "Average PHQ-9/GAD-7 Score"),
            React.createElement('p', { className: "text-5xl font-bold text-center text-blue-600 dark:text-blue-400" }, "6.2")
        )
    );
};

export default CounselorAnalytics;