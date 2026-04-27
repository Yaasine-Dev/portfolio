import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-header', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.ct-header', start: 'top 85%' } });
      gsap.from('.ct-info-item', { x: -40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.ct-info', start: 'top 82%' } });
      gsap.from('.ct-form', { x: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.ct-form', start: 'top 82%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const inputBase = {
    width: '100%', padding: '13px 16px', borderRadius: 10,
    border: '1px solid var(--border)', background: 'var(--bg-card)',
    fontSize: '0.88rem', color: 'var(--text-primary)', fontFamily: 'Inter',
    outline: 'none', transition: 'border-color 0.25s, box-shadow 0.25s', boxSizing: 'border-box',
  };

  const contacts = [
    { icon: <Mail size={18} />, label: 'Email', value: 'elkortihyassine@gmail.com', href: 'mailto:elkortihyassine@gmail.com' },
    { icon: <Phone size={18} />, label: 'Phone', value: '+212-623155756', href: 'tel:+212623155756' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'Casablanca, Morocco', href: null },
    { icon: <GitHubIcon size={18} />, label: 'GitHub', value: 'Yaasine-Dev', href: 'https://github.com/Yaasine-Dev' },
    { icon: <LinkedInIcon size={18} />, label: 'LinkedIn', value: 'Elkortih Yassine', href: 'https://www.linkedin.com/in/elkortih-yassine-dev/' },
  ];

  return (
    <section id="contact" ref={sectionRef} style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(40,114,159,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="ct-header" style={{ marginBottom: 72, textAlign: 'center' }}>
          <span className="section-label" style={{ display: 'flex', justifyContent: 'center' }}>Let's Talk</span>
          <h2 className="section-heading" style={{ textAlign: 'center' }}>Get In Touch</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 16, fontSize: '0.95rem', maxWidth: 480, margin: '16px auto 0', lineHeight: 1.75 }}>
            Open to new opportunities, collaborations, and interesting projects. Let's build something great together.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64, alignItems: 'start' }}>
          <div className="ct-info" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 10 }}>Contact Information</div>
            {contacts.map(c => (
              <a key={c.label} className="ct-info-item" href={c.href || '#'} target={c.href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', textDecoration: 'none', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ocean)'; e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(40,114,159,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ocean)', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.label}</div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <form className="ct-form glass-card" onSubmit={handleSubmit} style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[{ key: 'name', label: 'Name', placeholder: 'Your name', type: 'text' }, { key: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' }].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} required placeholder={f.placeholder} style={inputBase}
                    onFocus={e => { e.target.style.borderColor = 'var(--ocean)'; e.target.style.boxShadow = '0 0 0 3px var(--glow)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required placeholder="Tell me about your project or opportunity..." rows={5}
                style={{ ...inputBase, resize: 'vertical', minHeight: 130 }}
                onFocus={e => { e.target.style.borderColor = 'var(--ocean)'; e.target.style.boxShadow = '0 0 0 3px var(--glow)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
            </div>
            <button type="submit"
              style={{ background: sent ? 'rgba(74,222,128,0.12)' : 'var(--ocean)', color: sent ? '#4ade80' : 'var(--sky)', border: sent ? '1px solid rgba(74,222,128,0.3)' : '1px solid transparent', padding: '14px 32px', borderRadius: 100, fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s', letterSpacing: '0.04em', boxShadow: sent ? 'none' : '0 0 30px var(--glow)' }}
              onMouseEnter={e => { if (!sent) { e.currentTarget.style.background = 'var(--ocean-dark)'; e.currentTarget.style.boxShadow = '0 0 50px var(--glow)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
              onMouseLeave={e => { if (!sent) { e.currentTarget.style.background = 'var(--ocean)'; e.currentTarget.style.boxShadow = '0 0 30px var(--glow)'; e.currentTarget.style.transform = 'none'; } }}>
              {sent ? <><CheckCircle size={17} /> Message Sent!</> : <><Send size={17} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
      <style>{`@media(max-width:768px){#contact .container>div:last-child{grid-template-columns:1fr!important}.ct-form{padding:24px!important}}`}</style>
    </section>
  );
}
