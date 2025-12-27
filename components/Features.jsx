
import React from 'react';

const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tailored for your journey</h2>
          <p className="text-slate-400">Whether you're looking for a job or looking for a colleague.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Applicants */}
          <div className="relative p-10 rounded-3xl bg-gradient-to-br from-primary-900/20 to-transparent border border-primary-500/10 overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg className="w-32 h-32 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
             </div>
             <h3 className="text-2xl font-bold text-white mb-6">For Applicants</h3>
             <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary-600/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">Instant ATS Scoring</h4>
                    <p className="text-slate-400 text-sm">See exactly how a machine reads your resume and get a score from 0 to 100.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary-600/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">Skill Gap Analysis</h4>
                    <p className="text-slate-400 text-sm">Compare your resume against JD-specific keywords to see what's missing.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary-600/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">Actionable Suggestions</h4>
                    <p className="text-slate-400 text-sm">Specific advice on phrasing, bullet points, and formatting to beat the bots.</p>
                  </div>
                </li>
             </ul>
          </div>

          {/* For Recruiters */}
          <div className="relative p-10 rounded-3xl bg-gradient-to-br from-indigo-900/20 to-transparent border border-indigo-500/10 overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg className="w-32 h-32 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" />
                </svg>
             </div>
             <h3 className="text-2xl font-bold text-white mb-6">For Recruiters</h3>
             <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">Bulk Resume Parsing</h4>
                    <p className="text-slate-400 text-sm">Upload hundreds of PDFs and let AI categorize and extract data in bulk.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">Smart Filters & Ranking</h4>
                    <p className="text-slate-400 text-sm">Rank candidates based on customized criteria like experience, skills, and education.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">AI Candidate Summaries</h4>
                    <p className="text-slate-400 text-sm">Get a 3-sentence summary of every candidate before you even open their file.</p>
                  </div>
                </li>
             </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
