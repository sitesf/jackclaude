import React from 'react';

const VideoVisual: React.FC<{ src: string }> = ({ src }) => (
  <div className="w-full h-full relative overflow-hidden select-none bg-black">
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className="w-full h-full object-cover"
    />
  </div>
);

export const projectVisuals: Record<string, React.FC> = {
  niro:     () => <VideoVisual src="/niro-preview.mp4" />,
  neo:      () => <VideoVisual src="/neo-preview.mp4" />,
  hr:       () => <VideoVisual src="/hr-preview.mp4" />,
  stiri:    () => <VideoVisual src="/nexas-news-preview.mp4" />,
  alex:     () => <VideoVisual src="/alex-preview.mp4" />,
  sport:    () => <VideoVisual src="/sport-news-preview.mp4" />,
  logistik: () => <VideoVisual src="/service-auto-preview.mp4" />,
};
