export class ScrollAnimator {
  constructor() {
    this.initScrollAnimation();
    this.initParallax();
  }

  initScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add("is-visible");
            });
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    document.querySelectorAll("[data-scroll-animate]").forEach((el) => {
      observer.observe(el);
    });
  }

  initParallax() {
    const parallaxItems = document.querySelectorAll('[data-parallax]');
    
    if (parallaxItems.length === 0) return;

    const updateParallax = () => {
      parallaxItems.forEach((item) => {
        const amplitude = parseFloat(item.dataset.parallax || '0');
        if (amplitude === 0) return;

        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        const offset = amplitude * clampedProgress;
        
        const content = item.querySelector('[data-parallax-content]');
        if (content) {
          content.style.transform = `translateY(${offset}px)`;
        }
      });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    updateParallax();
  }
}

// Auto-init
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new ScrollAnimator();
    });
  } else {
    new ScrollAnimator();
  }
}