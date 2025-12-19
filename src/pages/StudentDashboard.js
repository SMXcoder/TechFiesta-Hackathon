import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
    Bot, User, ShieldHalf, CalendarPlus, BookOpenCheck, Users, 
    Sparkles, ArrowRight, Video, Headphones, BookOpen, Clock, Zap,
    Facebook, Twitter, Instagram 
} from 'lucide-react';

const StudentDashboard = () => {
    const [userName, setUserName] = useState('John'); 
    const [rotatingThought, setRotatingThought] = useState("");
    
    // Refs for Scroll Animation Logic
    const timelineContainerRef = useRef(null);
    const timelineContentRef = useRef(null);
    const animatedLineRef = useRef(null);
    const staticLineRef = useRef(null);
    
    const thoughts = [
        "It's okay to not be okay. A listening ear is just a message away.",
        "Knowledge is a powerful tool for wellness. Explore and empower yourself.",
        "You are not alone. Connection and shared stories can heal.",
        "Understanding yourself is the first step to taking care of yourself.",
        "Reaching out for help is a sign of strength, not weakness."
    ];

    // --- 1. Rotating Thoughts Logic ---
    useEffect(() => {
        let currentIndex = 0;
        
        const updateThought = () => {
            currentIndex = (currentIndex + 1) % thoughts.length;
            setRotatingThought(thoughts[currentIndex]);
        };
        
        setRotatingThought(thoughts[0]);
        const intervalId = setInterval(updateThought, 10000);
        return () => clearInterval(intervalId);
    }, []);

    // --- 2. Timeline Animation Logic ---
    useEffect(() => {
        // 2a. Intersection Observer for fade-in cards
        const timelineCards = document.querySelectorAll('.timeline-card');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.2 });

        timelineCards.forEach(card => observer.observe(card));
        
        // 2b. Scrolling Line Logic 
        const setLineHeight = () => {
            if (timelineContentRef.current && staticLineRef.current) {
                const contentHeight = timelineContentRef.current.offsetHeight;
                staticLineRef.current.style.height = `${contentHeight}px`;
            }
        };
        
        const animateLine = () => {
            if (!timelineContainerRef.current || !animatedLineRef.current || !timelineContentRef.current) return;
            
            const container = timelineContainerRef.current;
            const contentHeight = timelineContentRef.current.offsetHeight;
            const { top } = container.getBoundingClientRect();
            const containerHeight = container.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            const startOffset = viewportHeight * 0.2;
            const endOffset = viewportHeight * 0.5;
            const distance = startOffset - top;
            const totalAnimateDistance = (containerHeight - endOffset) - startOffset;

            let progress = 0;
            if (distance > 0) {
                progress = distance / totalAnimateDistance;
            }
            progress = Math.min(1, Math.max(0, progress));

            const newHeight = progress * contentHeight;
            
            requestAnimationFrame(() => {
                animatedLineRef.current.style.height = `${newHeight}px`;
            });
        };

        // Initial setup on load
        const initialSetup = setTimeout(() => {
            setLineHeight(); 
        }, 100); 
        
        window.addEventListener('scroll', animateLine);
        window.addEventListener('resize', setLineHeight); 

        return () => {
            clearTimeout(initialSetup);
            timelineCards.forEach(card => observer.unobserve(card));
            window.removeEventListener('scroll', animateLine);
            window.removeEventListener('resize', setLineHeight);
        };
    }, []); 
    
    // Mock fetching user data
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) setUserName("Dhiraj Mane");
    }, []);

    return (
        <main id="main-content" className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent">
            <div id="home" className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {userName}!</h1> 
                <p className="text-slate-600 mb-12">Here's a timeline of the tools and resources available to support your well-being.</p>
                
                {/* Rotating Thought Container */}
                <div id="thought-container" className="relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-16 max-w-3xl mx-auto text-center border border-slate-200/50">
                    <Sparkles className="absolute -top-4 -left-4 w-10 h-10 text-purple-400 transform rotate-12 opacity-80" />
                    <p id="rotating-thought" className="text-xl italic font-medium text-slate-700 transition-opacity duration-500">
                        "{rotatingThought}"
                    </p>
                    <Sparkles className="absolute -bottom-4 -right-4 w-10 h-10 text-indigo-400 transform -rotate-12 opacity-80" />
                </div>

                {/* Timeline Container */}
                <div id="timeline-container" ref={timelineContainerRef} className="w-full">
                    <div id="timeline-content" ref={timelineContentRef} className="relative max-w-7xl mx-auto pb-20">

                        {/* --- AI ASSISTANT --- */}
                        <div className="flex justify-start pt-10 md:pt-20 md:gap-10">
                            <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                                    <div className="h-4 w-4 rounded-full bg-slate-200 border border-slate-300 p-2"></div>
                                </div>
                                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Assistant</h3>
                            </div>
                            <div className="relative pl-20 pr-4 md:pl-4 w-full timeline-card">
                                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Assistant</h3>
                                <div>
                                    <p className="text-slate-600 text-sm md:text-base font-normal mb-8">Our AI-powered chatbot provides immediate, confidential support for whatever is on your mind. Whether you need to talk through a stressful situation, practice mindfulness exercises, or learn new coping strategies, our assistant is available 24/7 to listen and guide you.</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="max-w-sm">
                                            <img src="ai_chatbot.jpg" alt="A visual representation of an AI chat assistant" className="w-full aspect-square object-cover rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-lg custom-shadow">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center flex-shrink-0">
                                                    <Bot className="w-5 h-5" />
                                                </div>
                                                <div className="bg-slate-100 rounded-lg p-3 text-sm">
                                                    <p>Hello! I'm here to help. What's on your mind today?</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 mt-3 justify-end">
                                                <div className="bg-blue-500 text-white rounded-lg p-3 text-sm">
                                                    <p>I'm feeling a bit stressed about exams.</p>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center flex-shrink-0">
                                                    <User className="w-5 h-5 text-slate-600" />
                                                </div>
                                            </div>
                                            {/* FIXED: Using React Router path */}
                                            <Link to="/ai-assistant" className="block w-full text-center mt-4 text-indigo-600 font-semibold hover:underline">Continue Conversation &rarr;</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- RESOURCES --- */}
                        <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
                            <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                                    <div className="h-4 w-4 rounded-full bg-slate-200 border border-slate-300 p-2"></div>
                                </div>
                                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Resources</h3>
                            </div>
                            <div className="relative pl-20 pr-4 md:pl-4 w-full timeline-card">
                                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Resources</h3>
                                <div>
                                    <p className="text-slate-600 text-sm md:text-base font-normal mb-8">Explore our curated library of mental health and wellness content. You'll find helpful videos, guided relaxation audios, and informative guides, all available in multiple regional languages.</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="max-w-sm">
                                            <img src="image2.png" alt="A library of wellness resources like videos and guides" className="w-full aspect-square object-cover rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-lg custom-shadow space-y-3">
                                            {/* FIXED: Using React Router path */}
                                            <Link to="/resources" className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-white hover:shadow-md transition-all">
                                                <Video className="w-6 h-6 text-indigo-500 mr-4" />
                                                <span className="font-semibold">Helpful Videos</span>
                                                <ArrowRight className="w-5 h-5 ml-auto text-slate-400" />
                                            </Link>
                                            {/* FIXED: Using React Router path */}
                                            <Link to="/resources" className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-white hover:shadow-md transition-all">
                                                <Headphones className="w-6 h-6 text-indigo-500 mr-4" />
                                                <span className="font-semibold">Relaxation Audios</span>
                                                <ArrowRight className="w-5 h-5 ml-auto text-slate-400" />
                                            </Link>
                                            {/* FIXED: Using React Router path */}
                                            <Link to="/resources" className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-white hover:shadow-md transition-all">
                                                <BookOpen className="w-6 h-6 text-indigo-500 mr-4" />
                                                <span className="font-semibold">Wellness Guides</span>
                                                <ArrowRight className="w-5 h-5 ml-auto text-slate-400" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- PEER SUPPORT --- */}
                        <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
                            <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                                    <div className="h-4 w-4 rounded-full bg-slate-200 border border-slate-300 p-2"></div>
                                </div>
                                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Peer Support</h3>
                            </div>
                            <div className="relative pl-20 pr-4 md:pl-4 w-full timeline-card">
                                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Peer Support</h3>
                                <div>
                                    <p className="text-slate-600 text-sm md:text-base font-normal mb-8">Connect with fellow students in a safe, moderated, and supportive environment. Our forum is a judgment-free place to share experiences, ask for advice, and know that you are not alone.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="max-w-sm">
                                            <img src="image3.png" alt="Students connecting and supporting each other" className="w-full aspect-square object-cover rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-lg custom-shadow">
                                            <p className="font-semibold text-center mb-2">Community Forum Preview</p>
                                            <div className="bg-slate-100 rounded-md p-2 text-xs mb-2">
                                                <span className="font-bold text-blue-600">User_A:</span> Has anyone found good ways to deal with pre-exam nerves?
                                            </div>
                                            <div className="bg-slate-100 rounded-md p-2 text-xs">
                                                <span className="font-bold text-green-600">Volunteer:</span> Definitely! Deep breathing exercises can be a great start. There are some guides in the Resources section.
                                            </div>
                                            {/* FIXED: Using React Router path */}
                                            <Link to="/peer-support" className="block w-full text-center mt-4 text-indigo-600 font-semibold hover:underline">Join the Conversation &rarr;</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- ASSESSMENTS --- */}
                        <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
                            <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                                    <div className="h-4 w-4 rounded-full bg-slate-200 border border-slate-300 p-2"></div>
                                </div>
                                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Assessments</h3>
                            </div>
                            <div className="relative pl-20 pr-4 md:pl-4 w-full timeline-card">
                                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Assessments</h3>
                                <div>
                                    <p className="text-slate-600 text-sm md:text-base font-normal mb-8">Take confidential, repeatable psychological screening tests to understand your mental state, identify potential areas of concern, and track your progress over time within a secure space.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="max-w-sm">
                                            <img src="image4.png" alt="A student thoughtfully taking a self-assessment on a device" className="w-full aspect-square object-cover rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-lg custom-shadow grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {/* FIXED: Using React Router path */}
                                            <Link to="/test-assessment" className="text-center p-4 bg-slate-50 rounded-lg hover:bg-white hover:shadow-md transition-all">
                                                <h4 className="font-bold">PHQ-9</h4>
                                                <p className="text-xs text-slate-500">Depression</p>
                                            </Link>
                                            {/* FIXED: Using React Router path */}
                                            <Link to="/test-assessment" className="text-center p-4 bg-slate-50 rounded-lg hover:bg-white hover:shadow-md transition-all">
                                                <h4 className="font-bold">GAD-7</h4>
                                                <p className="text-xs text-slate-500">Anxiety</p>
                                            </Link>
                                            {/* FIXED: Using React Router path */}
                                            <Link to="/test-assessment" className="text-center p-4 bg-slate-50 rounded-lg hover:bg-white hover:shadow-md transition-all">
                                                <h4 className="font-bold">GHQ</h4>
                                                <p className="text-xs text-slate-500">General Health</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- BOOKINGS --- */}
                        <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
                            <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                                    <div className="h-4 w-4 rounded-full bg-slate-200 border border-slate-300 p-2"></div>
                                </div>
                                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Bookings</h3>
                            </div>
                            <div className="relative pl-20 pr-4 md:pl-4 w-full timeline-card">
                                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Bookings</h3>
                                <div>
                                    <p className="text-slate-600 text-sm md:text-base font-normal mb-8">Schedule a confidential appointment with an institution counselor. Your student profile remains completely anonymized, ensuring your privacy. Our system helps link you with the right counselor for your needs.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="max-w-sm">
                                            <img src="image5.png" alt="A calendar interface for booking appointments" className="w-full aspect-square object-cover rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-lg custom-shadow">
                                            <p className="font-semibold text-center mb-4">Find an available time</p>
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                <div className="p-2 border rounded-md text-sm">Mon, 10am</div>
                                                <div className="p-2 border rounded-md text-sm bg-indigo-500 text-white">Mon, 2pm</div>
                                                <div className="p-2 border rounded-md text-sm">Tue, 11am</div>
                                            </div>
                                            {/* FIXED: Using React Router path */}
                                            <Link to="/bookings" className="block w-full text-center mt-4 text-indigo-600 font-semibold hover:underline">Schedule an Appointment &rarr;</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Static & Animated Line */}
                        <div id="static-line-container" ref={staticLineRef} className="absolute md:left-8 left-8 top-0 w-[2px] bg-gradient-to-b from-transparent from-0% via-slate-200 to-transparent to-99% [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
                            <div id="animated-line" ref={animatedLineRef} className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-0% via-10% rounded-full"></div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <footer className="relative bg-indigo-300/70 pt-16 pb-12 overflow-hidden mt-auto backdrop-blur-sm z-30">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 footer-grid-pattern"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="group flex items-center">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <ShieldHalf className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <span className="text-xl font-bold tracking-tight text-slate-900">
                                    MindEase Portal
                                </span>
                                <p className="text-slate-700 text-sm">Your space for confidential support.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-700 font-medium">
                            <a href="#" className="hover:text-slate-900 transition-colors">About</a>
                            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/90 border border-black/10 flex items-center justify-center text-gray-600 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg">
                                <Facebook className="h-[18px] w-[18px]" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/90 border border-black/10 flex items-center justify-center text-gray-600 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg">
                                <Twitter className="h-[18px] w-[18px]" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/90 border border-black/10 flex items-center justify-center text-gray-600 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg">
                                <Instagram className="h-[18px] w-[18px]" />
                            </a>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <h3 className="text-lg font-bold tracking-tight text-slate-900">Join Our Newsletter</h3>
                        <p className="text-slate-700 text-sm mt-2 mb-4 max-w-md mx-auto">Get updates on new resources, wellness tips, and upcoming events directly to your inbox.</p>
                        <form className="flex justify-center max-w-sm mx-auto mt-6">
                            <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                            <button type="submit" className="px-6 py-2 text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">Subscribe</button>
                        </form>
                    </div>

                    <div className="mt-12 pt-8 border-t border-black/10 text-center">
                        <p className="text-slate-600 text-sm font-medium">
                            &copy; 2024 Wellness Portal. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default StudentDashboard;