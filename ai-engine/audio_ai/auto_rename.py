import os
import re

# الكلمات المفتاحية الذكية لتصنيف ملفاتك تلقائياً
categories = {
    "anime_high": ['scream', 'goku', 'mahito', 'levi', 'dubbing', 'oikawa', 'fry'],
    "reverb_high": ['bathroom', 'hallway', 'acoustic', 'room', 'shower'],
    "noise_high": ['street', 'city', 'traffic', 'restaurant', 'cafe', 'wind', 'construction'],
    "mic_high": ['mic', 'headset', 'webcam', 'telephone', 'headphone', 'quadcast', 'rode'],
}

valid_ext = ('.wav', '.mp3', '.mp4', '.m4a', '.wmv', '.webm', '.ogg')

for filename in os.listdir('.'):
    if not filename.lower().endswith(valid_ext) or filename == os.path.basename(__file__):
        continue

    name_lower = filename.lower()
    ext = os.path.splitext(filename)[1]

    # البحث عن التصنيف المناسب
    prefix = "clean_med" # الافتراضي إذا لم يجد كلمة مفتاحية
    for cat, keywords in categories.items():
        if any(word in name_lower for word in keywords):
            prefix = cat
            break

    # تنظيف الاسم من الرموز والمسافات وجعله قصيراً وأنيقاً
    clean_name = re.sub(r'[^a-zA-Z0-9]', '_', filename[:-len(ext)])
    clean_name = re.sub(r'_+', '_', clean_name).strip('_')
    
    # دمج الاسم النهائي
    new_name = f"{prefix}_{clean_name[:15].lower()}{ext}"

    # إعادة التسمية
    try:
        os.rename(filename, new_name)
        print(f"✅ Renamed: {new_name}")
    except Exception as e:
        print(f"❌ Failed: {filename} -> {e}")

print("\n🎉 انتهت المهمة بنجاح! مجلدك الآن جاهز لمختبر الأبحاث.")