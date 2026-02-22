"use client";
import React, { useRef, useState, useEffect } from "react";
import GlassCard from "@/components/dashboard/GlassCard";
import UploadGate from "@/components/dashboard/UploadGate";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/components/context/AuthContext";
import { FileText, ExternalLink, Trash2, Search } from "lucide-react";
import { motion } from "framer-motion";

 const STATIC_RESUMES = [
  {
    id: "1",
    filename: "Software_Engineer_CV.pdf",
    atsScore: 85,
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    experience: 4,
    createdAt: "2024-02-15T10:30:00Z",
  },
  {
    id: "2",
    filename: "Frontend_Developer_Resume.pdf",
    atsScore: 72,
    skills: ["HTML", "CSS", "JavaScript", "Tailwind"],
    experience: 2,
    createdAt: "2024-02-10T14:20:00Z",
  },
  {
    id: "3",
    filename: "Fullstack_Dev_2024.pdf",
    atsScore: 91,
    skills: ["Next.js", "Prisma", "PostgreSQL", "Docker"],
    experience: 6,
    createdAt: "2024-01-28T09:15:00Z",
  }
];

const ApplicantPage = () => {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [resumes, setResumes] = useState(STATIC_RESUMES);
  const [loading, setLoading] = useState(false);

  const { user, token } = useAuth();

  const fetchResumes = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setResumes(data.length > 0 ? data : []); // Fallback to empty if no resumes, but keep STATIC_RESUMES as demo?
        // Actually, let's keep STATIC_RESUMES only if user hasn't uploaded anything yet and we want to show a demo.
        // But usually, real data should replace placeholder.
        if (data.length > 0) setResumes(data);
      }
    } catch (err) {
      console.error("Error fetching resumes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchResumes();
    }
  }, [token]);

  const deleteResume = async (id) => {
    // If it's a static resume, just filter it out
    if (STATIC_RESUMES.some(r => r.id === id)) {
      setResumes(prev => prev.filter(r => r.id !== id));
      return;
    }

    try {
      // Backend doesn't have DELETE yet, so we just filter locally for now to show UI feedback
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/${id}`, {
      //   method: 'DELETE',
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      setResumes(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error("Error deleting resume:", err);
    }
  };
 
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
    setUploadError("");
    setUploadResult(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("resume", uploadedFile, uploadedFile.name);

    try {
      console.log("uploading with token:", token);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resume/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        setUploadResult(data);
        fetchResumes(); // Refresh the list
      } else {
        const errorData = await response.json().catch(() => null);
        setUploadError(errorData?.message || "Upload failed");
      }
    } catch {
      setUploadError("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  const takeFile = () => {
    setFile(null);
    setUploadResult(null);
    setUploadError("");
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
                {isUploading ? "Uploading..." : "Upload Resume"}
              </button>
            </div>
          </div>
        </GlassCard>

        {(file || uploadResult || uploadError) && (
          <GlassCard className="p-8 bg-slate-800/50 border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                File: {file?.name}
              </h3>
              <button
                onClick={takeFile}
                className="text-slate-400 hover:text-white transition-colors"
              >
                X
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-6 max-h-96 overflow-y-auto">
              {uploadError && (
                <p className="text-red-400 text-sm font-medium">
                  {uploadError}
                </p>
              )}
              {uploadResult && (
                <pre className="text-slate-300 text-sm whitespace-pre-wrap break-words font-mono">
                  {JSON.stringify(uploadResult, null, 2)}
                </pre>
              )}
              {!uploadError && !uploadResult && (
                <p className="text-slate-400 text-sm">
                  File selected and ready for backend processing.
                </p>
              )}
            </div>
          </GlassCard>
        )}

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="text-primary-500" />
              Your Resumes
            </h2>
            <span className="text-slate-500 text-sm font-medium">
              {resumes.length} {resumes.length === 1 ? 'file' : 'files'} uploaded
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loading && (
              <div className="text-center py-10">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-400">Loading your resumes...</p>
              </div>
            )}
            {!loading && resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <GlassCard className="p-5 hover:bg-white/5 group border-white/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <FileText className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                          {resume.filename}
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {resume.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full border border-white/5">
                              {skill}
                            </span>
                          ))}
                          {resume.skills.length > 3 && (
                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full border border-white/5">
                              +{resume.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">ATS Score</p>
                        <div className={`text-2xl font-black ${
                          resume.atsScore >= 80 ? 'text-emerald-400' : 
                          resume.atsScore >= 60 ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {resume.atsScore}%
                        </div>
                      </div>
                      
                      <div className="h-10 w-px bg-white/10 hidden md:block" />

                      <div className="text-center hidden sm:block">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Exp.</p>
                        <div className="text-xl font-bold text-white">
                          {resume.experience}y
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-primary-500/20 text-slate-400 hover:text-primary-400 rounded-lg transition-all">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => deleteResume(resume.id)}
                          className="p-2 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {!loading && resumes.length === 0 && (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400">No resumes found</h3>
                <p className="text-slate-500">Upload your first resume to get started</p>
              </div>
            )}
          </div>
        </section>

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
