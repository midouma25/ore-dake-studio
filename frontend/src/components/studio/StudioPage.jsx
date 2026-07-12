import { useLocation, Navigate } from 'react-router-dom';
import { AudioRealm } from '../dashboard/AudioRealm';

export const StudioPage = () => {
  const location = useLocation();
  // استلام البيانات (المسارات والملف الأصلي) القادمة من لوحة القيادة
  const { tracks, originalTrackUrl } = location.state || {};

  // إذا حاول شخص الدخول للرابط مباشرة بدون رفع ملف، نطرده للرئيسية!
  if (!tracks) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-bgPrimary text-white overflow-x-hidden">
      {/* هنا سنضيف لاحقاً الشريط العلوي (TopBar) والقائمة الجانبية (Sidebar) */}
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-accentPrimary flex items-center gap-2">
            <span>✨</span> Studio Workspace
          </h1>
          <p className="text-textSecondary">Edit and compare audio tracks with high precision.</p>
        </div>
        
        {/* استدعاء المحرر الاحترافي وتمرير البيانات إليه */}
        <AudioRealm tracks={tracks} originalTrackUrl={originalTrackUrl} />
      </div>
    </div>
  );
};