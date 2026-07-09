import React from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Track } from './Track';
import { useTimelineStore } from '../../../store/useTimelineStore';

export const SmartAudioTimeline = () => {
  const { tracks, zoomLevel, setZoomLevel, playheadPosition } = useTimelineStore();

  const handleZoom = (direction) => {
    if (direction === 'in' && zoomLevel < 500) setZoomLevel(zoomLevel + 20);
    if (direction === 'out' && zoomLevel > 20) setZoomLevel(zoomLevel - 20);
  };

  return (
    <div className="flex flex-col w-full h-full bg-bgPrimary overflow-hidden flex-1">
      
      {/* Timeline Toolbar & Time Ruler */}
      <div className="flex h-8 border-b border-borderColor bg-bgSecondary">
        
        {/* Left corner (above track headers) */}
        <div className="w-64 flex-shrink-0 border-r border-borderColor flex items-center justify-between px-2">
          <div className="flex gap-1">
            <button onClick={() => handleZoom('out')} className="p-1 text-textSecondary hover:text-textPrimary rounded"><ZoomOut className="w-3.5 h-3.5" /></button>
            <button onClick={() => handleZoom('in')} className="p-1 text-textSecondary hover:text-textPrimary rounded"><ZoomIn className="w-3.5 h-3.5" /></button>
            <button onClick={() => setZoomLevel(100)} className="p-1 text-textSecondary hover:text-textPrimary rounded"><Maximize className="w-3.5 h-3.5" /></button>
          </div>
          <span className="text-xs text-textSecondary font-mono">{zoomLevel}%</span>
        </div>
        
        {/* Time Ruler (Right side) */}
        <div className="flex-1 relative overflow-hidden bg-bgTertiary">
          <div 
            className="absolute top-0 bottom-0 border-l-2 border-accentPrimary z-50 pointer-events-none transition-all duration-75"
            style={{ 
              left: `${playheadPosition * (zoomLevel / 100) * 10}px`,
              filter: 'drop-shadow(0 0 4px var(--accent-primary))'
            }}
          >
            {/* Playhead Triangle */}
            <div className="absolute -top-0 -left-1.5 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-accentPrimary"></div>
          </div>
          
          {/* Fake Ruler markings */}
          <div className="w-full h-full opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, var(--text-primary) 0, transparent 1px, transparent 50px, var(--text-secondary) 50px, transparent 51px, transparent 100px)'
          }}></div>
        </div>
      </div>

      {/* Tracks Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative custom-scrollbar pb-24">
        {tracks.map((track, index) => (
          <Track key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
};