import { type ReactNode, type ElementType } from 'react';
import { useInView } from '../hooks/useInView';

type Direction = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur' | 'scale';

const variants: Record<Direction, string> = {
  up: 'translateY(38px)',
  down: 'translateY(-38px)',
  left: 'translateX(-46px)',
  right: 'translateX(46px)',
  zoom: 'scale(1.12)',
  scale: 'scale(.92)',
  blur: 'blur(14px)',
};

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
};

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 800,
  as: Tag = 'div',
  className,
  style,
}: RevealProps) {
  const { ref, inView } = useInView();
  const transform = variants[direction];
  const isBlur = direction === 'blur';

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      style={{
        transition: `opacity ${duration}ms cubic-bezier(.22,.61,.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(.22,.61,.36,1) ${delay}ms${isBlur ? `, filter ${duration}ms cubic-bezier(.22,.61,.36,1) ${delay}ms` : ''}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transform,
        filter: isBlur ? (inView ? 'blur(0)' : 'blur(14px)') : 'none',
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
