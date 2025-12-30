
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">Resume Classifier</span>
          </div>
          
          <div className="flex space-x-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="mt-6 md:mt-0 text-slate-500 text-sm">
            © {new Date().getFullYear()} Resume Classifier AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
