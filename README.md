# Saanjh Sahayak — Clinical Decision Support (prototype)

Cross-platform mobile app (Expo) to assist doctors in old-age homes:
caretakers create patients and upload lab-report PDFs; the backend extracts
health parameters with Gemini and generates summary, precautions, severity
(0–10), and specialist suggestions; doctors review and verify reports.

> Status: working prototype, last touched Aug 2024. Authentication is stubbed
> (fixed demo sessions in `backend/controllers/sessions.js`) — do not expose
> publicly without implementing real auth.

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
MONGO_URL=<mongodb-uri> SESSION_KEY=<random> API_KEY_2=<gemini-key> node index.js

# Frontend (point Home.jsx at your backend host first — default is a hardcoded LAN IP)
cd frontend && npm install && npx expo start
```

Env notes: `LLM.js` reads the Mongo URI from `MONGO` (not `MONGO_URL`) —
set both until unified. `vercel.json` targets Vercel Node for the backend.
