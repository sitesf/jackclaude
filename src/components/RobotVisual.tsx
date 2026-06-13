import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

// Scena Spline originală, găzduită local (fără request către serverele Spline)
const SCENE_URL = '/jackclaude/models/nexbot.splinecode';

export const RobotVisual: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden" style={{ background: '#17181c' }}>
    {/* fundal antracit + ușor glow magenta jos */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(circle at 50% 88%, rgba(182,0,168,0.18), transparent 60%)',
      }}
    />
    <Suspense
      fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#B600A8] border-t-transparent animate-spin" />
        </div>
      }
    >
      <Spline scene={SCENE_URL} style={{ position: 'relative', zIndex: 5, width: '100%', height: '100%' }} />
    </Suspense>
  </div>
);
