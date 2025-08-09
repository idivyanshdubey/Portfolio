"use client";

import React, {
  useRef,
  useEffect,
  useState,
  TouchEvent,
  CSSProperties,
} from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { Link } from "react-router-dom";

export interface Carousel3DItem {
  id: number;
  title: string;
  brand: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
}

interface Carousel3DProps {
  items: Carousel3DItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
}

const Carousel3D = ({
  items,
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 500,
}: Carousel3DProps) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const minSwipeDistance = 50;

  useEffect(() => {
    if (autoRotate && isInView && !isHovering) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % items.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, items.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const currentRef = carouselRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % items.length);
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  return (
    <section id="carousel3d" className="bg-background min-w-full mx-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 
      min-w-[350px] md:min-w-[1000px] max-w-7xl">
        <div
          className="relative w-full h-[550px] flex items-center justify-center overflow-visible"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={carouselRef}
        >
          <div
            className="relative w-full flex items-center justify-center"
            style={{ height: cardHeight }}
          >
            {items.map((item, index) => {
              const offset = (index - active + items.length) % items.length;
              const isActive = offset === 0;

              const style: CSSProperties & { filter?: string } = {
                position: 'absolute',
                width: '100%',
                maxWidth: 400,
                transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out, filter 0.5s ease-in-out',
                pointerEvents: isActive ? 'auto' : 'none',
              };

              if (isActive) {
                style.transform = 'translateX(0) scale(1)';
                style.opacity = 1;
                style.zIndex = 20;
                style.filter = 'blur(0px) saturate(1)';
              } else if (offset === 1) {
                style.transform = 'translateX(65%) scale(0.88)';
                style.opacity = 0.5;
                style.zIndex = 10;
                style.filter = 'blur(2px) saturate(0.5)';
              } else if (offset === items.length - 1) {
                style.transform = 'translateX(-65%) scale(0.88)';
                style.opacity = 0.5;
                style.zIndex = 10;
                style.filter = 'blur(2px) saturate(0.5)';
              } else {
                const direction = index > active ? 1 : -1;
                style.transform = `translateX(${direction * 65}%) scale(0.8)`;
                style.opacity = 0;
                style.zIndex = 0;
                style.filter = 'blur(2px) saturate(0.5)';
              }

              return (
                <div key={item.id} style={style}>
                  <div className={`overflow-hidden bg-background h-full rounded-2xl border flex flex-col transition-shadow duration-500 ${isActive ? 'shadow-xl' : 'shadow-md'}`}>
                    <div
                      className="relative bg-black p-6 flex items-center justify-center h-48 overflow-hidden rounded-t-2xl"
                      style={{
                        backgroundImage: `url(${item.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/50" />
                      <div className="relative z-10 text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">{item.brand.toUpperCase()}</h3>
                        <div className="w-12 h-1 bg-white mx-auto mb-2" />
                        <p className="text-sm">{item.title}</p>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-1 text-foreground">{item.title}</h3>
                      <p className="text-gray-500 text-sm font-medium mb-2">{item.brand}</p>
                      <p className="text-gray-600 text-sm flex-grow">{item.description}</p>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {item.link.startsWith("/") ? (
                          <Link to={item.link} className="text-primary font-semibold flex items-center group" onClick={() => window.scrollTo(0, 0)}>
                            <span>Learn more</span>
                            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        ) : (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold flex items-center group">
                             <span>Learn more</span>
                            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!isMobile && (
            <>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-white/75 dark:hover:bg-black/75 z-30 shadow-md transition-all hover:scale-110"
                onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-white/75 dark:hover:bg-black/75 z-30 shadow-md transition-all hover:scale-110"
                onClick={() => setActive((prev) => (prev + 1) % items.length)}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  active === idx ? "w-6 bg-primary" : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                onClick={() => setActive(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel3D;