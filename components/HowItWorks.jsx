
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Upload Resume",
      desc: "Drag and drop your PDF or Word document into our secure portal."
    },
    {
      num: "02",
      title: "AI Analysis",
      desc: "Our model parses the content against 50+ industry standards and hiring trends."
    },
    {
      num: "03",
      title: "Get Insights",
      desc: "Review your ATS score, suggested improvements, and top matching roles."
    },
    {
      num: "04",
      title: "Optimize & Apply",
      desc: "Refine your profile and submit to recruiters with high confidence."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it Works</h2>
          <p className="text-slate-400">Simple process, professional results.</p>
        </div>

        <div className="relative">
          {/* Connector Line (visible on md+) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-xl font-bold text-primary-400 mb-6 group-hover:border-primary-500/50 transition-colors shadow-lg shadow-black/50">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
