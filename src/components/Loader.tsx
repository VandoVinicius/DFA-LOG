import { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';

/**
 * Loading screen with DFA LOG logo and an animated route being drawn
 * with a truck travelling along it. Fades out after load.
 */
export function Loader({ onDone }: { onDone?: () => void }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHidden(true);
      onDone?.();
    }, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`loader ${hidden ? 'done' : ''}`}>
      <div className="loader-inner">
        <div className="loader-logo">
          <span className="logo-mark"><i /><i /><i /></span>
          <strong>DFA<span>LOG</span></strong>
        </div>
        <div className="loader-route">
          <svg viewBox="0 0 200 24" preserveAspectRatio="none">
            <path className="lr-track" d="M4 12 C 50 2, 70 22, 100 12 S 150 2, 196 12" />
            <path className="lr-dash" d="M4 12 C 50 2, 70 22, 100 12 S 150 2, 196 12" />
          </svg>
          <span className="lr-truck"><Truck size={13} /></span>
        </div>
        <p className="loader-text">Preparando sua rota…</p>
      </div>
    </div>
  );
}
