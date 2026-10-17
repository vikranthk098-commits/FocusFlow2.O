# FocusFlow — Student Productivity & Learning Platform

> A modern, responsive full-stack student productivity application featuring Pomodoro study missions with tab-drift prevention, habit streaks, assignment deadlines, curriculum tracking, academic term projects, calendar views, and a Google Gemini AI tutor.

---

## ⚡ Technology Stack

- **Frontend**: React 18, Vite, React Router 6, Vanilla CSS (Tailored Purple & White Design System)
- **Visuals & Charts**: Lucide React, Recharts, Canvas Confetti
- **Backend**: Node.js with Express, CORS, Rate Limiting
- **Authentication & Database**: Supabase Auth and Supabase PostgreSQL with Row Level Security (RLS)
- **AI Tutor**: Google Gemini API (`gemini-1.5-flash`), accessed safely via server-side proxy
- **Platform**: Windows 10 / 11, Node.js (No Python required)

---

## 📁 Project Architecture

```
focusFlow/
├── client/                     # React + Vite Frontend
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── components/         # Common UI & Layout (Sidebar, Header, ErrorBoundary)
│   │   ├── context/            # AuthContext (Supabase Auth & Session)
│   │   ├── pages/              # All 11 platform views + Auth + 404
│   │   │   ├── Auth.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Goals.jsx
│   │   │   ├── Habits.jsx
│   │   │   ├── Assignments.jsx
│   │   │   ├── LearningTracker.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── MissionMode.jsx
│   │   │   ├── AITutor.jsx
│   │   │   ├── CalendarView.jsx
│   │   │   ├── ProgressAnalytics.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── NotFound.jsx
│   │   ├── styles/             # index.css (Purple design system & dark mode tokens)
│   │   ├── utils/              # dataService.js, supabaseClient.js
│   │   ├── App.jsx             # React Router structure
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express Backend
│   ├── src/
│   │   ├── controllers/        # tutorController.js (Gemini AI handler)
│   │   ├── middleware/         # rateLimiter.js
│   │   ├── routes/             # health.js, tutor.js
│   │   └── index.js            # Express server entry point
│   ├── .env.example
│   └── package.json
│
├── supabase/
│   └── schema.sql              # Complete PostgreSQL schema & RLS policies
│
├── .gitignore
├── package.json                # Monorepo root with concurrent runner
└── README.md
```

---

## 🚀 Quick Start on Windows 10 / 11

### 1. Prerequisites

Ensure Node.js LTS (v18+) is installed. If PowerShell gives a script execution policy error, enable local scripts once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

### 2. Install Dependencies

In the project root, install all packages for root, backend, and frontend:

```powershell
npm install
npm install --prefix server
npm install --prefix client
```

### 3. Environment Configuration

Copy the example files to create your active `.env` configuration:

```powershell
# In client/
Copy-Item client\.env.example client\.env

# In server/
Copy-Item server\.env.example server\.env
```

#### Supabase Setup (`client/.env`):
1. Sign up for a free project at [supabase.com](https://supabase.com).
2. Open your project dashboard -> **SQL Editor** -> paste and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
3. Go to **Project Settings** -> **API**. Copy:
   - `Project URL` -> `VITE_SUPABASE_URL`
   - `anon public` key -> `VITE_SUPABASE_ANON_KEY`

#### Gemini AI Tutor Setup (`server/.env`):
1. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com).
2. Add your key to `server/.env`:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key
   GEMINI_MODEL=gemini-1.5-flash
   ```

*Note: FocusFlow features an Evaluation Demo mode. If Supabase or Gemini keys are not configured initially, the frontend displays diagnostic banners and supports local testing.*

### 4. Running the Application

To launch both the backend server and frontend client concurrently:

```powershell
npm run dev
```

Or run them in separate terminals:

```powershell
# Terminal 1: Backend API (Port 5000)
npm run dev:server

# Terminal 2: Frontend Client (Port 5173)
npm run dev:client
```

Open your browser to: **http://localhost:5173**

---

## 🛡️ Database & Security Architecture (Row Level Security)

Every database table (`profiles`, `goals`, `habits`, `habit_logs`, `assignments`, `learning_subjects`, `learning_sessions`, `projects`, `project_tasks`, `study_sessions`) enforces PostgreSQL **Row Level Security (RLS)**:

- Every query is restricted with `auth.uid() = user_id`.
- Two test accounts cannot access or tamper with each other's records.
- Signed-out visitors cannot access protected views or sensitive data.
- The Google Gemini API key is stored exclusively on the server and never exposed in client bundles or network requests.

---

## ⏱️ Study Missions & Time Saved Methodology

- **Drift-Safe Timer**: Calculated from `Date.now()` timestamp deltas to prevent time lag when switching browser tabs.
- **Meme Breaker**: Offline, built-in lighthearted memes during break countdowns.
- **Ambient Audio**: In-browser synthesized ambient study sound without external dependencies or copyright liabilities.
- **Estimated Time Saved**: Grounded in UC Irvine cognitive research (23-minute distraction refocus latency). FocusFlow documents an estimated **15 minutes saved per 60 minutes of uninterrupted study**. Formula: `Total Focus Minutes × 0.25`.

---

## 🔧 Troubleshooting

| Issue | Resolution |
|---|---|
| `npm : File ... cannot be loaded because running scripts is disabled` | Run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force` in PowerShell. |
| Port 5000 already in use | Change `PORT=5001` in `server/.env` and update the proxy in `client/vite.config.js`. |
| AI Tutor responds with 503 error | Verify that `GEMINI_API_KEY` in `server/.env` is valid and not the placeholder text. |
| Supabase shows RLS errors | Ensure you ran the complete [`supabase/schema.sql`](./supabase/schema.sql) file which creates all required tables and user isolation policies. |
