import os
import sys
import subprocess
import imageio_ffmpeg
from config import settings

class AudioPipeline:
    @staticmethod
    def process_stem_separation(input_path: str, parameters: dict):
        print(f"[Audio Pipeline] Starting REAL Stem Separation on: {input_path}")
        
        abs_input_path = os.path.abspath(input_path)
        out_dir = os.path.abspath(os.path.join(settings.TEMP_DIR, "demucs_out"))
        safe_input_path = os.path.abspath(os.path.join(settings.TEMP_DIR, "safe_input.wav"))
        
        os.makedirs(out_dir, exist_ok=True)
        
        try:
            file_size = os.path.getsize(abs_input_path)
            print(f"[Audio Pipeline] Uploaded file size: {file_size} bytes")

            ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
            print(f"[Audio Pipeline] Using Built-in FFmpeg at: {ffmpeg_exe}")

            print("[Audio Pipeline] Forcing standardization using bundled FFmpeg...")
            subprocess.run([
                ffmpeg_exe, "-y", "-i", abs_input_path,
                "-ar", "44100", "-ac", "2", "-c:a", "pcm_s16le",
                safe_input_path
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print("[Audio Pipeline] Audio standardized successfully!")
            
        except Exception as e:
            print(f"[Audio Pipeline] Standardization failed: {e}")
            raise e

        print("[Audio Pipeline] Running AI Model (HTDemucs) on RTX GPU...")
        
        # --- السحر هنا: اختطاف عملية الحفظ (Monkey-Patching) ---
        # سنقوم بإنشاء سكربت بايثون مؤقت يغير طريقة عمل مكتبة torchaudio قبل تشغيل النموذج
        wrapper_path = os.path.abspath(os.path.join(settings.TEMP_DIR, "run_demucs_patched.py"))
        wrapper_code = f"""
import sys
import torchaudio
import soundfile as sf

# هذه الدالة ستحل محل دالة الحفظ الأصلية المعطوبة في الويندوز
def custom_save(uri, src, sample_rate, **kwargs):
    audio_np = src.transpose(0, 1).cpu().numpy()
    sf.write(str(uri), audio_np, sample_rate)

# اختطاف الدالة!
torchaudio.save = custom_save

# تشغيل النموذج بشكل طبيعي بعد إصلاح الحفظ
from demucs.separate import main
sys.argv = ['demucs', '-n', 'htdemucs', '--out', {repr(out_dir)}, {repr(safe_input_path)}]
sys.exit(main())
"""
        with open(wrapper_path, "w", encoding="utf-8") as f:
            f.write(wrapper_code)

        try:
            subprocess.run([sys.executable, wrapper_path], check=True)
            
            base_name = os.path.splitext(os.path.basename(safe_input_path))[0]
            
            # التعديل هنا: استخدام htdemucs ليتطابق مع مجلد النظام
            model_out_dir = os.path.join(out_dir, "htdemucs", base_name)
            
            outputs = {}
            ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

            print("[Audio Pipeline] Compressing huge WAV files to crisp 320kbps MP3s...")
            
            for track in ["vocals", "drums", "bass", "other"]:
                wav_path = os.path.join(model_out_dir, f"{track}.wav")
                mp3_path = os.path.join(model_out_dir, f"{track}.mp3")
                
                subprocess.run([
                    ffmpeg_exe, "-y", "-i", wav_path,
                    "-b:a", "320k",
                    mp3_path
                ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                
                os.remove(wav_path)
                outputs[track] = os.path.join(model_out_dir, f"{track}.mp3")
            
            print(f"[Audio Pipeline] Studio Magic Done & Compressed! Files saved at: {model_out_dir}")
            return outputs
            
        except subprocess.CalledProcessError as e:
            print(f"[Audio Pipeline] Error running AI: {e}")
            raise e