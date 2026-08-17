import { type ReactNode } from 'react';
import { useTilt } from '../hooks/useTilt';

/**
 * Wraps children with 3D tilt on hover.
 */
export function TiltCard({ children, max = 8, className = '' }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useTilt<HTMLDivElement>(max);
  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}
