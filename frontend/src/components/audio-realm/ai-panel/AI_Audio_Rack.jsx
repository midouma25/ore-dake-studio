import React, { useState } from 'react';
import { Bot, Sparkles, Scissors, Mic2, Settings } from 'lucide-react';
import { Panel } from '../../common/Panel';
import { Button } from '../../common/Button';
import { Slider } from '../../common/Slider';
import { useAIJobStore } from '../../../store/useAIJobStore';
import { cn } from '../../../utils/classNames';

export const AIAudioRack = () => {
  const { startJob, isProcessing } = useAIJobStore();
  const [cleanStrength, setCleanStrength] = useState(70);

  // Mock function to simulate starting an AI job
  const handleStartJob = (type, title) => {
    startJob({ id: `job_${Date.now()}`, type, title });
    
    // Simulate WebSocket progress updates for demonstration
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        useAIJobStore.getState().completeJob();
        setTimeout(() => useAIJobStore.getState().cancelJob(), 2000); // Close modal after 2s
      } else {
        useAIJobStore.getState().updateProgress(
          currentProgress, 
          currentProgress < 50 ? 'Analyzing audio features...' : 'Applying neural network models...', 
          `${Math.floor(100 - currentProgress)}s`
        );
      }
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-bgPrimary border-l border-borderColor w-80">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-borderColor bg-bgSecondary">
        <div className="flex items-center gap-2 text-textPrimary font-semibold">
          <Bot className="w-5 h-5 text-accentSecondary" />
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-accentSecondary to-accentPrimary">
            AI Studio
          </h2>
        </div>
        <button className="text-textSecondary hover:text-textPrimary transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Tools Container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        
        {/* Deep Clean (DeepFilterNet3) */}
        <Panel title={
          <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-accentSecondary" /> Deep Clean</div>
        } defaultOpen={true}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Remove noise, hum, reverb, and echo automatically.</p>
            
            <Slider 
              label="Strength" 
              value={cleanStrength} 
              min={0} max={100} unit="%" 
              onChange={setCleanStrength} 
            />
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentSecondary" /> Remove Noise</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentSecondary" /> Remove Reverb</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentSecondary" /> Remove Hum</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentSecondary" /> Enhance Voice</label>
            </div>

            <Button 
              className="w-full bg-accentSecondary/10 text-accentSecondary hover:bg-accentSecondary/20 border border-accentSecondary/30"
              onClick={() => handleStartJob('denoise', 'Deep Clean (DeepFilterNet3)')}
              disabled={isProcessing}
              icon={Sparkles}
            >
              Process Audio
            </Button>
          </div>
        </Panel>

        {/* Stem Separation (HTDemucs v4) */}
        <Panel title={
          <div className="flex items-center gap-2"><Scissors className="w-4 h-4 text-accentSecondary" /> Stem Separation</div>
        } defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Separate mixed audio into distinct tracks.</p>
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentSecondary" /> Vocals</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentSecondary" /> Drums</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentSecondary" /> Bass</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentSecondary" /> Other</label>
            </div>
            <Button 
              className="w-full"
              variant="secondary"
              onClick={() => handleStartJob('stem', 'Stem Separation (HTDemucs)')}
              disabled={isProcessing}
            >
              Split Stems
            </Button>
          </div>
        </Panel>

        {/* Voice Cloning (RVC v2) */}
        <Panel title={
          <div className="flex items-center gap-2"><Mic2 className="w-4 h-4 text-accentSecondary" /> Voice Cloning</div>
        } defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Convert voice to character or custom model.</p>
            <select className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentSecondary w-full">
              <option>Anime: Levi</option>
              <option>Anime: Goku</option>
              <option>Celebrity: Morgan F.</option>
            </select>
            <Button 
              className="w-full"
              variant="secondary"
              onClick={() => handleStartJob('voice-clone', 'Voice Cloning (RVC v2)')}
              disabled={isProcessing}
            >
              Clone Voice
            </Button>
          </div>
        </Panel>

      </div>
    </div>
  );
};