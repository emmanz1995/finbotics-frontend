'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from './components/atoms/button';

export default function Home() {
  const router = useRouter();
  return (
    <div className="main">
      <h1>Hello World!</h1>
      <Button variant={'primary'} onClick={() => router.push('/dashboard')}>
        Hello There
      </Button>
    </div>
  );
}
