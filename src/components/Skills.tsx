'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

export default function Skills() {
  const { lang } = useLanguage();
  const c = content[lang].skills;
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { setVisible(false); setTimeout(() => setVisible(true), 50); }, [lang]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ minHeight: '100vh', padding: 'var(--section-py) var(--section-px)' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="section-subtitle" style={{ marginBottom: '12px' }}>{c.subtitle}</div>
          <h2 className="section-title glitch-text" data-text={c.title}>{c.title}</h2>
          <div style={{ width: '60px', height: '2px', background: '#FF3B2F', marginTop: '16px', boxShadow: '0 0 8px rgba(255,59,47,0.6)' }} />
        </div>

        {/* Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--grid-3col)', gap: 'var(--grid-gap-lg)' }}>
          {c.categories.map((cat, ci) => (
            <div
              key={`${lang}-cat-${ci}`}
              className="pixel-border-dim"
              style={{
                padding: '24px 20px',
                background: 'rgba(255,59,47,0.02)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${ci * 0.15}s, transform 0.5s ease ${ci * 0.15}s`,
              }}
            >
              {/* Category title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <span style={{ fontSize: '16px', color: '#FF3B2F' }}>{cat.icon}</span>
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '9px',
                    color: '#FF3B2F',
                    textShadow: '0 0 6px rgba(255,59,47,0.6)',
                    letterSpacing: '1px',
                  }}
                >
                  {cat.name}
                </span>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {cat.skills.map((skill, si) => (
                  <div key={`${lang}-skill-${si}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: '10px',
                          color: '#ff6b5b',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: '9px',
                          color: '#660000',
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    {/* Segmented bar (pixel art style) */}
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {Array.from({ length: 20 }).map((_, idx) => {
                        const threshold = (idx + 1) * 5;
                        const filled = skill.level >= threshold;
                        return (
                          <div
                            key={idx}
                            style={{
                              flex: 1,
                              height: '6px',
                              background: filled ? '#FF3B2F' : '#0d0000',
                              boxShadow: filled ? '0 0 4px rgba(255,59,47,0.5)' : 'none',
                              opacity: visible ? 1 : 0,
                              transition: `opacity 0.05s ease ${0.4 + ci * 0.15 + idx * 0.025}s`,
                              imageRendering: 'pixelated',
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal log decoration */}
        <div
          style={{
            marginTop: '40px',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '9px',
            color: '#330000',
            lineHeight: 1.8,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease 0.6s',
          }}
        >
          <span style={{ color: '#FF3B2F' }}>&gt;</span> skills.load() — <span style={{ color: '#660000' }}>SUCCESS</span><br />
          <span style={{ color: '#FF3B2F' }}>&gt;</span> models.init() — <span style={{ color: '#660000' }}>SUCCESS</span><br />
          <span style={{ color: '#FF3B2F' }}>&gt;</span> canvas.render() — <span style={{ color: '#660000' }}>ACTIVE</span><br />
          <span style={{ color: '#FF3B2F' }}>&gt;</span> <span className="cursor-blink" />
        </div>
      </div>
    </section>
  );
}
