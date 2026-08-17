import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const whatsappUrl = 'https://wa.me/559284120696';

/**
 * Auto WhatsApp toast: appears after a delay, fades in, and auto-dismisses.
 * Can be closed manually. Clicking opens WhatsApp.
 */
export function WhatsAppToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 4500);
    const t2 = setTimeout(() => setVisible(false), 14000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="wa-toast">
      <button className="wa-toast-close" onClick={() => setVisible(false)} aria-label="Fechar">
        <X size={14} />
      </button>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="wa-toast-inner">
        <span className="wa-toast-icon"><MessageCircle size={20} /></span>
        <div>
          <strong>DFA LOG</strong>
          <p>Precisa regularizar sua documentação? Fale com a gente.</p>
        </div>
      </a>
    </div>
  );
}
