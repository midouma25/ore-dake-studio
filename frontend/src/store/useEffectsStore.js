import { create } from 'zustand';

export const useEffectsStore = create((set) => ({
  // Active track being edited in the rack
  activeTrackId: 'track_1', 
  
  // Store effects per track: { track_1: [effect1, effect2], track_2: [] }
  trackEffects: {
    'track_1': [
      { id: 'eff_1', name: 'Compressor', category: 'amplitude_compression', bypass: false, locked: false, isAi: false },
      { id: 'eff_2', name: 'DeepFilterNet3', category: 'noise_reduction', bypass: false, locked: true, isAi: true }
    ]
  },
  
  // State for the Effect Window Modal
  editingEffect: null, // Holds the effect object currently being edited

  // Actions
  setActiveTrack: (trackId) => set({ activeTrackId: trackId }),
  
  addEffect: (trackId, effect) => set((state) => ({
    trackEffects: {
      ...state.trackEffects,
      [trackId]: [...(state.trackEffects[trackId] || []), effect]
    }
  })),

  removeEffect: (trackId, effectId) => set((state) => ({
    trackEffects: {
      ...state.trackEffects,
      [trackId]: state.trackEffects[trackId].filter(e => e.id !== effectId)
    }
  })),

  toggleBypass: (trackId, effectId) => set((state) => ({
    trackEffects: {
      ...state.trackEffects,
      [trackId]: state.trackEffects[trackId].map(e => 
        e.id === effectId ? { ...e, bypass: !e.bypass } : e
      )
    }
  })),

  toggleLock: (trackId, effectId) => set((state) => ({
    trackEffects: {
      ...state.trackEffects,
      [trackId]: state.trackEffects[trackId].map(e => 
        e.id === effectId ? { ...e, locked: !e.locked } : e
      )
    }
  })),

  openEffectEditor: (effect) => set({ editingEffect: effect }),
  closeEffectEditor: () => set({ editingEffect: null }),
}));