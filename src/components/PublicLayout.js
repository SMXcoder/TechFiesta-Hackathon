import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Instagram, ShieldHalf } from 'lucide-react';

const PublicLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-inter text-slate-800">
      {/* Header */}
      <header className="fixed z-50 w-full border-b border-indigo-200/50 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-slate-900">MindEase</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/how-it-works" className="hover:text-indigo-600 transition">How It Works</Link>
            <Link to="/public-resources" className="hover:text-indigo-600 transition">Our Resources</Link>
            <Link to="/for-institutions" className="hover:text-indigo-600 transition">For Institutions</Link>
            <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
            <div className="flex gap-3 pl-4 border-l border-slate-200">
                <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-slate-100 font-medium transition">Login</Link>
                <Link to="/signup" className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition">Sign Up</Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 shadow-lg absolute w-full">
            <Link to="/how-it-works" className="block py-2 text-slate-600">How It Works</Link>
            <Link to="/public-resources" className="block py-2 text-slate-600">Our Resources</Link>
            <Link to="/for-institutions" className="block py-2 text-slate-600">For Institutions</Link>
            <Link to="/about" className="block py-2 text-slate-600">About</Link>
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <Link to="/login" className="text-center py-2 border rounded-lg">Login</Link>
                <Link to="/signup" className="text-center py-2 bg-slate-900 text-white rounded-lg">Sign Up</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-indigo-100/50 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <ShieldHalf className="text-indigo-600" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-slate-900">MindEase</span>
                        <p className="text-slate-600 text-sm">Your space for confidential support.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    {[Facebook, Twitter, Instagram].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:shadow-md transition-all">
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>
            <div className="border-t border-indigo-200/50 pt-8 text-center text-slate-500 text-sm">
                © 2024 MindEase. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;