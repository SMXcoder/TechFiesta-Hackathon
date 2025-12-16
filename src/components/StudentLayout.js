import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Bot, BookOpenCheck, Users, ClipboardList, CalendarPlus, 
  LogOut, Menu, ShieldHalf, User 
} from 'lucide-react';

const StudentLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState('Student');
  const navigate = useNavigate();
  const location = useLocation();
  
  const sidebarRef = useRef(null);
  const mainPanelRef = useRef(null);

  useEffect(() => {
    // Mock fetching user data
    const token = localStorage.getItem('authToken');
    if(token) setUserName("Dhiraj Mane");

    // --- DESKTOP HOVER/LEFT-EDGE LOGIC RESTORED ---
    if (window.innerWidth >= 768) {
        const triggerZoneWidth = 20;
        const sidebar = sidebarRef.current;
        const mainPanel = mainPanelRef.current;
        const sidebarWidth = 256; 

        const handleMouseMove = (e) => {
            if (!sidebar || !mainPanel || isSidebarOpen) return;

            const sidebarRect = sidebar.getBoundingClientRect();
            
            if (e.clientX <= triggerZoneWidth) {
                sidebar.style.transform = 'translateX(0)';
                mainPanel.style.marginLeft = `${sidebarWidth}px`;
            } else if (e.clientX > sidebarRect.right + triggerZoneWidth) {
                sidebar.style.transform = 'translateX(-100%)';
                mainPanel.style.marginLeft = '0';
            }
        };

        const handleMouseLeave = () => {
            if (!sidebar || !mainPanel || isSidebarOpen) return;
            sidebar.style.transform = 'translateX(-100%)';
            mainPanel.style.marginLeft = '0';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        
        // Initial setup for desktop view
        if (sidebar && mainPanel) {
            sidebar.style.transform = 'translateX(-100%)';
            mainPanel.style.marginLeft = '0';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'AI Assistant', path: '/ai-assistant', icon: <Bot size={20} /> },
    { name: 'Resources', path: '/resources', icon: <BookOpenCheck size={20} /> },
    { name: 'Peer Support', path: '/peer-support', icon: <Users size={20} /> },
    { name: 'Test Assessment', path: '/test-assessment', icon: <ClipboardList size={20} /> },
    { name: 'Bookings', path: '/bookings', icon: <CalendarPlus size={20} /> },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50">
      
      {/* Sidebar - Note: Tailwind width-64 equals 256px */}
      <aside 
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-violet-50 text-slate-800 transition-transform duration-300 border-r border-indigo-100 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={window.innerWidth >= 768 ? { transition: 'transform 0.3s ease-in-out', top: 0, bottom: 0, height: '100vh', position: 'fixed' } : {}} // Ensure fixed position on desktop
      >
        <div className="flex flex-col h-full py-7 px-2">
          <div className="px-4 mb-8">
            <h2 className="text-xl font-bold text-slate-900">{userName}</h2>
            <p className="text-sm text-slate-500">Student ID: ****1234</p>
          </div>
          <nav className="flex-grow space-y-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={`flex items-center space-x-3 py-2.5 px-4 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-indigo-50'}`}>
                {item.icon} <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="px-2 pb-4 mt-auto">
            <button onClick={handleLogout} className="flex items-center w-full space-x-3 py-2.5 px-4 rounded-lg text-slate-700 hover:bg-red-100 hover:text-red-700"><LogOut size={20} /><span>Logout</span></button>
          </div>
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div 
        ref={mainPanelRef}
        className="flex flex-col min-h-screen transition-all duration-300 w-full" 
        style={window.innerWidth >= 768 ? { marginLeft: '0px' } : {}}
      >
        
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b border-indigo-200/50 bg-indigo-300/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden mr-4"><Menu /></button>
              <ShieldHalf className="h-8 w-auto text-indigo-600 mr-2" />
              <span className="text-xl font-bold text-slate-900">MindEase Portal</span>
            </div>
            <div className="relative">
              <button onClick={() => setProfileOpen(!isProfileOpen)} className="bg-slate-200 rounded-full h-10 w-10 flex items-center justify-center"><User size={20} /></button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5">
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 lg:p-8 bg-transparent overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default StudentLayout;