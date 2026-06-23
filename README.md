# Cognora

A multilingual AI tutor built for LMS platforms — supporting English, Hindi, and Nepali.

🔗 **Live:** [cognora-frontend.abhisekgupta7.com.np](https://cognora-frontend.abhisekgupta7.com.np)

---

## What it does

Most AI education tools stop at answering questions. Cognora participates in the learning process:

- 🧠 **Multilingual tutoring** — learn course content in English, Hindi, or Nepali
- ❓ **On-demand quiz generation** — from course content, no manual setup
- 📊 **Automated evaluation** — students get assessed based on actual understanding
- 📧 **Performance reports** — sent directly to a student's inbox
- 🎥 **Transcript-flexible** — works with courses with or without transcripts

The architecture was designed around AI workflows from day one — content ingestion, processing, tutoring, assessment, and reporting are one connected pipeline, not separate bolted-on features.

---

## Architecture

```
cognora-frontend/   → Next.js — student-facing tutor UI, streaming chat
cognora-backend/    → FastAPI — AI orchestration, content pipeline, evaluation
docker-compose.yml  → Local dev environment (frontend + backend + Redis)
.github/workflows/  → CI/CD pipeline
```

**Deployment:** AWS EC2, containerized with Docker, Redis for caching/session state, CI/CD pipeline for automated deploys on push.

---

## Tech Stack

**Frontend:** Next.js · TypeScript · Tailwind CSS · shadcn/ui · SSE streaming
**Backend:** FastAPI (Python) · LangChain/LangGraph · OpenAI/Gemini APIs
**Infrastructure:** Docker · Redis · AWS EC2 · GitHub Actions CI/CD

---

## Why I built it this way

Treating AI as the foundation rather than a feature meant solving real systems problems: multilingual content processing, transcript-optional ingestion, automated grading logic, and reliable email delivery — all before the "AI" part even responds to a student.

This is my second production AI system, after integrating a LangGraph agent into a business operations platform ([OpScale](https://opscale-roan.vercel.app)). Cognora required full ownership across product, AI, backend, frontend, DevOps, and deployment.

---

## Contact

[Portfolio](https://abhisekgupta7.com.np) · [LinkedIn](https://www.linkedin.com/in/abhisek-gupta-205793278/) · abhisekgupta.dev@gmail.com
