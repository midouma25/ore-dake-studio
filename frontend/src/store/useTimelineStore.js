import { create } from 'zustand';

export const useTimelineStore = create((set) => ({
  // Playback & View State
  isPlaying: false,
  playheadPosition: 0, // in seconds
  zoomLevel: 100, // percentage
  duration: 180, // total timeline duration in seconds (3 mins for demo)

  // Tracks State
  tracks: [
    { 
      id: 'track_1', 
      name: 'Voiceover', 
      icon: '🎙️', 
      isMuted: false, 
      isSolo: false, 
      isArmed: false, 
      volume: 0, 
      pan: 0,
      clips: [
        { id: 'clip_1', name: 'Voiceover.wav', startTime: 0, duration: 150, color: 'var(--waveform-color)' }
      ]
    },
    { 
      id: 'track_2', 
      name: 'Background Music', 
      icon: '🎵', 
      isMuted: false, 
      isSolo: false, 
      isArmed: false, 
      volume: -12, 
      pan: 0,
      clips: [
        { id: 'clip_2', name: 'Ambient_Bg.mp3', startTime: 0, duration: 105, color: 'var(--accent-secondary)' }
      ]
    },
    { 
      id: 'track_3', 
      name: 'SFX Track', 
      icon: '🔊', 
      isMuted: false, 
      isSolo: false, 
      isArmed: false, 
      volume: 0, 
      pan: 0,
      clips: [
        { id: 'clip_3', name: 'Explosion.wav', startTime: 60, duration: 8, color: 'var(--warning)' }
      ]
    }
  ],

  // Actions
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setZoomLevel: (level) => set({ zoomLevel: level }),
  setPlayheadPosition: (pos) => set({ playheadPosition: pos }),
  
  // Track Actions
  toggleTrackMute: (trackId) => set((state) => ({
    tracks: state.tracks.map(t => t.id === trackId ? { ...t, isMuted: !t.isMuted } : t)
  })),
  toggleTrackSolo: (trackId) => set((state) => ({
    tracks: state.tracks.map(t => t.id === trackId ? { ...t, isSolo: !t.isSolo } : t)
  })),
}));