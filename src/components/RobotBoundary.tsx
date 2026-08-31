import React from 'react';

interface State {
  failed: boolean;
}

// Scena Spline încarcă un WASM extern; dacă acel fetch eșuează, eroarea ar
// demonta întregul arbore React și pagina ar rămâne albă.
export class RobotBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.handleRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handleRejection);
  }

  handleRejection = (event: PromiseRejectionEvent) => {
    const message = String(event.reason?.message ?? event.reason ?? '');
    if (message.includes('fetch') || message.includes('wasm')) {
      event.preventDefault();
      this.setState({ failed: true });
    }
  };

  render() {
    if (this.state.failed) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#070708]">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 60%, rgba(182,0,168,0.22), transparent 65%)' }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
