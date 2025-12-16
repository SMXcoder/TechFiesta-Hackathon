// src/layout/CounselorLayout.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Menu, Sun, Moon, LogOut, LayoutDashboard, Users, CalendarDays, MessageSquare, LineChart, Bell } from 'lucide-react';
// Assuming you have 'tailwind-merge' installed
import { twMerge } from 'tailwind-merge';

// Helper component for Navigation Links (converted to plain JS function)
const NavLink = ({ icon: Icon, label, isActive, onClick, isLogout = false }) => {
    const baseClasses = 'flex items-center p-4 rounded-xl transition-all duration-200 font-medium mb-2 hover:translate-x-[3px]';
    const activeClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 font-semibold';
    const inactiveClasses = 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700';
    const logoutClasses = 'text-red-500 hover:bg-red-50 dark:hover:bg-slate-800';

    const classes = twMerge(
        baseClasses,
        isLogout ? logoutClasses : (isActive ? activeClasses : inactiveClasses),
    );
    const iconColor = isLogout ? 'text-red-500' : (isActive ? 'text-blue-800 dark:text-blue-200' : 'text-slate-600 dark:text-slate-400');

    return React.createElement('a', {
        href: "#",
        onClick: onClick,
        className: classes,
        role: "link",
        'aria-current': isActive ? 'page' : 'false'
    },
        React.createElement(Icon, { className: twMerge('w-5 h-5 mr-4', iconColor) }),
        React.createElement('span', null, label)
    );
};


/**
 * CounselorLayout Component
 * Main layout wrapper for the Counselor Dashboard.
 */
const CounselorLayout = ({ children, activePage, setActivePage, isSidebarOpen, setIsSidebarOpen, toggleTheme, isDarkTheme }) => {
    const navigate = useNavigate(); // Initialize navigation hook

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'patients', label: 'Patient List', icon: Users },
        { id: 'calendar', label: 'Calendar', icon: CalendarDays },
        { id: 'chats', label: 'Chats', icon: MessageSquare },
        { id: 'analytics', label: 'Analysis', icon: LineChart },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];
    
    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.document.body.style.overflow = isSidebarOpen && window.innerWidth < 1024 ? 'hidden' : '';
        }
    }, [isSidebarOpen]);

    // --- LOGOUT FUNCTION ---
    const handleLogout = (e) => {
        e.preventDefault();
        
        // 1. Clear all authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('counselorEmail');

        // 2. Redirect to Login Page
        navigate('/login');
    };

    // --- RENDER FUNCTION (using React.createElement) ---
    
    // Sidebar Content
    const sidebarContent = React.createElement(React.Fragment, null,
        React.createElement('div', { className: "mb-10" },
            React.createElement('h1', { className: "text-3xl font-extrabold text-blue-800 dark:text-white" }, "Mind Ease"),
            React.createElement('p', { className: "text-sm text-black/90 dark:text-gray-400" }, "Counsellor Dashboard")
        ),
        
        React.createElement('nav', { className: "space-y-2 flex-grow" },
            menuItems.map(item =>
                React.createElement(NavLink, {
                    key: item.id,
                    icon: item.icon,
                    label: item.label,
                    isActive: activePage === item.id,
                    onClick: (e) => {
                        e.preventDefault();
                        setActivePage(item.id);
                        if (typeof window !== 'undefined' && window.innerWidth < 1024) setIsSidebarOpen(false);
                    }
                })
            )
        ),

        React.createElement('div', { className: "mt-auto pt-6 border-t border-gray-200 dark:border-gray-700" },
            // Updated Logout Button with handleLogout
            React.createElement(NavLink, { icon: LogOut, label: "Logout", isLogout: true, onClick: handleLogout })
        )
    );

    // Main Content Header
    const mainHeader = React.createElement('header', { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8" },
        React.createElement('div', { className: "flex items-center mb-4 sm:mb-0" },
            React.createElement('img', { 
                src: "https://i.pravatar.cc/150?u=drevil", 
                alt: "Dr. Evelyn Reed's profile picture", 
                className: "w-16 h-16 rounded-full mr-4 border-4 border-white dark:border-slate-800 shadow-md"
            }),
            React.createElement('div', null,
                React.createElement('h2', { className: "text-2xl font-bold text-black dark:text-gray-100" }, "Welcome back, Dr. Evelyn Reed"),
                React.createElement('p', { className: "text-md text-gray-500 dark:text-gray-400" }, "Clinical Psychologist, PhD")
            )
        ),
        
        React.createElement('button', { 
            onClick: toggleTheme, 
            className: "p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600", 
            'aria-label': "Toggle dark mode"
        },
            isDarkTheme ? React.createElement(Sun, { className: "w-6 h-6" }) : React.createElement(Moon, { className: "w-6 h-6" })
        )
    );

    // Mobile Header (Conditionally rendered)
    const mobileHeader = React.createElement('div', { className: "lg:hidden flex justify-between items-center mb-6" },
        React.createElement('h1', { className: "text-2xl font-extrabold text-blue-800 dark:text-white" }, "Mind Ease"),
        React.createElement('button', { onClick: () => setIsSidebarOpen(true), className: "text-gray-600 dark:text-gray-300", 'aria-label': "Toggle menu" },
            React.createElement(Menu, { className: "w-6 h-6" })
        )
    );

    return React.createElement('div', { className: "dashboard-container min-h-screen" },
        // Sidebar Overlay
        isSidebarOpen && React.createElement('div', { 
            className: "fixed inset-0 bg-black/50 z-10 lg:hidden",
            onClick: () => setIsSidebarOpen(false)
        }),

        // Sidebar
        React.createElement('aside', {
            className: twMerge(
                "sidebar w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 fixed h-full flex flex-col p-6 z-20 transition-transform duration-300",
                isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
            ),
            role: "navigation",
            'aria-label': "Primary"
        }, sidebarContent),

        // Main Content Area
        React.createElement('main', {
            className: "main-content flex-grow lg:ml-72 p-6 md:p-10",
            id: "main",
            role: "main",
            tabIndex: "-1"
        },
            mobileHeader,
            mainHeader,
            React.createElement('div', { className: "mt-6" }, children)
        )
    );
};

export default CounselorLayout;