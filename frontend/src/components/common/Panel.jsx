import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/classNames';

export const Panel = ({ 
  title, 
  children, 
  defaultOpen = true,
  actionButton = null,
  className 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("bg-bgSecondary border border-borderColor rounded-md overflow-hidden", className)}>
      <div 
        className="flex items-center justify-between p-3 bg-bgTertiary cursor-pointer select-none border-b border-borderColor transition-colors hover:bg-[#333333]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-textPrimary font-medium text-sm">
          {isOpen ? <ChevronDown className="w-4 h-4 text-textSecondary" /> : <ChevronRight className="w-4 h-4 text-textSecondary" />}
          {title}
        </div>
        
        {/* Render any action buttons (like the '+' add effect button) without triggering collapse */}
        <div onClick={(e) => e.stopPropagation()}>
          {actionButton}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 bg-bgSecondary">
          {children}
        </div>
      )}
    </div>
  );
};