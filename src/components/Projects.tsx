'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

export default function Projects() {
  const { lang } = useLanguage();
  const c = content[lang].projects;
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { setVisible(false); setTimeout(() => setVisible(true), 50); }, [lang]);

  return (
    <section
      id="work"
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

        {/* Projects grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--grid-2col)', gap: '2px' }}>
          {c.items.map((project, i) => {
            const isHov = hovered === project.id;
            return (
              <div
                key={`${lang}-${project.id}`}
                className="pixel-border-dim"
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHov ? 'rgba(255,59,47,0.06)' : 'rgba(255,59,47,0.02)',
                  padding: '28px 24px',
                  cursor: 'none',
                  transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
                  transform: isHov ? 'translate(-2px,-2px)' : 'none',
                  borderColor: isHov ? '#FF3B2F' : '#330000',
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {/* ID + Category */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '20px',
                      color: isHov ? '#FF3B2F' : '#330000',
                      textShadow: isHov ? '0 0 12px rgba(255,59,47,0.6)' : 'none',
                      transition: 'color 0.2s, text-shadow 0.2s',
                    }}
                  >
                    {project.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '8px',
                      color: '#FF3B2F',
                      border: '1px solid #330000',
                      padding: '2px 6px',
                      letterSpacing: '1px',
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '11px',
                    color: isHov ? '#FF3B2F' : '#ff6b5b',
                    marginBottom: '12px',
                    lineHeight: 1.6,
                    transition: 'color 0.2s',
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '11px',
                    color: '#660000',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="pixel-tag">{tag}</span>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#330000' }}>
                    {project.year}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '9px',
                      color: isHov ? '#FF3B2F' : '#330000',
                      letterSpacing: '1px',
                      transition: 'color 0.2s',
                    }}
                  >
                    {isHov ? '[ VIEW → ]' : '[ · · · ]'}
                  </span>
                </div>

                {/* Animated bottom border on hover */}
                {isHov && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: '2px',
                      width: '100%',
                      background: 'linear-gradient(90deg, transparent, #FF3B2F, transparent)',
                      animation: 'none',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* View all */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#330000', marginBottom: '12px' }}>
            // MORE WORKS IN PROGRESS...
          </div>
          <button className="pixel-btn" style={{ borderColor: '#330000', color: '#660000', boxShadow: 'none', fontSize: '8px' }}>
            [ VIEW_ALL_PROJECTS ]
          </button>
        </div>
      </div>
    </section>
  );
}
