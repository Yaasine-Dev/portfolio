import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certs = [
  { title: 'Introduction to Cybersecurity', issuer: 'CISCO', abbr: 'CS' },
  { title: 'Python Essentials', issuer: 'CISCO', abbr: 'PY' },
  { title: 'Introduction to Modern AI', issuer: 'CISCO', abbr: 'AI' },
  { title: 'English for IT 1', issuer: 'CISCO', abbr: 'EN' },
  { title: 'Introduction to C++ (OOP)', issuer: 'EPFL', abbr: 'C+' },
  { title: 'JavaScript, jQuery & JSON', issuer: 'University of Michigan', abbr: 'JS' },
];

export default function Certificates() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-header', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.cert-header', start: 'top 85%' } });
      gsap.from('.cert-card', { y: 50, opacity: 0, scale: 0.94, duration: 0.65, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.cert-grid', start: 'top 82%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certificates" ref={sectionRef} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="cert-header" style={{ marginBottom: 72 }}>
          <span className="section-label">Achievements</span>
          <h2 className="section-heading">Certificates</h2>
          <div className="section-divider" />
        </div>

        <div className="cert-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {certs.map((c, i) => (
            <div key={c.title} className="cert-card glass-card"
              style={{ padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 18, cursor: 'default', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>

              <div style={{ position: 'absolute', top: -8, right: 14, fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '5rem', color: 'rgba(40,114,159,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{String(i + 1).padStart(2, '0')}</div>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(40,114,159,0.12)', border: '1px solid rgba(40,114,159,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={20} color="var(--ocean)" />
                </div>
                <span style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.1rem', color: 'rgba(40,114,159,0.35)', letterSpacing: '-0.02em' }}>{c.abbr}</span>
              </div>

              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: 8 }}>{c.title}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ocean)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.issuer}</div>
              </div>

              <div style={{ height: 2, background: 'linear-gradient(90deg, var(--ocean), transparent)', borderRadius: 2 }} />
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.cert-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:600px){.cert-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
