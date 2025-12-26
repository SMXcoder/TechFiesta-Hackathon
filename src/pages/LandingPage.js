import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, Sun, Moon, ArrowRightCircle, Mail, 
  ShieldHalf, Bot, CalendarPlus, BookOpenCheck, Users, 
  Facebook, Twitter, Instagram 
} from 'lucide-react';

const LandingPage = () => {
  // --- State ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // --- Refs for Animation ---
  const timelineContainerRef = useRef(null);
  const timelineContentRef = useRef(null);
  const staticLineRef = useRef(null);
  const animatedLineRef = useRef(null);

  // --- Theme Toggle Logic ---
  useEffect(() => {
    // Check local storage or system preference on load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // --- Scroll & Intersection Observer Logic ---
  useEffect(() => {
    // 1. Fade-in on scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.2 });

    const hiddenElements = document.querySelectorAll('.timeline-card, #journey-heading');
    hiddenElements.forEach(el => observer.observe(el));

    // 2. Timeline Line Animation
    const handleScroll = () => {
      if (!timelineContainerRef.current || !animatedLineRef.current) return;

      const container = timelineContainerRef.current;
      const { top } = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const startOffset = viewportHeight * 0.1;
      const endOffset = viewportHeight * 0.5;
      const distance = startOffset - top;
      const totalAnimateDistance = (containerHeight - endOffset) - startOffset;

      let progress = 0;
      if (distance > 0) {
        progress = distance / totalAnimateDistance;
      }
      progress = Math.min(1, Math.max(0, progress));

      // Update height of the animated line
      // Note: We need the full content height for the calculation to look smooth relative to content
      const fullHeight = timelineContentRef.current?.offsetHeight || 0;
      animatedLineRef.current.style.height = `${progress * fullHeight}px`;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Handle resize too

    // Set initial static line height
    if (staticLineRef.current && timelineContentRef.current) {
        staticLineRef.current.style.height = `${timelineContentRef.current.offsetHeight}px`;
    }

    return () => {
      hiddenElements.forEach(el => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="text-slate-800 dark:text-zinc-200">
      
      {/* --- HEADER --- */}
      <header>
        <nav id="navbar" className="group fixed z-20 w-full border-b border-indigo-200/50 bg-white/40 backdrop-blur-lg md:relative dark:border-zinc-700/50 dark:bg-zinc-950/50 xl:dark:bg-transparent">
          <div className="m-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 xl:gap-0 xl:py-4">
              <div className="flex w-full justify-between xl:w-auto">
                <Link to="/" aria-label="home" className="flex items-center space-x-3">
                  <img src="/logo.jpg" className="h-12 w-auto" alt="MindEase Logo" />
                  <span className="text-xl font-bold text-slate-900 dark:text-white">MindEase</span>
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  aria-label="Open Menu" 
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 xl:hidden text-slate-800 dark:text-white"
                >
                  {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
              </div>

              <div id="nav-menu" className={`${isMenuOpen ? 'block' : 'hidden'} w-full bg-white/50 dark:bg-zinc-900/80 mb-6 flex-wrap items-center justify-end space-y-8 rounded-3xl border border-indigo-100/50 p-6 shadow-2xl shadow-slate-300/20 md:flex-nowrap xl:m-0 xl:flex xl:w-fit xl:gap-6 xl:space-y-0 xl:border-transparent xl:bg-transparent xl:p-0 xl:shadow-none dark:border-zinc-700 dark:shadow-none`}>
                <div className="xl:pr-4">
                  <ul className="space-y-6 text-base xl:flex xl:gap-8 xl:space-y-0 xl:text-sm">
                    <li><Link to="/how-it-works" className="text-slate-700 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white block duration-150"><span>How It Works</span></Link></li>
                    <li><Link to="/resources" className="text-slate-700 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white block duration-150"><span>Our Resources</span></Link></li>
                    <li><Link to="/for-institutions" className="text-slate-700 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white block duration-150"><span>For Institutions</span></Link></li>
                    <li><Link to="/about" className="text-slate-700 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white block duration-150"><span>About</span></Link></li>
                  </ul>
                </div>
                
                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit xl:border-l xl:pl-6 border-slate-200 dark:xl:border-zinc-700">
                  {/* Theme Toggle */}
                  <button 
                    onClick={toggleTheme} 
                    type="button" 
                    aria-label="Toggle theme" 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 border border-white/30 bg-white/20 hover:bg-white/40 text-slate-700 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50"
                  >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>

                  <Link to="/login" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-3 border border-white/30 bg-white/20 hover:bg-white/40 text-slate-700 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50">
                    <span>Login</span>
                  </Link>
                  <Link to="/signup" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-3 bg-slate-800 text-slate-50 hover:bg-slate-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90">
                    <span>Sign Up</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* --- HERO SECTION --- */}
        <section className="bg-transparent">
          <div className="mx-auto flex max-w-7xl">
            <div className="w-full px-6 py-28 lg:w-1/2 lg:py-20">
              <div className="relative mx-auto max-w-xl text-center lg:text-left">
                <a href="#" className="rounded-lg mx-auto flex w-fit items-center gap-2 border border-white/30 bg-white/20 p-1 pr-2 backdrop-blur-md dark:border-zinc-700 lg:ml-0">
                  <span className="bg-white/40 text-slate-700 dark:bg-zinc-800 rounded-md px-2 py-1 text-xs">New</span>
                  <span className="text-sm text-slate-600 dark:text-zinc-400"> Now available in regional languages!</span>
                  <ArrowRightCircle className="size-5 ml-1 text-slate-500 dark:text-zinc-400" />
                </a>
                <h1 className="mt-10 text-balance text-4xl font-bold md:text-5xl xl:text-5xl text-slate-800 dark:text-white">
                  A Safe Space for Your Mental Wellness
                </h1>
                <p className="mt-8 text-slate-600 dark:text-zinc-400">
                  A confidential, stigma-free platform offering AI-guided support, professional counseling, and peer connections to help you navigate the challenges of college life.
                </p>
                <div>
                  <form id="waitlist-form" className="mx-auto my-10 max-w-sm lg:my-12 lg:ml-0 lg:mr-auto" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative grid grid-cols-[1fr_auto] items-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md pr-1.5 shadow-lg shadow-slate-400/10 dark:border-zinc-700 dark:bg-zinc-900/50 dark:shadow-none">
                      <Mail className="text-slate-500 pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />
                      <input placeholder="Your mail address" className="h-14 w-full bg-transparent pl-12 focus:outline-none placeholder:text-slate-500 dark:placeholder:text-zinc-400" type="email" />
                      <Link to="/signup" aria-label="Get Started" className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium h-10 px-4 py-2 bg-slate-800 text-slate-50 hover:bg-slate-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90">
                        <span>Get Started</span>
                      </Link>
                    </div>
                  </form>
                  <ul className="list-inside list-disc space-y-2 text-slate-600 dark:text-zinc-400">
                    <li>Confidential & Secure</li>
                    <li>Available 24/7</li>
                    <li>Tailored for Students</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Right Side Video */}
            <div className="hidden lg:block lg:w-1/2 [mask-image:linear-gradient(to_right,transparent,black_50%)]">
              <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                <source src="/Mesmerizing_Plasma_Animation_Generation.mp4" type="video/mp4" />
                <source src="/Mesmerizing_Plasma_Animation_Generation.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </section>

        {/* --- TIMELINE SECTION --- */}
        <section>
          <div id="timeline-container" ref={timelineContainerRef} className="w-full md:px-10 overflow-x-hidden">
            <div className="max-w-4xl mx-auto py-20 px-4 text-center">
              <h2 id="journey-heading" className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">Our Journey to Support Student Wellness</h2>
              <p class="mt-4 text-lg text-slate-600 dark:text-neutral-300">We recognized the growing mental health challenges students face and have been passionately building a platform to provide accessible and stigma-free support.</p>
            </div>
            
            <div id="timeline-content" ref={timelineContentRef} className="relative max-w-7xl mx-auto pb-20">
              
              {/* Card 1: The Challenge */}
              <div className="flex justify-start pt-10 md:pt-20 md:gap-10">
                <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                  <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white/40 backdrop-blur-md dark:bg-black flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-blue-300 dark:bg-neutral-800 border border-blue-400/50 dark:border-neutral-700 p-2"></div>
                  </div>
                  <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-slate-500 dark:text-neutral-500">The Challenge</h3>
                </div>
                <div className="relative pl-20 pr-4 md:pl-4 w-full timeline-card">
                  <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-slate-500 dark:text-neutral-500">The Challenge</h3>
                  <div className="bg-white/30 dark:bg-zinc-900/30 p-6 rounded-xl backdrop-blur-sm">
                    <p className="text-slate-800 dark:text-zinc-200 text-lg leading-relaxed font-normal mb-8">Students today face immense academic pressure, social anxiety, and the stress of balancing life and education. Traditional support systems are often hard to access and carry a stigma.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <img src="/index1.jpg" alt="Student overwhelmed" className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg" />
                      <img src="/index2.jpg" alt="Student anxious" className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Our Solution */}
              <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
                <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                  <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white/40 backdrop-blur-md dark:bg-black flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-blue-300 dark:bg-neutral-800 border border-blue-400/50 dark:border-neutral-700 p-2"></div>
                  </div>
                  <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-slate-500 dark:text-neutral-500">Our Solution</h3>
                </div>
                <div className="relative pl-20 pr-4 md:pl-4 w-full timeline-card">
                  <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-slate-500 dark:text-neutral-500">Our Solution</h3>
                  <div className="bg-white/30 dark:bg-zinc-900/30 p-6 rounded-xl backdrop-blur-sm">
                    <p className="text-slate-800 dark:text-zinc-200 text-lg leading-relaxed font-normal mb-8">We created a digital-first platform offering a suite of tools designed for students. From an AI companion for immediate support to confidential booking with counselors, our goal is to provide help whenever and wherever it's needed.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <img src="/index.3.jpg" alt="AI therapy" className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg" />
                      <img src="/index4.jpg" alt="Supportive community" className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: How We Help */}
              <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
                <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                  <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white/40 backdrop-blur-md dark:bg-black flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-blue-300 dark:bg-neutral-800 border border-blue-400/50 dark:border-neutral-700 p-2"></div>
                  </div>
                  <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-slate-500 dark:text-neutral-500">How We Help</h3>
                </div>
                <div className="relative pl-20 pr-4 md:pl-4 w-full">
                  <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-slate-500 dark:text-neutral-500">How We Help</h3>
                  <div className="bg-white/30 dark:bg-zinc-900/30 p-6 rounded-xl backdrop-blur-sm timeline-card">
                    <p className="text-slate-800 dark:text-zinc-200 text-lg leading-relaxed font-normal mb-6">Our platform is built on pillars of accessibility, confidentiality, and community. Core features include:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Feature 1 */}
                      <div className="bg-white/50 dark:bg-zinc-900/50 p-6 rounded-xl border border-white/50 dark:border-zinc-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full"><Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/></div>
                          <div><h4 className="font-bold text-slate-800 dark:text-white">AI-Powered First Aid</h4><p className="text-sm text-slate-600 dark:text-zinc-400">Instant coping strategies.</p></div>
                        </div>
                      </div>
                      {/* Feature 2 */}
                      <div className="bg-white/50 dark:bg-zinc-900/50 p-6 rounded-xl border border-white/50 dark:border-zinc-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full"><CalendarPlus className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/></div>
                          <div><h4 className="font-bold text-slate-800 dark:text-white">Confidential Booking</h4><p className="text-sm text-slate-600 dark:text-zinc-400">Schedule with counselors.</p></div>
                        </div>
                      </div>
                      {/* Feature 3 */}
                      <div className="bg-white/50 dark:bg-zinc-900/50 p-6 rounded-xl border border-white/50 dark:border-zinc-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full"><BookOpenCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/></div>
                          <div><h4 className="font-bold text-slate-800 dark:text-white">Resource Hub</h4><p className="text-sm text-slate-600 dark:text-zinc-400">Videos, audios, and guides.</p></div>
                        </div>
                      </div>
                      {/* Feature 4 */}
                      <div className="bg-white/50 dark:bg-zinc-900/50 p-6 rounded-xl border border-white/50 dark:border-zinc-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full"><Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/></div>
                          <div><h4 className="font-bold text-slate-800 dark:text-white">Peer Support Forum</h4><p className="text-sm text-slate-600 dark:text-zinc-400">Connect with other students.</p></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Lines */}
              <div id="static-line-container" ref={staticLineRef} className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent from-0% via-slate-300 dark:via-neutral-700 to-transparent to-99% [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
                <div id="animated-line" ref={animatedLineRef} className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-0% via-10% rounded-full"></div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="relative bg-indigo-200/70 dark:bg-zinc-900/50 pt-16 pb-12 overflow-hidden mt-auto backdrop-blur-sm z-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 footer-grid-pattern"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="group flex items-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <ShieldHalf className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">MindEase</span>
                <p className="text-slate-600 dark:text-zinc-400 text-sm">Your space for confidential support.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-700 dark:text-zinc-300 font-medium">
              <Link to="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/90 dark:bg-zinc-800 border border-black/10 dark:border-zinc-700 flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg">
                <Facebook className="h-[18px] w-[18px]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/90 dark:bg-zinc-800 border border-black/10 dark:border-zinc-700 flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg">
                <Twitter className="h-[18px] w-[18px]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/90 dark:bg-zinc-800 border border-black/10 dark:border-zinc-700 flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg">
                <Instagram className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
          <div className="mt-12 text-center">
            <h3 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">Join Our Newsletter</h3>
            <p className="text-slate-600 dark:text-zinc-400 text-sm mt-2 mb-4 max-w-md mx-auto">Get updates on new resources, wellness tips, and upcoming events directly to your inbox.</p>
            <form className="flex justify-center max-w-sm mx-auto mt-6" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
              <button type="submit" className="px-6 py-2 text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">Subscribe</button>
            </form>
          </div>
          <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 text-center">
            <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium">
              © 2024 MindEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;