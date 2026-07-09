import React from 'react';
import { Settings2, Trash2, Eye, EyeOff, Lock, Unlock, Sparkles } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { useEffectsStore } from '../../../store/useEffectsStore';

export const EffectSlot = ({ effect, trackId }) => {
  const { toggleBypass, toggleLock, removeEffect, openEffectEditor } = useEffectsStore();

  return (
    <div className={cn(
      "flex items-center justify-between p-2 mb-1 rounded bg-bgPrimary border transition-all group hover:border-[#444]",
      effect.bypass ? "border-transparent opacity-60" : "border-borderColor",
      effect.isAi && !effect.bypass ? "border-accentSecondary/30 shadow-[0_0_8px_rgba(0,212,255,0.1)]" : ""
    )}>
      
      {/* Effect Name & AI Indicator */}
      <div className="flex items-center gap-2 overflow-hidden">
        {effect.isAi && (
          <Sparkles className="w-3.5 h-3.5 text-accentSecondary animate-pulse" />
        )}
        <span className={cn(
          "text-sm truncate select-none",
          effect.bypass ? "text-textSecondary line-through" : "text-textPrimary"
        )}>
          {effect.name}
        </span>
      </div>

      {/* Controls - visible on hover or if active */}
      <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => openEffectEditor(effect)}
          className="p-1 hover:bg-bgTertiary rounded text-textSecondary hover:text-accentPrimary transition-colors"
          title="Edit Effect"
        >
          <Settings2 className="w-3.5 h-3.5" />
        </button>
        
        <button 
          onClick={() => toggleBypass(trackId, effect.id)}
          className="p-1 hover:bg-bgTertiary rounded text-textSecondary hover:text-white transition-colors"
          title={effect.bypass ? "Enable Effect" : "Bypass Effect"}
        >
          {effect.bypass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
        
        <button 
          onClick={() => toggleLock(trackId, effect.id)}
          className="p-1 hover:bg-bgTertiary rounded text-textSecondary hover:text-warning transition-colors"
          title={effect.locked ? "Unlock Parameters" : "Lock Parameters"}
        >
          {effect.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>
        
        <button 
          onClick={() => removeEffect(trackId, effect.id)}
          className="p-1 hover:bg-danger/20 rounded text-textSecondary hover:text-danger transition-colors"
          title="Remove Effect"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};