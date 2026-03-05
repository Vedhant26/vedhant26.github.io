import React, { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import NewAboutPage from './new-about/NewAboutPage';
import Skills from './components/Skills';
import Projects from './components/Projects';
import HallOfFame from './components/HallOfFame';

import PageWrapper from './components/PageWrapper';
import Services from './components/Services';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';

import Marquee from './components/Marquee';
import FeaturedWork from './components/FeaturedWork';
import BasketballGame from './components/BasketballGame';
import useScrollAnimations from './hooks/useScrollAnimations';

// Page Components
const HomePage = () => {
  const homeRef = useRef(null);
  useScrollAnimations(homeRef);

  return (
    <PageWrapper>
      <div ref={homeRef}>
        <div style={{ marginTop: '-100px' }}>
          <Hero />
        </div>
        <Marquee />
        <FeaturedWork />
        <Services />
        <Testimonials />
        <BasketballGame />
      </div>
    </PageWrapper>
  );
};

const AboutPage = () => (
  <PageWrapper>
    <About />
    <Skills />
  </PageWrapper>
);

const WorkPage = () => (
  <PageWrapper>
    <Projects />
  </PageWrapper>
);

const JourneyPage = () => (
  <PageWrapper>
    <Experience />
    <HallOfFame />
  </PageWrapper>
);



function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<NewAboutPage />} />
          <Route path="/projects" element={<WorkPage />} />
          <Route path="/journey" element={<JourneyPage />} />

        </Routes>
      </AnimatePresence>

      {/* Footer only on non-home pages? Or always? Let's keep it simple for now, maybe remove from fixed view if it interferes */}
      {location.pathname !== '/' && (
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Vedhant Bidari. Crafted with Momentum & Precision.</p>
        </footer>
      )}
    </div>
  );
}

export default App;
