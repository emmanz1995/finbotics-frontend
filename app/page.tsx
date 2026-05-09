'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from './components/atoms/button';
import { motion } from 'framer-motion';
import Carousel from '@/app/components/organisms/Carousel';

const Orb = styled(motion.div)`
  pointer-events: none;
  position: absolute;
  width: 400px;
  height: 400px;
  z-index: 0;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(212, 168, 83, 0.15) 0%,
    rgba(10, 10, 10, 0) 70%
  );
  //background-color: #6B7280;
`;

export default function Home() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMovement = (evt: MouseEvent) => {
      setMousePosition({
        x: evt.clientX,
        y: evt.clientY,
      });
    };

    window.addEventListener('mousemove', handleMovement);

    return () => window.removeEventListener('mousemove', handleMovement);
  }, []);

  const router = useRouter();
  return (
    <div className="main">
      <h1>Hello World!</h1>
      <Orb
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.5,
        }}
      />
      <Button variant={'primary'} onClick={() => router.push('/dashboard')}>
        Hello There
      </Button>
      <Carousel />
    </div>
  );
}
