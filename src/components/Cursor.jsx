import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const move = (e) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' });
    };

    const onEnter = () => {
      gsap.to(ring.current, { scale: 2, opacity: 0.5, duration: 0.3 });
      gsap.to(dot.current, { scale: 0, duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to(ring.current, { scale: 1, opacity: 0.8, duration: 0.3 });
      gsap.to(dot.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', move);

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, []);

  const base = { position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%,-50%)', willChange: 'transform' };

  return (
    <>
      <div ref={dot} style={{ ...base, width: 6, height: 6, borderRadius: '50%', background: '#28729F' }} />
      <div ref={ring} style={{ ...base, width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(40,114,159,0.7)', opacity: 0.8 }} />
    </>
  );
}
