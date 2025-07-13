// Scroll Animation Utility - FIXED VERSION
export const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Add a small delay to ensure smooth animation
        setTimeout(() => {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }, 100);
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in-up class
  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach((el) => {
    const element = el as HTMLElement;
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    observer.observe(el);
  });

  // Observe all elements with card-hover class for enhanced animations
  const cardElements = document.querySelectorAll('.card-hover');
  cardElements.forEach((el) => observer.observe(el));

  return observer;
};

// Enhanced scroll effects
export const addScrollEffects = () => {
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute('data-parallax') || '0.5';
      const yPos = -(scrolled * parseFloat(speed));
      (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
};

// Stagger animation utility
export const staggerAnimation = (elements: NodeListOf<Element>, delay: number = 100) => {
  elements.forEach((element, index) => {
    (element as HTMLElement).style.animationDelay = `${index * delay}ms`;
  });
};

// Morphing background effect
export const initMorphingBackground = () => {
  const morphingElements = document.querySelectorAll('.morphing-bg');
  morphingElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      element.classList.add('morphing-active');
    });
    
    element.addEventListener('mouseleave', () => {
      element.classList.remove('morphing-active');
    });
  });
};

// Particle system enhancement
export const enhanceParticles = () => {
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    // Add random movement
    const randomX = Math.random() * 100;
    const randomDelay = Math.random() * 20;
    
    (particle as HTMLElement).style.setProperty('--random-x', `${randomX}%`);
    (particle as HTMLElement).style.setProperty('--random-delay', `${randomDelay}s`);
    
    // Ensure particles are visible
    (particle as HTMLElement).style.opacity = '0.3';
    (particle as HTMLElement).style.zIndex = '0';
  });
};

// Initialize all animations with improved visibility
export const initAllAnimations = () => {
  // Wait for DOM to be ready
  setTimeout(() => {
    const observer = initScrollAnimations();
    const cleanupScroll = addScrollEffects();
    initMorphingBackground();
    enhanceParticles();

    // Ensure gradient text animations are visible
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach((element) => {
      const el = element as HTMLElement;
      el.style.display = 'inline-block';
      el.style.backgroundClip = 'text';
      el.style.webkitBackgroundClip = 'text';
    });

    // Ensure glass effects are visible
    const glassElements = document.querySelectorAll('.glass-effect');
    glassElements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.backdropFilter = 'blur(12px)';
      // Use setProperty for webkit prefix
      el.style.setProperty('-webkit-backdrop-filter', 'blur(12px)');
    });

    return () => {
      observer.disconnect();
      cleanupScroll();
    };
  }, 100);
};

// Additional utility for ensuring animations are visible
export const ensureAnimationVisibility = () => {
  // Force reflow to ensure animations are applied
  const body = document.body;
  if (body) {
    // Trigger reflow by accessing offsetHeight
    void body.offsetHeight;
  }
  
  // Ensure all animated elements are visible
  const animatedElements = document.querySelectorAll('.particle, .gradient-text, .pulse-glow, .float-animation');
  animatedElements.forEach((element) => {
    const el = element as HTMLElement;
    el.style.visibility = 'visible';
    el.style.opacity = '1';
  });
}; 