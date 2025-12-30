"use client"
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b border-white/5 bg-slate-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary-400 transition-colors">Resume Classifier</span>
          </Link>
          
          <div className="flex items-center space-x-4">
             {/* Placeholder for future nav items or user profile */}
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-xs font-semibold text-white cursor-pointer hover:bg-slate-600 transition-colors">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
