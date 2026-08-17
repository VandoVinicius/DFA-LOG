import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor: a dot that follows instantly and a ring that trails.
 * Ring grows over interactive elements (a, button, [data-cursor]).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let grow = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setHidden(false);
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target as HTMLElement;
      grow = !!t.closest('a, button, [data-cursor], input, textarea, select, label');
    };
    const onLeave = () => setHidden(true);
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) scale(${grow ? 1.8 : 1})`;
        ringRef.current.style.opacity = grow ? '0.7' : '0.35';
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`custom-cursor ${hidden ? 'hidden' : ''}`} aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
