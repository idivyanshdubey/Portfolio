import React, { useState, useEffect, useRef, useCallback, memo, HTMLAttributes } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Calendar } from "lucide-react";

export interface TimelineEvent {
  id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  animationOrder?: "sequential" | "staggered" | "simultaneous";
  cardAlignment?: "alternating" | "left" | "right";
  lineColor?: string;
  activeColor?: string;
  progressIndicator?: boolean;
  cardVariant?: "default" | "elevated" | "outlined" | "filled";
  cardEffect?: "none" | "glow" | "shadow" | "bounce";
  parallaxIntensity?: number;
  progressLineWidth?: number;
  progressLineCap?: "round" | "square";
  dateFormat?: "text" | "badge";
  className?: string;
  revealAnimation?: "fade" | "slide" | "scale" | "flip" | "none";
  connectorStyle?: "dots" | "line" | "dashed";
  perspective?: boolean;
  darkMode?: boolean;
  smoothScroll?: boolean;
}

const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    year: "2023",
    title: "Major Achievement",
    subtitle: "Organization Name",
    description:
      "Description of the achievement or milestone reached during this time period.",
  },
  {
    year: "2022",
    title: "Important Milestone",
    subtitle: "Organization Name",
    description: "Details about this significant milestone and its impact.",
  },
  {
    year: "2021",
    title: "Key Event",
    subtitle: "Organization Name",
    description: "Information about this key event in the timeline.",
  },
];

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// Memoized TimelineCard for performance, with correct typing
const TimelineCard = memo(
  React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
    <div ref={ref} {...props}>{props.children}</div>
  ))
);
TimelineCard.displayName = 'TimelineCard';

export const ScrollTimeline = ({
  events = DEFAULT_EVENTS,
  title = "Timeline",
  subtitle = "Scroll to explore the journey",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-primary/30",
  activeColor = "bg-primary",
  progressIndicator = true,
  cardVariant = "default",
  cardEffect = "none",
  parallaxIntensity = 0.2,
  progressLineWidth = 2,
  progressLineCap = "round",
  dateFormat = "badge",
  revealAnimation = "fade",
  className = "",
  connectorStyle = "line",
  perspective = false,
  darkMode = false,
  smoothScroll = true,
}: ScrollTimelineProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.01,
    mass: 0.8,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const newIndex = Math.min(Math.floor(v * events.length), events.length - 1);
      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  const getCardVariants = useCallback((index: number) => {
    const isEven = index % 2 === 0;
    const fadeDirection = cardAlignment === 'alternating' ? (isEven ? -50 : 50) : 0;

    return {
      hidden: {
        opacity: 0,
        x: revealAnimation === 'slide' ? fadeDirection : 0,
        y: revealAnimation === 'fade' ? 30 : 0,
        scale: revealAnimation === 'scale' ? 0.9 : 1,
      },
      visible: (i: number) => ({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.3,
          delay: Math.min(i * 0.03, 0.15),
        },
      }),
    };
  }, [cardAlignment, revealAnimation]);

  const getConnectorClasses = () => {
    const baseClasses = cn(
      "absolute left-1/2 transform -translate-x-1/2",
      lineColor
    );
    const widthStyle = `w-[${progressLineWidth}px]`;
    switch (connectorStyle) {
      case "dots":
        return cn(baseClasses, "w-1 rounded-full");
      case "dashed":
        return cn(
          baseClasses,
          widthStyle,
          `[mask-image:linear-gradient(to_bottom,black_33%,transparent_33%,transparent_66%,black_66%)] [mask-size:1px_12px]`
        );
      case "line":
      default:
        return cn(baseClasses, widthStyle);
    }
  };

  const getCardClasses = useCallback((index: number) => {
    const baseClasses = "relative p-4 rounded-lg border transition-all duration-200";
    const alignmentClasses = cardAlignment === 'alternating' 
      ? (index % 2 === 0 ? 'mr-auto' : 'ml-auto') 
      : 'mx-auto';

    const variantClasses: Record<string, string> = {
      elevated: 'bg-white dark:bg-gray-800 shadow-md hover:shadow-lg border-gray-200 dark:border-gray-700',
      minimal: 'bg-transparent border-gray-300 dark:border-gray-600',
      outline: 'border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50',
    };

    return `${baseClasses} ${alignmentClasses} ${variantClasses[cardVariant] || variantClasses.elevated} max-w-sm w-full`;
  }, [cardAlignment, cardVariant]);

  const parallaxY = useTransform(
    smoothProgress,
    [0, 1],
    [0, -20 * (parallaxIntensity || 0.1)]
  );

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        darkMode ? "bg-background text-foreground" : "",
        className
      )}
    >
      <div className="text-center py-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-24">
        <div className="relative mx-auto">
          <div
            className={cn(getConnectorClasses(), "h-full absolute top-0 z-10")}
          ></div>

          {/* Progress Indicator with Traveling Glow */}
          {progressIndicator && (
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 rounded-full transform -translate-x-1/2">
              <motion.div 
                className="w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                style={{ height: progressHeight }}
              />
              <motion.div 
                className="absolute left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
                style={{ 
                  top: progressHeight,
                  boxShadow: '0 0 12px rgba(168, 85, 247, 0.6), 0 0 20px rgba(59, 130, 246, 0.3)'
                }}
              />
            </div>
          )}

          <div className="relative z-20">
            {events.map((event, index) => (
              <TimelineCard
                key={event.id || index}
                ref={(el: HTMLDivElement | null) => { timelineRefs.current[index] = el; }}
                className={cn(
                  "relative flex items-center mb-20 py-4",
                  "flex-col lg:flex-row",
                  cardAlignment === "alternating"
                    ? index % 2 === 0
                      ? "lg:justify-start"
                      : "lg:flex-row-reverse lg:justify-start"
                    : cardAlignment === "left"
                    ? "lg:justify-start"
                    : "lg:flex-row-reverse lg:justify-start"
                )}
                style={{
                  opacity: index <= activeIndex ? 1 : 0.6,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                <div
                  className={cn(
                    "absolute top-1/2 transform -translate-y-1/2 z-30",
                    "left-1/2 -translate-x-1/2"
                  )}
                >
                  <motion.div
                    className={cn(
                      "w-6 h-6 rounded-full border-4 bg-background flex items-center justify-center",
                      index <= activeIndex
                        ? "border-primary"
                        : "border bg-card"
                    )}
                    animate={
                      index <= activeIndex
                        ? {
                            scale: [1, 1.15, 1],
                            boxShadow: [
                              "0 0 0px rgba(99,102,241,0)",
                              "0 0 8px rgba(99,102,241,0.4)",
                              "0 0 0px rgba(99,102,241,0)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 5,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <motion.div
                  className={cn(
                    getCardClasses(index),
                    "mt-12 lg:mt-0"
                  )}
                  variants={getCardVariants(index)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  style={parallaxIntensity > 0 ? { y: parallaxY } : undefined}
                >
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    {dateFormat === "badge" ? (
                      <div className="flex items-center mb-2">
                        {event.icon || (
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                        )}
                        <span
                          className={cn(
                            "text-sm font-bold",
                            event.color
                              ? `text-${event.color}`
                              : "text-primary"
                          )}
                        >
                          {event.year}
                        </span>
                      </div>
                    ) : (
                      <p className="text-lg font-bold text-primary mb-2">
                        {event.year}
                      </p>
                    )}
                    <h3 className="text-xl font-bold mb-1">
                      {event.title}
                    </h3>
                    {event.subtitle && (
                      <p className="text-muted-foreground font-medium mb-2">
                        {event.subtitle}
                      </p>
                    )}
                    <p className="text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              </TimelineCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTimeline; 