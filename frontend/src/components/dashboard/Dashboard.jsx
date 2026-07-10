import React, { useState } from 'react';
import { Plus, Folder, Clock, MoreVertical, Search, Play, Video, Mic, Zap } from 'lucide-react';
import { Button } from '../common/Button';
import { cn } from '../../utils/classNames';
import axios from 'axios'; // أضف هذا في أعلى الملف
import { useRef } from 'react'; // أضف هذا أيضاً
import { AudioRealm } from './AudioRealm'; // أضف هذا السطر

// Mock Data for Projects
const RECENT_PROJECTS = [
  { id: 1, name: 'Anime Dubbing - Episode 1', type: 'video', updatedAt: '2 hours ago', duration: '24:15', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Podcast Episode 42: Tech News', type: 'audio', updatedAt: 'Yesterday', duration: '45:30', thumbnail: null },
  { id: 3, name: 'Explosion SFX Design', type: 'audio', updatedAt: '3 days ago', duration: '0:15', thumbnail: null },
  { id: 4, name: 'Product Promo Video', type: 'video', updatedAt: 'Last week', duration: '1:30', thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80' },
];

export const Dashboard = () => {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false); // المتغير الجديد
  const [separatedTracks, setSeparatedTracks] = useState([]);
  // دالة رفع الملف الحقيقية
const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('audioFile', file);

    try {
      // 1. رفع الملف إلى Node.js
      console.log("جاري رفع الملف...");
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const filePath = response.data.filePath;
      console.log("file get uploaded", filePath);
      
      setIsProcessing(true); // تشغيل شاشة التحميل

      // 2. إرسال أمر لمعالجة الملف وفصل الصوت!
      console.log("sending job to AI engine...");
      const jobResponse = await axios.post('http://localhost:5000/api/ai/jobs', {
        type: 'stem-separation',
        title: file.name,
        parameters: { input_file: filePath },
        priority: 'high'
      });
      alert(`AI magic has started! 🚀\nPlease wait about a minute while the Python server finishes processing.`);
      


      setTimeout(() => {
         setSeparatedTracks([
          { id: 'track-vocals', name: '🎤 Vocals', src: 'http://localhost:5000/outputs/vocals.mp3' },
          { id: 'track-drums', name: '🥁 Drums', src: 'http://localhost:5000/outputs/drums.mp3' },
          { id: 'track-bass', name: '🎸 Bass', src: 'http://localhost:5000/outputs/bass.mp3' },
          { id: 'track-other', name: '🎹 Other', src: 'http://localhost:5000/outputs/other.mp3' }
         ]);
         setIsProcessing(false); // إخفاء شاشة التحميل عند الانتهاء
      }, 95000);
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting job for processing.");
    }
};
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full h-full bg-bgPrimary flex flex-col overflow-hidden text-textPrimary">
      
      {/* Top Navigation / Stats */}
      <div className="h-16 border-b border-borderColor bg-bgSecondary flex items-center justify-between px-8">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accentPrimary to-accentSecondary">
          Ore Dake AI Studio
        </h1>
        
        <div className="flex items-center gap-6">
          {/* AI Credits Badge */}
          <div className="flex items-center gap-2 bg-bgTertiary border border-borderColor px-3 py-1.5 rounded-full">
            <Zap className="w-4 h-4 text-warning fill-warning" />
            <span className="text-sm font-medium">850 Credits</span>
          </div>
          
          {/* User Profile Mockup */}
          <div className="w-8 h-8 rounded-full bg-accentSecondary/20 border border-accentSecondary text-accentSecondary flex items-center justify-center font-bold text-sm cursor-pointer">
            MG
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Welcome & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-textPrimary mb-1">Welcome back, Mohamed!</h2>
              <p className="text-textSecondary">What would you like to create today?</p>
            </div>
            
            <div className="flex items-center gap-3">
             {/* زر مخفي لاختيار الملف */}
<input 
  type="file" 
  ref={fileInputRef} 
  onChange={handleFileUpload} 
  accept="audio/*" 
  className="hidden" 
/>

<Button 
  variant="secondary" 
  icon={Mic} 
  className="hover:text-accentPrimary hover:border-accentPrimary"
  onClick={() => fileInputRef.current.click()} // عند الضغط يفتح نافذة الملفات
>
  Upload Audio File
</Button>
              <Button variant="primary" icon={Video} className="bg-accentSecondary text-bgPrimary hover:bg-[#00bfff]">
                New Video Project
              </Button>
            </div>
          </div>
{/* شاشة التحميل الأنيقة */}
      {isProcessing && (
        <div className="mt-8 flex flex-col items-center justify-center p-8 bg-bgSecondary/50 rounded-2xl border border-accentPrimary/20">
          <div className="w-16 h-16 border-4 border-accentPrimary/30 border-t-accentPrimary rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-bold text-textPrimary animate-pulse">  AI START ✨</h3>
          <p className="text-textSecondary mt-2 text-center max-w-md">
            Processing your file with RTX GPU to separate tracks with studio precision. This may take a minute or two.
          </p>
        </div>
      )}
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-5 h-5 text-textSecondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search your projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bgSecondary border border-borderColor text-textPrimary pl-10 pr-4 py-2.5 rounded-md focus:border-accentPrimary outline-none transition-colors"
            />
          </div>
{separatedTracks.length > 0 && !isProcessing && (
        <AudioRealm tracks={separatedTracks} />
      )}
          {/* Recent Projects Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-textSecondary" /> Recent Projects
              </h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {RECENT_PROJECTS.map(project => (
                <div key={project.id} className="bg-bgSecondary border border-borderColor rounded-lg overflow-hidden group hover:border-accentPrimary transition-all cursor-pointer">
                  
                  {/* Thumbnail */}
                  <div className="h-32 bg-bgTertiary relative flex items-center justify-center overflow-hidden">
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      project.type === 'video' ? <Video className="w-10 h-10 text-textSecondary/50" /> : <Mic className="w-10 h-10 text-textSecondary/50" />
                    )}
                    
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-accentPrimary text-bgPrimary flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                      {project.duration}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-4 relative">
                    <button className="absolute top-4 right-3 text-textSecondary hover:text-textPrimary">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    <h4 className="font-medium text-textPrimary pr-6 truncate">{project.name}</h4>
                    <div className="flex items-center gap-2 mt-2 text-xs text-textSecondary">
                      {project.type === 'video' ? <Video className="w-3.5 h-3.5 text-accentSecondary" /> : <Mic className="w-3.5 h-3.5 text-accentPrimary" />}
                      <span className="capitalize">{project.type} Project</span>
                      <span>•</span>
                      <span>{project.updatedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};