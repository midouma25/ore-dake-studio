import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'; // 🌟 استيراد إضافة التحديد
import { Play, Pause, SkipBack, Volume2, Trash2 } from 'lucide-react';
import { useEffectsStore } from '../../store/useEffectsStore'; 

export const AudioRealm = ({ tracks = [], onDeleteTrack }) => {
  const containerRefs = useRef({}); 
  const wavesurfersRef = useRef({});
  const wsRegionsRef = useRef({}); // 🌟 مرجع لحفظ إضافات التحديد
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackStates, setTrackStates] = useState({});

  const { activeTrackId, setActiveTrack, setSelectedRegion } = useEffectsStore(); // 🌟 جلب دالة التحديد

  useEffect(() => {
    Object.values(wavesurfersRef.current).forEach(ws => { if (ws) ws.destroy(); });
    wavesurfersRef.current = {};
    wsRegionsRef.current = {};

    if (!tracks.length) return;

    const initialStates = {};
    tracks.forEach((track) => {
      const autoMuteMaster = tracks.length > 1 && track.id === 'master_track';
      initialStates[track.id] = { mute: autoMuteMaster, solo: false, volume: 1 };
    });
    setTrackStates(initialStates);

    tracks.forEach((track) => {
      if (!containerRefs.current[track.id]) return;

      const ws = WaveSurfer.create({
        container: containerRefs.current[track.id],
        waveColor: track.type === 'original' ? '#FFB800' : '#00FF88', 
        progressColor: '#00D4FF',
        cursorColor: '#FFFFFF',
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        height: 64,
        normalize: true,
      });

      // 🌟 تفعيل إضافة التحديد (Regions) 🌟
      const wsRegions = ws.registerPlugin(RegionsPlugin.create());
      wsRegionsRef.current[track.id] = wsRegions;

      // السماح بالسحب بالماوس لإنشاء تحديد بلون أخضر شفاف
      wsRegions.enableDragSelection({
        color: 'rgba(0, 255, 136, 0.25)', 
      });

      // 🌟 عند إنشاء أو تعديل التحديد 🌟
      wsRegions.on('region-updated', (region) => {
        // نمنع وجود أكثر من تحديد في نفس المسار (نحذف القديم ونبقي الجديد)
        wsRegions.getRegions().forEach(r => {
          if (r.id !== region.id) r.remove();
        });

        // إرسال نقطة البداية والنهاية للـ Store
        setSelectedRegion({
          trackId: track.id,
          start: region.start,
          end: region.end
        });
        setActiveTrack(track.id); // جعل التراك المحدّد هو النشط تلقائياً
      });

      const autoMuteMaster = tracks.length > 1 && track.id === 'master_track';
      ws.setVolume(autoMuteMaster ? 0 : 1);

      ws.load(track.src);
      wavesurfersRef.current[track.id] = ws;

      ws.on('interaction', () => {
        const currentTime = ws.getCurrentTime();
        Object.entries(wavesurfersRef.current).forEach(([otherId, otherWs]) => {
          if (track.id !== otherId && otherWs) { 
            otherWs.setTime(currentTime);
          }
        });
      });
      
      ws.on('finish', () => {
        setIsPlaying(false);
      });
    });

    return () => {
      Object.values(wavesurfersRef.current).forEach(ws => { if (ws) ws.destroy(); });
    };
  }, [tracks, setActiveTrack, setSelectedRegion]);

  const togglePlay = () => {
    const willPlay = !isPlaying;
    setIsPlaying(willPlay);
    Object.values(wavesurfersRef.current).forEach(ws => {
      if (ws) { 
        try { willPlay ? ws.play() : ws.pause(); } catch(e) {}
      }
    });
  };
  
  const stopPlayback = () => {
    setIsPlaying(false);
    Object.values(wavesurfersRef.current).forEach(ws => {
      if (ws) {
        try { ws.pause(); ws.setTime(0); } catch(e) {}
      }
    });
  };

  const toggleMute = (id) => {
    const newStates = { ...trackStates };
    if(newStates[id]) {
      newStates[id].mute = !newStates[id].mute;
      setTrackStates(newStates);
      applyAudioStates(newStates);
    }
  };

  const toggleSolo = (id) => {
    const newStates = { ...trackStates };
    if(newStates[id]) {
      newStates[id].solo = !newStates[id].solo;
      setTrackStates(newStates);
      applyAudioStates(newStates);
    }
  };

  const handleVolumeChange = (id, newVolume) => {
    const newStates = { ...trackStates };
    if(newStates[id]) {
      newStates[id].volume = newVolume;
      setTrackStates(newStates);
      applyAudioStates(newStates);
    }
  };

  const applyAudioStates = (states) => {
    const anySolo = Object.values(states).some(s => s.solo);

    Object.entries(wavesurfersRef.current).forEach(([id, ws]) => {
      if (!ws) return;
      const state = states[id];
      if (!state) return;
      
      if (anySolo) {
        ws.setVolume(state.solo ? state.volume : 0);
      } else {
        ws.setVolume(state.mute ? 0 : state.volume);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="flex items-center justify-center gap-6 bg-bgSecondary border border-borderColor p-3 rounded-xl sticky top-0 z-20 shadow-xl">
        <button onClick={stopPlayback} className="p-2 hover:bg-bgTertiary rounded-lg text-textSecondary hover:text-white transition-colors" title="Stop & Rewind">
          <SkipBack className="w-5 h-5" />
        </button>
        <button onClick={togglePlay} className="p-3 bg-accentPrimary text-bgPrimary rounded-full hover:scale-105 transition-transform shadow-lg shadow-accentPrimary/20">
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>
      </div>

      {tracks.map((track, idx) => {
        const isActive = activeTrackId === track.id;

        return (
          <div 
            key={track.id} 
            onClick={() => setActiveTrack(track.id)} 
            className={`flex bg-bgSecondary border-2 rounded-xl overflow-hidden shadow-sm group transition-all cursor-pointer ${
              isActive 
                ? 'border-accentPrimary shadow-[0_0_15px_rgba(0,255,136,0.15)]' 
                : 'border-borderColor hover:border-textSecondary/50'
            }`}
          >
            
            <div className="w-52 bg-bgTertiary border-r border-borderColor p-3 flex flex-col justify-center gap-2 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono border ${isActive ? 'bg-accentPrimary text-bgPrimary border-accentPrimary font-bold' : 'bg-bgPrimary text-textSecondary border-borderColor'}`}>
                    TRK {idx + 1}
                  </span>
                  <h4 className={`font-bold text-sm truncate ${isActive ? 'text-accentPrimary' : 'text-textPrimary'}`} title={track.name}>
                    {track.name}
                  </h4>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteTrack(track.id); }}
                  className="p-1.5 text-textSecondary hover:text-danger hover:bg-danger/10 rounded transition-colors"
                  title="Delete Track"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex gap-2 z-10">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMute(track.id); }}
                  className={`flex-1 py-1 text-xs font-bold rounded border transition-all duration-200 ${
                    trackStates[track.id]?.mute 
                      ? 'bg-[#FF4444] text-white border-[#FF4444] shadow-[0_0_10px_rgba(255,68,68,0.4)]' 
                      : 'bg-bgPrimary text-textSecondary border-borderColor hover:border-textSecondary'
                  }`}
                >M</button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleSolo(track.id); }}
                  className={`flex-1 py-1 text-xs font-bold rounded border transition-all duration-200 ${
                    trackStates[track.id]?.solo 
                      ? 'bg-[#FFB800] text-bgPrimary border-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.4)]' 
                      : 'bg-bgPrimary text-textSecondary border-borderColor hover:border-textSecondary'
                  }`}
                >S</button>
              </div>

              <div className="flex items-center gap-2 mt-1 z-10 bg-bgPrimary/50 p-1.5 rounded border border-borderColor" onClick={e => e.stopPropagation()}>
                <Volume2 className="w-3 h-3 text-textSecondary" />
                <input 
                  type="range" 
                  min="0" max="1" step="0.05"
                  value={trackStates[track.id]?.volume ?? 1}
                  onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-bgSecondary appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-textSecondary hover:[&::-webkit-slider-thumb]:bg-white cursor-pointer transition-all"
                />
              </div>
            </div>

            {/* 🌟 منطقة الموجة الصوتية - الآن تقبل السحب للتحديد 🌟 */}
            <div className="flex-1 relative bg-[#0D0D0D] p-2 flex flex-col justify-center">
              <div ref={el => containerRefs.current[track.id] = el} className="w-full"></div>
            </div>
            
          </div>
        );
      })}
    </div>
  );
};