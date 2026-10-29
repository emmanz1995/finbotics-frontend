'use client';

import { type ChangeEvent, type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EditIcon, ViewIcon, SearchCheck } from 'lucide-react';
import {
  TransactionsTable,
  TransactionsTableContent,
  TransactionsTableHead,
  TransactionsTableRow,
} from '@/app/transactions/[id]/transactions.styled';
import Input from '@/app/components/atoms/input';
import { TransactionProps } from '@/app/transactions/[id]/page';
import { transactionsService } from '@/app/services/transactions/transactions';
import Modal from '@/app/components/molecules/modal/Modal';

const TransactionTable: FC<{
  transactionState: any;
  onSelectTransactionToView: (id: any) => void;
  selectTransaction: string | null;
}> = ({ transactionState }) => {
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
}> = ({ transaction, isEditing, onSelectTransaction }) => {
  const [category, setCategory] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdateCategory = async (
    evt: ChangeEvent<HTMLInputElement>,
    id: string
  ): Promise<void> => {
    evt.preventDefault();

    const body = {
      id,
      category,
    };

    const response = await transactionsService.onUpdateTransaction(body);
    console.log('...response', response);
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
