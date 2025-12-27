
import React from 'react';
import Navbar from '@/components/Navbar.jsx';
import Hero from '@/components/Hero.jsx';
import Problem from '@/components/Problem.jsx';
import Features from '@/components/Features.jsx';
import HowItWorks from '@/components/HowItWorks.jsx';
import CTA from '@/components/CTA.jsx';
import Footer from '@/components/Footer.jsx';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary-500 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
