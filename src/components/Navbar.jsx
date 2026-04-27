import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Download } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import Logo from './Logo';

const links = ['About', 'Skills', 'Experience', 'Projects', 'Certificates', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('About');
  const navRef = useRef(null);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    // Animate in cleanly — clearProps ensures no leftover opacity:0
    gsap.fromTo(navRef.current,
      { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15, clearProps: 'transform,opacity' }
    );

    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      [...links].reverse().forEach(l => {
        const el = document.getElementById(l.toLowerCase());
        if (el && el.getBoundingClientRect().top <= 140) setActive(l);
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const navBg = scrolled
    ? 'var(--nav-bg)'
    : dark ? 'rgba(13,34,51,0.15)' : 'rgba(232,243,249,0.15)';

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: scrolled ? 64 : 80,
        background: navBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'height 0.4s ease, background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Inner layout */}
      <div style={{
        maxWidth: 1240, margin: '0 auto', padding: '0 52px',
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

        {/* Desktop nav links */}
        <ul className="nav-links" style={{ display: 'flex', gap: 2, listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
          {links.map(l => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter', fontWeight: 500, fontSize: '0.84rem',
                  color: active === l ? 'var(--text-primary)' : 'var(--text-muted)',
                  padding: '8px 13px', borderRadius: 8,
                  transition: 'color 0.25s', position: 'relative',
                }}
                onMouseEnter={e => { if (active !== l) e.currentTarget.style.color = 'var(--text-secondary)'; }}
                onMouseLeave={e => { if (active !== l) e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                {l}
                {active === l && (
                  <span style={{
                    position: 'absolute', bottom: 3, left: '50%',
                    transform: 'translateX(-50%)', width: 4, height: 4,
                    borderRadius: '50%', background: 'var(--ocean)', display: 'block',
                  }} />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1px solid var(--border)', background: 'var(--bg-card)',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--ocean)', transition: 'all 0.3s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ocean)'; e.currentTarget.style.background = 'rgba(40,114,159,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Hire Me */}
          <a
            href="/cv.pdf"
            download="Elkortih_Yassine_CV.pdf"
            className="nav-hire"
            style={{
              background: 'var(--ocean)', color: '#CBDDE9',
              padding: '9px 22px', borderRadius: 100,
              fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none',
              letterSpacing: '0.04em', transition: 'all 0.3s', display: 'inline-flex',
              alignItems: 'center', gap: 7,
              boxShadow: '0 0 20px var(--glow)', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--ocean-dark)'; e.currentTarget.style.boxShadow = '0 0 40px var(--glow)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--ocean)'; e.currentTarget.style.boxShadow = '0 0 20px var(--glow)'; }}
          >
            <Download size={14} /> Download Resume
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="hamburger"
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: 5, padding: 4 }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2,
                background: 'var(--text-primary)', borderRadius: 2, transition: 'all 0.3s',
                transform: open && i === 0 ? 'rotate(45deg) translate(5px,5px)' : open && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'var(--nav-bg)', backdropFilter: 'blur(28px)',
              borderBottom: '1px solid var(--border)', padding: '16px 24px',
              display: 'flex', flexDirection: 'column', gap: 2,
            }}
          >
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter', fontWeight: 600, fontSize: '1rem',
                  color: active === l ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textAlign: 'left', padding: '11px 0', borderBottom: '1px solid var(--border)',
                }}>
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){
          .nav-links { display: none !important; }
          .nav-hire { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media(max-width:480px){
          .nav-actions { gap: 8px; }
        }
      `}</style>
    </nav>
  );
}
