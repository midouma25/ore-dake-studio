import { create } from 'zustand';

export const useEffectsStore = create((set) => ({
  activeTrackId: 'master_track', 
  
  // 🌟 State جديدة لحفظ الجزء المحدد من الصوت (Regions)
  selectedRegion: null, // سيحتوي على: { trackId, start, end }
  
  trackEffects: {
    'track_1': [
      { id: 'eff_1', name: 'Compressor', category: 'amplitude_compression', bypass: false, locked: false, isAi: false },
      { id: 'eff_2', name: 'DeepFilterNet3', category: 'noise_reduction', bypass: false, locked: true, isAi: true }
    ]
  },
  
  editingEffect: null, 

  // Actions
  setActiveTrack: (trackId) => set({ activeTrackId: trackId }),
  
  // 🌟 أكشن جديد لتحديث الجزء المحدد
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  
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