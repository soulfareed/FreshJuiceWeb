# 🥤 FreshJuice - Animated Parallax Landing Page

A stunning, modern fruit juice website built with React and react-spring, featuring smooth parallax scrolling animations and interactive juice glass elements.

## 🌟 Live Demo

**🚀 [View Live Website](https://startling-jalebi-7e3a76.netlify.app)**

## ✨ Features

### 🎨 Visual Design

- **Modern Glass Morphism UI** with backdrop blur effects
- **Vibrant Fruit-Themed Color Palette** (orange, green, yellow gradients)
- **High-Quality Background Images** from Pexels
- **Responsive Design** optimized for all devices
- **Dark Theme** with colorful accents

### 🎭 Animations & Interactions

- **Smooth Parallax Scrolling** with multiple layers at different speeds
- **Animated Juice Glasses** with realistic filling effects and bubbles
- **Floating Fruit Elements** with natural movement patterns
- **Scroll Progress Indicator** at the top of the page
- **Fade-in Animations** when sections enter viewport
- **Hover Effects** with 3D transforms and scaling
- **Staggered Animations** for multiple elements

### 🧩 Components

- **Interactive Navigation** with smooth scroll to sections
- **Hero Section** with animated juice glasses and call-to-action
- **Feature Cards** highlighting product benefits
- **Product Showcase** with pricing and reviews
- **Contact Form** with animated inputs and success states
- **Scroll-based Animations** throughout the site

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **React Spring** - Physics-based animations
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd freshjuice-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🎨 Key Components

### ParallaxLayer Component

- **Multiple Speed Layers**: Background (-0.5x), Midground (-0.3x), Foreground (1x)
- **Smooth Performance**: GPU-accelerated transforms
- **Scroll-based Movement**: Uses react-spring's useScroll hook

### ParallaxSection Component

- **Intersection Observer**: Triggers animations when in view
- **4 Fade Directions**: Up, Down, Left, Right
- **Configurable Delays**: Staggered animation timing
- **Spring Physics**: Natural, bouncy animations

## 🎯 Animation Details

### Parallax Effects

- **Background Images**: Move at 50% scroll speed for depth
- **Floating Elements**: Move at 70% scroll speed
- **Content**: Moves at normal scroll speed
- **Performance**: Uses `transform3d` for GPU acceleration

### Scroll Animations

- **Fade In**: Elements fade in as they enter viewport
- **Scale Transform**: Elements scale from 0.8 to 1.0
- **Slide Effects**: Elements slide in from different directions
- **Staggered Timing**: Multiple elements animate in sequence

### Interactive Elements

- **Hover States**: Scale and rotation transforms
- **Focus States**: Color and shadow changes
- **Form Interactions**: Input focus animations
- **Button Effects**: Gradient shifts and shadows

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Large tap targets and smooth scrolling
- **Performance**: Reduced animations on mobile for better performance

## ♿ Accessibility

- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Clear focus states
- **Color Contrast**: WCAG compliant color ratios
- **Screen Reader**: Semantic HTML and ARIA labels

## 🚀 Deployment

This site is deployed on **Netlify** with automatic builds from the main branch.

**Live URL**: [https://startling-jalebi-7e3a76.netlify.app](https://startling-jalebi-7e3a76.netlify.app)

### Deploy Your Own

1. **Fork this repository**
2. **Connect to Netlify**
3. **Set build command**: `npm run build`
4. **Set publish directory**: `dist`
5. **Deploy automatically** on every push

## 🎨 Customization

### Colors

Update the color scheme in `tailwind.config.js` and CSS custom properties in `index.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #fb923c, #f97316);
  --secondary-gradient: linear-gradient(135deg, #22c55e, #16a34a);
  --accent-gradient: linear-gradient(135deg, #eab308, #f59e0b);
}
```

### Animations

Modify animation timing and effects in component files:

```typescript
const springs = useSpring({
  config: { tension: 120, friction: 14 }, // Adjust for different feel
  delay: 300, // Stagger timing
});
```

### Content

Update text content, images, and product information in component files.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Made with ❤️ by Fareed** 🍊🍎🍇🍓🥭
