import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Logo({ onClick }) {
  const svgRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulse the center node continuously
      gsap.to('.logo-core', {
        scale: 1.18,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'center center',
      });
      // Orbit dots rotating
      gsap.to('.logo-orbit-ring', {
        rotation: 360,
        duration: 6,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });
      gsap.to('.logo-orbit-ring-2', {
        rotation: -360,
        duration: 9,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });
      // Animate connection lines opacity
      gsap.to('.logo-line', {
        opacity: 0.15,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    if (hovered) {
      gsap.to(svgRef.current, { scale: 1.12, duration: 0.3, ease: 'back.out(2)' });
      gsap.to('.logo-bracket', { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out' });
      gsap.to('.logo-core', { fill: '#CBDDE9', duration: 0.3 });
    } else {
      gsap.to(svgRef.current, { scale: 1, duration: 0.4, ease: 'power3.out' });
      gsap.to('.logo-bracket', { opacity: 0.7, duration: 0.3 });
      gsap.to('.logo-core', { fill: '#28729F', duration: 0.3 });
    }
  }, [hovered]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: 0 }}
    >
      {/* SVG Neural / Code Logo */}
      <svg ref={svgRef} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', transformOrigin: 'center' }}>
        {/* Connection lines */}
        <line className="logo-line" x1="21" y1="21" x2="7" y2="9" stroke="#28729F" strokeWidth="1" opacity="0.4" />
        <line className="logo-line" x1="21" y1="21" x2="35" y2="9" stroke="#28729F" strokeWidth="1" opacity="0.4" />
        <line className="logo-line" x1="21" y1="21" x2="7" y2="33" stroke="#28729F" strokeWidth="1" opacity="0.4" />
        <line className="logo-line" x1="21" y1="21" x2="35" y2="33" stroke="#28729F" strokeWidth="1" opacity="0.4" />
        <line className="logo-line" x1="21" y1="21" x2="21" y2="4" stroke="#28729F" strokeWidth="1" opacity="0.3" />
        <line className="logo-line" x1="21" y1="21" x2="21" y2="38" stroke="#28729F" strokeWidth="1" opacity="0.3" />

        {/* Outer orbit ring with dot */}
        <g className="logo-orbit-ring" style={{ transformOrigin: '21px 21px' }}>
          <circle cx="21" cy="5" r="2.2" fill="#28729F" opacity="0.7" />
        </g>
        <g className="logo-orbit-ring-2" style={{ transformOrigin: '21px 21px' }}>
          <circle cx="37" cy="21" r="1.6" fill="#CBDDE9" opacity="0.5" />
        </g>

        {/* Corner neural nodes */}
        <circle cx="7" cy="9" r="2.5" fill="#28729F" opacity="0.5" />
        <circle cx="35" cy="9" r="2.5" fill="#28729F" opacity="0.5" />
        <circle cx="7" cy="33" r="2.5" fill="#28729F" opacity="0.5" />
        <circle cx="35" cy="33" r="2.5" fill="#28729F" opacity="0.5" />

        {/* Center core node */}
        <circle className="logo-core" cx="21" cy="21" r="6.5" fill="#28729F" />
        <circle cx="21" cy="21" r="4" fill="none" stroke="#CBDDE9" strokeWidth="1.2" opacity="0.6" />

        {/* Code brackets < > */}
        <text className="logo-bracket" x="13.5" y="25" fontFamily="Space Grotesk, monospace" fontSize="10" fontWeight="900" fill="#CBDDE9" opacity="0.7">&lt;</text>
        <text className="logo-bracket" x="24" y="25" fontFamily="Space Grotesk, monospace" fontSize="10" fontWeight="900" fill="#CBDDE9" opacity="0.7">&gt;</text>
      </svg>

      {/* Text part */}
      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>
        yas<span style={{ color: 'var(--ocean)' }}>.</span>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--ocean)', letterSpacing: '0.05em', textTransform: 'uppercase', marginLeft: 1, verticalAlign: 'middle' }}>ai</span>
      </span>
    </button>
  );
}
