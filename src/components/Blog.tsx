'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

export default function Blog() {
  const { lang } = useLanguage();
  const c = content[lang].blog;
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

  const catColors: Record<string, string> = {
    TUTORIAL: '#00FF9F',
    ESSAY: '#B44FFF',
    CODE: '#FF3B2F',
    'برنامج تعليمي': '#00FF9F',
    'مقال': '#B44FFF',
    'كود': '#FF3B2F',
  };

  return (
    <section
      id="blog"
      ref={sectionRef}
      style={{ minHeight: '100vh', padding: '80px 40px 120px' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="section-subtitle" style={{ marginBottom: '12px' }}>{c.subtitle}</div>
          <h2 className="section-title glitch-text" data-text={c.title}>{c.title}</h2>
          <div style={{ width: '60px', height: '2px', background: '#FF3B2F', marginTop: '16px', boxShadow: '0 0 8px rgba(255,59,47,0.6)' }} />
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {c.posts.map((post, i) => {
            const isHov = hovered === post.id;
            const catColor = catColors[post.category] || '#FF3B2F';
            return (
              <div
                key={`${lang}-${post.id}`}
                className="pixel-border-dim"
                onMouseEnter={() => setHovered(post.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '24px',
                  background: isHov ? 'rgba(255,59,47,0.05)' : 'rgba(255,59,47,0.01)',
                  cursor: 'none',
                  transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
                  transform: isHov ? 'translateX(4px)' : 'none',
                  borderColor: isHov ? '#FF3B2F' : '#330000',
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 0.12}s`,
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '20px',
                  alignItems: 'start',
                }}
              >
                <div>
                  {/* Meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '8px',
                        color: catColor,
                        border: `1px solid ${catColor}40`,
                        padding: '2px 6px',
                        letterSpacing: '1px',
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', color: '#330000' }}>
                      {post.date}
                    </span>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', color: '#330000' }}>
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '10px',
                      color: isHov ? '#FF3B2F' : '#ff6b5b',
                      lineHeight: 1.7,
                      marginBottom: '12px',
                      transition: 'color 0.2s',
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '11px',
                      color: '#660000',
                      lineHeight: 1.8,
                      marginBottom: '14px',
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {post.tags.map((tag) => (
                      <span key={tag} className="pixel-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '14px',
                    color: isHov ? '#FF3B2F' : '#330000',
                    transition: 'color 0.2s, transform 0.2s',
                    transform: isHov ? 'translateX(4px)' : 'none',
                    marginTop: '4px',
                    textShadow: isHov ? '0 0 8px rgba(255,59,47,0.6)' : 'none',
                  }}
                >
                  →
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer terminal */}
        <div
          style={{
            marginTop: '48px',
            padding: '20px',
            border: '1px solid #1a0000',
            background: '#030000',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '9px',
            color: '#330000',
            lineHeight: 1.8,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease 0.5s',
          }}
        >
          <span style={{ color: '#FF3B2F' }}>C:\AZEEIMA.PORTFOLIO&gt;</span> dir /blog<br />
          <span style={{ color: '#660000' }}>  Volume: PORTFOLIO  Serial: FF3B2F</span><br />
          <span style={{ color: '#660000' }}>  3 file(s) found  |  More coming...</span><br />
          <span style={{ color: '#FF3B2F' }}>C:\AZEEIMA.PORTFOLIO&gt;</span> <span className="cursor-blink" />
        </div>
      </div>
    </section>
  );
}
