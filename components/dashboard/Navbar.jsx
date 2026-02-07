"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from "@/components/context/AuthContext";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const displayUser = useMemo(() => {
    if (!user) return null;
    return user.user ?? user;
  }, [user]);

  const avatarLetter = useMemo(() => {
    const name = displayUser?.name || displayUser?.fullName || displayUser?.email || displayUser?.username;
    if (!name) return "U";
    return String(name).trim().charAt(0).toUpperCase();
  }, [displayUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b border-white/5 bg-slate-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary-400 transition-colors">Resume Classifier</span>
          </Link>
          
          <div className="flex items-center space-x-4" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-9 h-9 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-sm font-semibold text-white cursor-pointer hover:bg-slate-600 transition-colors"
              aria-label="User profile"
              aria-expanded={isOpen}
            >
              {loading ? "..." : avatarLetter}
            </button>

            {isOpen && (
              <div className="absolute right-4 top-16 w-72 bg-slate-900/95 border border-white/10 rounded-xl shadow-2xl shadow-black/30 p-4 backdrop-blur-xl">
                {!displayUser ? (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-400">You are not signed in.</p>
                    <Link
                      href="/auth/login"
                      className="inline-flex items-center justify-center w-full px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
                    >
                      Log In
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">Signed in as</p>
                      <p className="text-lg font-semibold text-white">
                        {displayUser.name || displayUser.fullName || displayUser.username || "User"}
                      </p>
                      {(displayUser.email || displayUser.username) && (
                        <p className="text-sm text-slate-400 break-all">
                          {displayUser.email || displayUser.username}
                        </p>
                      )}
                      {displayUser.role && (
                        <p className="text-xs text-blue-400 font-semibold mt-1">
                          {String(displayUser.role).toUpperCase()}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-semibold border border-white/10 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
