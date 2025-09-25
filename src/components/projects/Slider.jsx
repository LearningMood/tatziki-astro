import { useState, useEffect } from 'react';
// import './Slider.scss';

export default function Slider({ 
  images, 
  autoplay = false, 
  duration = 5000,
  showThumbs = false,
  fade = false 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, duration);
      return () => clearInterval(interval);
    }
  }, [autoplay, duration, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-react">
      <div className="slider-main">
        <div 
          className={`slider-track ${fade ? 'fade' : 'slide'}`}
          style={{ transform: !fade ? `translateX(-${currentIndex * 100}%)` : undefined }}
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className={`slide ${fade && index === currentIndex ? 'active' : ''}`}
              style={fade ? { opacity: index === currentIndex ? 1 : 0 } : {}}
            >
              <img src={image.src} alt={image.alt || `Slide ${index + 1}`} />
              {image.caption && (
                <div className="slide-caption">{image.caption}</div>
              )}
            </div>
          ))}
        </div>
        
        <button className="nav-btn prev" onClick={prevSlide}>‹</button>
        <button className="nav-btn next" onClick={nextSlide}>›</button>
        
        <div className="dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
      
      {showThumbs && (
        <div className="slider-thumbs">
          {images.map((image, index) => (
            <button
              key={index}
              className={`thumb ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <img src={image.src} alt={image.alt || `Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}