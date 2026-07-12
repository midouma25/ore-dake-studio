
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
