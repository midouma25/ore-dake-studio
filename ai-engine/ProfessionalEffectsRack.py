import os
import sys
# 🌟 هذا السطر السحري يجبر ويندوز على قبول الإيموجي واللغة العربية دون أعطال 🌟
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
        """
        تقرأ هذه الدالة مصفوفة الـ JSON وتبني سلسلة المؤثرات بنفس الترتيب.
        """
        plugins = []
        for fx in effects_config:
            fx_type = fx.get("type")
            
            # 1. AMPLITUDE AND COMPRESSION
            if fx_type == "NoiseGate":
                plugins.append(NoiseGate(
                    threshold_db=fx.get("threshold_db", -40.0),
                    ratio=fx.get("ratio", 4.0),
                    attack_ms=fx.get("attack_ms", 1.0),
                    release_ms=fx.get("release_ms", 100.0)
                ))
            elif fx_type == "Compressor":
                plugins.append(Compressor(
                    threshold_db=fx.get("threshold_db", -20.0),
                    ratio=fx.get("ratio", 3.0),
                    attack_ms=fx.get("attack_ms", 5.0),
                    release_ms=fx.get("release_ms", 50.0)
                ))
            elif fx_type == "Limiter":
                plugins.append(Limiter(threshold_db=fx.get("threshold_db", -1.0)))
            elif fx_type == "Gain":
                plugins.append(Gain(gain_db=fx.get("gain_db", 0.0)))
                
            # 2. FILTER AND EQ
            elif fx_type == "HighpassFilter":
                plugins.append(HighpassFilter(cutoff_frequency_hz=fx.get("cutoff_hz", 80.0)))
            elif fx_type == "LowpassFilter":
                plugins.append(LowpassFilter(cutoff_frequency_hz=fx.get("cutoff_hz", 16000.0)))
            elif fx_type == "ParametricEQ_Band": 
                # 🌟 تم إصلاح الاسم هنا إلى PeakFilter 🌟
                plugins.append(PeakFilter(
                    cutoff_frequency_hz=fx.get("cutoff_hz", 1000.0),
                    gain_db=fx.get("gain_db", 0.0),
                    q=fx.get("q", 1.0)
                ))
            elif fx_type == "AirEQ": 
                plugins.append(HighShelfFilter(
                    cutoff_frequency_hz=fx.get("cutoff_hz", 6000.0),
                    gain_db=fx.get("gain_db", 2.0)
                ))
                
            # 3. REVERB & DELAY
            elif fx_type == "Reverb":
                plugins.append(Reverb(
                    room_size=fx.get("room_size", 0.5),
                    damping=fx.get("damping", 0.5),
                    wet_level=fx.get("wet_level", 0.33),
                    dry_level=fx.get("dry_level", 0.4),
                    width=fx.get("width", 1.0)
                ))
            elif fx_type == "Delay":
                plugins.append(Delay(
                    delay_seconds=fx.get("delay_ms", 500.0) / 1000.0,
                    feedback=fx.get("feedback", 0.3),
                    mix=fx.get("mix", 0.5)
                ))
                
            # 4. MODULATION & SPECIAL
            elif fx_type == "Chorus":
                plugins.append(Chorus(
                    rate_hz=fx.get("rate_hz", 1.0),
                    depth=fx.get("depth", 0.25),
                    mix=fx.get("mix", 0.5)
                ))
            elif fx_type == "Distortion":
                plugins.append(Distortion(drive_db=fx.get("drive_db", 10.0)))
                
            # 5. TIME AND PITCH
            elif fx_type == "PitchShift":
                plugins.append(PitchShift(semitones=fx.get("semitones", 0.0)))
                
        self.board = Pedalboard(plugins)
        print(f"🎛️ تم تجهيز الرف بنجاح! عدد الفلاتر النشطة بالترتيب: {len(plugins)}")
        for i, p in enumerate(plugins):
            print(f"   {i+1}. {p.__class__.__name__}")
        
    def process(self, input_path, output_path):
        import subprocess # نضعه هنا لضمان توفره
        
        print(f"\n🚀 جاري معالجة الملف: {os.path.basename(input_path)}")
        
        # 🌟 خطوة الحماية العبقرية: تحويل أي ملف إلى WAV نقي ومفهوم برمجياً 🌟
        safe_wav = input_path + "_safe.wav"
        try:
            import imageio_ffmpeg
            ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
        except ImportError:
            ffmpeg_exe = "ffmpeg" # الاعتماد على النظام في حال عدم وجود المكتبة

        print("🔄 جاري تهيئة الملف ليكون بصيغة ستوديو قياسية...")
        try:
            # نجبر الملف أن يتحول إلى PCM WAV بتردد 44100Hz
            subprocess.run([
                ffmpeg_exe, "-y", "-i", input_path,
                "-ar", "44100", "-c:a", "pcm_s16le", safe_wav
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            # الآن نقرأ الملف النظيف والمضمون 100%
            audio, sample_rate = sf.read(safe_wav)
        except Exception as e:
            print(f"⚠️ لم نتمكن من تهيئة الملف، سنحاول قراءته مباشرة... {e}")
            audio, sample_rate = sf.read(input_path)
        
        # تجهيز الصوت لمكتبة Pedalboard
        if len(audio.shape) == 1:
            audio = audio.reshape(1, -1)
        else:
            audio = audio.T
            
        print("🎛️ جاري تطبيق الفلاتر الصوتية...")
        effected_audio = self.board(audio, sample_rate)
        
        # حفظ النتيجة
        sf.write(output_path, effected_audio.T, sample_rate)
        
        # حذف الملف المؤقت للتنظيف
        if os.path.exists(safe_wav):
            try:
                os.remove(safe_wav)
            except:
                pass
                
        print(f"✨ اكتمل التصدير بنجاح: {output_path}\n" + "="*50)


if __name__ == "__main__":
    import sys
    import json

    # يتوقع السكربت 3 مدخلات من Node.js: مسار الإدخال، مسار الإخراج، ومصفوفة الفلاتر (JSON)
    if len(sys.argv) < 4:
        print("❌ خطأ: يجب تمرير <input_file> <output_file> <json_config>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    try:
        # تحويل النص القادم من Node إلى مصفوفة بايثون
        effects_config = json.loads(sys.argv[3])
    except Exception as e:
        print(f"❌ خطأ في قراءة إعدادات الفلاتر (JSON): {e}")
        sys.exit(1)

    if os.path.exists(input_file):
        try:
            rack = ProfessionalEffectsRack()
            rack.build_chain(effects_config)
            rack.process(input_file, output_file)
            print("DONE_SUCCESS") # رسالة نجاح ليلتقطها خادم Node.js
        except Exception as e:
            print(f"❌ حدث خطأ أثناء المعالجة: {e}")
            sys.exit(1)
    else:
        print(f"❌ الملف الصوتي الأصلي غير موجود: {input_file}")
        sys.exit(1)