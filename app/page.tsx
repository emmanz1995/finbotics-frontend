'use client';

import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from './components/atoms/button';
import { motion } from 'framer-motion';
import Carousel from '@/app/components/organisms/Carousel';
import { useCountDown } from '@/app/hooks';
import AccountCardPulseEffect from '@/app/components/molecules/pulseEffects/accountCard/AccountCardPulse';
import { AccountCardLoading } from '@/app/components/molecules/pulseEffects/accountCard';
import Layout from '@/app/components/template';
import Input from '@/app/components/atoms/input';
import { authService } from '@/app/services/auth';

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

const values = {
  email: '',
  password: '',
};

export default function Home() {
  const [loginValues, setLoginValues] = useState<{
    email: string;
    password: string;
  }>(values);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const handleLogin = async (evt: FormEvent) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await authService.onLogin(loginValues.email, loginValues.password);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setMessage('Failed to login, please try again later.');
      console.log(err.message);
    }
    router.push('/dashboard');
  };

  const router = useRouter();
  return (
    <div className="main">
      <Layout>
        <h1>Login</h1>
        {message && <span className="message">{message}</span>}
        <form onSubmit={handleLogin}>
          <Input
            name="email"
            placeholder="John.Doe@eyefind.com"
            type="text"
            value={loginValues.email}
            onChange={onChange}
          />
          <Input
            name="password"
            placeholder="************************"
            type="password"
            value={loginValues.password}
            onChange={onChange}
          />
          <Button
            variant="outline"
            fullWidth="full"
            onClick={() => router.push('/dashboard')}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Layout>
    </div>
  );
}
