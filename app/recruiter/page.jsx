"use client";
import React, { useState, useMemo, useEffect } from "react";
import GlassCard from "@/components/dashboard/GlassCard";
import UploadModal from "@/components/dashboard/UploadModal";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CandidateCard from "@/components/dashboard/CandidateCard";
import { SKILL_OPTIONS } from "./constants";
import { useAuth } from "@/components/context/AuthContext";
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Upload,
  Users,
  FileText,
  CheckCircle2,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const scoreColor = (n) =>
  n >= 80 ? "text-emerald-400" : n >= 60 ? "text-amber-400" : "text-rose-400";

const RecruiterPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter/Sort State
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  const { user, token } = useAuth();

  const fetchResumes = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resume/my`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setResumes(data.length > 0 ? data : []);
      }
    } catch (err) {
      console.error("Error fetching resumes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchResumes();
  }, [token]);

  const allRoles = [
    "ALL",
    ...Array.from(new Set(resumes.map((r) => r.role).filter(Boolean))),
  ];

  const processed = useMemo(() => {
    return resumes
      .filter((r) => {
        const q = search.toLowerCase();
        const rSkills = Array.isArray(r.skills) ? r.skills : [];
        const matchesSearch =
          !q ||
          (r.filename || "").toLowerCase().includes(q) ||
          (r.role || "").toLowerCase().includes(q) ||
          rSkills.some((s) => s.toLowerCase().includes(q));

        const matchesRole = roleFilter === "ALL" || r.role === roleFilter;
        const matchesScore = (r.atsScore || 0) >= minScore;

        return matchesSearch && matchesRole && matchesScore;
      })
      .sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        if (sortBy === "atsScore")
          return ((a.atsScore || 0) - (b.atsScore || 0)) * dir;
        if (sortBy === "experience")
          return ((a.experience || 0) - (b.experience || 0)) * dir;
        return (new Date(a.createdAt) - new Date(b.createdAt)) * dir;
      });
  }, [resumes, search, roleFilter, minScore, sortBy, sortDir]);

  const avgAts = resumes.length
    ? Math.round(
        resumes.reduce((s, r) => s + (r.atsScore || 0), 0) / resumes.length,
      )
    : 0;

  const topSkill = useMemo(() => {
    if (!resumes.length) return { name: "—", count: 0 };
    const freq = {};
    resumes.forEach((r) => {
      if (Array.isArray(r.skills))
        r.skills.forEach((s) => (freq[s] = (freq[s] || 0) + 1));
    });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0
      ? { name: sorted[0][0], count: sorted[0][1] }
      : { name: "—", count: 0 };
  }, [resumes]);

  const toggleSort = (field) => {
    if (sortBy === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(field);
      setSortDir("desc");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* ── header ── */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Candidate Pipeline
            </h1>
            <p className="text-lg text-slate-400">
              Manage, filter, and analyze applicants with AI.
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Upload className="w-5 h-5" />
            Batch Upload
          </button>
        </motion.header>

        {/* ── stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4"
        >
          <StatPill
            label="Total Candidates"
            value={resumes.length}
            accent="text-white"
            subtext="in database"
          />
          <StatPill
            label="Avg ATS Score"
            value={`${avgAts}%`}
            accent={scoreColor(avgAts)}
            subtext="across pipeline"
          />
          <StatPill
            label="Top Skill"
            value={topSkill.name}
            accent="text-blue-400"
            subtext={`${topSkill.count} occurrences`}
          />
        </motion.div>

        {/* ── filters & list ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          {/* filter bar */}
          <div className="p-4 rounded-2xl border border-white/8 bg-slate-900/60 backdrop-blur-sm flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center flex-1">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search names, skills, or roles…"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-white/8 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              {/* Role */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-8 pr-8 py-2.5 rounded-xl bg-slate-800/80 border border-white/8 text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none cursor-pointer"
                >
                  {allRoles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Slider */}
              <div className="flex items-center gap-3 px-3 py-2 bg-slate-800/50 rounded-xl border border-white/5 min-w-[200px]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Min ATS:{" "}
                  <span className={scoreColor(minScore)}>{minScore}%</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={minScore}
                  onChange={(e) => setMinScore(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            {/* Sort Buttons */}
            <div className="flex gap-2">
              {[
                { label: "Date", field: "createdAt" },
                { label: "ATS", field: "atsScore" },
                { label: "Exp", field: "experience" },
              ].map(({ label, field }) => (
                <button
                  key={field}
                  onClick={() => toggleSort(field)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
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
          </div>

          {/* list */}
          <div className="space-y-3 pt-2">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Loading candidates…</p>
              </div>
            ) : processed.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {processed.map((candidate, i) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            ) : resumes.length > 0 ? (
              <div className="text-center py-16 rounded-2xl border border-dashed border-white/10">
                <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 font-semibold">
                  No candidates match your filters
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("ALL");
                    setMinScore(0);
                  }}
                  className="mt-3 text-sm text-blue-400 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="text-center py-24 rounded-2xl border border-dashed border-white/10">
                <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400">
                  Your pipeline is empty
                </h3>
                <p className="text-slate-500 text-sm mt-1 mb-6">
                  Upload candidate resumes to begin analysis.
                </p>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-white/10 hover:bg-white/15 text-white px-6 py-2.5 rounded-xl font-semibold transition-all"
                >
                  Upload Resumes
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => {
          setIsUploadModalOpen(false);
          fetchResumes();
        }}
      />
    </DashboardLayout>
  );
};

const StatPill = ({ label, value, accent, subtext }) => (
  <div className="flex flex-col items-center px-6 py-4 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-white/10 min-w-[140px] flex-1">
    <span className={`text-3xl font-black ${accent}`}>{value}</span>
    <span className="text-xs uppercase tracking-widest text-slate-500 mt-1 font-semibold">
      {label}
    </span>
    {subtext && (
      <span className="text-[10px] text-slate-600 mt-1">{subtext}</span>
    )}
  </div>
);

const SkillChip = ({ skill }) => (
  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-white/5">
    {skill}
  </span>
);

export default RecruiterPage;
