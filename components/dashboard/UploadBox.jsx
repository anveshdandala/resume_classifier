"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import GlassCard from "@/components/dashboard/GlassCard";
import UploadGate from "@/components/dashboard/UploadGate";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/components/context/AuthContext";
import {
  FileText,
  ExternalLink,
  Trash2,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Zap,
  TrendingUp,
  Upload,
  Filter,
  ArrowUpDown,
  X,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── helpers ────────────────────────────────────────────────────────────────

const scoreColor = (n) =>
  n >= 80 ? "text-emerald-400" : n >= 60 ? "text-amber-400" : "text-rose-400";

const scoreBg = (n) =>
  n >= 80
    ? "bg-emerald-500/10 border-emerald-500/20"
    : n >= 60
      ? "bg-amber-500/10  border-amber-500/20"
      : "bg-rose-500/10   border-rose-500/20";

const scoreRing = (n) =>
  n >= 80 ? "#34d399" : n >= 60 ? "#fbbf24" : "#fb7185";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ROLE_COLORS = {
  ENGINEERING: "bg-blue-500/20 text-blue-300",
  FINANCE: "bg-emerald-500/20 text-emerald-300",
  HEALTHCARE: "bg-rose-500/20 text-rose-300",
  MARKETING: "bg-purple-500/20 text-purple-300",
  DESIGN: "bg-pink-500/20 text-pink-300",
  DATA: "bg-cyan-500/20 text-cyan-300",
  DEFAULT: "bg-slate-500/20 text-slate-300",
};
const roleColor = (r) => ROLE_COLORS[r] ?? ROLE_COLORS.DEFAULT;

// ─── sub-components ─────────────────────────────────────────────────────────

const RadialScore = ({ score, size = 64 }) => {
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#1e293b"
        strokeWidth="5"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={scoreRing(score)}
        strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1s cubic-bezier(.4,0,.2,1)" }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={scoreRing(score)}
        fontSize="13"
        fontWeight="800"
        style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
      >
        {score}
      </text>
    </svg>
  );
};

const StatPill = ({ label, value, accent }) => (
  <div className="flex flex-col items-center px-5 py-3 rounded-2xl bg-white/5 border border-white/10 min-w-[90px]">
    <span className={`text-xl font-black ${accent}`}>{value}</span>
    <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5 font-semibold">
      {label}
    </span>
  </div>
);

const FeedbackItem = ({ text }) => (
  <li className="flex gap-2 items-start text-sm text-slate-300">
    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
    <span>{text}</span>
  </li>
);

const SkillChip = ({ skill, matched }) => (
  <span
    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border transition-all ${
      matched
        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
        : "bg-slate-800 text-slate-400 border-white/5"
    }`}
  >
    {matched && <span className="mr-1">✓</span>}
    {skill}
  </span>
);

// ─── resume card ────────────────────────────────────────────────────────────

const ResumeCard = ({ resume, index, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const match = resume.matches?.[0];
  const matchScore = match ? Math.round(match.score) : null;
  const jdTitle = match?.job?.description ?? null;
  const matchedSet = new Set(
    (resume.matchedSkills ?? []).map((s) => s.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        delay: index * 0.06,
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div
        className={`rounded-2xl border bg-slate-900/60 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
          expanded
            ? "border-blue-500/30 shadow-lg shadow-blue-500/5"
            : "border-white/8 hover:border-white/15"
        }`}
      >
        {/* Main row */}
        <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
          {/* Icon + info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="p-3 bg-slate-800/80 rounded-xl shrink-0">
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-bold text-white truncate">
                  {resume.filename}
                </h4>
                {resume.role && (
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${roleColor(resume.role)}`}
                  >
                    {resume.role}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {fmtDate(resume.createdAt)}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {resume.skills.slice(0, 4).map((s) => (
                  <SkillChip
                    key={s}
                    skill={s}
                    matched={matchedSet.has(s.toLowerCase())}
                  />
                ))}
                {resume.skills.length > 4 && (
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-slate-800 text-slate-500 border border-white/5">
                    +{resume.skills.length - 4}
                  </span>
                )}
              </div>
              {jdTitle && (
                <p className="text-[11px] text-slate-500 mt-2 italic">
                  Matched for:{" "}
                  <span className="text-slate-400 not-italic font-semibold">
                    "{jdTitle}"
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Scores */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex flex-col items-center">
              <RadialScore score={resume.atsScore} size={60} />
              <span className="text-[9px] uppercase tracking-widest text-slate-500 mt-1 font-semibold">
                ATS
              </span>
            </div>
            {matchScore !== null && (
              <>
                <div className="h-10 w-px bg-white/8 hidden sm:block" />
                <div className="flex flex-col items-center">
                  <RadialScore score={matchScore} size={60} />
                  <span className="text-[9px] uppercase tracking-widest text-slate-500 mt-1 font-semibold">
                    Match
                  </span>
                </div>
              </>
            )}
            <div className="h-10 w-px bg-white/8 hidden sm:block" />
            <div className="text-center hidden sm:block">
              <p className="text-xl font-black text-white">
                {resume.experience}
                <span className="text-sm text-slate-400">y</span>
              </p>
              <p className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">
                Exp
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="p-2 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-all"
              title="Expand details"
            >
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            <button className="p-2 rounded-lg hover:bg-blue-500/15 text-slate-400 hover:text-blue-400 transition-all">
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(resume.id)}
              className="p-2 rounded-lg hover:bg-rose-500/15 text-slate-400 hover:text-rose-400 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-white/8 pt-4 grid md:grid-cols-2 gap-6">
                {/* Matched skills */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{" "}
                    Skills matched to JD
                  </p>
                  {(resume.matchedSkills ?? []).length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {resume.matchedSkills.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full font-semibold"
                        >
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 italic">
                      No direct skill matches found.
                    </p>
                  )}
                </div>

                {/* ATS feedback */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />{" "}
                    Improvement suggestions
                  </p>
                  {(resume.atsFeedback ?? []).length > 0 ? (
                    <ul className="space-y-2">
                      {resume.atsFeedback.map((f, i) => (
                        <FeedbackItem key={i} text={f} />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-emerald-400 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Looking great — no
                      major issues found!
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ─── main page ──────────────────────────────────────────────────────────────

const ApplicantPage = () => {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  // filter / sort state
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  const fileInputRef = useRef(null);
  const { user, token } = useAuth();

  // ── fetch ────────────────────────────────────────────────────────────────

  const fetchResumes = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setResumes(data);
      }
    } catch (err) {
      console.error("Error fetching resumes:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchResumes();
  }, [token, fetchResumes]);

  // ── delete ───────────────────────────────────────────────────────────────

  const deleteResume = async (id) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    // uncomment when backend DELETE route exists:
    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/${id}`, {
    //   method: "DELETE", headers: { Authorization: `Bearer ${token}` }
    // });
  };

  // ── upload ───────────────────────────────────────────────────────────────

  const handleUploadClick = () => {
    if (!user) {
      setIsGateOpen(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setUploadError("");
    setUploadResult(null);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setUploadError("");
    setUploadResult(null);
    const fd = new FormData();
    fd.append("resume", file, file.name);
    fd.append("jobDescription", jobDescription || "");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resume/upload`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        },
      );
      if (res.ok) {
        const data = await res.json();
        setUploadResult(data);
        fetchResumes();
      } else {
        const err = await res.json().catch(() => null);
        setUploadError(err?.message || "Upload failed");
      }
    } catch {
      setUploadError("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadResult(null);
    setUploadError("");
    setJobDescription("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── derived data ─────────────────────────────────────────────────────────

  const allRoles = [
    "ALL",
    ...Array.from(new Set(resumes.map((r) => r.role).filter(Boolean))),
  ];

  const processed = resumes
    .filter((r) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        r.filename.toLowerCase().includes(q) ||
        (r.role ?? "").toLowerCase().includes(q) ||
        (r.skills ?? []).some((s) => s.toLowerCase().includes(q));
      const matchesRole = roleFilter === "ALL" || r.role === roleFilter;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortBy === "atsScore") return (a.atsScore - b.atsScore) * dir;
      if (sortBy === "experience") return (a.experience - b.experience) * dir;
      if (sortBy === "match")
        return (
          ((a.matches?.[0]?.score ?? 0) - (b.matches?.[0]?.score ?? 0)) * dir
        );
      return (new Date(a.createdAt) - new Date(b.createdAt)) * dir;
    });

  const avgAts = resumes.length
    ? Math.round(resumes.reduce((s, r) => s + r.atsScore, 0) / resumes.length)
    : 0;
  const bestMatch = resumes.length
    ? Math.round(Math.max(...resumes.map((r) => r.matches?.[0]?.score ?? 0)))
    : 0;
  const topRole = (() => {
    if (!resumes.length) return "—";
    const freq = {};
    resumes.forEach((r) => {
      if (r.role) freq[r.role] = (freq[r.role] ?? 0) + 1;
    });
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  })();

  const toggleSort = (field) => {
    if (sortBy === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(field);
      setSortDir("desc");
    }
  };

  // ── render ───────────────────────────────────────────────────────────────

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10 pb-16">
        {/* ── header ── */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3 pt-2"
        >
          <h1 className="text-5xl font-extrabold text-white tracking-tight">
            Applicant Dashboard
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Upload your resume for an instant AI-powered ATS score and
            improvement insights.
          </p>
        </motion.header>

        {/* ── stats row ── */}
        {resumes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <StatPill
              label="Resumes"
              value={resumes.length}
              accent="text-white"
            />
            <StatPill
              label="Avg ATS"
              value={`${avgAts}%`}
              accent={scoreColor(avgAts)}
            />
            <StatPill
              label="Best Match"
              value={`${bestMatch}%`}
              accent={scoreColor(bestMatch)}
            />
            <StatPill label="Top Role" value={topRole} accent="text-blue-400" />
          </motion.div>
        )}

        {/* ── upload zone ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div
            className={`rounded-3xl border-2 border-dashed transition-all duration-300 p-12 text-center group cursor-pointer ${
              file
                ? "border-blue-500/40 bg-blue-600/5"
                : "border-white/10 bg-white/3 hover:border-blue-500/30 hover:bg-blue-600/3"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-5">
              <div
                onClick={handleUploadClick}
                className="w-20 h-20 bg-blue-600/10 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600/20 transition-all duration-300"
              >
                <Upload className="w-10 h-10 text-blue-400" />
              </div>

              <div className="w-full max-w-sm space-y-3">
                <h3
                  className="text-2xl font-bold text-white"
                  onClick={!file ? handleUploadClick : undefined}
                >
                  {file ? file.name : "Drop your resume here"}
                </h3>
                {!file && (
                  <p className="text-slate-500">Supports PDF, DOCX, and TXT</p>
                )}
                {file && (
                  <input
                    type="text"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Job description (optional but recommended)"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={file ? handleFileUpload : handleUploadClick}
                  disabled={isUploading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
                >
                  {isUploading
                    ? "Analyzing…"
                    : file
                      ? "Analyze Resume"
                      : "Select File"}
                </button>
                {file && (
                  <button
                    onClick={resetUpload}
                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── upload result ── */}
        <AnimatePresence>
          {(uploadError || uploadResult) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden"
            >
              <div className="flex justify-between items-center px-5 py-4 border-b border-white/8">
                <span className="font-semibold text-white text-sm">
                  Analysis Result
                </span>
                <button
                  onClick={resetUpload}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 max-h-72 overflow-y-auto">
                {uploadError && (
                  <p className="text-rose-400 text-sm">{uploadError}</p>
                )}
                {uploadResult && (
                  <pre className="text-slate-300 text-xs whitespace-pre-wrap font-mono">
                    {JSON.stringify(uploadResult, null, 2)}
                  </pre>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── resume list ── */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Your Resumes
              <span className="text-sm font-normal text-slate-500 ml-1">
                ({processed.length})
              </span>
            </h2>
          </div>

          {/* filters bar */}
          {resumes.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              {/* search */}
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search resumes…"
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800/80 border border-white/8 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              {/* role filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-8 pr-4 py-2 rounded-xl bg-slate-800/80 border border-white/8 text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none cursor-pointer"
                >
                  {allRoles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* sort buttons */}
              {[
                { label: "Date", field: "createdAt" },
                { label: "ATS", field: "atsScore" },
                { label: "Match", field: "match" },
                { label: "Exp", field: "experience" },
              ].map(({ label, field }) => (
                <button
                  key={field}
                  onClick={() => toggleSort(field)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                    sortBy === field
                      ? "bg-blue-600/20 border-blue-500/40 text-blue-300"
                      : "bg-slate-800/80 border-white/8 text-slate-400 hover:text-white"
                  }`}
                >
                  {label}
                  <ArrowUpDown className="w-3 h-3" />
                  {sortBy === field && (
                    <span>{sortDir === "desc" ? "↓" : "↑"}</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* list */}
          <div className="space-y-3">
            {loading && (
              <div className="text-center py-16">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Loading resumes…</p>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {!loading &&
                processed.map((resume, i) => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    index={i}
                    onDelete={deleteResume}
                  />
                ))}
            </AnimatePresence>

            {!loading && resumes.length > 0 && processed.length === 0 && (
              <div className="text-center py-16 rounded-2xl border border-dashed border-white/10">
                <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 font-semibold">
                  No resumes match your filters
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("ALL");
                  }}
                  className="mt-3 text-sm text-blue-400 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            {!loading && resumes.length === 0 && (
              <div className="text-center py-20 rounded-2xl border border-dashed border-white/10">
                <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400">
                  No resumes yet
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Upload your first resume to get started
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── how it works ── */}
        <section className="grid md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-5">
            <h4 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="w-1.5 h-7 bg-blue-500 rounded-full" />
              How it works
            </h4>
            <ol className="space-y-5 text-slate-400">
              {[
                {
                  n: "01",
                  title: "AI Parsing",
                  body: "Specialized models extract skills, experience, and semantic meaning from your CV.",
                },
                {
                  n: "02",
                  title: "JD Matching",
                  body: "Semantic similarity scoring compares your profile to the job description — not just keywords.",
                },
                {
                  n: "03",
                  title: "ATS Scoring",
                  body: "8-factor ATS analysis grades structure, metrics, contact info, and formatting.",
                },
                {
                  n: "04",
                  title: "Actionable Feedback",
                  body: "Receive a clear roadmap of what to fix before applying.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <span className="text-blue-500 font-black text-lg shrink-0">
                    {n}.
                  </span>
                  <p>
                    <strong className="text-slate-200 block">{title}</strong>
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-600/8 to-transparent p-6 flex flex-col justify-center gap-5">
            <h4 className="text-xl font-bold text-white">Why ATS Matters</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              75% of resumes are rejected before they ever reach a human
              recruiter. Our AI ensures your hard work doesn't get lost in
              automated screening.
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "Resumes filtered by ATS",
                  pct: 75,
                  color: "bg-rose-500",
                },
                {
                  label: "Success rate with optimization",
                  pct: 85,
                  color: "bg-blue-500",
                },
                {
                  label: "Avg score improvement",
                  pct: 60,
                  color: "bg-emerald-500",
                },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">{label}</span>
                    <span className="text-xs font-bold text-slate-300">
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`${color} h-full rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <UploadGate
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        message="Please login or sign up to upload your resume and receive a personalized ATS report."
      />
    </DashboardLayout>
  );
};

export default ApplicantPage;
