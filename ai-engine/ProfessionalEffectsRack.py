import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

import soundfile as sf
from pedalboard import (
    Pedalboard, NoiseGate, Compressor, Limiter, 
    HighpassFilter, LowpassFilter, PeakFilter, HighShelfFilter, 
    Chorus, Distortion, PitchShift, Reverb, Delay, Gain
)
import warnings
warnings.filterwarnings("ignore")

class ProfessionalEffectsRack:
    def __init__(self):
        self.board = Pedalboard([])
        
    def build_chain(self, effects_config):
        plugins = []
        for fx in effects_config:
            fx_type = fx.get("type")
            
            # AMPLITUDE AND COMPRESSION
            if fx_type == "NoiseGate": plugins.append(NoiseGate(threshold_db=fx.get("threshold_db", -40.0), ratio=fx.get("ratio", 4.0), attack_ms=fx.get("attack_ms", 1.0), release_ms=fx.get("release_ms", 100.0)))
            elif fx_type == "Compressor": plugins.append(Compressor(threshold_db=fx.get("threshold_db", -20.0), ratio=fx.get("ratio", 3.0), attack_ms=fx.get("attack_ms", 5.0), release_ms=fx.get("release_ms", 50.0)))
            elif fx_type == "Limiter": plugins.append(Limiter(threshold_db=fx.get("threshold_db", -1.0)))
            elif fx_type == "Gain": plugins.append(Gain(gain_db=fx.get("gain_db", 0.0)))
                
            # FILTER AND EQ
            elif fx_type == "HighpassFilter": plugins.append(HighpassFilter(cutoff_frequency_hz=fx.get("cutoff_hz", 80.0)))
            elif fx_type == "LowpassFilter": plugins.append(LowpassFilter(cutoff_frequency_hz=fx.get("cutoff_hz", 16000.0)))
            elif fx_type == "ParametricEQ_Band": plugins.append(PeakFilter(cutoff_frequency_hz=fx.get("cutoff_hz", 1000.0), gain_db=fx.get("gain_db", 0.0), q=fx.get("q", 1.0)))
            elif fx_type == "AirEQ": plugins.append(HighShelfFilter(cutoff_frequency_hz=fx.get("cutoff_hz", 6000.0), gain_db=fx.get("gain_db", 2.0)))
                
            # REVERB & DELAY
            elif fx_type == "Reverb": plugins.append(Reverb(room_size=fx.get("room_size", 0.5), damping=fx.get("damping", 0.5), wet_level=fx.get("wet_level", 0.33), dry_level=fx.get("dry_level", 0.4), width=fx.get("width", 1.0)))
            elif fx_type == "Delay": plugins.append(Delay(delay_seconds=fx.get("delay_ms", 500.0) / 1000.0, feedback=fx.get("feedback", 0.3), mix=fx.get("mix", 0.5)))
                
            # MODULATION
            elif fx_type == "Chorus": plugins.append(Chorus(rate_hz=fx.get("rate_hz", 1.0), depth=fx.get("depth", 0.25), mix=fx.get("mix", 0.5)))
            elif fx_type == "Distortion": plugins.append(Distortion(drive_db=fx.get("drive_db", 10.0)))
            elif fx_type == "PitchShift": plugins.append(PitchShift(semitones=fx.get("semitones", 0.0)))
                
        self.board = Pedalboard(plugins)
        
    def process(self, input_path, output_path):
        import subprocess
        safe_wav = input_path + "_safe.wav"
        try:
            import imageio_ffmpeg
            ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
        except ImportError:
            ffmpeg_exe = "ffmpeg"
        try:
            subprocess.run([ffmpeg_exe, "-y", "-i", input_path, "-ar", "44100", "-c:a", "pcm_s16le", safe_wav], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            audio, sample_rate = sf.read(safe_wav)
        except:
            audio, sample_rate = sf.read(input_path)
        
        if len(audio.shape) == 1: audio = audio.reshape(1, -1)
        else: audio = audio.T
            
        effected_audio = self.board(audio, sample_rate)
        sf.write(output_path, effected_audio.T, sample_rate)
        if os.path.exists(safe_wav):
            try: os.remove(safe_wav)
            except: pass

    def process_preview(self, input_path, output_path, start_time, duration):
        import subprocess
        start_time, duration = float(start_time), float(duration)
        if duration < 0.5: duration = 5.0
        
        safe_wav = input_path + "_preview_temp.wav"
        try:
            import imageio_ffmpeg
            ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
        except ImportError:
            ffmpeg_exe = "ffmpeg"

        subprocess.run([ffmpeg_exe, "-y", "-ss", f"{start_time:.3f}", "-t", f"{duration:.3f}", "-i", input_path, "-ar", "44100", "-c:a", "pcm_s16le", safe_wav], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        audio, sample_rate = sf.read(safe_wav)
        if len(audio.shape) == 1: audio = audio.reshape(1, -1)
        else: audio = audio.T
            
        effected_audio = self.board(audio, sample_rate)
        sf.write(output_path, effected_audio.T, sample_rate)
        if os.path.exists(safe_wav): os.remove(safe_wav)

    # 🌟 الدالة الجديدة: الخياطة والتطبيق الموضعي 🌟
# 🌟 الدالة المحدثة: الخياطة والتطبيق الموضعي مع الحماية من صيغ الملفات 🌟
    def process_region(self, input_path, output_path, start_time, duration):
        import subprocess, tempfile
        start_time, duration = float(start_time), float(duration)
        print(f"\n✂️ المعالجة الموضعية: من {start_time:.2f} ثانية | لمدة {duration:.2f} ثانية")
        
        try:
            import imageio_ffmpeg
            ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
        except ImportError:
            ffmpeg_exe = "ffmpeg"
            
        temp_dir = tempfile.gettempdir()
        
        # 🛡️ الحماية السحرية: تحويل الملف إلى WAV قياسي نقي قبل قراءته بمكتبة soundfile
        safe_input = os.path.join(temp_dir, f"safe_in_{os.path.basename(input_path)}")
        try:
            subprocess.run([
                ffmpeg_exe, "-y", "-i", input_path, 
                "-ar", "44100", "-c:a", "pcm_s16le", safe_input
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            # الآن نأخذ الطول الكلي من الملف النقي بأمان تام
            total_duration = sf.info(safe_input).duration
        except Exception as e:
            print(f"❌ فشل في قراءة الملف الأساسي: {e}")
            raise e
            
        end_time = start_time + duration
        
        part1 = os.path.join(temp_dir, f"p1_{os.path.basename(input_path)}")
        part2_raw = os.path.join(temp_dir, f"p2r_{os.path.basename(input_path)}")
        part2_fx = os.path.join(temp_dir, f"p2f_{os.path.basename(input_path)}")
        part3 = os.path.join(temp_dir, f"p3_{os.path.basename(input_path)}")
        list_file = os.path.join(temp_dir, "concat_list.txt")

        def _safe_path(p): return p.replace('\\', '/')

        try:
            # 1. قص الجزء الأول (باستخدام الملف الآمن)
            if start_time > 0:
                subprocess.run([ffmpeg_exe, "-y", "-t", f"{start_time:.3f}", "-i", safe_input, "-ar", "44100", "-c:a", "pcm_s16le", part1], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            # 2. قص الجزء الأوسط (للمعالجة)
            subprocess.run([ffmpeg_exe, "-y", "-ss", f"{start_time:.3f}", "-t", f"{duration:.3f}", "-i", safe_input, "-ar", "44100", "-c:a", "pcm_s16le", part2_raw], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            # 3. قص الجزء الأخير
            if end_time < total_duration:
                subprocess.run([ffmpeg_exe, "-y", "-ss", f"{end_time:.3f}", "-i", safe_input, "-ar", "44100", "-c:a", "pcm_s16le", part3], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            # 4. تطبيق الفلتر على الجزء الأوسط فقط
            audio, sample_rate = sf.read(part2_raw)
            if len(audio.shape) == 1: audio = audio.reshape(1, -1)
            else: audio = audio.T
            effected_audio = self.board(audio, sample_rate)
            sf.write(part2_fx, effected_audio.T, sample_rate)
            
            # 5. خياطة الأجزاء الثلاثة معاً
            with open(list_file, "w", encoding="utf-8") as f:
                if start_time > 0: f.write(f"file '{_safe_path(part1)}'\n")
                f.write(f"file '{_safe_path(part2_fx)}'\n")
                if end_time < total_duration: f.write(f"file '{_safe_path(part3)}'\n")
                
            subprocess.run([ffmpeg_exe, "-y", "-f", "concat", "-safe", "0", "-i", list_file, "-c", "copy", output_path], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print(f"✨ تمت المعالجة الموضعية والدمج بنجاح!")
            
        except Exception as e:
            print(f"❌ خطأ أثناء الدمج: {e}")
            raise e
        finally:
            # تنظيف المخلفات المؤقتة
            for f in [safe_input, part1, part2_raw, part2_fx, part3, list_file]:
                if os.path.exists(f): 
                    try: os.remove(f)
                    except: pass
if __name__ == "__main__":
    import json
    if len(sys.argv) >= 4:
        input_file, output_file = sys.argv[1], sys.argv[2]
        effects_json = json.loads(sys.argv[3])
        start_time = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0
        duration = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
        mode = sys.argv[6] if len(sys.argv) > 6 else "full"

        rack = ProfessionalEffectsRack()
        rack.build_chain(effects_json)
        
        if mode == "preview":
            rack.process_preview(input_file, output_file, start_time, duration)
        elif mode == "region":
            rack.process_region(input_file, output_file, start_time, duration)
        else:
            rack.process(input_file, output_file)
    else:
        print("⚠️ يرجى تمرير المعاملات بشكل صحيح.")