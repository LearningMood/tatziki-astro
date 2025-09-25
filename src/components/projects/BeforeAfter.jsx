// src/components/BeforeAfter.jsx
import { useRef, useEffect, useState } from 'react';

export default function BeforeAfter({ before, after, alt = '' }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const handleRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const resize = () => setWidth(el.clientWidth);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const handle = handleRef.current;
    let dragging = false;

    const setPosition = (x) => {
      const rect = containerRef.current.getBoundingClientRect();
      let pos = x - rect.left;
      pos = Math.max(0, Math.min(pos, rect.width));
      const pct = (pos / rect.width) * 100;
      overlay.style.width = `${pct}%`;
      handle.style.left = `${pct}%`;
    };

    const onPointerDown = (e) => {
      dragging = true;
      containerRef.current.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      setPosition(e.clientX);
    };
    const onPointerUp = (e) => {
      dragging = false;
      containerRef.current.releasePointerCapture?.(e.pointerId);
    };

    handle.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // init middle
    setPosition((containerRef.current.getBoundingClientRect().width || 0) / 2 + containerRef.current.getBoundingClientRect().left);

    return () => {
      handle.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [width]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', overflow: 'hidden', borderRadius: 6 }}
      aria-label="Before After"
    >
      <img src={after} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} loading="lazy" />
      <div ref={overlayRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '50%',
        overflow: 'hidden',
      }}>
        <img src={before} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} loading="lazy" />
      </div>
      <div
        ref={handleRef}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          height: '100%',
          width: 28,
          cursor: 'ew-resize',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.6)',
          borderRadius: 999,
        }}
      >
        <div style={{ width: 2, height: 40, background: '#333' }} />
      </div>
    </div>
  );
}
