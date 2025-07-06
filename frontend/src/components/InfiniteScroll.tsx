import React, { useState, useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  items: Array<{ content: React.ReactNode }>;
  isTilted?: boolean;
  tiltDirection?: 'left' | 'right';
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: 'up' | 'down' | 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  items,
  isTilted = false,
  tiltDirection = 'left',
  autoplay = true,
  autoplaySpeed = 0.1,
  autoplayDirection = 'left',
  pauseOnHover = true,
  className = ''
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (!autoplay) return;

    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!isPaused) {
        const deltaTime = currentTime - lastTime;
        const scrollAmount = autoplaySpeed * deltaTime;

        setScrollPosition(prev => {
          const newPosition = prev + scrollAmount;
          // For horizontal scrolling, each item is 350px wide (300px + 50px padding)
          const itemWidth = 350;
          const maxScroll = items.length * itemWidth;
          return newPosition >= maxScroll ? 0 : newPosition;
        });

        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [autoplay, autoplaySpeed, isPaused, items.length]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const getTiltStyle = () => {
    if (!isTilted) return {};
    
    const tiltAngle = tiltDirection === 'left' ? -15 : 15;
    return {
      transform: `rotate(${tiltAngle}deg)`,
      transformOrigin: 'center center'
    };
  };

  const getScrollStyle = () => {
    const isVertical = autoplayDirection === 'up' || autoplayDirection === 'down';
    const isHorizontal = autoplayDirection === 'left' || autoplayDirection === 'right';
    
    if (isVertical) {
      return {
        transform: `translateY(-${scrollPosition}px)`
      };
    } else if (isHorizontal) {
      return {
        transform: `translateX(-${scrollPosition}px)`
      };
    }
    
    return {};
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={getTiltStyle()}
    >
      <div
        className="flex transition-transform duration-1000 ease-linear"
        style={getScrollStyle()}
      >
        {/* Original items */}
        {items.map((item, index) => (
          <div
            key={`original-${index}`}
            className="flex-shrink-0 px-4"
            style={{ width: '300px' }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 h-full border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              {item.content}
            </div>
          </div>
        ))}
        
        {/* Duplicate items for seamless loop */}
        {items.map((item, index) => (
          <div
            key={`duplicate-${index}`}
            className="flex-shrink-0 px-4"
            style={{ width: '300px' }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 h-full border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll; 