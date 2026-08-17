import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  Clock,
  Eye,
  Headset,
  Lock,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
  UserRoundCheck,
  X,
  Zap,
} from 'lucide-react';
import { Reveal } from './components/Reveal';
import { RouteLine } from './components/RouteLine';
import { BackToTop } from './components/BackToTop';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';
import { ReadingProgress } from './components/ReadingProgress';
import { RotatingWord } from './components/RotatingWord';
import { DrawIcon } from './components/DrawIcon';
import { MaskReveal } from './components/MaskReveal';
import { DocScanner } from './components/DocScanner';
import { FAQ } from './components/FAQ';
import { Testimonials } from './components/Testimonials';
import { WhatsAppToast } from './components/WhatsAppToast';
import { Magnetic } from './components/Magnetic';
import { TiltCard } from './components/TiltCard';
import { useInView } from './hooks/useInView';

const whatsappUrl = 'https://wa.me/559284120696';

const highlights = [
  { icon: ClipboardCheck, label: 'RNTRC', text: 'Regularização e manutenção do cadastro.' },
  { icon: Truck, label: 'Veículos', text: 'Atualização e regularização dos veículos.' },
  { icon: FileCheck2, label: 'Documentação', text: 'Organização e atualização de documentos.' },
  { icon: UserRoundCheck, label: 'Assessoria', text: 'Suporte durante todo o processo.' },
];

const services = [
  { icon: BadgeCheck, title: 'Cadastro RNTRC', text: 'Primeira inscrição e regularização para transportadores e empresas.', image: 'https://images.pexels.com/photos/28264496/pexels-photo-28264496.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: FileCheck2, title: 'Renovação RNTRC', text: 'Renovação e manutenção da documentação em situação regular.', image: 'https://images.pexels.com/photos/35602229/pexels-photo-35602229.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Truck, title: 'Regularização de veículos', text: 'Atualização dos dados e documentação dos veículos.', image: 'https://images.pexels.com/photos/27508769/pexels-photo-27508769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: FileText, title: 'Atualização cadastral', text: 'Correção e atualização das informações cadastrais.', image: 'https://images.pexels.com/photos/6169576/pexels-photo-6169576.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: ClipboardCheck, title: 'Certificados e documentos', text: 'Auxílio na organização e atualização da documentação necessária.', image: 'https://images.pexels.com/photos/5025654/pexels-photo-5025654.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: BarChart3, title: 'Consultoria', text: 'Orientação para evitar pendências e problemas na documentação.', image: 'https://images.pexels.com/photos/6169138/pexels-photo-6169138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

const reasons = [
  { icon: Zap, title: 'Atendimento rápido', text: 'Resposta e acompanhamento durante todo o processo.' },
  { icon: ShieldCheck, title: 'Experiência', text: 'Conhecimento dos processos relacionados ao transporte.' },
  { icon: FileCheck2, title: 'Praticidade', text: 'Menos burocracia para você seguir em frente.' },
  { icon: UserRoundCheck, title: 'Acompanhamento', text: 'Suporte próximo em cada etapa da regularização.' },
];

const steps = [
  ['01', 'Entre em contato', 'Conte o que você precisa.'],
  ['02', 'Envie seus documentos', 'Receba orientação sobre os próximos passos.'],
  ['03', 'Analisamos sua situação', 'Identificamos pendências e oportunidades.'],
  ['04', 'Regularizamos tudo', 'Você acompanha o processo com tranquilidade.'],
];

const commitments = [
  { icon: Eye, title: 'Transparência', text: 'Você acompanha cada etapa do processo, sem surpresas.' },
  { icon: Clock, title: 'Prazos claros', text: 'Definimos prazos realistas e cumprimos o que combinamos.' },
  { icon: Headset, title: 'Acompanhamento dedicado', text: 'Suporte próximo do primeiro contato à conclusão.' },
  { icon: Lock, title: 'Sigilo e segurança', text: 'Seus dados e documentos tratados com total confidencialidade.' },
];

const faqItems = [
  { q: 'O que é necessário para obter o RNTRC?', a: 'É preciso apresentar documentos do veículo e do transportador, além de cumprir os requisitos da ANTT. Cuidamos de todo o processo para você.' },
  { q: 'Quanto tempo leva a regularização?', a: 'O prazo varia conforme o tipo de processo e a situação cadastral, mas trabalhamos para concluir tudo com a maior agilidade possível.' },
  { q: 'Vocês atendem empresas e autônomos?', a: 'Sim. A DFA LOG atende tanto transportadores autônomos quanto empresas de transporte, em todas as etapas de regularização.' },
  { q: 'Como acompanho o andamento do meu processo?', a: 'Você recebe suporte próximo durante todo o processo, com atualizações claras sobre cada etapa da regularização.' },
  { q: 'Preciso renovar o RNTRC com que frequência?', a: 'O RNTRC possui prazo de validade definido pela ANTT. Avisamos com antecedência para que a renovação seja feita sem interromper sua operação.' },
];

const testimonials = [
  { name: 'Carlos Mendes', role: 'Transportador autônomo', text: 'A DFA LOG resolveu uma pendência que eu carregava há meses. Atendimento claro e processo rápido. Recomendo demais.' },
  { name: 'Juliana Ramos', role: 'Gestora de frota', text: 'Profissionais que entendem do setor. Toda a documentação dos veículos foi regularizada sem que eu precisasse me preocupar.' },
  { name: 'Roberto Silva', role: 'Empresário de transporte', text: 'Organização, agilidade e segurança. A DFA LOG virou parceira da nossa operação.' },
];

function Logo() {
  return (
    <a href="#inicio" className="logo" aria-label="DFA LOG início">
      <span className="logo-mark"><i /><i /><i /></span>
      <span>
        <strong>DFA<span>LOG</span></strong>
        <small>ASSESSORIA DE TRANSPORTES</small>
      </span>
    </a>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroBgFarRef = useRef<HTMLDivElement>(null);
  const aboutImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (heroBgRef.current) heroBgRef.current.style.transform = `translate3d(0, ${y * 0.32}px, 0) scale(1.05)`;
      if (heroBgFarRef.current) heroBgFarRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0) scale(1.08)`;
      if (aboutImgRef.current) {
        const r = aboutImgRef.current.getBoundingClientRect();
        const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -0.06;
        aboutImgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.1)`;
      }
      const sections = ['inicio', 'sobre', 'servicos', 'diferenciais', 'faq', 'contato'];
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent('Solicitação de atendimento - DFA LOG');
    const body = encodeURIComponent(
      `Olá! Gostaria de solicitar um atendimento.\n\nNome: ${formData.name}\nTelefone/WhatsApp: ${formData.phone}\nE-mail: ${formData.email}\nServiço desejado: ${formData.service}\nMensagem: ${formData.message}`
    );
    window.location.href = `mailto:comercial@dfalog.com.br?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const navItems = [
    ['inicio', 'Início'],
    ['sobre', 'Sobre nós'],
    ['servicos', 'Serviços'],
    ['diferenciais', 'Diferenciais'],
    ['faq', 'Dúvidas'],
    ['contato', 'Contato'],
  ];

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <CustomCursor />
      <ReadingProgress />

      <div className="site-shell">
        <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
          <div className="container header-inner">
            <Logo />
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
            <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
              {navItems.map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={closeMenu} className={activeSection === id ? 'active' : ''}>{label}</a>
              ))}
              <Magnetic strength={0.25}>
                <a className="header-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <span className="shine" /><MessageCircle size={17} /> Falar pelo WhatsApp
                </a>
              </Magnetic>
            </nav>
          </div>
        </header>

        <main>
          <section className="hero" id="inicio">
            <div className="hero-bg" ref={heroBgRef} />
            <div className="hero-bg-far" ref={heroBgFarRef} />
            <div className="hero-grid" />
            <div className="route-particles" aria-hidden="true">
              <span /><span /><span /><span /><span /><span />
            </div>
            <div className="container hero-content">
              <p className="eyebrow light hero-anim d1"><span /> DFA LOG | Assessoria de Transportes</p>
              <h1 className="hero-anim d2">
                Regularize sua<br /><em>documentação ANTT</em><br />com <RotatingWord words={['segurança.', 'agilidade.', 'tranquilidade.']} />{' '}
              </h1>
              <p className="hero-copy hero-anim d3">Assessoria especializada para transportadores autônomos e empresas de transporte.</p>
              <div className="hero-actions hero-anim d4">
                <Magnetic strength={0.3}>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-orange">
                    <span className="shine" />Falar com um especialista <ArrowRight size={17} className="btn-icon" />
                  </a>
                </Magnetic>
                <a href="#servicos" className="button button-ghost">Conheça nossos serviços <ChevronDown size={17} className="btn-icon" /></a>
              </div>
              <div className="hero-note hero-anim d5"><ShieldCheck size={17} /> Atendimento próximo, claro e sem burocracia</div>
            </div>
            <div className="hero-stats container">
              {highlights.map(({ icon: Icon, label, text }, i) => (
                <Reveal key={label} direction="up" delay={i * 120} className="highlight-card">
                  <div className="icon-box"><DrawIcon Icon={Icon} size={21} /></div>
                  <div><h3>{label}</h3><p>{text}</p></div>
                </Reveal>
              ))}
            </div>
          </section>

          <div className="route-band"><RouteLine /></div>

          <section className="section about-section" id="sobre">
            <div className="container about-grid">
              <Reveal direction="left" className="about-image-wrap">
                <MaskReveal direction="left">
                  <div className="about-img-parallax" ref={aboutImgRef} />
                </MaskReveal>
                <div className="image-caption">
                  <span className="caption-icon"><ShieldCheck size={22} /></span>
                  <strong>Tranquilidade em cada etapa</strong>
                  <small>Assessoria que acompanha você.</small>
                </div>
              </Reveal>
              <div className="about-copy">
                <Reveal direction="right"><p className="eyebrow"><span /> Quem somos</p></Reveal>
                <Reveal direction="right" delay={80}><h2>Assessoria especializada para o <em>transporte.</em></h2></Reveal>
                <Reveal direction="right" delay={160}><p>A DFA LOG auxilia transportadores e empresas na regularização de documentação e processos relacionados à ANTT, buscando agilidade, organização e segurança em cada atendimento.</p></Reveal>
                <Reveal direction="right" delay={220}><p>Nosso trabalho é simplificar a burocracia para que você possa focar no que realmente importa: manter sua operação em movimento.</p></Reveal>
                <Reveal direction="up" delay={280} className="check-grid">
                  {['Atendimento personalizado', 'Agilidade', 'Experiência', 'Segurança'].map(item => (
                    <span key={item} className="check-item"><Check size={15} className="check-mark" /> {item}</span>
                  ))}
                </Reveal>
                <Reveal direction="right" delay={340}>
                  <a href="#contato" className="text-link">Conheça a DFA LOG <ArrowRight size={16} /></a>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="section services-section" id="servicos">
            <div className="container">
              <div className="section-heading">
                <Reveal direction="left">
                  <p className="eyebrow"><span /> Como podemos ajudar</p>
                  <h2>Soluções para manter<br />sua operação <em>regular.</em></h2>
                </Reveal>
                <Reveal direction="right" delay={120}>
                  <p>Da inscrição à atualização dos seus dados, cuidamos da documentação para você trabalhar com mais tranquilidade.</p>
                </Reveal>
              </div>
              <div className="services-grid">
                {services.map(({ icon: Icon, title, text, image }, i) => (
                  <Reveal key={title} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 110} className="service-card-wrap">
                    <TiltCard max={6} className="service-tilt">
                      <article className="service-card">
                        <div className="service-img" style={{ backgroundImage: `url(${image})` }} />
                        <div className="service-overlay" />
                        <div className="service-accent" />
                        <div className="service-glow" />
                        <div className="service-content">
                          <div className="service-icon"><DrawIcon Icon={Icon} size={21} /></div>
                          <h3>{title}</h3>
                          <p>{text}</p>
                          <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`Saiba mais sobre ${title}`}>
                            <ArrowRight size={18} />
                          </a>
                        </div>
                      </article>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>

              <Reveal direction="up" delay={200} className="docs-block">
                <div className="docs-block-copy">
                  <p className="eyebrow"><span /> Documentação</p>
                  <h3>Seus documentos, organizados<br />e analisados com precisão.</h3>
                  <p>Recebemos, conferimos e organizamos cada documento do seu processo, garantindo que nada esteja pendente.</p>
                </div>
                <DocScanner />
              </Reveal>
            </div>
          </section>

          <section className="differentials" id="diferenciais">
            <div className="container differential-grid">
              <div>
                <Reveal direction="right"><p className="eyebrow light"><span /> Por que escolher a DFA LOG?</p></Reveal>
                <Reveal direction="right" delay={80}><h2>Mais que regularização.<br /><em>Parceiros do seu caminho.</em></h2></Reveal>
                <Reveal direction="right" delay={160}><p className="differential-intro">Você não precisa enfrentar a burocracia sozinho. Conte com quem entende do seu negócio e acompanha cada detalhe.</p></Reveal>
                <Reveal direction="right" delay={240}>
                  <Magnetic strength={0.3}>
                    <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-orange">
                      <span className="shine" />Fale com a nossa equipe <ArrowRight size={17} className="btn-icon" />
                    </a>
                  </Magnetic>
                </Reveal>
              </div>
              <div className="reasons-grid">
                {reasons.map(({ icon: Icon, title, text }, i) => (
                  <Reveal key={title} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 100} className="reason-wrap">
                    <div className="reason">
                      <span className="reason-number">0{i + 1}</span>
                      <DrawIcon Icon={Icon} size={23} className="reason-icon" />
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <div className="route-band alt"><RouteLine /></div>

          <section className="section process-section">
            <div className="container">
              <div className="center-heading">
                <Reveal direction="up"><p className="eyebrow"><span /> Simples assim</p></Reveal>
                <Reveal direction="up" delay={80}><h2>Como <em>funciona</em></h2></Reveal>
                <Reveal direction="up" delay={160}><p>Um processo claro, acompanhado do início ao fim.</p></Reveal>
              </div>
              <Timeline />
            </div>
          </section>

          <section className="section commitments-section">
            <div className="container">
              <div className="center-heading">
                <Reveal direction="up"><p className="eyebrow"><span /> Nossos compromissos</p></Reveal>
                <Reveal direction="up" delay={80}><h2>O que você pode <em>esperar.</em></h2></Reveal>
                <Reveal direction="up" delay={160}><p>Princípios que guiam cada atendimento da DFA LOG.</p></Reveal>
              </div>
              <div className="commitments-grid">
                {commitments.map(({ icon: Icon, title, text }, i) => (
                  <Reveal key={title} direction="up" delay={i * 120} className="commitment-wrap">
                    <div className="commitment">
                      <div className="commitment-icon"><DrawIcon Icon={Icon} size={24} /></div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="whatsapp-banner">
            <div className="container banner-inner">
              <Reveal direction="left">
                <p className="eyebrow light"><span /> Vamos conversar</p>
                <h2>Precisa regularizar<br /><em>sua documentação?</em></h2>
                <p>Fale com a DFA LOG e descubra como podemos ajudar.</p>
              </Reveal>
              <Reveal direction="right" delay={120}>
                <Magnetic strength={0.25}>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-white">
                    <span className="shine" /><MessageCircle size={19} /> Chamar no WhatsApp <ArrowRight size={17} className="btn-icon" />
                  </a>
                </Magnetic>
              </Reveal>
            </div>
          </section>

          <section className="section testimonials-section">
            <div className="container">
              <div className="center-heading">
                <Reveal direction="up"><p className="eyebrow"><span /> Quem confia</p></Reveal>
                <Reveal direction="up" delay={80}><h2>O que dizem nossos<br /><em>clientes.</em></h2></Reveal>
              </div>
              <Reveal direction="up" delay={120}>
                <Testimonials items={testimonials} />
              </Reveal>
            </div>
          </section>

          <section className="section faq-section" id="faq">
            <div className="container faq-container">
              <Reveal direction="left">
                <p className="eyebrow"><span /> Dúvidas frequentes</p>
                <h2>Perguntas<br />frequentes.</h2>
                <p className="faq-intro">Ainda tem dúvidas? Fale com a gente pelo WhatsApp.</p>
                <Magnetic strength={0.25}>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-orange">
                    <span className="shine" />Tirar dúvidas no WhatsApp <ArrowRight size={17} className="btn-icon" />
                  </a>
                </Magnetic>
              </Reveal>
              <Reveal direction="right" delay={120}>
                <FAQ items={faqItems} />
              </Reveal>
            </div>
          </section>

          <section className="section contact-section" id="contato">
            <div className="container contact-grid">
              <div className="contact-info">
                <Reveal direction="left"><p className="eyebrow"><span /> Entre em contato</p></Reveal>
                <Reveal direction="left" delay={80}><h2>Seu próximo passo<br />começa <em>aqui.</em></h2></Reveal>
                <Reveal direction="left" delay={160}><p>Preencha o formulário ou fale diretamente com a nossa equipe. Será um prazer ajudar.</p></Reveal>
                <Reveal direction="up" delay={220} className="contact-list">
                  <a href="tel:+559284120696"><span><Phone size={18} /></span><div><small>WhatsApp / Telefone</small><strong>(92) 8412-0696</strong></div></a>
                  <a href="mailto:comercial@dfalog.com.br"><span><Mail size={18} /></span><div><small>E-mail</small><strong>comercial@dfalog.com.br</strong></div></a>
                  <div><span><MapPin size={18} /></span><div><small>Onde estamos</small><strong>Travessa Isis, 29 – Tarumã-Açu</strong></div></div>
                </Reveal>
              </div>
              <Reveal direction="right" delay={120}>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-heading"><h3>Solicite um atendimento</h3><p>Retornaremos o mais breve possível.</p></div>
                  {sent ? (
                    <div className="success-message"><BadgeCheck size={32} /><h3>Mensagem recebida.</h3><p>Obrigado pelo contato. Nossa equipe falará com você em breve.</p><button type="button" onClick={() => setSent(false)} className="text-link">Enviar outra mensagem</button></div>
                  ) : (
                    <>
                      <div className="form-row">
                        <FormField label="Nome" icon="user"><input required placeholder="Como podemos chamar você?" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></FormField>
                        <FormField label="Telefone / WhatsApp" icon="phone"><input required placeholder="(00) 00000-0000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></FormField>
                      </div>
                      <div className="form-row">
                        <FormField label="E-mail" icon="mail"><input required type="email" placeholder="seu@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></FormField>
                        <FormField label="Serviço desejado" icon="file">
                          <select defaultValue="" value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                            <option value="" disabled>Selecione um serviço</option>
                            {services.map(s => <option key={s.title}>{s.title}</option>)}
                          </select>
                        </FormField>
                      </div>
                      <FormField label="Mensagem" icon="msg"><textarea required rows={4} placeholder="Conte brevemente o que você precisa..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} /></FormField>
                      <Magnetic strength={0.15}>
                        <button className="button button-dark" type="submit"><span className="shine" />Solicitar atendimento <ArrowRight size={17} className="btn-icon" /></button>
                      </Magnetic>
                    </>
                  )}
                </form>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container footer-top">
            <Reveal direction="up">
              <Logo />
              <p className="footer-description">Assessoria para transportadores que transforma burocracia em tranquilidade.</p>
              <div className="socials">
                <a href="#contato" aria-label="Instagram"><Instagram size={17} /></a>
                <a href="#contato" aria-label="LinkedIn"><Linkedin size={17} /></a>
                <a href={whatsappUrl} aria-label="WhatsApp"><MessageCircle size={17} /></a>
              </div>
            </Reveal>
            <Reveal direction="up" delay={100} className="footer-column">
              <h4>Navegue</h4>
              <a href="#inicio">Início</a><a href="#sobre">Sobre nós</a><a href="#servicos">Serviços</a><a href="#contato">Contato</a>
            </Reveal>
            <Reveal direction="up" delay={200} className="footer-column footer-contact">
              <h4>Fale conosco</h4>
              <a href="tel:+559284120696">(92) 8412-0696</a>
              <a href="mailto:comercial@dfalog.com.br">comercial@dfalog.com.br</a>
              <span>Travessa Isis, 29 – Tarumã-Açu</span>
            </Reveal>
          </div>
          <div className="container footer-bottom">
            <span>© 2026 DFA LOG – Todos os direitos reservados.</span>
            <span>Feito para manter seu negócio em movimento.</span>
          </div>
        </footer>
      </div>

      <FloatingWhatsApp />
      <WhatsAppToast />
      <BackToTop />
    </>
  );
}

function Timeline() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  return (
    <div className="steps" ref={ref}>
      {steps.map(([number, title, text], i) => (
        <div className={`step ${inView ? 'active' : ''}`} key={number} style={{ transitionDelay: `${i * 220}ms` }}>
          <div className="step-top">
            <span>{number}</span>
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
          <span className={`step-check ${inView ? 'on' : ''}`} style={{ transitionDelay: `${i * 220 + 500}ms` }}>
            <Check size={12} />
          </span>
        </div>
      ))}
    </div>
  );
}



function FormField({ label, icon, children }: { label: string; icon: 'user' | 'phone' | 'mail' | 'file' | 'msg'; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className="field-control">
        <span className="field-icon">
          {icon === 'user' && <UserRoundCheck size={14} />}
          {icon === 'phone' && <Phone size={14} />}
          {icon === 'mail' && <Mail size={14} />}
          {icon === 'file' && <FileText size={14} />}
          {icon === 'msg' && <MessageCircle size={14} />}
        </span>
        {children}
      </span>
    </label>
  );
}

export default App;
