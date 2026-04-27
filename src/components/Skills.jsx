import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techSkills = [
  { name: 'JavaScript', level: 88 },
  { name: 'React.js', level: 85 },
  { name: 'PHP / Laravel', level: 82 },
  { name: 'Python', level: 75 },
  { name: 'C++', level: 70 },
  { name: 'MySQL / PostgreSQL', level: 78 },
  { name: 'MongoDB', level: 65 },
  { name: 'Git & GitHub', level: 85 },
];

const categories = [
  { title: 'Languages', items: ['JavaScript', 'Python', 'PHP', 'C++', 'Java'] },
  { title: 'Frameworks', items: ['React.js', 'Laravel', 'Symfony', 'Angular', '.NET'] },
  { title: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Linux'] },
  { title: 'Concepts', items: ['OOP', 'MVC', 'Design Patterns', 'Agile', 'UML'] },
  { title: 'Cloud & Systems', items: ['Unix/Linux', 'Virtualization', 'TCP/IP', 'DevOps'] },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sk-header', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.sk-header', start: 'top 85%' } });
      gsap.from('.sk-bar-wrap', { y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.sk-bars', start: 'top 80%' } });
      gsap.from('.sk-cat-card', { y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.sk-cats', start: 'top 80%' } });
      gsap.from('.sk-lang', { scale: 0.85, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.sk-langs', start: 'top 88%' } });
      document.querySelectorAll('.sk-bar-fill').forEach(bar => {
        gsap.fromTo(bar, { width: '0%' }, { width: `${bar.dataset.level}%`, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: bar, start: 'top 88%' } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="sk-header" style={{ marginBottom: 72 }}>
          <span className="section-label">What I Know</span>
          <h2 className="section-heading">Skills & Expertise</h2>
          <div className="section-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          {/* Progress bars */}
          <div className="sk-bars">
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ocean)', marginBottom: 28 }}>Proficiency</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {techSkills.map(s => (
                <div key={s.name} className="sk-bar-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{s.name}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--ocean)' }}>{s.level}%</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                    <div className="sk-bar-fill" data-level={s.level} style={{ height: '100%', background: 'linear-gradient(90deg, var(--ocean), #3a8bbf)', borderRadius: 10, width: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category cards */}
          <div className="sk-cats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {categories.map(cat => (
              <div key={cat.title} className="sk-cat-card glass-card" style={{ padding: '20px 18px', cursor: 'default' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--ocean)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{cat.title}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {cat.items.map(item => (
                    <span key={item} style={{ background: 'rgba(40,114,159,0.1)', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(40,114,159,0.2)' }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spoken languages */}
        <div className="sk-langs" style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginRight: 8 }}>Spoken Languages</span>
          {[{ lang: 'Arabic', level: 'Native' }, { lang: 'French', level: 'Fluent' }, { lang: 'English', level: 'Fluent' }].map(l => (
            <div key={l.lang} className="sk-lang" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 100, padding: '8px 20px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{l.lang}</span>
              <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ocean)' }}>{l.level}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){#skills .container>div:nth-child(2){grid-template-columns:1fr!important}.sk-cats{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}
