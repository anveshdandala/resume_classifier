"use client";
import React, { useRef, useState } from "react";
import GlassCard from "@/components/dashboard/GlassCard";
import UploadGate from "@/components/dashboard/UploadGate";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/components/context/AuthContext";
const ApplicantPage = () => {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (!user) {
      setIsGateOpen(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resume/upload`,
        {
          method: "POST",
          body: uploadedFile,
        },
      );
      if (response.ok) {
        setMessage("File uploaded successfully!");
        setFile(null); // Clear the selected file input
      } else {
        setMessage("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }

    // Read file content
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target?.result || "");
    };
    reader.readAsText(uploadedFile);
  };

  const takeFile = () => {
    setFile(null);
    setFileContent("");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">
            Applicant Dashboard
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Upload your resume to get an instant AI-powered ATS score and
            improvement insights.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              ATS Score
            </p>
            <div className="text-4xl font-black text-slate-700">--</div>
          </GlassCard>
          <GlassCard className="text-center border-blue-500/20">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              Skills Detected
            </p>
            <div className="text-4xl font-black text-slate-700">--</div>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              Missing Skills
            </p>
            <div className="text-4xl font-black text-slate-700">--</div>
          </GlassCard>
        </div>

        <GlassCard className="p-16 border-dashed border-white/20 hover:border-blue-500/50 transition-all cursor-pointer group bg-blue-600/5">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt"
            style={{ display: "none" }}
            id="resume-upload"
          />
          <div onClick={handleUploadClick} className="cursor-pointer block">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-500">
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Drop your resume here
                </h3>
                <p className="text-slate-500 text-lg">
                  Supports PDF, DOCX, and TXT files
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all group-hover:shadow-blue-500/40">
                Upload Resume
              </button>
            </div>
          </div>
        </GlassCard>

        {fileContent && (
          <GlassCard className="p-8 bg-slate-800/50 border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">📄 {file?.name}</h3>
              <button
                onClick={takeFile}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-6 max-h-96 overflow-y-auto">
              <pre className="text-slate-300 text-sm whitespace-pre-wrap break-words font-mono">
                {fileContent}
              </pre>
            </div>
          </GlassCard>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              How it works
            </h4>
            <ul className="space-y-6 text-slate-400">
              <li className="flex gap-4">
                <span className="text-blue-500 font-bold text-xl">01.</span>
                <p>
                  <strong className="text-slate-200 block">AI Parsing:</strong>{" "}
                  Our specialized models extract key information, context, and
                  semantic meaning from your CV.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-500 font-bold text-xl">02.</span>
                <p>
                  <strong className="text-slate-200 block">
                    Benchmarking:
                  </strong>{" "}
                  Your profile is cross-referenced with thousands of successful
                  job applications in your field.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-500 font-bold text-xl">03.</span>
                <p>
                  <strong className="text-slate-200 block">
                    Actionable Feedback:
                  </strong>{" "}
                  Receive a clear roadmap of which keywords to add and
                  formatting fixes to make.
                </p>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <GlassCard className="bg-gradient-to-br from-blue-600/10 to-transparent border-blue-500/10 h-full flex flex-col justify-center">
              <h4 className="text-xl font-bold text-white mb-4">
                Why ATS Matters
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                75% of resumes are rejected before they ever reach a human
                recruiter. ResumeAI ensures your hard work doesn't get lost in
                the noise of automated screening.
              </p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Success Rate Increase
                  </span>
                  <span className="text-blue-400 font-bold">2.4x</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[85%]"></div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        <UploadGate
          isOpen={isGateOpen}
          onClose={() => setIsGateOpen(false)}
          message="Please login or sign up to upload your resume and receive a personalized ATS report."
        />
      </div>
    </DashboardLayout>
  );
};

export default ApplicantPage;
