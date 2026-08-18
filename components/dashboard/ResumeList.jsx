"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/AuthContext";

export default function ResumeList() {
  const { token } = useAuth();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchResumes = async () => {
    if (!token) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resume/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      setResumes(data);
    } catch {
      setResumes([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchResumes();

    // auto refresh after upload
    window.addEventListener("resumeUploaded", fetchResumes);
    return () =>
      window.removeEventListener("resumeUploaded", fetchResumes);
  }, [token]);

  if (loading)
    return <p className="text-slate-400">Loading resumes...</p>;

  if (!resumes.length)
    return <p className="text-slate-500">No resumes uploaded yet.</p>;

  return (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <div key={resume.id} className="p-4 border rounded-lg">
          <h3 className="text-white font-bold">{resume.filename}</h3>
          <p>ATS Score: {resume.atsScore}%</p>
          <a
            href={resume.fileUrl}
            target="_blank"
            className="text-blue-400"
          >
            View Resume
          </a>
        </div>
      ))}
    </div>
  );
}