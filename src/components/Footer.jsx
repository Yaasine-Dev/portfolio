import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Heart } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';
import Logo from './Logo';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const links = ['About', 'Skills', 'Experience', 'Projects', 'Certificates', 'Contact'];
  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ft-inner', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: footerRef.current, start: 'top 92%' } });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border)', padding: '52px 0 28px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(40,114,159,0.04) 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />

      <div className="container ft-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'center', paddingBottom: 36, borderBottom: '1px solid var(--border)' }}>
          <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

          <nav style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 500, padding: '6px 12px', borderRadius: 6, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                {l}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            {[
              { icon: <GitHubIcon size={16} />, href: 'https://github.com/Yaasine-Dev' },
              { icon: <LinkedInIcon size={16} />, href: 'https://www.linkedin.com/in/elkortih-yassine-dev/' },
              { icon: <Mail size={16} />, href: 'mailto:elkortihyassine@gmail.com' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ocean)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(40,114,159,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.78rem' }}>
          <span>© 2025 Elkortih Yassine</span>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ft-inner>div:first-child{grid-template-columns:1fr!important;text-align:center}.ft-inner>div:first-child>div:last-child{justify-content:center!important}}`}</style>
    </footer>
  );
}
