'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CRTOverlay from '@/components/CRTOverlay';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import AIModels from '@/components/AIModels';
import Contact from '@/components/Contact';
import Blog from '@/components/Blog';

export default function Home() {
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';
  const mainRef = useRef<HTMLDivElement>(null);

  /* Apply direction + margin to main content when language changes */
  useEffect(() => {
    if (!mainRef.current) return;
    const main = mainRef.current;
    if (isRTL) {
      main.style.marginLeft = '0';
      main.style.marginRight = 'var(--sidebar-width)';
      main.style.direction = 'rtl';
    } else {
      main.style.marginLeft = 'var(--sidebar-width)';
      main.style.marginRight = '0';
      main.style.direction = 'ltr';
    }

    /* Glitch on language switch */
    main.style.animation = 'glitch 0.35s ease-in-out';
    const t = setTimeout(() => { main.style.animation = ''; }, 380);
    return () => clearTimeout(t);
  }, [isRTL]);

  return (
    <>
      <CRTOverlay />
      <Sidebar />

      <div
        ref={mainRef}
        id="main-content"
        style={{
          marginLeft: 'var(--sidebar-width)',
          minHeight: '100vh',
          background: '#000',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section dividers */}
        <Hero />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #330000 20%, #FF3B2F 50%, #330000 80%, transparent)' }} />

        <About />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #330000 20%, #FF3B2F 50%, #330000 80%, transparent)' }} />

        <Projects />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #330000 20%, #FF3B2F 50%, #330000 80%, transparent)' }} />

        <Skills />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #330000 20%, #FF3B2F 50%, #330000 80%, transparent)' }} />

        <AIModels />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #330000 20%, #FF3B2F 50%, #330000 80%, transparent)' }} />

        <Contact />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #330000 20%, #FF3B2F 50%, #330000 80%, transparent)' }} />

        <Blog />

        {/* Footer */}
        <footer
          style={{
            borderTop: '1px solid #1a0000',
            padding: '20px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#000',
          }}
        >
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', color: '#330000' }}>
            © 2024 AZEEIMA.PORTFOLIO — ALL RIGHTS RESERVED
          </span>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', color: '#330000' }}>
            BUILT WITH NEXT.JS + CANVAS API
          </span>
        </footer>
      </div>
    </>
  );
}
