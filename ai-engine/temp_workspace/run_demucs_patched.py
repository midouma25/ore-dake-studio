
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
sys.argv = ['demucs', '-n', 'htdemucs', '--out', 'E:\\ore-dake-studio\\ai-engine\\temp_workspace\\demucs_out', 'E:\\ore-dake-studio\\ai-engine\\temp_workspace\\safe_input.wav']
sys.exit(main())
