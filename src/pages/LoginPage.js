import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldHalf, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    // --- Canvas Animation Logic ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let orbs = [];
        const container = canvas.parentElement;

        const setupCanvas = () => {
            const { width, height } = container.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;
            
            orbs = [];
            const orbCount = Math.floor(width / 30); 
            for(let i = 0; i < orbCount; i++) {
                const radius = Math.random() * 3 + 2;
                orbs.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    dx: (Math.random() - 0.5) * 0.5,
                    dy: (Math.random() - 0.5) * 0.5,
                    radius: radius,
                    color: `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`
                });
            }
        };

        function drawConnections() {
            for (let i = 0; i < orbs.length; i++) {
                for (let j = i; j < orbs.length; j++) {
                    const dist = Math.hypot(orbs[i].x - orbs[j].x, orbs[i].y - orbs[j].y);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(orbs[i].x, orbs[i].y);
                        ctx.lineTo(orbs[j].x, orbs[j].y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${1 - dist / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function drawOrbs() {
            orbs.forEach(orb => {
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                ctx.fillStyle = orb.color;
                ctx.fill();
                orb.x += orb.dx;
                orb.y += orb.dy;
                if (orb.x < 0 || orb.x > canvas.width) orb.dx *= -1;
                if (orb.y < 0 || orb.y > canvas.height) orb.dy *= -1;
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawConnections();
            drawOrbs();
            animationFrameId = requestAnimationFrame(animate);
        }

        const handleResize = () => {
            cancelAnimationFrame(animationFrameId);
            setupCanvas();
            animate();
        };

        window.addEventListener('resize', handleResize);
        setupCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // --- Core Demo Login Function ---
    const handleDemoLogin = (role) => {
        const redirectPath = role === 'counselor' ? '/counselor/dashboard' : '/dashboard';
        console.log(`[DEMO MODE] Logging in as ${role.toUpperCase()}.`);
        localStorage.setItem('authToken', 'demo-token');
        localStorage.setItem('userRole', role);
        navigate(redirectPath);
    };

    // --- Form Submission Logic ---
    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve saved counselor email (if any) from signup
        const savedCounselorEmail = localStorage.getItem('counselorEmail');
        const inputEmail = formData.email.toLowerCase();
        let mockRole;

        // Check if input matches saved counselor email OR the specific test email
        if ((savedCounselorEmail && inputEmail === savedCounselorEmail) || 
            inputEmail.includes('counselor') || 
            inputEmail === 'aryanmane@gmail.com') {
            mockRole = 'counselor';
        } else {
            mockRole = 'student';
        }
        
        handleDemoLogin(mockRole);
    };

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center main-container-auth p-4">
            <div className="w-full max-w-4xl flex bg-white shadow-xl rounded-2xl overflow-hidden animate-fade-in-scale-up h-[600px]">
                
                {/* Left side - Animation */}
                <div id="animation-container" className="hidden md:block w-1/2 relative overflow-hidden border-r border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-100">
                    <canvas id="wellness-canvas" ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                        <div className="mb-6">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                                <ShieldHalf className="text-white h-6 w-6" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">MindEase</h2>
                        <p className="text-sm text-center text-gray-600 max-w-xs">A safe and supportive space for your well-being. Sign in to access resources and connect with support.</p>
                    </div>
                </div>
                
                {/* Right side - Sign In Form */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white relative">
                    
                    {/* NEW: Back to Home Link */}
                    <div className="absolute top-6 left-8 md:left-10">
                        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Home
                        </Link>
                    </div>

                    <div className="mt-6">
                        <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-800">Welcome Back</h1>
                        <p className="text-gray-500 mb-6">Sign in to your account</p>
                        
                        {/* Google Login Button */}
                        <div className="mb-6">
                            <button className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-all duration-300 text-gray-700 shadow-sm">
                                <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fillOpacity=".54"></path><path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="#34A853" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path fill="#FBBC05" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path><path fill="#EA4335" d="M1 1h22v22H1z" fillOpacity="0"></path></svg>
                                <span>Login with Google</span>
                            </button>
                        </div>
                        
                        <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">or</span></div></div>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-blue-500">*</span></label>
                                <input id="email" type="email" placeholder="Enter your email address" required className="flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={handleInputChange} />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-blue-500">*</span></label>
                                <div className="relative">
                                    <input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required className="flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={handleInputChange} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700">
                                        {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <button type="submit" className="submit-button w-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-200">
                                    <span className="flex items-center justify-center">Sign in <ArrowRight className="ml-2 h-4 w-4" /></span>
                                    <span className="shine-effect"></span>
                                </button>
                            </div>
                            
                            <div className="text-center mt-6">
                                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm transition-colors">Forgot password?</a>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;