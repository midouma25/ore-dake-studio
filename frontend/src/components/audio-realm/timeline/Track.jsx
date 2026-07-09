import React from 'react';
import { Mic, Volume2, Settings } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { Clip } from './Clip';
import { useTimelineStore } from '../../../store/useTimelineStore';
import { useEffectsStore } from '../../../store/useEffectsStore';

export const Track = ({ track, index }) => {
  const { zoomLevel, toggleTrackMute, toggleTrackSolo } = useTimelineStore();
  const { activeTrackId, setActiveTrack } = useEffectsStore();

  const isActive = activeTrackId === track.id;

  return (
    <div className="flex w-full h-24 border-b border-borderColor bg-bgPrimary group">
      
      {/* Track Header (Controls) */}
      <div 
        className={cn(
          "w-64 flex-shrink-0 flex flex-col p-2 border-r border-borderColor transition-colors cursor-pointer",
          isActive ? "bg-bgTertiary" : "bg-bgSecondary hover:bg-bgTertiary/50"
        )}
        onClick={() => setActiveTrack(track.id)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-sm">{track.icon}</span>
            <span className="text-sm font-medium text-textPrimary truncate">{index + 1}. {track.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-auto">
          {/* Mute Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); toggleTrackMute(track.id); }}
            className={cn(
              "flex-1 py-1 text-xs font-bold rounded transition-colors",
              track.isMuted ? "bg-danger text-white" : "bg-bgPrimary text-textSecondary hover:text-textPrimary"
            )}
          >
            M
          </button>
          
          {/* Solo Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); toggleTrackSolo(track.id); }}
            className={cn(
              "flex-1 py-1 text-xs font-bold rounded transition-colors",
              track.isSolo ? "bg-warning text-bgPrimary" : "bg-bgPrimary text-textSecondary hover:text-textPrimary"
            )}
          >
            S
          </button>
          
          {/* Arm Record Button */}
          <button className="flex-1 py-1 flex justify-center bg-bgPrimary rounded text-textSecondary hover:text-danger transition-colors">
            <Mic className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Track Lane (Timeline Area) */}
      <div className="flex-1 relative overflow-hidden bg-[#111] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik00MCAwSDBWNDBIMHoiLz48L2c+PC9zdmc+')]">
        
        {/* Render Clips inside this track */}
        {track.clips.map(clip => (
          <Clip key={clip.id} clip={clip} zoomLevel={zoomLevel} />
        ))}
      </div>
    </div>
  );
};