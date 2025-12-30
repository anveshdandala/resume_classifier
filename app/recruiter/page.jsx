"use client"
import React, { useState, useMemo } from 'react';
import GlassCard from '@/components/dashboard/GlassCard';
import UploadGate from '@/components/dashboard/UploadGate';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MOCK_CANDIDATES, SKILL_OPTIONS } from './constants';

const RecruiterPage = () => {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [filterSkill, setFilterSkill] = useState('All Skills');
  const [minScore, setMinScore] = useState(0);

  const filteredCandidates = useMemo(() => {
    return MOCK_CANDIDATES.filter(c => {
      const matchSkill = filterSkill === 'All Skills' || c.skills.includes(filterSkill);
      const matchScore = c.atsScore >= minScore;
      return matchSkill && matchScore;
    });
  }, [filterSkill, minScore]);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Recruiter Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage and analyze your candidate pipeline with AI.</p>
          </div>
          <button 
            onClick={() => setIsGateOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Resumes
          </button>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard hoverEffect>
            <p className="text-slate-400 text-sm font-medium">Total Resumes</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">1,248</span>
              <span className="text-green-400 text-sm font-semibold">+12%</span>
            </div>
          </GlassCard>
          <GlassCard hoverEffect>
            <p className="text-slate-400 text-sm font-medium">Avg. ATS Score</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">78%</span>
              <span className="text-blue-400 text-sm font-semibold">Healthy</span>
            </div>
          </GlassCard>
          <GlassCard hoverEffect>
            <p className="text-slate-400 text-sm font-medium">Top Skill Detected</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">React</span>
              <span className="text-slate-500 text-sm">450 candidates</span>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <GlassCard className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-white">Filters</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Skillset</label>
                  <select 
                    value={filterSkill}
                    onChange={(e) => setFilterSkill(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-blue-500 transition-colors"
                  >
                    {SKILL_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-slate-900">{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Min ATS Score: {minScore}%</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={minScore} 
                    onChange={(e) => setMinScore(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div className="pt-4 border-t border-white/5">
                  <button 
                    onClick={() => { setFilterSkill('All Skills'); setMinScore(0); }}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </GlassCard>
          </aside>

          <div className="lg:col-span-3">
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-6 py-4 text-sm font-semibold text-slate-400">Candidate</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-400">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-center">Exp</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-right">ATS Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCandidates.map((candidate) => (
                      <tr key={candidate.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">{candidate.name}</div>
                          <div className="text-xs text-slate-500 flex gap-2 mt-1">
                            {candidate.skills.slice(0, 3).map(s => <span key={s}>• {s}</span>)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{candidate.role}</td>
                        <td className="px-6 py-4 text-sm text-slate-300 text-center">{candidate.experience}y</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            candidate.atsScore >= 90 ? 'bg-green-500/20 text-green-400' : 
                            candidate.atsScore >= 75 ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                          }`}>
                            {candidate.atsScore}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </div>

        <UploadGate 
          isOpen={isGateOpen} 
          onClose={() => setIsGateOpen(false)} 
          message="Please login or sign up to upload resumes and start classifying candidates."
        />
      </div>
    </DashboardLayout>
  );
};

export default RecruiterPage;
