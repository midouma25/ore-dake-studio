import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { BottomBar } from './components/layout/BottomBar';
import { EffectWindow } from './components/audio-realm/effects-rack/EffectWindow';

// Main Page   s
import { Dashboard } from './components/dashboard/Dashboard';
import { SharedLibrary } from './components/shared-library/SharedLibrary';

// المحطة الفضائية الصوتية التي تجمع كل شيء (AI Rack + Timeline + Effects Rack)
import { AudioWorkspace } from './components/audio-realm/AudioWorkspace';

// Video Realm Components
import { EmotionVideoGenerator } from './components/video-realm/emotion-gen/EmotionVideoGenerator';
import { LipSyncPanel } from './components/video-realm/lip-sync/LipSyncPanel';

function App() {
  return (
    <Router>
      <div className="w-screen h-screen bg-bgPrimary flex flex-col overflow-hidden text-textPrimary font-sans">
        
        {/* Main Workspace (Sidebar + Dynamic Content) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* 1. Static Sidebar (Always Visible) */}
          <Sidebar />

          {/* 2. Dynamic Routing Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-bgPrimary relative">
            <Routes>
              
              {/* Home / Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Audio Realm - نمرر المحطة الصوتية الشاملة مباشرة هنا */}
              <Route path="/audio" element={<AudioWorkspace />} />

              {/* Video Realm */}
              <Route path="/video" element={
                <div className="flex w-full h-full overflow-hidden">
                  <EmotionVideoGenerator />
                </div>
              } />

              {/* Shared Vault / Library */}
              <Route path="/library" element={
                <div className="flex w-full h-full overflow-hidden justify-center p-6">
                  <SharedLibrary />
                  <div className="flex-1 bg-bgSecondary border border-borderColor rounded-r-lg p-8 flex items-center justify-center">
                    <span className="text-textSecondary">Select an asset from the vault to preview</span>
                  </div>
                </div>
              } />

            </Routes>
          </div>
        </div>

        {/* 3. Bottom Transport Bar (Always Visible) */}
        <BottomBar />
        
        {/* 4. Global Modals (Popups) */}
        <EffectWindow />
        
      </div>
    </Router>
  );
}

export default App;