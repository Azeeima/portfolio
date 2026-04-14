'use client';

import { useEffect, useRef } from 'react';

export default function CRTOverlay() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMove);

    let raf: number;
    const animate = () => {
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';

      outlineX += (mouseX - outlineX) * 0.14;
      outlineY += (mouseY - outlineY) * 0.14;
      outline.style.left = outlineX + 'px';
      outline.style.top = outlineY + 'px';

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Pixel cursor */}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />

      {/* CRT layers */}
      <div className="crt-scanlines" aria-hidden />
      <div className="crt-vignette" aria-hidden />
      <div className="crt-flicker" aria-hidden />
      <div className="crt-scan-moving" aria-hidden />
    </>
  );
}
