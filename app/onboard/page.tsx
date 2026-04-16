'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Layout from '@/app/components/template';
import { Institutions } from '@/app/helpers';
import Button from '@/app/components/atoms/button';
import { service } from '@/app/services/onboard';
import Card from '@/app/components/molecules/card';

const Heading = styled.div``;
const MainContainer = styled.div``;
const GridDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
`;
// const Card = styled.div<{ $isSelected: boolean }>`
//   padding: 1rem;
//   background-color: #6b7280;
//   cursor: pointer;
// `;
//
// const BankLogo = styled(Image)`
//   height: 50px;
//   width: auto;
//   object-fit: contain;
//   margin-bottom: 1rem;
// `;

const OnBoard: FC = () => {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>('');

  useEffect(() => {
    let isMounted: boolean = true;
    const getInstitutions = async () => {
      setLoading(true);
      const data = Institutions;

      if (isMounted) {
        setInstitutions(data);
        setLoading(false);
      }
    };
    getInstitutions();
    return () => {
      isMounted = false;
    };
  }, []);

  const chooseInstitutionId = useCallback(
    (id: string) => setSelectedId(prevId => (prevId === id ? null : id)),
    []
  );

  const handleConnectBank = async () => {
    try {
      console.log('Connecting to Bank...');
      setLoading(true);

      const response = await service.handleConnectToBank(selectedId);
      setLoading(false);
      if (typeof response === 'object' && 'link' in response)
        window.location.assign(response.link);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <Layout>
        <Heading>
          <h1>Connect Your Bank</h1>
          <p>
            Select your bank to securely connect your accounts. We use
            bank-level security to keep your information safe.
          </p>
        </Heading>
        <MainContainer>
          <GridDisplay data-testid="main-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {institutions.map(institution => (
                  <Card
                    key={institution.id}
                    onSelectBank={() => chooseInstitutionId(institution.id)}
                    isSelected={institution.id === selectedId}
                    institution={institution}
                    handleConnectBank={() => handleConnectBank()}
                    data-testid="institution-card"
                  />
                ))}
              </>
            )}
          </GridDisplay>
        </MainContainer>
      </Layout>
    </div>
  );
};

export default OnBoard;
