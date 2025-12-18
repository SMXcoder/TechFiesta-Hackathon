import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldHalf, ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const SignupPage = () => {
    // Consolidated form data state
    const [formData, setFormData] = useState({
        role: 'student',
        email: '',
        password: '',
        username: '',
        institution: '',
        age: '',
        language: 'English',
        studyField: '',
        licenseId: '',
        expertise: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    
    // Helper to update formData state generically
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        // Use name attribute as fallback for non-ID elements like textarea
        setFormData(prev => ({ ...prev, [id || e.target.name]: value }));
    };

    // Helper to set role specifically
    const setRoleAndFormData = (newRole) => {
        setFormData(prev => ({ ...prev, role: newRole }));
    };

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

        const resizeObserver = new ResizeObserver(() => {
            cancelAnimationFrame(animationFrameId);
            setupCanvas();
            animate();
        });

        resizeObserver.observe(container);

        setupCanvas();
        animate();

        return () => {
            resizeObserver.unobserve(container);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // --- Form Submission Logic ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const payload = { ...formData };
            console.log("Registration Payload:", payload);

            if (formData.role === 'counselor') {
                localStorage.setItem('counselorEmail', formData.email.toLowerCase());
            }
            
            alert(`Registration for ${formData.role} successful! Please login.`);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed due to server error.');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center main-container-auth p-4">
            {/* DESIGN FIX: Forces a fixed height on desktop so left panel is visible */}
            <div className="w-full max-w-4xl flex bg-white shadow-xl rounded-2xl overflow-hidden animate-fade-in-scale-up h-auto md:h-[800px]">
                
                {/* Left side - Animation */}
                <div className="hidden md:block w-1/2 h-full relative overflow-hidden border-r border-gray-100">
                    <div id="animation-container" className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                        <canvas id="wellness-canvas" ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                            <div className="mb-6">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                                   <ShieldHalf className="text-white h-6 w-6" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Join our Community</h2>
                            <p className="text-sm text-center text-gray-600 max-w-xs">Create an account to access resources and find the support you need.</p>
                        </div>
                    </div>
                </div>
                
                {/* Right side - Sign Up Form */}
                <div className="w-full md:w-1/2 h-full p-8 md:p-10 flex flex-col justify-center bg-white overflow-y-auto relative">
                    
                    {/* NEW: Back to Home Link */}
                    <div className="absolute top-6 left-8 md:left-10">
                        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Home
                        </Link>
                    </div>

                    <div className="mt-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-800">Create an Account</h1>
                        <p className="text-gray-500 mb-6">Let's get you started.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button" onClick={() => setRoleAndFormData('student')} className={`p-3 border rounded-lg font-medium transition-colors ${formData.role === 'student' ? 'role-btn-active' : 'text-gray-600 bg-gray-50 hover:bg-gray-100'}`}>Student</button>
                                    <button type="button" onClick={() => setRoleAndFormData('counselor')} className={`p-3 border rounded-lg font-medium transition-colors ${formData.role === 'counselor' ? 'role-btn-active' : 'text-gray-600 bg-gray-50 hover:bg-gray-100'}`}>Counselor</button>
                                </div>
                            </div>

                            {/* Student Specific Fields */}
                            {formData.role === 'student' && (
                                <div id="student-fields" className="space-y-4">
                                    <div>
                                        <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                                        <input 
                                            id="institution" 
                                            type="text" 
                                            placeholder="e.g., University of Wellness" 
                                            required 
                                            className="flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.institution}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                        <input 
                                            id="username" 
                                            type="text" 
                                            placeholder="Choose a username" 
                                            required 
                                            className="flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                            <input 
                                                id="age" 
                                                type="number" 
                                                placeholder="e.g., 21" 
                                                required 
                                                className="flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.age}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                            <select 
                                                id="language" 
                                                required 
                                                className="flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.language}
                                                onChange={handleInputChange}
                                            >
                                                <option>English</option>
                                                <option>Hindi</option>
                                                <option>Marathi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="studyField" className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                                        <input 
                                            id="studyField" 
                                            type="text" 
                                            placeholder="e.g., Computer Science" 
                                            required 
                                            className="flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.studyField}
                                            onChange={handleInputChange}
                                        />
                                    
                                    </div>
                                </div>
                            )}
                            {/* Counselor Specific Fields */}
                            {formData.role === 'counselor' && (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="licenseId" className="block text-sm font-medium text-gray-700 mb-1">Counseling License ID</label>
                                        <input 
                                            id="licenseId"
                                            type="text" 
                                            placeholder="Counseling License ID" 
                                            required 
                                            className="flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.licenseId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">Areas of Expertise</label>
                                        <textarea 
                                            id="expertise"
                                            name="expertise"
                                            placeholder="Areas of Expertise" 
                                            rows="3" 
                                            required 
                                            className="flex w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.expertise}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Shared Fields */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-blue-500">*</span></label>
                                <input 
                                    id="email" 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    required 
                                    className="flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-blue-500">*</span></label>
                                <div className="relative">
                                    <input 
                                        id="password" 
                                        type={showPassword ? 'text' : 'password'} 
                                        placeholder="Create a password" 
                                        required 
                                        className="flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700">
                                        {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <button type="submit" className="submit-button w-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-200">
                                    <span className="flex items-center justify-center">Create Account <ArrowRight className="ml-2 h-4 w-4" /></span>
                                    <span className="shine-effect"></span>
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;