'use client';

import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from './components/atoms/button';
import Layout from '@/app/components/template';
import Input from '@/app/components/atoms/input';
import { authService } from '@/app/services/auth';

const formValues: { email: string; password: string } = {
  email: '',
  password: '',
};

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
      'Password must contain uppercase, lowercase, number, and special character'
    )
    .required(),
});

export default function Home() {
  const [message, setMessage] = useState('');
  // TODO: revisit later
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(
    () => localStorage.getItem('access_token')
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await authService.onLogin(email, password);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setMessage('Failed to login, please try again later.');
      console.log(err.message);
    }
    router.push('/dashboard');
  };

  const router = useRouter();

  console.log(authenticatedUser);

  if (authenticatedUser) {
    router.push('/dashboard');
  }
  return (
    <div className="main">
      <Layout>
        <h1>Login</h1>
        {message && <span className="message">{message}</span>}
        <Formik
          initialValues={formValues}
          onSubmit={handleLogin}
          validationSchema={loginSchema}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            values,
          }) => (
            <form>
              <Input
                name="email"
                placeholder="John.Doe@eyefind.com"
                type="text"
                value={values.email}
                onBlur={handleBlur('email')}
                onChange={handleChange('email')}
              />
              {touched && errors.email}
              <Input
                name="password"
                placeholder="************************"
                type="password"
                value={values.password}
                onBlur={handleBlur('password')}
                onChange={handleChange('password')}
              />
              {touched && errors.password}
              <Button
                variant="outline"
                fullWidth="full"
                onClick={() => router.push('/dashboard')}
                disabled={loading}
                type="submit"
                onClick={() => handleSubmit(values)}
              >
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </form>
          )}
        </Formik>
      </Layout>
    </div>
  );
}
