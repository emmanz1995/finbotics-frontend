'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/template';
import { transactionsService } from '@/app/services/transactions/transactions';
import { useGetCurrentUser } from '@/app/hooks';

const View = () => {
  const [transaction, setTransaction] = useState({});
  const { currentUser } = useGetCurrentUser();
  const params: { accountId: string; id: string } = useParams();

  const accountId: string = params.accountId;
  const transactionId: string = params.id;

  useEffect(() => {
    const findOneTrx = async () => {};
    void findOneTrx();
  }, []);

  return (
    <Layout userInfo={currentUser}>
      <h3>Transaction</h3>
    </Layout>
  );
};

export default View;
