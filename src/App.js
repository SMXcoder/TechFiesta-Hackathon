// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Utility Imports
import { useTheme } from './utils/useTheme.js'; // Ensure .js extension is used

// Layout Imports
import StudentLayout from './components/StudentLayout';
import CounselorLayout from './layout/CounselorLayout.js'; // Ensure .js extension is used

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import About from './pages/About';
import ForInstitutions from './pages/ForInstitutions';
import ResourcesPage from './pages/ResourcesPage';
import HowItWorks from './pages/HowItWorks';

// Student Protected Pages
import StudentDashboard from './pages/StudentDashboard';
import AiAssistant from './pages/AiAssistant';
import Resources from './pages/Resources';
import Bookings from './pages/Bookings';
import PeerSupport from './pages/PeerSupport';
import TestAssessment from './pages/TestAssessment';

// Counselor Protected Pages (Imported)
import CounselorOverview from './pages/CounselorOverview';
import CounselorPatients from './pages/CounselorPatients';
import CounselorCalendar from './pages/CounselorCalendar';
import CounselorChats from './pages/CounselorChats';
import CounselorAnalytics from './pages/CounselorAnalytics';
import CounselorNotifications from './pages/CounselorNotifications';

// --- MOCK AUTH HOOK (FIXED) ---
const useAuth = () => {
    const token = localStorage.getItem('authToken');
    const storedRole = localStorage.getItem('userRole'); 

    if (!token) {
        return { isAuthenticated: false, role: null, isLoading: false };
    }
    
    // Determines user role strictly from storedRole, ensuring correct redirection
    const userRole = storedRole || 'student';
    
    return { 
        isAuthenticated: true, 
        role: userRole, 
        isLoading: false 
    };
};

const RoleProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, role, isLoading } = useAuth();
    
    if (isLoading) return <div>Loading user session...</div>;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (!allowedRoles.includes(role)) {
        // Directs users back to their appropriate dashboard 
        return <Navigate to={role === 'counselor' ? "/counselor/dashboard" : "/dashboard"} replace />;
    }

    return children;
};

function App() {
    // State required for the Counselor Layout internal page switching
    const [counselorActivePage, setCounselorActivePage] = useState('overview');
    const [counselorSidebarOpen, setCounselorSidebarOpen] = useState(false);

    // Theme management
    const [theme, toggleTheme] = useTheme(); 
    const isDarkTheme = theme === 'dark';

    const { isAuthenticated, role } = useAuth();
    
    // Determine the default protected path based on the user's role
    const defaultProtectedPath = role === 'counselor' ? '/counselor/dashboard' : '/dashboard';

    // Props to pass to the Counselor Layout
    const counselorLayoutProps = {
        activePage: counselorActivePage,
        setActivePage: setCounselorActivePage,
        isSidebarOpen: counselorSidebarOpen,
        setIsSidebarOpen: setCounselorSidebarOpen,
        toggleTheme: toggleTheme,
        isDarkTheme: isDarkTheme
    };

    // --- Router Switcher for Counselor Pages ---
    const CounselorPageRouter = () => {
        // This function dynamically renders the page based on sidebar clicks
        switch (counselorActivePage) {
            case 'overview': return <CounselorOverview />;
            case 'patients': return <CounselorPatients />;
            case 'calendar': return <CounselorCalendar />;
            case 'chats': return <CounselorChats />;
            case 'analytics': return <CounselorAnalytics />;
            case 'notifications': return <CounselorNotifications />;
            default: return <CounselorOverview />;
        }
    }


    return (
        <Router>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/for-institutions" element={<ForInstitutions />} />
                <Route path="/public-resources" element={<ResourcesPage />} />
                <Route path="/how-it-works" element={<HowItWorks />} />

                {/* --- Protected Student Routes --- */}
                <Route path="/dashboard" element={<RoleProtectedRoute allowedRoles={['student']}><StudentLayout><StudentDashboard /></StudentLayout></RoleProtectedRoute>} />
                <Route path="/ai-assistant" element={<RoleProtectedRoute allowedRoles={['student']}><StudentLayout><AiAssistant /></StudentLayout></RoleProtectedRoute>} />
                <Route path="/resources" element={<RoleProtectedRoute allowedRoles={['student']}><StudentLayout><Resources /></StudentLayout></RoleProtectedRoute>} />
                <Route path="/bookings" element={<RoleProtectedRoute allowedRoles={['student']}><StudentLayout><Bookings /></StudentLayout></RoleProtectedRoute>} />
                <Route path="/peer-support" element={<RoleProtectedRoute allowedRoles={['student']}><StudentLayout><PeerSupport /></StudentLayout></RoleProtectedRoute>} />
                <Route path="/test-assessment" element={<RoleProtectedRoute allowedRoles={['student']}><StudentLayout><TestAssessment /></StudentLayout></RoleProtectedRoute>} />
                
                {/* --- Protected Counselor Routes --- */}
                <Route 
                    path="/counselor/dashboard" 
                    element={
                        <RoleProtectedRoute allowedRoles={['counselor']}>
                            <CounselorLayout {...counselorLayoutProps}>
                                <CounselorPageRouter /> 
                            </CounselorLayout>
                        </RoleProtectedRoute>
                    } 
                />

                {/* Fallback */}
                <Route 
                    path="*" 
                    element={isAuthenticated ? <Navigate to={defaultProtectedPath} replace /> : <Navigate to="/" replace />} 
                />
            </Routes>
        </Router>
    );
}

export default App;