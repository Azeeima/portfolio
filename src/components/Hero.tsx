'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import TypewriterText from './TypewriterText';

interface Particle {
  origX: number;
  origY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  // per-particle personality
  repelRadius: number;
  spring: number;
  friction: number;
  drawSize: number;
}

const STEP = 4;            // sample every 4px
const BASE_SQUARE = STEP - 1; // 3px base draw size
const REPEL_FORCE = 2.2;   // toned-down repel intensity
const MAX_W = 900;
const MAX_H = 340;

export default function Hero() {
  const { lang } = useLanguage();
  const c = content[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const [canvasSize, setCanvasSize] = useState({ w: MAX_W, h: MAX_H });
  const [descIndex, setDescIndex] = useState(0);
  const [showDesc, setShowDesc] = useState(true);

  /* ── rotate description lines ── */
  useEffect(() => {
    setDescIndex(0);
    setShowDesc(true);
  }, [lang]);

  const handleDescDone = () => {
    const lines = c.hero.description;
    const next = () => {
      setShowDesc(false);
      setTimeout(() => {
        setDescIndex((i) => (i + 1) % lines.length);
        setShowDesc(true);
      }, 600);
    };
    const t = setTimeout(next, 2200);
    return () => clearTimeout(t);
  };

  /* ── Canvas particle system ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    cancelAnimationFrame(rafRef.current);

    const img = new window.Image();
    img.src = '/make_it_pixel_202604082319.png';

    img.onload = () => {
      /* Scale to fit MAX_W × MAX_H preserving aspect ratio */
      const scale = Math.min(MAX_W / img.width, MAX_H / img.height);
      const targetW = Math.floor(img.width * scale);
      const targetH = Math.floor(img.height * scale);

      setCanvasSize({ w: targetW, h: targetH });
      canvas.width = targetW;
      canvas.height = targetH;

      /* Read pixels via offscreen canvas */
      const offscreen = document.createElement('canvas');
      offscreen.width = targetW;
      offscreen.height = targetH;
      const octx = offscreen.getContext('2d');
      if (!octx) return;
      octx.drawImage(img, 0, 0, targetW, targetH);
      const { data } = octx.getImageData(0, 0, targetW, targetH);

      /* Build particle list — each gets its own personality */
      const particles: Particle[] = [];
      for (let y = 0; y < targetH; y += STEP) {
        for (let x = 0; x < targetW; x += STEP) {
          const idx = (y * targetW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          if (a > 30) {
            particles.push({
              origX: x, origY: y, x, y, vx: 0, vy: 0, r, g, b,
              // personality — subtle random variation per particle
              repelRadius: 65 + Math.random() * 50,          // 65–115px
              spring:      0.05 + Math.random() * 0.045,     // 0.05–0.095
              friction:    0.80 + Math.random() * 0.085,     // 0.80–0.885
              drawSize:    BASE_SQUARE - 0.4 + Math.random() * 0.9, // ~2.1–3.5px
            });
          }
        }
      }
      particlesRef.current = particles;

      /* Animation loop */
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        for (const p of particlesRef.current) {
          /* Mouse repulsion — each particle reacts to its own radius */
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;
          if (distSq < p.repelRadius * p.repelRadius) {
            const dist = Math.sqrt(distSq) || 1;
            const force = ((p.repelRadius - dist) / p.repelRadius) * REPEL_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }

          /* Spring return — own spring constant */
          p.vx += (p.origX - p.x) * p.spring;
          p.vy += (p.origY - p.y) * p.spring;

          /* Friction — own friction */
          p.vx *= p.friction;
          p.vy *= p.friction;

          /* Update position */
          p.x += p.vx;
          p.y += p.vy;

          /* Draw — own slightly randomised size */
          ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
          ctx.fillRect(p.x, p.y, p.drawSize, p.drawSize);
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      animate();
    };

    img.onerror = () => {
      /* Fallback: draw placeholder text */
      canvas.width = MAX_W;
      canvas.height = MAX_H;
      ctx.fillStyle = '#330000';
      ctx.fillRect(0, 0, MAX_W, MAX_H);
      ctx.fillStyle = '#FF3B2F';
      ctx.font = '14px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('[ IMAGE NOT FOUND ]', MAX_W / 2, MAX_H / 2);
    };

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Mouse handlers ── */
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    // Scale from CSS display size → internal canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mouseRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ paddingTop: '60px', paddingBottom: '60px' }}
    >
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,59,47,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,59,47,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 px-8 max-w-5xl mx-auto w-full">

        {/* Greeting */}
        <div className="mb-6" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#660000', letterSpacing: '3px' }}>
          <TypewriterText text={c.hero.greeting} speed={60} showCursor={false} />
        </div>

        {/* Site name — glitch */}
        <h1
          className="glitch-text glow-red mb-4"
          data-text={c.hero.name}
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(22px, 4vw, 42px)', lineHeight: 1.3 }}
        >
          {c.hero.name}
        </h1>

        {/* Role */}
        <div
          className="mb-8"
          style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '13px', color: '#ff9f97', letterSpacing: '2px' }}
        >
          &gt;&gt; {c.hero.role}
        </div>

        {/* ── CANVAS ── */}
        <div className="mb-10" style={{ width: '100%' }}>
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              display: 'block',
              width: '100%',   // CSS width fills the container exactly
              height: 'auto',  // height scales proportionally
              cursor: 'none',
              imageRendering: 'pixelated',
              background: 'transparent',
            }}
          />
        </div>

        {/* Rotating description */}
        <div
          className="mb-10"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '12px',
            color: '#ff6b5b',
            minHeight: '26px',
            opacity: showDesc ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          {showDesc && (
            <TypewriterText
              key={`${lang}-${descIndex}`}
              text={`> ${c.hero.description[descIndex]}`}
              speed={38}
              showCursor={true}
              onDone={handleDescDone}
            />
          )}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-4 flex-wrap">
          <button className="pixel-btn" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            {c.hero.cta}
          </button>
          <button
            className="pixel-btn"
            style={{ borderColor: '#330000', color: '#660000', boxShadow: 'none' }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {c.hero.ctaAlt}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#330000', letterSpacing: '3px', textAlign: 'center' }}
      >
        <div style={{ animation: 'blink 1.4s step-end infinite' }}>▼ SCROLL ▼</div>
      </div>
    </section>
  );
}
