import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, MapPin, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Chronological order — oldest at top, newest at bottom
const roadmap = [
  {
    year: '2023',
    period: 'Sep 2023',
    title: 'Full Stack Developer Training',
    org: 'ISTA OFFSHORING',
    type: 'edu',
    icon: <GraduationCap size={18} />,
    tag: 'Education',
    color: '#28729F',
    points: [
      'Web Development: HTML/CSS/JS, PHP/Laravel, React.js, SQL Optimization',
      'Software Skills: Design Patterns, Software Architecture, Agile & Project Management',
    ],
  },
  {
    year: '2025',
    period: 'Apr 2025',
    title: 'Full Stack Developer – Internship',
    org: 'ByteIt (Marchiche Global Solutions)',
    type: 'work',
    icon: <Briefcase size={18} />,
    tag: 'Internship · 2nd Year ISTA',
    color: '#CBDDE9',
    highlight: true,
    points: [
      'Assisted in development and maintenance of websites and web applications.',
      'Conducted testing and debugging to ensure smooth functionality across platforms.',
      'Developed a personal Events Management web application.',
      'Built a Laravel-based modular customer support tool with extensible APIs and robust security.',
    ],
  },
  {
    year: '2025',
    period: 'Jun 2025',
    title: 'Full Stack Developer Training — Graduated',
    org: 'ISTA OFFSHORING',
    type: 'edu',
    icon: <Star size={18} />,
    tag: 'Diploma',
    color: '#28729F',
    points: [
      'Completed 2-year Full Stack Developer program.',
      'Specialized in PHP/Laravel, React.js, databases and software architecture.',
    ],
  },
  {
    year: '2026',
    period: 'Sep 2026',
    title: 'Engineering Student – Cycle Ingénieur Commun',
    org: "EMSI – École Marocaine des Sciences de l'Ingénieur",
    type: 'edu',
    icon: <GraduationCap size={18} />,
    tag: 'Current · S5–S7',
    color: '#28729F',
    current: true,
    points: [
      'Algorithms & Data Structures, OOP, Databases, Operating Systems',
      'Software Engineering (Agile, UML, DevOps basics)',
      'Systems & Cloud, Networks & Security (TCP/IP)',
    ],
  },
];

function RoadmapCard({ item, index }) {
  const isLeft = index % 2 === 0;
  const cardClass = `rm-card rm-card-${index}`;

  return (
    <div className={cardClass} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 80px 1fr',
      gap: 0,
      alignItems: 'flex-start',
      marginBottom: 0,
      position: 'relative',
    }}>
      {/* Left side */}
      <div style={{ padding: '0 32px 48px 0', textAlign: 'right' }}>
        {isLeft ? (
          <CardContent item={item} align="right" />
        ) : (
          <YearBadge year={item.year} align="right" />
        )}
      </div>

      {/* Center node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <div className={`rm-node rm-node-${index}`} style={{
          width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
          background: item.highlight ? 'linear-gradient(135deg, var(--ocean), var(--ocean-dark))' : 'var(--bg-secondary)',
          border: `2px solid ${item.current ? '#4ade80' : 'var(--ocean)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: item.highlight ? '#CBDDE9' : 'var(--ocean)',
          boxShadow: item.highlight ? '0 0 30px var(--glow)' : item.current ? '0 0 20px rgba(74,222,128,0.3)' : 'none',
          position: 'relative', zIndex: 2,
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}>
          {item.icon}
          {item.current && (
            <span style={{
              position: 'absolute', top: -4, right: -4, width: 14, height: 14,
              borderRadius: '50%', background: '#4ade80',
              border: '2px solid var(--bg-primary)',
              animation: 'rm-pulse 2s infinite',
            }} />
          )}
        </div>
      </div>

      {/* Right side */}
      <div style={{ padding: '0 0 48px 32px', textAlign: 'left' }}>
        {!isLeft ? (
          <CardContent item={item} align="left" />
        ) : (
          <YearBadge year={item.year} align="left" />
        )}
      </div>
    </div>
  );
}

function YearBadge({ year, align }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      paddingTop: 14,
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
    }}>
      <span style={{
        fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '2rem',
        color: 'var(--border)', letterSpacing: '-0.04em', lineHeight: 1,
      }}>{year}</span>
    </div>
  );
}

function CardContent({ item, align }) {
  return (
    <div className="glass-card" style={{
      padding: '22px 24px', textAlign: align,
      transition: 'transform 0.3s, box-shadow 0.3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = align === 'right' ? 'translateX(-6px)' : 'translateX(6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Tag */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: item.highlight ? 'rgba(40,114,159,0.2)' : 'rgba(40,114,159,0.1)',
        border: `1px solid ${item.highlight ? 'rgba(40,114,159,0.5)' : 'rgba(40,114,159,0.2)'}`,
        borderRadius: 100, padding: '3px 12px', marginBottom: 10,
        fontSize: '0.68rem', fontWeight: 800, color: 'var(--ocean)',
        textTransform: 'uppercase', letterSpacing: '0.1em',
      }}>
        {item.current && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />}
        {item.tag}
      </div>

      {/* Period */}
      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.05em' }}>
        {item.period}
      </div>

      {/* Title */}
      <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 6 }}>
        {item.title}
      </div>

      {/* Org */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: align === 'right' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
        <MapPin size={11} color="var(--ocean)" />
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ocean)' }}>{item.org}</span>
      </div>

      {/* Points */}
      <ul style={{ paddingLeft: align === 'right' ? 0 : 14, paddingRight: align === 'right' ? 14 : 0, listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {item.points.map((p, i) => (
          <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: 6, justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
            {align === 'left' && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--ocean)', flexShrink: 0, marginTop: 7 }} />}
            <span>{p}</span>
            {align === 'right' && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--ocean)', flexShrink: 0, marginTop: 7 }} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.exp-header', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.exp-header', start: 'top 85%' } });

      // Animate the vertical line drawing itself
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.rm-track',
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.8,
          },
        }
      );

      // Each node pops in
      roadmap.forEach((_, i) => {
        gsap.from(`.rm-node-${i}`, {
          scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)',
          scrollTrigger: { trigger: `.rm-card-${i}`, start: 'top 82%' },
        });
        gsap.from(`.rm-card-${i} .glass-card`, {
          x: i % 2 === 0 ? -50 : 50, opacity: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: `.rm-card-${i}`, start: 'top 84%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Header */}
        <div className="exp-header" style={{ marginBottom: 80, textAlign: 'center' }}>
          <span className="section-label" style={{ display: 'flex', justifyContent: 'center' }}>My Journey</span>
          <h2 className="section-heading" style={{ textAlign: 'center' }}>Experience & Education</h2>
          <div className="section-divider" style={{ margin: '20px auto 0' }} />
          <p style={{ marginTop: 16, color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 480, margin: '16px auto 0', lineHeight: 1.7 }}>
            A roadmap of my academic path and professional experience — from first line of code to engineering school.
          </p>
        </div>

        {/* Roadmap track */}
        <div className="rm-track" style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, transform: 'translateX(-50%)', background: 'var(--border)', zIndex: 0 }} />
          <div ref={lineRef} style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, transform: 'translateX(-50%)', background: 'linear-gradient(180deg, var(--ocean), rgba(40,114,159,0.3))', zIndex: 1, transformOrigin: 'top center' }} />

          {/* Cards */}
          {roadmap.map((item, i) => (
            <RoadmapCard key={i} item={item} index={i} />
          ))}

          {/* End cap */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--ocean)', boxShadow: '0 0 20px var(--glow)', animation: 'rm-pulse 2s infinite' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rm-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(40,114,159,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(40,114,159,0); }
        }
        @media(max-width:768px){
          .rm-track { max-width:100% !important; }
          .rm-card { grid-template-columns: 0 52px 1fr !important; }
          .rm-card > div:first-child { display: none !important; }
          .rm-card > div:last-child { padding-left: 20px !important; }
        }
      `}</style>
    </section>
  );
}
