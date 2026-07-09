import React from 'react';
import { Sliders, Plus } from 'lucide-react';
import { Panel } from '../../common/Panel';
import { EffectSlot } from './EffectSlot';
import { useEffectsStore } from '../../../store/useEffectsStore';

// Define the categories exactly as specified in the Mega Prompt
const EFFECT_CATEGORIES = [
  { id: 'amplitude_compression', name: '1. Amplitude and Compression' },
  { id: 'delay_echo', name: '2. Delay and Echo' },
  { id: 'diagnostics', name: '3. Diagnostics' },
  { id: 'filter_eq', name: '4. Filter and EQ' },
  { id: 'modulation', name: '5. Modulation' },
  { id: 'noise_reduction', name: '6. Noise Reduction / Restoration' },
  { id: 'reverb', name: '7. Reverb' },
  { id: 'special', name: '8. Special' },
  { id: 'stereo_imagery', name: '9. Stereo Imagery' },
  { id: 'time_pitch', name: '10. Time and Pitch' },
  { id: 'vst', name: '11. VST / VST3 / Audio Plug-In Manager' },
];

export const EffectsRack = () => {
  const { activeTrackId, trackEffects } = useEffectsStore();
  
  // Get active effects for the current track
  const activeEffects = trackEffects[activeTrackId] || [];

  return (
    <div className="flex flex-col h-full bg-bgPrimary border-l border-borderColor w-80">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-borderColor bg-bgSecondary">
        <div className="flex items-center gap-2 text-textPrimary font-semibold">
          <Sliders className="w-4 h-4 text-accentPrimary" />
          <h2>Effects Rack</h2>
        </div>
        <div className="text-xs text-textSecondary font-mono bg-bgTertiary px-2 py-1 rounded">
          {activeTrackId.replace('_', ' ').toUpperCase()}
        </div>
      </div>

      {/* Scrollable Categories Area */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {EFFECT_CATEGORIES.map((category) => {
          // Filter effects belonging to this category
          const categoryEffects = activeEffects.filter(e => e.category === category.id);
          
          return (
            <Panel 
              key={category.id} 
              title={category.name} 
              defaultOpen={categoryEffects.length > 0} // Auto-open if it has effects
              actionButton={
                <button 
                  className="p-1 hover:bg-[#444] rounded text-textSecondary hover:text-accentPrimary transition-colors"
                  title={`Add effect to ${category.name}`}
                  onClick={() => console.log('Open effect picker for', category.id)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              }
            >
              {categoryEffects.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {categoryEffects.map(effect => (
                    <EffectSlot 
                      key={effect.id} 
                      effect={effect} 
                      trackId={activeTrackId} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-xs text-textSecondary italic text-center py-2 opacity-50">
                  (Empty)
                </div>
              )}
            </Panel>
          );
        })}
      </div>
    </div>
  );
};