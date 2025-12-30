
import React from 'react';

const Problem = () => {
  const painPoints = [
    {
      title: "The Black Hole",
      desc: "75% of resumes are discarded by ATS before even reaching a human eye.",
      icon: "🕳️"
    },
    {
      title: "Manual Overhead",
      desc: "Recruiters spend an average of 6 seconds per resume. Top talent gets missed.",
      icon: "⏳"
    },
    {
      title: "Unseen Bias",
      desc: "Subtle formatting issues can lead to rejection despite high candidate quality.",
      icon: "⚖️"
    }
  ];

  return (
    <section className="py-24 bg-slate-950/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Screening Problem</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Traditional hiring is broken. We use artificial intelligence to bridge the gap between quality candidates and perfect roles.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, i) => (
            <div key={i} className="p-8 rounded-2xl glass-card hover:bg-white/5 transition-all group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{point.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
              <p className="text-slate-400 leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
