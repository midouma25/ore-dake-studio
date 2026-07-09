import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Mic2, Video, Settings, Library } from 'lucide-react';
import { cn } from '../../utils/classNames';

const NAV_ITEMS = [
  { id: 'dashboard', path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'audio', path: '/audio', icon: Mic2, label: 'Audio Realm' },
  { id: 'video', path: '/video', icon: Video, label: 'Video Realm' },
  { id: 'library', path: '/library', icon: Library, label: 'Shared Vault' },
];

export const Sidebar = () => {
  return (
    <div className="w-16 h-full bg-bgSecondary border-r border-borderColor flex flex-col items-center py-5 shrink-0 z-40 relative">
      
      {/* Brand Logo (Ore Dake AI) */}
      <div className="w-10 h-10 rounded-xl bg-accentPrimary/10 flex items-center justify-center mb-8 border border-accentPrimary/30 shadow-[0_0_15px_rgba(0,255,136,0.15)]">
        <span className="font-bold text-accentPrimary text-xl">O</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-4 w-full px-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            title={item.label}
            className={({ isActive }) => cn(
              "w-12 h-12 rounded-xl flex items-center justify-center group relative transition-all duration-300 mx-auto",
              isActive 
                ? "bg-bgTertiary text-accentPrimary shadow-sm" 
                : "text-textSecondary hover:bg-bgTertiary/50 hover:text-textPrimary"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "w-5 h-5 transition-all duration-300", 
                  isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]" : "group-hover:scale-110"
                )} />
                
                {/* Active Indicator Line (Neon Glow) */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accentPrimary rounded-r-full shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Settings Icon at the bottom */}
      <button 
        className="w-12 h-12 rounded-xl flex items-center justify-center text-textSecondary hover:bg-bgTertiary hover:text-textPrimary transition-all duration-300"
        title="Settings"
      >
        <Settings className="w-5 h-5 transition-transform duration-300 hover:rotate-90" />
      </button>

    </div>
  );
};