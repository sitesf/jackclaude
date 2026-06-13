import React, { Suspense, lazy } from 'react';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

// Scena Spline originală, găzduită local (fără request către serverele Spline)
const SCENE_URL = '/jackclaude/models/nexbot.splinecode';

// Cuvinte-cheie pentru obiectele de text/fundal pe care vrem să le ascundem
const HIDE_HINTS = ['text', 'nexas', 'logo', 'title', 'word', 'type', 'letter', 'bg'];

const handleLoad = (spline: Application) => {
  const app = spline as unknown as {
    setBackgroundDisabled?: (v: boolean) => void;
    getAllObjects?: () => Array<{ name?: string; visible?: boolean }>;
  };
  try {
    // Fundal transparent → se vede fundalul antracit din spatele canvasului
    app.setBackgroundDisabled?.(true);
  } catch {
    /* ignore */
  }
  try {
    const objects = app.getAllObjects?.() ?? [];
    objects.forEach((obj: { name?: string; visible?: boolean }) => {
      const name = (obj.name ?? '').toLowerCase();
      // ascundem doar obiectele plate de tip text/logo, NU robotul
      if (name && HIDE_HINTS.some((h) => name.includes(h)) && !name.includes('robot') && !name.includes('bot')) {
        obj.visible = false;
      }
    });
  } catch {
    /* ignore */
  }
};

export const RobotVisual: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden" style={{ background: '#070708' }}>
    {/* glow magenta discret jos */}
    <div
      className="absolute inset-0"
      style={{ background: 'radial-gradient(circle at 50% 90%, rgba(182,0,168,0.14), transparent 60%)' }}
    />
    <Suspense
      fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#B600A8] border-t-transparent animate-spin" />
        </div>
      }
    >
      <Spline
        scene={SCENE_URL}
        onLoad={handleLoad}
        style={{ position: 'relative', zIndex: 5, width: '100%', height: '100%' }}
      />
    </Suspense>
  </div>
);
