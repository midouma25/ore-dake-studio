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