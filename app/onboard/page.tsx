'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { FC, MouseEvent } from 'react';
import { BabyIcon } from 'lucide-react';
import { service as institutionService } from '@/app/services/institutions';
import Layout from '@/app/components/template';
import { Institutions } from '@/app/helpers';
import { service } from '@/app/services/onboard';
import Card from '@/app/components/molecules/card';
import { Heading, MainContainer, GridDisplay } from './onboard.styled';
import Input from '@/app/components/atoms/input';
import Pagination from '@/app/components/molecules/pagination';
import pagination from '@/app/components/molecules/pagination';

const OnBoard: FC = () => {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const LIMIT: number = 15;

  useEffect(() => {
    let isMounted: boolean = true;
    const getInstitutions = async () => {
      setLoading(true);

      const data = await institutionService.getInstitutions(page, LIMIT);

      setPage(data.pagination.pages);
      setTotalPages(data.pagination.totalPages);

      if (isMounted) {
        setInstitutions(data.institutions);
        setLoading(false);
      }
    };
    getInstitutions();
    return () => {
      isMounted = false;
    };
  }, [page]);

  const chooseInstitutionId = useCallback(
    (id: string) => setSelectedId(prevId => (prevId === id ? null : id)),
    []
  );

  const handleChangePage = (
    evt: MouseEvent<HTMLButtonElement>,
    pageNumber: number
  ) => {
    evt.preventDefault();
    setPage(pageNumber);
  };

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
                {institutions?.map((institution: any) => (
                  <Card
                    key={institution._id}
                    onSelectBank={() => chooseInstitutionId(institution._id)}
                    isSelected={institution._id === selectedId}
                    institution={institution}
                    handleConnectBank={() => handleConnectBank()}
                    data-testid="institution-card"
                  />
                ))}
              </>
            )}
          </GridDisplay>
          <Pagination
            totalPages={totalPages}
            handleChangePage={handleChangePage}
          />
        </MainContainer>
      </Layout>
    </div>
  );
};

export default OnBoard;
