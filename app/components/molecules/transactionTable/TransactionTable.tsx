'use client';

import { type ChangeEvent, type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  EditIcon,
  ViewIcon,
  // SearchCheck
} from 'lucide-react';
import {
  TransactionsTable,
  TransactionsTableContent,
  TransactionsTableHead,
  TransactionsTableRow,
} from '@/app/transactions/[id]/transactions.styled';
import Input from '@/app/components/atoms/input';
import { TransactionProps } from '@/app/transactions/[id]/page';
import { transactionsService } from '@/app/services/transactions/transactions';
// import Modal from '@/app/components/molecules/modal/Modal';

const TransactionTable: FC<{
  transactionState: any;
  setTransactionState: any;
  onSelectTransactionToView: (id: any) => void;
  selectTransaction: string | null;
}> = ({ transactionState, setTransactionState }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectTransactionRow = (id: string) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };
  return (
    <TransactionsTable>
      <TableHeadRow />
      {transactionState.transactions.map((transaction: TransactionProps) => (
        <>
          <TableContentRow
            transaction={transaction}
            isEditing={transaction.id === selectedId}
            onSelectTransaction={selectTransactionRow}
            transactions={transactionState?.transactions}
            setTransactionState={setTransactionState}
          />
        </>
      ))}
    </TransactionsTable>
  );
};

const TableHeadRow = () => (
  <TransactionsTableRow>
    <TransactionsTableHead>Descriptions</TransactionsTableHead>
    <TransactionsTableHead>Amount</TransactionsTableHead>
    <TransactionsTableHead>Category</TransactionsTableHead>
    <TransactionsTableHead>Comments</TransactionsTableHead>
    <TransactionsTableHead>Trx Actions</TransactionsTableHead>
  </TransactionsTableRow>
);

const TableContentRow: FC<{
  transaction: TransactionProps;
  isEditing: boolean;
  onSelectTransaction: (id: string) => void;
  transactions: TransactionProps[];
  setTransactionState: any;
}> = ({
  transaction,
  isEditing,
  onSelectTransaction,
  transactions,
  setTransactionState,
}) => {
  const [category, setCategory] = useState<string | null>(null);
  const router = useRouter();

  // TODO: Move this function to the main transaction page component this will help solve the prop drilling problem
  const handleUpdateCategory = async (
    evt: ChangeEvent<HTMLInputElement>,
    id: string
  ): Promise<void> => {
    evt.preventDefault();

    const body = {
      id,
      category,
    };

    const result: any = await transactionsService.onUpdateTransaction(body);
    console.log('...response', result.response);
    console.log(transactions);
    const mutatedTransactions = transactions.map(transaction => {
      // For debugging purposes only
      // console.log('...id boolean', transaction.id === result.response?.id);
      // console.log('...transaction.id', result.response?.id);
      // console.log('...id', id);
      if (transaction.id === result.response?.id) {
        return {
          ...transaction,
          category,
        };
      }
      return transaction;
    });

    setTransactionState({
      transactions: mutatedTransactions,
      // TODO: get the new pagination values and add them in here
      pagination: {
        transactionsPerPage: 20,
        totalPages: 9,
        page: 2,
        offset: 0,
      },
    });
  };

  return (
    <>
      <TransactionsTableRow key={transaction?.id}>
        <>
          <TransactionsTableContent>
            {transaction.details}
          </TransactionsTableContent>
          <TransactionsTableContent>
            {transaction.amount}
          </TransactionsTableContent>
          <TransactionsTableContent>
            {isEditing ? (
              <form
                onSubmit={(evt: any) =>
                  handleUpdateCategory(evt, transaction.id)
                }
              >
                <Input
                  type="text"
                  name="category"
                  value={category}
                  placeholder={transaction?.category}
                  onChange={(evt: ChangeEvent<HTMLInputElement>): void =>
                    setCategory(evt.target.value.toUpperCase())
                  }
                />
              </form>
            ) : (
              <p>{transaction.category}</p>
            )}
          </TransactionsTableContent>
          <TransactionsTableContent>
            {transaction?.comments}
          </TransactionsTableContent>
          <TransactionsTableContent>
            <EditIcon
              onClick={() => onSelectTransaction(transaction.id)}
              cursor="pointer"
            />{' '}
            <ViewIcon
              cursor="pointer"
              onClick={() =>
                router.push(`/transactions/view/${transaction.id}`)
              }
            />
          </TransactionsTableContent>
        </>
      </TransactionsTableRow>
    </>
  );
};

export default TransactionTable;
