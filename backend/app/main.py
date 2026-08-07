from fastapi import FastAPI

app = FastAPI(
    title="CliniVerse API",
    description="Backend API for CliniVerse",
    version="1.0.0",
)

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