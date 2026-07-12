import os
import sys

from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
import uvicorn

from config import settings
from gpu_manager import gpu_manager
from audio_pipeline import AudioPipeline

app = FastAPI(title=settings.APP_NAME)
ffmpeg_path = os.path.abspath(r"E:\ore-dake-studio\ai-engine\venv\Lib\site-packages\imageio_ffmpeg\binaries")
if os.path.exists(ffmpeg_path):
    os.environ["PATH"] = ffmpeg_path + os.pathsep + os.environ["PATH"]
    # Required for Python 3.8+ on Windows to allow C-extensions (like torchcodec) to dynamically link DLLs
    if sys.version_info >= (3, 8):
        os.add_dll_directory(ffmpeg_path)

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
async def process_task(job: JobSubmission):
    print(f"[Engine] Received raw job data: {job.dict()}") 
    
    # 1. استخراج المسار الحقيقي بذكاء (سواء كان في الخارج أو داخل البارامترات)
    actual_file = job.input_file
    if not actual_file and "input_file" in job.parameters:
        actual_file = job.parameters["input_file"]
        
    # إذا كان المسار لا يزال فارغاً، نوقف العملية فوراً بدلاً من إحداث خطأ في المكتبات
    if not actual_file:
        print("[Engine] ERROR: File path is completely empty!")
        raise HTTPException(status_code=400, detail="Input file path is missing")

    print(f"[Engine] Verified File Path: {actual_file}")

    try:
        # 🌟 تمت إضافة مسار التنظيف العميق هنا 🌟
        if job.job_type == "denoise":
            result = AudioPipeline.process_deep_clean(actual_file, job.parameters)
            return {"status": "success", "job_id": job.job_id, "data": result}
            
        elif job.job_type == "stem-separation":
            result = AudioPipeline.process_stem_separation(actual_file, job.parameters)
            return {"status": "success", "job_id": job.job_id, "data": result}
        
        return {"status": "success", "message": f"Job {job.job_type} processed successfully"}
        
    except Exception as e:
        print(f"[Engine] Error processing job {job.job_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)