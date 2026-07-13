import os
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
        print(f"\n🚀 جاري معالجة الملف: {os.path.basename(input_path)}")
        audio, sample_rate = sf.read(input_path)
        
        if len(audio.shape) == 1:
            audio = audio.reshape(1, -1)
        else:
            audio = audio.T
            
        effected_audio = self.board(audio, sample_rate)
        
        sf.write(output_path, effected_audio.T, sample_rate)
        print(f"✨ اكتمل التصدير بجودة VST المطلقة: {output_path}\n" + "="*50)

# ==========================================
# 🧪 تجربة "رف المؤثرات" محلياً
# ==========================================
if __name__ == "__main__":
    react_payload = {
        "effects_chain": [
            {"type": "NoiseGate", "threshold_db": -45, "ratio": 4, "attack_ms": 1, "release_ms": 100},
            {"type": "HighpassFilter", "cutoff_hz": 80},
            {"type": "ParametricEQ_Band", "cutoff_hz": 250, "gain_db": -3.0, "q": 1.2},
            {"type": "ParametricEQ_Band", "cutoff_hz": 3500, "gain_db": -4.0, "q": 2.0},
            {"type": "AirEQ", "cutoff_hz": 6000, "gain_db": 3.0},
            {"type": "Compressor", "threshold_db": -18, "ratio": 3, "attack_ms": 5, "release_ms": 50},
            {"type": "Limiter", "threshold_db": -1.0}
        ]
    }

    # ⚠️ ضع ملفاً صوتياً للتجربة داخل مجلد ai-engine باسم "test_input.wav" أو غير المسار هنا
    current_dir = os.path.dirname(os.path.abspath(r"C:\Users\seifg\Downloads\download"))
    input_file = os.path.join(current_dir, "anime_high_goku_actor_screaming.mp3")
    output_file = os.path.join(current_dir, "test_output_processed.wav")

    if os.path.exists(input_file):
        rack = ProfessionalEffectsRack()
        rack.build_chain(react_payload["effects_chain"])
        rack.process(input_file, output_file)
    else:
        print(f"⚠️ يرجى وضع ملف صوتي باسم 'test_input.wav' داخل مجلد: {current_dir}")