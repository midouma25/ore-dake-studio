import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Components & Store
import useAuthStore from './store/authStore';
import LoginForm from './components/LoginForm';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { BottomBar } from './components/layout/BottomBar';
import { EffectWindow } from './components/audio-realm/effects-rack/EffectWindow';

// Main Pages
import { Dashboard } from './components/dashboard/Dashboard';
import { SharedLibrary } from './components/shared-library/SharedLibrary';

// المحطة الفضائية الصوتية
import { AudioWorkspace } from './components/audio-realm/AudioWorkspace';

// Video Realm Components
import { EmotionVideoGenerator } from './components/video-realm/emotion-gen/EmotionVideoGenerator';
import { LipSyncPanel } from './components/video-realm/lip-sync/LipSyncPanel';

function App() {
  // جلب حالة تسجيل الدخول من الـ Store
  const { token } = useAuthStore();

  // 🔴 حارس البوابة: إذا لم يكن هناك توكن، اعرض صفحة الدخول فوراً
  if (!token) {
    return <LoginForm />;
  }

  // 🟢 إذا كان هناك توكن، اعرض تطبيقك بالكامل كما كان بالضبط
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

              {/* Audio Realm */}
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

              {/* حماية للمسارات العشوائية */}
              <Route path="*" element={<Navigate to="/" replace />} />
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