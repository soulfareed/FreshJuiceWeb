import React from 'react';
import { useSpring, animated, useScroll } from '@react-spring/web';
import { ArrowDown, Droplets, Leaf } from 'lucide-react';
import { ParallaxLayer } from './ParallaxLayer';
import { ParallaxSection } from './ParallaxSection';
import { JuiceGlass } from './JuiceGlass';
import { FloatingFruit } from './FloatingFruit';

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();

  const heroTextSpring = useSpring({
    from: { opacity: 0, scale: 0.8, y: 100 },
    to: { opacity: 1, scale: 1, y: 0 },
    config: { tension: 120, friction: 14 },
    delay: 300
  });

  const floatingSpring = useSpring({
    from: { y: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: -10 });
        await next({ y: 0 });
      }
    },
    config: { duration: 3000 }
  });

  const scrollIndicatorSpring = useSpring({
    opacity: scrollY.to(y => 1 - y / 300),
    transform: scrollY.to(y => `translateY(${y * 0.5}px)`)
  });

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Layer - Slowest */}
      <ParallaxLayer speed={-0.5} zIndex={1}>
        <div
          className="w-full h-[120%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/40 via-green-900/60 to-black/80" />
      </ParallaxLayer>

      {/* Midground Layer - Medium Speed */}
      <ParallaxLayer speed={-0.3} zIndex={2}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-transparent to-green-900/20" />
        
        {/* Floating Fruits */}
        <FloatingFruit fruit="🍊" className="absolute top-20 left-10" delay={0} />
        <FloatingFruit fruit="🍎" className="absolute top-40 right-20" delay={500} />
        <FloatingFruit fruit="🍇" className="absolute bottom-40 left-1/4" delay={1000} />
        <FloatingFruit fruit="🍓" className="absolute top-60 right-1/3" delay={1500} />
        <FloatingFruit fruit="🥭" className="absolute bottom-60 right-10" delay={2000} />
      </ParallaxLayer>

      {/* Foreground Content - Fastest */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-5xl mx-auto px-6">
          <ParallaxSection delay={0}>
            <animated.div style={floatingSpring}>
              <Droplets className="mx-auto mb-6 text-orange-400" size={48} />
            </animated.div>
          </ParallaxSection>

          <animated.div style={heroTextSpring}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="block">Fresh</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-green-400 to-yellow-400">
                Juice Paradise
              </span>
            </h1>
          </animated.div>

          <ParallaxSection delay={600} fadeDirection="up">
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the pure taste of nature with our premium fruit juices. 
              Made from the freshest fruits, bursting with flavor and nutrients.
            </p>
          </ParallaxSection>

          <ParallaxSection delay={900} fadeDirection="up">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-full font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <span className="flex items-center justify-center gap-2">
                  Taste Now
                  <Leaf className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm">
                Our Story
              </button>
            </div>
          </ParallaxSection>

          {/* Animated Juice Glasses */}
          <ParallaxSection delay={1200} fadeDirection="up">
            <div className="flex justify-center items-end gap-8 mt-16">
              <JuiceGlass flavor="orange" size="medium" delay={0} />
              <JuiceGlass flavor="apple" size="large" delay={200} />
              <JuiceGlass flavor="strawberry" size="medium" delay={400} />
            </div>
          </ParallaxSection>
        </div>

        {/* Scroll Indicator */}
        <animated.div
          style={scrollIndicatorSpring}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
        >
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-sm mb-2 font-medium">Discover our flavors</span>
            <ArrowDown size={24} />
          </div>
        </animated.div>
      </div>
    </section>
  );
};