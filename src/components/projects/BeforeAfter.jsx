
import { useState, useRef, useEffect } from 'react';
// import './BeforeAfter.scss';

export default function BeforeAfter({ before, after, alt = "Comparaison" }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percentage)));
  };

  const handleMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => setIsDragging(false));
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', () => setIsDragging(false));
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', () => setIsDragging(false));
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', () => setIsDragging(false));
      };
    }
  }, [isDragging]);

  return (
    <div 
      className="before-after-react"
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      <img src={before} alt={`${alt} - Avant`} className="before" />
      <div 
        className="after-container"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={after} alt={`${alt} - Après`} className="after" />
      </div>
      
      <div 
        className="slider-handle"
        style={{ left: `${position}%` }}
      >
        <div className="handle-bar" />
        <div className="handle-circle">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M8 12L4 8v8l4-4zm8 0l4-4v8l-4-4z" fill="white"/>
          </svg>
        </div>
      </div>
      
      <div className="labels">
        <span className="label before-label">Avant</span>
        <span className="label after-label">Après</span>
      </div>
    </div>
  );
}