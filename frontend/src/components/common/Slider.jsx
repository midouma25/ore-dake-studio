import React from 'react';
import { cn } from '../../utils/classNames';

export const Slider = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange,
  className,
}) => {
  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  // Calculate percentage for custom track styling
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="flex justify-between items-center text-xs">
        <span className="text-textSecondary font-medium">{label}</span>
        <div className="flex items-center bg-bgTertiary px-2 py-1 rounded border border-borderColor">
          <span className="text-textPrimary font-mono w-12 text-right">
            {value.toFixed(step < 1 ? 1 : 0)}
          </span>
          <span className="text-textSecondary ml-1 w-6">{unit}</span>
        </div>
      </div>
      
      <div className="relative flex items-center h-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="w-full h-1.5 appearance-none bg-bgTertiary rounded-full outline-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--accent-primary) ${percentage}%, var(--bg-tertiary) ${percentage}%)`
          }}
        />
        {/* Custom thumb styles added via global CSS or inline styles in real implementation to override browser defaults */}
        <style dangerouslySetInnerHTML={{__html: `
          input[type=range]::-webkit-slider-thumb {
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #FFFFFF;
            cursor: pointer;
            border: 2px solid var(--bg-secondary);
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
          }
          input[type=range]::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #FFFFFF;
            cursor: pointer;
            border: 2px solid var(--bg-secondary);
          }
        `}} />
      </div>
    </div>
  );
};
