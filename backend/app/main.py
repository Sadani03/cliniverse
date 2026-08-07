from fastapi import FastAPI

from app.api.auth import router as auth_router


app = FastAPI(
    title="CliniVerse API",
    description="Backend API for CliniVerse",
    version="1.0.0",
)


app.include_router(auth_router)


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