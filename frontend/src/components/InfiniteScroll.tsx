import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Drag/swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragStartScroll, setDragStartScroll] = useState<number>(0);

  // Mouse/touch event handlers for drag/swipe
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsPaused(true);
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragStartScroll(scrollPosition);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || dragStartX === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;
    setScrollPosition(dragStartScroll - deltaX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
    setDragStartX(null);
  };

  // Animation speed state for arrow navigation
  const [arrowScroll, setArrowScroll] = useState(false);

  // Scroll by one item width
  const scrollBy = (direction: 'left' | 'right') => {
    const itemWidth = 350;
    const maxScroll = (items.length - 1) * itemWidth;
    setScrollPosition(prev => {
      if (direction === 'left') {
        return Math.max(prev - itemWidth, 0);
      } else {
        return Math.min(prev + itemWidth, maxScroll);
      }
    });
    setIsPaused(true);
    // Slow animation for right arrow
    if (direction === 'right') {
      setArrowScroll(true);
      setTimeout(() => setArrowScroll(false), 700); // 700ms for slow effect
    }
    setTimeout(() => setIsPaused(false), 1000);
  };

  useEffect(() => {
    if (!autoplay) return;

    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!isPaused) {
        const deltaTime = currentTime - lastTime;
        const scrollAmount = autoplaySpeed * deltaTime;

        setScrollPosition(prev => {
          const itemWidth = 350;
          const maxScroll = (items.length - 1) * itemWidth;
          const newPosition = prev + scrollAmount;
          if (newPosition >= maxScroll) {
            // Only loop if autoplay is active and not paused by manual navigation
            return 0;
          }
          return newPosition;
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
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => { handleMouseLeave(); handleDragEnd(); }}
      onMouseDown={handleDragStart}
      onMouseMove={isDragging ? handleDragMove : undefined}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={isDragging ? handleDragMove : undefined}
      onTouchEnd={handleDragEnd}
      style={getTiltStyle()}
    >
      {/* Left Arrow */}
      <button
        type="button"
        aria-label="Scroll Left"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-900/80 rounded-full shadow p-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 border border-gray-200 dark:border-gray-700 hover:bg-primary-100 dark:hover:bg-gray-800"
        onClick={() => scrollBy('left')}
        tabIndex={0}
        style={{ pointerEvents: 'auto' }}
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>
      {/* Right Arrow */}
      <button
        type="button"
        aria-label="Scroll Right"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-900/80 rounded-full shadow p-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 border border-gray-200 dark:border-gray-700 hover:bg-primary-100 dark:hover:bg-gray-800"
        onClick={() => scrollBy('right')}
        tabIndex={0}
        style={{ pointerEvents: 'auto' }}
      >
        <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>
      <div
        className={`flex transition-transform ${arrowScroll ? 'duration-1000' : 'duration-300'} ease-linear`}
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