import React, { useState } from 'react';
import { Sparkles, FileText, Smile, User, Play, Download, Save, RefreshCw, Zap, Upload, MonitorPlay } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { Button } from '../../common/Button';
import { Slider } from '../../common/Slider';

const EMOTIONS = [
  { id: 'angry', label: 'Angry', emoji: '😠', color: 'hover:border-danger hover:bg-danger/10 hover:text-danger' },
  { id: 'sad', label: 'Sad', emoji: '😢', color: 'hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-500' },
  { id: 'happy', label: 'Happy', emoji: '😊', color: 'hover:border-accentPrimary hover:bg-accentPrimary/10 hover:text-accentPrimary' },
  { id: 'excited', label: 'Excited', emoji: '🤩', color: 'hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500' },
  { id: 'neutral', label: 'Neutral', emoji: '😐', color: 'hover:border-textSecondary hover:bg-textSecondary/10 hover:text-textPrimary' },
  { id: 'fear', label: 'Fear', emoji: '😨', color: 'hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-500' },
];

const CHARACTERS = [
  { id: 'levi', name: 'Levi', category: 'anime', img: 'https://ui-avatars.com/api/?name=Levi&background=111&color=fff&size=128' },
  { id: 'goku', name: 'Goku', category: 'anime', img: 'https://ui-avatars.com/api/?name=Goku&background=f97316&color=fff&size=128' },
  { id: 'naruto', name: 'Naruto', category: 'anime', img: 'https://ui-avatars.com/api/?name=Naruto&background=eab308&color=fff&size=128' },
  { id: 'eren', name: 'Eren', category: 'anime', img: 'https://ui-avatars.com/api/?name=Eren&background=7f1d1d&color=fff&size=128' },
];

export const EmotionVideoGenerator = () => {
  const [script, setScript] = useState("In the depths of space, a lone warrior stands against the darkness, his eyes burning with determination...");
  const [selectedEmotion, setSelectedEmotion] = useState('angry');
  const [intensity, setIntensity] = useState(70);
  const [selectedChar, setSelectedChar] = useState('levi');
  const [charCategory, setCharCategory] = useState('anime');
  
  // Generation State: 'idle' | 'generating' | 'completed'
  const [genState, setGenState] = useState('idle');
  const [genProgress, setGenProgress] = useState(0);
  const [genStage, setGenStage] = useState('');

  const handleGenerate = () => {
    setGenState('generating');
    setGenProgress(0);
    
    // Simulate multi-stage AI generation process
    const stages = [
      { p: 20, text: "Generating audio with voicebox..." },
      { p: 50, text: "Generating video frames (Stable Video Diffusion)..." },
      { p: 85, text: "Synchronizing lip movement..." },
      { p: 100, text: "Finalizing..." }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage >= stages.length) {
        clearInterval(interval);
        setGenState('completed');
        return;
      }
      setGenProgress(stages[currentStage].p);
      setGenStage(stages[currentStage].text);
      currentStage++;
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full h-full bg-bgPrimary overflow-y-auto custom-scrollbar p-6">
      <div className="max-w-4xl w-full mx-auto space-y-8 pb-12">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-borderColor">
          <Sparkles className="w-6 h-6 text-accentSecondary" />
          <h1 className="text-2xl font-bold text-textPrimary">Emotion Video Generator</h1>
        </div>

        {/* STEP 1: SCRIPT */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="flex items-center gap-2 font-semibold text-textPrimary">
              <FileText className="w-4 h-4 text-accentPrimary" /> Step 1: Script
            </h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" icon={RefreshCw}>AI Suggest</Button>
              <Button variant="ghost" size="sm" icon={Upload}>Import File</Button>
            </div>
          </div>
          <textarea 
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full h-32 bg-bgPrimary border border-borderColor rounded-md p-3 text-textPrimary focus:border-accentSecondary outline-none resize-none font-sans leading-relaxed"
            placeholder="Type your script here..."
          />
        </section>

        {/* STEP 2: EMOTION */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <h2 className="flex items-center gap-2 font-semibold text-textPrimary mb-4">
            <Smile className="w-4 h-4 text-accentPrimary" /> Step 2: Emotion Selection
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {EMOTIONS.map(emo => (
              <button
                key={emo.id}
                onClick={() => setSelectedEmotion(emo.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200",
                  selectedEmotion === emo.id 
                    ? "bg-bgTertiary border-textPrimary text-textPrimary shadow-sm" 
                    : `bg-bgPrimary border-borderColor text-textSecondary ${emo.color}`
                )}
              >
                <span className="text-lg">{emo.emoji}</span>
                <span className="font-medium text-sm">{emo.label}</span>
              </button>
            ))}
          </div>
          
          <div className="max-w-md">
            <Slider 
              label="Emotion Intensity" 
              value={intensity} 
              min={0} max={100} unit="%" 
              onChange={setIntensity} 
            />
          </div>
        </section>

        {/* STEP 3: CHARACTER */}
        <section className="bg-bgSecondary border border-borderColor rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 font-semibold text-textPrimary">
              <User className="w-4 h-4 text-accentPrimary" /> Step 3: Character Selection
            </h2>
            <select 
              value={charCategory}
              onChange={(e) => setCharCategory(e.target.value)}
              className="bg-bgTertiary border border-borderColor text-textPrimary text-sm rounded px-3 py-1.5 outline-none focus:border-accentSecondary"
            >
              <option value="anime">Anime</option>
              <option value="movie">Movie</option>
              <option value="singer">Singer</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {CHARACTERS.map(char => (
              <div 
                key={char.id}
                onClick={() => setSelectedChar(char.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all",
                  selectedChar === char.id ? "border-accentSecondary bg-accentSecondary/5" : "border-transparent hover:bg-bgTertiary"
                )}
              >
                <img src={char.img} alt={char.name} className="w-16 h-16 rounded-full border border-borderColor object-cover" />
                <span className="text-sm font-medium text-textPrimary">{char.name}</span>
                <Button variant="ghost" size="xs" icon={Play} className="w-full text-xs py-1 mt-1">Preview</Button>
              </div>
            ))}
            
            <div className="flex flex-col items-center justify-center gap-2 p-2 rounded-lg border-2 border-dashed border-borderColor cursor-pointer hover:border-textSecondary transition-all hover:bg-bgTertiary">
              <div className="w-16 h-16 rounded-full bg-bgPrimary flex items-center justify-center">
                <Upload className="w-6 h-6 text-textSecondary" />
              </div>
              <span className="text-sm font-medium text-textSecondary">Add Custom</span>
            </div>
          </div>
        </section>

        {/* STEP 4: GENERATE / RESULT */}
        <section className="bg-bgTertiary border border-borderColor rounded-lg p-6 flex flex-col items-center justify-center text-center">
          
          {genState === 'idle' && (
            <>
              <h2 className="text-lg font-semibold text-textPrimary mb-2">Ready to Generate</h2>
              <p className="text-sm text-textSecondary mb-6 max-w-md">
                This will use your AI credits and take approximately 30-40 seconds to process on the GPU server.
              </p>
              <Button 
                variant="primary" 
                size="lg" 
                icon={Zap} 
                onClick={handleGenerate}
                className="bg-accentSecondary text-bgPrimary hover:bg-[#00bfff] px-8 py-3 text-lg"
              >
                GENERATE SCENE
              </Button>
            </>
          )}

          {genState === 'generating' && (
            <div className="w-full max-w-md flex flex-col items-center gap-4">
              <Zap className="w-10 h-10 text-accentSecondary animate-pulse" />
              <h2 className="text-lg font-semibold text-textPrimary">Processing on GPU...</h2>
              
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs text-textSecondary font-mono">
                  <span>{genStage}</span>
                  <span>{genProgress}%</span>
                </div>
                <div className="w-full h-2 bg-bgPrimary rounded-full overflow-hidden border border-borderColor">
                  <div 
                    className="h-full bg-accentSecondary transition-all duration-500 ease-out"
                    style={{ width: `${genProgress}%` }}
                  />
                </div>
              </div>
              
              <Button variant="ghost" onClick={() => setGenState('idle')} className="text-danger mt-4">Cancel Processing</Button>
            </div>
          )}

          {genState === 'completed' && (
            <div className="w-full flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-accentPrimary">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-xl font-bold">Scene Generated Successfully!</h2>
              </div>
              
              <div className="w-full max-w-2xl aspect-video bg-black rounded-lg border border-borderColor flex items-center justify-center shadow-lg relative group overflow-hidden">
                <MonitorPlay className="w-16 h-16 text-textSecondary opacity-30" />
                {/* Fake Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-accentSecondary/80 flex items-center justify-center pl-1">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-2">
                <Button variant="secondary" icon={Play}>Preview</Button>
                <Button variant="secondary" icon={Save}>Save to Project</Button>
                <Button variant="primary" icon={Download} className="bg-accentSecondary hover:bg-[#00bfff] text-bgPrimary">Export MP4</Button>
                <Button variant="ghost" icon={RefreshCw} onClick={() => setGenState('idle')}>Create Another</Button>
              </div>
            </div>
          )}

        </section>
        
      </div>
    </div>
  );
};