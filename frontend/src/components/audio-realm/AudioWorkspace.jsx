import React, { useState, useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

import { AIAudioRack } from './ai-panel/AI_Audio_Rack'; 
import { EffectsRack } from './effects-rack/EffectsRack';
import { AudioRealm } from '../dashboard/AudioRealm'; 
import { Scissors, ZoomIn, Maximize, Download, Upload, Save, Undo, Redo, FileAudio, Settings } from 'lucide-react';

const socket = io('http://localhost:5000');

export const AudioWorkspace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalTrackUrl, serverFilePath, fileName } = location.state || {};

  const [separatedTracks, setSeparatedTracks] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  
  const [activeJobType, setActiveJobType] = useState(null);

  useEffect(() => {
    socket.on('jobCompleted', (data) => {
      console.log('✅ المهمة انتهت، تم استلام البيانات:', data);
      const tracks = data.tracks || (data.result && data.result.tracks);
      if (tracks) {
        setIsProcessing(false);
        setSeparatedTracks(tracks);
        setProgressMessage('');
        setActiveJobType(null);
      }
    });

    socket.on('jobProgress', (data) => {
      if (data.message) setProgressMessage(data.message);
    });

    socket.on('jobFailed', (error) => {
      alert('❌ حدث خطأ أثناء المعالجة: ' + (error.message || error));
      setIsProcessing(false);
      setProgressMessage('');
      setActiveJobType(null);
    });

    return () => {
      socket.off('jobCompleted');
      socket.off('jobProgress');
      socket.off('jobFailed');
    };
  }, []);

  const handleStemSeparation = async () => {
    if (!serverFilePath) return alert("الملف الأصلي غير متوفر على الخادم.");
    setIsProcessing(true);
    setActiveJobType('stem');
    setProgressMessage('جاري تهيئة كرت الشاشة (RTX)...');

    try {
      await axios.post('http://localhost:5000/api/ai/jobs', {
        type: 'stem-separation',
        title: fileName || 'Stem Separation',
        parameters: { input_file: serverFilePath },
        priority: 'high'
      });
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.");
      setIsProcessing(false);
      setActiveJobType(null);
    }
  };

  const handleDeepClean = async () => {
    if (!serverFilePath) return alert("الملف الأصلي غير متوفر على الخادم.");
    setIsProcessing(true);
    setActiveJobType('denoise');
    setProgressMessage('جاري تهيئة محرك التنظيف (DeepFilterNet)...');

    try {
      await axios.post('http://localhost:5000/api/ai/jobs', {
        type: 'denoise',
        title: fileName || 'Deep Clean',
        parameters: { input_file: serverFilePath },
        priority: 'high'
      });
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.");
      setIsProcessing(false);
      setActiveJobType(null);
    }
  };

  const handleDownload = (url, name) => {
    if (!url) return alert("الملف غير جاهز بعد!");
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!originalTrackUrl) return <Navigate to="/" replace />;

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-bgPrimary text-textPrimary select-none">
      
      <div className="h-10 bg-[#0a0a0a] border-b border-borderColor flex items-center px-4 text-sm z-50">
        <div className="flex items-center gap-1 font-medium">
          
          <div className="relative group">
            <button className="px-3 py-1.5 hover:bg-bgTertiary rounded text-textSecondary hover:text-white transition-colors">File</button>
            <div className="absolute left-0 top-full mt-0 w-56 bg-bgSecondary border border-borderColor rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-1">
              <button onClick={() => navigate('/')} className="w-full text-left px-4 py-2 hover:bg-accentPrimary hover:text-bgPrimary flex items-center gap-3">
                <Upload className="w-4 h-4" /> Import New Audio
              </button>
              <div className="h-px bg-borderColor my-1"></div>
              <button onClick={() => handleDownload(originalTrackUrl, `Original_${fileName}`)} className="w-full text-left px-4 py-2 hover:bg-accentPrimary hover:text-bgPrimary flex items-center gap-3">
                <FileAudio className="w-4 h-4" /> Download Original
              </button>
              
              <button 
                onClick={() => separatedTracks.forEach(t => handleDownload(t.src, t.name))}
                disabled={separatedTracks.length === 0}
                className={`w-full text-left px-4 py-2 flex items-center gap-3 ${separatedTracks.length > 0 ? 'hover:bg-accentPrimary hover:text-bgPrimary' : 'opacity-50 cursor-not-allowed'}`}
              >
                <Download className="w-4 h-4" /> Export All Stems
              </button>
              
              <div className="h-px bg-borderColor my-1"></div>
              <button className="w-full text-left px-4 py-2 hover:bg-accentPrimary hover:text-bgPrimary flex items-center gap-3">
                <Save className="w-4 h-4" /> Save Project
              </button>
            </div>
          </div>

          <div className="relative group">
            <button className="px-3 py-1.5 hover:bg-bgTertiary rounded text-textSecondary hover:text-white transition-colors">Edit</button>
            <div className="absolute left-0 top-full mt-0 w-48 bg-bgSecondary border border-borderColor rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-1">
              <button className="w-full text-left px-4 py-2 hover:bg-accentPrimary hover:text-bgPrimary flex items-center gap-3">
                <Undo className="w-4 h-4" /> Undo
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-accentPrimary hover:text-bgPrimary flex items-center gap-3">
                <Redo className="w-4 h-4" /> Redo
              </button>
            </div>
          </div>

          <div className="relative group">
            <button className="px-3 py-1.5 hover:bg-bgTertiary rounded text-textSecondary hover:text-white transition-colors">View</button>
          </div>

          <div className="relative group">
            <button className="px-3 py-1.5 hover:bg-bgTertiary rounded text-textSecondary hover:text-white transition-colors">Help</button>
          </div>

        </div>

        <div className="ml-auto flex items-center gap-4 text-xs text-textSecondary">
          <span className="flex items-center gap-2">
            <Settings className="w-3.5 h-3.5" /> 48000 Hz / 32-bit float
          </span>
          <div className="w-px h-4 bg-borderColor"></div>
          <span className="text-white bg-bgTertiary px-3 py-1 rounded-full border border-borderColor flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accentPrimary animate-pulse"></span>
            {fileName || 'Untitled Session'}
          </span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        <AIAudioRack 
          onStemSeparation={handleStemSeparation}
          onDeepClean={handleDeepClean} 
          activeJobType={activeJobType} 
          isProcessing={isProcessing}
          progressMessage={progressMessage}
        />

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="h-12 border-b border-borderColor bg-bgSecondary flex items-center justify-between px-4 z-10 shadow-sm">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-sm tracking-wide text-textSecondary uppercase">Multitrack Editor</h3>
              <div className="h-4 w-px bg-borderColor"></div>
              <button className="text-textSecondary hover:text-white p-1 rounded transition-colors"><Scissors className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-textSecondary hover:text-white"><ZoomIn className="w-4 h-4" /></button>
              <div className="w-24 h-1.5 bg-bgTertiary rounded-full overflow-hidden"><div className="w-1/2 h-full bg-accentPrimary"></div></div>
              <button className="text-textSecondary hover:text-white"><Maximize className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 pb-20">
            <AudioRealm tracks={separatedTracks} originalTrackUrl={originalTrackUrl} />
          </div>
        </div>

        <EffectsRack />

      </div>
    </div>
  );
};