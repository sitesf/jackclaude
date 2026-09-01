import React from 'react';
import robotImage from '../assets/robot-nexas.webp';

/**
 * Dacă scena 3D nu poate fi încărcată (rețea blocată, WebGL indisponibil),
 * afișăm imaginea statică a robotului în loc să pice toată pagina.
 */
export class RobotBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    /* fallback-ul e suficient — nu logăm nimic în consolă */
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="absolute inset-0 overflow-hidden" style={{ background: '#070708' }}>
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 90%, rgba(182,0,168,0.14), transparent 60%)' }}
          />
          <img
            src={robotImage}
            alt="Robot NEXAS"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ zIndex: 5 }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
