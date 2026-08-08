from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

from app.api.auth import router as auth_router
from app.api.chat import router as chat_router


app = FastAPI(
    title="CliniVerse API",
    description="Backend API for CliniVerse",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {
        "app": "CliniVerse",
        "message": "API is running successfully 🚀",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }