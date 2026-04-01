import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronDown, Star, FileText } from "lucide-react";
import RadialScore from "./RadialScore";

const SkillChip = ({ skill }) => (
  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-white/5">
    {skill}
  </span>
);
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

const CandidateCard = ({ candidate, index }) => {
  const [expanded, setExpanded] = useState(false);
  const match = candidate.matches?.[0];
  const matchScore = match ? Math.round(match.score) : null;
  const skills = Array.isArray(candidate.skills) ? candidate.skills : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        delay: index * 0.05,
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div
        className={`rounded-2xl border bg-slate-900/60 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
          expanded
            ? "border-blue-500/30 shadow-lg shadow-blue-500/5"
            : "border-white/8 hover:border-white/15 hover:bg-slate-800/40"
        }`}
      >
        {/* Main Row */}
        <div
          className="p-5 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
          onClick={() => setExpanded((v) => !v)}
        >
          {/* Avatar / Icon */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-blue-400" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-bold text-white truncate">
                  {candidate.filename || "Unknown Candidate"}
                </h4>
                {candidate.role && (
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${roleColor(candidate.role)}`}
                  >
                    {candidate.role}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Processed: {fmtDate(candidate.createdAt)}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {skills.slice(0, 5).map((s) => (
                  <SkillChip key={s} skill={s} />
                ))}
                {skills.length > 5 && (
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-slate-800 text-slate-500 border border-white/5">
                    +{skills.length - 5}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-6 shrink-0 md:pr-4">
            <div className="text-center hidden sm:block">
              <p className="text-xl font-black text-white">
                {candidate.experience || 0}
                <span className="text-sm text-slate-400">y</span>
              </p>
              <p className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">
                Exp
              </p>
            </div>
            <div className="h-10 w-px bg-white/8 hidden sm:block" />

            <div className="flex flex-col items-center">
              <RadialScore score={candidate.atsScore || 0} size={60} />
              <span className="text-[9px] uppercase tracking-widest text-slate-500 mt-1 font-semibold">
                ATS Score
              </span>
            </div>

            <ChevronDown
              className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Expanded Panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-white/8 pt-4 bg-black/20">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 text-blue-400" /> Full Skill
                      Profile
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.length > 0 ? (
                        skills.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-2.5 py-1 bg-white/5 text-slate-300 border border-white/10 rounded-lg"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          No skills detected.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 items-end md:w-48 shrink-0">
                    <button className="flex-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" /> View (coming soon)
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
