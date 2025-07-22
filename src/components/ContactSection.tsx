import React, { useState } from 'react';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { Mail, Phone, MapPin, Send, CheckCircle, Truck } from 'lucide-react';
import { ParallaxLayer } from './ParallaxLayer';
import { ParallaxSection } from './ParallaxSection';
import { JuiceGlass } from './JuiceGlass';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@freshjuice.com', color: 'text-orange-400' },
  { icon: Phone, label: 'Phone', value: '+1 (555) FRESH-99', color: 'text-green-400' },
  { icon: MapPin, label: 'Location', value: 'Fresh Valley, CA', color: 'text-yellow-400' },
  { icon: Truck, label: 'Delivery', value: 'Same-day delivery', color: 'text-red-400' }
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const trail = useTrail(contactInfo.length, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 14 },
    delay: 600
  });

  const formSpring = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 120, friction: 14 },
    delay: 800
  });

  const successSpring = useSpring({
    opacity: isSubmitted ? 1 : 0,
    scale: isSubmitted ? 1 : 0.8,
    config: { tension: 300, friction: 20 }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Layer */}
      <ParallaxLayer speed={-0.2} zIndex={1}>
        <div
          className="w-full h-[120%] bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-orange-900/90 to-black/95" />
      </ParallaxLayer>

      {/* Floating Particles */}
      <ParallaxLayer speed={-0.4} zIndex={2}>
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-400 rounded-full opacity-60" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-green-400 rounded-full opacity-40" />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-yellow-400 rounded-full opacity-50" />
        <div className="absolute top-1/2 right-20 w-4 h-4 bg-red-400 rounded-full opacity-30" />
        
        {/* Floating Juice Glasses */}
        <div className="absolute top-40 left-32">
          <JuiceGlass flavor="orange" size="small" delay={0} />
        </div>
        <div className="absolute bottom-60 right-40">
          <JuiceGlass flavor="grape" size="small" delay={800} />
        </div>
      </ParallaxLayer>

      <div className="relative z-10 container mx-auto px-6">
        <ParallaxSection delay={200}>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get Fresh Juice Delivered
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to taste the difference? Contact us for fresh juice delivery or visit our store.
            </p>
          </div>
        </ParallaxSection>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <ParallaxSection delay={400}>
              <h3 className="text-3xl font-bold text-white mb-8">Contact FreshJuice</h3>
            </ParallaxSection>
            
            <div className="space-y-6">
              {trail.map((style, index) => (
                <animated.div key={index} style={style}>
                  <ContactInfoCard info={contactInfo[index]} />
                </animated.div>
              ))}
            </div>

            <ParallaxSection delay={1000}>
              <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h4 className="text-xl font-semibold text-white mb-4">Why Choose FreshJuice?</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-green-400" size={20} />
                    100% Organic & Natural Ingredients
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-green-400" size={20} />
                    Same-Day Fresh Delivery Service
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-green-400" size={20} />
                    Award-Winning Taste & Quality
                  </li>
                </ul>
              </div>
            </ParallaxSection>
          </div>

          {/* Contact Form */}
          <animated.div style={formSpring}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <FormInput
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <FormInput
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
                
                <FormTextarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  required
                />

                <SubmitButton />
              </form>

              {/* Success Message */}
              <animated.div
                style={successSpring}
                className="absolute inset-0 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-green-400/30"
              >
                <div className="text-center text-white">
                  <CheckCircle className="mx-auto mb-4 text-green-400" size={48} />
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-gray-300">We'll get back to you soon.</p>
                </div>
              </animated.div>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
};

const ContactInfoCard: React.FC<{ info: typeof contactInfo[0] }> = ({ info }) => {
  const [hovered, setHovered] = useState(false);

  const cardSpring = useSpring({
    transform: hovered ? 'translateX(8px)' : 'translateX(0px)',
    backgroundColor: hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div
      style={cardSpring}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 p-4 rounded-xl border border-white/10 cursor-pointer"
    >
      <div className={`p-3 rounded-full bg-white/10 ${info.color}`}>
        <info.icon size={24} />
      </div>
      <div>
        <h4 className="font-semibold text-white">{info.label}</h4>
        <p className="text-gray-400">{info.value}</p>
      </div>
    </animated.div>
  );
};

const FormInput: React.FC<{
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}> = ({ name, type = 'text', placeholder, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);

  const inputSpring = useSpring({
    borderColor: focused ? 'rgba(251, 146, 60, 0.5)' : 'rgba(255, 255, 255, 0.2)',
    backgroundColor: focused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.input
      style={inputSpring}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      required={required}
      className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300 border"
    />
  );
};

const FormTextarea: React.FC<{
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
  required?: boolean;
}> = ({ name, placeholder, value, onChange, rows, required }) => {
  const [focused, setFocused] = useState(false);

  const textareaSpring = useSpring({
    borderColor: focused ? 'rgba(251, 146, 60, 0.5)' : 'rgba(255, 255, 255, 0.2)',
    backgroundColor: focused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.textarea
      style={textareaSpring}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      rows={rows}
      required={required}
      className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300 border resize-none"
    />
  );
};

const SubmitButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const buttonSpring = useSpring({
    transform: hovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: hovered 
      ? '0 10px 30px rgba(251, 146, 60, 0.4)'
      : '0 5px 15px rgba(251, 146, 60, 0.2)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.button
      style={buttonSpring}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      type="submit"
      className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-white hover:from-orange-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2"
    >
      <Send size={20} />
      Order Now
    </animated.button>
  );
};