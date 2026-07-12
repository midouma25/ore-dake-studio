import React, { useState } from 'react';
import { Bot, Sparkles, Scissors, Mic2, Settings, FileEdit, Music, Target, Radio } from 'lucide-react';
import { Panel } from '../../common/Panel';
import { Button } from '../../common/Button';
import { Slider } from '../../common/Slider';
import { useAIJobStore } from '../../../store/useAIJobStore'; 
import { cn } from '../../../utils/classNames';

export const AIAudioRack = ({ onStemSeparation, onDeepClean, activeJobType, isProcessing: isRealProcessing, progressMessage }) => {
  const { startJob, isProcessing: isMockProcessing } = useAIJobStore();
  const [cleanStrength, setCleanStrength] = useState(100); // قوة التحسين الافتراضية

  const handleStartJob = (type, title) => {
    startJob({ id: `job_${Date.now()}`, type, title });
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        useAIJobStore.getState().completeJob();
        setTimeout(() => useAIJobStore.getState().cancelJob(), 2000);
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
    <div className="flex flex-col h-full bg-bgPrimary border-r border-borderColor w-80 shadow-lg z-10">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-borderColor bg-bgSecondary">
        <div className="flex items-center gap-2 text-textPrimary font-semibold">
          <Bot className="w-5 h-5 text-accentPrimary" />
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-accentPrimary to-emerald-400">
            AI Studio Panel
          </h2>
        </div>
        <button className="text-textSecondary hover:text-textPrimary transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        
        {/* 🎙️ 1. Studio Voice Enhancer (النموذج الأسطوري) */}
        <Panel title={<div className="flex items-center gap-2"><Radio className="w-4 h-4 text-accentPrimary" /> Studio Voice Enhancer</div>} defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary leading-relaxed">
              AI generously recreates missing frequencies, removes background noise, and adds high-end studio mic warmth to vocals.
            </p>
            <Slider label="Enhancement Blend" value={cleanStrength} min={0} max={100} unit="%" onChange={setCleanStrength} />
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Noise Gate</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> De-Reverb</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> AI Synth</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Warmth EQ</label>
            </div>
            
            <Button 
              className="w-full relative overflow-hidden bg-accentPrimary/10 text-accentPrimary hover:bg-accentPrimary/20 border border-accentPrimary/30" 
              variant={isRealProcessing && activeJobType === 'denoise' ? "secondary" : "primary"} 
              onClick={onDeepClean} 
              disabled={isRealProcessing || isMockProcessing}
            >
              {isRealProcessing && activeJobType === 'denoise' ? (
                 <span className="animate-pulse text-[11px] text-accentPrimary block px-2">{progressMessage || 'Processing...'}</span>
              ) : (
                'Enhance Voice'
              )}
            </Button>
          </div>
        </Panel>

        {/* ✂️ 2. Stem Separation */}
        <Panel title={<div className="flex items-center gap-2"><Scissors className="w-4 h-4 text-accentPrimary" /> Stem Separation</div>} defaultOpen={true}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Separate mixed audio into distinct studio tracks.</p>
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Vocals</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Drums</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Bass</label>
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer"><input type="checkbox" defaultChecked className="accent-accentPrimary" /> Other</label>
            </div>
            
            <Button 
              className="w-full relative overflow-hidden" 
              variant={isRealProcessing && activeJobType === 'stem' ? "secondary" : "primary"} 
              onClick={onStemSeparation} 
              disabled={isRealProcessing || isMockProcessing}
            >
              {isRealProcessing && activeJobType === 'stem' ? (
                 <span className="animate-pulse text-[11px] text-accentPrimary block px-2">{progressMessage || 'Processing...'}</span>
              ) : (
                'Split Stems'
              )}
            </Button>
          </div>
        </Panel>

        {/* 3. Text-Audio Editor */}
        <Panel title={<div className="flex items-center gap-2"><FileEdit className="w-4 h-4 text-accentPrimary" /> Text-Audio Editor</div>} defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Edit audio by editing the transcript text.</p>
            <Button className="w-full" variant="secondary" onClick={() => handleStartJob('text-edit', 'Text-Audio Alignment')} disabled={isMockProcessing || isRealProcessing}>
              Transcribe & Edit
            </Button>
          </div>
        </Panel>

        {/* 4. Voice Cloning */}
        <Panel title={<div className="flex items-center gap-2"><Mic2 className="w-4 h-4 text-accentPrimary" /> Voice Cloning</div>} defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Convert voice to character or custom model.</p>
            <select className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentPrimary w-full">
              <option>Anime: Levi</option>
              <option>Anime: Goku</option>
              <option>Celebrity: Morgan F.</option>
            </select>
            <Button className="w-full" variant="secondary" onClick={() => handleStartJob('voice-clone', 'Voice Cloning')} disabled={isMockProcessing || isRealProcessing}>
              Clone Voice
            </Button>
          </div>
        </Panel>

        {/* 5. Music & SFX Gen */}
        <Panel title={<div className="flex items-center gap-2"><Music className="w-4 h-4 text-accentPrimary" /> Music & SFX Gen</div>} defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Generate audio from text descriptions.</p>
            <textarea placeholder="e.g. Epic orchestral battle music..." className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentPrimary w-full h-20 resize-none"></textarea>
            <Button className="w-full" variant="secondary" onClick={() => handleStartJob('music-gen', 'Audio Generation')} disabled={isMockProcessing || isRealProcessing}>
              Generate
            </Button>
          </div>
        </Panel>

        {/* 6. Auto Mastering */}
        <Panel title={<div className="flex items-center gap-2"><Target className="w-4 h-4 text-accentPrimary" /> Auto-Mastering</div>} defaultOpen={false}>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary">Professional final polish for loudness and EQ.</p>
            <select className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentPrimary w-full">
              <option>Streaming (-14 LUFS)</option>
              <option>Broadcast (-23 LUFS)</option>
              <option>Podcast (-16 LUFS)</option>
            </select>
            <Button className="w-full" variant="secondary" onClick={() => handleStartJob('mastering', 'Auto Mastering')} disabled={isMockProcessing || isRealProcessing}>
              Master Track
            </Button>
          </div>
        </Panel>

      </div>
    </div>
  );
};