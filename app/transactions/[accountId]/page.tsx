'use client';
import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EditIcon } from 'lucide-react';
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
import { authService } from '@/app/services/auth';
import Input from '@/app/components/atoms/input';
import { TransactionTable } from '@/app/components/molecules/transactionTable';
import Modal from '@/app/components/molecules/modal/Modal';
import { useGetCurrentUser } from '@/app/hooks';

export interface TransactionProps {
  id: string;
  amount: string;
  currency: string;
  details?: string;
  type: string;
  metadata: object;
  accountDetailsId: string;
  category: string;
  comments: string;
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectTransaction, setSelectTransaction] = useState<string | null>(
    null
  );

  const router = useRouter();
  const params = useParams();
  const accountId = params.accountId as string;

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

  const handleChangePage = (evt: any, pageNumber: number): void => {
    evt.preventDefault();
    setCurrentPage(pageNumber);
  };
  const totalPages = transactionState.pagination.totalPages as number;

  const handleUpdateCategory = async (
    evt: ChangeEvent<HTMLInputElement>,
    id: string,
    category: string
  ): Promise<void> => {
    evt.preventDefault();

    const body = {
      id,
      category,
    };

    const result: any = await transactionsService.onUpdateTransaction(body);
    const mutatedTransactions: any = transactionState.transactions.map(
      transaction => {
        if (transaction.id === result.response?.id) {
          return {
            ...transaction,
            category,
          };
        }
        return transaction;
      }
    );

    setTransactionState({
      transactions: mutatedTransactions,
      // TODO: get the new pagination values and add them in here
      pagination: {
        transactionsPerPage: transactionState.pagination.transactionsPerPage,
        totalPages,
        page: transactionState.pagination.page,
        offset: transactionState.pagination.offset,
      },
    });
  };

  const { currentUser } = useGetCurrentUser();

  const selectTransactionRow = (id: string) => {
    setSelectTransaction(prevId => (prevId === id ? null : id));
  };

  return (
    <Layout userInfo={currentUser}>
      <>
        <TransactionsHeaders>
          <h1>Transactions</h1>
          <h5>See all your transactions in one place</h5>
          <ERROR>{message && <h5>{message}</h5>}</ERROR>
        </TransactionsHeaders>
        <TransactionsContent>
          <TransactionTable
            transactionState={transactionState}
            onSelectTransactionToView={selectTransactionRow}
            selectTransaction={selectTransaction}
            onHandleUpdateCategory={handleUpdateCategory}
          />
          <Pagination
            totalPages={totalPages}
            handleChangePage={handleChangePage}
          />
        </TransactionsContent>
      </>
    </Layout>
  );
};

export default Transactions;
