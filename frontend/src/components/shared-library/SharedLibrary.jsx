import React, { useState } from 'react';
import { Library, Music, Mic2, Search, Play, Plus, Heart, Download, Filter } from 'lucide-react';
import { cn } from '../../utils/classNames';

const LIBRARY_TABS = [
  { id: 'sfx', label: 'Sound Effects', icon: <Library className="w-4 h-4" /> },
  { id: 'music', label: 'Music Tracks', icon: <Music className="w-4 h-4" /> },
  { id: 'voices', label: 'Voice Actors', icon: <Mic2 className="w-4 h-4" /> },
];

const MOCK_ITEMS = [
  { id: 1, name: 'Cinematic Boom Impact', category: 'Impacts', duration: '0:04', isFav: true },
  { id: 2, name: 'Sci-Fi Laser Gun', category: 'Weapons', duration: '0:01', isFav: false },
  { id: 3, name: 'Whoosh Transition Fast', category: 'Transitions', duration: '0:02', isFav: false },
  { id: 4, name: 'Ambient Space Drone', category: 'Ambience', duration: '1:30', isFav: true },
  { id: 5, name: 'Footsteps on Gravel', category: 'Foley', duration: '0:12', isFav: false },
];

export const SharedLibrary = () => {
  const [activeTab, setActiveTab] = useState('sfx');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full bg-bgSecondary border-l border-borderColor w-96 flex-shrink-0">
      
      {/* Header */}
      <div className="p-4 border-b border-borderColor bg-bgPrimary">
        <h2 className="text-lg font-semibold text-textPrimary flex items-center gap-2 mb-4">
          <Library className="w-5 h-5 text-accentPrimary" />
          Asset Library
        </h2>
        
        {/* Search */}
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-textSecondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bgTertiary border border-borderColor text-sm text-textPrimary pl-9 pr-3 py-2 rounded focus:border-accentPrimary outline-none"
            />
          </div>
          <button className="p-2 bg-bgTertiary border border-borderColor rounded text-textSecondary hover:text-textPrimary transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-2 gap-1 border-b border-borderColor bg-bgPrimary">
        {LIBRARY_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium rounded transition-all duration-200",
              activeTab === tab.id 
                ? "bg-bgTertiary text-textPrimary shadow-sm" 
                : "text-textSecondary hover:bg-bgTertiary/50 hover:text-textPrimary"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1 bg-bgPrimary">
        {/* List Header */}
        <div className="flex text-xs font-medium text-textSecondary px-2 py-1 mb-1">
          <span className="flex-1">NAME</span>
          <span className="w-12 text-right">TIME</span>
        </div>

        {/* List Items */}
        {MOCK_ITEMS.map(item => (
          <div key={item.id} className="flex items-center gap-2 p-2 rounded hover:bg-bgTertiary group transition-colors cursor-pointer border border-transparent hover:border-borderColor">
            
            <button className="w-8 h-8 rounded-full bg-bgPrimary flex items-center justify-center text-textSecondary group-hover:bg-accentPrimary group-hover:text-bgPrimary transition-colors flex-shrink-0">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </button>
            
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="text-sm font-medium text-textPrimary truncate">{item.name}</span>
              <span className="text-xs text-textSecondary truncate">{item.category}</span>
            </div>
            
            <span className="text-xs font-mono text-textSecondary w-10 text-right">{item.duration}</span>
            
            {/* Hover Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-textSecondary hover:text-danger rounded">
                <Heart className={cn("w-4 h-4", item.isFav ? "fill-danger text-danger" : "")} />
              </button>
              <button 
                className="p-1.5 text-textSecondary hover:text-bgPrimary hover:bg-accentPrimary rounded"
                title="Add to Timeline"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};