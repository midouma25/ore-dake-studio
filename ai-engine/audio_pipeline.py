import os
import subprocess
from config import settings

class AudioPipeline:
    @staticmethod
    def process_stem_separation(input_path: str, parameters: dict):
        print(f"[Audio Pipeline] Starting REAL Stem Separation on: {input_path}")
        
        # إنشاء مجلد لحفظ الملفات المفصولة
        out_dir = os.path.join(settings.TEMP_DIR, "demucs_out")
        os.makedirs(out_dir, exist_ok=True)
        
        print("[Audio Pipeline] Running AI Model (HTDemucs) on RTX GPU...")
        
        try:
            # تشغيل نموذج الذكاء الاصطناعي الفعلي عبر سطر الأوامر
            subprocess.run(["demucs", "-n", "htdemucs", "--out", out_dir, input_path], check=True)
            
            # تحديد مسار المخرجات
            base_name = os.path.splitext(os.path.basename(input_path))[0]
            model_out_dir = os.path.join(out_dir, "htdemucs", base_name)
            
            outputs = {
                "vocals": os.path.join(model_out_dir, "vocals.wav"),
                "drums": os.path.join(model_out_dir, "drums.wav"),
                "bass": os.path.join(model_out_dir, "bass.wav"),
                "other": os.path.join(model_out_dir, "other.wav")
            }
            
            print(f"[Audio Pipeline] Magic Done! Files saved at: {model_out_dir}")
            return outputs
            
        except subprocess.CalledProcessError as e:
            print(f"[Audio Pipeline] Error running Demucs: {e}")
            raise e