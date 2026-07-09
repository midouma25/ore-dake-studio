import React from 'react';
import { Transport } from '../common/Transport';
import { Activity } from 'lucide-react';

export const BottomBar = () => {
  return (
    <div className="h-14 border-t border-borderColor bg-bgSecondary flex items-center justify-between px-4 z-40 relative">
      
      {/* Left Area: Status or Audio Engine Info */}
      <div className="flex items-center gap-2 text-xs text-textSecondary w-1/4">
        <Activity className="w-3.5 h-3.5 text-accentPrimary" />
        <span>Audio Engine: Running</span>
        <span className="mx-2 opacity-30">|</span>
        <span>48000 Hz</span>
      </div>

      {/* Center Area: Transport Controls */}
      <div className="flex justify-center flex-1">
        <Transport />
      </div>

      {/* Right Area: Additional Tools (Placeholder for future features) */}
      <div className="flex justify-end w-1/4">
        {/* Could place project sync status or minor tools here */}
      </div>
      
    </div>
  );
};