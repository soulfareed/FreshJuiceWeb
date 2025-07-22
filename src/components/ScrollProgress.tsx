import React from 'react';
import { useSpring, animated, useScroll } from '@react-spring/web';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const progressSpring = useSpring({
    width: scrollYProgress.to(progress => `${progress * 100}%`),
    config: { tension: 300, friction: 30 }
  });

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
      <animated.div
        style={progressSpring}
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      />
    </div>
  );
};