import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

export type Testimonial = { name: string; role: string; text: string };

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex(i => (i + 1) % items.length), 5500);
    return () => clearInterval(t);
  }, [paused, items.length]);

  return (
    <div
      className="testimonials-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="testimonials-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {items.map((t, i) => (
          <div className="testimonial-slide" key={i}>
            <Quote size={28} className="testimonial-quote" />
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <span className="testimonial-avatar">{t.name.charAt(0)}</span>
              <div>
                <strong>{t.name}</strong>
                <small>{t.role}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`testimonial-dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Depoimento ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
