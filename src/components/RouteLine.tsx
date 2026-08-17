import { Truck } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/**
 * Animated logistics route: an orange line draws progressively as it enters
 * the viewport, with location dots and a small truck marker travelling along it.
 * Represents transporte → documentação → regularização → empresa regularizada.
 */
export function RouteLine({ labels = true }: { labels?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const stops = ['Transporte', 'Documentação', 'Regularização', 'Regularizada'];

  return (
    <div className="route-line" ref={ref}>
      <svg className="route-svg" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
        <path className="route-track" d="M 20 30 C 200 5, 300 55, 500 30 S 800 5, 980 30" />
        <path
          className="route-dash"
          d="M 20 30 C 200 5, 300 55, 500 30 S 800 5, 980 30"
          style={{ strokeDashoffset: inView ? 0 : 1100 }}
        />
      </svg>
      <div className={`route-truck ${inView ? 'go' : ''}`}>
        <Truck size={16} />
      </div>
      {labels && (
        <div className="route-stops">
          {stops.map((s, i) => (
            <span key={s} className="route-stop" style={{ transitionDelay: `${i * 0.25 + 0.4}s` }}>
              <i /> {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
