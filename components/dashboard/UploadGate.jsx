import GlassCard from './GlassCard';

const UploadGate = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
      <GlassCard className="max-w-md w-full border-blue-500/30 shadow-2xl shadow-blue-500/10 animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Access Restricted</h3>
          <p className="text-slate-400 mb-8">{message}</p>
          
          <div className="flex flex-col gap-3">
            <button 
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all"
              onClick={() => window.location.reload()}
            >
              Log In
            </button>
            <button 
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all"
              onClick={() => window.location.reload()}
            >
              Sign Up
            </button>
            <button 
              className="mt-2 text-sm text-slate-500 hover:text-slate-300"
              onClick={onClose}
            >
              Maybe later
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default UploadGate;
