import { useState, useRef, useEffect } from 'react';

export const AudioRealm = ({ tracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mutedTracks, setMutedTracks] = useState({});
  const [progress, setProgress] = useState(0);
  
  // مصفوفة للاحتفاظ بمراجع (Refs) المشغلات الصوتية المخفية لضمان مزامنتها
  const audioRefs = useRef([]);
  const animationRef = useRef();

  // تهيئة المسارات عند التحميل
  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, tracks.length);
  }, [tracks]);

  // دالة تحديث شريط التقدم الزمني
  const updateProgress = () => {
    if (audioRefs.current[0]) {
      const duration = audioRefs.current[0].duration;
      const currentTime = audioRefs.current[0].currentTime;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  // دالة التشغيل والإيقاف الموحدة (Master Control)
  const togglePlayAll = () => {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    
    audioRefs.current.forEach((audioElement) => {
      if (audioElement) {
        if (nextIsPlaying) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
    });
  };

  // دالة كتم وإلغاء كتم مسار معين (Mute Control)
  const toggleMute = (index, trackId) => {
    const audioElement = audioRefs.current[index];
    if (audioElement) {
      const isCurrentlyMuted = mutedTracks[trackId] || false;
      audioElement.muted = !isCurrentlyMuted;
      setMutedTracks(prev => ({ ...prev, [trackId]: !isCurrentlyMuted }));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 bg-bgTertiary p-6 md:p-8 rounded-3xl border border-accentPrimary/20 shadow-2xl">
      <div className="flex items-center justify-between mb-8 border-b border-borderColor pb-4">
        <h2 className="text-3xl font-black text-white flex items-center gap-3">
          <span className="text-accentPrimary">🎛️</span> Audio Realm
        </h2>
        
        {/* زر التشغيل الرئيسي (Master Play) */}
        <button 
          onClick={togglePlayAll}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
            isPlaying ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-accentPrimary text-bgPrimary shadow-[0_0_15px_rgba(0,255,136,0.3)]'
          }`}
        >
          {isPlaying ? '⏸ Pause All' : '▶ Play Studio'}
        </button>
      </div>

      {/* شريط التقدم الرئيسي للمشروع (Timeline) */}
      <div className="mb-10 bg-bgSecondary h-3 rounded-full overflow-hidden border border-borderColor">
        <div 
          className="h-full bg-accentPrimary transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* قائمة المسارات (Stems) */}
      <div className="flex flex-col gap-4">
        {tracks.map((track, index) => {
          const isMuted = mutedTracks[track.id] || false;
          
          return (
            <div key={track.id} className="relative flex items-center justify-between p-4 bg-bgSecondary rounded-2xl border border-borderColor/50 hover:border-accentPrimary/30 transition-colors group">
              
              {/* تفاصيل المسار */}
              <div className="flex items-center gap-4 z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${isMuted ? 'bg-bgTertiary opacity-50' : 'bg-accentPrimary/20'}`}>
                  {track.name.split(' ')[0]} {/* استخراج الإيموجي من الاسم */}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${isMuted ? 'text-textSecondary line-through' : 'text-textPrimary'}`}>
                    {track.name.split(' ').slice(1).join(' ')}
                  </h3>
                  <span className="text-xs text-textSecondary">320kbps MP3 (AI Separated)</span>
                </div>
              </div>

              {/* زر الكتم (Mute) */}
              <button 
                onClick={() => toggleMute(index, track.id)}
                className={`z-10 px-6 py-2 rounded-lg font-bold transition-all ${
                  isMuted 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-bgTertiary text-textPrimary hover:bg-white/10'
                }`}
              >
                {isMuted ? '🔇 Unmute' : '🔈 Mute'}
              </button>

              {/* مشغل الصوت الخفي (يعمل في الخلفية للتحكم برمجياً) */}
              <audio 
                ref={el => audioRefs.current[index] = el}
                src={track.src} 
                preload="auto"
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* تأثير بصري في الخلفية عند التشغيل */}
              {isPlaying && !isMuted && (
                <div className="absolute inset-0 bg-accentPrimary/5 rounded-2xl animate-pulse pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};