'use client';

import type { FC } from 'react';
import { useMemo, useCallback } from 'react';
import { useEffect, useState } from 'react';
import {
  AlertCircleIcon,
  CreditCardIcon,
  EditIcon,
  PlusCircleIcon,
  RefreshCcwIcon,
  TrashIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Layout from '@/app/components/template';
import Button from '@/app/components/atoms/button';
import {
  AccountsGrid,
  ConnectBankCard,
  ConnectBankDescription,
  ConnectBankIcon,
  ConnectBankTitle,
  ContentContainer,
  Currency,
  HeaderContent,
  PageHeader,
  Subtitle,
  SummaryCard,
  SummaryDescription,
  SummaryHeader,
  SummarySection,
  SummaryTitle,
  SummaryValue,
  Title,
} from './styles';
import { service } from '@/app/services/accounts';
import { service as balanceService } from '@/app/services/balances';
import AccountCard from '@/app/components/molecules/accountCard';
import { pickBalanceFields } from '@/app/helpers';

export interface BalanceToReturnProp {
  [key: string]: {
    id: string;
    amount: number;
    currency: string;
    metadata: object;
    accountDetailsId: string;
  };
}
export interface BalanceProps {
  id: string;
  amount: number;
  currency: string;
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
  balance: BalanceProps[];
}

const AccountsDashboard: FC = () => {
  const [accountDetails, setAccountDetails] = useState<AccountDetailsProps[]>(
    []
  );
  const [balances, setBalances] = useState<BalanceProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>('');
  const [message, setMessage] = useState<string>('');

  const navigate = useRouter();

  useEffect(() => {
    let isMounted: boolean = true;
    const fetchAccountDetails = async () => {
      setLoading(true);
      const details = (await service.getAccounts()) as AccountDetailsProps[];
      if (isMounted) {
        setAccountDetails(details);
        setLoading(false);
      }
    };
    fetchAccountDetails();
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchBalances = async () => {
    // TODO: update this with dynamic accountId pulled from currently logged in user
    const balancesRes =
      (await balanceService.getAllBalances()) as BalanceProps[];
    setBalances(balancesRes);
  };

  const formattedDetails = useMemo(() => {
    return accountDetails?.map((detail: AccountDetailsProps) => {
      const balanceToReturn: BalanceToReturnProp = {};
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
    });
  }, [accountDetails, balances]);

  useEffect(() => {
    fetchBalances();
  }, []);

  const handleAccountDataSync = async (
    accountId: string | null
  ): Promise<void> => {
    setLoading(false);
    try {
      setLoading(true);
      await service.onSyncAccount(accountId);
      await fetchBalances();
      setLoading(false);
      setMessage('Successfully resynced your Account');
    } catch (err: Error | unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        console.log('Failed to sync bank data:', err.message);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // TODO: add the logic in to delete account detail
  const handleDeleteAccount = (id: string | null) =>
    console.log(`deleted account ${id}`);

  // TODO: add the logic in to edit account detail
  const handleEditAccount = (id: string | null, name: string) =>
    console.log(
      `Edited the name of the account to: ${name} with accountId ${id}`
    );

  const handleCatchAccountId = useCallback((id: string) => {
    setSelectedAccountId(prev => (prev === id ? null : id));
  }, []);

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
            onClick={() => navigate.push('/onboard')}
          >
            Connect Bank
          </Button>
        </PageHeader>
        {selectedAccountId && (
          <span>
            <Button
              data-testid="test-refresh-btn"
              variant="outline"
              size="sm"
              onClick={() => handleAccountDataSync(selectedAccountId)}
            >
              <RefreshCcwIcon cursor="pointer" />
            </Button>{' '}
            <Button
              variant="outline"
              size="sm"
              data-testid="test-del-btn"
              onClick={() => handleDeleteAccount(selectedAccountId)}
            >
              <TrashIcon cursor="pointer" />
            </Button>{' '}
            <Button
              variant="outline"
              size="sm"
              data-testid="test-del-btn"
              onClick={() =>
                handleEditAccount(selectedAccountId, 'Emmanuel C Okuchukwu')
              }
            >
              <EditIcon cursor="pointer" />
            </Button>
          </span>
        )}
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
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <AccountsGrid>
            {formattedDetails.map(detail => (
              <AccountCard
                key={detail.id}
                detail={detail}
                navigate={navigate}
                handleGetAccountId={() => handleCatchAccountId(detail.id)}
                isAccountIdSelected={selectedAccountId === detail.id}
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
                onClick={evt => {
                  evt.stopPropagation();
                  navigate.push('/onboard-institution');
                }}
              >
                Connect Bank
              </Button>
            </ConnectBankCard>
          </AccountsGrid>
        )}
      </ContentContainer>
    </Layout>
  );
};

export default AccountsDashboard;
