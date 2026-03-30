"use client";
import { useState } from "react";
import { useAuth } from "@/components/context/AuthContext";

export default function MultiUploadForm({ onSuccess }) {
  const { token } = useAuth();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 10) {
      alert("You can only upload a maximum of 10 resumes at a time.");
      return;
    }
    setFiles(selectedFiles);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 10) {
        alert("You can only upload a maximum of 10 resumes at a time.");
        return;
      }
      setFiles(droppedFiles);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("resumes", file);
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/multi-upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log("Upload successful:", data);
      setFiles([]);
      if (onSuccess) onSuccess(data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form 
        onSubmit={handleUpload} 
        onDragEnter={handleDrag}
        className="space-y-6"
      >
        <div 
          className={`relative group cursor-pointer transition-all duration-300 border-2 border-dashed rounded-2xl p-8 text-center
            ${dragActive ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' : 'border-white/10 hover:border-white/20 bg-white/5'}
            ${files.length > 0 ? 'border-green-500/50 bg-green-500/5' : ''}`}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            multiple 
            accept=".pdf,.docx" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          
          <div className="space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors
              ${files.length > 0 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {uploading ? (
                <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : files.length > 0 ? (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              )}
            </div>
            
            <div>
              <p className="text-lg font-semibold text-white">
                {files.length > 0 ? `${files.length} files selected` : 'Drop resumes here'}
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Support PDF and DOCX files
              </p>
            </div>

            {files.length > 0 && !uploading && (
              <div className="flex flex-wrap gap-2 justify-center max-h-32 overflow-y-auto pt-2">
                {files.map((file, idx) => (
                  <span key={idx} className="text-[10px] bg-white/10 text-white/70 px-2 py-1 rounded-md border border-white/5">
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={uploading || files.length === 0}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-[0.98] shadow-xl
            ${uploading || files.length === 0 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20'}`}
        >
          {uploading ? "Processing Files..." : files.length > 0 ? `Analyze ${files.length} Resumes` : "Select Files to Begin"}
        </button>
      </form>
    </div>
  );
}
