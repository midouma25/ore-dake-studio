import { create } from 'zustand';

export const useAIJobStore = create((set) => ({
  // Job State
  activeJob: null, // { id, type, title }
  isProcessing: false,
  progress: 0,
  currentStage: '',
  eta: null, // in seconds

  // Actions
  startJob: (jobDetails) => set({
    activeJob: jobDetails,
    isProcessing: true,
    progress: 0,
    currentStage: 'Initializing models...',
    eta: 'Calculating...'
  }),

  updateProgress: (progress, stage, eta) => set({
    progress,
    currentStage: stage,
    eta
  }),

  completeJob: () => set({
    isProcessing: false,
    progress: 100,
    currentStage: 'Completed successfully!',
    eta: 0
  }),

  cancelJob: () => set({
    activeJob: null,
    isProcessing: false,
    progress: 0,
    currentStage: '',
    eta: null
  }),
}));