import React, { useState } from 'react';
import { useSpring, animated, useScroll } from '@react-spring/web';
import { Menu, X, Droplets } from 'lucide-react';

const navItems = ['Home', 'About', 'Juices', 'Contact'];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const navSpring = useSpring({
    backgroundColor: scrollY.to(y => 
      y > 100 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.2)'
    ),
    backdropFilter: scrollY.to(y => 
      y > 100 ? 'blur(20px)' : 'blur(10px)'
    ),
    borderColor: scrollY.to(y => 
      y > 100 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'
    )
  });

  const logoSpring = useSpring({
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
    config: { tension: 120, friction: 14 },
    delay: 100
  });

  const menuSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
    config: { tension: 300, friction: 30 }
  });

  const scrollToSection = (sectionName: string) => {
    const element = document.getElementById(sectionName.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <animated.nav
        style={navSpring}
        className="fixed top-0 w-full z-50 border-b"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <animated.div style={logoSpring} className="flex items-center gap-2">
              <Droplets className="text-orange-400" size={28} />
              <span className="text-2xl font-bold text-white">FreshJuice</span>
            </animated.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <NavItem
                  key={item}
                  item={item}
                  onClick={() => scrollToSection(item)}
                  delay={200 + index * 100}
                />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <animated.div
          style={menuSpring}
          className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-b border-white/10"
        >
          <div className="container mx-auto px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left py-3 text-white hover:text-blue-400 transition-colors duration-300 text-lg"
              >
                {item}
              </button>
            ))}
          </div>
        </animated.div>
      </animated.nav>
    </>
  );
};

const NavItem: React.FC<{
  item: string;
  onClick: () => void;
  delay: number;
}> = ({ item, onClick, delay }) => {
  const [hovered, setHovered] = useState(false);

  const itemSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 14 },
    delay
  });

  const hoverSpring = useSpring({
    color: hovered ? '#fb923c' : '#ffffff',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0px)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.button
      style={{ ...itemSpring, ...hoverSpring }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="font-medium transition-all duration-300 relative"
    >
      {item}
      <animated.div
        style={{
          scaleX: hovered ? 1 : 0,
          opacity: hovered ? 1 : 0
        }}
        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 origin-left transition-all duration-300"
        className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 origin-left transition-all duration-300"
      />
    </animated.button>
  );
};