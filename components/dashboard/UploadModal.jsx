import React from 'react';
import GlassCard from './GlassCard';
import MultiUploadForm from './MultiUploadForm';

const UploadModal = ({ isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-slate-400 hover:text-white p-2 transition-colors z-[101]"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <GlassCard className="w-full border-blue-500/30 shadow-2xl shadow-blue-500/10 animate-in zoom-in-95 duration-300 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Upload Resumes</h3>
            <p className="text-slate-400">Select up to 10 resumes for batch processing.</p>
          </div>
          
          <MultiUploadForm onSuccess={onSuccess} />
        </GlassCard>
      </div>
    </div>
  );
};

export default UploadModal;
