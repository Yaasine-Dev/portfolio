import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Calendar, ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from './SocialIcons';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'HelpDesk – Customer Support Tool',
    desc: 'A Symfony-based modular customer support platform with ticket management, user roles, extensible APIs and robust security. Structured for seamless integration into future applications.',
    tech: ['Symfony', 'PHP', 'Twig', 'MySQL', 'Doctrine ORM', 'REST API'],
    year: '2025',
    type: 'Full Stack',
    num: '01',
    screenshot: project1,
    color: 'rgba(40,114,159,0.12)',
    accentColor: '#28729F',
    github: 'https://github.com/Yaasine-Dev/HelpDesk-symfony',
    demo: '#',
  },
  {
    title: 'Brain Tumor Detection',
    desc: 'A desktop AI application for brain tumor detection from MRI scans using TensorFlow/Keras deep learning models. Features a PyQt5 GUI and integrates Groq API for AI-powered medical insights and analysis.',
    tech: ['Python', 'TensorFlow', 'Keras', 'PyQt5', 'Groq API'],
    year: '2025',
    type: 'AI / ML',
    num: '02',
    screenshot: project2,
    color: 'rgba(26,84,120,0.12)',
    accentColor: '#1a5478',
    github: 'https://github.com/Yaasine-Dev/intelligent-tumor-detection',
    demo: '#',
  },
  {
    title: 'IdeaLab',
    desc: 'A collaborative innovation platform where users can submit, explore and vote on ideas. Fosters creativity and project collaboration with a modern full-stack architecture.',
    tech: ['Django', 'Python', 'React.js', 'MySQL', 'REST API'],
    year: '2025',
    type: 'Full Stack',
    num: '03',
    screenshot: project3,
    color: 'rgba(40,114,159,0.08)',
    accentColor: '#3a8bbf',
    github: 'https://github.com/Yaasine-Dev/ideaLab',
    demo: '#',
  },
  {
    title: 'GestionStock',
    desc: 'A stock and inventory management system to track products, manage stock levels, handle suppliers and generate reports. Built with a clean MVC architecture.',
    tech: ['React.js', 'Python', 'MySQL', 'REST API'],
    year: '2024',
    type: 'Full Stack',
    num: '04',
    screenshot: project4,
    color: 'rgba(26,84,120,0.1)',
    accentColor: '#1a5478',
    github: 'https://github.com/Yaasine-Dev/gestionStock',
    demo: '#',
  },
];

function ProjectCard({ p, i }) {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotateY: x * 6, rotateX: -y * 4, duration: 0.4, ease: 'power2.out', transformPerspective: 1000 });
  };
  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
  };

  return (
    <div ref={cardRef} className={`proj-card proj-card-${i}`}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.3s, box-shadow 0.3s', transformStyle: 'preserve-3d', willChange: 'transform', cursor: 'default' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.boxShadow = '0 32px 80px rgba(0,0,0,0.35)'; }}
      onMouseLeave={e => { onMouseLeave(); e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>

      {/* Screenshot area */}
      <div style={{ position: 'relative', height: 260, background: p.color, overflow: 'hidden', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />

        {p.screenshot ? (
          <img src={p.screenshot} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
        ) : (
          /* Placeholder with project number */
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '6rem', color: p.accentColor, opacity: 0.15, lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none' }}>{p.num}</div>

          </div>
        )}

        {/* Type badge */}
        <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(40,114,159,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(40,114,159,0.35)', borderRadius: 100, padding: '4px 14px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--sky)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.type}</div>
        <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: '0.75rem' }}><Calendar size={11} />{p.year}</div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px 30px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{p.title}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.75, flex: 1 }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {p.tech.map(t => (
            <span key={t} style={{ background: 'rgba(40,114,159,0.1)', color: 'var(--ocean)', fontSize: '0.73rem', fontWeight: 700, padding: '3px 11px', borderRadius: 100, border: '1px solid rgba(40,114,159,0.2)' }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, paddingTop: 14, borderTop: '1px solid var(--border)', marginTop: 4 }}>
          <a href={p.github} target="_blank" rel="noreferrer"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, padding: '9px 0', borderRadius: 10, border: '1px solid var(--border)', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--ocean)'; e.currentTarget.style.background = 'rgba(40,114,159,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; }}>
            <GitHubIcon size={14} /> Code
          </a>
          <a href={p.demo}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, padding: '9px 0', borderRadius: 10, border: '1px solid var(--border)', opacity: 0.6, cursor: 'default' }}>
            <ArrowUpRight size={14} /> Live Demo
            <span style={{ fontSize: '0.65rem', fontWeight: 800, background: 'rgba(40,114,159,0.15)', color: 'var(--ocean)', padding: '2px 8px', borderRadius: 50, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(40,114,159,0.25)' }}>Soon</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proj-header', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.proj-header', start: 'top 85%' } });
      projects.forEach((_, i) => {
        gsap.from(`.proj-card-${i}`, { y: 70, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: `.proj-card-${i}`, start: 'top 88%' }, delay: i * 0.05 });
      });
      gsap.from('.proj-cta', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.proj-cta', start: 'top 92%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="proj-header" style={{ marginBottom: 72 }}>
          <span className="section-label">What I've Built</span>
          <h2 className="section-heading">Projects</h2>
          <div className="section-divider" />

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>

        <div className="proj-cta" style={{ textAlign: 'center', marginTop: 56 }}>
          <a href="https://github.com/Yaasine-Dev" target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'transparent', color: 'var(--text-primary)', padding: '13px 34px', borderRadius: 100, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', border: '1px solid var(--border)', transition: 'all 0.3s', letterSpacing: '0.03em' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ocean)'; e.currentTarget.style.background = 'rgba(40,114,159,0.08)'; e.currentTarget.style.boxShadow = '0 0 30px var(--glow)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
            <GitHubIcon size={16} /> View All on GitHub
          </a>
        </div>
      </div>
      <style>{`@media(max-width:768px){#projects .container>div:nth-child(2){grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
