'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/app/components/template';
import { authService } from '@/app/services/auth';

const View = () => {
  const [currentUser, setCurrentUser] = useState<{
    username: string;
    userId: string;
  } | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem('access_token') as string
        ).access_token;
        const userDetails = authService.extractCurrentUser(accessToken);

        setCurrentUser(userDetails);
      } catch (err: any) {
        console.log(err);
      }
    };

    void getCurrentUser();
  }, []);
  return (
    <Layout userInfo={currentUser}>
      <h3>Transaction</h3>
    </Layout>
  );
};

export default View;
