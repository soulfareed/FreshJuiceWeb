import React from 'react';
import { useSpring, animated, useScroll } from '@react-spring/web';
import { Leaf, Heart, Award, Droplets } from 'lucide-react';
import { ParallaxLayer } from './ParallaxLayer';
import { ParallaxSection } from './ParallaxSection';
import { JuiceGlass } from './JuiceGlass';

const features = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Pure fruit juices with no artificial colors, flavors, or preservatives. Just nature\'s goodness.'
  },
  {
    icon: Heart,
    title: 'Health First',
    description: 'Packed with vitamins, minerals, and antioxidants to boost your immune system naturally.'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Award-winning recipes crafted from hand-picked fruits at peak ripeness for maximum flavor.'
  },
  {
    icon: Droplets,
    title: 'Fresh Daily',
    description: 'Made fresh every morning and delivered to your door within hours of production.'
  }
];

export const FeatureSection: React.FC = () => {
  const { scrollY } = useScroll();

  const backgroundSpring = useSpring({
    transform: scrollY.to(y => `translateY(${(y - 800) * -0.2}px)`)
  });

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Layer */}
      <ParallaxLayer speed={-0.4} zIndex={1}>
        <div
          className="w-full h-[120%] bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 via-orange-900/95 to-black/90" />
      </ParallaxLayer>

      {/* Floating Elements */}
      <ParallaxLayer speed={-0.6} zIndex={2}>
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-green-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl" />
        
        {/* Floating Juice Glasses */}
        <div className="absolute top-32 right-32">
          <JuiceGlass flavor="grape" size="small" delay={0} />
        </div>
        <div className="absolute bottom-40 left-20">
          <JuiceGlass flavor="mango" size="small" delay={500} />
        </div>
      </ParallaxLayer>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <ParallaxSection delay={200}>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Why Choose FreshJuice?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes our fruit juices the perfect choice for health-conscious individuals
            </p>
          </div>
        </ParallaxSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ParallaxSection
              key={index}
              delay={400 + index * 150}
              fadeDirection="up"
            >
              <FeatureCard feature={feature} index={index} />
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ feature: typeof features[0]; index: number }> = ({ feature, index }) => {
  const [hovered, setHovered] = React.useState(false);

  const cardSpring = useSpring({
    transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0px) scale(1)',
    boxShadow: hovered 
      ? '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
      : '0 10px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)',
    config: { tension: 300, friction: 20 }
  });

  const iconSpring = useSpring({
    transform: hovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
    color: hovered ? '#fb923c' : '#94a3b8',
    config: { tension: 300, friction: 15 }
  });

  return (
    <animated.div
      style={cardSpring}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 cursor-pointer"
    >
      <animated.div style={iconSpring} className="mb-6">
        <feature.icon size={48} />
      </animated.div>
      <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
    </animated.div>
  );
};