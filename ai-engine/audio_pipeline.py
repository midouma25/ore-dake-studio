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