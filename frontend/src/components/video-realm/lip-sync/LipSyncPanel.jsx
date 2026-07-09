import React, { useState } from 'react';
import { Upload, Video, Image as ImageIcon, Mic, Settings2, Play, Download, Save, Zap, CheckCircle2, UserSquare2, RefreshCw } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { Button } from '../../common/Button';

export const LipSyncPanel = () => {
  const [sourceType, setSourceType] = useState(null); // 'video' | 'image' | 'project'
  const [audioSource, setAudioSource] = useState(null); // 'upload' | 'record' | 'timeline'
  
  // Settings State
  const [language, setLanguage] = useState('auto');
  const [precision, setPrecision] = useState('high');
  const [mouthStyle, setMouthStyle] = useState('natural');
  const [preserveExpression, setPreserveExpression] = useState(true);

  // Process State
  const [syncState, setSyncState] = useState('idle'); // 'idle' | 'processing' | 'completed'
  const [progress, setProgress] = useState(0);

  const handleSync = () => {
    setSyncState('processing');
    setProgress(0);
    
    // Simulate Wav2Lip/SadTalker sync process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncState('completed');
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full h-full bg-bgPrimary overflow-y-auto custom-scrollbar p-6">
      <div className="max-w-4xl w-full mx-auto space-y-6 pb-12">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-borderColor">
          <UserSquare2 className="w-6 h-6 text-accentSecondary" />
          <h1 className="text-2xl font-bold text-textPrimary">AI Lip Synchronization</h1>
        </div>

        {/* SOURCE MEDIA */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-4">1. Source Video / Image</h2>
          
          <div className="flex gap-3 mb-6">
            <Button 
              variant={sourceType === 'video' ? 'primary' : 'secondary'} 
              className={sourceType === 'video' ? 'bg-accentSecondary text-bgPrimary hover:bg-accentSecondary' : ''}
              onClick={() => setSourceType('video')} 
              icon={Video}
            >
              Upload Video
            </Button>
            <Button 
              variant={sourceType === 'image' ? 'primary' : 'secondary'} 
              className={sourceType === 'image' ? 'bg-accentSecondary text-bgPrimary hover:bg-accentSecondary' : ''}
              onClick={() => setSourceType('image')} 
              icon={ImageIcon}
            >
              Upload Image (Static)
            </Button>
            <Button 
              variant={sourceType === 'project' ? 'primary' : 'secondary'} 
              className={sourceType === 'project' ? 'bg-accentSecondary text-bgPrimary hover:bg-accentSecondary' : ''}
              onClick={() => setSourceType('project')} 
              icon={Film}
            >
              Use from Project
            </Button>
          </div>

          {/* Mock Preview Area */}
          <div className="w-full aspect-video bg-bgTertiary border border-borderColor/50 rounded-md flex flex-col items-center justify-center relative overflow-hidden">
            {sourceType ? (
              <>
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
                  alt="Source Preview" 
                  className="w-full h-full object-cover opacity-60"
                />
                {/* Fake Face Detection Bounding Box */}
                <div className="absolute top-[20%] left-[35%] w-[30%] h-[50%] border-2 border-accentPrimary rounded-lg shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                  <div className="absolute -top-6 left-0 bg-accentPrimary text-bgPrimary text-[10px] font-bold px-2 py-0.5 rounded">Face Detected</div>
                  {/* Facial landmarks mockup */}
                  <div className="absolute top-[40%] left-[30%] w-1 h-1 bg-accentPrimary rounded-full shadow-[0_0_5px_#00FF88]" />
                  <div className="absolute top-[40%] right-[30%] w-1 h-1 bg-accentPrimary rounded-full shadow-[0_0_5px_#00FF88]" />
                  <div className="absolute bottom-[25%] left-[40%] right-[40%] h-1 bg-accentPrimary/50 rounded-full" />
                </div>
              </>
            ) : (
              <span className="text-textSecondary text-sm">Select a source media to begin</span>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs">
            <div className="flex items-center gap-2 text-textSecondary">
              <span>Face Detection:</span>
              {sourceType ? (
                <span className="text-accentPrimary flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Detected</span>
              ) : (
                <span>Waiting...</span>
              )}
            </div>
            {sourceType && <Button variant="ghost" size="xs">Manual Select Target</Button>}
          </div>
        </section>

        {/* AUDIO SOURCE */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-4">2. Dubbed Audio</h2>
          
          <div className="flex flex-wrap gap-6 items-start">
            <div className="flex flex-col gap-3">
              <Button variant={audioSource === 'upload' ? 'primary' : 'secondary'} onClick={() => setAudioSource('upload')} icon={Upload}>Upload Audio</Button>
              <Button variant={audioSource === 'record' ? 'primary' : 'secondary'} onClick={() => setAudioSource('record')} icon={Mic} className={audioSource === 'record' ? 'bg-danger text-white hover:bg-danger/90' : ''}>Record Now</Button>
              <Button variant={audioSource === 'timeline' ? 'primary' : 'secondary'} onClick={() => setAudioSource('timeline')} icon={Film}>Use Timeline Audio</Button>
            </div>
            
            <div className="flex-1 border-l border-borderColor pl-6 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-textSecondary">Language (Helps AI with phoneme matching)</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentPrimary max-w-xs"
                >
                  <option value="auto">Auto-Detect</option>
                  <option value="ar">Arabic</option>
                  <option value="en">English</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
              
              {audioSource && (
                <div className="bg-bgTertiary border border-borderColor rounded p-3 flex items-center gap-3 w-full max-w-xs">
                  <button className="w-8 h-8 rounded-full bg-accentPrimary text-bgPrimary flex items-center justify-center pl-0.5"><Play className="w-4 h-4 fill-current" /></button>
                  <div className="flex-1">
                    <div className="h-1 bg-bgPrimary rounded-full w-full overflow-hidden">
                      <div className="h-full bg-accentPrimary w-1/3" />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-textSecondary">0:12</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SETTINGS */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-textSecondary uppercase tracking-wider mb-4">
            <Settings2 className="w-4 h-4" /> 3. Sync Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-textSecondary">Precision Level</label>
                <select 
                  value={precision}
                  onChange={(e) => setPrecision(e.target.value)}
                  className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentSecondary"
                >
                  <option value="standard">Standard (Fastest)</option>
                  <option value="high">High Quality (Recommended)</option>
                  <option value="ultra">Ultra (Slow, Best for Close-ups)</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-textSecondary">Mouth Movement Style</label>
                <select 
                  value={mouthStyle}
                  onChange={(e) => setMouthStyle(e.target.value)}
                  className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-2 outline-none focus:border-accentSecondary"
                >
                  <option value="natural">Natural</option>
                  <option value="exaggerated">Exaggerated (Anime/Cartoon)</option>
                  <option value="subtle">Subtle</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col justify-center bg-bgTertiary border border-borderColor rounded-md p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={preserveExpression}
                  onChange={() => setPreserveExpression(!preserveExpression)}
                  className="w-4 h-4 accent-accentSecondary bg-bgPrimary border-borderColor rounded" 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-textPrimary">Preserve Facial Expressions</span>
                  <span className="text-xs text-textSecondary">Attempts to keep original eye and brow movements intact.</span>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* ACTION / RESULT */}
        <section className="bg-bgTertiary border border-borderColor rounded-lg p-6 flex flex-col items-center justify-center">
          
          {syncState === 'idle' && (
            <Button 
              variant="primary" 
              size="lg" 
              icon={Zap} 
              onClick={handleSync}
              disabled={!sourceType || !audioSource}
              className="bg-accentSecondary text-bgPrimary hover:bg-[#00bfff] px-8 py-3 text-lg"
            >
              SYNCHRONIZE
            </Button>
          )}

          {syncState === 'processing' && (
            <div className="w-full max-w-md flex flex-col items-center gap-4">
              <RefreshCw className="w-8 h-8 text-accentSecondary animate-spin" />
              <h2 className="text-base font-semibold text-textPrimary">Applying Neural Lip Sync...</h2>
              
              <div className="w-full space-y-1">
                <div className="flex justify-between text-xs text-textSecondary font-mono">
                  <span>Processing Frames</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-bgPrimary rounded-full overflow-hidden border border-borderColor">
                  <div 
                    className="h-full bg-accentSecondary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSyncState('idle')} className="text-danger mt-2">Cancel</Button>
            </div>
          )}

          {syncState === 'completed' && (
            <div className="w-full flex flex-col gap-4 items-center">
              <div className="flex items-center gap-2 text-accentPrimary mb-2">
                <CheckCircle2 className="w-6 h-6" />
                <h2 className="text-lg font-bold">Synchronization Complete</h2>
              </div>
              
              <div className="flex gap-3">
                <Button variant="secondary" icon={Play}>Preview Video</Button>
                <Button variant="secondary" icon={Save}>Save to Project</Button>
                <Button variant="primary" icon={Download} className="bg-accentSecondary text-bgPrimary hover:bg-[#00bfff]">Export Final MP4</Button>
                <Button variant="ghost" icon={Settings2} onClick={() => setSyncState('idle')}>Adjust Settings</Button>
              </div>
            </div>
          )}
          
        </section>

      </div>
    </div>
  );
};