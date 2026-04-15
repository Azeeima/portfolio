'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

const sections = ['home', 'about', 'work', 'skills', 'models', 'contact', 'blog'] as const;
type Section = typeof sections[number];

/* ── Pixel-art SVG icons ─────────────────────────────────── */
const icons: Record<Section, JSX.Element> = {
  home: (
    <svg width="18" height="18" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
      <rect x="3" y="0" width="2" height="1"/><rect x="2" y="1" width="4" height="1"/>
      <rect x="1" y="2" width="6" height="1"/><rect x="0" y="3" width="8" height="1"/>
      <rect x="1" y="4" width="6" height="4"/><rect x="3" y="5" width="2" height="3"/>
    </svg>
  ),
  about: (
    <svg width="18" height="18" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
      <rect x="3" y="0" width="2" height="2"/><rect x="2" y="1" width="4" height="2"/>
      <rect x="3" y="3" width="2" height="1"/><rect x="1" y="4" width="6" height="1"/>
      <rect x="0" y="5" width="8" height="3"/>
    </svg>
  ),
  work: (
    <svg width="18" height="18" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="1" width="8" height="5"/><rect x="1" y="2" width="6" height="3" fill="#000"/>
      <rect x="3" y="6" width="2" height="1"/><rect x="2" y="7" width="4" height="1"/>
    </svg>
  ),
  skills: (
    <svg width="18" height="18" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
      <rect x="3" y="0" width="2" height="3"/><rect x="1" y="2" width="6" height="2"/>
      <rect x="2" y="4" width="4" height="1"/><rect x="3" y="5" width="2" height="3"/>
    </svg>
  ),
  models: (
    <svg width="18" height="18" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
      <rect x="1" y="1" width="2" height="2"/><rect x="5" y="1" width="2" height="2"/>
      <rect x="3" y="2" width="2" height="1"/><rect x="3" y="4" width="2" height="1"/>
      <rect x="1" y="5" width="2" height="2"/><rect x="5" y="5" width="2" height="2"/>
      <rect x="0" y="2" width="1" height="1"/><rect x="7" y="2" width="1" height="1"/>
    </svg>
  ),
  contact: (
    <svg width="18" height="18" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="1" width="8" height="6"/>
      <rect x="1" y="2" width="1" height="1" fill="#000"/><rect x="6" y="2" width="1" height="1" fill="#000"/>
      <rect x="2" y="3" width="1" height="1" fill="#000"/><rect x="5" y="3" width="1" height="1" fill="#000"/>
      <rect x="3" y="4" width="2" height="1" fill="#000"/>
    </svg>
  ),
  blog: (
    <svg width="18" height="18" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
      <rect x="1" y="0" width="6" height="8"/><rect x="2" y="1" width="4" height="1" fill="#000"/>
      <rect x="2" y="3" width="4" height="1" fill="#000"/><rect x="2" y="5" width="3" height="1" fill="#000"/>
    </svg>
  ),
};

export default function Sidebar() {
  const { lang, toggleLang } = useLanguage();
  const c = content[lang];
  const isRTL = lang === 'ar';
  const [active, setActive] = useState<Section>('home');

  /* ── Track active section on scroll ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as Section);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLabels: Record<Section, string> = {
    home: c.nav.home,
    about: c.nav.about,
    work: c.nav.work,
    skills: c.nav.skills,
    models: c.nav.models,
    contact: c.nav.contact,
    blog: c.nav.blog,
  };

  const scrollTo = (id: Section) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside
      className="sidebar-left"
      style={{
        position: 'fixed',
        top: 0,
        [isRTL ? 'right' : 'left']: 0,
        width: 'var(--sidebar-width)',
        height: '100vh',
        background: '#000',
        borderRight: isRTL ? 'none' : '1px solid #330000',
        borderLeft: isRTL ? '1px solid #330000' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '20px',
        paddingBottom: '20px',
        zIndex: 1000,
        boxShadow: isRTL
          ? '-4px 0 20px rgba(255,59,47,0.08)'
          : '4px 0 20px rgba(255,59,47,0.08)',
      }}
    >
      {/* Logo mark */}
      <div className="sidebar-logo" style={{ textAlign: 'center', marginBottom: '8px' }}>
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '11px',
            color: '#FF3B2F',
            textShadow: '0 0 8px rgba(255,59,47,0.8)',
            lineHeight: 1.4,
          }}
        >
          A<br />Z<br />I
        </div>
      </div>

      {/* Divider */}
      <div className="sidebar-divider" style={{ width: '40px', height: '1px', background: '#330000', margin: '4px 0 12px' }} />

      {/* Nav icons */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        {sections.map((id) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              title={navLabels[id]}
              aria-label={navLabels[id]}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'none',
                padding: '8px',
                color: isActive ? '#FF3B2F' : '#330000',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.15s',
                filter: isActive ? 'drop-shadow(0 0 6px rgba(255,59,47,0.8))' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#ff6b5b';
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#330000';
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <span
                  aria-hidden
                  className="sidebar-active-ind"
                  style={{
                    position: 'absolute',
                    [isRTL ? 'right' : 'left']: '-1px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '18px',
                    background: '#FF3B2F',
                    boxShadow: '0 0 8px rgba(255,59,47,0.8)',
                    imageRendering: 'pixelated',
                  }}
                />
              )}
              {icons[id]}
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="sidebar-divider" style={{ width: '40px', height: '1px', background: '#330000', margin: '12px 0 8px' }} />

      {/* Language toggle */}
      <button
        onClick={toggleLang}
        aria-label="Toggle language"
        style={{
          background: 'transparent',
          border: '1px solid #330000',
          color: '#FF3B2F',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '7px',
          padding: '6px 4px',
          cursor: 'none',
          width: '44px',
          textAlign: 'center',
          letterSpacing: '0.5px',
          transition: 'all 0.15s',
          lineHeight: 1.6,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#FF3B2F';
          (e.currentTarget as HTMLButtonElement).style.color = '#000';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          (e.currentTarget as HTMLButtonElement).style.color = '#FF3B2F';
        }}
      >
        {lang === 'en' ? 'ع' : 'EN'}
      </button>
    </aside>
  );
}
