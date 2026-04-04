'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import {
  PlusCircleIcon,
  CreditCardIcon,
  TrendingUpIcon,
  AlertCircleIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Layout from '@/app/components/template';
import Button from '@/app/components/atoms/button';
import {
  PageHeader,
  HeaderContent,
  Title,
  Subtitle,
  SummarySection,
  SummaryCard,
  SummaryHeader,
  SummaryTitle,
  SummaryValue,
  Currency,
  SummaryDescription,
  AccountsGrid,
  ConnectBankCard,
  ConnectBankDescription,
  ConnectBankIcon,
  ConnectBankTitle,
  ContentContainer,
} from './styles';
import { service } from '@/app/services/accounts';
import AccountCard from '@/app/components/molecules/accountCard';
import { pickBalanceFields } from '@/app/helpers';

export interface BalanceToReturnProp {
  [key: string]: {
    id: string;
    amount: number;
    currency: string;
    type: string;
    metadata: object;
    accountDetailsId: string;
  };
}
export interface BalanceProps {
  id: string;
  amount: number;
  currency: string;
  type: string;
  metadata: object;
  accountDetailsId: string;
}
export interface AccountDetailsProps {
  id: string;
  resourceId: string;
  iban: string;
  scan: string;
  currency: string;
  ownerName: string;
  balance: BalanceProps[] | any;
}

const AccountsDashboard: FC = () => {
  const [accountDetails, setAccountDetails] = useState<AccountDetailsProps[]>(
    []
  );
  const [balances, setBalances] = useState<BalanceProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useRouter();

  const fetchAccountDetails = async () => {
    const details: AccountDetailsProps[] = await service.getAccounts();
    console.log('...details', details);

    setAccountDetails(details);
  };

  const fetchBalances = async () => {
    // TODO: update this with dynamic accountId pulled from currently logged in user
    const balancesRes = await service.getAllBalances(
      'c7d8ae51-589a-40cf-9d71-4c3300fe48b8'
    );
    setBalances(balancesRes);
  };

  // const groupBalancesByAccountId = accountDetails.reduce(
  //   (acc: any, detail: any) => {
  //     let accountId;
  //     if (typeof detail === 'object' && 'accountDetailsId' in detail && detail)
  //       accountId = detail?.accountDetailsId ?? 'Not Found';
  //     if (!acc[accountId]) {
  //       acc[accountId] = {};
  //     }
  //     acc[accountId].push(detail);
  //     return acc;
  //   },
  //   {} as Record<string, []>
  // );
  // console.log('...groupBalancesByAccountId', groupBalancesByAccountId);

  const mapBalancesToAccount = () => {
    const balanceToReturn: BalanceToReturnProp = {};
    const balanceToDetails = accountDetails?.map(
      (detail: AccountDetailsProps) => {
        balances.forEach((balance: BalanceProps) => {
          if (detail.id === balance.accountDetailsId) {
            // @ts-expect-error: balanceToReturn type does not match AccountDetailsProps.balance, will refactor type later
            balanceToReturn[balance.accountDetailsId] = {
              ...pickBalanceFields(balance),
            };
          }
        });

        return {
          ...detail,
          balance: balanceToReturn,
        };
      }
    );

    return balanceToDetails;
  };

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  useEffect(() => {
    fetchBalances();
  }, []);
  const formattedDetails = mapBalancesToAccount();

  const handleAccountDataSync = async (accountId: string): Promise<void> => {
    setLoading(false);
    try {
      setLoading(true);
      await accountsConnector.onIngestAccountData(accountId);
      await fetchAccountDetails();
      await fetchBalances();
      setLoading(false);
    } catch (err: Error | unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        console.log('Failed to sync bank data:', err.message);
      }
      // this is for debugging purposes, this will be cleared later on
      console.log('...err', err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ContentContainer>
        <PageHeader>
          <HeaderContent>
            <Title>Your Accounts</Title>
            <Subtitle>
              Manage all your connected bank accounts in one place
            </Subtitle>
          </HeaderContent>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/onboard-institution')}
          >
            Connect Bank
          </Button>
        </PageHeader>
        <SummarySection>
          <SummaryCard>
            <SummaryHeader>
              <CreditCardIcon size={24} color="#3B82F6" />
              <SummaryTitle>Total Balance</SummaryTitle>
            </SummaryHeader>
            <SummaryValue>
              <Currency>£</Currency>
              {Number('4500').toFixed(2)}
            </SummaryValue>
            <SummaryDescription>Across all your accounts</SummaryDescription>
          </SummaryCard>
          <SummaryCard>
            <SummaryHeader>
              <TrendingUpIcon size={24} color="#10B981" />
              <SummaryTitle>Monthly Savings</SummaryTitle>
            </SummaryHeader>
            <SummaryValue>
              <Currency>£</Currency>
              450.25
            </SummaryValue>
            <SummaryDescription>
              15% increase from last month
            </SummaryDescription>
          </SummaryCard>
          <SummaryCard>
            <SummaryHeader>
              <AlertCircleIcon size={24} color="#F59E0B" />
              <SummaryTitle>Upcoming Bills</SummaryTitle>
            </SummaryHeader>
            <SummaryValue>
              <Currency>£</Currency>
              320.00
            </SummaryValue>
            <SummaryDescription>Due in the next 7 days</SummaryDescription>
          </SummaryCard>
        </SummarySection>
        <AccountsGrid>
          {/* @ts-expect-error: TODO:detail props does not match will refactor later */}
          {formattedDetails.map((detail: AccountDetailsProps) => (
            <AccountCard
              key={detail.id}
              detail={detail}
              handleAccountDataSync={handleAccountDataSync}
              isLoading={loading}
            />
          ))}
          <ConnectBankCard>
            <ConnectBankIcon>
              <PlusCircleIcon size={30} />
            </ConnectBankIcon>
            <ConnectBankTitle>Connect a New Bank</ConnectBankTitle>
            <ConnectBankDescription>
              Add another bank account to get a complete view of your finances
            </ConnectBankDescription>
            <Button
              variant="primary"
              onClick={() => navigate.push('/onboard-institution')}
            >
              Connect Bank
            </Button>
          </ConnectBankCard>
        </AccountsGrid>
      </ContentContainer>
    </Layout>
  );
};

export default AccountsDashboard;
