import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowDown, Download } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';
import heroPhoto from '../assets/hero..jpg';

gsap.registerPlugin(ScrollTrigger);

const roles = ['Future Software Engineer', 'Future AI Engineer', 'Full Stack Developer', 'React & Laravel Dev', 'Video Editor', 'Problem Solver'];

export default function Hero() {
  const sectionRef = useRef(null);
  const roleRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  let roleIndex = 0, charIndex = 0, deleting = false, timer = null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 });
      tl.from('.h-label', { y: 28, opacity: 0, duration: 0.7 })
        .from(firstRef.current, { y: 90, opacity: 0, duration: 1.1, skewY: 3 }, '-=0.35')
        .from(lastRef.current, { y: 90, opacity: 0, duration: 1.1, skewY: 3 }, '-=0.85')
        .from('.h-role', { y: 22, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.h-contact-item', { y: 18, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
        .from('.h-btn', { y: 22, opacity: 0, duration: 0.5, stagger: 0.12 }, '-=0.35')
        .from('.h-social', { scale: 0, opacity: 0, duration: 0.45, stagger: 0.1, ease: 'back.out(2)' }, '-=0.3')
        .from('.h-avatar-wrap', { x: 70, opacity: 0, duration: 1.1, ease: 'power3.out' }, '-=1.4')
        .from('.h-scroll-btn', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2');

      // Parallax
      gsap.to('.h-parallax', {
        y: -100, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
      // Photo tilt on scroll
      gsap.to('.h-photo-img', {
        rotateY: 8, scale: 0.95, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });
    }, sectionRef);

    // Typewriter
    const type = () => {
      if (!roleRef.current) return;
      const cur = roles[roleIndex];
      if (!deleting) {
        roleRef.current.textContent = cur.slice(0, ++charIndex);
        if (charIndex === cur.length) { deleting = true; timer = setTimeout(type, 2200); return; }
      } else {
        roleRef.current.textContent = cur.slice(0, --charIndex);
        if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
      }
      timer = setTimeout(type, deleting ? 42 : 82);
    };
    timer = setTimeout(type, 1800);

    return () => { ctx.revert(); clearTimeout(timer); };
  }, []);

  return (
    <section ref={sectionRef} id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 100, background: 'var(--bg-primary)' }}>

      {/* Ambient glows */}
      <div className="h-parallax" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-15%', right: '-8%', width: 750, height: 750, borderRadius: '50%', background: 'radial-gradient(circle, rgba(40,114,159,0.14) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 550, height: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(40,114,159,0.09) 0%, transparent 65%)' }} />
      </div>

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '44px 44px', pointerEvents: 'none', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 80, alignItems: 'center' }}>

          {/* LEFT */}
          <div>
            <div className="h-label tag" style={{ marginBottom: 38 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ocean)', display: 'inline-block', animation: 'blink 2s infinite' }} />
              Available for opportunities
            </div>

            <div style={{ overflow: 'hidden', marginBottom: 2 }}>
              <div ref={firstRef} style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(3rem, 7.5vw, 6.8rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
                ELKORTIH
              </div>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 34 }}>
              <div ref={lastRef} style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(3rem, 7.5vw, 6.8rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--ocean)', WebkitTextStroke: '1px rgba(40,114,159,0.25)' }}>
                YASSINE
              </div>
            </div>

            <div className="h-role" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 42, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 30, height: 2, background: 'var(--ocean)', display: 'inline-block', flexShrink: 0, borderRadius: 2 }} />
              <span ref={roleRef} style={{ borderRight: '2px solid var(--ocean)', paddingRight: 3, minHeight: '1.4em', display: 'inline-block' }} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, marginBottom: 46 }}>
              {[
                { icon: <Mail size={13} />, text: 'elkortihyassine@gmail.com', href: 'mailto:elkortihyassine@gmail.com' },
                { icon: <Phone size={13} />, text: '+212-623155756', href: 'tel:+212623155756' },
                { icon: <MapPin size={13} />, text: 'Casablanca, Morocco' },
              ].map((c, i) => (
                <a key={i} className="h-contact-item" href={c.href || '#'}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500, transition: 'color 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  <span style={{ color: 'var(--ocean)' }}>{c.icon}</span>{c.text}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Row 1: main action buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <a className="h-btn" href="mailto:elkortihyassine@gmail.com"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--ocean)', color: 'var(--sky)', padding: '13px 28px', borderRadius: 100, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', letterSpacing: '0.03em', boxShadow: '0 0 40px var(--glow)', transition: 'all 0.3s', border: '1px solid transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--ocean-dark)'; e.currentTarget.style.boxShadow = '0 0 60px var(--glow)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--ocean)'; e.currentTarget.style.boxShadow = '0 0 40px var(--glow)'; e.currentTarget.style.transform = 'none'; }}>
                  <Mail size={15} /> Get In Touch
                </a>
                <button className="h-btn"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--text-primary)', padding: '12px 28px', borderRadius: 100, fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', letterSpacing: '0.03em', border: '1px solid var(--border)', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ocean)'; e.currentTarget.style.background = 'rgba(40,114,159,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}>
                  View Projects
                </button>
              </div>
              {/* Row 2: Download CV + socials */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <a className="h-btn" href="/cv.pdf" download="Elkortih_Yassine_CV.pdf"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--ocean)', padding: '12px 28px', borderRadius: 100, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', letterSpacing: '0.03em', border: '2px solid var(--ocean)', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--ocean)'; e.currentTarget.style.color = 'var(--sky)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 30px var(--glow)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ocean)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <Download size={15} /> Download Resume
                </a>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    { icon: <GitHubIcon size={17} />, href: 'https://github.com/Yaasine-Dev' },
                    { icon: <LinkedInIcon size={17} />, href: 'https://www.linkedin.com/in/elkortih-yassine-dev/' },
                  ].map((s, i) => (
                    <a key={i} className="h-social" href={s.href} target="_blank" rel="noreferrer"
                      style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ocean)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(40,114,159,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div className="h-avatar-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
            <div style={{ position: 'relative', perspective: '800px' }}>
              {/* Spinning rings */}
              <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: '1px solid rgba(40,114,159,0.2)', animation: 'spin 22s linear infinite', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: -36, borderRadius: '50%', border: '1px dashed rgba(40,114,159,0.1)', animation: 'spin 38s linear infinite reverse', pointerEvents: 'none' }} />

              {/* Photo */}
              <div className="h-photo-img" style={{ width: 260, height: 260, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(40,114,159,0.4)', boxShadow: '0 0 80px rgba(40,114,159,0.3), 0 0 0 1px rgba(203,221,233,0.08)', position: 'relative', zIndex: 1, transformStyle: 'preserve-3d' }}>
                <img src={heroPhoto} alt="Elkortih Yassine" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                {/* Overlay shimmer */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(40,114,159,0.15) 0%, transparent 50%, rgba(40,114,159,0.08) 100%)', borderRadius: '50%' }} />
              </div>

              {/* Status badge */}
              <div style={{ position: 'absolute', bottom: 12, right: -18, background: 'var(--bg-primary)', border: '1px solid rgba(40,114,159,0.4)', borderRadius: 12, padding: '8px 14px', zIndex: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--ocean)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'blink 2s infinite' }} />
                  Open to Work
                </div>
              </div>
            </div>

            {/* Stats card */}
            <div className="glass-card" style={{ padding: '18px 24px', width: '100%', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 4 }}>Engineering Student</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ocean)', fontWeight: 600 }}>Casablanca, Morocco</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                {[['3+', 'Projects'], ['1', 'Internship'], ['6', 'Certs']].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.35rem', color: 'var(--ocean)' }}>{n}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="h-scroll-btn"
        onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
        style={{ position: 'absolute', bottom: 38, left: '50%', transform: 'translateX(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, color: 'var(--text-muted)', animation: 'bounce 2.5s infinite' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Scroll</span>
        <ArrowDown size={15} />
      </button>

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(9px)}}
        @media(max-width:900px){
          #about .container>div{grid-template-columns:1fr!important;gap:40px!important}
          .h-avatar-wrap{display:flex!important;order:-1}
          .h-photo-img{width:160px!important;height:160px!important}
          .h-avatar-wrap .glass-card{display:none}
        }
        @media(max-width:600px){
          .h-avatar-wrap{display:none!important}
          .h-actions>div{flex-wrap:wrap!important}
        }
      `}</style>
    </section>
  );
}
