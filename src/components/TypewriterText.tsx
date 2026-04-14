'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onDone?: () => void;
}

export default function TypewriterText({
  text,
  speed = 45,
  delay = 0,
  className = '',
  showCursor = true,
  onDone,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const start = () => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setDone(true);
          onDone?.();
        }
      }, speed);
      return interval;
    };

    if (delay > 0) {
      timeout = setTimeout(() => { start(); }, delay);
    } else {
      const interval = start();
      return () => clearInterval(interval);
    }

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && <span className={`cursor-blink ${done ? '' : 'opacity-100'}`} />}
    </span>
  );
}
