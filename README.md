# 🩺 CliniVerse

CliniVerse is an AI-powered healthcare assistant designed to provide users with an interactive platform for general health and wellness guidance.

The platform features **Nova**, an AI healthcare assistant that supports health-related conversations, symptom checking, and voice interaction through a modern and responsive interface.

> ⚠️ CliniVerse is an educational and portfolio project and is not a replacement for professional medical advice.

## ✨ Features

- 🤖 Nova AI Healthcare Chat
- 🩺 Symptom Checker
- 🎙️ Voice Input & Text-to-Speech
- 🔐 User Registration & Login
- 👤 User Profile
- 🔔 Notifications
- 🌙 Dark / Light Mode
- 📊 Healthcare Dashboard
- 🔒 JWT Authentication
- 🗄️ PostgreSQL Database Integration

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- JWT Authentication

### Database
- PostgreSQL

### AI
- OpenAI API

### Deployment
- Vercel — Frontend - https://cliniverse-lac.vercel.app/

## 📂 Project Structure

```text
cliniverse/
├── frontend/       # Next.js frontend
├── backend/        # FastAPI backend
└── README.md
```

## 🚀 Run Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

### Backend

```bash
cd backend
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

## 🔐 Environment Variables

Create the required `.env` files and add your database, authentication, and OpenAI configuration.

Never commit API keys, passwords, secrets, `.env`, or `.env.local` files to GitHub.

## 🌐 Deployment

The **CliniVerse frontend is deployed on Vercel**.

The FastAPI backend and PostgreSQL database are currently configured for local development.

Because the backend is not publicly deployed, backend-dependent functionality on the live frontend may be unavailable.

## ⚠️ Medical Disclaimer

CliniVerse provides general health information for educational purposes only. It does not provide medical diagnoses or replace qualified healthcare professionals.

For medical emergencies, contact your local emergency services.

## 👩‍💻 Developer

**Sadani Wimalasiri**

Built as a full-stack AI healthcare project using Next.js, FastAPI, PostgreSQL, and OpenAI.
