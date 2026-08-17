import { useEffect, useState } from 'react';

/**
 * Rotating word: cycles through words with a soft flip/fade.
 * Used in the hero to alternate "segurança", "agilidade", "tranquilidade".
 */
export function RotatingWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI(prev => (prev + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className="rotating-word">
      <span className="rw-track">
        {words.map((w, idx) => (
          <span key={w} className={`rw-item ${idx === i ? 'active' : ''}`}>
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}
