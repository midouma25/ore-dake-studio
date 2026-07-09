import React, { useState } from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Rewind, FastForward, Mic, Repeat } from 'lucide-react';
import { cn } from '../../utils/classNames';
import { useTimelineStore } from '../../store/useTimelineStore';
import { formatTimecode } from '../../utils/timeUtils';

export const Transport = () => {
  const { isPlaying, togglePlay, playheadPosition, duration, setPlayheadPosition } = useTimelineStore();
  const [isLooping, setIsLooping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleStop = () => {
    if (isPlaying) togglePlay();
    if (isRecording) setIsRecording(false);
    setPlayheadPosition(0);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isPlaying && !isRecording) togglePlay();
  };

  const btnBase = "p-2 rounded hover:bg-bgTertiary transition-colors text-textSecondary hover:text-textPrimary flex items-center justify-center";

  return (
    <div className="flex items-center gap-6 px-4">
      {/* Time Display */}
      <div className="flex items-center gap-1 font-mono text-sm tracking-wider bg-bgPrimary border border-borderColor px-3 py-1.5 rounded text-accentPrimary shadow-inner">
        <span>{formatTimecode(playheadPosition)}</span>
        <span className="text-textSecondary opacity-50">/</span>
        <span className="text-textSecondary">{formatTimecode(duration)}</span>
      </div>

      {/* Main Transport Buttons */}
      <div className="flex items-center gap-1">
        <button className={btnBase} title="Go to Start" onClick={() => setPlayheadPosition(0)}>
          <SkipBack className="w-4 h-4" />
        </button>
        <button className={btnBase} title="Rewind">
          <Rewind className="w-4 h-4" />
        </button>
        
        {/* Play/Pause */}
        <button 
          onClick={togglePlay}
          className={cn(
            btnBase, 
            "w-12 h-10 mx-1",
            isPlaying ? "bg-bgTertiary text-accentPrimary" : "bg-bgPrimary"
          )}
          title={isPlaying ? "Pause (Space)" : "Play (Space)"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
        </button>
        
        {/* Stop */}
        <button onClick={handleStop} className={btnBase} title="Stop">
          <Square className="w-4 h-4 fill-current" />
        </button>
        
        <button className={btnBase} title="Fast Forward">
          <FastForward className="w-4 h-4" />
        </button>
        <button className={btnBase} title="Go to End" onClick={() => setPlayheadPosition(duration)}>
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Record & Loop */}
      <div className="flex items-center gap-2 border-l border-borderColor pl-4">
        <button 
          onClick={handleRecord}
          className={cn(
            btnBase,
            isRecording ? "text-danger hover:text-danger bg-danger/10" : ""
          )}
          title="Record (Ctrl+Space)"
        >
          <Mic className={cn("w-4 h-4", isRecording ? "animate-pulse" : "")} />
        </button>
        
        <button 
          onClick={() => setIsLooping(!isLooping)}
          className={cn(
            btnBase,
            isLooping ? "text-accentPrimary hover:text-accentPrimary bg-accentPrimary/10" : ""
          )}
          title="Loop Playback"
        >
          <Repeat className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};