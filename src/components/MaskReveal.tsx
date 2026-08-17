import { type ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

/**
 * Image reveal: a clip-path mask wipes open (left to right) when in view,
 * with a subtle scale on the image inside.
 */
export function MaskReveal({
  children,
  className = '',
  direction = 'left',
}: {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const clipStart: Record<string, string> = {
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
    top: 'inset(0 0 100% 0)',
    bottom: 'inset(100% 0 0 0)',
  };
  const clipEnd = 'inset(0 0 0 0)';

  return (
    <div
      ref={ref}
      className={`mask-reveal ${className}`}
      style={{
        clipPath: inView ? clipEnd : clipStart[direction],
        WebkitClipPath: inView ? clipEnd : clipStart[direction],
        transition: 'clip-path 1s cubic-bezier(.22,.61,.36,1), -webkit-clip-path 1s cubic-bezier(.22,.61,.36,1)',
      }}
    >
      {children}
    </div>
  );
}
