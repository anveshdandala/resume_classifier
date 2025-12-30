import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">AI-Powered ATS Insights</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
          Analyze. Improve. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">Shortlist. Faster.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          Stop guessing why you aren't getting interviews. Our AI platform scores resumes for applicants and helps recruiters filter top talent in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/applicant" className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-primary-900/40">
            Get Resume Score
          </Link>
          <Link href="/recruiter" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-lg transition-all">
            Recruiter Dashboard
          </Link>
        </div>

        {/* Dashboard Mockup Preview */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="glass-card rounded-2xl p-2 shadow-2xl border border-white/5 ring-1 ring-white/10">
            <div className="bg-slate-900/50 rounded-xl aspect-[16/9] flex items-center justify-center overflow-hidden">
               <div className="w-full h-full p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="h-4 w-32 bg-white/5 rounded"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-4">
                      <div className="h-32 bg-white/5 rounded-lg border border-white/5 p-4 flex flex-col justify-end">
                        <div className="h-4 w-1/2 bg-white/10 rounded mb-2"></div>
                        <div className="h-3 w-3/4 bg-white/5 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-white/5 rounded-lg border border-white/5"></div>
                        <div className="h-24 bg-white/5 rounded-lg border border-white/5"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-full bg-white/5 rounded-lg border border-white/5 flex flex-col p-4">
                        <div className="h-20 w-20 rounded-full bg-primary-900/20 border-2 border-primary-500/30 self-center mb-4 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary-400">85%</span>
                        </div>
                        <div className="space-y-2 mt-auto">
                           <div className="h-2 w-full bg-white/5 rounded"></div>
                           <div className="h-2 w-4/5 bg-white/5 rounded"></div>
                           <div className="h-2 w-full bg-white/5 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
