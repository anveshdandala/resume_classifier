
import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Resume Classifier</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</a>
            <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">How it Works</a>
            <button className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary-900/20">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
