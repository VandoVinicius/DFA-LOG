import { FileText, Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/**
 * Document scanner: a row of documents that slide into view, with a
 * scanner line passing over them and checkmarks drawing as they complete.
 * Represents documentação → análise → regularização.
 */
export function DocScanner() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div className="doc-scanner" ref={ref}>
      <div className="docs-row">
        {[0, 1, 2].map(i => (
          <div className="doc-card" key={i} style={{ transitionDelay: `${i * 0.18}s` }}>
            <FileText size={22} />
            <div className="doc-lines">
              <span /><span /><span />
            </div>
            <span className={`doc-check ${inView ? 'on' : ''}`} style={{ transitionDelay: `${i * 0.18 + 0.9}s` }}>
              <Check size={13} />
            </span>
          </div>
        ))}
      </div>
      <div className={`scanner-line ${inView ? 'go' : ''}`} />
      <div className="scanner-glow" />
    </div>
  );
}
