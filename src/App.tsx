import React from "react";
import { Navigation } from "./components/Navigation";
import { ScrollProgress } from "./components/ScrollProgress";
import { HeroSection } from "./components/HeroSection";
import { FeatureSection } from "./components/FeatureSection";
import { ShowcaseSection } from "./components/ShowcaseSection";
import { ContactSection } from "./components/ContactSection";

function App() {
  return (
    <div className="relative">
      <ScrollProgress />
      <Navigation />

      <main>
        <div id="home">
          <HeroSection />
        </div>

        <div id="about">
          <FeatureSection />
        </div>

        <div id="juices">
          <ShowcaseSection />
        </div>

        <div id="contact">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold text-white mb-4">FreshJuice</div>
          <p className="text-gray-400 mb-6">
            Delivering fresh, natural fruit juices to your doorstep daily
          </p>
          <div className="border-t border-white/10 pt-6">
            <p className="text-gray-500 text-sm">
              © 2025 Created with ❤️ by Fareed
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
