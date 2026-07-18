import React, { useState, useRef, useEffect } from 'react';
// 🌟 تم إضافة Scissors هنا 🌟
import { Sliders, Activity, Radio, Waves, Cpu, Power, Plus, Trash2, Settings2, ChevronDown, Play, Pause, Zap, CheckCircle2, Loader2, Scissors } from 'lucide-react';
import api from '../../../services/api'; 
import { useEffectsStore } from '../../../store/useEffectsStore';

const EFFECT_CATEGORIES = {
  dynamics: { 
    title: 'Dynamics (الديناميكية)', icon: Activity, color: 'text-blue-400', 
    effects: [
      { name: 'Compressor', type: 'Compressor' },
      { name: 'Limiter', type: 'Limiter' },
      { name: 'Noise Gate', type: 'NoiseGate' },
      { name: 'Gain / Volume', type: 'Gain' }
    ] 
  },
  eq: { 
    title: 'EQ & Filters (الترددات)', icon: Sliders, color: 'text-green-400', 
    effects: [
      { name: 'Parametric EQ', type: 'ParametricEQ_Band' },
      { name: 'Air EQ (High Shelf)', type: 'AirEQ' },
      { name: 'Highpass Filter', type: 'HighpassFilter' },
      { name: 'Lowpass Filter', type: 'LowpassFilter' }
    ] 
  },
  spatial: { 
    title: 'Spatial & Delay (الفراغ)', icon: Waves, color: 'text-purple-400', 
    effects: [
      { name: 'Studio Reverb', type: 'Reverb' },
      { name: 'Delay / Echo', type: 'Delay' }
    ] 
  },
  modulation: { 
    title: 'Modulation & Pitch', icon: Radio, color: 'text-pink-400', 
    effects: [
      { name: 'Chorus', type: 'Chorus' },
      { name: 'Distortion', type: 'Distortion' },
      { name: 'Pitch Shift (الصوت)', type: 'PitchShift' }
    ] 
  }
};

const EFFECT_DEFAULTS = {
  'Compressor': { threshold_db: -12, ratio: 4, attack_ms: 5, release_ms: 50 },
  'Limiter': { threshold_db: -1.0 },
  'NoiseGate': { threshold_db: -40, ratio: 4, attack_ms: 1, release_ms: 100 },
  'Gain': { gain_db: 0 },
  'HighpassFilter': { cutoff_hz: 80 },
  'LowpassFilter': { cutoff_hz: 16000 },
  'ParametricEQ_Band': { cutoff_hz: 1000, gain_db: 0, q: 1.0 },
  'AirEQ': { cutoff_hz: 6000, gain_db: 2.0 },
  'Reverb': { room_size: 0.5, damping: 0.5, wet_level: 0.33, dry_level: 0.4, width: 1.0 },
  'Delay': { delay_ms: 500, feedback: 0.3, mix: 0.5 },
  'Chorus': { rate_hz: 1.0, depth: 0.25, mix: 0.5 },
  'Distortion': { drive_db: 10.0 },
  'PitchShift': { semitones: 0 }
};

const getSliderProps = (key) => {
  if (key.includes('db')) return { min: -40, max: 24, step: 0.5 };
  if (key.includes('hz')) return { min: 20, max: 20000, step: 10 };
  if (key.includes('ms')) return { min: 1, max: 2000, step: 1 };
  if (key.includes('ratio')) return { min: 1, max: 20, step: 0.5 };
  if (key === 'q') return { min: 0.1, max: 10, step: 0.1 };
  if (key === 'semitones') return { min: -12, max: 12, step: 1 }; 
  return { min: 0, max: 1, step: 0.01 }; 
};

export const EffectsRack = ({ tracks = [], serverFilePath, fileName, onProcessComplete }) => {
  const { activeTrackId, selectedRegion } = useEffectsStore();
  
  const [activeEffects, setActiveEffects] = useState([
    { 
      id: Date.now(), name: 'Parametric EQ', type: 'ParametricEQ_Band', category: 'eq', enabled: true, 
      params: { ...EFFECT_DEFAULTS['ParametricEQ_Band'] } 
    }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const menuRef = useRef(null);
  const audioRef = useRef(new Audio());
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAddMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleEffect = (id) => setActiveEffects(activeEffects.map(eff => eff.id === id ? { ...eff, enabled: !eff.enabled } : eff));
  const removeEffect = (id) => setActiveEffects(activeEffects.filter(eff => eff.id !== id));
  const handleParamChange = (id, key, newValue) => setActiveEffects(activeEffects.map(eff => eff.id === id ? { ...eff, params: { ...eff.params, [key]: parseFloat(newValue) } } : eff));

  const addEffectToRack = (effectName, effectType, categoryKey) => {
    const newEffect = { id: Date.now() + Math.random(), name: effectName, type: effectType, category: categoryKey, enabled: true, params: { ...EFFECT_DEFAULTS[effectType] } };
    setActiveEffects([...activeEffects, newEffect]);
    setShowAddMenu(false);
  };

  const getCurrentServerPath = () => {
    const activeTrack = tracks.find(t => t.id === activeTrackId);
    return serverFilePath || activeTrack?.serverPath;
  };

  const handlePreviewRegion = async () => {
    window.dispatchEvent(new Event('pause-master-audio'));
    
    const currentPath = getCurrentServerPath();
    if (!currentPath) return alert('لا يوجد ملف نشط للمعاينة! يرجى تحديد مسار.');

    const formattedChain = activeEffects.filter(eff => eff.enabled).map(eff => ({ type: eff.type, ...eff.params }));
    if (formattedChain.length === 0) return alert('الرف فارغ أو الفلاتر معطلة!');

    let start = selectedRegion?.start || 0;
    let end = selectedRegion?.end || start + 5;
    if (end - start < 0.5) end = start + 5;

    try {
      setIsPreviewing(true);
      const response = await api.post('/ai/preview-rack', { file_path: currentPath, start_time: start, end_time: end, effects: formattedChain });
      if (response.data?.preview_url) {
        audioRef.current.src = response.data.preview_url;
        audioRef.current.play();
        setIsPlaying(true);
        audioRef.current.onended = () => setIsPlaying(false);
      }
    } catch (error) {
      alert("فشلت المعاينة.");
    } finally { setIsPreviewing(false); }
  };

  const togglePlayPreview = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (audioRef.current.src) {
      window.dispatchEvent(new Event('pause-master-audio'));
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleApplyEffects = async (isRegion = false) => {
    const currentPath = getCurrentServerPath();
    if (!currentPath) return alert('لا يوجد ملف صوتي نشط!');

    const formattedChain = activeEffects.filter(eff => eff.enabled).map(eff => ({ type: eff.type, ...eff.params }));
    if (formattedChain.length === 0) return alert('الرف فارغ.');

    let start = selectedRegion?.start || 0;
    let end = selectedRegion?.end || start + 5;

    setIsProcessing(true);
    try {
      const response = await api.post('/ai/apply-rack', {
        inputFilePath: currentPath,
        effectsChain: formattedChain,
        isRegion: isRegion,
        start_time: start,
        end_time: end
      });
      
      if (onProcessComplete && response.data.processedFileUrl) {
        onProcessComplete(response.data.processedFileUrl, response.data.processedFilePath);
      }
    } catch (error) {
      alert('حدث خطأ أثناء الاتصال بمحرك الصوت.');
    } finally { setIsProcessing(false); }
  };

  return (
    <div className="w-[340px] bg-bgSecondary border-l border-borderColor flex flex-col h-full overflow-hidden shadow-2xl z-20">
      <div className="h-12 border-b border-borderColor flex items-center justify-between px-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-accentPrimary" />
          <h3 className="font-bold text-sm tracking-wide text-textPrimary uppercase">Effects Rack</h3>
        </div>
        <span className="text-[10px] font-mono text-textSecondary bg-bgTertiary px-2 py-0.5 rounded border border-borderColor">
          {activeTrackId ? activeTrackId.replace('_', ' ').toUpperCase() : 'MASTER'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3 relative">
        {activeEffects.map((eff) => {
          const categoryMeta = EFFECT_CATEGORIES[eff.category];
          const Icon = categoryMeta?.icon || Settings2;

          return (
            <div key={eff.id} className={`bg-bgPrimary border rounded-lg overflow-hidden transition-all ${eff.enabled ? 'border-borderColor shadow-lg' : 'border-transparent opacity-60'}`}>
              <div className="flex items-center justify-between p-2.5 bg-bgTertiary border-b border-borderColor">
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleEffect(eff.id)} className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${eff.enabled ? 'bg-accentPrimary text-bgPrimary shadow-[0_0_10px_rgba(0,212,255,0.4)]' : 'bg-bgSecondary text-textSecondary'}`}>
                    <Power className="w-3.5 h-3.5" />
                  </button>
                  <Icon className={`w-4 h-4 ${categoryMeta?.color}`} />
                  <span className="text-sm font-bold truncate max-w-[140px]">{eff.name}</span>
                </div>
                <button onClick={() => removeEffect(eff.id)} className="text-textSecondary hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-[#0d0d0d] space-y-3">
                {Object.entries(eff.params || {}).map(([key, val]) => {
                  const sliderProps = getSliderProps(key);
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-[10px] text-textSecondary w-16 truncate uppercase" title={key}>{key.replace('_', ' ')}</span>
                      <input type="range" {...sliderProps} value={val} onChange={(e) => handleParamChange(eff.id, key, e.target.value)} disabled={!eff.enabled} className="flex-1 h-1 bg-bgSecondary appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-accentPrimary cursor-pointer disabled:cursor-not-allowed" />
                      <span className="text-[10px] font-mono text-accentSecondary w-8 text-right bg-bgSecondary px-1 py-0.5 rounded">{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="relative mt-4" ref={menuRef}>
          <button onClick={() => setShowAddMenu(!showAddMenu)} className="w-full py-3 border border-dashed border-textSecondary/40 text-textSecondary rounded-lg hover:border-accentPrimary hover:text-accentPrimary transition-colors flex items-center justify-center gap-2 text-sm font-medium bg-bgTertiary/30">
            <Plus className="w-4 h-4" /> Add Effect
            <ChevronDown className={`w-4 h-4 transition-transform ${showAddMenu ? 'rotate-180' : ''}`} />
          </button>

          {showAddMenu && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-[#0a0a0a] border border-borderColor rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {Object.entries(EFFECT_CATEGORIES).map(([catKey, category]) => (
                  <div key={catKey}>
                    <div className="px-3 py-1.5 bg-bgSecondary/50 text-[10px] font-bold text-textSecondary uppercase tracking-wider flex items-center gap-2">
                      <category.icon className={`w-3 h-3 ${category.color}`} />
                      {category.title}
                    </div>
                    {category.effects.map((effect, idx) => (
                      <button key={idx} onClick={() => addEffectToRack(effect.name, effect.type, catKey)} className="w-full text-left px-4 py-2 text-sm text-textPrimary hover:bg-accentPrimary hover:text-bgPrimary transition-colors flex items-center justify-between group">
                        {effect.name}
                        <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-[#0a0a0a] border-t border-borderColor flex flex-col gap-3 shadow-[0_-5px_20px_rgba(0,0,0,0.4)]">
        <div className="text-[11px] text-textSecondary flex justify-between px-2 bg-bgTertiary py-1.5 rounded border border-borderColor">
          <span>Target Region:</span>
          <span className="font-mono text-accentSecondary font-bold">
            {selectedRegion ? `${selectedRegion.start.toFixed(1)}s - ${selectedRegion.end.toFixed(1)}s` : '0.0s - 5.0s (Auto)'}
          </span>
        </div>

        <div className="flex gap-2">
          <button className={`flex items-center justify-center rounded-lg transition-colors ${isPlaying ? "bg-accentSecondary text-bgPrimary w-12" : "w-12 border border-borderColor text-textPrimary hover:bg-bgTertiary"}`} onClick={togglePlayPreview} disabled={!audioRef.current.src && !isPreviewing}>
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          <button className="flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium bg-bgTertiary hover:bg-[#222] border border-borderColor hover:text-accentPrimary hover:border-accentPrimary transition-all duration-300 disabled:opacity-50" onClick={handlePreviewRegion} disabled={isPreviewing}>
            {isPreviewing ? <Loader2 className="w-4 h-4 animate-spin text-accentPrimary" /> : <><Zap className="w-3.5 h-3.5" /> Preview Region</>}
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <button onClick={() => handleApplyEffects(true)} disabled={isProcessing || activeEffects.length === 0} className="w-full bg-bgSecondary border border-accentPrimary text-accentPrimary font-bold py-2 px-4 rounded-lg hover:bg-accentPrimary hover:text-bgPrimary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Scissors className="w-4 h-4" /> Apply to Region Only</>}
          </button>
          <button onClick={() => handleApplyEffects(false)} disabled={isProcessing || activeEffects.length === 0} className="w-full bg-gradient-to-r from-accentPrimary to-accentSecondary text-bgPrimary font-bold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(0,255,136,0.15)]">
            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Apply to Full Track</>}
          </button>
        </div>
      </div>
    </div>
  );
};