"use client";
import React from "react";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-primary-500/30">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[128px] mix-blend-screen animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[128px] mix-blend-screen animate-blob animation-delay-4000" />
      </div>

      <Navbar />

      <main className="flex-grow z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
