import React, { useEffect, useRef, useState, useMemo } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, SkipBack, Volume2 } from 'lucide-react'; // أضفنا أيقونة الصوت

export const AudioRealm = ({ tracks = [], originalTrackUrl }) => {
  const containerRefs = useRef([]);
  const wavesurfersRef = useRef([]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackStates, setTrackStates] = useState({});

  const displayTracks = useMemo(() => {
    const master = originalTrackUrl ? [{ name: 'Master Track', src: originalTrackUrl, type: 'original' }] : [];
    if (tracks.length > 0) return [...master, ...tracks]; 
    return master;
  }, [tracks, originalTrackUrl]);

  useEffect(() => {
    wavesurfersRef.current.forEach(ws => { if (ws) ws.destroy(); });
    wavesurfersRef.current = [];

    if (!displayTracks.length) return;

    const initialStates = {};
    displayTracks.forEach((_, idx) => {
      const autoMuteMaster = displayTracks.length > 1 && idx === 0;
      // أضفنا volume: 1 كقيمة افتراضية
      initialStates[idx] = { mute: autoMuteMaster, solo: false, volume: 1 };
    });
    setTrackStates(initialStates);

    displayTracks.forEach((track, idx) => {
      if (!containerRefs.current[idx]) return;

      const ws = WaveSurfer.create({
        container: containerRefs.current[idx],
        waveColor: track.type === 'original' ? '#FFB800' : '#00FF88', 
        progressColor: '#00D4FF',
        cursorColor: '#FFFFFF',
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        height: 64,
        normalize: true,
      });

      const autoMuteMaster = displayTracks.length > 1 && idx === 0;
      ws.setVolume(autoMuteMaster ? 0 : 1);

      const audioUrl = typeof track === 'object' ? track.src : track;
      ws.load(audioUrl);
      wavesurfersRef.current[idx] = ws;

      ws.on('interaction', () => {
        const currentTime = ws.getCurrentTime();
        wavesurfersRef.current.forEach((otherWs, otherIdx) => {
          if (idx !== otherIdx && otherWs) { 
            otherWs.setTime(currentTime);
          }
        });
      });
      
      ws.on('finish', () => {
        if (idx === 0) setIsPlaying(false);
      });
    });

    return () => {
      wavesurfersRef.current.forEach(ws => { if (ws) ws.destroy(); });
    };
  }, [displayTracks]);

  const togglePlay = () => {
    const willPlay = !isPlaying;
    setIsPlaying(willPlay);
    wavesurfersRef.current.forEach(ws => {
      if (ws) { 
        try { willPlay ? ws.play() : ws.pause(); } catch(e) {}
      }
    });
  };
  
  const stopPlayback = () => {
    setIsPlaying(false);
    wavesurfersRef.current.forEach(ws => {
      if (ws) {
        try { ws.pause(); ws.setTime(0); } catch(e) {}
      }
    });
  };

  const toggleMute = (idx) => {
    const newStates = { ...trackStates };
    newStates[idx].mute = !newStates[idx].mute;
    setTrackStates(newStates);
    applyAudioStates(newStates);
  };

  const toggleSolo = (idx) => {
    const newStates = { ...trackStates };
    newStates[idx].solo = !newStates[idx].solo;
    setTrackStates(newStates);
    applyAudioStates(newStates);
  };

  // 🌟 دالة التحكم بالصوت الجديدة 🌟
  const handleVolumeChange = (idx, newVolume) => {
    const newStates = { ...trackStates };
    newStates[idx].volume = newVolume;
    setTrackStates(newStates);
    applyAudioStates(newStates);
  };

  const applyAudioStates = (states) => {
    const anySolo = Object.values(states).some(s => s.solo);

    wavesurfersRef.current.forEach((ws, idx) => {
      if (!ws) return;
      const state = states[idx];
      
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

      {displayTracks.map((track, idx) => (
        <div key={idx} className="flex bg-bgSecondary border border-borderColor rounded-xl overflow-hidden shadow-sm group hover:border-textSecondary/30 transition-colors">
          
          <div className="w-48 bg-bgTertiary border-r border-borderColor p-3 flex flex-col justify-center gap-2 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] bg-bgPrimary text-textSecondary px-1.5 py-0.5 rounded font-mono border border-borderColor">
                TRK {idx + 1}
              </span>
              <h4 className="font-bold text-sm text-textPrimary truncate" title={track.name || 'Audio Track'}>
                {track.name || `Track ${idx + 1}`}
              </h4>
            </div>
            
            <div className="flex gap-2 z-10">
              <button 
                onClick={() => toggleMute(idx)}
                className={`flex-1 py-1 text-xs font-bold rounded border transition-all duration-200 ${
                  trackStates[idx]?.mute 
                    ? 'bg-[#FF4444] text-white border-[#FF4444] shadow-[0_0_10px_rgba(255,68,68,0.4)]' 
                    : 'bg-bgPrimary text-textSecondary border-borderColor hover:border-textSecondary'
                }`}
              >M</button>
              <button 
                onClick={() => toggleSolo(idx)}
                className={`flex-1 py-1 text-xs font-bold rounded border transition-all duration-200 ${
                  trackStates[idx]?.solo 
                    ? 'bg-[#FFB800] text-bgPrimary border-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.4)]' 
                    : 'bg-bgPrimary text-textSecondary border-borderColor hover:border-textSecondary'
                }`}
              >S</button>
            </div>

            {/* 🌟 بكرة التحكم في مستوى الصوت 🌟 */}
            <div className="flex items-center gap-2 mt-1 z-10 bg-bgPrimary/50 p-1.5 rounded border border-borderColor">
              <Volume2 className="w-3 h-3 text-textSecondary" />
              <input 
                type="range" 
                min="0" max="1" step="0.05"
                value={trackStates[idx]?.volume ?? 1}
                onChange={(e) => handleVolumeChange(idx, parseFloat(e.target.value))}
                className="flex-1 h-1 bg-bgSecondary appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-textSecondary hover:[&::-webkit-slider-thumb]:bg-white cursor-pointer transition-all"
              />
            </div>
          </div>

          <div className="flex-1 relative bg-[#0D0D0D] p-2 flex flex-col justify-center cursor-crosshair">
            <div ref={el => containerRefs.current[idx] = el} className="w-full"></div>
          </div>
          
        </div>
      ))}
    </div>
  );
};