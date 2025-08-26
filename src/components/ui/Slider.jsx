import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Slider = ({ 
  children, 
  gap = 40,
  className = '',
  autoScroll = false,
  scrollInterval = 3000,
  showDots = false,
  ...props 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const childrenArray = React.Children?.toArray(children);
  const totalItems = childrenArray?.length;

  useEffect(() => {
    if (autoScroll && totalItems > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
      }, scrollInterval);

      return () => clearInterval(interval);
    }
  }, [autoScroll, scrollInterval, totalItems]);

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    if (sliderRef?.current) {
      const scrollAmount = index * (sliderRef?.current?.scrollWidth / totalItems);
      sliderRef?.current?.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const baseClasses = 'flex overflow-x-auto scrollbar-hide';
  
  const sliderClasses = `
    ${baseClasses}
    ${className}
  `?.trim()?.replace(/\s+/g, ' ');

  return (
    <div className="w-full">
      <div 
        ref={sliderRef}
        className={sliderClasses}
        style={{ gap: `${gap}px` }}
        {...props}
      >
        {childrenArray?.map((child, index) => (
          <div 
            key={index} 
            className="flex-shrink-0"
            style={{ width: `${100 / Math.min(5, totalItems)}%` }}
          >
            {child}
          </div>
        ))}
      </div>
      {showDots && totalItems > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalItems })?.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes?.node?.isRequired,
  gap: PropTypes?.number,
  className: PropTypes?.string,
  autoScroll: PropTypes?.bool,
  scrollInterval: PropTypes?.number,
  showDots: PropTypes?.bool
};

export default Slider;