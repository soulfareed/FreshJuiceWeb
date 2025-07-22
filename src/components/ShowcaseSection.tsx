import React from "react";
import { useSpring, animated, useInView } from "@react-spring/web";
import { ShoppingCart, Star } from "lucide-react";
import { ParallaxLayer } from "./ParallaxLayer";
import { ParallaxSection } from "./ParallaxSection";
import { JuiceGlass } from "./JuiceGlass";

const showcaseItems = [
  {
    title: "Tropical Paradise",
    description:
      "A refreshing blend of mango, pineapple, and passion fruit that transports you to paradise.",
    image:
      "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "from-orange-600 to-yellow-600",
    flavor: "mango" as const,
    price: "$8.99",
  },
  {
    title: "Berry Bliss",
    description:
      "Antioxidant-rich strawberry and blueberry blend for the ultimate health boost.",
    image:
      "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "from-pink-600 to-red-600",
    flavor: "strawberry" as const,
    price: "$7.99",
  },
  {
    title: "Green Vitality",
    description:
      "Energizing green apple and spinach blend packed with vitamins and minerals.",
    image:
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "from-green-600 to-emerald-600",
    flavor: "apple" as const,
    price: "$9.99",
  },
];

export const ShowcaseSection: React.FC = () => {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Layer */}
      <ParallaxLayer speed={-0.3} zIndex={1}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        </div>
      </ParallaxLayer>

      <div className="relative z-10 container mx-auto px-6">
        <ParallaxSection delay={200}>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Signature Blends
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Handcrafted juice blends made from the finest organic fruits
            </p>
          </div>
        </ParallaxSection>

        <div className="space-y-32">
          {showcaseItems.map((item, index) => (
            <ShowcaseItem
              key={index}
              item={item}
              index={index}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ShowcaseItem: React.FC<{
  item: (typeof showcaseItems)[0];
  index: number;
  reverse: boolean;
}> = ({ item, index, reverse }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [hovered, setHovered] = React.useState(false);

  const contentSpring = useSpring({
    from: {
      opacity: 0,
      x: reverse ? 100 : -100,
      scale: 0.9,
    },
    to: inView
      ? {
          opacity: 1,
          x: 0,
          scale: 1,
        }
      : {
          opacity: 0,
          x: reverse ? 100 : -100,
          scale: 0.9,
        },
    config: { tension: 120, friction: 14 },
    delay: 300,
  });

  const imageSpring = useSpring({
    from: {
      opacity: 0,
      x: reverse ? -100 : 100,
      scale: 0.8,
      rotateY: reverse ? -15 : 15,
    },
    to: inView
      ? {
          opacity: 1,
          x: 0,
          scale: 1,
          rotateY: 0,
        }
      : {
          opacity: 0,
          x: reverse ? -100 : 100,
          scale: 0.8,
          rotateY: reverse ? -15 : 15,
        },
    config: { tension: 120, friction: 14 },
    delay: 500,
  });

  const hoverSpring = useSpring({
    transform: hovered ? "scale(1.05) rotateY(5deg)" : "scale(1) rotateY(0deg)",
    boxShadow: hovered
      ? "0 30px 60px rgba(0,0,0,0.4)"
      : "0 20px 40px rgba(0,0,0,0.2)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-16 items-center ${
        reverse ? "lg:grid-flow-col-dense" : ""
      }`}
    >
      {/* Content */}
      <animated.div
        style={contentSpring}
        className={reverse ? "lg:col-start-2" : ""}
      >
        <div className="space-y-6">
          <div
            className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-semibold`}
          >
            Signature Blend
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {item.title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="text-gray-300 ml-2">
              (4.9/5 from 1,200+ reviews)
            </span>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            {item.description}
          </p>
          <div className="text-3xl font-bold text-white">{item.price}</div>
          <div className="flex gap-4 pt-4">
            <button
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${item.color} rounded-full font-semibold text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300">
              <Star size={20} />
              Reviews
            </button>
          </div>
        </div>
      </animated.div>

      {/* Image */}
      <animated.div
        style={imageSpring}
        className={reverse ? "lg:col-start-1" : ""}
      >
        <div className="flex items-center justify-center">
          <div className="relative">
            <animated.div
              style={hoverSpring}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </animated.div>

            {/* Floating Juice Glass */}
            <div className="absolute -right-8 -bottom-8">
              <JuiceGlass
                flavor={item.flavor}
                size="large"
                delay={index * 200}
              />
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};
