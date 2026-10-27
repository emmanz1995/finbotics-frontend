'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/app/components/template';
import {
  TransactionsHeaders,
  TransactionsContent,
  TransactionsTable,
  TransactionsTableRow,
  TransactionsTableHead,
  TransactionsTableContent,
  ERROR,
} from './transactions.styled';
import { transactionsService } from '@/app/services/transactions/transactions';
import Pagination from '@/app/components/molecules/pagination';

export interface TransactionProps {
  id: string;
  amount: string;
  currency: string;
  details?: string;
  type: string;
  metadata: object;
  accountDetailsId: string;
  category: string;
}
export interface Pagination {
  totalPages: number;
  page: number;
  transactionsPerPage: number;
  offset: number;
}
export interface TransactionsProps {
  pagination: Pagination;
  transactions: TransactionProps[];
}
const Transactions = () => {
  const [transactionState, setTransactionState] = useState<TransactionsProps>({
    pagination: {
      transactionsPerPage: 0,
      totalPages: 0,
      page: 0,
      offset: 0,
    },
    transactions: [],
  });
  const [message, setMessage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(4);

  const router = useRouter();
  const params = useParams();
  const accountId = params.id as string;

  useEffect(() => {
    if (!accountId) return;

    const retrieveTransactions = async () => {
      const { pagination, transactions } =
        await transactionsService.getTransactions(accountId, currentPage);

      if (transactions.length === 0) {
        setMessage('No transactions found.');
      }

      setTransactionState({
        pagination,
        transactions,
      });
    };

    void retrieveTransactions();
  }, [accountId, currentPage]);

  const handleChangePage = (evt: any, pageNumber: number)=> {
    evt.preventDefault();
    setCurrentPage(pageNumber);
  };

  console.log('...state transactions', transactionState);
  const totalPages = transactionState.pagination.totalPages as number;
  console.log('totalPages', totalPages);

  return (
    <Layout>
      <>
        <TransactionsHeaders>
          <h1>Transactions</h1>
          <h5>See all your transactions in one place</h5>
          <ERROR>{message && <h5>{message}</h5>}</ERROR>
        </TransactionsHeaders>
        <TransactionsContent>
          <TransactionsTable>
            <TransactionsTableRow>
              <TransactionsTableHead>Descriptions</TransactionsTableHead>
              <TransactionsTableHead>Amount</TransactionsTableHead>
              <TransactionsTableHead>Category</TransactionsTableHead>
              <TransactionsTableHead></TransactionsTableHead>
            </TransactionsTableRow>
            {transactionState.transactions.map(
              (transaction: TransactionProps) => (
                <TransactionsTableRow key={transaction.id}>
                  <>
                    <TransactionsTableContent>
                      {transaction.details}
                    </TransactionsTableContent>
                    <TransactionsTableContent>
                      {transaction.amount}
                    </TransactionsTableContent>
                    <TransactionsTableContent>
                      {transaction.category}
                    </TransactionsTableContent>
                    {/*<TransactionsTableContent></TransactionsTableContent>*/}
                  </>
                </TransactionsTableRow>
              )
            )}
          </TransactionsTable>
          <Pagination totalPages={totalPages} handleChangePage={handleChangePage} />
        </TransactionsContent>
      </>
    </Layout>
  );
};

export default Transactions;
