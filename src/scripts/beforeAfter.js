// src/scripts/beforeAfter.js

export function initBeforeAfter() {
  const containers = document.querySelectorAll('[data-before-after]');
  
  containers.forEach(container => {
    const slider = container.querySelector('.slider-line');
    const afterImage = container.querySelector('.after-image');
    const handle = container.querySelector('.slider-handle');
    
    if (!slider || !afterImage) return;
    
    let isActive = false;
    let animationFrame = null;
    
    const updateSlider = (x) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      animationFrame = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        
        slider.style.left = `${percent}%`;
        afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      });
    };
    
    // Mouse events
    const handleMouseDown = (e) => {
      isActive = true;
      container.style.cursor = 'ew-resize';
      updateSlider(e.clientX);
      e.preventDefault();
    };
    
    const handleMouseMove = (e) => {
      if (!isActive) return;
      updateSlider(e.clientX);
    };
    
    const handleMouseUp = () => {
      isActive = false;
      container.style.cursor = '';
    };
    
    // Touch events
    const handleTouchStart = (e) => {
      isActive = true;
      updateSlider(e.touches[0].clientX);
      e.preventDefault();
    };
    
    const handleTouchMove = (e) => {
      if (!isActive) return;
      updateSlider(e.touches[0].clientX);
      e.preventDefault();
    };
    
    const handleTouchEnd = () => {
      isActive = false;
    };
    
    // Keyboard navigation (pour accessibilité)
    const handleKeyDown = (e) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      
      const rect = container.getBoundingClientRect();
      const currentPercent = parseFloat(slider.style.left || '50');
      const step = 5; // 5% par pression de touche
      
      let newPercent = currentPercent;
      if (e.key === 'ArrowLeft') {
        newPercent = Math.max(0, currentPercent - step);
      } else if (e.key === 'ArrowRight') {
        newPercent = Math.min(100, currentPercent + step);
      }
      
      const newX = rect.left + (rect.width * newPercent / 100);
      updateSlider(newX);
      e.preventDefault();
    };
    
    // Attacher les événements
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    handle.addEventListener('keydown', handleKeyDown);
    
    // Cleanup au unmount (si nécessaire)
    container._beforeAfterCleanup = () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      container.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      handle.removeEventListener('keydown', handleKeyDown);
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });
}

// Auto-init
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBeforeAfter);
  } else {
    initBeforeAfter();
  }
}