from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.chat import chat_router
from api.ingestion import Ingest_router
from api.quiz import Quiz_router
from api.student_report import Student_report_router

app = FastAPI()
origins = [
    "http://localhost:3000",
    "https://cognora-frontend.abhisekgupta7.com.np",
    "https://cognora-backend.abhisekgupta7.com.np",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router,prefix="/chat",tags=["chat"])
app.include_router(Ingest_router,prefix="/ingestion",tags=["ingestion"])
app.include_router(Quiz_router,prefix="/quiz",tags=["quiz"])
app.include_router(StudentReport_router,prefix="/student_report",tags=["student_report"])