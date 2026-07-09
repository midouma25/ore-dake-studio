from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
import uvicorn

from config import settings
from gpu_manager import gpu_manager
from audio_pipeline import AudioPipeline

app = FastAPI(title=settings.APP_NAME)

class JobSubmission(BaseModel):
    job_id: str
    job_type: str
    parameters: dict = {}
    input_file: str = "" # <-- أضف هذا السطر

@app.get("/health")
async def health_check():
    return {
        "status": "Operational",
        "gpu_vram_gb": gpu_manager.get_vram_usage()
    }

def execute_ai_task(job: JobSubmission):
    """Background task that runs the heavy GPU processing"""
    try:
        if job.job_type == "denoise":
            result = AudioPipeline.process_deep_clean("mock_input.wav", job.parameters)
            
        elif job.job_type == "stem-separation":
            result = AudioPipeline.process_stem_separation(job.input_file, job.parameters)            
        else:
            print(f"[Engine] Unknown job type: {job.job_type}")
            
        # In a real system, you would send a webhook back to Node.js Gateway here
        # requests.post(f"{NODE_URL}/api/internal/job-complete", json={"job_id": job.job_id, "result": result})
        
    except Exception as e:
        print(f"[Engine] Error processing job {job.job_id}: {str(e)}")
    finally:
        # Optional: Aggressively free memory after every job if you are severely VRAM constrained
        # gpu_manager.clear_vram()
        pass

@app.post("/api/ai/process")
async def process_media(job: JobSubmission, background_tasks: BackgroundTasks):
    """
    Endpoint called by Node.js Worker.
    Returns immediately, adds the heavy PyTorch processing to background tasks.
    """
    valid_types = ["denoise", "stem-separation", "voice-clone", "music-generate", "lip-sync"]
    if job.job_type not in valid_types:
        raise HTTPException(status_code=400, detail="Invalid job type")
    
    # Add the heavy lifting to FastAPI's background thread
    background_tasks.add_task(execute_ai_task, job)
    
    return {
        "success": True, 
        "message": f"Job {job.job_id} ({job.job_type}) accepted and processing in background.",
        "vram_usage": f"{gpu_manager.get_vram_usage()} GB"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)