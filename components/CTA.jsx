
import React from 'react';

const CTA = () => {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] overflow-hidden p-12 md:p-20 text-center bg-primary-600">
           {/* Abstract shapes */}
           <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[150%] bg-primary-500 rounded-full blur-[80px] -rotate-12 opacity-50"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[150%] bg-blue-700 rounded-full blur-[80px] rotate-12 opacity-50"></div>

           <div className="relative z-10">
             <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to land your dream job?</h2>
             <p className="text-primary-100 text-lg mb-10 max-w-xl mx-auto">Join 10,000+ professionals who have optimized their career path with our AI classifier.</p>
             <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-primary-600 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-xl shadow-black/10">
                  Get My Free Score
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-primary-700/50 backdrop-blur-sm text-white border border-primary-400/30 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all">
                  Schedule Demo
                </button>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
