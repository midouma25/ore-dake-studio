import React from 'react';
import { Loader2, Zap, XCircle } from 'lucide-react';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { useAIJobStore } from '../../../store/useAIJobStore';
import { cn } from '../../../utils/classNames';

export const AIProgressModal = () => {
  const { activeJob, isProcessing, progress, currentStage, eta, cancelJob } = useAIJobStore();

  if (!isProcessing || !activeJob) return null;

  return (
    <Modal
      isOpen={isProcessing}
      onClose={() => {}} // Disabled closing by clicking outside during processing
      title={
        <div className="flex items-center gap-2 text-accentSecondary">
          <Zap className="w-5 h-5 fill-current" />
          <span>AI Processing: {activeJob.title}</span>
        </div>
      }
      width="max-w-md"
    >
      <div className="flex flex-col gap-6 py-4">
        
        {/* Progress Info */}
        <div className="flex justify-between items-end text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-textPrimary font-medium">{currentStage}</span>
            <span className="text-textSecondary text-xs">ETA: {eta}</span>
          </div>
          <span className="text-xl font-mono font-bold text-accentSecondary">
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-bgTertiary rounded-full overflow-hidden border border-borderColor">
          <div 
            className="h-full bg-accentSecondary transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Animated gleam effect */}
            <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </div>
          </div>
        </div>

        {/* Cancel Action */}
        <div className="flex justify-center mt-2">
          <Button 
            variant="ghost" 
            onClick={cancelJob} 
            icon={XCircle}
            className="text-textSecondary hover:text-danger hover:bg-danger/10"
          >
            Cancel Process
          </Button>
        </div>

        {/* Global style for shimmer animation if not defined in tailwind config */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}} />
      </div>
    </Modal>
  );
};