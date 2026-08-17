import { type ReactNode } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

/**
 * Wraps children in a magnetic-effect span. Use around buttons/links.
 */
export function Magnetic({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useMagnetic<HTMLSpanElement>(strength);
  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}
