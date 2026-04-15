'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import TypewriterText from './TypewriterText';

export default function About() {
  const { lang } = useLanguage();
  const c = content[lang].about;
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { setVisible(false); setTimeout(() => setVisible(true), 50); }, [lang]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ minHeight: '100vh', padding: 'var(--section-py) var(--section-px)', display: 'flex', alignItems: 'center' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="section-subtitle" style={{ marginBottom: '12px' }}>
            {c.subtitle}
          </div>
          <h2 className="section-title glitch-text" data-text={c.title}>
            {c.title}
          </h2>
          <div style={{ width: '60px', height: '2px', background: '#FF3B2F', marginTop: '16px', boxShadow: '0 0 8px rgba(255,59,47,0.6)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--grid-2col)', gap: 'var(--grid-gap-xl)', alignItems: 'start' }}>

          {/* Bio */}
          <div>
            {c.bio.map((line, i) => (
              <p
                key={`${lang}-bio-${i}`}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '12px',
                  color: '#ff6b5b',
                  lineHeight: 2,
                  marginBottom: '20px',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
                }}
              >
                {visible && i === 0 ? (
                  <TypewriterText text={line} speed={30} showCursor={false} />
                ) : line}
              </p>
            ))}

            {/* ASCII decoration */}
            <pre
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '9px',
                color: '#330000',
                lineHeight: 1.5,
                marginTop: '24px',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.5s ease 0.6s',
              }}
            >
{`┌──────────────────────────┐
│  [SYSTEM: ONLINE]        │
│  [STATUS: AVAILABLE]     │
│  [MODE: FREELANCE]       │
└──────────────────────────┘`}
            </pre>
          </div>

          {/* Stats grid */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '32px' }}>
              {c.stats.map((stat, i) => (
                <div
                  key={`${lang}-stat-${i}`}
                  className="pixel-border"
                  style={{
                    padding: '20px 16px',
                    textAlign: 'center',
                    background: 'rgba(255,59,47,0.03)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1)' : 'scale(0.9)',
                    transition: `opacity 0.4s ease ${0.3 + i * 0.1}s, transform 0.4s ease ${0.3 + i * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '22px',
                      color: '#FF3B2F',
                      textShadow: '0 0 12px rgba(255,59,47,0.8)',
                      marginBottom: '8px',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '9px',
                      color: '#660000',
                      letterSpacing: '1px',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar decoration */}
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#330000', marginBottom: '8px' }}>
              // LOADING PORTFOLIO...
            </div>
            {[85, 70, 92, 60].map((v, i) => (
              <div key={i} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="skill-bar-track" style={{ flex: 1, height: '6px', background: '#0d0000' }}>
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: visible ? `${v}%` : '0%',
                      transition: `width 1s ease ${0.4 + i * 0.1}s`,
                      height: '100%',
                    }}
                  />
                </div>
                <span style={{ fontSize: '8px', color: '#330000', minWidth: '26px' }}>{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
