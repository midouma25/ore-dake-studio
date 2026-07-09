import React, { useState, useEffect } from 'react';
import { Save, Trash2, Star, Play, Pause, SkipBack, SkipForward, Repeat, Activity, Check, X } from 'lucide-react';
import { Modal } from '../../common/Modal';
import { Slider } from '../../common/Slider';
import { Button } from '../../common/Button';
import { useEffectsStore } from '../../../store/useEffectsStore';
import { cn } from '../../../utils/classNames';

export const EffectWindow = () => {
  const { editingEffect, closeEffectEditor, activeTrackId } = useEffectsStore();
  
  // Local state to hold temporary parameter changes before applying
  const [localParams, setLocalParams] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  // Sync local state when a new effect is opened
  useEffect(() => {
    if (editingEffect) {
      // In a real app, editingEffect.parameters would come from the store
      // Here we mock default Compressor parameters if none exist
      setLocalParams(editingEffect.parameters || {
        threshold: -20,
        ratio: 3,
        attack: 10,
        release: 100,
        makeupGain: 0,
        dry: 100,
        wet: 35
      });
    }
  }, [editingEffect]);

  if (!editingEffect) return null;

  const handleParamChange = (key, value) => {
    setLocalParams(prev => ({ ...prev, [key]: value }));
    // In a real Web Audio API setup, you might dispatch this change immediately 
    // to hear it in real-time during playback.
  };

  const handleApply = () => {
    // Logic to save localParams back to the global store for this specific effect
    console.log("Applying params to", editingEffect.name, localParams);
    closeEffectEditor();
  };

  return (
    <Modal
      isOpen={!!editingEffect}
      onClose={closeEffectEditor}
      title={
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-accentPrimary" />
          <span>Effect - {editingEffect.name}</span>
        </div>
      }
      width="max-w-3xl"
      footer={
        <div className="flex items-center justify-between w-full text-xs text-textSecondary">
          <div className="flex gap-4">
            <span>In: Stereo</span>
            <span>Out: Stereo</span>
            <span>Latency: 0.0 ms</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={closeEffectEditor} icon={X}>Cancel</Button>
            <Button variant="primary" onClick={handleApply} icon={Check}>Apply</Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        
        {/* Presets Bar */}
        <div className="flex items-center justify-between p-3 rounded-md bg-bgTertiary border border-borderColor">
          <div className="flex items-center gap-3">
            <span className="text-sm text-textSecondary">Presets:</span>
            <select className="bg-bgSecondary border border-borderColor text-textPrimary text-sm rounded px-3 py-1.5 outline-none focus:border-accentPrimary">
              <option>(Default)</option>
              <option>Vocal Compressor</option>
              <option>Punchy Drums</option>
              <option>Mastering Bus</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" icon={Save}>Save</Button>
            <Button variant="ghost" size="sm" icon={Trash2}>Delete</Button>
            <Button variant="ghost" size="sm" icon={Star}>Favorite</Button>
          </div>
        </div>

        {/* Characteristics (Dynamic based on Effect Type) */}
        {/* Example: Compressor Parameters */}
        <div className="border border-borderColor rounded-md overflow-hidden">
          <div className="bg-bgTertiary px-4 py-2 border-b border-borderColor text-sm font-medium text-center text-textSecondary tracking-wider">
            CHARACTERISTICS
          </div>
          <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-6">
            <Slider 
              label="Threshold" 
              value={localParams.threshold || -20} 
              min={-60} max={0} unit="dB" step={0.1}
              onChange={(val) => handleParamChange('threshold', val)}
            />
            <Slider 
              label="Ratio" 
              value={localParams.ratio || 3} 
              min={1} max={20} unit=":1" step={0.1}
              onChange={(val) => handleParamChange('ratio', val)}
            />
            <Slider 
              label="Attack" 
              value={localParams.attack || 10} 
              min={0.1} max={500} unit="ms" step={1}
              onChange={(val) => handleParamChange('attack', val)}
            />
            <Slider 
              label="Release" 
              value={localParams.release || 100} 
              min={10} max={3000} unit="ms" step={10}
              onChange={(val) => handleParamChange('release', val)}
            />
            <Slider 
              label="Makeup Gain" 
              value={localParams.makeupGain || 0} 
              min={0} max={30} unit="dB" step={0.5}
              className="col-span-2 w-1/2 pr-4"
              onChange={(val) => handleParamChange('makeupGain', val)}
            />
          </div>
        </div>

        {/* Output Level */}
        <div className="border border-borderColor rounded-md overflow-hidden">
          <div className="bg-bgTertiary px-4 py-2 border-b border-borderColor text-sm font-medium text-center text-textSecondary tracking-wider">
            OUTPUT LEVEL
          </div>
          <div className="p-5 flex items-center gap-8">
            <Slider 
              label="Dry" 
              value={localParams.dry || 100} 
              min={0} max={100} unit="%" 
              onChange={(val) => handleParamChange('dry', val)}
            />
            <Slider 
              label="Wet" 
              value={localParams.wet || 35} 
              min={0} max={100} unit="%" 
              onChange={(val) => handleParamChange('wet', val)}
            />
          </div>
          <div className="px-5 pb-4">
            <label className="flex items-center gap-2 text-sm text-textSecondary cursor-pointer w-fit">
              <input type="checkbox" className="rounded border-borderColor bg-bgTertiary text-accentPrimary focus:ring-accentPrimary" defaultChecked />
              Sum Inputs
            </label>
          </div>
        </div>

        {/* Transport & Preview */}
        <div className="flex items-center justify-between p-3 rounded-md bg-bgTertiary border border-borderColor">
          <Button 
            variant={isPlaying ? "primary" : "secondary"} 
            size="sm" 
            icon={isPlaying ? Pause : Play}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "Stop Preview" : "Preview"}
          </Button>
          
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-textSecondary hover:text-textPrimary hover:bg-bgSecondary rounded transition-colors"><SkipBack className="w-4 h-4" /></button>
            <button 
              className="p-1.5 text-textSecondary hover:text-textPrimary hover:bg-bgSecondary rounded transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button className="p-1.5 text-textSecondary hover:text-textPrimary hover:bg-bgSecondary rounded transition-colors"><SkipForward className="w-4 h-4" /></button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              icon={Repeat}
              className={cn(isLooping ? "text-accentPrimary bg-accentPrimary/10" : "")}
              onClick={() => setIsLooping(!isLooping)}
            >
              Loop
            </Button>
            <Button variant="ghost" size="sm" icon={Activity}>Graph</Button>
          </div>
        </div>

      </div>
    </Modal>
  );
};