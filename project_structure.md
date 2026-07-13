# هيكل المشروع (Project Tree)

```text
├── ore-dake-studio/
    ├── .gitignore
    ├── docker-compose.yml
    ├── extract_code.py
    ├── project_structure.md
    ├── .vscode/
        ├── settings.json
    ├── ai-engine/
        ├── audio_pipeline.py
        ├── config.py
        ├── Dockerfile
        ├── gpu_manager.py
        ├── main.py
        ├── model_loader.py
        ├── requirements.txt
        ├── audio_ai/
            ├── auto_rename.py
        ├── models/
        ├── temp_workspace/
            ├── run_demucs_patched.py
            ├── safe_input.wav
            ├── demucs_out/
                ├── htdemucs/
                    ├── safe_input/
                        ├── bass.mp3
                        ├── drums.mp3
                        ├── other.mp3
                        ├── vocals.mp3
                ├── mdx_extra/
                    ├── safe_input/
                        ├── audio-1783779040277-766144752_resemble_safe.wav
                        ├── bass.flac
                        ├── drums.flac
                        ├── other.flac
                        ├── safe_input_clean.flac
                        ├── vocals.flac
        ├── tests/
        ├── utils/
        ├── video_ai/
    ├── frontend/
        ├── .gitignore
        ├── .oxlintrc.json
        ├── Dockerfile
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── README.md
        ├── tailwind.config.js
        ├── vite.config.js
        ├── public/
        ├── src/
            ├── App.css
            ├── App.jsx
            ├── index.css
            ├── main.jsx
            ├── assets/
            ├── components/
                ├── audio-realm/
                    ├── AudioWorkspace.jsx
                    ├── ai-panel/
                        ├── AIProgressModal.jsx
                        ├── AI_Audio_Rack.jsx
                    ├── effects-rack/
                        ├── EffectSlot.jsx
                        ├── EffectsRack.jsx
                        ├── EffectWindow.jsx
                    ├── text-editor/
                        ├── TextAudioEditor.jsx
                    ├── timeline/
                        ├── Clip.jsx
                        ├── SmartAudioTimeline.jsx
                        ├── Track.jsx
                ├── common/
                    ├── Button.jsx
                    ├── Modal.jsx
                    ├── Panel.jsx
                    ├── Slider.jsx
                    ├── Transport.jsx
                ├── dashboard/
                    ├── AudioRealm.jsx
                    ├── Dashboard.jsx
                ├── layout/
                    ├── BottomBar.jsx
                    ├── Sidebar.jsx
                ├── shared-library/
                    ├── SharedLibrary.jsx
                ├── studio/
                    ├── StudioPage.jsx
                ├── video-realm/
                    ├── emotion-gen/
                        ├── EmotionVideoGenerator.jsx
                    ├── lip-sync/
                        ├── LipSyncPanel.jsx
                    ├── timeline/
                        ├── VideoDubbingTimeline.jsx
            ├── store/
                ├── useAIJobStore.js
                ├── useEffectsStore.js
                ├── useTimelineStore.js
            ├── utils/
                ├── classNames.js
                ├── timeUtils.js
    ├── gateway/
        ├── .env
        ├── Dockerfile
        ├── package-lock.json
        ├── package.json
        ├── server.js
        ├── src/
            ├── config/
                ├── queue.js
            ├── routes/
                ├── aiJobs.js
                ├── upload.js
            ├── services/
                ├── websocket.js
            ├── workers/
                ├── aiWorker.js
    ├── uploads/
        ├── audio-1783648716551-511077011.mp3
        ├── audio-1783683113938-242827333.mp3
        ├── audio-1783684494751-470832762.mp3
        ├── audio-1783685074619-12379440.mp3
        ├── audio-1783687451822-725993962.mp3
        ├── audio-1783690262064-640913024.mp3
        ├── audio-1783690681760-12083783.mp3
        ├── audio-1783690849468-442374329.mp3
        ├── audio-1783696401205-676559314.mp3
        ├── audio-1783699228892-388595909.mp3
        ├── audio-1783699671896-803504826.mp3
        ├── audio-1783699707459-846697743.mp3
        ├── audio-1783713127512-341916353.mp3
        ├── audio-1783716767410-402174561.mp3
        ├── audio-1783717746720-753517621.mp3
        ├── audio-1783718179832-123495292.mp3
        ├── audio-1783721210252-988455973.mp3
        ├── audio-1783721247128-918043618.mp3
        ├── audio-1783721412191-147495413.mp3
        ├── audio-1783721825324-196431754.mp3
        ├── audio-1783721904556-159296542.mp3
        ├── audio-1783724199229-774922831.mp3
        ├── audio-1783724267448-850507285.mp3
        ├── audio-1783724688943-163982677.mp3
        ├── audio-1783724701364-470981652.wav
        ├── audio-1783727376956-893463100.wav
        ├── audio-1783727636217-126846640.wav
        ├── audio-1783779040277-766144752.wav
        ├── audio-1783788431874-953177223.wav
        ├── audio-1783789192877-824147807.wav
        ├── audio-1783789695559-484254404.wav
        ├── audio-1783790656149-845908337.wav
```

---

# محتوى الأكواد (Source Code)

## الملف: `.gitignore`

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
# 6379
*.mp3 
*.wav
*.FLAC
venv
```

---

## الملف: `docker-compose.yml`

```yml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
      - REACT_APP_WS_URL=ws://localhost:5000
    depends_on:
      - gateway

  gateway:
    build: ./gateway
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/ore-dake
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - FRONTEND_URL=http://localhost:3000
    depends_on:
      - mongo
      - redis
      - ai-engine

  ai-engine:
    build: ./ai-engine
    ports:
      - "8000:8000"
    environment:
      - CUDA_VISIBLE_DEVICES=0
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mongo_data:
  redis_data:
```

---

## الملف: `extract_code.py`

```python
import os

def generate_code_report(directory, output_filename="project_structure.md"):
    # المجلدات والملفات التي سيتم تجاهلها (لتجنب استخراج ملفات ضخمة أو غير هامة)
    ignore_dirs = {'.git', 'node_modules', '__pycache__', 'venv', 'env', '.next', 'build', 'dist'}
    ignore_exts = {'.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.pdf', '.zip', '.exe', '.pyc', '.mp4'}

    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write("# هيكل المشروع (Project Tree)\n\n```text\n")

        # 1. رسم شجرة المجلدات والملفات
        for root, dirs, files in os.walk(directory):
            # فلترة المجلدات لتجاهل الغير مرغوب فيها
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            
            # حساب مستوى المسافة البادئة بناءً على عمق المجلد
            level = root.replace(directory, '').count(os.sep)
            indent = ' ' * 4 * level
            folder_name = os.path.basename(root)
            
            if folder_name:  # تجنب طباعة مسار فارغ للمجلد الرئيسي
                f.write(f"{indent}├── {folder_name}/\n")
            
            subindent = ' ' * 4 * (level + 1)
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext not in ignore_exts:
                    f.write(f"{subindent}├── {file}\n")

        f.write("```\n\n---\n\n# محتوى الأكواد (Source Code)\n\n")

        # 2. كتابة محتوى الملفات
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext not in ignore_exts:
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, directory)

                    # تحديد لغة البرمجة لتنسيقها في ملف الماركداون
                    lang = ext.replace('.', '') if ext else 'text'
                    if lang in ['js', 'jsx']: lang = 'javascript'
                    elif lang in ['ts', 'tsx']: lang = 'typescript'
                    elif lang == 'py': lang = 'python'

                    f.write(f"## الملف: `{rel_path}`\n\n")
                    f.write(f"```{lang}\n")
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as code_file:
                            f.write(code_file.read())
                    except Exception as e:
                        f.write(f"// تعذر قراءة الملف: {e}")
                        
                    f.write("\n```\n\n---\n\n")

    print(f"تم الانتهاء بنجاح! تم حفظ النتيجة في ملف: {output_filename}")

# تشغيل السكربت على المجلد الحالي
if __name__ == "__main__":
    current_directory = os.getcwd()
    generate_code_report(current_directory)
```

---

## الملف: `project_structure.md`

```md

```

---

## الملف: `.vscode\settings.json`

```json
{
    "python-envs.defaultEnvManager": "ms-python.python:system"
}
```

---

## الملف: `ai-engine\audio_pipeline.py`

```python
import os
import sys
import subprocess
import gc
from config import settings

try:
    import imageio_ffmpeg  # type: ignore[import]
except ImportError:  # pragma: no cover
    imageio_ffmpeg = None  # type: ignore[assignment]

try:
    import requests  # type: ignore[import]
except ImportError:  # pragma: no cover
    requests = None  # type: ignore[assignment]


def send_progress(message):
    try:
        print(f">>> Sending progress: {message}")
        if requests:
            requests.post("http://localhost:5000/api/internal/progress", json={"message": message}, timeout=2)
        else:
            print(">>> Progress update skipped because requests is unavailable.")
    except Exception as e:
        print(f"Failed to send progress: {e}")

class AudioPipeline:
    
    # 🌟 Studio Enhancer Algorithm (Resemble Enhance + Adobe Podcast Polish) 🌟
    @staticmethod
    def process_deep_clean(input_path: str, parameters: dict):
        send_progress("🚀 Receiving file for legendary enhancement...")
        print(f"[Audio Pipeline] Starting Resemble Enhance on: {input_path}")
        
        if imageio_ffmpeg is None:
            raise RuntimeError("imageio_ffmpeg is required for audio conversion. Install the dependency and retry.")

        abs_input_path = os.path.abspath(input_path)
        out_dir = os.path.abspath(os.path.join(settings.TEMP_DIR, "demucs_out", "mdx_extra", "safe_input"))
        os.makedirs(out_dir, exist_ok=True)
        
        base_name = os.path.splitext(os.path.basename(abs_input_path))[0]
        safe_wav_path = os.path.join(out_dir, f"{base_name}_resemble_safe.wav")
        out_wav = os.path.join(out_dir, "safe_input_clean.wav")
        out_flac = os.path.join(out_dir, "safe_input_clean.flac")
        
        # استخراج نسبة الدمج من الواجهة (إذا لم تكن موجودة نجعلها 70%)
        # React sends parameters['strength'] (0 to 100)
        strength_percent = float(parameters.get("strength", 70)) if parameters else 70.0
        ai_ratio = strength_percent / 100.0
        dry_ratio = 1.0 - ai_ratio
        
        try:
            send_progress("🛠️ Converting audio to generation-ready format (Mono 44.1kHz)...")
            ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
            
            subprocess.run([
                ffmpeg_exe, "-y", "-i", abs_input_path,
                "-ar", "44100", "-ac", "1", "-c:a", "pcm_s16le",
                safe_wav_path
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            send_progress("🧠 Waking the AI beast (Resemble Enhance)...")
            
            import pathlib
            temp_posix = None
            if os.name == 'nt':
                temp_posix = pathlib.PosixPath
                pathlib.PosixPath = pathlib.WindowsPath 
                
            try:
                import torch  # type: ignore[import]
                import torchaudio  # type: ignore[import]
                from resemble_enhance.enhancer.inference import enhance  # type: ignore[import]
            except ImportError as e:
                if temp_posix is not None:
                    pathlib.PosixPath = temp_posix
                raise RuntimeError("Missing deep-clean dependencies: install torch, torchaudio, and resemble_enhance.") from e
            
            device = "cuda" if torch.cuda.is_available() else "cpu"
            
            # 1. قراءة الملف الأصلي
            orig_wav, sr = torchaudio.load(safe_wav_path)
            orig_wav_1d = orig_wav.mean(0)
            
            send_progress("⚡ The magic is happening now: cleaning audio and rebuilding missing frequencies (may take a while)...")
            
            # 2. توليد صوت الذكاء الاصطناعي النقي
            hwav, new_sr = enhance(orig_wav_1d, sr, device=device, nfe=64, solver="midpoint", lambd=0.9, tau=0.5)
            
            if temp_posix is not None:
                pathlib.PosixPath = temp_posix
                
            send_progress(f"🎛️ Blending Original Soul ({int(dry_ratio*100)}%) with AI Purity ({int(ai_ratio*100)}%)...")
            
            # 3. 🌟 السحر الرياضي: دمج الصوتين لضمان بقاء الروح والانفعال 🌟
            min_len = min(orig_wav_1d.shape[-1], hwav.shape[-1])
            orig_cut = orig_wav_1d[:min_len].to(hwav.device)
            hwav_cut = hwav[:min_len]
            
            blended_hwav = (orig_cut * dry_ratio) + (hwav_cut * ai_ratio)
            blended_2d = blended_hwav.unsqueeze(0).cpu()
            
            # حفظ الملف المدمج مؤقتاً
            torchaudio.save(out_wav, blended_2d, new_sr)
            
            send_progress("🎙️ Applying 'Adobe Podcast' Polish (Broadcast EQ & Compression)...")
            
            # 4. 🌟 فلتر Adobe Podcast السري (Highpass + Warm EQ + Crisp EQ + Compression + Loudnorm) 🌟
            adobe_shasta_filter = (
                "highpass=f=80,"                           # إزالة طنين المايكروفون الخفي
                "equalizer=f=100:t=q:w=1:g=3,"             # تضخيم فخامة الصوت (Bass/Proximity)
                "equalizer=f=300:t=q:w=1:g=-2,"            # إزالة المكتومية (Mud)
                "equalizer=f=6000:t=q:w=1:g=4,"            # إضافة لمعان ووضوح للإلقاء (Air/Presence)
                "acompressor=threshold=-15dB:ratio=4:attack=5:release=50:makeup=3," # ضغط الصوت بقوة
                "loudnorm=I=-16:TP=-1.5:LRA=11"            # توحيد مستوى الصوت لمعيار البودكاست العالمي
            )
            
            subprocess.run([
                ffmpeg_exe, "-y", "-i", out_wav,
                "-af", adobe_shasta_filter,
                "-c:a", "flac", out_flac
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            if os.path.exists(out_wav): os.remove(out_wav)
            if os.path.exists(safe_wav_path): os.remove(safe_wav_path)
            
            send_progress("🧹 Clearing RAM and VRAM to free up system resources...")
            del orig_wav, orig_wav_1d, hwav, blended_hwav, blended_2d, orig_cut, hwav_cut
            gc.collect() 
            if torch.cuda.is_available():
                torch.cuda.empty_cache()

            send_progress("✨ Process completed successfully! Get ready to hear the magic...")
            
            url = f"http://localhost:5000/outputs/safe_input_clean.flac"
            return {"tracks": [{"name": "🎙️ Broadcast Enhanced (Adobe Style)", "src": url, "type": "cleaned"}]}
            
        except Exception as e:
            send_progress(f"❌ An error occurred during enhancement: {str(e)}")
            raise e

    @staticmethod
    def process_stem_separation(input_path: str, _parameters: dict):
        send_progress("🚀 Receiving the audio file and analyzing it...")
        print(f"[Audio Pipeline] Starting REAL Stem Separation on: {input_path}")
        
        if imageio_ffmpeg is None:
            raise RuntimeError("imageio_ffmpeg is required for audio conversion. Install the dependency and retry.")

        abs_input_path = os.path.abspath(input_path)
        out_dir = os.path.abspath(os.path.join(settings.TEMP_DIR, "demucs_out"))
        safe_input_path = os.path.abspath(os.path.join(settings.TEMP_DIR, "safe_input.wav"))
        
        os.makedirs(out_dir, exist_ok=True)
        
        try:
            file_size = os.path.getsize(abs_input_path)
            print(f"[Audio Pipeline] Input file size: {file_size} bytes")
            send_progress("🛠️ Converting audio to studio standard format (44.1kHz)...")
            
            ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
            subprocess.run([
                ffmpeg_exe, "-y", "-i", abs_input_path,
                "-ar", "44100", "-ac", "2", "-c:a", "pcm_s16le",
                safe_input_path
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
        except Exception as e:
            send_progress("❌ Failed to prepare the audio file!")
            raise e

        send_progress("🧠 Loading the AI model (MDX-Extra) onto the GPU...")
        
        wrapper_path = os.path.abspath(os.path.join(settings.TEMP_DIR, "run_demucs_patched.py"))
        wrapper_code = f"""
import sys
import torchaudio
import soundfile as sf

def custom_save(uri, src, sample_rate, **kwargs):
    audio_np = src.transpose(0, 1).cpu().numpy()
    sf.write(str(uri), audio_np, sample_rate)

torchaudio.save = custom_save

from demucs.separate import main
sys.argv = ['demucs', '-n', 'mdx_extra', '--out', {repr(out_dir)}, {repr(safe_input_path)}]
sys.exit(main())
"""
        with open(wrapper_path, "w", encoding="utf-8") as f:
            f.write(wrapper_code)

        try:
            send_progress("⚡ Separating stems at studio quality (may take 1 to 3 minutes)...")
            subprocess.run([sys.executable, wrapper_path], check=True)
            
            base_name = os.path.splitext(os.path.basename(safe_input_path))[0]
            model_out_dir = os.path.join(out_dir, "mdx_extra", base_name)
            outputs = {}
            ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
            
            track_names = {"vocals": "vocals", "drums": "drums", "bass": "bass", "other": "other instruments"}
            
            for track in ["vocals", "drums", "bass", "other"]:
                english_name = track_names[track]
                send_progress(f"🎛️ Compressing track ({english_name}) to ultra-high quality FLAC...")
                
                wav_path = os.path.join(model_out_dir, f"{track}.wav")
                flac_path = os.path.join(model_out_dir, f"{track}.flac")
                
                subprocess.run([
                    ffmpeg_exe, "-y", "-i", wav_path,
                    "-c:a", "flac",
                    flac_path
                ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                
                os.remove(wav_path)
                outputs[track] = os.path.join(model_out_dir, f"{track}.flac")
            
            send_progress("✨ Finished successfully! Preparing the final output...")
            return outputs
            
        except subprocess.CalledProcessError as e:
            send_progress("❌ An error occurred during GPU processing!")
            raise e
```

---

## الملف: `ai-engine\config.py`

```python
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Server configs
    APP_NAME: str = "Ore Dake AI Studio Engine"
    DEBUG_MODE: bool = True
    
    # Directories
# بدلاً من /tmp/ore-dake اجعله هكذا:
    TEMP_DIR: str = os.getenv("TEMP_DIR", "./temp_workspace")
    MODELS_DIR: str = os.getenv("MODELS_DIR", "./models")
    
    # GPU Constraints
    MAX_VRAM_USAGE_GB: float = 12.0 # Assume RTX 3060/4070
    
    # Model Paths
    DEEPFILTER_MODEL_PATH: str = f"{MODELS_DIR}/deepfilternet3"
    DEMUCS_MODEL_PATH: str = f"{MODELS_DIR}/htdemucs"
    WHISPER_MODEL_PATH: str = f"{MODELS_DIR}/whisperx"

settings = Settings()

# Ensure temp directory exists
os.makedirs(settings.TEMP_DIR, exist_ok=True)
```

---

## الملف: `ai-engine\Dockerfile`

```text
FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# بدلاً من تحميل المكتبات الضخمة في كل مرة عند تغيير كود بايثون، 
# سنقوم بتثبيت المكتبات أولاً قبل نسخ ملفات الكود الخاصة بك.
# بهذه الطريقة، إذا قمت بتعديل ملف main.py، لن يعيد Docker تحميل المكتبات.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## الملف: `ai-engine\gpu_manager.py`

```python
import torch
import gc

class GPUManager:
    @staticmethod
    def get_vram_usage():
        """Returns current VRAM usage in GB"""
        if not torch.cuda.is_available():
            return 0.0
        allocated = torch.cuda.memory_allocated() / (1024 ** 3)
        return round(allocated, 2)

    @staticmethod
    def clear_vram():
        """Force PyTorch to release unused cached memory"""
        if torch.cuda.is_available():
            gc.collect()
            torch.cuda.empty_cache()
            print(f"[GPU Manager] VRAM Cleared. Current usage: {GPUManager.get_vram_usage()} GB")

gpu_manager = GPUManager()
```

---

## الملف: `ai-engine\main.py`

```python
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
```

---

## الملف: `ai-engine\model_loader.py`

```python
from gpu_manager import gpu_manager

class ModelLoader:
    def __init__(self):
        self.loaded_models = {}
        self.active_model_name = None

    def load_model(self, model_name: str):
        """Loads a model into GPU. Unloads previous if necessary."""
        
        # If already loaded, return it
        if model_name in self.loaded_models:
            print(f"[Model Loader] {model_name} is already loaded.")
            self.active_model_name = model_name
            return self.loaded_models[model_name]

        # Free VRAM before loading a new heavy model
        self.unload_all()

        print(f"[Model Loader] Loading {model_name} into VRAM...")
        
        # Mocking the actual PyTorch model loading
        if model_name == "deepfilternet3":
            # model = DeepFilterNet3.load(...)
            model = {"name": "DeepFilterNet3", "device": "cuda"}
        elif model_name == "htdemucs":
            # model = HTDemucs.load(...)
            model = {"name": "HTDemucs v4", "device": "cuda"}
        elif model_name == "rvc":
            model = {"name": "RVC Voice Clone", "device": "cuda"}
        else:
            raise ValueError(f"Unknown model: {model_name}")

        self.loaded_models[model_name] = model
        self.active_model_name = model_name
        
        print(f"[Model Loader] Loaded successfully. VRAM: {gpu_manager.get_vram_usage()} GB")
        return model

    def unload_all(self):
        """Unloads all models to free 100% of available VRAM."""
        if self.loaded_models:
            print(f"[Model Loader] Unloading models: {list(self.loaded_models.keys())}")
            self.loaded_models.clear()
            self.active_model_name = None
            gpu_manager.clear_vram()

model_loader = ModelLoader()
```

---

## الملف: `ai-engine\requirements.txt`

```txt
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte
```

---

## الملف: `ai-engine\audio_ai\auto_rename.py`

```python
import os
import re

# الكلمات المفتاحية الذكية لتصنيف ملفاتك تلقائياً
categories = {
    "anime_high": ['scream', 'goku', 'mahito', 'levi', 'dubbing', 'oikawa', 'fry'],
    "reverb_high": ['bathroom', 'hallway', 'acoustic', 'room', 'shower'],
    "noise_high": ['street', 'city', 'traffic', 'restaurant', 'cafe', 'wind', 'construction'],
    "mic_high": ['mic', 'headset', 'webcam', 'telephone', 'headphone', 'quadcast', 'rode'],
}

valid_ext = ('.wav', '.mp3', '.mp4', '.m4a', '.wmv', '.webm', '.ogg')

for filename in os.listdir('.'):
    if not filename.lower().endswith(valid_ext) or filename == os.path.basename(__file__):
        continue

    name_lower = filename.lower()
    ext = os.path.splitext(filename)[1]

    # البحث عن التصنيف المناسب
    prefix = "clean_med" # الافتراضي إذا لم يجد كلمة مفتاحية
    for cat, keywords in categories.items():
        if any(word in name_lower for word in keywords):
            prefix = cat
            break

    # تنظيف الاسم من الرموز والمسافات وجعله قصيراً وأنيقاً
    clean_name = re.sub(r'[^a-zA-Z0-9]', '_', filename[:-len(ext)])
    clean_name = re.sub(r'_+', '_', clean_name).strip('_')
    
    # دمج الاسم النهائي
    new_name = f"{prefix}_{clean_name[:15].lower()}{ext}"

    # إعادة التسمية
    try:
        os.rename(filename, new_name)
        print(f"✅ Renamed: {new_name}")
    except Exception as e:
        print(f"❌ Failed: {filename} -> {e}")

print("\n🎉 انتهت المهمة بنجاح! مجلدك الآن جاهز لمختبر الأبحاث.")
```

---

## الملف: `ai-engine\temp_workspace\run_demucs_patched.py`

```python

import sys
import torchaudio
import soundfile as sf

def custom_save(uri, src, sample_rate, **kwargs):
    audio_np = src.transpose(0, 1).cpu().numpy()
    sf.write(str(uri), audio_np, sample_rate)

torchaudio.save = custom_save

from demucs.separate import main
sys.argv = ['demucs', '-n', 'mdx_extra', '--out', 'E:\\ore-dake-studio\\ai-engine\\temp_workspace\\demucs_out', 'E:\\ore-dake-studio\\ai-engine\\temp_workspace\\safe_input.wav']
sys.exit(main())

```

---

## الملف: `ai-engine\temp_workspace\safe_input.wav`

```wav
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0x92 in position 5: invalid start byte
```

---

## الملف: `ai-engine\temp_workspace\demucs_out\htdemucs\safe_input\bass.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 44: invalid start byte
```

---

## الملف: `ai-engine\temp_workspace\demucs_out\htdemucs\safe_input\drums.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 44: invalid start byte
```

---

## الملف: `ai-engine\temp_workspace\demucs_out\htdemucs\safe_input\other.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 44: invalid start byte
```

---

## الملف: `ai-engine\temp_workspace\demucs_out\htdemucs\safe_input\vocals.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 44: invalid start byte
```

---

## الملف: `ai-engine\temp_workspace\demucs_out\mdx_extra\safe_input\audio-1783779040277-766144752_resemble_safe.wav`

```wav
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xfa in position 5: invalid start byte
```

---

## الملف: `ai-engine\temp_workspace\demucs_out\mdx_extra\safe_input\bass.flac`

```flac
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xb4 in position 14: invalid start byte
```

---

## الملف: `ai-engine\temp_workspace\demucs_out\mdx_extra\safe_input\drums.flac`

```flac
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xc1 in position 14: invalid start byte
```

---

## الملف: `ai-engine\temp_workspace\demucs_out\mdx_extra\safe_input\other.flac`

```flac
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xd2 in position 14: invalid continuation byte
```

---

## الملف: `ai-engine\temp_workspace\demucs_out\mdx_extra\safe_input\safe_input_clean.flac`

```flac
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xfc in position 14: invalid start byte
```

---

## الملف: `ai-engine\temp_workspace\demucs_out\mdx_extra\safe_input\vocals.flac`

```flac
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xbe in position 14: invalid start byte
```

---

## الملف: `frontend\.gitignore`

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
# 6379
venv
```

---

## الملف: `frontend\.oxlintrc.json`

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}

```

---

## الملف: `frontend\Dockerfile`

```text
# Use Node.js 20 instead of 18
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
```

---

## الملف: `frontend\index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

---

## الملف: `frontend\package-lock.json`

```json
{
  "name": "frontend",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "frontend",
      "version": "0.0.0",
      "dependencies": {
        "axios": "^1.18.1",
        "clsx": "^2.1.1",
        "lucide-react": "^1.23.0",
        "react": "^19.2.7",
        "react-dom": "^19.2.7",
        "react-router-dom": "^7.18.1",
        "socket.io-client": "^4.8.3",
        "tailwind-merge": "^3.6.0",
        "wavesurfer.js": "^7.12.10",
        "zustand": "^5.0.14"
      },
      "devDependencies": {
        "@types/react": "^19.2.17",
        "@types/react-dom": "^19.2.3",
        "@vitejs/plugin-react": "^6.0.3",
        "autoprefixer": "^10.5.2",
        "oxlint": "^1.71.0",
        "postcss": "^8.5.16",
        "tailwindcss": "^3.4.19",
        "vite": "^8.1.1"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@emnapi/core": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.11.1.tgz",
      "integrity": "sha512-RSvbQmHzdKzNsLYa/wHrbc3KN4sYLKAdPZxqiM2HATqv/SBk2/ENSHpvXGaLOMcsAyz0poEGqkmmKYG3OWiJEQ==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.2",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.11.1.tgz",
      "integrity": "sha512-vgj7R3y3Wgx24IQaGPA/R6YFXLHVMOZ0uVEyIQPaWs+rd1AzfEMXlAC22FYwO1XkKR6NPsq7mUandH8oIRdZFw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.2.tgz",
      "integrity": "sha512-c95qOXkHdydNKhscBTebqEC1CVAZpyqOfVfBzQ1qgzyl3gfeldUjIggDbIZgDKsHLgnsM+igH7TJ/eAasaVuMA==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.1.6.tgz",
      "integrity": "sha512-ZLv/JdUfkvOy9eCnnBaGfiO+XimbjebAeO+MRQqD/B+FR1tnRN0tpKSJHRbE8sFfS6aqsXZ67TQjfwfsxULVbg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@tybys/wasm-util": "^0.10.3"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "peerDependencies": {
        "@emnapi/core": "^1.7.1",
        "@emnapi/runtime": "^1.7.1"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.139.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.139.0.tgz",
      "integrity": "sha512-r9gHphtCs+1M7J0pw6Sn/hh/Wpa/iQrOOkrNAlVLF/gHq+/CJmHIWKKUUhdWjcD6CIa8idarspCsASiXCXvFUw==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Boshen"
      }
    },
    "node_modules/@oxlint/binding-android-arm-eabi": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-android-arm-eabi/-/binding-android-arm-eabi-1.73.0.tgz",
      "integrity": "sha512-HZQRN/UMBu+Ut+/9MiAChkbP4qZqrNOWBcNI45vOT40GVhbGR0JgHB87L48D4iAqFQIdVmeQYtV9RF89AjTKkg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-android-arm64": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-android-arm64/-/binding-android-arm64-1.73.0.tgz",
      "integrity": "sha512-Gp+KJRylv2aW7thRpG5p1KTxZq4ZJFbWowrKzufNq9d3ssl3r3JviYV45/+p+7CN1Nv0zDd1e8Ex0b/HUDq4TQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-darwin-arm64": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-darwin-arm64/-/binding-darwin-arm64-1.73.0.tgz",
      "integrity": "sha512-3de96NdtXhxERMjIz7wsp2HYMY6pMQycGxFWac2mFecAx6VeARF/IqFb1QIaqiCRIdfzBwzTed+pCTCoiS+CYA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-darwin-x64": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-darwin-x64/-/binding-darwin-x64-1.73.0.tgz",
      "integrity": "sha512-5zx/uPW32TiaOeVY1dQ/H5iOf0K1HOdFKOJhLqGl4o63+i1fpzoqqu/mKtd7OFgFjNCdhlyTGgjVkQTZm1ELcg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-freebsd-x64": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-freebsd-x64/-/binding-freebsd-x64-1.73.0.tgz",
      "integrity": "sha512-qNe4gKHaGnLuZJ8toUg90JAa0S2vTVvDw+0bRi3q1avXZXDT4u5mMeECf3nD4HYrbdn1O7dXqWut4onY/yx/Xg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm-gnueabihf": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.73.0.tgz",
      "integrity": "sha512-cCehYh5hTbfShm/fxTD6wwrGUWIpvX+N5OxmAMhFhDeTGXvw+BeNj889tpxsFQ9ZLatQ6wImuY8tsKLZ+FMz7w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm-musleabihf": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm-musleabihf/-/binding-linux-arm-musleabihf-1.73.0.tgz",
      "integrity": "sha512-d5j5GDU/2dMgjVhw7TQT9ITrsIr1Y02KEXKyVGIXUkD+KiaxE9TP65FS2ZdgTBemQvoRL+gSBdbrIm3cQIeacg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm64-gnu": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.73.0.tgz",
      "integrity": "sha512-Eyf1SrP3+yR1DI3OJgOY2Pvrr9dWP9TK37xPaDYycwTtlGlI45erJAVIfH5/m/xosDt6BupJYEFi47bvbTuuyw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm64-musl": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.73.0.tgz",
      "integrity": "sha512-IlT/OJApEDKaMmCooHuncgJZbbCe7T5QIWmTZBEtYscWvzPQuuEinVcid6kwQRVQOUdb7PUCz4jQHnaYXdfJXw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-ppc64-gnu": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.73.0.tgz",
      "integrity": "sha512-L+JYcb/vdg5fmcH08V6o0YYLU28cTH1SPNulwJdvK9NK49aXSkYy6oNpKBmddArVOXYqNepriDGiZ04G54kh1Q==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-riscv64-gnu": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-riscv64-gnu/-/binding-linux-riscv64-gnu-1.73.0.tgz",
      "integrity": "sha512-Qtk0g3bKV6OwWjIm7R8kQN1uOZRKQt/MODK2a8QfkwhTpXBD53ozx5XLVWLGDQAVyp2otLW4D2wB98XfAfMPGA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-riscv64-musl": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-riscv64-musl/-/binding-linux-riscv64-musl-1.73.0.tgz",
      "integrity": "sha512-wX0NQKZVxltkAOVmzFcpOaMpdaUvsq1Eqpx9tkAfl71UdkTlSo1R4AdAnGccR1Fm2+TzFgZ22CyyGuZ41RDr/A==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-s390x-gnu": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.73.0.tgz",
      "integrity": "sha512-vPe7UGBMWyiLTtnqS4xxgMQFSFGmtQwhwCxuiw6lXygaO6bVt0D8dFVg8Xv05eaiN3ybC0HXXHUAohFMFvqoCQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-x64-gnu": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.73.0.tgz",
      "integrity": "sha512-2CwIWr9cemFC/CbRBWZvuk5mffz6ObmfFkfcC/9rTQ7f+icNhYr2kOjf9Rt8lLvugvkdGDOmkoVoFFHh6ClCTw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-x64-musl": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-x64-musl/-/binding-linux-x64-musl-1.73.0.tgz",
      "integrity": "sha512-nDadfJgg7NBBxG0N560wOe7LLX5QiYp6qBaI7viuk5EUORFBktU/NfV0MbTqU3gTqQDCh4VyxKdo5VADxk9w8Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-openharmony-arm64": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-openharmony-arm64/-/binding-openharmony-arm64-1.73.0.tgz",
      "integrity": "sha512-wGjJC+NLH9xP+IKGn9RDW94ojJR/wPbg5WCnQjj/oReaOtCQthr8ws1zICe77JFmo4ouUdeTHHZL/ESGiF6Pmw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-arm64-msvc": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.73.0.tgz",
      "integrity": "sha512-I7X47GPGljw225YUQ5SbC/rb1Kkdrd0yQf0x+hYxeKS6DpfjMbo9ccQPQ6LNY6BoJQ1sHhgDUGuMn5Vg5gHT6w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-ia32-msvc": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-ia32-msvc/-/binding-win32-ia32-msvc-1.73.0.tgz",
      "integrity": "sha512-5lWj+3h+74Fm1jYOO9qkJA4xkAlZA099DkXppuXsk7UpnpZLttsefrZU469vChGaG6hcSqrkKXQOvMTZtbjeNg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-x64-msvc": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.73.0.tgz",
      "integrity": "sha512-WaNRvh4f6zY9CvUQk2YoA1O90ieWrIklI84+HXFr9Isjz9CSESrdqo/RtIYt4Dll/cAchqGDMehfaZd0vqEFZw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.1.5.tgz",
      "integrity": "sha512-lZg8fqIv2v7FF237bwMgzGZEJvGL79/s5knJ/i6FmsGF4XXlzccZ4jb+TrFIxtSSxFtIpdsgrPZeMk1I9AFcyQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.1.5.tgz",
      "integrity": "sha512-51Bnx9pNiMRKSUNtBfySkNJ9vMU9Hh3I1ozDd6gyPPYzaXCfnptUcEZxXGYFn+ul2dtcMUiqGR1Yai2K10uoTw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.1.5.tgz",
      "integrity": "sha512-Tm+gbfC0aHu1tBA/JvKQh32S0K6YgCHkiAF4/W6xX0K0RmNuc94VeK419dJoE65R5aRxmo+noZQSWrAMF6yb6g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.1.5.tgz",
      "integrity": "sha512-JMzDKCCXq93YccG5gz3hvOs1oXRKAf0XYpfOS88e+wZrC8Iugj6j68867vrYZkvpDDpKn/KoKORThmchMpF6TA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.1.5.tgz",
      "integrity": "sha512-uML21j2K5TfPGutKxub+M+nLjZIrWjXQ5Grx4lCe/nimTj9B4L63zHpjXLl4y0L3mcm2htEQIb06oCG/szerNw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.1.5.tgz",
      "integrity": "sha512-navSiuTMogvnQoZoM/v+l3ZWo50/NTwSHSzheABx/RCnmUPaKwq9qSo4Br2OYRs21+Fz8uFqITZM3H4opOB0/Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.1.5.tgz",
      "integrity": "sha512-lAryqH7IteztmCXQXk0etKj4wBQ7Gx5S6LjKhsgp9zb8I5bsuvU/2llH1hDQcjsFeqIsovMVN339/8pUDDBXxA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.1.5.tgz",
      "integrity": "sha512-fsK/sNBnxzBlL4O1JNrZakVQxPspqpED5dLtNsZS9oOKmtSpdNIzxH2kkol5HYTWJN47sE20ztMJPxfZ89qGOg==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.1.5.tgz",
      "integrity": "sha512-gLYb4BIadlfTOYT5gO503n8zQjXflgzpD0FcyKh0Mzx3rqCZKnHoJWV9xe1KXUJ5lx2JfcSHr/mhzS0PC/McAA==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.1.5.tgz",
      "integrity": "sha512-FjcpEKUyJygHgs1o50VYNvkt5+7Le/VEdYt0AkRpkL33MnyQfwr8l5mXwMmfmTbyMPr5vJLC+8/Gd9gXnwU1QQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.1.5.tgz",
      "integrity": "sha512-Me+PfPI2TMeOQk0gYWfLQZtTktrmzbr8cDboqX83XKc7UrgAi55gF+2dUkWdxd19n55Essp2yeca+O9N5rBxHg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.1.5.tgz",
      "integrity": "sha512-yc5WrLzXks6zCQfn9Oxr8pORKyl/pF+QjHmW/Qx3qu0oyrrNC+y2JLTU1E2rcWYAmzlnqngWXHQjy51VzW70Vw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-wasm32-wasi": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-wasm32-wasi/-/binding-wasm32-wasi-1.1.5.tgz",
      "integrity": "sha512-VbQGPX2b4r48TAMIM2cjgluIM1HYutm4pcTEJsle7iEP7sB1dFqtPLBVbdLAZCxy1txCcPxf4QFf4v8uvltPqA==",
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "1.11.1",
        "@emnapi/runtime": "1.11.1",
        "@napi-rs/wasm-runtime": "^1.1.6"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.1.5.tgz",
      "integrity": "sha512-gHv82k63z4qpV5+Q1y/12KrK0ltWBukVDI8nZcbT7Tt/ZlOIVwppazneq0F93oDxTo3IgAMEDIoQh3E2n6mVsw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.1.5.tgz",
      "integrity": "sha512-tTZuDBPw85tEN5PQi1pnEBzDy0Z49HtScLAbD5t6hyeU92A95pRWaSMw1GZZi/RwgSgUIl0xrSlXIT/9QzvYSA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz",
      "integrity": "sha512-2j9bGt5Jh8hj+vPtgzPtl72j0yRxHAyumoo6TNfAjsLB04UtpSvPbPcDcBMxz7n+9CYB0c1GxQFxYRg2jimqGw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@socket.io/component-emitter": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@socket.io/component-emitter/-/component-emitter-3.1.2.tgz",
      "integrity": "sha512-9BCxFwvbGg/RsZK9tjXd8s4UcwR0MWeFQ1XEKIQVVvAGJyINdrqKMcTRyLoK8Rse1GjzLV9cwjWV1olXRWEXVA==",
      "license": "MIT"
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.3",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.3.tgz",
      "integrity": "sha512-F3fo1MYrRJYL3zER0OUOmkutjr1Vp23m7OsSgp7nq4SP6OqX6C/56XFIPAl5bt3zaBRjmW7SGz3u/6LwFpYcOg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@types/react": {
      "version": "19.2.17",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.17.tgz",
      "integrity": "sha512-MXfmqaVPEVgkBT/aY0aGCkRWWtByiYQXo3xdQ8r5RzuFrPiRn8Gar2tQdXSUQ2GKV3bkXckek89V8wQBY2Q/Aw==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-6.0.3.tgz",
      "integrity": "sha512-vmFvco5/QuC2f9Oj+wTk0+9XeDFkHxSamwZKYc7MxYwKICfvUvlMhqKI0VuICPltGqh1neqBKDvO4kes1ya8vg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rolldown/pluginutils": "^1.0.1"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "@rolldown/plugin-babel": "^0.1.7 || ^0.2.0",
        "babel-plugin-react-compiler": "^1.0.0",
        "vite": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "@rolldown/plugin-babel": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        }
      }
    },
    "node_modules/agent-base": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-6.0.2.tgz",
      "integrity": "sha512-RZNwNclF7+MS/8bDg70amg32dyeZGZxiDuQmZxKLAlQjr3jGyLx+4Kkk58UO7D2QdgFIQCovuSuZESne6RG6XQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "4"
      },
      "engines": {
        "node": ">= 6.0.0"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/anymatch/node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q==",
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.5.2",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.2.tgz",
      "integrity": "sha512-rD5t5DwOjJdmSORcTq64j8MawTC+tbQ+HHqjR4NDumamy/ambn1UJrlKL+KdwujWxMkFjPM3pPHOEA9tl4767Q==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.4",
        "caniuse-lite": "^1.0.30001799",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/axios": {
      "version": "1.18.1",
      "resolved": "https://registry.npmjs.org/axios/-/axios-1.18.1.tgz",
      "integrity": "sha512-3nTvFlvpn9Zu/RkHUqtc7/+al4UpRW5az71ap5zccp6e8RAYEzhMTecX8Dz1wWDYrPpUoB1HAQEGEAEvUr7S9g==",
      "license": "MIT",
      "dependencies": {
        "follow-redirects": "^1.16.0",
        "form-data": "^4.0.5",
        "https-proxy-agent": "^5.0.1",
        "proxy-from-env": "^2.1.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.42",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.42.tgz",
      "integrity": "sha512-c/jurFrDLyui7o1J86yLkRu4LMsTYcBohveus7/I2Hzdn9KIP2bdJPTue/lR1KH46enoPbD77GKeSYNdyPoD3Q==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.5",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.5.tgz",
      "integrity": "sha512-Cu2E6QejHWzuDMTkuwgpABFgDfZrXLQq5V13YOACZx4mFAG4IwGTbTfHPMr4WtxlHoXSM8FIuRwYYCz5XiabaQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.10.42",
        "caniuse-lite": "^1.0.30001800",
        "electron-to-chromium": "^1.5.387",
        "node-releases": "^2.0.50",
        "update-browserslist-db": "^1.2.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001803",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001803.tgz",
      "integrity": "sha512-g/uHREV2ZpK9qMalCsWaxmA6ol+DX8GYhuf3T40RKoP+oL7vhRJh8LNt73PCjpnR6l14FzfPrB5Yux4PKm2meg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "license": "MIT",
      "dependencies": {
        "delayed-stream": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.389",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.389.tgz",
      "integrity": "sha512-cEto7aeOqBfU1D+c5py5pE+ooscKE75JifxLBdFUZsqAxRS6y7kebtxAZvICszSl05gPjYHDTjY+lXpyGvpJbg==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/engine.io-client": {
      "version": "6.6.6",
      "resolved": "https://registry.npmjs.org/engine.io-client/-/engine.io-client-6.6.6.tgz",
      "integrity": "sha512-iY6QdftLQ9pyiPoX082bpf/u1UewnOaJrtJIF9T0++QB34lZrj0uP+Q/bj8AlUsAxqhnkTV2BS8SBZSxOmoV5Q==",
      "license": "MIT",
      "dependencies": {
        "@socket.io/component-emitter": "~3.1.0",
        "debug": "~4.4.1",
        "engine.io-parser": "~5.2.1",
        "ws": "~8.21.0",
        "xmlhttprequest-ssl": "~2.1.1"
      }
    },
    "node_modules/engine.io-parser": {
      "version": "5.2.3",
      "resolved": "https://registry.npmjs.org/engine.io-parser/-/engine.io-parser-5.2.3.tgz",
      "integrity": "sha512-HqD3yTBfnBxIrbnM1DoD6Pcq8NECnh8d4As1Qgh0z5Gg3jRRIqijury0CL3ghu/edArpUYiYqQiDUQBIs4np3Q==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.2.tgz",
      "integrity": "sha512-HWcBoN6NileqtSydK2FqHbS/LoDd2pqrnQHLyJzBj4kOp/ky2MWMN694xOfkK8/SnUsW2DH7EfyVlydKCsm1Zw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fastq": {
      "version": "1.20.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.1.tgz",
      "integrity": "sha512-GGToxJ/w1x32s/D2EKND7kTil4n8OVk/9mycTc4VDza13lOvpUZTGX3mFSCtV9ksdGBVzvsyAVLM6mHFThxXxw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/follow-redirects": {
      "version": "1.16.0",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.16.0.tgz",
      "integrity": "sha512-y5rN/uOsadFT/JfYwhxRS5R7Qce+g3zG97+JrtFZlC9klX/W5hD7iiLzScI4nZqUS7DNUdhPgw4xI8W2LuXlUw==",
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/RubenVerborgh"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=4.0"
      },
      "peerDependenciesMeta": {
        "debug": {
          "optional": true
        }
      }
    },
    "node_modules/form-data": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.6.tgz",
      "integrity": "sha512-vKatAh4SlVfgbv+YtmhiRjhEMJsYpsG1Y2rMQtR+SVSbytsSD1YGzDIcrAJmdFec88u/+VoGmxnl+80gL1tRCQ==",
      "license": "MIT",
      "dependencies": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "es-set-tostringtag": "^2.1.0",
        "hasown": "^2.0.4",
        "mime-types": "^2.1.35"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/https-proxy-agent": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-5.0.1.tgz",
      "integrity": "sha512-dFcAjpTQFgoLMzC2VwU+C/CbS7uRL0lWmxDITmqm7C+7F0Odmj6s9l6alZc6AELXhrnggM2CeWSXHGOdX2YtwA==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "6",
        "debug": "4"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.2",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.2.tgz",
      "integrity": "sha512-evOr8xfXKxE6qSR0hSXL2r3sd7ALj8+7jQEUvPYcm5sgZFdJ+AYzT6yNmJenvIYQBgIGwfwz08sL8zoL7yq2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lucide-react": {
      "version": "1.23.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.23.0.tgz",
      "integrity": "sha512-38BpJcD0JhFosxHApP/BYsBetLpQFRoTRzEzstM/XCc3jsAG7wqaY1lgVwxiUe3xqYE+lNxo2PkCmYwXWrwwIw==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/micromatch/node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.15",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.15.tgz",
      "integrity": "sha512-y7Wygv/7mEOvxTuEQDB8StXdMRBWf1kR/tlhAzBRUFkB2jfcLOAxO/SHmOO2zgz1pVgK29/kyupn059/bCHdjA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.50",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.50.tgz",
      "integrity": "sha512-J6l92tKHX6w8Jy5nO1Vuc01NoIiRGi/d6qBKVxh+IQ8Cr3b6HbVNfKiF8ZpFKufTwpwxMmce2W3iQZ861ZRyTg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/oxlint": {
      "version": "1.73.0",
      "resolved": "https://registry.npmjs.org/oxlint/-/oxlint-1.73.0.tgz",
      "integrity": "sha512-u91G9TJzU6yqKWNZUYprQB07W7YvntZXaRxQ6CkoytepYhLWUXWsr1M8zUJ34VatNPuUAr3Z8GH+O2A331CluQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "oxlint": "bin/oxlint"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/Boshen"
      },
      "optionalDependencies": {
        "@oxlint/binding-android-arm-eabi": "1.73.0",
        "@oxlint/binding-android-arm64": "1.73.0",
        "@oxlint/binding-darwin-arm64": "1.73.0",
        "@oxlint/binding-darwin-x64": "1.73.0",
        "@oxlint/binding-freebsd-x64": "1.73.0",
        "@oxlint/binding-linux-arm-gnueabihf": "1.73.0",
        "@oxlint/binding-linux-arm-musleabihf": "1.73.0",
        "@oxlint/binding-linux-arm64-gnu": "1.73.0",
        "@oxlint/binding-linux-arm64-musl": "1.73.0",
        "@oxlint/binding-linux-ppc64-gnu": "1.73.0",
        "@oxlint/binding-linux-riscv64-gnu": "1.73.0",
        "@oxlint/binding-linux-riscv64-musl": "1.73.0",
        "@oxlint/binding-linux-s390x-gnu": "1.73.0",
        "@oxlint/binding-linux-x64-gnu": "1.73.0",
        "@oxlint/binding-linux-x64-musl": "1.73.0",
        "@oxlint/binding-openharmony-arm64": "1.73.0",
        "@oxlint/binding-win32-arm64-msvc": "1.73.0",
        "@oxlint/binding-win32-ia32-msvc": "1.73.0",
        "@oxlint/binding-win32-x64-msvc": "1.73.0"
      },
      "peerDependencies": {
        "oxlint-tsgolint": ">=0.24.0",
        "vite-plus": "*"
      },
      "peerDependenciesMeta": {
        "oxlint-tsgolint": {
          "optional": true
        },
        "vite-plus": {
          "optional": true
        }
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.5",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.5.tgz",
      "integrity": "sha512-RvwwcruNjI1ncT5xRakeyS9Lf8lcItv34KD+aif+VH9kduAyfYBipGh12274xtenIPZ119/R9BdTBa8gAwSh0A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.16",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.16.tgz",
      "integrity": "sha512-vuwillviilfKZsg0VGj5R/YwwcHx4SLsIOI/7K6mQkWx+l5cUHTjj5g0AasTBcyXsbfTgrwsUNmVUb5xVwyPwg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.12",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-6.0.1.tgz",
      "integrity": "sha512-oPtTM4oerL+UXmx+93ytZVN82RrlY/wPUV8IeDxFrzIjXOLF1pN+EmKPLbubvKHT2HC20xXsCAH2Z+CKV6Oz/g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.1.1"
      },
      "engines": {
        "node": ">= 18"
      },
      "peerDependencies": {
        "jiti": ">=1.21.0",
        "postcss": ">=8.0.9",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.4",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.4.tgz",
      "integrity": "sha512-bIoJLOmjCO1S9XdY/DcnR5hJxvrDir1PbGChrzXG3vw0/FOliy/fA3dmdhQ441kah4gKv+TwckGzex6wNS5cnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/proxy-from-env": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/proxy-from-env/-/proxy-from-env-2.1.0.tgz",
      "integrity": "sha512-cJ+oHTW1VAEa8cJslgmUZrc+sjRKgAKl3Zyse6+PV38hZe/V6Z14TbCuXcan9F9ghlz4QrFr2c92TNF82UkYHA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "19.2.7",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.7.tgz",
      "integrity": "sha512-HNe9WslTbXmFK8o8cmwgAeJFSBvt1bPdHCVKtaaV+WlAN36mpT4hcRpwbf3fY56ar2oIXzsBpOAiIRHAdY0OlQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.7",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.7.tgz",
      "integrity": "sha512-t0BRVXvbiE/o20Hfw669rLbMCDWtYZLvmJigy2f0MxsXF+71pxhR3xOkspmsO8h3ZlNzyibAmtCa3l4lYKk6gQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.7"
      }
    },
    "node_modules/react-router": {
      "version": "7.18.1",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.18.1.tgz",
      "integrity": "sha512-GDLgg3i3uM0aeJO3Fm+TCS+sDQ7gu12T6x0qdTEzcwqEfleci7JwugVNIF3U//0FWKnJT7ptG+20B2jfDqnZAg==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.18.1",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.18.1.tgz",
      "integrity": "sha512-KaZh+X/6UtEp28x51AUYZDMg9NGoz2ja3dNHa+ta/tk40vCzKhQ/RypCWBMLbmDr6//E24Vv5uPsrqXFozdkAg==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.18.1"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "pify": "^2.3.0"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/readdirp/node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rolldown": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.1.5.tgz",
      "integrity": "sha512-t9z29cJjXf/vxQ8dyhCSpt6H6aSwHTk8cT5I3iy6SMXuFpk5mB6PL6XfC8PCwrPTx93udwKUm9HRteAlTGBLiA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@oxc-project/types": "=0.139.0",
        "@rolldown/pluginutils": "^1.0.0"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm64": "1.1.5",
        "@rolldown/binding-darwin-arm64": "1.1.5",
        "@rolldown/binding-darwin-x64": "1.1.5",
        "@rolldown/binding-freebsd-x64": "1.1.5",
        "@rolldown/binding-linux-arm-gnueabihf": "1.1.5",
        "@rolldown/binding-linux-arm64-gnu": "1.1.5",
        "@rolldown/binding-linux-arm64-musl": "1.1.5",
        "@rolldown/binding-linux-ppc64-gnu": "1.1.5",
        "@rolldown/binding-linux-s390x-gnu": "1.1.5",
        "@rolldown/binding-linux-x64-gnu": "1.1.5",
        "@rolldown/binding-linux-x64-musl": "1.1.5",
        "@rolldown/binding-openharmony-arm64": "1.1.5",
        "@rolldown/binding-wasm32-wasi": "1.1.5",
        "@rolldown/binding-win32-arm64-msvc": "1.1.5",
        "@rolldown/binding-win32-x64-msvc": "1.1.5"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.2.tgz",
      "integrity": "sha512-oeM1lpU/UvhTxw+g3cIfxXHyJRc/uidd3yK1P242gzHds0udQBYzs3y8j4gCCW+ZJ7ad0yctld8RYO+bdurlvw==",
      "license": "MIT"
    },
    "node_modules/socket.io-client": {
      "version": "4.8.3",
      "resolved": "https://registry.npmjs.org/socket.io-client/-/socket.io-client-4.8.3.tgz",
      "integrity": "sha512-uP0bpjWrjQmUt5DTHq9RuoCBdFJF10cdX9X+a368j/Ft0wmaVgxlrjvK3kjvgCODOMMOz9lcaRzxmso0bTWZ/g==",
      "license": "MIT",
      "dependencies": {
        "@socket.io/component-emitter": "~3.1.0",
        "debug": "~4.4.1",
        "engine.io-client": "~6.6.1",
        "socket.io-parser": "~4.2.4"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/socket.io-parser": {
      "version": "4.2.6",
      "resolved": "https://registry.npmjs.org/socket.io-parser/-/socket.io-parser-4.2.6.tgz",
      "integrity": "sha512-asJqbVBDsBCJx0pTqw3WfesSY0iRX+2xzWEWzrpcH7L6fLzrhyF8WPI8UaeM4YCuDfpwA/cgsdugMsmtz8EJeg==",
      "license": "MIT",
      "dependencies": {
        "@socket.io/component-emitter": "~3.1.0",
        "debug": "~4.4.1"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.1",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz",
      "integrity": "sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "tinyglobby": "^0.2.11",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.6.0.tgz",
      "integrity": "sha512-uxL7qAVQriqRQPAyK3pj66VqskWqoZ37PW94jwOTwNfq/z9oyu1V+eqrZqtR2+fCiXdYOZe/Modt8GtvqNzu+w==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.19",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.19.tgz",
      "integrity": "sha512-3ofp+LL8E+pK/JuPLPggVAIaEuhvIz4qNcf3nA1Xn2o/7fb7s/TYpHhwGDv1ZU3PkBluUVaF8PyCHcm48cKLWQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.7",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2 || ^5.0 || ^6.0",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "dev": true,
      "license": "0BSD",
      "optional": true
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "8.1.3",
      "resolved": "https://registry.npmjs.org/vite/-/vite-8.1.3.tgz",
      "integrity": "sha512-Ds+gBRbj0lwRO2Y5hwnUBdxSwlAve9LeRyU4sNnAr0ewW0gWF0n5bgXgUzbgZ49MV9BVUAQUFYVcDUcilUExMA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "lightningcss": "^1.32.0",
        "picomatch": "^4.0.4",
        "postcss": "^8.5.16",
        "rolldown": "~1.1.3",
        "tinyglobby": "^0.2.17"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.3.0",
        "esbuild": "^0.27.0 || ^0.28.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/wavesurfer.js": {
      "version": "7.12.10",
      "resolved": "https://registry.npmjs.org/wavesurfer.js/-/wavesurfer.js-7.12.10.tgz",
      "integrity": "sha512-M3AC5biFmvfy7Oxe8FN6I88H0z1c8Vuz81N6Oq2CY4kOumNDb6U1/0qg4pomjP619vJqdWADlgUcpOKvfGifng==",
      "license": "BSD-3-Clause"
    },
    "node_modules/ws": {
      "version": "8.21.0",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.21.0.tgz",
      "integrity": "sha512-Vsp28b7DRcimFQvrqu2Wek3z1iYxDCWqHYB8Qsnk/S4RfaCQzPGPyBNuVjJV3cd6UiKtUtp6sNM77gWvzcCH+g==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/xmlhttprequest-ssl": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/xmlhttprequest-ssl/-/xmlhttprequest-ssl-2.1.2.tgz",
      "integrity": "sha512-TEU+nJVUUnA4CYJFLvK5X9AOeH4KvDvhIfm0vV1GaQRtchnG0hgK5p8hw/xjv8cunWYCsiPCSDzObPyhEwq3KQ==",
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/zustand": {
      "version": "5.0.14",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.14.tgz",
      "integrity": "sha512-/8tAspM5LMPr28b3fwLYrtdj77ECpfZviaP75CMTnwO8ISyaE4GDIG/9rDDYq/cH9D2Xw2A2RXglLInmVBQB/g==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
    }
  }
}

```

---

## الملف: `frontend\package.json`

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.18.1",
    "clsx": "^2.1.1",
    "lucide-react": "^1.23.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-router-dom": "^7.18.1",
    "socket.io-client": "^4.8.3",
    "tailwind-merge": "^3.6.0",
    "wavesurfer.js": "^7.12.10",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "autoprefixer": "^10.5.2",
    "oxlint": "^1.71.0",
    "postcss": "^8.5.16",
    "tailwindcss": "^3.4.19",
    "vite": "^8.1.1"
  }
}

```

---

## الملف: `frontend\postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

---

## الملف: `frontend\README.md`

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

```

---

## الملف: `frontend\tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--bg-primary)',
        bgSecondary: 'var(--bg-secondary)',
        bgTertiary: 'var(--bg-tertiary)',
        accentPrimary: 'var(--accent-primary)',
        accentSecondary: 'var(--accent-secondary)',
        warning: 'var(--accent-warning)',
        danger: 'var(--accent-danger)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        borderColor: 'var(--border-color)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
```

---

## الملف: `frontend\vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

---

## الملف: `frontend\src\App.css`

```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}

```

---

## الملف: `frontend\src\App.jsx`

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { BottomBar } from './components/layout/BottomBar';
import { EffectWindow } from './components/audio-realm/effects-rack/EffectWindow';

// Main Pages
import { Dashboard } from './components/dashboard/Dashboard';
import { SharedLibrary } from './components/shared-library/SharedLibrary';

// المحطة الفضائية الصوتية التي تجمع كل شيء (AI Rack + Timeline + Effects Rack)
import { AudioWorkspace } from './components/audio-realm/AudioWorkspace';

// Video Realm Components
import { EmotionVideoGenerator } from './components/video-realm/emotion-gen/EmotionVideoGenerator';
import { LipSyncPanel } from './components/video-realm/lip-sync/LipSyncPanel';

function App() {
  return (
    <Router>
      <div className="w-screen h-screen bg-bgPrimary flex flex-col overflow-hidden text-textPrimary font-sans">
        
        {/* Main Workspace (Sidebar + Dynamic Content) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* 1. Static Sidebar (Always Visible) */}
          <Sidebar />

          {/* 2. Dynamic Routing Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-bgPrimary relative">
            <Routes>
              
              {/* Home / Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Audio Realm - نمرر المحطة الصوتية الشاملة مباشرة هنا */}
              <Route path="/audio" element={<AudioWorkspace />} />

              {/* Video Realm */}
              <Route path="/video" element={
                <div className="flex w-full h-full overflow-hidden">
                  <EmotionVideoGenerator />
                </div>
              } />

              {/* Shared Vault / Library */}
              <Route path="/library" element={
                <div className="flex w-full h-full overflow-hidden justify-center p-6">
                  <SharedLibrary />
                  <div className="flex-1 bg-bgSecondary border border-borderColor rounded-r-lg p-8 flex items-center justify-center">
                    <span className="text-textSecondary">Select an asset from the vault to preview</span>
                  </div>
                </div>
              } />

            </Routes>
          </div>
        </div>

        {/* 3. Bottom Transport Bar (Always Visible) */}
        <BottomBar />
        
        {/* 4. Global Modals (Popups) */}
        <EffectWindow />
        
      </div>
    </Router>
  );
}

export default App;
```

---

## الملف: `frontend\src\index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-primary: #0D0D0D;
    --bg-secondary: #1A1A1A;
    --bg-tertiary: #2A2A2A;
    --accent-primary: #00FF88;
    --accent-secondary: #00D4FF;
    --accent-warning: #FFB800;
    --accent-danger: #FF4444;
    --text-primary: #FFFFFF;
    --text-secondary: #A0A0A0;
    --border-color: #333333;
    
    /* Spectrogram Mapping */
    --waveform-color: #00FF88;
    --spectrogram-low: #1a0000;
    --spectrogram-mid: #ff4400;
    --spectrogram-high: #ffff00;
  }

  body {
    @apply bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased font-sans;
    overflow-x: hidden;
  }
}
```

---

## الملف: `frontend\src\main.jsx`

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

---

## الملف: `frontend\src\components\audio-realm\AudioWorkspace.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

import { AIAudioRack } from './ai-panel/AI_Audio_Rack'; 
import { EffectsRack } from './effects-rack/EffectsRack';
import { AudioRealm } from '../dashboard/AudioRealm'; 
import { Scissors, ZoomIn, Maximize, Download, Upload, Save, Undo, Redo, FileAudio, Settings } from 'lucide-react';

const socket = io('http://localhost:5000');

export const AudioWorkspace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalTrackUrl, serverFilePath, fileName } = location.state || {};

  const [separatedTracks, setSeparatedTracks] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  
  // 🌟 إضافة لمعرفة الأداة النشطة حالياً (التنظيف أم الفصل)
  const [activeJobType, setActiveJobType] = useState(null);

  useEffect(() => {
    socket.on('jobCompleted', (data) => {
      console.log('✅ المهمة انتهت، تم استلام البيانات:', data);
      const tracks = data.tracks || (data.result && data.result.tracks);
      if (tracks) {
        setIsProcessing(false);
        setSeparatedTracks(tracks);
        setProgressMessage('');
        setActiveJobType(null);
      }
    });

    socket.on('jobProgress', (data) => {
      if (data.message) setProgressMessage(data.message);
    });

    socket.on('jobFailed', (error) => {
      alert('❌ حدث خطأ أثناء المعالجة: ' + (error.message || error));
      setIsProcessing(false);
      setProgressMessage('');
      setActiveJobType(null);
    });

    return () => {
      socket.off('jobCompleted');
      socket.off('jobProgress');
      socket.off('jobFailed');
    };
  }, []);

  const handleStemSeparation = async () => {
    if (!serverFilePath) return alert("الملف الأصلي غير متوفر على الخادم.");
    setIsProcessing(true);
    setActiveJobType('stem');
    setProgressMessage('جاري تهيئة كرت الشاشة (RTX)...');

    try {
      await axios.post('http://localhost:5000/api/ai/jobs', {
        type: 'stem-separation',
        title: fileName || 'Stem Separation',
        parameters: { input_file: serverFilePath },
        priority: 'high'
      });
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.");
      setIsProcessing(false);
      setActiveJobType(null);
    }
  };

  // 🌟 الدالة الجديدة للتنظيف العميق
  const handleDeepClean = async () => {
    if (!serverFilePath) return alert("الملف الأصلي غير متوفر على الخادم.");
    setIsProcessing(true);
    setActiveJobType('denoise');
    setProgressMessage('جاري تهيئة محرك التنظيف (DeepFilterNet)...');

    try {
      await axios.post('http://localhost:5000/api/ai/jobs', {
        type: 'denoise',
        title: fileName || 'Deep Clean',
        parameters: { input_file: serverFilePath },
        priority: 'high'
      });
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.");
      setIsProcessing(false);
      setActiveJobType(null);
    }
  };

  // دالة ذكية لتحميل الملفات
  const handleDownload = (url, name) => {
    if (!url) return alert("الملف غير جاهز بعد!");
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!originalTrackUrl) return <Navigate to="/" replace />;

  return (
    // الحاوية الأم أصبحت عمودية (flex-col) لتستوعب الشريط العلوي أولاً
    <div className="flex flex-col w-full h-full overflow-hidden bg-bgPrimary text-textPrimary select-none">
      
      {/* 🌟 شريط القوائم العلوي (DAW Menu Bar) 🌟 */}
      <div className="h-10 bg-[#0a0a0a] border-b border-borderColor flex items-center px-4 text-sm z-50">
        <div className="flex items-center gap-1 font-medium">
          
          {/* قائمة File */}
          <div className="relative group">
            <button className="px-3 py-1.5 hover:bg-bgTertiary rounded text-textSecondary hover:text-white transition-colors">File</button>
            <div className="absolute left-0 top-full mt-0 w-56 bg-bgSecondary border border-borderColor rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-1">
              <button onClick={() => navigate('/')} className="w-full text-left px-4 py-2 hover:bg-accentPrimary hover:text-bgPrimary flex items-center gap-3">
                <Upload className="w-4 h-4" /> Import New Audio
              </button>
              <div className="h-px bg-borderColor my-1"></div>
              <button onClick={() => handleDownload(originalTrackUrl, `Original_${fileName}`)} className="w-full text-left px-4 py-2 hover:bg-accentPrimary hover:text-bgPrimary flex items-center gap-3">
                <FileAudio className="w-4 h-4" /> Download Original
              </button>
              
              {/* تفعيل زر تحميل النتيجة فقط إذا كان هناك مسارات مفصولة */}
              <button 
                onClick={() => separatedTracks.forEach(t => handleDownload(t.src, t.name))}
                disabled={separatedTracks.length === 0}
                className={`w-full text-left px-4 py-2 flex items-center gap-3 ${separatedTracks.length > 0 ? 'hover:bg-accentPrimary hover:text-bgPrimary' : 'opacity-50 cursor-not-allowed'}`}
              >
                <Download className="w-4 h-4" /> Export All Stems
              </button>
              
              <div className="h-px bg-borderColor my-1"></div>
              <button className="w-full text-left px-4 py-2 hover:bg-accentPrimary hover:text-bgPrimary flex items-center gap-3">
                <Save className="w-4 h-4" /> Save Project
              </button>
            </div>
          </div>

          {/* قائمة Edit */}
          <div className="relative group">
            <button className="px-3 py-1.5 hover:bg-bgTertiary rounded text-textSecondary hover:text-white transition-colors">Edit</button>
            <div className="absolute left-0 top-full mt-0 w-48 bg-bgSecondary border border-borderColor rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-1">
              <button className="w-full text-left px-4 py-2 hover:bg-accentPrimary hover:text-bgPrimary flex items-center gap-3">
                <Undo className="w-4 h-4" /> Undo
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-accentPrimary hover:text-bgPrimary flex items-center gap-3">
                <Redo className="w-4 h-4" /> Redo
              </button>
            </div>
          </div>

          {/* قائمة View */}
          <div className="relative group">
            <button className="px-3 py-1.5 hover:bg-bgTertiary rounded text-textSecondary hover:text-white transition-colors">View</button>
          </div>

          {/* قائمة Help */}
          <div className="relative group">
            <button className="px-3 py-1.5 hover:bg-bgTertiary rounded text-textSecondary hover:text-white transition-colors">Help</button>
          </div>

        </div>

        {/* معلومات المشروع في الجهة اليمنى */}
        <div className="ml-auto flex items-center gap-4 text-xs text-textSecondary">
          <span className="flex items-center gap-2">
            <Settings className="w-3.5 h-3.5" /> 48000 Hz / 32-bit float
          </span>
          <div className="w-px h-4 bg-borderColor"></div>
          <span className="text-white bg-bgTertiary px-3 py-1 rounded-full border border-borderColor flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accentPrimary animate-pulse"></span>
            {fileName || 'Untitled Session'}
          </span>
        </div>
      </div>

      {/* 🌟 منطقة العمل (اللوحات الثلاث) 🌟 */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 1. الجناح الأيسر: لوحة الذكاء الاصطناعي */}
        <AIAudioRack 
          onStemSeparation={handleStemSeparation}
          onDeepClean={handleDeepClean} // تمرير الدالة الجديدة
          activeJobType={activeJobType} // تمرير نوع المهمة
          isProcessing={isProcessing}
          progressMessage={progressMessage}
        />

        {/* 2. قلب المحطة: المخطط الزمني */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="h-12 border-b border-borderColor bg-bgSecondary flex items-center justify-between px-4 z-10 shadow-sm">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-sm tracking-wide text-textSecondary uppercase">Multitrack Editor</h3>
              <div className="h-4 w-px bg-borderColor"></div>
              <button className="text-textSecondary hover:text-white p-1 rounded transition-colors"><Scissors className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-textSecondary hover:text-white"><ZoomIn className="w-4 h-4" /></button>
              <div className="w-24 h-1.5 bg-bgTertiary rounded-full overflow-hidden"><div className="w-1/2 h-full bg-accentPrimary"></div></div>
              <button className="text-textSecondary hover:text-white"><Maximize className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 pb-20">
            <AudioRealm tracks={separatedTracks} originalTrackUrl={originalTrackUrl} />
          </div>
        </div>

        {/* 3. الجناح الأيمن: رف المؤثرات */}
        <EffectsRack />

      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\audio-realm\ai-panel\AIProgressModal.jsx`

```javascript
import React from 'react';
import { Loader2, Zap, XCircle } from 'lucide-react';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { useAIJobStore } from '../../../store/useAIJobStore';
import { cn } from '../../../utils/classNames';

export const AIProgressModal = () => {
  const { activeJob, isProcessing, progress, currentStage, eta, cancelJob } = useAIJobStore();

  if (!isProcessing || !activeJob) return null;

  return (
    <Modal
      isOpen={isProcessing}
      onClose={() => {}} // Disabled closing by clicking outside during processing
      title={
        <div className="flex items-center gap-2 text-accentSecondary">
          <Zap className="w-5 h-5 fill-current" />
          <span>AI Processing: {activeJob.title}</span>
        </div>
      }
      width="max-w-md"
    >
      <div className="flex flex-col gap-6 py-4">
        
        {/* Progress Info */}
        <div className="flex justify-between items-end text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-textPrimary font-medium">{currentStage}</span>
            <span className="text-textSecondary text-xs">ETA: {eta}</span>
          </div>
          <span className="text-xl font-mono font-bold text-accentSecondary">
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-bgTertiary rounded-full overflow-hidden border border-borderColor">
          <div 
            className="h-full bg-accentSecondary transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Animated gleam effect */}
            <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </div>
          </div>
        </div>

        {/* Cancel Action */}
        <div className="flex justify-center mt-2">
          <Button 
            variant="ghost" 
            onClick={cancelJob} 
            icon={XCircle}
            className="text-textSecondary hover:text-danger hover:bg-danger/10"
          >
            Cancel Process
          </Button>
        </div>

        {/* Global style for shimmer animation if not defined in tailwind config */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}} />
      </div>
    </Modal>
  );
};
```

---

## الملف: `frontend\src\components\audio-realm\ai-panel\AI_Audio_Rack.jsx`

```javascript
import React, { useState } from 'react';
import { Bot, Sparkles, Scissors, Mic2, Settings, FileEdit, Music, Target, Radio } from 'lucide-react';
import { Panel } from '../../common/Panel';
import { Button } from '../../common/Button';
import { Slider } from '../../common/Slider';
import { useAIJobStore } from '../../../store/useAIJobStore'; 
import { cn } from '../../../utils/classNames';

export const AIAudioRack = ({ onStemSeparation, onDeepClean, activeJobType, isProcessing: isRealProcessing, progressMessage }) => {
  const { startJob, isProcessing: isMockProcessing } = useAIJobStore();
  const [cleanStrength, setCleanStrength] = useState(100); // قوة التحسين الافتراضية

  const handleStartJob = (type, title) => {
    startJob({ id: `job_${Date.now()}`, type, title });
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        useAIJobStore.getState().completeJob();
        setTimeout(() => useAIJobStore.getState().cancelJob(), 2000);
      } else {
        useAIJobStore.getState().updateProgress(
          currentProgress, 
          currentProgress < 50 ? 'Analyzing audio features...' : 'Applying neural network models...', 
          `${Math.floor(100 - currentProgress)}s`
        );
      }
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-bgPrimary border-r border-borderColor w-80 shadow-lg z-10">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-borderColor bg-bgSecondary">
        <div className="flex items-center gap-2 text-textPrimary font-semibold">
          <Bot className="w-5 h-5 text-accentPrimary" />
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-accentPrimary to-emerald-400">
            AI Studio Panel
          </h2>
        </div>
        <button className="text-textSecondary hover:text-textPrimary transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        
        {/* 🎙️ 1. Studio Voice Enhancer (النموذج الأسطوري) */}
        <Panel title={<div className="flex items-center gap-2"><Radio className="w-4 h-4 text-accentPrimary" /> Studio Voice Enhancer</div>} defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary leading-relaxed">
              AI generously recreates missing frequencies, removes background noise, and adds high-end studio mic warmth to vocals.
            </p>
            <Slider label="Enhancement Blend" value={cleanStrength} min={0} max={100} unit="%" onChange={setCleanStrength} />
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Noise Gate</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> De-Reverb</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> AI Synth</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Warmth EQ</label>
            </div>
            
            <Button 
              className="w-full relative overflow-hidden bg-accentPrimary/10 text-accentPrimary hover:bg-accentPrimary/20 border border-accentPrimary/30" 
              variant={isRealProcessing && activeJobType === 'denoise' ? "secondary" : "primary"} 
              onClick={onDeepClean} 
              disabled={isRealProcessing || isMockProcessing}
            >
              {isRealProcessing && activeJobType === 'denoise' ? (
                 <span className="animate-pulse text-[11px] text-accentPrimary block px-2">{progressMessage || 'Processing...'}</span>
              ) : (
                'Enhance Voice'
              )}
            </Button>
          </div>
        </Panel>

        {/* ✂️ 2. Stem Separation */}
        <Panel title={<div className="flex items-center gap-2"><Scissors className="w-4 h-4 text-accentPrimary" /> Stem Separation</div>} defaultOpen={true}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Separate mixed audio into distinct studio tracks.</p>
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Vocals</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Drums</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Bass</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Other</label>
            </div>
            
            <Button 
              className="w-full relative overflow-hidden" 
              variant={isRealProcessing && activeJobType === 'stem' ? "secondary" : "primary"} 
              onClick={onStemSeparation} 
              disabled={isRealProcessing || isMockProcessing}
            >
              {isRealProcessing && activeJobType === 'stem' ? (
                 <span className="animate-pulse text-[11px] text-accentPrimary block px-2">{progressMessage || 'Processing...'}</span>
              ) : (
                'Split Stems'
              )}
            </Button>
          </div>
        </Panel>

        {/* 3. Text-Audio Editor */}
        <Panel title={<div className="flex items-center gap-2"><FileEdit className="w-4 h-4 text-accentPrimary" /> Text-Audio Editor</div>} defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Edit audio by editing the transcript text.</p>
            <Button className="w-full" variant="secondary" onClick={() => handleStartJob('text-edit', 'Text-Audio Alignment')} disabled={isMockProcessing || isRealProcessing}>
              Transcribe & Edit
            </Button>
          </div>
        </Panel>

        {/* 4. Voice Cloning */}
        <Panel title={<div className="flex items-center gap-2"><Mic2 className="w-4 h-4 text-accentPrimary" /> Voice Cloning</div>} defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Convert voice to character or custom model.</p>
            <select className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentPrimary w-full">
              <option>Anime: Levi</option>
              <option>Anime: Goku</option>
              <option>Celebrity: Morgan F.</option>
            </select>
            <Button className="w-full" variant="secondary" onClick={() => handleStartJob('voice-clone', 'Voice Cloning')} disabled={isMockProcessing || isRealProcessing}>
              Clone Voice
            </Button>
          </div>
        </Panel>

        {/* 5. Music & SFX Gen */}
        <Panel title={<div className="flex items-center gap-2"><Music className="w-4 h-4 text-accentPrimary" /> Music & SFX Gen</div>} defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Generate audio from text descriptions.</p>
            <textarea placeholder="e.g. Epic orchestral battle music..." className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentPrimary w-full h-20 resize-none"></textarea>
            <Button className="w-full" variant="secondary" onClick={() => handleStartJob('music-gen', 'Audio Generation')} disabled={isMockProcessing || isRealProcessing}>
              Generate
            </Button>
          </div>
        </Panel>

        {/* 6. Auto Mastering */}
        <Panel title={<div className="flex items-center gap-2"><Target className="w-4 h-4 text-accentPrimary" /> Auto-Mastering</div>} defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Professional final polish for loudness and EQ.</p>
            <select className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentPrimary w-full">
              <option>Streaming (-14 LUFS)</option>
              <option>Broadcast (-23 LUFS)</option>
              <option>Podcast (-16 LUFS)</option>
            </select>
            <Button className="w-full" variant="secondary" onClick={() => handleStartJob('mastering', 'Auto Mastering')} disabled={isMockProcessing || isRealProcessing}>
              Master Track
            </Button>
          </div>
        </Panel>

      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\audio-realm\effects-rack\EffectSlot.jsx`

```javascript
import React from 'react';
import { Settings2, Trash2, Eye, EyeOff, Lock, Unlock, Sparkles } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { useEffectsStore } from '../../../store/useEffectsStore';

export const EffectSlot = ({ effect, trackId }) => {
  const { toggleBypass, toggleLock, removeEffect, openEffectEditor } = useEffectsStore();

  return (
    <div className={cn(
      "flex items-center justify-between p-2 mb-1 rounded bg-bgPrimary border transition-all group hover:border-[#444]",
      effect.bypass ? "border-transparent opacity-60" : "border-borderColor",
      effect.isAi && !effect.bypass ? "border-accentSecondary/30 shadow-[0_0_8px_rgba(0,212,255,0.1)]" : ""
    )}>
      
      {/* Effect Name & AI Indicator */}
      <div className="flex items-center gap-2 overflow-hidden">
        {effect.isAi && (
          <Sparkles className="w-3.5 h-3.5 text-accentSecondary animate-pulse" />
        )}
        <span className={cn(
          "text-sm truncate select-none",
          effect.bypass ? "text-textSecondary line-through" : "text-textPrimary"
        )}>
          {effect.name}
        </span>
      </div>

      {/* Controls - visible on hover or if active */}
      <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => openEffectEditor(effect)}
          className="p-1 hover:bg-bgTertiary rounded text-textSecondary hover:text-accentPrimary transition-colors"
          title="Edit Effect"
        >
          <Settings2 className="w-3.5 h-3.5" />
        </button>
        
        <button 
          onClick={() => toggleBypass(trackId, effect.id)}
          className="p-1 hover:bg-bgTertiary rounded text-textSecondary hover:text-white transition-colors"
          title={effect.bypass ? "Enable Effect" : "Bypass Effect"}
        >
          {effect.bypass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
        
        <button 
          onClick={() => toggleLock(trackId, effect.id)}
          className="p-1 hover:bg-bgTertiary rounded text-textSecondary hover:text-warning transition-colors"
          title={effect.locked ? "Unlock Parameters" : "Lock Parameters"}
        >
          {effect.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>
        
        <button 
          onClick={() => removeEffect(trackId, effect.id)}
          className="p-1 hover:bg-danger/20 rounded text-textSecondary hover:text-danger transition-colors"
          title="Remove Effect"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\audio-realm\effects-rack\EffectsRack.jsx`

```javascript
import React from 'react';
import { Sliders, Plus } from 'lucide-react';
import { Panel } from '../../common/Panel';
// تأكد من وجود EffectSlot في مشروعك أو قم بإنشائه
import { EffectSlot } from './EffectSlot'; 
import { useEffectsStore } from '../../../store/useEffectsStore';

const EFFECT_CATEGORIES = [
  { id: 'amplitude_compression', name: '1. Amplitude and Compression' },
  { id: 'delay_echo', name: '2. Delay and Echo' },
  { id: 'diagnostics', name: '3. Diagnostics' },
  { id: 'filter_eq', name: '4. Filter and EQ' },
  { id: 'modulation', name: '5. Modulation' },
  { id: 'noise_reduction', name: '6. Noise Reduction / Restoration' },
  { id: 'reverb', name: '7. Reverb' },
  { id: 'special', name: '8. Special' },
  { id: 'stereo_imagery', name: '9. Stereo Imagery' },
  { id: 'time_pitch', name: '10. Time and Pitch' },
  { id: 'vst', name: '11. VST / Audio Plug-In Manager' },
];

export const EffectsRack = () => {
  const { activeTrackId, trackEffects } = useEffectsStore();
  
  const activeEffects = trackEffects[activeTrackId] || [];

  return (
    // اللوحة على اليمين (border-l)
    <div className="flex flex-col h-full bg-bgPrimary border-l border-borderColor w-80 shadow-lg z-10">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-borderColor bg-bgSecondary">
        <div className="flex items-center gap-2 text-textPrimary font-semibold">
          <Sliders className="w-5 h-5 text-accentPrimary" />
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-accentPrimary to-emerald-400">
            Effects Rack
          </h2>
        </div>
        <div className="text-[10px] text-textSecondary font-mono bg-bgTertiary px-2 py-1 rounded border border-borderColor">
          {activeTrackId ? activeTrackId.replace('_', ' ').toUpperCase() : 'MASTER'}
        </div>
      </div>

      {/* Scrollable Categories Area */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {EFFECT_CATEGORIES.map((category) => {
          const categoryEffects = activeEffects.filter(e => e.category === category.id);
          
          return (
            <Panel 
              key={category.id} 
              title={category.name} 
              defaultOpen={categoryEffects.length > 0} 
              actionButton={
                <button 
                  className="p-1.5 hover:bg-bgPrimary rounded text-textSecondary hover:text-accentPrimary transition-all duration-200"
                  title={`Add effect to ${category.name}`}
                  onClick={(e) => { e.stopPropagation(); console.log('Open effect picker for', category.id); }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              }
            >
              {categoryEffects.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {categoryEffects.map(effect => (
                    <EffectSlot key={effect.id} effect={effect} trackId={activeTrackId} />
                  ))}
                </div>
              ) : (
                <div className="text-xs text-textSecondary italic text-center py-3 opacity-50 bg-bgPrimary/30 rounded-lg">
                  (Empty)
                </div>
              )}
            </Panel>
          );
        })}
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\audio-realm\effects-rack\EffectWindow.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { Save, Trash2, Star, Play, Pause, SkipBack, SkipForward, Repeat, Activity, Check, X } from 'lucide-react';
import { Modal } from '../../common/Modal';
import { Slider } from '../../common/Slider';
import { Button } from '../../common/Button';
import { useEffectsStore } from '../../../store/useEffectsStore';
import { cn } from '../../../utils/classNames';

export const EffectWindow = () => {
  const { editingEffect, closeEffectEditor, activeTrackId } = useEffectsStore();
  
  // Local state to hold temporary parameter changes before applying
  const [localParams, setLocalParams] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  // Sync local state when a new effect is opened
  useEffect(() => {
    if (editingEffect) {
      // In a real app, editingEffect.parameters would come from the store
      // Here we mock default Compressor parameters if none exist
      setLocalParams(editingEffect.parameters || {
        threshold: -20,
        ratio: 3,
        attack: 10,
        release: 100,
        makeupGain: 0,
        dry: 100,
        wet: 35
      });
    }
  }, [editingEffect]);

  if (!editingEffect) return null;

  const handleParamChange = (key, value) => {
    setLocalParams(prev => ({ ...prev, [key]: value }));
    // In a real Web Audio API setup, you might dispatch this change immediately 
    // to hear it in real-time during playback.
  };

  const handleApply = () => {
    // Logic to save localParams back to the global store for this specific effect
    console.log("Applying params to", editingEffect.name, localParams);
    closeEffectEditor();
  };

  return (
    <Modal
      isOpen={!!editingEffect}
      onClose={closeEffectEditor}
      title={
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-accentPrimary" />
          <span>Effect - {editingEffect.name}</span>
        </div>
      }
      width="max-w-3xl"
      footer={
        <div className="flex items-center justify-between w-full text-xs text-textSecondary">
          <div className="flex gap-4">
            <span>In: Stereo</span>
            <span>Out: Stereo</span>
            <span>Latency: 0.0 ms</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={closeEffectEditor} icon={X}>Cancel</Button>
            <Button variant="primary" onClick={handleApply} icon={Check}>Apply</Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        
        {/* Presets Bar */}
        <div className="flex items-center justify-between p-3 rounded-md bg-bgTertiary border border-borderColor">
          <div className="flex items-center gap-3">
            <span className="text-sm text-textSecondary">Presets:</span>
            <select className="bg-bgSecondary border border-borderColor text-textPrimary text-sm rounded px-3 py-1.5 outline-none focus:border-accentPrimary">
              <option>(Default)</option>
              <option>Vocal Compressor</option>
              <option>Punchy Drums</option>
              <option>Mastering Bus</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" icon={Save}>Save</Button>
            <Button variant="ghost" size="sm" icon={Trash2}>Delete</Button>
            <Button variant="ghost" size="sm" icon={Star}>Favorite</Button>
          </div>
        </div>

        {/* Characteristics (Dynamic based on Effect Type) */}
        {/* Example: Compressor Parameters */}
        <div className="border border-borderColor rounded-md overflow-hidden">
          <div className="bg-bgTertiary px-4 py-2 border-b border-borderColor text-sm font-medium text-center text-textSecondary tracking-wider">
            CHARACTERISTICS
          </div>
          <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-6">
            <Slider 
              label="Threshold" 
              value={localParams.threshold || -20} 
              min={-60} max={0} unit="dB" step={0.1}
              onChange={(val) => handleParamChange('threshold', val)}
            />
            <Slider 
              label="Ratio" 
              value={localParams.ratio || 3} 
              min={1} max={20} unit=":1" step={0.1}
              onChange={(val) => handleParamChange('ratio', val)}
            />
            <Slider 
              label="Attack" 
              value={localParams.attack || 10} 
              min={0.1} max={500} unit="ms" step={1}
              onChange={(val) => handleParamChange('attack', val)}
            />
            <Slider 
              label="Release" 
              value={localParams.release || 100} 
              min={10} max={3000} unit="ms" step={10}
              onChange={(val) => handleParamChange('release', val)}
            />
            <Slider 
              label="Makeup Gain" 
              value={localParams.makeupGain || 0} 
              min={0} max={30} unit="dB" step={0.5}
              className="col-span-2 w-1/2 pr-4"
              onChange={(val) => handleParamChange('makeupGain', val)}
            />
          </div>
        </div>

        {/* Output Level */}
        <div className="border border-borderColor rounded-md overflow-hidden">
          <div className="bg-bgTertiary px-4 py-2 border-b border-borderColor text-sm font-medium text-center text-textSecondary tracking-wider">
            OUTPUT LEVEL
          </div>
          <div className="p-5 flex items-center gap-8">
            <Slider 
              label="Dry" 
              value={localParams.dry || 100} 
              min={0} max={100} unit="%" 
              onChange={(val) => handleParamChange('dry', val)}
            />
            <Slider 
              label="Wet" 
              value={localParams.wet || 35} 
              min={0} max={100} unit="%" 
              onChange={(val) => handleParamChange('wet', val)}
            />
          </div>
          <div className="px-5 pb-4">
            <label className="flex items-center gap-2 text-sm text-textSecondary cursor-pointer w-fit">
              <input type="checkbox" className="rounded border-borderColor bg-bgTertiary text-accentPrimary focus:ring-accentPrimary" defaultChecked />
              Sum Inputs
            </label>
          </div>
        </div>

        {/* Transport & Preview */}
        <div className="flex items-center justify-between p-3 rounded-md bg-bgTertiary border border-borderColor">
          <Button 
            variant={isPlaying ? "primary" : "secondary"} 
            size="sm" 
            icon={isPlaying ? Pause : Play}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "Stop Preview" : "Preview"}
          </Button>
          
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-textSecondary hover:text-textPrimary hover:bg-bgSecondary rounded transition-colors"><SkipBack className="w-4 h-4" /></button>
            <button 
              className="p-1.5 text-textSecondary hover:text-textPrimary hover:bg-bgSecondary rounded transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button className="p-1.5 text-textSecondary hover:text-textPrimary hover:bg-bgSecondary rounded transition-colors"><SkipForward className="w-4 h-4" /></button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              icon={Repeat}
              className={cn(isLooping ? "text-accentPrimary bg-accentPrimary/10" : "")}
              onClick={() => setIsLooping(!isLooping)}
            >
              Loop
            </Button>
            <Button variant="ghost" size="sm" icon={Activity}>Graph</Button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
```

---

## الملف: `frontend\src\components\audio-realm\text-editor\TextAudioEditor.jsx`

```javascript
import React, { useState } from 'react';
import { Play, RotateCcw, Trash2, Edit3, X, Check, Mic } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { Button } from '../../common/Button';
import { useAIJobStore } from '../../../store/useAIJobStore';

// Mock Data representing WhisperX output with word-level timestamps
const INITIAL_TRANSCRIPT = [
  { id: 1, text: "In", start: 0.0, end: 0.2, status: "normal" },
  { id: 2, text: "the", start: 0.2, end: 0.4, status: "normal" },
  { id: 3, text: "depths", start: 0.4, end: 0.8, status: "normal" },
  { id: 4, text: "of", start: 0.8, end: 0.9, status: "normal" },
  { id: 5, text: "space,", start: 0.9, end: 1.4, status: "normal" },
  { id: 6, text: "a", start: 1.5, end: 1.6, status: "normal" },
  { id: 7, text: "lone", start: 1.6, end: 2.0, status: "normal" },
  { id: 8, text: "warrior", start: 2.0, end: 2.5, status: "normal" },
  { id: 9, text: "stands", start: 2.5, end: 3.0, status: "normal" },
  { id: 10, text: "against", start: 3.1, end: 3.5, status: "normal" },
  { id: 11, text: "the", start: 3.5, end: 3.6, status: "normal" },
  { id: 12, text: "darkness.", start: 3.6, end: 4.2, status: "normal" },
];

export const TextAudioEditor = () => {
  const [words, setWords] = useState(INITIAL_TRANSCRIPT);
  const [selectedWordIds, setSelectedWordIds] = useState([]);
  const [editingWordId, setEditingWordId] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");
  
  const { startJob, isProcessing } = useAIJobStore();

  const toggleWordSelection = (id) => {
    if (editingWordId) return; // Prevent selection while editing
    setSelectedWordIds(prev => 
      prev.includes(id) ? prev.filter(wordId => wordId !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedWordIds([]);
    setEditingWordId(null);
  };

  const handleDeleteSelected = () => {
    setWords(prev => prev.map(word => 
      selectedWordIds.includes(word.id) ? { ...word, status: "deleted" } : word
    ));
    clearSelection();
  };

  const handleRestoreSelected = () => {
    setWords(prev => prev.map(word => 
      selectedWordIds.includes(word.id) ? { ...word, status: "normal", replacement: null } : word
    ));
    clearSelection();
  };

  const startEditing = () => {
    if (selectedWordIds.length !== 1) return; // Only allow editing one word at a time for this demo
    const wordToEdit = words.find(w => w.id === selectedWordIds[0]);
    setEditInputValue(wordToEdit.replacement || wordToEdit.text);
    setEditingWordId(wordToEdit.id);
  };

  const saveEdit = () => {
    setWords(prev => prev.map(word => 
      word.id === editingWordId 
        ? { ...word, status: "edited", replacement: editInputValue } 
        : word
    ));
    clearSelection();
  };

  const handleRegenerate = () => {
    // Determine which words need AI processing (edited ones)
    startJob({ id: `job_${Date.now()}`, type: 'text-edit', title: 'Synthesizing Edited Words (Voicebox)' });
    
    // Simulate AI Job completion
    setTimeout(() => {
      useAIJobStore.getState().completeJob();
      setWords(prev => prev.map(word => 
        word.status === "edited" ? { ...word, status: "normal", text: word.replacement } : word
      ));
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-bgSecondary border border-borderColor rounded-lg overflow-hidden w-full max-w-4xl mx-auto my-6">
      
      {/* Header & Main Actions */}
      <div className="flex items-center justify-between p-4 bg-bgTertiary border-b border-borderColor">
        <div className="flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-accentPrimary" />
          <h2 className="font-semibold text-textPrimary">Text-Based Audio Editor</h2>
        </div>
        
        <Button 
          variant="primary" 
          size="sm" 
          icon={Mic}
          disabled={isProcessing || !words.some(w => w.status === 'edited' || w.status === 'deleted')}
          onClick={handleRegenerate}
        >
          Apply & Regenerate Audio
        </Button>
      </div>

      {/* Editing Toolbar (Visible when words are selected) */}
      <div className={cn(
        "flex items-center gap-2 px-4 bg-[#222] border-b border-borderColor transition-all duration-200 overflow-hidden",
        selectedWordIds.length > 0 ? "h-12 opacity-100" : "h-0 opacity-0 border-transparent"
      )}>
        <span className="text-xs text-accentPrimary font-medium mr-4">
          {selectedWordIds.length} word(s) selected
        </span>
        
        {editingWordId ? (
          <div className="flex items-center gap-2 w-full max-w-sm">
            <input 
              type="text" 
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              className="bg-bgPrimary text-textPrimary text-sm px-3 py-1 rounded border border-accentPrimary outline-none w-full"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
            />
            <button onClick={saveEdit} className="p-1.5 text-accentPrimary hover:bg-bgPrimary rounded"><Check className="w-4 h-4" /></button>
            <button onClick={clearSelection} className="p-1.5 text-danger hover:bg-bgPrimary rounded"><X className="w-4 h-4" /></button>
          </div>
        ) : (
          <>
            <Button variant="ghost" size="sm" icon={Trash2} onClick={handleDeleteSelected} className="text-danger hover:text-danger hover:bg-danger/10">Delete</Button>
            {selectedWordIds.length === 1 && (
              <Button variant="ghost" size="sm" icon={Edit3} onClick={startEditing}>Replace</Button>
            )}
            <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleRestoreSelected}>Restore</Button>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" icon={X} onClick={clearSelection}>Clear Selection</Button>
          </>
        )}
      </div>

      {/* Transcript View */}
      <div className="flex-1 p-6 overflow-y-auto bg-bgPrimary text-lg leading-loose font-sans">
        <div className="flex flex-wrap gap-x-1.5 gap-y-2">
          {words.map((word) => {
            const isSelected = selectedWordIds.includes(word.id);
            const isDeleted = word.status === 'deleted';
            const isEdited = word.status === 'edited';

            return (
              <span 
                key={word.id}
                onClick={() => toggleWordSelection(word.id)}
                className={cn(
                  "px-1.5 py-0.5 rounded cursor-pointer transition-colors border select-none",
                  isSelected && !editingWordId ? "bg-accentPrimary/20 border-accentPrimary text-accentPrimary" : "border-transparent",
                  !isSelected && !isDeleted && !isEdited ? "text-textPrimary hover:bg-bgTertiary" : "",
                  isDeleted ? "text-textSecondary line-through bg-danger/10 border-danger/20 decoration-danger" : "",
                  isEdited && !isSelected ? "text-warning border-warning/30 bg-warning/10" : ""
                )}
                title={`Start: ${word.start}s | End: ${word.end}s`}
              >
                {isEdited ? word.replacement : word.text}
              </span>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};
```

---

## الملف: `frontend\src\components\audio-realm\timeline\Clip.jsx`

```javascript
import React from 'react';
import { cn } from '../../../utils/classNames';

export const Clip = ({ clip, zoomLevel }) => {
  // Calculate pixel values based on time and zoom level
  // Assuming 1 second = 10px at 100% zoom
  const pixelsPerSecond = (zoomLevel / 100) * 10;
  
  const leftPosition = clip.startTime * pixelsPerSecond;
  const width = clip.duration * pixelsPerSecond;

  return (
    <div 
      className={cn(
        "absolute top-1 bottom-1 rounded-md border border-black/30 overflow-hidden group cursor-pointer",
        "hover:border-white/50 transition-colors shadow-sm"
      )}
      style={{
        left: `${leftPosition}px`,
        width: `${width}px`,
        backgroundColor: `${clip.color}33`, // 20% opacity background
      }}
    >
      {/* Clip Header */}
      <div 
        className="text-[10px] px-1 py-0.5 text-white/80 font-medium truncate bg-black/40 border-b border-black/20"
      >
        {clip.name}
      </div>
      
      {/* Waveform Mockup (In production: WaveSurfer.js canvas goes here) */}
      <div className="absolute inset-0 top-5 flex items-center justify-center opacity-70 pointer-events-none">
        <div className="w-full h-1/2 flex items-center justify-between px-1">
          {/* Creating fake waveform bars for visual effect */}
          {Array.from({ length: Math.max(5, Math.floor(width / 4)) }).map((_, i) => (
            <div 
              key={i} 
              className="w-[2px] rounded-full" 
              style={{
                height: `${Math.random() * 80 + 20}%`,
                backgroundColor: clip.color
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\audio-realm\timeline\SmartAudioTimeline.jsx`

```javascript
import React from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Track } from './Track';
import { useTimelineStore } from '../../../store/useTimelineStore';

export const SmartAudioTimeline = () => {
  const { tracks, zoomLevel, setZoomLevel, playheadPosition } = useTimelineStore();

  const handleZoom = (direction) => {
    if (direction === 'in' && zoomLevel < 500) setZoomLevel(zoomLevel + 20);
    if (direction === 'out' && zoomLevel > 20) setZoomLevel(zoomLevel - 20);
  };

  return (
    <div className="flex flex-col w-full h-full bg-bgPrimary overflow-hidden flex-1">
      
      {/* Timeline Toolbar & Time Ruler */}
      <div className="flex h-8 border-b border-borderColor bg-bgSecondary">
        
        {/* Left corner (above track headers) */}
        <div className="w-64 flex-shrink-0 border-r border-borderColor flex items-center justify-between px-2">
          <div className="flex gap-1">
            <button onClick={() => handleZoom('out')} className="p-1 text-textSecondary hover:text-textPrimary rounded"><ZoomOut className="w-3.5 h-3.5" /></button>
            <button onClick={() => handleZoom('in')} className="p-1 text-textSecondary hover:text-textPrimary rounded"><ZoomIn className="w-3.5 h-3.5" /></button>
            <button onClick={() => setZoomLevel(100)} className="p-1 text-textSecondary hover:text-textPrimary rounded"><Maximize className="w-3.5 h-3.5" /></button>
          </div>
          <span className="text-xs text-textSecondary font-mono">{zoomLevel}%</span>
        </div>
        
        {/* Time Ruler (Right side) */}
        <div className="flex-1 relative overflow-hidden bg-bgTertiary">
          <div 
            className="absolute top-0 bottom-0 border-l-2 border-accentPrimary z-50 pointer-events-none transition-all duration-75"
            style={{ 
              left: `${playheadPosition * (zoomLevel / 100) * 10}px`,
              filter: 'drop-shadow(0 0 4px var(--accent-primary))'
            }}
          >
            {/* Playhead Triangle */}
            <div className="absolute -top-0 -left-1.5 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-accentPrimary"></div>
          </div>
          
          {/* Fake Ruler markings */}
          <div className="w-full h-full opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, var(--text-primary) 0, transparent 1px, transparent 50px, var(--text-secondary) 50px, transparent 51px, transparent 100px)'
          }}></div>
        </div>
      </div>

      {/* Tracks Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative custom-scrollbar pb-24">
        {tracks.map((track, index) => (
          <Track key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\audio-realm\timeline\Track.jsx`

```javascript
import React from 'react';
import { Mic, Volume2, Settings } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { Clip } from './Clip';
import { useTimelineStore } from '../../../store/useTimelineStore';
import { useEffectsStore } from '../../../store/useEffectsStore';

export const Track = ({ track, index }) => {
  const { zoomLevel, toggleTrackMute, toggleTrackSolo } = useTimelineStore();
  const { activeTrackId, setActiveTrack } = useEffectsStore();

  const isActive = activeTrackId === track.id;

  return (
    <div className="flex w-full h-24 border-b border-borderColor bg-bgPrimary group">
      
      {/* Track Header (Controls) */}
      <div 
        className={cn(
          "w-64 flex-shrink-0 flex flex-col p-2 border-r border-borderColor transition-colors cursor-pointer",
          isActive ? "bg-bgTertiary" : "bg-bgSecondary hover:bg-bgTertiary/50"
        )}
        onClick={() => setActiveTrack(track.id)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-sm">{track.icon}</span>
            <span className="text-sm font-medium text-textPrimary truncate">{index + 1}. {track.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-auto">
          {/* Mute Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); toggleTrackMute(track.id); }}
            className={cn(
              "flex-1 py-1 text-xs font-bold rounded transition-colors",
              track.isMuted ? "bg-danger text-white" : "bg-bgPrimary text-textSecondary hover:text-textPrimary"
            )}
          >
            M
          </button>
          
          {/* Solo Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); toggleTrackSolo(track.id); }}
            className={cn(
              "flex-1 py-1 text-xs font-bold rounded transition-colors",
              track.isSolo ? "bg-warning text-bgPrimary" : "bg-bgPrimary text-textSecondary hover:text-textPrimary"
            )}
          >
            S
          </button>
          
          {/* Arm Record Button */}
          <button className="flex-1 py-1 flex justify-center bg-bgPrimary rounded text-textSecondary hover:text-danger transition-colors">
            <Mic className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Track Lane (Timeline Area) */}
      <div className="flex-1 relative overflow-hidden bg-[#111] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik00MCAwSDBWNDBIMHoiLz48L2c+PC9zdmc+')]">
        
        {/* Render Clips inside this track */}
        {track.clips.map(clip => (
          <Clip key={clip.id} clip={clip} zoomLevel={zoomLevel} />
        ))}
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\common\Button.jsx`

```javascript
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/classNames';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className,
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accentPrimary text-bgPrimary hover:bg-[#00e67a]",
    secondary: "bg-bgTertiary text-textPrimary hover:bg-[#3a3a3a] border border-borderColor",
    danger: "bg-danger text-white hover:bg-[#e63d3d]",
    ghost: "bg-transparent text-textSecondary hover:text-textPrimary hover:bg-bgTertiary",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
    icon: "p-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : Icon ? (
        <Icon className={cn("w-4 h-4", children ? "mr-2" : "")} />
      ) : null}
      {children}
    </button>
  );
};
```

---

## الملف: `frontend\src\components\common\Modal.jsx`

```javascript
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/classNames';

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  width = "max-w-2xl" 
}) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className={cn("bg-bgSecondary border border-borderColor rounded-lg shadow-2xl w-full flex flex-col max-h-[90vh]", width)}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-borderColor bg-bgTertiary rounded-t-lg">
          <h2 className="text-lg font-semibold text-textPrimary">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-textSecondary hover:text-textPrimary hover:bg-bgPrimary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>

        {/* Footer (Optional) */}
        {footer && (
          <div className="flex justify-end gap-3 p-4 border-t border-borderColor bg-bgTertiary rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\common\Panel.jsx`

```javascript
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/classNames';

export const Panel = ({ 
  title, 
  children, 
  defaultOpen = true,
  actionButton = null,
  className 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("bg-bgSecondary border border-borderColor rounded-md overflow-hidden", className)}>
      <div 
        className="flex items-center justify-between p-3 bg-bgTertiary cursor-pointer select-none border-b border-borderColor transition-colors hover:bg-[#333333]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-textPrimary font-medium text-sm">
          {isOpen ? <ChevronDown className="w-4 h-4 text-textSecondary" /> : <ChevronRight className="w-4 h-4 text-textSecondary" />}
          {title}
        </div>
        
        {/* Render any action buttons (like the '+' add effect button) without triggering collapse */}
        <div onClick={(e) => e.stopPropagation()}>
          {actionButton}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 bg-bgSecondary">
          {children}
        </div>
      )}
    </div>
  );
};
```

---

## الملف: `frontend\src\components\common\Slider.jsx`

```javascript
import React from 'react';
import { cn } from '../../utils/classNames';

export const Slider = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange,
  className,
}) => {
  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  // Calculate percentage for custom track styling
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="flex justify-between items-center text-xs">
        <span className="text-textSecondary font-medium">{label}</span>
        <div className="flex items-center bg-bgTertiary px-2 py-1 rounded border border-borderColor">
          <span className="text-textPrimary font-mono w-12 text-right">
            {value.toFixed(step < 1 ? 1 : 0)}
          </span>
          <span className="text-textSecondary ml-1 w-6">{unit}</span>
        </div>
      </div>
      
      <div className="relative flex items-center h-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="w-full h-1.5 appearance-none bg-bgTertiary rounded-full outline-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--accent-primary) ${percentage}%, var(--bg-tertiary) ${percentage}%)`
          }}
        />
        {/* Custom thumb styles added via global CSS or inline styles in real implementation to override browser defaults */}
        <style dangerouslySetInnerHTML={{__html: `
          input[type=range]::-webkit-slider-thumb {
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #FFFFFF;
            cursor: pointer;
            border: 2px solid var(--bg-secondary);
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
          }
          input[type=range]::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #FFFFFF;
            cursor: pointer;
            border: 2px solid var(--bg-secondary);
          }
        `}} />
      </div>
    </div>
  );
};

```

---

## الملف: `frontend\src\components\common\Transport.jsx`

```javascript
import React, { useState } from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Rewind, FastForward, Mic, Repeat } from 'lucide-react';
import { cn } from '../../utils/classNames';
import { useTimelineStore } from '../../store/useTimelineStore';
import { formatTimecode } from '../../utils/timeUtils';

export const Transport = () => {
  const { isPlaying, togglePlay, playheadPosition, duration, setPlayheadPosition } = useTimelineStore();
  const [isLooping, setIsLooping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleStop = () => {
    if (isPlaying) togglePlay();
    if (isRecording) setIsRecording(false);
    setPlayheadPosition(0);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isPlaying && !isRecording) togglePlay();
  };

  const btnBase = "p-2 rounded hover:bg-bgTertiary transition-colors text-textSecondary hover:text-textPrimary flex items-center justify-center";

  return (
    <div className="flex items-center gap-6 px-4">
      {/* Time Display */}
      <div className="flex items-center gap-1 font-mono text-sm tracking-wider bg-bgPrimary border border-borderColor px-3 py-1.5 rounded text-accentPrimary shadow-inner">
        <span>{formatTimecode(playheadPosition)}</span>
        <span className="text-textSecondary opacity-50">/</span>
        <span className="text-textSecondary">{formatTimecode(duration)}</span>
      </div>

      {/* Main Transport Buttons */}
      <div className="flex items-center gap-1">
        <button className={btnBase} title="Go to Start" onClick={() => setPlayheadPosition(0)}>
          <SkipBack className="w-4 h-4" />
        </button>
        <button className={btnBase} title="Rewind">
          <Rewind className="w-4 h-4" />
        </button>
        
        {/* Play/Pause */}
        <button 
          onClick={togglePlay}
          className={cn(
            btnBase, 
            "w-12 h-10 mx-1",
            isPlaying ? "bg-bgTertiary text-accentPrimary" : "bg-bgPrimary"
          )}
          title={isPlaying ? "Pause (Space)" : "Play (Space)"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
        </button>
        
        {/* Stop */}
        <button onClick={handleStop} className={btnBase} title="Stop">
          <Square className="w-4 h-4 fill-current" />
        </button>
        
        <button className={btnBase} title="Fast Forward">
          <FastForward className="w-4 h-4" />
        </button>
        <button className={btnBase} title="Go to End" onClick={() => setPlayheadPosition(duration)}>
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Record & Loop */}
      <div className="flex items-center gap-2 border-l border-borderColor pl-4">
        <button 
          onClick={handleRecord}
          className={cn(
            btnBase,
            isRecording ? "text-danger hover:text-danger bg-danger/10" : ""
          )}
          title="Record (Ctrl+Space)"
        >
          <Mic className={cn("w-4 h-4", isRecording ? "animate-pulse" : "")} />
        </button>
        
        <button 
          onClick={() => setIsLooping(!isLooping)}
          className={cn(
            btnBase,
            isLooping ? "text-accentPrimary hover:text-accentPrimary bg-accentPrimary/10" : ""
          )}
          title="Loop Playback"
        >
          <Repeat className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\dashboard\AudioRealm.jsx`

```javascript
import React, { useEffect, useRef, useState, useMemo } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, SkipBack, Volume2 } from 'lucide-react'; // أضفنا أيقونة الصوت

export const AudioRealm = ({ tracks = [], originalTrackUrl }) => {
  const containerRefs = useRef([]);
  const wavesurfersRef = useRef([]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackStates, setTrackStates] = useState({});

  const displayTracks = useMemo(() => {
    const master = originalTrackUrl ? [{ name: 'Master Track', src: originalTrackUrl, type: 'original' }] : [];
    if (tracks.length > 0) return [...master, ...tracks]; 
    return master;
  }, [tracks, originalTrackUrl]);

  useEffect(() => {
    wavesurfersRef.current.forEach(ws => { if (ws) ws.destroy(); });
    wavesurfersRef.current = [];

    if (!displayTracks.length) return;

    const initialStates = {};
    displayTracks.forEach((_, idx) => {
      const autoMuteMaster = displayTracks.length > 1 && idx === 0;
      // أضفنا volume: 1 كقيمة افتراضية
      initialStates[idx] = { mute: autoMuteMaster, solo: false, volume: 1 };
    });
    setTrackStates(initialStates);

    displayTracks.forEach((track, idx) => {
      if (!containerRefs.current[idx]) return;

      const ws = WaveSurfer.create({
        container: containerRefs.current[idx],
        waveColor: track.type === 'original' ? '#FFB800' : '#00FF88', 
        progressColor: '#00D4FF',
        cursorColor: '#FFFFFF',
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        height: 64,
        normalize: true,
      });

      const autoMuteMaster = displayTracks.length > 1 && idx === 0;
      ws.setVolume(autoMuteMaster ? 0 : 1);

      const audioUrl = typeof track === 'object' ? track.src : track;
      ws.load(audioUrl);
      wavesurfersRef.current[idx] = ws;

      ws.on('interaction', () => {
        const currentTime = ws.getCurrentTime();
        wavesurfersRef.current.forEach((otherWs, otherIdx) => {
          if (idx !== otherIdx && otherWs) { 
            otherWs.setTime(currentTime);
          }
        });
      });
      
      ws.on('finish', () => {
        if (idx === 0) setIsPlaying(false);
      });
    });

    return () => {
      wavesurfersRef.current.forEach(ws => { if (ws) ws.destroy(); });
    };
  }, [displayTracks]);

  const togglePlay = () => {
    const willPlay = !isPlaying;
    setIsPlaying(willPlay);
    wavesurfersRef.current.forEach(ws => {
      if (ws) { 
        try { willPlay ? ws.play() : ws.pause(); } catch(e) {}
      }
    });
  };
  
  const stopPlayback = () => {
    setIsPlaying(false);
    wavesurfersRef.current.forEach(ws => {
      if (ws) {
        try { ws.pause(); ws.setTime(0); } catch(e) {}
      }
    });
  };

  const toggleMute = (idx) => {
    const newStates = { ...trackStates };
    newStates[idx].mute = !newStates[idx].mute;
    setTrackStates(newStates);
    applyAudioStates(newStates);
  };

  const toggleSolo = (idx) => {
    const newStates = { ...trackStates };
    newStates[idx].solo = !newStates[idx].solo;
    setTrackStates(newStates);
    applyAudioStates(newStates);
  };

  // 🌟 دالة التحكم بالصوت الجديدة 🌟
  const handleVolumeChange = (idx, newVolume) => {
    const newStates = { ...trackStates };
    newStates[idx].volume = newVolume;
    setTrackStates(newStates);
    applyAudioStates(newStates);
  };

  const applyAudioStates = (states) => {
    const anySolo = Object.values(states).some(s => s.solo);

    wavesurfersRef.current.forEach((ws, idx) => {
      if (!ws) return;
      const state = states[idx];
      
      if (anySolo) {
        ws.setVolume(state.solo ? state.volume : 0);
      } else {
        ws.setVolume(state.mute ? 0 : state.volume);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="flex items-center justify-center gap-6 bg-bgSecondary border border-borderColor p-3 rounded-xl sticky top-0 z-20 shadow-xl">
        <button onClick={stopPlayback} className="p-2 hover:bg-bgTertiary rounded-lg text-textSecondary hover:text-white transition-colors" title="Stop & Rewind">
          <SkipBack className="w-5 h-5" />
        </button>
        <button onClick={togglePlay} className="p-3 bg-accentPrimary text-bgPrimary rounded-full hover:scale-105 transition-transform shadow-lg shadow-accentPrimary/20">
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>
      </div>

      {displayTracks.map((track, idx) => (
        <div key={idx} className="flex bg-bgSecondary border border-borderColor rounded-xl overflow-hidden shadow-sm group hover:border-textSecondary/30 transition-colors">
          
          <div className="w-48 bg-bgTertiary border-r border-borderColor p-3 flex flex-col justify-center gap-2 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] bg-bgPrimary text-textSecondary px-1.5 py-0.5 rounded font-mono border border-borderColor">
                TRK {idx + 1}
              </span>
              <h4 className="font-bold text-sm text-textPrimary truncate" title={track.name || 'Audio Track'}>
                {track.name || `Track ${idx + 1}`}
              </h4>
            </div>
            
            <div className="flex gap-2 z-10">
              <button 
                onClick={() => toggleMute(idx)}
                className={`flex-1 py-1 text-xs font-bold rounded border transition-all duration-200 ${
                  trackStates[idx]?.mute 
                    ? 'bg-[#FF4444] text-white border-[#FF4444] shadow-[0_0_10px_rgba(255,68,68,0.4)]' 
                    : 'bg-bgPrimary text-textSecondary border-borderColor hover:border-textSecondary'
                }`}
              >M</button>
              <button 
                onClick={() => toggleSolo(idx)}
                className={`flex-1 py-1 text-xs font-bold rounded border transition-all duration-200 ${
                  trackStates[idx]?.solo 
                    ? 'bg-[#FFB800] text-bgPrimary border-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.4)]' 
                    : 'bg-bgPrimary text-textSecondary border-borderColor hover:border-textSecondary'
                }`}
              >S</button>
            </div>

            {/* 🌟 بكرة التحكم في مستوى الصوت 🌟 */}
            <div className="flex items-center gap-2 mt-1 z-10 bg-bgPrimary/50 p-1.5 rounded border border-borderColor">
              <Volume2 className="w-3 h-3 text-textSecondary" />
              <input 
                type="range" 
                min="0" max="1" step="0.05"
                value={trackStates[idx]?.volume ?? 1}
                onChange={(e) => handleVolumeChange(idx, parseFloat(e.target.value))}
                className="flex-1 h-1 bg-bgSecondary appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-textSecondary hover:[&::-webkit-slider-thumb]:bg-white cursor-pointer transition-all"
              />
            </div>
          </div>

          <div className="flex-1 relative bg-[#0D0D0D] p-2 flex flex-col justify-center cursor-crosshair">
            <div ref={el => containerRefs.current[idx] = el} className="w-full"></div>
          </div>
          
        </div>
      ))}
    </div>
  );
};
```

---

## الملف: `frontend\src\components\dashboard\Dashboard.jsx`

```javascript
import { useState, useRef } from 'react';
import { Plus, Folder, Clock, MoreVertical, Search, Play, Video, Mic, Zap } from 'lucide-react';
import { Button } from '../common/Button';
import { cn } from '../../utils/classNames';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Mock Data for Projects
const RECENT_PROJECTS = [
  { id: 1, name: 'Anime Dubbing - Episode 1', type: 'video', updatedAt: '2 hours ago', duration: '24:15', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Podcast Episode 42: Tech News', type: 'audio', updatedAt: 'Yesterday', duration: '45:30', thumbnail: null },
  { id: 3, name: 'Explosion SFX Design', type: 'audio', updatedAt: '3 days ago', duration: '0:15', thumbnail: null },
  { id: 4, name: 'Product Promo Video', type: 'video', updatedAt: 'Last week', duration: '1:30', thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80' },
];

export const Dashboard = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); 
  
  // حالة واحدة فقط نحتاجها هنا لمعرفة إذا كان الملف يرفع للسيرفر
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // دالة الرفع السريعة والانتقال الفوري
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      console.log("جاري رفع الملف للسيرفر...");
      
      const formData = new FormData();
      formData.append('file', file);

      // 1. رفع الملف إلى Node.js
      const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const serverFilePath = uploadResponse.data.filePath;
      console.log("تم الرفع السريع للمسار:", serverFilePath);

      // 2. إنشاء رابط محلي للتشغيل
      const localUrl = URL.createObjectURL(file);

      // 3. الانتقال فوراً لمحطة الصوت مع البيانات!
      setIsUploading(false);
      navigate('/audio', { 
        state: { 
          originalTrackUrl: localUrl, 
          serverFilePath: serverFilePath,
          fileName: file.name
        } 
      });

    } catch (error) {
      console.error("خطأ:", error);
      alert("حدث خطأ أثناء الرفع.");
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full h-full bg-bgPrimary flex flex-col overflow-hidden text-textPrimary">
      
      {/* Top Navigation / Stats */}
      <div className="h-16 border-b border-borderColor bg-bgSecondary flex items-center justify-between px-8">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accentPrimary to-accentSecondary">
          Ore Dake AI Studio
        </h1>
        
        <div className="flex items-center gap-6">
          {/* AI Credits Badge */}
          <div className="flex items-center gap-2 bg-bgTertiary border border-borderColor px-3 py-1.5 rounded-full">
            <Zap className="w-4 h-4 text-warning fill-warning" />
            <span className="text-sm font-medium">850 Credits</span>
          </div>
          
          {/* User Profile Mockup */}
          <div className="w-8 h-8 rounded-full bg-accentSecondary/20 border border-accentSecondary text-accentSecondary flex items-center justify-center font-bold text-sm cursor-pointer">
            MG
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Welcome & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-textPrimary mb-1">Welcome back, Mohamed!</h2>
              <p className="text-textSecondary">What would you like to create today?</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* إدخال الملف المخفي */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="audio/*" 
                className="hidden" 
              />

              <Button 
                variant="secondary" 
                icon={Mic} 
                className="hover:text-accentPrimary hover:border-accentPrimary"
                onClick={() => fileInputRef.current.click()}
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Audio File'}
              </Button>
              
              <Button variant="primary" icon={Video} className="bg-accentSecondary text-bgPrimary hover:bg-[#00bfff]">
                New Video Project
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-5 h-5 text-textSecondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search your projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bgSecondary border border-borderColor text-textPrimary pl-10 pr-4 py-2.5 rounded-md focus:border-accentPrimary outline-none transition-colors"
            />
          </div>
          
          {/* Recent Projects Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-textSecondary" /> Recent Projects
              </h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {RECENT_PROJECTS.map(project => (
                <div key={project.id} className="bg-bgSecondary border border-borderColor rounded-lg overflow-hidden group hover:border-accentPrimary transition-all cursor-pointer">
                  
                  {/* Thumbnail */}
                  <div className="h-32 bg-bgTertiary relative flex items-center justify-center overflow-hidden">
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      project.type === 'video' ? <Video className="w-10 h-10 text-textSecondary/50" /> : <Mic className="w-10 h-10 text-textSecondary/50" />
                    )}
                    
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-accentPrimary text-bgPrimary flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                      {project.duration}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-4 relative">
                    <button className="absolute top-4 right-3 text-textSecondary hover:text-textPrimary">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    <h4 className="font-medium text-textPrimary pr-6 truncate">{project.name}</h4>
                    <div className="flex items-center gap-2 mt-2 text-xs text-textSecondary">
                      {project.type === 'video' ? <Video className="w-3.5 h-3.5 text-accentSecondary" /> : <Mic className="w-3.5 h-3.5 text-accentPrimary" />}
                      <span className="capitalize">{project.type} Project</span>
                      <span>•</span>
                      <span>{project.updatedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\layout\BottomBar.jsx`

```javascript
import React from 'react';
import { Transport } from '../common/Transport';
import { Activity } from 'lucide-react';

export const BottomBar = () => {
  return (
    <div className="h-14 border-t border-borderColor bg-bgSecondary flex items-center justify-between px-4 z-40 relative">
      
      {/* Left Area: Status or Audio Engine Info */}
      <div className="flex items-center gap-2 text-xs text-textSecondary w-1/4">
        <Activity className="w-3.5 h-3.5 text-accentPrimary" />
        <span>Audio Engine: Running</span>
        <span className="mx-2 opacity-30">|</span>
        <span>48000 Hz</span>
      </div>

      {/* Center Area: Transport Controls */}
      <div className="flex justify-center flex-1">
        <Transport />
      </div>

      {/* Right Area: Additional Tools (Placeholder for future features) */}
      <div className="flex justify-end w-1/4">
        {/* Could place project sync status or minor tools here */}
      </div>
      
    </div>
  );
};
```

---

## الملف: `frontend\src\components\layout\Sidebar.jsx`

```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Mic2, Video, Settings, Library } from 'lucide-react';
import { cn } from '../../utils/classNames';

const NAV_ITEMS = [
  { id: 'dashboard', path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'audio', path: '/audio', icon: Mic2, label: 'Audio Realm' },
  { id: 'video', path: '/video', icon: Video, label: 'Video Realm' },
  { id: 'library', path: '/library', icon: Library, label: 'Shared Vault' },
];

export const Sidebar = () => {
  return (
    <div className="w-16 h-full bg-bgSecondary border-r border-borderColor flex flex-col items-center py-5 shrink-0 z-40 relative">
      
      {/* Brand Logo (Ore Dake AI) */}
      <div className="w-10 h-10 rounded-xl bg-accentPrimary/10 flex items-center justify-center mb-8 border border-accentPrimary/30 shadow-[0_0_15px_rgba(0,255,136,0.15)]">
        <span className="font-bold text-accentPrimary text-xl">O</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-4 w-full px-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            title={item.label}
            className={({ isActive }) => cn(
              "w-12 h-12 rounded-xl flex items-center justify-center group relative transition-all duration-300 mx-auto",
              isActive 
                ? "bg-bgTertiary text-accentPrimary shadow-sm" 
                : "text-textSecondary hover:bg-bgTertiary/50 hover:text-textPrimary"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "w-5 h-5 transition-all duration-300", 
                  isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]" : "group-hover:scale-110"
                )} />
                
                {/* Active Indicator Line (Neon Glow) */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accentPrimary rounded-r-full shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Settings Icon at the bottom */}
      <button 
        className="w-12 h-12 rounded-xl flex items-center justify-center text-textSecondary hover:bg-bgTertiary hover:text-textPrimary transition-all duration-300"
        title="Settings"
      >
        <Settings className="w-5 h-5 transition-transform duration-300 hover:rotate-90" />
      </button>

    </div>
  );
};
```

---

## الملف: `frontend\src\components\shared-library\SharedLibrary.jsx`

```javascript
import React, { useState } from 'react';
import { Library, Music, Mic2, Search, Play, Plus, Heart, Download, Filter } from 'lucide-react';
import { cn } from '../../utils/classNames';

const LIBRARY_TABS = [
  { id: 'sfx', label: 'Sound Effects', icon: <Library className="w-4 h-4" /> },
  { id: 'music', label: 'Music Tracks', icon: <Music className="w-4 h-4" /> },
  { id: 'voices', label: 'Voice Actors', icon: <Mic2 className="w-4 h-4" /> },
];

const MOCK_ITEMS = [
  { id: 1, name: 'Cinematic Boom Impact', category: 'Impacts', duration: '0:04', isFav: true },
  { id: 2, name: 'Sci-Fi Laser Gun', category: 'Weapons', duration: '0:01', isFav: false },
  { id: 3, name: 'Whoosh Transition Fast', category: 'Transitions', duration: '0:02', isFav: false },
  { id: 4, name: 'Ambient Space Drone', category: 'Ambience', duration: '1:30', isFav: true },
  { id: 5, name: 'Footsteps on Gravel', category: 'Foley', duration: '0:12', isFav: false },
];

export const SharedLibrary = () => {
  const [activeTab, setActiveTab] = useState('sfx');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full bg-bgSecondary border-l border-borderColor w-96 flex-shrink-0">
      
      {/* Header */}
      <div className="p-4 border-b border-borderColor bg-bgPrimary">
        <h2 className="text-lg font-semibold text-textPrimary flex items-center gap-2 mb-4">
          <Library className="w-5 h-5 text-accentPrimary" />
          Asset Library
        </h2>
        
        {/* Search */}
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-textSecondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bgTertiary border border-borderColor text-sm text-textPrimary pl-9 pr-3 py-2 rounded focus:border-accentPrimary outline-none"
            />
          </div>
          <button className="p-2 bg-bgTertiary border border-borderColor rounded text-textSecondary hover:text-textPrimary transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-2 gap-1 border-b border-borderColor bg-bgPrimary">
        {LIBRARY_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium rounded transition-all duration-200",
              activeTab === tab.id 
                ? "bg-bgTertiary text-textPrimary shadow-sm" 
                : "text-textSecondary hover:bg-bgTertiary/50 hover:text-textPrimary"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1 bg-bgPrimary">
        {/* List Header */}
        <div className="flex text-xs font-medium text-textSecondary px-2 py-1 mb-1">
          <span className="flex-1">NAME</span>
          <span className="w-12 text-right">TIME</span>
        </div>

        {/* List Items */}
        {MOCK_ITEMS.map(item => (
          <div key={item.id} className="flex items-center gap-2 p-2 rounded hover:bg-bgTertiary group transition-colors cursor-pointer border border-transparent hover:border-borderColor">
            
            <button className="w-8 h-8 rounded-full bg-bgPrimary flex items-center justify-center text-textSecondary group-hover:bg-accentPrimary group-hover:text-bgPrimary transition-colors flex-shrink-0">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </button>
            
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="text-sm font-medium text-textPrimary truncate">{item.name}</span>
              <span className="text-xs text-textSecondary truncate">{item.category}</span>
            </div>
            
            <span className="text-xs font-mono text-textSecondary w-10 text-right">{item.duration}</span>
            
            {/* Hover Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-textSecondary hover:text-danger rounded">
                <Heart className={cn("w-4 h-4", item.isFav ? "fill-danger text-danger" : "")} />
              </button>
              <button 
                className="p-1.5 text-textSecondary hover:text-bgPrimary hover:bg-accentPrimary rounded"
                title="Add to Timeline"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};
```

---

## الملف: `frontend\src\components\studio\StudioPage.jsx`

```javascript
import { useLocation, Navigate } from 'react-router-dom';
import { AudioRealm } from '../dashboard/AudioRealm';

export const StudioPage = () => {
  const location = useLocation();
  // استلام البيانات (المسارات والملف الأصلي) القادمة من لوحة القيادة
  const { tracks, originalTrackUrl } = location.state || {};

  // إذا حاول شخص الدخول للرابط مباشرة بدون رفع ملف، نطرده للرئيسية!
  if (!tracks) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-bgPrimary text-white overflow-x-hidden">
      {/* هنا سنضيف لاحقاً الشريط العلوي (TopBar) والقائمة الجانبية (Sidebar) */}
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-accentPrimary flex items-center gap-2">
            <span>✨</span> Studio Workspace
          </h1>
          <p className="text-textSecondary">Edit and compare audio tracks with high precision.</p>
        </div>
        
        {/* استدعاء المحرر الاحترافي وتمرير البيانات إليه */}
        <AudioRealm tracks={tracks} originalTrackUrl={originalTrackUrl} />
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\video-realm\emotion-gen\EmotionVideoGenerator.jsx`

```javascript
import React, { useState } from 'react';
import { Sparkles, FileText, Smile, User, Play, Download, Save, RefreshCw, Zap, Upload, MonitorPlay } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { Button } from '../../common/Button';
import { Slider } from '../../common/Slider';

const EMOTIONS = [
  { id: 'angry', label: 'Angry', emoji: '😠', color: 'hover:border-danger hover:bg-danger/10 hover:text-danger' },
  { id: 'sad', label: 'Sad', emoji: '😢', color: 'hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-500' },
  { id: 'happy', label: 'Happy', emoji: '😊', color: 'hover:border-accentPrimary hover:bg-accentPrimary/10 hover:text-accentPrimary' },
  { id: 'excited', label: 'Excited', emoji: '🤩', color: 'hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500' },
  { id: 'neutral', label: 'Neutral', emoji: '😐', color: 'hover:border-textSecondary hover:bg-textSecondary/10 hover:text-textPrimary' },
  { id: 'fear', label: 'Fear', emoji: '😨', color: 'hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-500' },
];

const CHARACTERS = [
  { id: 'levi', name: 'Levi', category: 'anime', img: 'https://ui-avatars.com/api/?name=Levi&background=111&color=fff&size=128' },
  { id: 'goku', name: 'Goku', category: 'anime', img: 'https://ui-avatars.com/api/?name=Goku&background=f97316&color=fff&size=128' },
  { id: 'naruto', name: 'Naruto', category: 'anime', img: 'https://ui-avatars.com/api/?name=Naruto&background=eab308&color=fff&size=128' },
  { id: 'eren', name: 'Eren', category: 'anime', img: 'https://ui-avatars.com/api/?name=Eren&background=7f1d1d&color=fff&size=128' },
];

export const EmotionVideoGenerator = () => {
  const [script, setScript] = useState("In the depths of space, a lone warrior stands against the darkness, his eyes burning with determination...");
  const [selectedEmotion, setSelectedEmotion] = useState('angry');
  const [intensity, setIntensity] = useState(70);
  const [selectedChar, setSelectedChar] = useState('levi');
  const [charCategory, setCharCategory] = useState('anime');
  
  // Generation State: 'idle' | 'generating' | 'completed'
  const [genState, setGenState] = useState('idle');
  const [genProgress, setGenProgress] = useState(0);
  const [genStage, setGenStage] = useState('');

  const handleGenerate = () => {
    setGenState('generating');
    setGenProgress(0);
    
    // Simulate multi-stage AI generation process
    const stages = [
      { p: 20, text: "Generating audio with voicebox..." },
      { p: 50, text: "Generating video frames (Stable Video Diffusion)..." },
      { p: 85, text: "Synchronizing lip movement..." },
      { p: 100, text: "Finalizing..." }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage >= stages.length) {
        clearInterval(interval);
        setGenState('completed');
        return;
      }
      setGenProgress(stages[currentStage].p);
      setGenStage(stages[currentStage].text);
      currentStage++;
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full h-full bg-bgPrimary overflow-y-auto custom-scrollbar p-6">
      <div className="max-w-4xl w-full mx-auto space-y-8 pb-12">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-borderColor">
          <Sparkles className="w-6 h-6 text-accentSecondary" />
          <h1 className="text-2xl font-bold text-textPrimary">Emotion Video Generator</h1>
        </div>

        {/* STEP 1: SCRIPT */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="flex items-center gap-2 font-semibold text-textPrimary">
              <FileText className="w-4 h-4 text-accentPrimary" /> Step 1: Script
            </h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" icon={RefreshCw}>AI Suggest</Button>
              <Button variant="ghost" size="sm" icon={Upload}>Import File</Button>
            </div>
          </div>
          <textarea 
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full h-32 bg-bgPrimary border border-borderColor rounded-md p-3 text-textPrimary focus:border-accentSecondary outline-none resize-none font-sans leading-relaxed"
            placeholder="Type your script here..."
          />
        </section>

        {/* STEP 2: EMOTION */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <h2 className="flex items-center gap-2 font-semibold text-textPrimary mb-4">
            <Smile className="w-4 h-4 text-accentPrimary" /> Step 2: Emotion Selection
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {EMOTIONS.map(emo => (
              <button
                key={emo.id}
                onClick={() => setSelectedEmotion(emo.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200",
                  selectedEmotion === emo.id 
                    ? "bg-bgTertiary border-textPrimary text-textPrimary shadow-sm" 
                    : `bg-bgPrimary border-borderColor text-textSecondary ${emo.color}`
                )}
              >
                <span className="text-lg">{emo.emoji}</span>
                <span className="font-medium text-sm">{emo.label}</span>
              </button>
            ))}
          </div>
          
          <div className="max-w-md">
            <Slider 
              label="Emotion Intensity" 
              value={intensity} 
              min={0} max={100} unit="%" 
              onChange={setIntensity} 
            />
          </div>
        </section>

        {/* STEP 3: CHARACTER */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 font-semibold text-textPrimary">
              <User className="w-4 h-4 text-accentPrimary" /> Step 3: Character Selection
            </h2>
            <select 
              value={charCategory}
              onChange={(e) => setCharCategory(e.target.value)}
              className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-1.5 outline-none focus:border-accentSecondary"
            >
              <option value="anime">Anime</option>
              <option value="movie">Movie</option>
              <option value="singer">Singer</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {CHARACTERS.map(char => (
              <div 
                key={char.id}
                onClick={() => setSelectedChar(char.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all",
                  selectedChar === char.id ? "border-accentSecondary bg-accentSecondary/5" : "border-transparent hover:bg-bgTertiary"
                )}
              >
                <img src={char.img} alt={char.name} className="w-16 h-16 rounded-full border border-borderColor object-cover" />
                <span className="text-sm font-medium text-textPrimary">{char.name}</span>
                <Button variant="ghost" size="xs" icon={Play} className="w-full text-xs py-1 mt-1">Preview</Button>
              </div>
            ))}
            
            <div className="flex flex-col items-center justify-center gap-2 p-2 rounded-lg border-2 border-dashed border-borderColor cursor-pointer hover:border-textSecondary transition-all hover:bg-bgTertiary">
              <div className="w-16 h-16 rounded-full bg-bgPrimary flex items-center justify-center">
                <Upload className="w-6 h-6 text-textSecondary" />
              </div>
              <span className="text-sm font-medium text-textSecondary">Add Custom</span>
            </div>
          </div>
        </section>

        {/* STEP 4: GENERATE / RESULT */}
        <section className="bg-bgTertiary border border-borderColor rounded-lg p-6 flex flex-col items-center justify-center text-center">
          
          {genState === 'idle' && (
            <>
              <h2 className="text-lg font-semibold text-textPrimary mb-2">Ready to Generate</h2>
              <p className="text-sm text-textSecondary mb-6 max-w-md">
                This will use your AI credits and take approximately 30-40 seconds to process on the GPU server.
              </p>
              <Button 
                variant="primary" 
                size="lg" 
                icon={Zap} 
                onClick={handleGenerate}
                className="bg-accentSecondary text-bgPrimary hover:bg-[#00bfff] px-8 py-3 text-lg"
              >
                GENERATE SCENE
              </Button>
            </>
          )}

          {genState === 'generating' && (
            <div className="w-full max-w-md flex flex-col items-center gap-4">
              <Zap className="w-10 h-10 text-accentSecondary animate-pulse" />
              <h2 className="text-lg font-semibold text-textPrimary">Processing on GPU...</h2>
              
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs text-textSecondary font-mono">
                  <span>{genStage}</span>
                  <span>{genProgress}%</span>
                </div>
                <div className="w-full h-2 bg-bgPrimary rounded-full overflow-hidden border border-borderColor">
                  <div 
                    className="h-full bg-accentSecondary transition-all duration-500 ease-out"
                    style={{ width: `${genProgress}%` }}
                  />
                </div>
              </div>
              
              <Button variant="ghost" onClick={() => setGenState('idle')} className="text-danger mt-4">Cancel Processing</Button>
            </div>
          )}

          {genState === 'completed' && (
            <div className="w-full flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-accentPrimary">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-xl font-bold">Scene Generated Successfully!</h2>
              </div>
              
              <div className="w-full max-w-2xl aspect-video bg-black rounded-lg border border-borderColor flex items-center justify-center shadow-lg relative group overflow-hidden">
                <MonitorPlay className="w-16 h-16 text-textSecondary opacity-30" />
                {/* Fake Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-accentSecondary/80 flex items-center justify-center pl-1">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-2">
                <Button variant="secondary" icon={Play}>Preview</Button>
                <Button variant="secondary" icon={Save}>Save to Project</Button>
                <Button variant="primary" icon={Download} className="bg-accentSecondary hover:bg-[#00bfff] text-bgPrimary">Export MP4</Button>
                <Button variant="ghost" icon={RefreshCw} onClick={() => setGenState('idle')}>Create Another</Button>
              </div>
            </div>
          )}

        </section>
        
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\video-realm\lip-sync\LipSyncPanel.jsx`

```javascript
import React, { useState } from 'react';
import { Upload, Video, Image as ImageIcon, Mic, Settings2, Play, Download, Save, Zap, CheckCircle2, UserSquare2, RefreshCw } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { Button } from '../../common/Button';

export const LipSyncPanel = () => {
  const [sourceType, setSourceType] = useState(null); // 'video' | 'image' | 'project'
  const [audioSource, setAudioSource] = useState(null); // 'upload' | 'record' | 'timeline'
  
  // Settings State
  const [language, setLanguage] = useState('auto');
  const [precision, setPrecision] = useState('high');
  const [mouthStyle, setMouthStyle] = useState('natural');
  const [preserveExpression, setPreserveExpression] = useState(true);

  // Process State
  const [syncState, setSyncState] = useState('idle'); // 'idle' | 'processing' | 'completed'
  const [progress, setProgress] = useState(0);

  const handleSync = () => {
    setSyncState('processing');
    setProgress(0);
    
    // Simulate Wav2Lip/SadTalker sync process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncState('completed');
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full h-full bg-bgPrimary overflow-y-auto custom-scrollbar p-6">
      <div className="max-w-4xl w-full mx-auto space-y-6 pb-12">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-borderColor">
          <UserSquare2 className="w-6 h-6 text-accentSecondary" />
          <h1 className="text-2xl font-bold text-textPrimary">AI Lip Synchronization</h1>
        </div>

        {/* SOURCE MEDIA */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-4">1. Source Video / Image</h2>
          
          <div className="flex gap-3 mb-6">
            <Button 
              variant={sourceType === 'video' ? 'primary' : 'secondary'} 
              className={sourceType === 'video' ? 'bg-accentSecondary text-bgPrimary hover:bg-accentSecondary' : ''}
              onClick={() => setSourceType('video')} 
              icon={Video}
            >
              Upload Video
            </Button>
            <Button 
              variant={sourceType === 'image' ? 'primary' : 'secondary'} 
              className={sourceType === 'image' ? 'bg-accentSecondary text-bgPrimary hover:bg-accentSecondary' : ''}
              onClick={() => setSourceType('image')} 
              icon={ImageIcon}
            >
              Upload Image (Static)
            </Button>
            <Button 
              variant={sourceType === 'project' ? 'primary' : 'secondary'} 
              className={sourceType === 'project' ? 'bg-accentSecondary text-bgPrimary hover:bg-accentSecondary' : ''}
              onClick={() => setSourceType('project')} 
              icon={Film}
            >
              Use from Project
            </Button>
          </div>

          {/* Mock Preview Area */}
          <div className="w-full aspect-video bg-bgTertiary border border-borderColor/50 rounded-md flex flex-col items-center justify-center relative overflow-hidden">
            {sourceType ? (
              <>
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
                  alt="Source Preview" 
                  className="w-full h-full object-cover opacity-60"
                />
                {/* Fake Face Detection Bounding Box */}
                <div className="absolute top-[20%] left-[35%] w-[30%] h-[50%] border-2 border-accentPrimary rounded-lg shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                  <div className="absolute -top-6 left-0 bg-accentPrimary text-bgPrimary text-[10px] font-bold px-2 py-0.5 rounded">Face Detected</div>
                  {/* Facial landmarks mockup */}
                  <div className="absolute top-[40%] left-[30%] w-1 h-1 bg-accentPrimary rounded-full shadow-[0_0_5px_#00FF88]" />
                  <div className="absolute top-[40%] right-[30%] w-1 h-1 bg-accentPrimary rounded-full shadow-[0_0_5px_#00FF88]" />
                  <div className="absolute bottom-[25%] left-[40%] right-[40%] h-1 bg-accentPrimary/50 rounded-full" />
                </div>
              </>
            ) : (
              <span className="text-textSecondary text-sm">Select a source media to begin</span>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs">
            <div className="flex items-center gap-2 text-textSecondary">
              <span>Face Detection:</span>
              {sourceType ? (
                <span className="text-accentPrimary flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Detected</span>
              ) : (
                <span>Waiting...</span>
              )}
            </div>
            {sourceType && <Button variant="ghost" size="xs">Manual Select Target</Button>}
          </div>
        </section>

        {/* AUDIO SOURCE */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-4">2. Dubbed Audio</h2>
          
          <div className="flex flex-wrap gap-6 items-start">
            <div className="flex flex-col gap-3">
              <Button variant={audioSource === 'upload' ? 'primary' : 'secondary'} onClick={() => setAudioSource('upload')} icon={Upload}>Upload Audio</Button>
              <Button variant={audioSource === 'record' ? 'primary' : 'secondary'} onClick={() => setAudioSource('record')} icon={Mic} className={audioSource === 'record' ? 'bg-danger text-white hover:bg-danger/90' : ''}>Record Now</Button>
              <Button variant={audioSource === 'timeline' ? 'primary' : 'secondary'} onClick={() => setAudioSource('timeline')} icon={Film}>Use Timeline Audio</Button>
            </div>
            
            <div className="flex-1 border-l border-borderColor pl-6 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-textSecondary">Language (Helps AI with phoneme matching)</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentPrimary max-w-xs"
                >
                  <option value="auto">Auto-Detect</option>
                  <option value="ar">Arabic</option>
                  <option value="en">English</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
              
              {audioSource && (
                <div className="bg-bgTertiary border border-borderColor rounded p-3 flex items-center gap-3 w-full max-w-xs">
                  <button className="w-8 h-8 rounded-full bg-accentPrimary text-bgPrimary flex items-center justify-center pl-0.5"><Play className="w-4 h-4 fill-current" /></button>
                  <div className="flex-1">
                    <div className="h-1 bg-bgPrimary rounded-full w-full overflow-hidden">
                      <div className="h-full bg-accentPrimary w-1/3" />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-textSecondary">0:12</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SETTINGS */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-textSecondary uppercase tracking-wider mb-4">
            <Settings2 className="w-4 h-4" /> 3. Sync Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-textSecondary">Precision Level</label>
                <select 
                  value={precision}
                  onChange={(e) => setPrecision(e.target.value)}
                  className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentSecondary"
                >
                  <option value="standard">Standard (Fastest)</option>
                  <option value="high">High Quality (Recommended)</option>
                  <option value="ultra">Ultra (Slow, Best for Close-ups)</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-textSecondary">Mouth Movement Style</label>
                <select 
                  value={mouthStyle}
                  onChange={(e) => setMouthStyle(e.target.value)}
                  className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentSecondary"
                >
                  <option value="natural">Natural</option>
                  <option value="exaggerated">Exaggerated (Anime/Cartoon)</option>
                  <option value="subtle">Subtle</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col justify-center bg-bgTertiary border border-borderColor rounded-md p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={preserveExpression}
                  onChange={() => setPreserveExpression(!preserveExpression)}
                  className="w-4 h-4 accent-accentSecondary bg-bgPrimary border-borderColor rounded" 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-textPrimary">Preserve Facial Expressions</span>
                  <span className="text-xs text-textSecondary">Attempts to keep original eye and brow movements intact.</span>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* ACTION / RESULT */}
        <section className="bg-bgTertiary border border-borderColor rounded-lg p-6 flex flex-col items-center justify-center">
          
          {syncState === 'idle' && (
            <Button 
              variant="primary" 
              size="lg" 
              icon={Zap} 
              onClick={handleSync}
              disabled={!sourceType || !audioSource}
              className="bg-accentSecondary text-bgPrimary hover:bg-[#00bfff] px-8 py-3 text-lg"
            >
              SYNCHRONIZE
            </Button>
          )}

          {syncState === 'processing' && (
            <div className="w-full max-w-md flex flex-col items-center gap-4">
              <RefreshCw className="w-8 h-8 text-accentSecondary animate-spin" />
              <h2 className="text-base font-semibold text-textPrimary">Applying Neural Lip Sync...</h2>
              
              <div className="w-full space-y-1">
                <div className="flex justify-between text-xs text-textSecondary font-mono">
                  <span>Processing Frames</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-bgPrimary rounded-full overflow-hidden border border-borderColor">
                  <div 
                    className="h-full bg-accentSecondary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSyncState('idle')} className="text-danger mt-2">Cancel</Button>
            </div>
          )}

          {syncState === 'completed' && (
            <div className="w-full flex flex-col gap-4 items-center">
              <div className="flex items-center gap-2 text-accentPrimary mb-2">
                <CheckCircle2 className="w-6 h-6" />
                <h2 className="text-lg font-bold">Synchronization Complete</h2>
              </div>
              
              <div className="flex gap-3">
                <Button variant="secondary" icon={Play}>Preview Video</Button>
                <Button variant="secondary" icon={Save}>Save to Project</Button>
                <Button variant="primary" icon={Download} className="bg-accentSecondary text-bgPrimary hover:bg-[#00bfff]">Export Final MP4</Button>
                <Button variant="ghost" icon={Settings2} onClick={() => setSyncState('idle')}>Adjust Settings</Button>
              </div>
            </div>
          )}
          
        </section>

      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\components\video-realm\timeline\VideoDubbingTimeline.jsx`

```javascript
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Maximize, Mic, MonitorPlay, Type, Volume2, Video } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { formatTimecode } from '../../../utils/timeUtils';
import { Button } from '../../common/Button';

export const VideoDubbingTimeline = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPos, setPlayheadPos] = useState(0);
  const duration = 330; // 5:30 in seconds for demo
  
  // Mock Video Tracks Data
  const tracks = [
    { id: 'v1', type: 'video', name: 'Source_Video.mp4', icon: <Video className="w-4 h-4" />, color: 'var(--accent-secondary)' },
    { id: 'a1', type: 'audio', name: 'Arabic_Dub.wav', icon: <Mic className="w-4 h-4" />, color: 'var(--waveform-color)' },
    { id: 'a2', type: 'audio', name: 'Japanese_Dub.wav', icon: <Mic className="w-4 h-4" />, color: 'var(--waveform-color)', muted: true },
    { id: 's1', type: 'subtitle', name: 'Arabic_Subtitles.srt', icon: <Type className="w-4 h-4" />, color: 'var(--warning)' },
  ];

  const handlePlayToggle = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-col w-full h-full bg-bgPrimary overflow-hidden flex-1 border-r border-borderColor">
      
      {/* Top Section: Video Preview Window */}
      <div className="h-[45%] border-b border-borderColor bg-black flex flex-col relative">
        <div className="flex-1 flex items-center justify-center relative overflow-hidden group">
          {/* Fake Video Player Screen */}
          <div className="w-full h-full max-w-4xl aspect-video bg-bgSecondary border border-borderColor/30 flex items-center justify-center relative shadow-2xl">
            <MonitorPlay className="w-16 h-16 text-textSecondary opacity-20" />
            
            {/* Mock Subtitle Overlay */}
            <div className="absolute bottom-6 w-full text-center">
              <span className="bg-black/70 text-white px-4 py-1.5 rounded text-lg font-medium tracking-wide">
               Welcome to the Video Dubbing Timeline 
              </span>
            </div>
          </div>
        </div>

        {/* Video Transport Controls */}
        <div className="h-12 bg-bgSecondary border-t border-borderColor flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-textSecondary hover:text-textPrimary rounded"><SkipBack className="w-4 h-4" /></button>
            <button onClick={handlePlayToggle} className="p-1.5 text-accentSecondary hover:text-white rounded">
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button className="p-1.5 text-textSecondary hover:text-textPrimary rounded"><SkipForward className="w-4 h-4" /></button>
            
            <div className="ml-4 font-mono text-sm text-textSecondary">
              <span className="text-textPrimary">{formatTimecode(playheadPos)}</span> / {formatTimecode(duration)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" icon={Mic} className="text-danger hover:text-danger hover:bg-danger/10">Dub</Button>
            <button className="p-1.5 text-textSecondary hover:text-textPrimary rounded"><Maximize className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Timeline Tracks */}
      <div className="flex-1 flex flex-col overflow-hidden bg-bgPrimary relative">
        
        {/* Playhead Line spanning tracks */}
        <div className="absolute top-0 bottom-0 w-px bg-accentSecondary z-20 left-[20%]" />
        
        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {tracks.map((track, idx) => (
            <div key={track.id} className="flex h-20 border-b border-borderColor group">
              
              {/* Track Header */}
              <div className="w-56 flex-shrink-0 bg-bgSecondary border-r border-borderColor p-2 flex flex-col justify-between">
                <div className="flex items-center gap-2 overflow-hidden text-textPrimary">
                  <span className="text-textSecondary">{track.icon}</span>
                  <span className="text-sm font-medium truncate">{track.name}</span>
                </div>
                
                <div className="flex items-center gap-1 mt-auto">
                  <button className={cn("flex-1 py-0.5 text-[10px] font-bold rounded", track.muted ? "bg-danger text-white" : "bg-bgPrimary text-textSecondary hover:text-textPrimary")}>M</button>
                  <button className="flex-1 py-0.5 text-[10px] font-bold rounded bg-bgPrimary text-textSecondary hover:text-textPrimary">S</button>
                  {track.type === 'audio' && <button className="flex-1 flex justify-center py-0.5 rounded bg-bgPrimary text-textSecondary"><Volume2 className="w-3 h-3" /></button>}
                </div>
              </div>

              {/* Track Lane (Clips Area) */}
              <div className="flex-1 relative bg-[#111] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik00MCAwSDBWNDBIMHoiLz48L2c+PC9zdmc+')]">
                
                {/* Mock Clip */}
                <div 
                  className="absolute top-1 bottom-1 rounded border border-black/30 overflow-hidden cursor-pointer hover:border-white/50 transition-colors"
                  style={{ left: '5%', width: '80%', backgroundColor: `${track.color}33` }}
                >
                  <div className="text-[10px] px-1 bg-black/50 text-white/80 truncate border-b border-black/20">{track.name}</div>
                  
                  {/* Visual indication based on track type */}
                  {track.type === 'video' && (
                    <div className="absolute inset-0 top-4 flex items-center justify-around opacity-50 px-2">
                      {[1,2,3,4,5,6].map(i => <div key={i} className="h-4/5 aspect-[4/3] bg-black/50 rounded-sm border border-white/10" />)}
                    </div>
                  )}
                  {track.type === 'subtitle' && (
                    <div className="absolute inset-0 top-4 flex items-center px-4 gap-4">
                      <div className="h-3 w-20 bg-warning/50 rounded-full" />
                      <div className="h-3 w-32 bg-warning/50 rounded-full" />
                      <div className="h-3 w-16 bg-warning/50 rounded-full" />
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

---

## الملف: `frontend\src\store\useAIJobStore.js`

```javascript
import { create } from 'zustand';

export const useAIJobStore = create((set) => ({
  // Job State
  activeJob: null, // { id, type, title }
  isProcessing: false,
  progress: 0,
  currentStage: '',
  eta: null, // in seconds

  // Actions
  startJob: (jobDetails) => set({
    activeJob: jobDetails,
    isProcessing: true,
    progress: 0,
    currentStage: 'Initializing models...',
    eta: 'Calculating...'
  }),

  updateProgress: (progress, stage, eta) => set({
    progress,
    currentStage: stage,
    eta
  }),

  completeJob: () => set({
    isProcessing: false,
    progress: 100,
    currentStage: 'Completed successfully!',
    eta: 0
  }),

  cancelJob: () => set({
    activeJob: null,
    isProcessing: false,
    progress: 0,
    currentStage: '',
    eta: null
  }),
}));
```

---

## الملف: `frontend\src\store\useEffectsStore.js`

```javascript
import { create } from 'zustand';

export const useEffectsStore = create((set) => ({
  // Active track being edited in the rack
  activeTrackId: 'track_1', 
  
  // Store effects per track: { track_1: [effect1, effect2], track_2: [] }
  trackEffects: {
    'track_1': [
      { id: 'eff_1', name: 'Compressor', category: 'amplitude_compression', bypass: false, locked: false, isAi: false },
      { id: 'eff_2', name: 'DeepFilterNet3', category: 'noise_reduction', bypass: false, locked: true, isAi: true }
    ]
  },
  
  // State for the Effect Window Modal
  editingEffect: null, // Holds the effect object currently being edited

  // Actions
  setActiveTrack: (trackId) => set({ activeTrackId: trackId }),
  
  addEffect: (trackId, effect) => set((state) => ({
    trackEffects: {
      ...state.trackEffects,
      [trackId]: [...(state.trackEffects[trackId] || []), effect]
    }
  })),

  removeEffect: (trackId, effectId) => set((state) => ({
    trackEffects: {
      ...state.trackEffects,
      [trackId]: state.trackEffects[trackId].filter(e => e.id !== effectId)
    }
  })),

  toggleBypass: (trackId, effectId) => set((state) => ({
    trackEffects: {
      ...state.trackEffects,
      [trackId]: state.trackEffects[trackId].map(e => 
        e.id === effectId ? { ...e, bypass: !e.bypass } : e
      )
    }
  })),

  toggleLock: (trackId, effectId) => set((state) => ({
    trackEffects: {
      ...state.trackEffects,
      [trackId]: state.trackEffects[trackId].map(e => 
        e.id === effectId ? { ...e, locked: !e.locked } : e
      )
    }
  })),

  openEffectEditor: (effect) => set({ editingEffect: effect }),
  closeEffectEditor: () => set({ editingEffect: null }),
}));
```

---

## الملف: `frontend\src\store\useTimelineStore.js`

```javascript
import { create } from 'zustand';

export const useTimelineStore = create((set) => ({
  // Playback & View State
  isPlaying: false,
  playheadPosition: 0, // in seconds
  zoomLevel: 100, // percentage
  duration: 180, // total timeline duration in seconds (3 mins for demo)

  // Tracks State
  tracks: [
    { 
      id: 'track_1', 
      name: 'Voiceover', 
      icon: '🎙️', 
      isMuted: false, 
      isSolo: false, 
      isArmed: false, 
      volume: 0, 
      pan: 0,
      clips: [
        { id: 'clip_1', name: 'Voiceover.wav', startTime: 0, duration: 150, color: 'var(--waveform-color)' }
      ]
    },
    { 
      id: 'track_2', 
      name: 'Background Music', 
      icon: '🎵', 
      isMuted: false, 
      isSolo: false, 
      isArmed: false, 
      volume: -12, 
      pan: 0,
      clips: [
        { id: 'clip_2', name: 'Ambient_Bg.mp3', startTime: 0, duration: 105, color: 'var(--accent-secondary)' }
      ]
    },
    { 
      id: 'track_3', 
      name: 'SFX Track', 
      icon: '🔊', 
      isMuted: false, 
      isSolo: false, 
      isArmed: false, 
      volume: 0, 
      pan: 0,
      clips: [
        { id: 'clip_3', name: 'Explosion.wav', startTime: 60, duration: 8, color: 'var(--warning)' }
      ]
    }
  ],

  // Actions
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setZoomLevel: (level) => set({ zoomLevel: level }),
  setPlayheadPosition: (pos) => set({ playheadPosition: pos }),
  
  // Track Actions
  toggleTrackMute: (trackId) => set((state) => ({
    tracks: state.tracks.map(t => t.id === trackId ? { ...t, isMuted: !t.isMuted } : t)
  })),
  toggleTrackSolo: (trackId) => set((state) => ({
    tracks: state.tracks.map(t => t.id === trackId ? { ...t, isSolo: !t.isSolo } : t)
  })),
}));
```

---

## الملف: `frontend\src\utils\classNames.js`

```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

---

## الملف: `frontend\src\utils\timeUtils.js`

```javascript
/**
 * Formats seconds into HH:MM:SS.mmm or MM:SS.mmm
 * @param {number} totalSeconds - Time in seconds (can include decimals)
 * @returns {string} Formatted timecode
 */
export const formatTimecode = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds % 1) * 1000);

  const pad = (num, size = 2) => num.toString().padStart(size, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
};
```

---

## الملف: `gateway\.env`

```text
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ore-dake
REDIS_HOST=localhost
REDIS_PORT=6379
FRONTEND_URL=http://localhost:3000
AI_ENGINE_URL=http://localhost:8000
```

---

## الملف: `gateway\Dockerfile`

```text
# Use Node.js 20 instead of 18
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

---

## الملف: `gateway\package-lock.json`

```json
{
  "name": "gateway",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "gateway",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "axios": "^1.18.1",
        "bcrypt": "^6.0.0",
        "bullmq": "^5.79.3",
        "cors": "^2.8.6",
        "dotenv": "^17.4.2",
        "express": "^5.2.1",
        "helmet": "^8.2.0",
        "ioredis": "^5.11.1",
        "jsonwebtoken": "^9.0.3",
        "mongoose": "^9.7.4",
        "morgan": "^1.11.0",
        "multer": "^2.2.0",
        "socket.io": "^4.8.3"
      },
      "devDependencies": {
        "nodemon": "^3.1.14"
      }
    },
    "node_modules/@ioredis/commands": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@ioredis/commands/-/commands-1.10.0.tgz",
      "integrity": "sha512-UmeW7z4LfctwoQ5wkhVzgq8tXkreED2xZGpX+Bg+zA+WJFZCT6c062AfCK/Dfk81xZnnwdhJCUMkitihRaoC2Q==",
      "license": "MIT"
    },
    "node_modules/@mongodb-js/saslprep": {
      "version": "1.4.12",
      "resolved": "https://registry.npmjs.org/@mongodb-js/saslprep/-/saslprep-1.4.12.tgz",
      "integrity": "sha512-QAfAMwNgnYxZ2C6D1HgeP7Gc4i/uvJRim415PCIL9ptRxWMNbWeLBYb2/9R4pGKny/s1FVu2JA2cxCUBUOggrA==",
      "license": "MIT",
      "dependencies": {
        "sparse-bitfield": "^3.0.3"
      }
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-darwin-arm64": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-darwin-arm64/-/msgpackr-extract-darwin-arm64-3.0.4.tgz",
      "integrity": "sha512-LCkGo6JDfaBhgST7UpPWgNgLINpcpabaHfyz5OBx75nUYxBsaEPxjnyNjWpeb/xBup/682QnBfRBy2/LvPutZQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-darwin-x64": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-darwin-x64/-/msgpackr-extract-darwin-x64-3.0.4.tgz",
      "integrity": "sha512-zExlW9zUJKZH/tOtVMttwjKa4Xm/3KcNjnE3dPN92uCktwavMxpgCA3MoJK/DOnTWsQgo224OaST27/mPNAf+w==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-linux-arm": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-arm/-/msgpackr-extract-linux-arm-3.0.4.tgz",
      "integrity": "sha512-Tg3yX65f5GbtXLkrYEHE5oibZG9epyYWas7FogTTEJeDEF9JlXJzKgXaNhT3UXlTOeA+AfZpYZYZ0uPj7Cfquw==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-linux-arm64": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-arm64/-/msgpackr-extract-linux-arm64-3.0.4.tgz",
      "integrity": "sha512-dgX0P/9wGPJeHFBG+ZmhgE6bmtMt7NP5CRBGyyktpopdk/mW4POnrpQsSLtKI1dwpc+pPLuXHDh6vvskyQE/sw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-linux-x64": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-x64/-/msgpackr-extract-linux-x64-3.0.4.tgz",
      "integrity": "sha512-8TNXMEjJc3QEy7R/x1INhgiU+XakDAFUzBhaz7+Rbrs8NH5UQeHQxxmzsSBJGyV6I1jW79undiQm8tOI+D+8FQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-win32-x64": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-win32-x64/-/msgpackr-extract-win32-x64-3.0.4.tgz",
      "integrity": "sha512-CmCXPQrkbwExx3j946/PtHWHbYJiCRBRDl4BlkRQcJB/YOwQxJRTpoo7aTsortjgoJ1x7opzTSxn7C+ASSLVjQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@socket.io/component-emitter": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@socket.io/component-emitter/-/component-emitter-3.1.2.tgz",
      "integrity": "sha512-9BCxFwvbGg/RsZK9tjXd8s4UcwR0MWeFQ1XEKIQVVvAGJyINdrqKMcTRyLoK8Rse1GjzLV9cwjWV1olXRWEXVA==",
      "license": "MIT"
    },
    "node_modules/@standard-schema/spec": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/spec/-/spec-1.1.0.tgz",
      "integrity": "sha512-l2aFy5jALhniG5HgqrD6jXLi/rUWrKvqN/qJx6yoJsgKhblVd+iqqU4RCXavm/jPityDo5TCvKMnpjKnOriy0w==",
      "license": "MIT"
    },
    "node_modules/@types/cors": {
      "version": "2.8.19",
      "resolved": "https://registry.npmjs.org/@types/cors/-/cors-2.8.19.tgz",
      "integrity": "sha512-mFNylyeyqN93lfe/9CSxOGREz8cpzAhH+E93xJ4xWQf62V8sQ/24reV2nyzUWM6H6Xji+GGHpkbLe7pVoUEskg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/node": {
      "version": "26.1.1",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-26.1.1.tgz",
      "integrity": "sha512-nxAkRSVkN1Y0JC1W8ky/fTfkGsMmcrRsbx+3XoZE+rMOX71kLYTV7fLXpqud1GpbpP5TuffXFqfX7fH2GgZREw==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~8.3.0"
      }
    },
    "node_modules/@types/webidl-conversions": {
      "version": "7.0.3",
      "resolved": "https://registry.npmjs.org/@types/webidl-conversions/-/webidl-conversions-7.0.3.tgz",
      "integrity": "sha512-CiJJvcRtIgzadHCYXw7dqEnMNRjhGZlYK05Mj9OyktqV8uVT8fD2BFOB7S1uwBE3Kj2Z+4UyPmFw/Ixgw/LAlA==",
      "license": "MIT"
    },
    "node_modules/@types/whatwg-url": {
      "version": "13.0.0",
      "resolved": "https://registry.npmjs.org/@types/whatwg-url/-/whatwg-url-13.0.0.tgz",
      "integrity": "sha512-N8WXpbE6Wgri7KUSvrmQcqrMllKZ9uxkYWMt+mCSGwNc0Hsw9VQTW7ApqI4XNrx6/SaM2QQJCzMPDEXE058s+Q==",
      "license": "MIT",
      "dependencies": {
        "@types/webidl-conversions": "*"
      }
    },
    "node_modules/@types/ws": {
      "version": "8.18.1",
      "resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.1.tgz",
      "integrity": "sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "^3.0.0",
        "negotiator": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/agent-base": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-6.0.2.tgz",
      "integrity": "sha512-RZNwNclF7+MS/8bDg70amg32dyeZGZxiDuQmZxKLAlQjr3jGyLx+4Kkk58UO7D2QdgFIQCovuSuZESne6RG6XQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "4"
      },
      "engines": {
        "node": ">= 6.0.0"
      }
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/append-field": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/append-field/-/append-field-1.0.0.tgz",
      "integrity": "sha512-klpgFSWLW1ZEs8svjfb7g4qWY0YS5imI82dTg+QahUvJ8YqAY0P10Uk8tTyh9ZGuYEZEMaeJYCF5BFuX552hsw==",
      "license": "MIT"
    },
    "node_modules/asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q==",
      "license": "MIT"
    },
    "node_modules/axios": {
      "version": "1.18.1",
      "resolved": "https://registry.npmjs.org/axios/-/axios-1.18.1.tgz",
      "integrity": "sha512-3nTvFlvpn9Zu/RkHUqtc7/+al4UpRW5az71ap5zccp6e8RAYEzhMTecX8Dz1wWDYrPpUoB1HAQEGEAEvUr7S9g==",
      "license": "MIT",
      "dependencies": {
        "follow-redirects": "^1.16.0",
        "form-data": "^4.0.5",
        "https-proxy-agent": "^5.0.1",
        "proxy-from-env": "^2.1.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/base64id": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/base64id/-/base64id-2.0.0.tgz",
      "integrity": "sha512-lGe34o6EHj9y3Kts9R4ZYs/Gr+6N7MCaMlIFA3F1R2O5/m7K06AxfSeO5530PEERE6/WyEg3lsuyw4GHlPZHog==",
      "license": "MIT",
      "engines": {
        "node": "^4.5.0 || >= 5.9"
      }
    },
    "node_modules/basic-auth": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/basic-auth/-/basic-auth-2.0.1.tgz",
      "integrity": "sha512-NF+epuEdnUYVlGuhaxbbq+dvJttwLnGY+YixlXlME5KpQ5W3CnXA5cVTneY3SPbPDRkcjMbifrwmFYcClgOZeg==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "5.1.2"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/basic-auth/node_modules/safe-buffer": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
      "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g==",
      "license": "MIT"
    },
    "node_modules/bcrypt": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/bcrypt/-/bcrypt-6.0.0.tgz",
      "integrity": "sha512-cU8v/EGSrnH+HnxV2z0J7/blxH8gq7Xh2JFT6Aroax7UohdmiJJlxApMxtKfuI7z68NvvVcmR78k2LbT6efhRg==",
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "node-addon-api": "^8.3.0",
        "node-gyp-build": "^4.8.4"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/body-parser": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.3.0.tgz",
      "integrity": "sha512-2cGmJupaNgg+QUwVLAucDuWuoMZ6EX9iHDRswZ5lsNYEmwPaRknMPCLZz07yTzVq/83p4o/wzbDZbBrTvGGTIw==",
      "license": "MIT",
      "dependencies": {
        "bytes": "^3.1.2",
        "content-type": "^2.0.0",
        "debug": "^4.4.3",
        "http-errors": "^2.0.1",
        "iconv-lite": "^0.7.2",
        "on-finished": "^2.4.1",
        "qs": "^6.15.2",
        "raw-body": "^3.0.2",
        "type-is": "^2.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/body-parser/node_modules/content-type": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-2.0.0.tgz",
      "integrity": "sha512-j/O/d7GcZCyNl7/hwZAb606rzqkyvaDctLmckbxLzHvFBzTJHuGEdodATcP3yIRoDrLHkIATJuvzbFlp/ki2cQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/brace-expansion": {
      "version": "5.0.7",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.7.tgz",
      "integrity": "sha512-7oFy703dxfY3/NLxC1fh2SUCQ0H9rmAY+5EpDVfXjUTTs+HEwR2nYaqLv+GWcTsumwxPfiz6CzCNkwXwBUwqCA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/bson": {
      "version": "7.3.1",
      "resolved": "https://registry.npmjs.org/bson/-/bson-7.3.1.tgz",
      "integrity": "sha512-h/C0qe6857pQhcSJHLfsR1uYGj98Ge3wKAD3Ed9KqH3wcVh+BM4Jq4xISD7vs9OPuT07n+q3QQVjslJ286j6ag==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=20.19.0"
      }
    },
    "node_modules/buffer-equal-constant-time": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
      "integrity": "sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA==",
      "license": "BSD-3-Clause"
    },
    "node_modules/buffer-from": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz",
      "integrity": "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==",
      "license": "MIT"
    },
    "node_modules/bullmq": {
      "version": "5.79.3",
      "resolved": "https://registry.npmjs.org/bullmq/-/bullmq-5.79.3.tgz",
      "integrity": "sha512-ol/zGeYw1AOKVWCgqGbElGAcvpO8ijc0qmTigXveEBOh+6yCiSwAG3ISI8zYW9Yu3sijnt58O/3JNtJGUYebLA==",
      "license": "MIT",
      "dependencies": {
        "cron-parser": "4.9.0",
        "ioredis": "5.10.1",
        "msgpackr": "2.0.4",
        "node-abort-controller": "3.1.1",
        "semver": "7.8.5",
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=12.22.0"
      },
      "peerDependencies": {
        "redis": ">=5.0.0"
      },
      "peerDependenciesMeta": {
        "redis": {
          "optional": true
        }
      }
    },
    "node_modules/bullmq/node_modules/@ioredis/commands": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/@ioredis/commands/-/commands-1.5.1.tgz",
      "integrity": "sha512-JH8ZL/ywcJyR9MmJ5BNqZllXNZQqQbnVZOqpPQqE1vHiFgAw4NHbvE0FOduNU8IX9babitBT46571OnPTT0Zcw==",
      "license": "MIT"
    },
    "node_modules/bullmq/node_modules/ioredis": {
      "version": "5.10.1",
      "resolved": "https://registry.npmjs.org/ioredis/-/ioredis-5.10.1.tgz",
      "integrity": "sha512-HuEDBTI70aYdx1v6U97SbNx9F1+svQKBDo30o0b9fw055LMepzpOOd0Ccg9Q6tbqmBSJaMuY0fB7yw9/vjBYCA==",
      "license": "MIT",
      "dependencies": {
        "@ioredis/commands": "1.5.1",
        "cluster-key-slot": "^1.1.0",
        "debug": "^4.3.4",
        "denque": "^2.1.0",
        "lodash.defaults": "^4.2.0",
        "lodash.isarguments": "^3.1.0",
        "redis-errors": "^1.2.0",
        "redis-parser": "^3.0.0",
        "standard-as-callback": "^2.1.0"
      },
      "engines": {
        "node": ">=12.22.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/ioredis"
      }
    },
    "node_modules/busboy": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
      "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
      "dependencies": {
        "streamsearch": "^1.1.0"
      },
      "engines": {
        "node": ">=10.16.0"
      }
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/cluster-key-slot": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cluster-key-slot/-/cluster-key-slot-1.1.1.tgz",
      "integrity": "sha512-rwHwUfXL40Chm1r08yrhU3qpUvdVlgkKNeyeGPOxnW8/SyVDvgRaed/Uz54AqWNaTCAThlj6QAs3TZcKI0xDEw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "license": "MIT",
      "dependencies": {
        "delayed-stream": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/concat-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-2.0.0.tgz",
      "integrity": "sha512-MWufYdFw53ccGjCA+Ol7XJYpAlW6/prSMzuPOTRnJGcGzuhLn4Scrz7qf6o8bROZ514ltazcIFJZevcfbo0x7A==",
      "engines": [
        "node >= 6.0"
      ],
      "license": "MIT",
      "dependencies": {
        "buffer-from": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^3.0.2",
        "typedarray": "^0.0.6"
      }
    },
    "node_modules/content-disposition": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.1.0.tgz",
      "integrity": "sha512-5jRCH9Z/+DRP7rkvY83B+yGIGX96OYdJmzngqnw2SBSxqCFPd0w2km3s5iawpGX8krnwSGmF0FW5Nhr0Hfai3g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.6.0"
      }
    },
    "node_modules/cors": {
      "version": "2.8.6",
      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.6.tgz",
      "integrity": "sha512-tJtZBBHA6vjIAaF6EnIaq6laBBP9aq/Y3ouVJjEfoHbRBcHBAHYcMh/w8LDrk2PvIMMq8gmopa5D4V8RmbrxGw==",
      "license": "MIT",
      "dependencies": {
        "object-assign": "^4",
        "vary": "^1"
      },
      "engines": {
        "node": ">= 0.10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/cron-parser": {
      "version": "4.9.0",
      "resolved": "https://registry.npmjs.org/cron-parser/-/cron-parser-4.9.0.tgz",
      "integrity": "sha512-p0SaNjrHOnQeR8/VnfGbmg9te2kfyYSQ7Sc/j/6DtPL3JQvKxmjO9TSjNFpujqV3vEYYBvNNvXSxzyksBWAx1Q==",
      "license": "MIT",
      "dependencies": {
        "luxon": "^3.2.1"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/denque": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/denque/-/denque-2.1.0.tgz",
      "integrity": "sha512-HVQE3AAb/pxF8fQAoiqpvg9i3evqug3hoiwakOyZAwJm+6vZehbkYXZ0l4JxS+I3QxM97v5aaRNhj8v5oBhekw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/dotenv": {
      "version": "17.4.2",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-17.4.2.tgz",
      "integrity": "sha512-nI4U3TottKAcAD9LLud4Cb7b2QztQMUEfHbvhTH09bqXTxnSie8WnjPALV/WMCrJZ6UV/qHJ6L03OqO3LcdYZw==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ecdsa-sig-formatter": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
      "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/engine.io": {
      "version": "6.6.9",
      "resolved": "https://registry.npmjs.org/engine.io/-/engine.io-6.6.9.tgz",
      "integrity": "sha512-clKkw4C7nJ22mGgoVcCg6V/W/TxdNyIOTr89k2ONZu81qqkddPFDF0LXcbAwhzPD8DjkiRCjzuiO6Y+fkpD4vg==",
      "license": "MIT",
      "dependencies": {
        "@types/cors": "^2.8.12",
        "@types/node": ">=10.0.0",
        "@types/ws": "^8.5.12",
        "accepts": "~1.3.4",
        "base64id": "2.0.0",
        "cookie": "~0.7.2",
        "cors": "~2.8.5",
        "debug": "~4.4.1",
        "engine.io-parser": "~5.2.1",
        "ws": "~8.21.0"
      },
      "engines": {
        "node": ">=10.2.0"
      }
    },
    "node_modules/engine.io-parser": {
      "version": "5.2.3",
      "resolved": "https://registry.npmjs.org/engine.io-parser/-/engine.io-parser-5.2.3.tgz",
      "integrity": "sha512-HqD3yTBfnBxIrbnM1DoD6Pcq8NECnh8d4As1Qgh0z5Gg3jRRIqijury0CL3ghu/edArpUYiYqQiDUQBIs4np3Q==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/engine.io/node_modules/accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/engine.io/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/engine.io/node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/engine.io/node_modules/negotiator": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.2.tgz",
      "integrity": "sha512-HWcBoN6NileqtSydK2FqHbS/LoDd2pqrnQHLyJzBj4kOp/ky2MWMN694xOfkK8/SnUsW2DH7EfyVlydKCsm1Zw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/express": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/express/-/express-5.2.1.tgz",
      "integrity": "sha512-hIS4idWWai69NezIdRt2xFVofaF4j+6INOpJlVOLDO8zXGpUVEVzIYk12UUi2JzjEzWL3IOAxcTubgz9Po0yXw==",
      "license": "MIT",
      "dependencies": {
        "accepts": "^2.0.0",
        "body-parser": "^2.2.1",
        "content-disposition": "^1.0.0",
        "content-type": "^1.0.5",
        "cookie": "^0.7.1",
        "cookie-signature": "^1.2.1",
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "finalhandler": "^2.1.0",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "merge-descriptors": "^2.0.0",
        "mime-types": "^3.0.0",
        "on-finished": "^2.4.1",
        "once": "^1.4.0",
        "parseurl": "^1.3.3",
        "proxy-addr": "^2.0.7",
        "qs": "^6.14.0",
        "range-parser": "^1.2.1",
        "router": "^2.2.0",
        "send": "^1.1.0",
        "serve-static": "^2.2.0",
        "statuses": "^2.0.1",
        "type-is": "^2.0.1",
        "vary": "^1.1.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/finalhandler": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.1.tgz",
      "integrity": "sha512-S8KoZgRZN+a5rNwqTxlZZePjT/4cnm0ROV70LedRHZ0p8u9fRID0hJUZQpkKLzro8LfmC8sx23bY6tVNxv8pQA==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "on-finished": "^2.4.1",
        "parseurl": "^1.3.3",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/follow-redirects": {
      "version": "1.16.0",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.16.0.tgz",
      "integrity": "sha512-y5rN/uOsadFT/JfYwhxRS5R7Qce+g3zG97+JrtFZlC9klX/W5hD7iiLzScI4nZqUS7DNUdhPgw4xI8W2LuXlUw==",
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/RubenVerborgh"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=4.0"
      },
      "peerDependenciesMeta": {
        "debug": {
          "optional": true
        }
      }
    },
    "node_modules/form-data": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.6.tgz",
      "integrity": "sha512-vKatAh4SlVfgbv+YtmhiRjhEMJsYpsG1Y2rMQtR+SVSbytsSD1YGzDIcrAJmdFec88u/+VoGmxnl+80gL1tRCQ==",
      "license": "MIT",
      "dependencies": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "es-set-tostringtag": "^2.1.0",
        "hasown": "^2.0.4",
        "mime-types": "^2.1.35"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/form-data/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/form-data/node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fresh": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-flag": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
      "integrity": "sha512-sKJf1+ceQBr4SMkvQnBDNDtf4TXpVhVGateu0t918bl30FnbE2m4vNLX+VWe/dpjlb+HugGYzW7uQXH98HPEYw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/helmet": {
      "version": "8.2.0",
      "resolved": "https://registry.npmjs.org/helmet/-/helmet-8.2.0.tgz",
      "integrity": "sha512-DRgTIUgnWcJ62KyarxxziuqYxKGnR6Rgg19BlbucN/dpmJbl1XOit6qvoOX0ZT+HhWe5OUVhU/a1zpGyc1xA0Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/EvanHahn"
      }
    },
    "node_modules/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "~2.0.0",
        "inherits": "~2.0.4",
        "setprototypeof": "~1.2.0",
        "statuses": "~2.0.2",
        "toidentifier": "~1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/https-proxy-agent": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-5.0.1.tgz",
      "integrity": "sha512-dFcAjpTQFgoLMzC2VwU+C/CbS7uRL0lWmxDITmqm7C+7F0Odmj6s9l6alZc6AELXhrnggM2CeWSXHGOdX2YtwA==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "6",
        "debug": "4"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.7.3",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.3.tgz",
      "integrity": "sha512-IKXpvIzjnC9XTAUbVBcMfGS0EPaIXtW6v+zr+RRp+hqULEpo0owZax6wyRwPOJbWbzjYspQwusTsfVr0ifh4uQ==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/ignore-by-default": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/ignore-by-default/-/ignore-by-default-1.0.1.tgz",
      "integrity": "sha512-Ius2VYcGNk7T90CppJqcIkS5ooHUZyIQK+ClZfMfMNFEF9VSE73Fq+906u/CWu92x4gzZMWOwfFYckPObzdEbA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/ioredis": {
      "version": "5.11.1",
      "resolved": "https://registry.npmjs.org/ioredis/-/ioredis-5.11.1.tgz",
      "integrity": "sha512-ehuGcf94bQXhfagULNXrJdfnWO38v070jxSx/qE87Kjzmu2fU7ro5EFAb+OPituLqgfyuQaym5DlrNydW2sJ9A==",
      "license": "MIT",
      "dependencies": {
        "@ioredis/commands": "1.10.0",
        "cluster-key-slot": "1.1.1",
        "debug": "4.4.3",
        "denque": "2.1.0",
        "redis-errors": "1.2.0",
        "redis-parser": "3.0.0",
        "standard-as-callback": "2.1.0"
      },
      "engines": {
        "node": ">=12.22.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/ioredis"
      }
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-promise": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
      "license": "MIT"
    },
    "node_modules/jsonwebtoken": {
      "version": "9.0.3",
      "resolved": "https://registry.npmjs.org/jsonwebtoken/-/jsonwebtoken-9.0.3.tgz",
      "integrity": "sha512-MT/xP0CrubFRNLNKvxJ2BYfy53Zkm++5bX9dtuPbqAeQpTVe0MQTFhao8+Cp//EmJp244xt6Drw/GVEGCUj40g==",
      "license": "MIT",
      "dependencies": {
        "jws": "^4.0.1",
        "lodash.includes": "^4.3.0",
        "lodash.isboolean": "^3.0.3",
        "lodash.isinteger": "^4.0.4",
        "lodash.isnumber": "^3.0.3",
        "lodash.isplainobject": "^4.0.6",
        "lodash.isstring": "^4.0.1",
        "lodash.once": "^4.0.0",
        "ms": "^2.1.1",
        "semver": "^7.5.4"
      },
      "engines": {
        "node": ">=12",
        "npm": ">=6"
      }
    },
    "node_modules/jwa": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/jwa/-/jwa-2.0.1.tgz",
      "integrity": "sha512-hRF04fqJIP8Abbkq5NKGN0Bbr3JxlQ+qhZufXVr0DvujKy93ZCbXZMHDL4EOtodSbCWxOqR8MS1tXA5hwqCXDg==",
      "license": "MIT",
      "dependencies": {
        "buffer-equal-constant-time": "^1.0.1",
        "ecdsa-sig-formatter": "1.0.11",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/jws": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/jws/-/jws-4.0.1.tgz",
      "integrity": "sha512-EKI/M/yqPncGUUh44xz0PxSidXFr/+r0pA70+gIYhjv+et7yxM+s29Y+VGDkovRofQem0fs7Uvf4+YmAdyRduA==",
      "license": "MIT",
      "dependencies": {
        "jwa": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/kareem": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/kareem/-/kareem-3.3.0.tgz",
      "integrity": "sha512-kpSuLD3/7RenBnjnJdOHXCKC8dTd1JzeOiJhN0necWWci6cC+qX+VuwPnMVgb+a4+KNJSfgqahpnfWaeDXCimw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/lodash.defaults": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/lodash.defaults/-/lodash.defaults-4.2.0.tgz",
      "integrity": "sha512-qjxPLHd3r5DnsdGacqOMU6pb/avJzdh9tFX2ymgoZE27BmjXrNy/y4LoaiTeAb+O3gL8AfpJGtqfX/ae2leYYQ==",
      "license": "MIT"
    },
    "node_modules/lodash.includes": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.includes/-/lodash.includes-4.3.0.tgz",
      "integrity": "sha512-W3Bx6mdkRTGtlJISOvVD/lbqjTlPPUDTMnlXZFnVwi9NKJ6tiAk6LVdlhZMm17VZisqhKcgzpO5Wz91PCt5b0w==",
      "license": "MIT"
    },
    "node_modules/lodash.isarguments": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/lodash.isarguments/-/lodash.isarguments-3.1.0.tgz",
      "integrity": "sha512-chi4NHZlZqZD18a0imDHnZPrDeBbTtVN7GXMwuGdRH9qotxAjYs3aVLKc7zNOG9eddR5Ksd8rvFEBc9SsggPpg==",
      "license": "MIT"
    },
    "node_modules/lodash.isboolean": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isboolean/-/lodash.isboolean-3.0.3.tgz",
      "integrity": "sha512-Bz5mupy2SVbPHURB98VAcw+aHh4vRV5IPNhILUCsOzRmsTmSQ17jIuqopAentWoehktxGd9e/hbIXq980/1QJg==",
      "license": "MIT"
    },
    "node_modules/lodash.isinteger": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/lodash.isinteger/-/lodash.isinteger-4.0.4.tgz",
      "integrity": "sha512-DBwtEWN2caHQ9/imiNeEA5ys1JoRtRfY3d7V9wkqtbycnAmTvRRmbHKDV4a0EYc678/dia0jrte4tjYwVBaZUA==",
      "license": "MIT"
    },
    "node_modules/lodash.isnumber": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isnumber/-/lodash.isnumber-3.0.3.tgz",
      "integrity": "sha512-QYqzpfwO3/CWf3XP+Z+tkQsfaLL/EnUlXWVkIk5FUPc4sBdTehEqZONuyRt2P67PXAk+NXmTBcc97zw9t1FQrw==",
      "license": "MIT"
    },
    "node_modules/lodash.isplainobject": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/lodash.isplainobject/-/lodash.isplainobject-4.0.6.tgz",
      "integrity": "sha512-oSXzaWypCMHkPC3NvBEaPHf0KsA5mvPrOPgQWDsbg8n7orZ290M0BmC/jgRZ4vcJ6DTAhjrsSYgdsW/F+MFOBA==",
      "license": "MIT"
    },
    "node_modules/lodash.isstring": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/lodash.isstring/-/lodash.isstring-4.0.1.tgz",
      "integrity": "sha512-0wJxfxH1wgO3GrbuP+dTTk7op+6L41QCXbGINEmD+ny/G/eCqGzxyCsh7159S+mgDDcoarnBw6PC1PS5+wUGgw==",
      "license": "MIT"
    },
    "node_modules/lodash.once": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.once/-/lodash.once-4.1.1.tgz",
      "integrity": "sha512-Sb487aTOCr9drQVL8pIxOzVhafOjZN9UU54hiN8PU3uAiSV7lx1yYNpbNmex2PK6dSJoNTSJUUswT651yww3Mg==",
      "license": "MIT"
    },
    "node_modules/luxon": {
      "version": "3.7.2",
      "resolved": "https://registry.npmjs.org/luxon/-/luxon-3.7.2.tgz",
      "integrity": "sha512-vtEhXh/gNjI9Yg1u4jX/0YVPMvxzHuGgCm6tC5kZyb08yjGWGnqAjGJvcXbqQR2P3MyMEFnRbpcdFS6PBcLqew==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.0.tgz",
      "integrity": "sha512-aisnrDP4GNe06UcKFnV5bfMNPBUw4jsLGaWwWfnH3v02GnBuXX2MCVn5RbrWo0j3pczUilYblq7fQ7Nw2t5XKw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/memory-pager": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/memory-pager/-/memory-pager-1.5.0.tgz",
      "integrity": "sha512-ZS4Bp4r/Zoeq6+NLJpP+0Zzm0pR8whtGPf1XExKLJBAczGMnSi3It14OiNCStjQjM6NU1okjQGSxgEZN8eBYKg==",
      "license": "MIT"
    },
    "node_modules/merge-descriptors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.2.tgz",
      "integrity": "sha512-Lbgzdk0h4juoQ9fCKXW4by0UJqj+nOOrI9MJ1sSj4nI8aI2eo1qmvQEie4VD1glsS250n15LsWsYtCugiStS5A==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "^1.54.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/minimatch": {
      "version": "10.2.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.5.tgz",
      "integrity": "sha512-MULkVLfKGYDFYejP07QOurDLLQpcjk7Fw+7jXS2R2czRQzR56yHRveU5NDJEOviH+hETZKSkIk5c+T23GjFUMg==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.5"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/mongodb": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/mongodb/-/mongodb-7.2.0.tgz",
      "integrity": "sha512-F/2+BMZtLVhY30ioZp0dAmZ+IRZMBqI+nrv6t5+9/1AIwCa8sMRC3jBf81lpxMhnZgqq8CoUD503Z1oZWq1/sw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@mongodb-js/saslprep": "^1.3.0",
        "bson": "^7.2.0",
        "mongodb-connection-string-url": "^7.0.0"
      },
      "engines": {
        "node": ">=20.19.0"
      },
      "peerDependencies": {
        "@aws-sdk/credential-providers": "^3.806.0",
        "@mongodb-js/zstd": "^7.0.0",
        "gcp-metadata": "^7.0.1",
        "kerberos": "^7.0.0",
        "mongodb-client-encryption": ">=7.0.0 <7.1.0",
        "snappy": "^7.3.2",
        "socks": "^2.8.6"
      },
      "peerDependenciesMeta": {
        "@aws-sdk/credential-providers": {
          "optional": true
        },
        "@mongodb-js/zstd": {
          "optional": true
        },
        "gcp-metadata": {
          "optional": true
        },
        "kerberos": {
          "optional": true
        },
        "mongodb-client-encryption": {
          "optional": true
        },
        "snappy": {
          "optional": true
        },
        "socks": {
          "optional": true
        }
      }
    },
    "node_modules/mongodb-connection-string-url": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/mongodb-connection-string-url/-/mongodb-connection-string-url-7.0.1.tgz",
      "integrity": "sha512-h0AZ9A7IDVwwHyMxmdMXKy+9oNlF0zFoahHiX3vQ8e3KFcSP3VmsmfvtRSuLPxmyv2vjIDxqty8smTgie/SNRQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@types/whatwg-url": "^13.0.0",
        "whatwg-url": "^14.1.0"
      },
      "engines": {
        "node": ">=20.19.0"
      }
    },
    "node_modules/mongoose": {
      "version": "9.7.4",
      "resolved": "https://registry.npmjs.org/mongoose/-/mongoose-9.7.4.tgz",
      "integrity": "sha512-nuSYGUWWzNd4EAbGYxE469wPTL+kmxb5+91YvCvMkJ08rvNRht/usZUU3LuFuk7rDutF2QWBZHPHuzM8TxXApA==",
      "license": "MIT",
      "dependencies": {
        "@standard-schema/spec": "^1.1.0",
        "kareem": "3.3.0",
        "mongodb": "~7.2",
        "mpath": "0.9.0",
        "mquery": "6.0.0",
        "ms": "2.1.3",
        "sift": "17.1.3"
      },
      "engines": {
        "node": ">=20.19.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mongoose"
      }
    },
    "node_modules/morgan": {
      "version": "1.11.0",
      "resolved": "https://registry.npmjs.org/morgan/-/morgan-1.11.0.tgz",
      "integrity": "sha512-zSkVu3t18r39pw4ixfBKvfZi3y2UOqr7d4WYwcj3m8nXpEQK4rPO6GLzs/CExoRgmX3y9EjmmcXqv6jq0SK46g==",
      "license": "MIT",
      "dependencies": {
        "basic-auth": "~2.0.1",
        "debug": "2.6.9",
        "depd": "~2.0.0",
        "on-finished": "~2.4.1",
        "on-headers": "~1.1.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/morgan/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/morgan/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/mpath": {
      "version": "0.9.0",
      "resolved": "https://registry.npmjs.org/mpath/-/mpath-0.9.0.tgz",
      "integrity": "sha512-ikJRQTk8hw5DEoFVxHG1Gn9T/xcjtdnOKIU1JTmGjZZlg9LST2mBLmcX3/ICIbgJydT2GOc15RnNy5mHmzfSew==",
      "license": "MIT",
      "engines": {
        "node": ">=4.0.0"
      }
    },
    "node_modules/mquery": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/mquery/-/mquery-6.0.0.tgz",
      "integrity": "sha512-b2KQNsmgtkscfeDgkYMcWGn9vZI9YoXh802VDEwE6qc50zxBFQ0Oo8ROkawbPAsXCY1/Z1yp0MagqsZStPWJjw==",
      "license": "MIT",
      "engines": {
        "node": ">=20.19.0"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/msgpackr": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/msgpackr/-/msgpackr-2.0.4.tgz",
      "integrity": "sha512-o1C5KRmuRt+apqMr1HuGSqWStZoRBUpEsCsl15uM9VdAF1qHLtvMOU2En747EnTyEl6c4pzPewRMFF31s1CNbA==",
      "license": "MIT",
      "optionalDependencies": {
        "msgpackr-extract": "^3.0.4"
      }
    },
    "node_modules/msgpackr-extract": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/msgpackr-extract/-/msgpackr-extract-3.0.4.tgz",
      "integrity": "sha512-4kmO/MdyUIkLIvTPr8VHLil4AtoKIoniWPIEk5+CDy0xnWC84azhSFmuJ7PxZdsYtiP5kEeQsORAVIeMgxT+Hw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "node-gyp-build-optional-packages": "5.2.2"
      },
      "bin": {
        "download-msgpackr-prebuilds": "bin/download-prebuilds.js"
      },
      "optionalDependencies": {
        "@msgpackr-extract/msgpackr-extract-darwin-arm64": "3.0.4",
        "@msgpackr-extract/msgpackr-extract-darwin-x64": "3.0.4",
        "@msgpackr-extract/msgpackr-extract-linux-arm": "3.0.4",
        "@msgpackr-extract/msgpackr-extract-linux-arm64": "3.0.4",
        "@msgpackr-extract/msgpackr-extract-linux-x64": "3.0.4",
        "@msgpackr-extract/msgpackr-extract-win32-x64": "3.0.4"
      }
    },
    "node_modules/multer": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/multer/-/multer-2.2.0.tgz",
      "integrity": "sha512-6rdyFg2kLrMh9Jee7/BMPuV9lEAd7lLW2YUpF9/YxR7njyoUwwQ0ZPh3TaIY50Sw6vlyD2HW3wGOkTS4P79xrQ==",
      "license": "MIT",
      "dependencies": {
        "append-field": "^1.0.0",
        "busboy": "^1.6.0",
        "concat-stream": "^2.0.0",
        "type-is": "^1.6.18"
      },
      "engines": {
        "node": ">= 10.16.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/multer/node_modules/media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/multer/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/multer/node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/multer/node_modules/type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "license": "MIT",
      "dependencies": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/negotiator": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
      "integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/node-abort-controller": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/node-abort-controller/-/node-abort-controller-3.1.1.tgz",
      "integrity": "sha512-AGK2yQKIjRuqnc6VkX2Xj5d+QW8xZ87pa1UK6yA6ouUyuxfHuMP6umE5QK7UmTeOAymo+Zx1Fxiuw9rVx8taHQ==",
      "license": "MIT"
    },
    "node_modules/node-addon-api": {
      "version": "8.9.0",
      "resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-8.9.0.tgz",
      "integrity": "sha512-ekZMeaaIzSQTSpr7X2X3iJM7lTzgnx8ahAG9pJfT/7+14mlEM8ZYQ9cgCDvSSRbReFK0oHli3WrZdCiRsgAT9Q==",
      "license": "MIT",
      "engines": {
        "node": "^18 || ^20 || >= 21"
      }
    },
    "node_modules/node-gyp-build": {
      "version": "4.8.4",
      "resolved": "https://registry.npmjs.org/node-gyp-build/-/node-gyp-build-4.8.4.tgz",
      "integrity": "sha512-LA4ZjwlnUblHVgq0oBF3Jl/6h/Nvs5fzBLwdEF4nuxnFdsfajde4WfxtJr3CaiH+F6ewcIB/q4jQ4UzPyid+CQ==",
      "license": "MIT",
      "bin": {
        "node-gyp-build": "bin.js",
        "node-gyp-build-optional": "optional.js",
        "node-gyp-build-test": "build-test.js"
      }
    },
    "node_modules/node-gyp-build-optional-packages": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/node-gyp-build-optional-packages/-/node-gyp-build-optional-packages-5.2.2.tgz",
      "integrity": "sha512-s+w+rBWnpTMwSFbaE0UXsRlg7hU4FjekKU4eyAih5T8nJuNZT1nNsskXpxmeqSK9UzkBl6UgRlnKc8hz8IEqOw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "detect-libc": "^2.0.1"
      },
      "bin": {
        "node-gyp-build-optional-packages": "bin.js",
        "node-gyp-build-optional-packages-optional": "optional.js",
        "node-gyp-build-optional-packages-test": "build-test.js"
      }
    },
    "node_modules/nodemon": {
      "version": "3.1.14",
      "resolved": "https://registry.npmjs.org/nodemon/-/nodemon-3.1.14.tgz",
      "integrity": "sha512-jakjZi93UtB3jHMWsXL68FXSAosbLfY0In5gtKq3niLSkrWznrVBzXFNOEMJUfc9+Ke7SHWoAZsiMkNP3vq6Jw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chokidar": "^3.5.2",
        "debug": "^4",
        "ignore-by-default": "^1.0.1",
        "minimatch": "^10.2.1",
        "pstree.remy": "^1.1.8",
        "semver": "^7.5.3",
        "simple-update-notifier": "^2.0.0",
        "supports-color": "^5.5.0",
        "touch": "^3.1.0",
        "undefsafe": "^2.0.5"
      },
      "bin": {
        "nodemon": "bin/nodemon.js"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/nodemon"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/on-headers": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/on-headers/-/on-headers-1.1.0.tgz",
      "integrity": "sha512-737ZY3yNnXy37FHkQxPzt4UZ2UWPWiCZWLvFZ4fu5cueciegX0zGPnrlY6bwRg4FdQOe9YU8MkmJwGhoMybl8A==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-to-regexp": {
      "version": "8.4.2",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.4.2.tgz",
      "integrity": "sha512-qRcuIdP69NPm4qbACK+aDogI5CBDMi1jKe0ry5rSQJz8JVLsC7jV8XpiJjGRLLol3N+R5ihGYcrPLTno6pAdBA==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/proxy-from-env": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/proxy-from-env/-/proxy-from-env-2.1.0.tgz",
      "integrity": "sha512-cJ+oHTW1VAEa8cJslgmUZrc+sjRKgAKl3Zyse6+PV38hZe/V6Z14TbCuXcan9F9ghlz4QrFr2c92TNF82UkYHA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/pstree.remy": {
      "version": "1.1.8",
      "resolved": "https://registry.npmjs.org/pstree.remy/-/pstree.remy-1.1.8.tgz",
      "integrity": "sha512-77DZwxQmxKnu3aR542U+X8FypNzbfJ+C5XQDk3uWjWxn6151aIMGthWYRXTqT1E5oJvg+ljaa2OJi+VfvCOQ8w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/qs": {
      "version": "6.15.3",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.15.3.tgz",
      "integrity": "sha512-O9gl3zCl5h5blw1KGUzQKhA5oUXSl8rwUIM5o0S3nCXMliSvy5Dzx7/DJcI+SwgICv+IneSZwhBh1oSyEHA71A==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "es-define-property": "^1.0.1",
        "side-channel": "^1.1.1"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/range-parser": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.3.0.tgz",
      "integrity": "sha512-hek2mFQpPuI4E1BBKrSto+BU3e3x4xuarsbiwr3+lf7p44juvFMV0XFWQAP3xUyqXA4RrXLIoaSUGbSt056ZMw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/raw-body": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.2.tgz",
      "integrity": "sha512-K5zQjDllxWkf7Z5xJdV0/B0WTNqx6vxG70zJE4N0kBs4LovmEYWJzQGxC9bS9RAKu3bgM40lrd5zoLJ12MQ5BA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.7.0",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/readable-stream": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
      "license": "MIT",
      "dependencies": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/redis-errors": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/redis-errors/-/redis-errors-1.2.0.tgz",
      "integrity": "sha512-1qny3OExCf0UvUV/5wpYKf2YwPcOqXzkwKKSmKHiE6ZMQs5heeE/c8eXK+PNllPvmjgAbfnsbpkGZWy8cBpn9w==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/redis-parser": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/redis-parser/-/redis-parser-3.0.0.tgz",
      "integrity": "sha512-DJnGAeenTdpMEH6uAJRK/uiyEIH9WVsUmoLwzudwGJUwZPp80PDBWPHXSAGNPwNvIXAbe7MSUB1zQFugFml66A==",
      "license": "MIT",
      "dependencies": {
        "redis-errors": "^1.0.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/router": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "is-promise": "^4.0.0",
        "parseurl": "^1.3.3",
        "path-to-regexp": "^8.0.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/send/-/send-1.2.1.tgz",
      "integrity": "sha512-1gnZf7DFcoIcajTjTwjwuDjzuz4PPcY2StKPlsGAQ1+YH20IRVrBaXSWmdjowTJ6u8Rc01PoYOGHXfP1mYcZNQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.3",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.1",
        "mime-types": "^3.0.2",
        "ms": "^2.1.3",
        "on-finished": "^2.4.1",
        "range-parser": "^1.2.1",
        "statuses": "^2.0.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/serve-static": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.1.tgz",
      "integrity": "sha512-xRXBn0pPqQTVQiC8wyQrKs2MOlX24zQ0POGaj0kultvoOCstBQM5yvOhAVSUwOMjQtTvsPWoNCHfPGwaaQJhTw==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "parseurl": "^1.3.3",
        "send": "^1.2.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/side-channel": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.1.tgz",
      "integrity": "sha512-6x6dK6zJdpTzF4sQeNYxwtvBzf6Eg4GtlesS94HOvTudUeyK2WXAaIfmDgsyslYrRBeFIlsi54AYsFGUuhmvrQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4",
        "side-channel-list": "^1.0.1",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.1.tgz",
      "integrity": "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/sift": {
      "version": "17.1.3",
      "resolved": "https://registry.npmjs.org/sift/-/sift-17.1.3.tgz",
      "integrity": "sha512-Rtlj66/b0ICeFzYTuNvX/EF1igRbbnGSvEyT79McoZa/DeGhMyC5pWKOEsZKnpkqtSeovd5FL/bjHWC3CIIvCQ==",
      "license": "MIT"
    },
    "node_modules/simple-update-notifier": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/simple-update-notifier/-/simple-update-notifier-2.0.0.tgz",
      "integrity": "sha512-a2B9Y0KlNXl9u/vsW6sTIu9vGEpfKu2wRV6l1H3XEas/0gUIzGzBoP/IouTcUQbm9JWZLH3COxyn03TYlFax6w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "semver": "^7.5.3"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/socket.io": {
      "version": "4.8.3",
      "resolved": "https://registry.npmjs.org/socket.io/-/socket.io-4.8.3.tgz",
      "integrity": "sha512-2Dd78bqzzjE6KPkD5fHZmDAKRNe3J15q+YHDrIsy9WEkqttc7GY+kT9OBLSMaPbQaEd0x1BjcmtMtXkfpc+T5A==",
      "license": "MIT",
      "dependencies": {
        "accepts": "~1.3.4",
        "base64id": "~2.0.0",
        "cors": "~2.8.5",
        "debug": "~4.4.1",
        "engine.io": "~6.6.0",
        "socket.io-adapter": "~2.5.2",
        "socket.io-parser": "~4.2.4"
      },
      "engines": {
        "node": ">=10.2.0"
      }
    },
    "node_modules/socket.io-adapter": {
      "version": "2.5.8",
      "resolved": "https://registry.npmjs.org/socket.io-adapter/-/socket.io-adapter-2.5.8.tgz",
      "integrity": "sha512-6Oy52pbg+kvdCVvjcN+FnY7BvxZ7cIHNScbvztT/It5d0vbwoJoVZmF2gjJmnV0/4WlXRfG15zc45ySk9Ah8bw==",
      "license": "MIT",
      "dependencies": {
        "debug": "~4.4.1",
        "ws": "~8.21.0"
      }
    },
    "node_modules/socket.io-parser": {
      "version": "4.2.6",
      "resolved": "https://registry.npmjs.org/socket.io-parser/-/socket.io-parser-4.2.6.tgz",
      "integrity": "sha512-asJqbVBDsBCJx0pTqw3WfesSY0iRX+2xzWEWzrpcH7L6fLzrhyF8WPI8UaeM4YCuDfpwA/cgsdugMsmtz8EJeg==",
      "license": "MIT",
      "dependencies": {
        "@socket.io/component-emitter": "~3.1.0",
        "debug": "~4.4.1"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/socket.io/node_modules/accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/socket.io/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/socket.io/node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/socket.io/node_modules/negotiator": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/sparse-bitfield": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/sparse-bitfield/-/sparse-bitfield-3.0.3.tgz",
      "integrity": "sha512-kvzhi7vqKTfkh0PZU+2D2PIllw2ymqJKujUcyPMd9Y75Nv4nPbGJZXNhxsgdQab2BmlDct1YnfQCguEvHr7VsQ==",
      "license": "MIT",
      "dependencies": {
        "memory-pager": "^1.0.2"
      }
    },
    "node_modules/standard-as-callback": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/standard-as-callback/-/standard-as-callback-2.1.0.tgz",
      "integrity": "sha512-qoRRSyROncaz1z0mvYqIE4lCd9p2R90i6GxW3uZv5ucSu8tU7B5HXUP1gG8pVZsYNVaXjk8ClXHPttLyxAL48A==",
      "license": "MIT"
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/streamsearch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
      "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/string_decoder": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "~5.2.0"
      }
    },
    "node_modules/supports-color": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
      "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^3.0.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/touch": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/touch/-/touch-3.1.1.tgz",
      "integrity": "sha512-r0eojU4bI8MnHr8c5bNo7lJDdI2qXlWWJk6a9EAFG7vbhTjElYhBVS3/miuE0uOuoLdb8Mc/rVfsmm6eo5o9GA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "nodetouch": "bin/nodetouch.js"
      }
    },
    "node_modules/tr46": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-5.1.1.tgz",
      "integrity": "sha512-hdF5ZgjTqgAntKkklYw0R03MG2x/bSzTtkxmIRw/sTNV8YXsCJ1tfLAX23lhxhHJlEf3CRCOCGGWw3vI3GaSPw==",
      "license": "MIT",
      "dependencies": {
        "punycode": "^2.3.1"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/type-is": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.1.0.tgz",
      "integrity": "sha512-faYHw0anBbc/kWF3zFTEnxSFOAGUX9GFbOBthvDdLsIlEoWOFOtS0zgCiQYwIskL9iGXZL3kAXD8OoZ4GmMATA==",
      "license": "MIT",
      "dependencies": {
        "content-type": "^2.0.0",
        "media-typer": "^1.1.0",
        "mime-types": "^3.0.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/type-is/node_modules/content-type": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-2.0.0.tgz",
      "integrity": "sha512-j/O/d7GcZCyNl7/hwZAb606rzqkyvaDctLmckbxLzHvFBzTJHuGEdodATcP3yIRoDrLHkIATJuvzbFlp/ki2cQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/typedarray": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
      "integrity": "sha512-/aCDEGatGvZ2BIk+HmLf4ifCJFwvKFNb9/JeZPMulfgFracn9QFcAf5GO8B/mweUjSoblS5In0cWhqpfs/5PQA==",
      "license": "MIT"
    },
    "node_modules/undefsafe": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/undefsafe/-/undefsafe-2.0.5.tgz",
      "integrity": "sha512-WxONCrssBM8TSPRqN5EmsjVrsv4A8X12J4ArBiiayv3DyyG3ZlIg6yysuuSYdZsVz3TKcTg2fd//Ujd4CHV1iA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/undici-types": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-8.3.0.tgz",
      "integrity": "sha512-j375ScV60dom+YkPFIfTLcOiPxkN/buHz5GobjLhixFuANaNs3C9l4GmrWqejgXWJ7BbJcFYpTEUkS1Ge8bpZQ==",
      "license": "MIT"
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "license": "MIT"
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/webidl-conversions": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-7.0.0.tgz",
      "integrity": "sha512-VwddBukDzu71offAQR975unBIGqfKZpM+8ZX6ySk8nYhVoo5CYaZyzt3YBvYtRtO+aoGlqxPg/B87NGVZ/fu6g==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/whatwg-url": {
      "version": "14.2.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-14.2.0.tgz",
      "integrity": "sha512-De72GdQZzNTUBBChsXueQUnPKDkg/5A5zp7pFDuQAj5UFoENpiACU0wlCvzpAGnTkj++ihpKwKyYewn/XNUbKw==",
      "license": "MIT",
      "dependencies": {
        "tr46": "^5.1.0",
        "webidl-conversions": "^7.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC"
    },
    "node_modules/ws": {
      "version": "8.21.0",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.21.0.tgz",
      "integrity": "sha512-Vsp28b7DRcimFQvrqu2Wek3z1iYxDCWqHYB8Qsnk/S4RfaCQzPGPyBNuVjJV3cd6UiKtUtp6sNM77gWvzcCH+g==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    }
  }
}

```

---

## الملف: `gateway\package.json`

```json
{
  "name": "gateway",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "axios": "^1.18.1",
    "bcrypt": "^6.0.0",
    "bullmq": "^5.79.3",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "helmet": "^8.2.0",
    "ioredis": "^5.11.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.7.4",
    "morgan": "^1.11.0",
    "multer": "^2.2.0",
    "socket.io": "^4.8.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}

```

---

## الملف: `gateway\server.js`

```javascript
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const path = require('path');

const outputsPath = path.resolve(__dirname, '../ai-engine/temp_workspace/demucs_out/mdx_extra/safe_input');
const aiJobsRouter = require('./src/routes/aiJobs');
const { initWebSocket } = require('./src/services/websocket');
const { initWorker } = require('./src/workers/aiWorker');
const uploadRouter = require('./src/routes/upload'); 
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { 
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// 🌟 مسار سري لاستقبال التقدم من بايثون وبثه للواجهة 🌟
app.post('/api/internal/progress', (req, res) => {
  const { message } = req.body;
  if (message) {
    io.emit('jobProgress', { message });
  }
  res.sendStatus(200);
});

// Routes
app.use('/api/ai', aiJobsRouter);

// توزيع الملفات المضغوطة للمتصفح
app.use('/outputs', express.static(outputsPath));
app.use('/api/upload', uploadRouter); 
app.use('/uploads', express.static('../uploads'));
console.log("Serving static files from:", outputsPath);

// Init Services
initWebSocket(io);
initWorker(); // Start processing the queue

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
```

---

## الملف: `gateway\src\config\queue.js`

```javascript
const { Queue, QueueEvents } = require('bullmq');

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
};

// Create the main AI processing queue
const aiQueue = new Queue('ai-processing', { 
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  }
});

// Setup events to listen for progress and completion globally
const queueEvents = new QueueEvents('ai-processing', { connection });

module.exports = {
  aiQueue,
  queueEvents,
  connection
};
```

---

## الملف: `gateway\src\routes\aiJobs.js`

```javascript
const express = require('express');
const router = express.Router();
const { aiQueue } = require('../config/queue');

// POST /api/ai/jobs - Submit a new AI task
router.post('/jobs', async (req, res) => {
  try {
    const { type, title, parameters, inputFileId, priority = 'normal' } = req.body;
    
    // In a real app, validate user credits and file ownership here

    const jobOptions = {};
    if (priority === 'high') jobOptions.priority = 1;
    if (priority === 'low') jobOptions.priority = 3;

    // Add job to BullMQ
    const job = await aiQueue.add(type, {
      type,
      title,
      parameters,
      inputFileId,
      userId: req.user?.id || 'anonymous', // Assuming auth middleware sets req.user
    }, jobOptions);

    res.status(202).json({
      success: true,
      message: 'Job successfully queued',
      jobId: job.id,
      status: 'queued'
    });

  } catch (error) {
    console.error('[API] Error queueing job:', error);
    res.status(500).json({ success: false, message: 'Failed to queue job' });
  }
});

// GET /api/ai/jobs/:id - Get job status
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await aiQueue.getJob(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const state = await job.getState();
    const progress = job.progress;

    res.json({
      success: true,
      jobId: job.id,
      state,
      progress,
      result: job.returnvalue
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching job status' });
  }
});

module.exports = router;
```

---

## الملف: `gateway\src\routes\upload.js`

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// إنشاء مجلد uploads إذا لم يكن موجوداً
const uploadDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// إعداد محرك الحفظ (أين وكيف سيتم حفظ الملف)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // إضافة طابع زمني لمنع تداخل أسماء الملفات
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'audio-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// مسار استقبال الملف
router.post('/', upload.single('file'), (req, res) => {
        if (!req.file) {
        return res.status(400).json({ success: false, message: 'لم يتم رفع أي ملف' });
    }
    
    console.log(`[Upload] File received: ${req.file.filename}`);
    
    res.json({
        success: true,
        message: 'تم رفع الملف بنجاح',
        filePath: req.file.path,
        fileName: req.file.filename
    });
});

module.exports = router;
```

---

## الملف: `gateway\src\services\websocket.js`

```javascript
let io;

const initWebSocket = (socketIoInstance) => {
  io = socketIoInstance;

  io.on('connection', (socket) => {
    console.log(`[WS] Client connected: ${socket.id}`);

    // Client subscribes to a specific job to get its progress
    socket.on('subscribe:job', (jobId) => {
      const roomName = `job:${jobId}`;
      socket.join(roomName);
      console.log(`[WS] Socket ${socket.id} joined room ${roomName}`);
    });

    socket.on('unsubscribe:job', (jobId) => {
      socket.leave(`job:${jobId}`);
    });

    socket.on('disconnect', () => {
      console.log(`[WS] Client disconnected: ${socket.id}`);
    });
  });
};

// Functions to be called by the Worker to broadcast updates
const emitJobProgress = (jobId, progress, stage, eta) => {
  if (io) {
    // بث عام لتحديثات التقدم
    io.emit('jobProgress', { jobId, progress, stage, eta });
  }
};

const emitJobCompleted = (jobId, result) => {
  if (io) {
    // بث عام باكتمال المهمة
    io.emit('jobCompleted', { jobId, result });
  }
};

const emitJobFailed = (jobId, error) => {
  if (io) {
    // بث عام في حال الفشل
    io.emit('jobFailed', { jobId, error });
  }
};

module.exports = {
  initWebSocket,
  emitJobProgress,
  emitJobCompleted,
  emitJobFailed
};
```

---

## الملف: `gateway\src\workers\aiWorker.js`

```javascript
const { Worker } = require('bullmq');
const axios = require('axios');
const { connection } = require('../config/queue');
const { emitJobProgress, emitJobCompleted, emitJobFailed } = require('../services/websocket');

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8000';

const initWorker = () => {
  console.log('[Worker] Starting AI Job Worker...');

  const worker = new Worker('ai-processing', async (job) => {
    console.log(`[Worker] Processing Job ${job.id} of type ${job.name}`);
    
    const { type, parameters, inputFileId } = job.data;
    const currentJobType = type || job.name;
    
    console.log(`[Worker] File Path to process: ${inputFileId}`); 
    
    try {
      emitJobProgress(job.id, 5, 'Initializing models...', 'Calculating');
      await job.updateProgress(5);

      const actualFilePath = inputFileId || (parameters && parameters.input_file) || "";
      
      console.log(`[Worker] Actual File Path being sent to Python: "${actualFilePath}"`);

      const response = await axios.post(`${AI_ENGINE_URL}/api/ai/process`, {
        job_id: job.id ? job.id.toString() : `job_${Date.now()}`,
        job_type: currentJobType,
        parameters: parameters || {},
        input_file: actualFilePath
      });

      for (let i = 10; i <= 90; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        emitJobProgress(job.id, i, `Processing stage ${i/10}...`, `${100 - i}s`);
        await job.updateProgress(i);
      }

      emitJobProgress(job.id, 100, 'Finalizing and saving...', '0s');
      await job.updateProgress(100);

      let finalTracks = [];
      
      if (currentJobType === 'denoise') {
         finalTracks = [
           { id: 'track-clean', name: '🎙️ Studio Enhanced (AI)', src: 'http://localhost:5000/outputs/safe_input_clean.flac', type: 'cleaned' }
         ];
      } else {
         finalTracks = [
           { id: 'track-vocals', name: '🎤 Vocals', src: 'http://localhost:5000/outputs/vocals.flac' },
           { id: 'track-drums', name: '🥁 Drums ', src: 'http://localhost:5000/outputs/drums.flac' },
           { id: 'track-bass', name: '🎸 Bass ', src: 'http://localhost:5000/outputs/bass.flac' },
           { id: 'track-other', name: '🎹 Other ', src: 'http://localhost:5000/outputs/other.flac' }
         ];
      }

      const result = {
        message: currentJobType === 'denoise' ? 'تم إعادة بناء الصوت وتنقيته بجودة الاستوديو الأسطورية! 🎙️✨' : 'تم فصل وضغط مسارات الاستوديو بنجاح! 🚀',
        tracks: finalTracks
      };

      emitJobCompleted(job.id, result);
      return result;

    } catch (error) {
      console.error(`[Worker] Job ${job.id} failed:`, error.message);
      emitJobFailed(job.id, error.message);
      throw error; 
    }
  }, { 
    connection,
    concurrency: 5 
  });

  worker.on('failed', (job, err) => {
    console.log(`[Worker] Job ${job.id} permanently failed with error ${err.message}`);
  });
};

module.exports = { initWorker };
```

---

## الملف: `uploads\audio-1783648716551-511077011.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783683113938-242827333.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783684494751-470832762.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783685074619-12379440.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783687451822-725993962.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783690262064-640913024.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783690681760-12083783.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783690849468-442374329.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783696401205-676559314.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783699228892-388595909.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783699671896-803504826.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783699707459-846697743.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783713127512-341916353.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783716767410-402174561.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783717746720-753517621.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783718179832-123495292.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783721210252-988455973.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783721247128-918043618.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783721412191-147495413.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783721825324-196431754.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783721904556-159296542.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783724199229-774922831.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783724267448-850507285.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783724688943-163982677.mp3`

```mp3
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 1024: invalid start byte
```

---

## الملف: `uploads\audio-1783724701364-470981652.wav`

```wav
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0x9f in position 4: invalid start byte
```

---

## الملف: `uploads\audio-1783727376956-893463100.wav`

```wav
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0x9f in position 4: invalid start byte
```

---

## الملف: `uploads\audio-1783727636217-126846640.wav`

```wav
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0x9f in position 4: invalid start byte
```

---

## الملف: `uploads\audio-1783779040277-766144752.wav`

```wav
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0x9f in position 4: invalid start byte
```

---

## الملف: `uploads\audio-1783788431874-953177223.wav`

```wav
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0x9f in position 4: invalid start byte
```

---

## الملف: `uploads\audio-1783789192877-824147807.wav`

```wav
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0x9f in position 4: invalid start byte
```

---

## الملف: `uploads\audio-1783789695559-484254404.wav`

```wav
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0x9f in position 4: invalid start byte
```

---

## الملف: `uploads\audio-1783790656149-845908337.wav`

```wav
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0x9f in position 4: invalid start byte
```

---

