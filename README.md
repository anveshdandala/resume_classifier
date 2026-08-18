# Resume Classifier - Next.js Frontend (`rc`)

A modern, responsive web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. It provides intuitive, interactive portals for both **Job Applicants** and **Recruiters**.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [Applicant Portal](#applicant-portal)
  - [Recruiter Portal](#recruiter-portal)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Application Routes](#application-routes)
- [Deployment](#deployment)

---

## Overview

`rc` is the user-facing web frontend of the Resume Classifier platform. It connects with the Express API backend (`rc_be`) to deliver real-time resume analysis, ATS optimization feedback, keyword extraction, candidate ranking, and recruiter filtering.

---

## Key Features

### Applicant Portal
- **Drag & Drop Resume Upload**: Upload resume files in `.pdf` or `.docx` formats.
- **Job Description Matcher**: Paste job descriptions to receive instant semantic fit evaluation.
- **ATS Compliance Scoreboard**: View comprehensive ATS compatibility scores (structure, action verbs, quantified achievements, contact info).
- **Skill Gap Visualizer**: Interactive badges displaying matched candidate skills alongside missing job requirements.
- **Improvement Suggestions**: Actionable recommendations to tailor resumes for target roles.

### Recruiter Portal
- **Candidate Resume Filtering**: Search candidate applications by specific skills, experience ranges, and match scores.
- **Automated Candidate Ranking**: Rank candidate profiles based on machine-learning-driven relevance to posted roles.
- **Batch Resume Classification**: Process and view evaluations for multiple candidate uploads concurrently.

---

## Tech Stack

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.2.3](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescript.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12.34.3](https://www.framer.com/motion/)
- **Icons**: [Lucide React 0.575.0](https://lucide.dev/)

---

## Project Structure

```
rc/
├── app/                       # Next.js App Router pages and layouts
│   ├── page.tsx               # Main landing page & portal selector
│   ├── layout.tsx             # Root layout wrapper with font & context providers
│   ├── globals.css            # Global CSS styles & Tailwind v4 directives
│   ├── auth/                  # Authentication pages (Login / Sign Up)
│   │   └── page.tsx
│   ├── applicant/             # Candidate workspace & resume analyzer dashboard
│   │   └── page.tsx
│   └── recruiter/             # Recruiter candidate filter & dashboard
│       └── page.tsx
├── components/                # Reusable UI components
│   ├── Navbar.tsx             # Navigation header bar
│   ├── ScoreCard.tsx          # ATS score visual progress component
│   ├── SkillBadge.tsx         # Skill tag badges (matched/missing)
│   ├── FileUpload.tsx         # Drag and drop upload component
│   └── CandidateCard.tsx      # Candidate profile cards for recruiters
├── lib/                       # Helper functions and API utilities
│   ├── api.ts                 # Fetch wrapper for backend endpoints
│   └── auth.ts                # Client-side JWT auth helpers
├── public/                    # Static assets, branding, and icons
├── package.json               # Node dependencies and build scripts
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── .env                       # Client environment configuration
```

---

## Environment Variables

Create a `.env` file in the root of `rc/`:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Frontend Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000/
```

---

## Installation & Setup

### Prerequisites

- Node.js `v18+` and `npm`.

### 1. Install Dependencies

```bash
cd rc
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Application Routes

| Path | Access Level | Description |
| :--- | :--- | :--- |
| `/` | Public | Landing page introducing the system with portal options. |
| `/auth` | Public | Login and user registration interface. |
| `/applicant` | Authenticated (`APPLICANT`) | Resume upload, JD matching, ATS score breakdown & skill analysis. |
| `/recruiter` | Authenticated (`RECRUITER`) | Recruiter dashboard to search, filter, and rank candidate profiles. |

---

## Building & Production Deployment

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

For platform deployments (e.g. Vercel), set `NEXT_PUBLIC_API_URL` in environment secrets pointing to your hosted `rc_be` backend URL.
