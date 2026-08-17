import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const whatsappUrl = 'https://wa.me/559284120696';

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setVisible(true), 2200);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className={`whatsapp-float ${visible ? 'visible' : ''}`}
      aria-label="Falar no WhatsApp"
    >
      <span className="whatsapp-tooltip">Fale com a DFA LOG</span>
      <span className="whatsapp-pulse" />
      <MessageCircle size={26} />
    </a>
  );
}
