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