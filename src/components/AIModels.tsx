'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

/* Simulated output based on prompt text */
function simulateOutput(prompt: string, style: string): string {
  if (!prompt.trim()) return '';
  const words = prompt.trim().split(/\s+/).slice(0, 6).join(' ');
  return `[GENERATING...]\n\nPrompt: "${words}"\nStyle: ${style}\n\n> Applying LoRA weights...\n> Denoising steps: 28/28\n> CFG scale: 7.5\n\n✓ OUTPUT READY\n  Resolution: 1024×1024\n  Steps: 28  Seed: ${Math.floor(Math.random() * 99999)}`;
}

export default function AIModels() {
  const { lang } = useLanguage();
  const c = content[lang].models;
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [prompts, setPrompts] = useState<Record<string, string>>({});
  const [outputs, setOutputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { setVisible(false); setTimeout(() => setVisible(true), 50); }, [lang]);

  const runDemo = (modelId: string, style: string) => {
    const prompt = prompts[modelId] || '';
    if (!prompt.trim()) return;
    setLoading((prev) => ({ ...prev, [modelId]: true }));
    setOutputs((prev) => ({ ...prev, [modelId]: '' }));

    // Simulate generation delay
    setTimeout(() => {
      const result = simulateOutput(prompt, style);
      let i = 0;
      const interval = setInterval(() => {
        setOutputs((prev) => ({ ...prev, [modelId]: result.slice(0, i) }));
        i += 3;
        if (i > result.length) {
          setOutputs((prev) => ({ ...prev, [modelId]: result }));
          setLoading((prev) => ({ ...prev, [modelId]: false }));
          clearInterval(interval);
        }
      }, 18);
    }, 800);
  };

  return (
    <section
      id="models"
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

        {/* Model cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {c.items.map((model, i) => (
            <div
              key={`${lang}-${model.id}`}
              className="pixel-border"
              style={{
                padding: '28px 24px',
                background: 'rgba(255,59,47,0.02)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'var(--grid-2col)', gap: 'var(--grid-gap-lg)' }}>

                {/* Left: Model info */}
                <div>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        background: model.color,
                        boxShadow: `0 0 6px ${model.color}`,
                        animation: 'blink 1.2s step-end infinite',
                        flexShrink: 0,
                        imageRendering: 'pixelated',
                      }}
                    />
                    <h3
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '10px',
                        color: model.color,
                        textShadow: `0 0 8px ${model.color}80`,
                        letterSpacing: '1px',
                      }}
                    >
                      {model.name}
                    </h3>
                  </div>

                  <div
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '9px',
                      color: '#FF3B2F',
                      border: '1px solid #330000',
                      display: 'inline-block',
                      padding: '2px 6px',
                      marginBottom: '16px',
                      letterSpacing: '1px',
                    }}
                  >
                    {model.type}
                  </div>

                  <p
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '11px',
                      color: '#660000',
                      lineHeight: 1.8,
                      marginBottom: '16px',
                    }}
                  >
                    {model.style}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {model.tags.map((tag) => (
                      <span key={tag} className="pixel-tag" style={{ borderColor: model.color + '40', color: model.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Sample image placeholders */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        style={{
                          width: '56px',
                          height: '56px',
                          border: `1px solid ${model.color}30`,
                          background: `${model.color}08`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          imageRendering: 'pixelated',
                        }}
                      >
                        <span style={{ fontSize: '8px', color: model.color + '40', fontFamily: "'Share Tech Mono'" }}>
                          IMG{n}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Interactive demo */}
                <div>
                  <div
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '9px',
                      color: '#660000',
                      marginBottom: '10px',
                      letterSpacing: '1px',
                    }}
                  >
                    // INTERACTIVE DEMO
                  </div>

                  <textarea
                    value={prompts[model.id] || ''}
                    onChange={(e) => setPrompts((prev) => ({ ...prev, [model.id]: e.target.value }))}
                    placeholder={model.placeholder}
                    rows={3}
                    className="pixel-input"
                    style={{
                      resize: 'none',
                      marginBottom: '10px',
                      fontSize: '10px',
                      lineHeight: 1.6,
                    }}
                  />

                  <button
                    className="pixel-btn"
                    onClick={() => runDemo(model.id, model.type)}
                    disabled={loading[model.id]}
                    style={{
                      borderColor: model.color,
                      color: model.color,
                      boxShadow: `0 0 8px ${model.color}30`,
                      fontSize: '8px',
                      marginBottom: '12px',
                      width: '100%',
                      opacity: loading[model.id] ? 0.6 : 1,
                    }}
                  >
                    {loading[model.id] ? '[ GENERATING... ]' : '[ RUN_DEMO ]'}
                  </button>

                  {/* Output terminal */}
                  <div
                    style={{
                      background: '#050000',
                      border: '1px solid #1a0000',
                      padding: '12px',
                      minHeight: '80px',
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '9px',
                      color: '#660000',
                      lineHeight: 1.7,
                      whiteSpace: 'pre',
                      overflowY: 'auto',
                      maxHeight: '120px',
                    }}
                  >
                    {outputs[model.id] || (
                      <span style={{ color: '#330000' }}>// Enter a prompt and run demo...</span>
                    )}
                    {loading[model.id] && <span className="cursor-blink" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
