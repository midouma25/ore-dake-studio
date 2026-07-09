import torch
import gc

class GPUManager:
    @staticmethod
    def get_vram_usage():
        """Returns current VRAM usage in GB"""
        if not torch.cuda.is_available():
            return 0.0
        allocated = torch.cuda.memory_allocated() / (1024 ** 3)
        return round(allocated, 2)

    @staticmethod
    def clear_vram():
        """Force PyTorch to release unused cached memory"""
        if torch.cuda.is_available():
            gc.collect()
            torch.cuda.empty_cache()
            print(f"[GPU Manager] VRAM Cleared. Current usage: {GPUManager.get_vram_usage()} GB")

gpu_manager = GPUManager()