'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

export default function Contact() {
  const { lang } = useLanguage();
  const c = content[lang].contact;
  const isRTL = lang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { setVisible(false); setTimeout(() => setVisible(true), 50); }, [lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1600);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ minHeight: '100vh', padding: '80px 40px' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="section-subtitle" style={{ marginBottom: '12px' }}>{c.subtitle}</div>
          <h2 className="section-title glitch-text" data-text={c.title}>{c.title}</h2>
          <div style={{ width: '60px', height: '2px', background: '#FF3B2F', marginTop: '16px', boxShadow: '0 0 8px rgba(255,59,47,0.6)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>

          {/* Left: info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <p
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '12px',
                color: '#660000',
                lineHeight: 1.9,
                marginBottom: '32px',
              }}
            >
              {c.description}
            </p>

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
              {c.links.map((link, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <span style={{ fontSize: '14px', color: '#FF3B2F', minWidth: '20px' }}>{link.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: '#330000', marginBottom: '2px' }}>
                      {link.label}
                    </div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#ff6b5b' }}>
                      {link.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ASCII art */}
            <pre
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '8px',
                color: '#330000',
                lineHeight: 1.4,
              }}
            >
{`  ╔═══════════════════╗
  ║  STATUS: ONLINE   ║
  ║  PING: 01ms       ║
  ║  PORT: OPEN       ║
  ╚═══════════════════╝`}
            </pre>
          </div>

          {/* Right: form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s',
            }}
          >
            {sent ? (
              <div
                className="pixel-border"
                style={{
                  padding: '32px 24px',
                  textAlign: 'center',
                  background: 'rgba(255,59,47,0.05)',
                }}
              >
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '11px', color: '#FF3B2F', marginBottom: '16px' }}>
                  ✓ MESSAGE_SENT
                </div>
                <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#660000', lineHeight: 1.8 }}>
                  {lang === 'en'
                    ? 'Transmission received. I will respond within 24hrs.'
                    : 'تم استلام الرسالة. سأرد خلال ٢٤ ساعة.'}
                </p>
                <button
                  className="pixel-btn"
                  style={{ marginTop: '20px', fontSize: '8px' }}
                  onClick={() => setSent(false)}
                >
                  [ NEW_MESSAGE ]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} dir={isRTL ? 'rtl' : 'ltr'}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#330000', display: 'block', marginBottom: '4px' }}>
                      {c.fields.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="pixel-input"
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#330000', display: 'block', marginBottom: '4px' }}>
                      {c.fields.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="pixel-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#330000', display: 'block', marginBottom: '4px' }}>
                    {c.fields.subject}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                    className="pixel-input"
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#330000', display: 'block', marginBottom: '4px' }}>
                    {c.fields.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="pixel-input"
                    style={{ resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  className="pixel-btn"
                  disabled={sending}
                  style={{ width: '100%', opacity: sending ? 0.6 : 1 }}
                >
                  {sending ? '[ TRANSMITTING... ]' : c.fields.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
