import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Maximize, Mic, MonitorPlay, Type, Volume2, Video } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { formatTimecode } from '../../../utils/timeUtils';
import { Button } from '../../common/Button';

export const VideoDubbingTimeline = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPos, setPlayheadPos] = useState(0);
  const duration = 330; // 5:30 in seconds for demo
  
  // Mock Video Tracks Data
  const tracks = [
    { id: 'v1', type: 'video', name: 'Source_Video.mp4', icon: <Video className="w-4 h-4" />, color: 'var(--accent-secondary)' },
    { id: 'a1', type: 'audio', name: 'Arabic_Dub.wav', icon: <Mic className="w-4 h-4" />, color: 'var(--waveform-color)' },
    { id: 'a2', type: 'audio', name: 'Japanese_Dub.wav', icon: <Mic className="w-4 h-4" />, color: 'var(--waveform-color)', muted: true },
    { id: 's1', type: 'subtitle', name: 'Arabic_Subtitles.srt', icon: <Type className="w-4 h-4" />, color: 'var(--warning)' },
  ];

  const handlePlayToggle = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-col w-full h-full bg-bgPrimary overflow-hidden flex-1 border-r border-borderColor">
      
      {/* Top Section: Video Preview Window */}
      <div className="h-[45%] border-b border-borderColor bg-black flex flex-col relative">
        <div className="flex-1 flex items-center justify-center relative overflow-hidden group">
          {/* Fake Video Player Screen */}
          <div className="w-full h-full max-w-4xl aspect-video bg-bgSecondary border border-borderColor/30 flex items-center justify-center relative shadow-2xl">
            <MonitorPlay className="w-16 h-16 text-textSecondary opacity-20" />
            
            {/* Mock Subtitle Overlay */}
            <div className="absolute bottom-6 w-full text-center">
              <span className="bg-black/70 text-white px-4 py-1.5 rounded text-lg font-medium tracking-wide">
               Welcome to the Video Dubbing Timeline 
              </span>
            </div>
          </div>
        </div>

        {/* Video Transport Controls */}
        <div className="h-12 bg-bgSecondary border-t border-borderColor flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-textSecondary hover:text-textPrimary rounded"><SkipBack className="w-4 h-4" /></button>
            <button onClick={handlePlayToggle} className="p-1.5 text-accentSecondary hover:text-white rounded">
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button className="p-1.5 text-textSecondary hover:text-textPrimary rounded"><SkipForward className="w-4 h-4" /></button>
            
            <div className="ml-4 font-mono text-sm text-textSecondary">
              <span className="text-textPrimary">{formatTimecode(playheadPos)}</span> / {formatTimecode(duration)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" icon={Mic} className="text-danger hover:text-danger hover:bg-danger/10">Dub</Button>
            <button className="p-1.5 text-textSecondary hover:text-textPrimary rounded"><Maximize className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Timeline Tracks */}
      <div className="flex-1 flex flex-col overflow-hidden bg-bgPrimary relative">
        
        {/* Playhead Line spanning tracks */}
        <div className="absolute top-0 bottom-0 w-px bg-accentSecondary z-20 left-[20%]" />
        
        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {tracks.map((track, idx) => (
            <div key={track.id} className="flex h-20 border-b border-borderColor group">
              
              {/* Track Header */}
              <div className="w-56 flex-shrink-0 bg-bgSecondary border-r border-borderColor p-2 flex flex-col justify-between">
                <div className="flex items-center gap-2 overflow-hidden text-textPrimary">
                  <span className="text-textSecondary">{track.icon}</span>
                  <span className="text-sm font-medium truncate">{track.name}</span>
                </div>
                
                <div className="flex items-center gap-1 mt-auto">
                  <button className={cn("flex-1 py-0.5 text-[10px] font-bold rounded", track.muted ? "bg-danger text-white" : "bg-bgPrimary text-textSecondary hover:text-textPrimary")}>M</button>
                  <button className="flex-1 py-0.5 text-[10px] font-bold rounded bg-bgPrimary text-textSecondary hover:text-textPrimary">S</button>
                  {track.type === 'audio' && <button className="flex-1 flex justify-center py-0.5 rounded bg-bgPrimary text-textSecondary"><Volume2 className="w-3 h-3" /></button>}
                </div>
              </div>

              {/* Track Lane (Clips Area) */}
              <div className="flex-1 relative bg-[#111] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik00MCAwSDBWNDBIMHoiLz48L2c+PC9zdmc+')]">
                
                {/* Mock Clip */}
                <div 
                  className="absolute top-1 bottom-1 rounded border border-black/30 overflow-hidden cursor-pointer hover:border-white/50 transition-colors"
                  style={{ left: '5%', width: '80%', backgroundColor: `${track.color}33` }}
                >
                  <div className="text-[10px] px-1 bg-black/50 text-white/80 truncate border-b border-black/20">{track.name}</div>
                  
                  {/* Visual indication based on track type */}
                  {track.type === 'video' && (
                    <div className="absolute inset-0 top-4 flex items-center justify-around opacity-50 px-2">
                      {[1,2,3,4,5,6].map(i => <div key={i} className="h-4/5 aspect-[4/3] bg-black/50 rounded-sm border border-white/10" />)}
                    </div>
                  )}
                  {track.type === 'subtitle' && (
                    <div className="absolute inset-0 top-4 flex items-center px-4 gap-4">
                      <div className="h-3 w-20 bg-warning/50 rounded-full" />
                      <div className="h-3 w-32 bg-warning/50 rounded-full" />
                      <div className="h-3 w-16 bg-warning/50 rounded-full" />
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};