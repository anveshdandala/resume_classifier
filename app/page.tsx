
import React from 'react';
import Navbar from '@/components/landing/Navbar.jsx';
import Hero from '@/components/landing/Hero.jsx';
import Problem from '@/components/landing/Problem.jsx';
import Features from '@/components/landing/Features.jsx';
import HowItWorks from '@/components/landing/HowItWorks.jsx';
import CTA from '@/components/landing/CTA.jsx';
import Footer from '@/components/landing/Footer.jsx';

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
