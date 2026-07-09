import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/classNames';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className,
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accentPrimary text-bgPrimary hover:bg-[#00e67a]",
    secondary: "bg-bgTertiary text-textPrimary hover:bg-[#3a3a3a] border border-borderColor",
    danger: "bg-danger text-white hover:bg-[#e63d3d]",
    ghost: "bg-transparent text-textSecondary hover:text-textPrimary hover:bg-bgTertiary",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
    icon: "p-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : Icon ? (
        <Icon className={cn("w-4 h-4", children ? "mr-2" : "")} />
      ) : null}
      {children}
    </button>
  );
};