import { type LucideIcon } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/**
 * Icon that "draws" itself progressively when scrolled into view,
 * using an SVG stroke-dashoffset animation on the lucide icon path.
 */
export function DrawIcon({ Icon, size = 24, className = '' }: { Icon: LucideIcon; size?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });

  return (
    <span ref={ref} className={`draw-icon ${inView ? 'drawn' : ''} ${className}`}>
      <Icon size={size} />
    </span>
  );
}
