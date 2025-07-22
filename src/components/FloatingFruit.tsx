import React from 'react';
import { useSpring, animated } from '@react-spring/web';

interface FloatingFruitProps {
  fruit: '🍊' | '🍎' | '🍇' | '🍓' | '🥭' | '🍌' | '🍍';
  delay?: number;
  className?: string;
}

export const FloatingFruit: React.FC<FloatingFruitProps> = ({
  fruit,
  delay = 0,
  className = ''
}) => {
  const floatingSpring = useSpring({
    from: { y: 0, rotate: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: -20, rotate: 5 });
        await next({ y: 0, rotate: -5 });
      }
    },
    config: { duration: 3000 + Math.random() * 2000 },
    delay
  });

  const [hovered, setHovered] = React.useState(false);

  const hoverSpring = useSpring({
    transform: hovered ? 'scale(1.2) rotate(15deg)' : 'scale(1) rotate(0deg)',
    config: { tension: 300, friction: 15 }
  });

  return (
    <animated.div
      style={{ ...floatingSpring, ...hoverSpring }}
      className={`text-4xl cursor-pointer select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {fruit}
    </animated.div>
  );
};