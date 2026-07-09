import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/classNames';

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  width = "max-w-2xl" 
}) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className={cn("bg-bgSecondary border border-borderColor rounded-lg shadow-2xl w-full flex flex-col max-h-[90vh]", width)}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-borderColor bg-bgTertiary rounded-t-lg">
          <h2 className="text-lg font-semibold text-textPrimary">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-textSecondary hover:text-textPrimary hover:bg-bgPrimary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>

        {/* Footer (Optional) */}
        {footer && (
          <div className="flex justify-end gap-3 p-4 border-t border-borderColor bg-bgTertiary rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};