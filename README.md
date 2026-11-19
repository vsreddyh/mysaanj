# Saanjh Sahayak — Clinical Decision Support (prototype)

Cross-platform mobile app (Expo) to assist doctors in old-age homes:
caretakers create patients and upload lab-report PDFs; the backend extracts
health parameters with Gemini and generates summary, precautions, severity
(0–10), and specialist suggestions; doctors review and verify reports.

> Status: working prototype, last touched Aug 2024. Demo logins use fixed
> sessions in `backend/controllers/sessions.js`; they are disabled unless
> `DEMO_LOGIN=1` (or `NODE_ENV` is not `production`), and every data route is
> session-scoped to the caller's old-age home. There is still no real identity
> provider — do not expose publicly without implementing one.

## Architecture

```
Expo app ──► Express /en/* ──┬──► MongoDB (patients, reports, homes, doctors)
                              ├──► GridFS (report PDFs)
                              └──► Gemini 1.5-flash (parameter extraction + analysis)
```

- 18 endpoints under `/en` (`backend/route.js`): report CRUD, `POST /upload`,
  `POST /reviewreport`, sessions, `GET /getpdf`, `GET /count`.
- Two-stage LLM pipeline (`backend/controllers/LLM.js`): (1) `pdf-parse` →
  few-shot prompt → JSON health params; (2) patient context → analysis,
  precautions, severity, specialist. Reports land in `patient.unverifiedreports`;
  `reviewreport` moves them to verified on doctor sign-off.
- 11-screen native-stack navigator (`frontend/App.js`): Splash, Home, Caretaker,
  CreatePatient, Patient, NewReport, Doctor, Report, ReviewReport, PDF view.

## Setup

```bash
# Backend
cd backend && npm install
cp .env.example .env        # fill in real values; .env is gitignored
npm start

# Frontend (point Home.jsx at your backend host first — default is a hardcoded LAN IP)
cd frontend && npm install && npx expo start
```

Required env vars (see `backend/.env.example`):

- `MONGO_URL` — MongoDB URI used by Mongoose.
- `MONGO` — MongoDB URI used by GridFS/report storage.
- `API_KEY_1`, `API_KEY_2` — Google Gemini API keys.
- `SESSION_KEY` — random secret for signing session cookies.
- `DEMO_LOGIN` — set to `1` to enable the prototype caretaker/doctor logins
  locally. Leave unset in production so those endpoints return 503.

`LLM.js` reads the Mongo URI from `MONGO` (not `MONGO_URL`) — set both until
unified. `vercel.json` targets Vercel Node for the backend.
