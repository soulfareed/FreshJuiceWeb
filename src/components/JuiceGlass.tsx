import React from 'react';
import { useSpring, animated, useInView } from '@react-spring/web';

interface JuiceGlassProps {
  flavor: 'orange' | 'apple' | 'grape' | 'strawberry' | 'mango';
  size?: 'small' | 'medium' | 'large';
  delay?: number;
  className?: string;
}

const juiceColors = {
  orange: {
    juice: 'from-orange-400 to-orange-600',
    foam: 'from-orange-200 to-orange-300',
    shadow: 'shadow-orange-500/30'
  },
  apple: {
    juice: 'from-green-400 to-green-600',
    foam: 'from-green-200 to-green-300',
    shadow: 'shadow-green-500/30'
  },
  grape: {
    juice: 'from-purple-400 to-purple-600',
    foam: 'from-purple-200 to-purple-300',
    shadow: 'shadow-purple-500/30'
  },
  strawberry: {
    juice: 'from-pink-400 to-red-500',
    foam: 'from-pink-200 to-pink-300',
    shadow: 'shadow-pink-500/30'
  },
  mango: {
    juice: 'from-yellow-400 to-orange-500',
    foam: 'from-yellow-200 to-yellow-300',
    shadow: 'shadow-yellow-500/30'
  }
};

const sizes = {
  small: { width: 60, height: 80 },
  medium: { width: 80, height: 100 },
  large: { width: 120, height: 150 }
};

export const JuiceGlass: React.FC<JuiceGlassProps> = ({
  flavor,
  size = 'medium',
  delay = 0,
  className = ''
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [hovered, setHovered] = React.useState(false);

  const glassSpring = useSpring({
    from: { 
      opacity: 0, 
      scale: 0.5, 
      rotateY: -45,
      y: 50 
    },
    to: inView ? { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      y: 0 
    } : { 
      opacity: 0, 
      scale: 0.5, 
      rotateY: -45,
      y: 50 
    },
    config: { tension: 120, friction: 14 },
    delay: inView ? delay : 0
  });

  const juiceFillSpring = useSpring({
    from: { height: '0%' },
    to: inView ? { height: '75%' } : { height: '0%' },
    config: { tension: 80, friction: 20 },
    delay: inView ? delay + 300 : 0
  });

  const foamSpring = useSpring({
    from: { opacity: 0, scale: 0 },
    to: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 },
    config: { tension: 150, friction: 12 },
    delay: inView ? delay + 800 : 0
  });

  const hoverSpring = useSpring({
    transform: hovered ? 'scale(1.1) rotateY(10deg)' : 'scale(1) rotateY(0deg)',
    filter: hovered ? 'brightness(1.1)' : 'brightness(1)',
    config: { tension: 300, friction: 20 }
  });

  const bubbleSpring = useSpring({
    from: { y: 0 },
    to: async (next) => {
      if (inView) {
        while (true) {
          await next({ y: -5 });
          await next({ y: 0 });
        }
      }
    },
    config: { duration: 2000 }
  });

  const glassSize = sizes[size];
  const colors = juiceColors[flavor];

  return (
    <animated.div
      ref={ref}
      style={glassSpring}
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <animated.div
        style={hoverSpring}
        className="relative cursor-pointer"
      >
        {/* Glass Container */}
        <div
          className={`relative bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-b-3xl rounded-t-lg ${colors.shadow} shadow-2xl`}
          style={{
            width: glassSize.width,
            height: glassSize.height,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
          }}
        >
          {/* Juice Fill */}
          <animated.div
            style={juiceFillSpring}
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${colors.juice} rounded-b-3xl`}
          />

          {/* Foam/Bubbles */}
          <animated.div
            style={foamSpring}
            className={`absolute top-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r ${colors.foam} rounded-full opacity-80`}
          />

          {/* Animated Bubbles */}
          <animated.div style={bubbleSpring} className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/60 rounded-full" />
            <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-white/40 rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-white/50 rounded-full" />
          </animated.div>

          {/* Glass Shine Effect */}
          <div className="absolute top-2 left-2 w-1/4 h-1/3 bg-gradient-to-br from-white/40 to-transparent rounded-lg" />
          
          {/* Glass Rim */}
          <div className="absolute -top-1 left-0 right-0 h-2 bg-white/30 rounded-t-lg border-t-2 border-white/40" />
        </div>

        {/* Straw */}
        <div className="absolute -top-8 right-1/4 w-1 h-12 bg-gradient-to-t from-red-400 to-red-300 rounded-full transform rotate-12" />
        <div className="absolute -top-6 right-1/4 w-3 h-3 border-2 border-red-400 rounded-full bg-transparent transform rotate-12" />
      </animated.div>
    </animated.div>
  );
};