import React from 'react';
import { useSpring, animated, useInView } from '@react-spring/web';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  speed?: number;
  fadeDirection?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  offset = 0,
  speed = 1,
  fadeDirection = 'up',
  delay = 0
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const getInitialTransform = () => {
    switch (fadeDirection) {
      case 'up': return { y: 50, opacity: 0 };
      case 'down': return { y: -50, opacity: 0 };
      case 'left': return { x: -50, opacity: 0 };
      case 'right': return { x: 50, opacity: 0 };
      default: return { y: 50, opacity: 0 };
    }
  };

  const springs = useSpring({
    from: getInitialTransform(),
    to: inView 
      ? { x: 0, y: 0, opacity: 1, scale: 1 }
      : getInitialTransform(),
    config: { 
      tension: 120, 
      friction: 14,
      mass: 1
    },
    delay: inView ? delay : 0
  });

  return (
    <animated.div
      ref={ref}
      style={springs}
      className={`transform-gpu ${className}`}
    >
      {children}
    </animated.div>
  );
};