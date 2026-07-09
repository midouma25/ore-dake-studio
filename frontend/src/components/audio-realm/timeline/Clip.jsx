import React from 'react';
import { cn } from '../../../utils/classNames';

export const Clip = ({ clip, zoomLevel }) => {
  // Calculate pixel values based on time and zoom level
  // Assuming 1 second = 10px at 100% zoom
  const pixelsPerSecond = (zoomLevel / 100) * 10;
  
  const leftPosition = clip.startTime * pixelsPerSecond;
  const width = clip.duration * pixelsPerSecond;

  return (
    <div 
      className={cn(
        "absolute top-1 bottom-1 rounded-md border border-black/30 overflow-hidden group cursor-pointer",
        "hover:border-white/50 transition-colors shadow-sm"
      )}
      style={{
        left: `${leftPosition}px`,
        width: `${width}px`,
        backgroundColor: `${clip.color}33`, // 20% opacity background
      }}
    >
      {/* Clip Header */}
      <div 
        className="text-[10px] px-1 py-0.5 text-white/80 font-medium truncate bg-black/40 border-b border-black/20"
      >
        {clip.name}
      </div>
      
      {/* Waveform Mockup (In production: WaveSurfer.js canvas goes here) */}
      <div className="absolute inset-0 top-5 flex items-center justify-center opacity-70 pointer-events-none">
        <div className="w-full h-1/2 flex items-center justify-between px-1">
          {/* Creating fake waveform bars for visual effect */}
          {Array.from({ length: Math.max(5, Math.floor(width / 4)) }).map((_, i) => (
            <div 
              key={i} 
              className="w-[2px] rounded-full" 
              style={{
                height: `${Math.random() * 80 + 20}%`,
                backgroundColor: clip.color
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};