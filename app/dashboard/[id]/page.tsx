'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CreditCardIcon,
  TrendingUpIcon,
  BarChartIcon,
  LightbulbIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CarIcon,
  CoffeeIcon,
  HeartIcon,
  ShoppingBagIcon,
  WalletIcon,
  HeartPlus,
} from 'lucide-react';
import { Title, Subtitle, ContentContainer } from '../../styles/common';
import Layout from '../../components/template';
import { service } from '@/app/services/accounts';
import {
  AccountDetailsSection,
  AccountDetailsContainer,
  AccountHeader,
  AccountInfo,
  AccountDetail,
  BalanceInfo,
  BalanceAmount,
  GridLayout,
  HeaderContent,
  SpendingOverviewContainer,
  SpendingPredicationContainer,
  RecentTransactionContainer,
  FinancialTipsContainer,
  HeaderContainer,
  FirstColumn,
  SecondColumn,
  Pagination,
  TransactionTable,
  TransactionRow,
  TransactionInfo,
  TransactionName,
  TransactionAmount,
  TransactionCategory,
  TransactionDate,
  TransactionMeta,
  IconContainer,
} from './styles';
import { extractAccountNumber, toUppercaseFirstLetter } from '../../helpers';
import Button from '../../components/atoms/button';

interface ResourceProps {
  id: string;
  amount: string;
  currency: string;
  details?: string;
  type: string;
  metadata: object;
  accountDetailsId: string;
}

interface Pagination {
  totalPages: number;
  page: number;
  transactionsPerPage: number;
  offset: number;
}
interface TransactionsProps {
  pagination: Pagination;
  transactions: ResourceProps[];
}
interface DetailProps {
  id: string;
  resourceId: string;
  iban?: string;
  scan: string;
  currency: string;
  ownerName: string;
}

const Dashboard: FC = () => {
  const [transactions, setTransactions] = useState<TransactionsProps>({
    pagination: {
      transactionsPerPage: 0,
      totalPages: 0,
      page: 0,
      offset: 0,
    },
    transactions: [],
  });
  // const [balances, setBalances] = useState<ResourceProps[]>([]);
  const [detail, setDetail] = useState<DetailProps>({
    id: '',
    resourceId: '',
    iban: '',
    scan: '',
    currency: '',
    ownerName: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = transactions.pagination.totalPages;
  const navigate = useRouter();
  const params = useParams();
  const accountId = params.id as string;
  console.log(accountId);

  useEffect(() => {
    const handleFetchAccountData = async () => {
      const transactionRes = await accountsConnector.getTransactions(
        accountId,
        {
          limit: 5,
          currentPage,
        }
      );

      setTransactions(transactionRes);
      setCurrentPage(transactionRes?.pagination?.currentPage);
    };

    handleFetchAccountData();
  }, [accountId, currentPage]);

  useEffect(() => {
    const getAccountDetail = async () => {
      const response = await service.getAccountsByAccId(accountId);
      setDetail(response);
    };
    getAccountDetail();
  }, [accountId]);
  const scan = detail?.scan ? detail?.scan : '';
  const { accountNumber, sortCode } = extractAccountNumber(scan);

  const pages = [];
  for (let i = 0; totalPages > i; i++) {
    pages.push(i + 1);
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'HEALTH':
        return <HeartPlus size={18} />;
      case 'FOOD':
        return <CoffeeIcon size={18} />;
      case 'TRANSPORTATION':
        return <CarIcon size={18} />;
      case 'SHOPPING':
        return <ShoppingBagIcon size={18} />;
      case 'ENTERTAINMENT':
        return <HeartIcon size={18} />;
      case 'INCOME':
      case 'PAYMENT':
      case 'TRANSFER':
        return <WalletIcon size={18} />;
      default:
        return <ShoppingBagIcon size={18} />;
    }
  };

  return (
    <Layout>
      <ContentContainer>
        <HeaderContent>
          <Button variant="ghost" onClick={() => navigate.push('/dashboard')}>
            <ArrowLeft size={20} />
          </Button>
          <Title>Account Details</Title>
        </HeaderContent>
        <AccountDetailsContainer>
          <AccountHeader>
            <AccountInfo>
              <h3>{detail.currency} Account</h3>
              <Subtitle>IBAN: {detail?.iban}</Subtitle>
            </AccountInfo>
            <BalanceInfo>
              <Subtitle>Current Balance</Subtitle>
              <BalanceAmount>
                <Subtitle>£</Subtitle>
                <h3>15000</h3>
              </BalanceAmount>
            </BalanceInfo>
          </AccountHeader>
          <AccountDetailsSection>
            <AccountDetail>
              <Subtitle>Account Owner</Subtitle>
              <h4>{toUppercaseFirstLetter(detail.ownerName)}</h4>
            </AccountDetail>
            <AccountDetail>
              <Subtitle>Account Number</Subtitle>
              <h4>{accountNumber}</h4>
            </AccountDetail>
            <AccountDetail>
              <Subtitle>Sort Code</Subtitle>
              <h4>{sortCode}</h4>
            </AccountDetail>
            <AccountDetail>
              <Subtitle>Last Updated</Subtitle>
              <h4>2025-03-14</h4>
            </AccountDetail>
          </AccountDetailsSection>
        </AccountDetailsContainer>
        <GridLayout>
          <FirstColumn>
            <SpendingOverviewContainer>
              <HeaderContainer>
                <BarChartIcon />
                <h3>Spending Overview</h3>
              </HeaderContainer>
            </SpendingOverviewContainer>
            <FinancialTipsContainer>
              <HeaderContainer>
                <CreditCardIcon />
                <h3>Financial Tips</h3>
              </HeaderContainer>
            </FinancialTipsContainer>
          </FirstColumn>
          <SecondColumn>
            <SpendingPredicationContainer>
              <HeaderContainer>
                <TrendingUpIcon />
                <h3>Spending Prediction</h3>
              </HeaderContainer>
            </SpendingPredicationContainer>
            <RecentTransactionContainer>
              <HeaderContainer>
                <LightbulbIcon />
                <h3>Recent Transactions</h3>
              </HeaderContainer>
              <TransactionTable>
                {transactions.transactions.map((transaction: any) => (
                  <TransactionRow key={transaction.id}>
                    <IconContainer $category={transaction.category}>
                      {getCategoryIcon(transaction?.category)}
                    </IconContainer>
                    <TransactionInfo>
                      <TransactionName>
                        {transaction.description}
                      </TransactionName>
                      <TransactionMeta>
                        <TransactionCategory>
                          {transaction.category}
                        </TransactionCategory>
                        <TransactionDate>{transaction.date}</TransactionDate>
                      </TransactionMeta>
                    </TransactionInfo>
                    {/* TODO: Future feature to be explored */}
                    <TransactionAmount $type={transaction.type}>
                      {transaction.amount.startsWith('-') ? (
                        <ArrowDownLeftIcon size={16} />
                      ) : (
                        <ArrowUpRightIcon size={16} />
                      )}
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'GBP',
                      }).format(transaction.amount)}
                    </TransactionAmount>
                  </TransactionRow>
                ))}
                <span>
                  <a href={`/view-transactions/${accountId}`}>
                    View all Transactions
                  </a>
                </span>
              </TransactionTable>
            </RecentTransactionContainer>
          </SecondColumn>
        </GridLayout>
      </ContentContainer>
    </Layout>
  );
};

export default Dashboard;
