import React, { useState } from 'react';
import { Sliders, Activity, Radio, Waves, Cpu, Power, Plus, Trash2, Settings2 } from 'lucide-react';

// قائمة الفلاتر المتاحة مقسمة حسب الفئات
const EFFECT_CATEGORIES = {
  dynamics: { title: 'Dynamics (الديناميكية)', icon: Activity, color: 'text-blue-400', effects: ['Compressor', 'Limiter', 'NoiseGate'] },
  eq: { title: 'EQ & Filters (الترددات)', icon: Sliders, color: 'text-green-400', effects: ['Highpass', 'Lowpass', 'Parametric EQ'] },
  spatial: { title: 'Spatial & Delay (الفراغ)', icon: Waves, color: 'text-purple-400', effects: ['Reverb', 'Delay'] },
  modulation: { title: 'Modulation (التشكيل)', icon: Radio, color: 'text-pink-400', effects: ['Pitch Shift', 'Chorus', 'Distortion'] },
  vst: { title: 'VST / Plugins (إضافات خارجية)', icon: Cpu, color: 'text-amber-400', effects: ['Load VST3 Plugin...'] }
};

export const EffectsRack = () => {
  // حالة الفلاتر النشطة في الرف (يمكن للمستخدم إضافة أكثر من فلتر)
  const [activeEffects, setActiveEffects] = useState([
    { id: 1, name: 'Compressor', category: 'dynamics', enabled: true, params: { threshold: -12, ratio: 4 } },
    { id: 2, name: 'Parametric EQ', category: 'eq', enabled: true, params: { low: 2, mid: 0, high: 3 } }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  // تفعيل/تعطيل الفلتر (Bypass)
  const toggleEffect = (id) => {
    setActiveEffects(activeEffects.map(eff => 
      eff.id === id ? { ...eff, enabled: !eff.enabled } : eff
    ));
  };

  // إزالة فلتر من الرف
  const removeEffect = (id) => {
    setActiveEffects(activeEffects.filter(eff => eff.id !== id));
  };

  // دالة وهمية حالياً لإرسال الفلاتر لمعرك بايثون
  const handleApplyEffects = () => {
    setIsProcessing(true);
    console.log("جاري إرسال هذه الفلاتر لبايثون للتطبيق:", activeEffects);
    setTimeout(() => setIsProcessing(false), 1500); // محاكاة وقت المعالجة
  };

  return (
    <div className="w-80 bg-bgSecondary border-l border-borderColor flex flex-col h-full overflow-hidden shadow-2xl z-20">
      
      {/* رأس اللوحة */}
      <div className="h-12 border-b border-borderColor flex items-center justify-between px-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-accentPrimary" />
          <h3 className="font-bold text-sm tracking-wide text-textPrimary uppercase">Effects Rack</h3>
        </div>
        <span className="text-xs font-mono text-textSecondary bg-bgTertiary px-2 py-0.5 rounded border border-borderColor">
          {activeEffects.length} Slots
        </span>
      </div>

      {/* الرفوف (Active Effects) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
        {activeEffects.length === 0 ? (
          <div className="text-center text-textSecondary text-sm p-6 border-2 border-dashed border-borderColor rounded-lg">
            No effects added yet.<br/>Click below to add some magic!
          </div>
        ) : (
          activeEffects.map((eff, index) => {
            const categoryMeta = EFFECT_CATEGORIES[eff.category];
            const Icon = categoryMeta?.icon || Settings2;

            return (
              <div key={eff.id} className={`bg-bgPrimary border rounded-lg overflow-hidden transition-all ${eff.enabled ? 'border-borderColor shadow-lg' : 'border-transparent opacity-60'}`}>
                {/* شريط عنوان الفلتر */}
                <div className="flex items-center justify-between p-2.5 bg-bgTertiary border-b border-borderColor">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleEffect(eff.id)}
                      className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${eff.enabled ? 'bg-accentPrimary text-bgPrimary shadow-[0_0_10px_rgba(0,212,255,0.4)]' : 'bg-bgSecondary text-textSecondary'}`}
                      title={eff.enabled ? 'Turn Off (Bypass)' : 'Turn On'}
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                    <Icon className={`w-4 h-4 ${categoryMeta?.color}`} />
                    <span className="text-sm font-bold truncate max-w-[120px]">{eff.name}</span>
                  </div>
                  
                  <button onClick={() => removeEffect(eff.id)} className="text-textSecondary hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* واجهة تحكم مصغرة (Sliders) */}
                <div className="p-3 bg-[#0d0d0d] space-y-3">
                  {Object.entries(eff.params || {}).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-xs text-textSecondary w-14 truncate capitalize">{key}</span>
                      <input 
                        type="range" 
                        min="-20" max="20" defaultValue={val}
                        disabled={!eff.enabled}
                        className="flex-1 h-1 bg-bgSecondary appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-accentPrimary cursor-pointer"
                      />
                      <span className="text-xs font-mono text-textPrimary w-8 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {/* زر إضافة فلتر جديد (قائمة منسدلة وهمية حالياً) */}
        <button className="w-full py-2.5 mt-2 border border-dashed border-textSecondary/40 text-textSecondary rounded-lg hover:border-accentPrimary hover:text-accentPrimary transition-colors flex items-center justify-center gap-2 text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Effect / VST
        </button>
      </div>

      {/* منطقة تطبيق الفلاتر */}
      <div className="p-4 border-t border-borderColor bg-[#0a0a0a]">
        <button 
          onClick={handleApplyEffects}
          disabled={isProcessing || activeEffects.length === 0}
          className="w-full bg-gradient-to-r from-accentPrimary to-accentSecondary text-bgPrimary font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <span className="animate-pulse">Rendering Audio...</span>
          ) : (
            <>Apply Rack to Track</>
          )}
        </button>
      </div>
    </div>
  );
};