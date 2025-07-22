import React from 'react';
import { useSpring, animated, useScroll } from '@react-spring/web';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number;
  className?: string;
  zIndex?: number;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed,
  className = '',
  zIndex = 0
}) => {
  const { scrollY } = useScroll();

  const parallaxSpring = useSpring({
    transform: scrollY.to(y => `translateY(${y * speed}px)`),
    config: { tension: 300, friction: 60 }
  });

  return (
    <animated.div
      style={{
        ...parallaxSpring,
        zIndex,
        willChange: 'transform'
      }}
      className={`absolute inset-0 transform-gpu ${className}`}
    >
      {children}
    </animated.div>
  );
};