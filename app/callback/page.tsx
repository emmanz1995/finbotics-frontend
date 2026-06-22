'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, redirect } from 'next/navigation';
import Layout from '@/app/components/template';
import { service } from '@/app/services/onboard';
import { Container, DialogBox } from './callback.styled';

const Callback = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref') as string | null;

  useEffect(() => {
    if (!ref) return;
    const ingestTransactionData = async () => {
      setLoading(true);

      try {
        await service.ingestAccounts(ref);
        setMessage('Successfully inserted account data');

        setTimeout(() => {
          redirect(`/dashboard`);
        }, 5000);
      } catch (err: any) {
        setMessage('Failed to insert account data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void ingestTransactionData();
  }, [ref]);
  return (
    <Layout>
      <Container>
        <DialogBox>
          {loading ? <p>Fetching account details...</p> : <p>{message}</p>}
          <span>Hello</span>
        </DialogBox>
      </Container>
    </Layout>
  );
};

export default Callback;
